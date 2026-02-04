import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import {
  checkRateLimit,
  getClientIP,
  createCorsHeaders,
  rateLimitResponse,
  DEFAULT_RATE_LIMIT,
} from "../_shared/rate-limit.ts";
import { isValidEmail, sanitizeText, validateRequiredFields } from "../_shared/validation.ts";

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-SSF-PAYMENT] ${step}${detailsStr}`);
};

// Valid price IDs for SSF sessions
const VALID_PRICE_IDS = [
  "price_1SsYPvQP580MvrLE8Xvac2Zh", // Session 1: Portable Offer Build Lab
  "price_1SsYQiQP580MvrLEDiRA7jXl", // Session 2: Offer Packaging + Content Creation
  "price_1SsYR7QP580MvrLEBqTG3EAy", // Session 3: Visibility + Launch Preparation
  "price_1SsYReQP580MvrLEH3PchosX", // Session 4: Launch + Amplification
  "price_1Sx854QP580MvrLEZAxk6BOn", // Bundle: All 4 Sessions ($299)
];

serve(async (req) => {
  const corsHeaders = createCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const clientIP = getClientIP(req);
  if (!checkRateLimit(clientIP, "create-ssf-payment", DEFAULT_RATE_LIMIT)) {
    logStep("Rate limit exceeded", { ip: clientIP });
    return rateLimitResponse(corsHeaders);
  }

  try {
    logStep("Function started");

    const body = await req.json();

    // Validate required fields
    const { valid, missing } = validateRequiredFields(body, ['priceIds', 'customerEmail']);
    if (!valid) {
      return new Response(
        JSON.stringify({ error: `Missing required fields: ${missing.join(', ')}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { priceIds, customerEmail, customerName } = body;

    // Validate email
    if (!isValidEmail(customerEmail)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate price IDs
    if (!Array.isArray(priceIds) || priceIds.length === 0) {
      return new Response(
        JSON.stringify({ error: "No price IDs provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate each price ID is allowed
    const invalidPriceIds = priceIds.filter((id: string) => !VALID_PRICE_IDS.includes(id));
    if (invalidPriceIds.length > 0) {
      logStep("Invalid price IDs detected", { invalidPriceIds });
      return new Response(
        JSON.stringify({ error: "Invalid price selection" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize inputs
    const safeEmail = sanitizeText(customerEmail, 255);
    const safeName = sanitizeText(customerName, 100);

    logStep("Request validated", { priceIds, safeEmail });

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    logStep("Stripe key verified");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: safeEmail, limit: 1 });
    let customerId: string | undefined;

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: safeEmail,
        name: safeName,
        metadata: {
          source: "socially_selling_food",
        },
      });
      customerId = customer.id;
      logStep("Created new customer", { customerId });
    }

    // Build line items
    const lineItems = priceIds.map((priceId: string) => ({
      price: priceId,
      quantity: 1,
    }));
    logStep("Line items built", { lineItems });

    const origin = req.headers.get("origin") || "https://phresh-connect-hub.lovable.app";

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      // Explicitly set payment method types to avoid Stripe dashboard configuration mismatches
      // that can cause: "No valid payment method types for this Checkout Session"
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/socially-selling-food?success=true`,
      cancel_url: `${origin}/socially-selling-food?canceled=true`,
      metadata: {
        program: "socially_selling_food",
        customer_email: safeEmail,
      },
      custom_text: {
        submit: {
          message: "Your enrollment will be confirmed after payment. You'll receive access to Google Classroom within 24 hours.",
        },
      },
    });

    logStep("Checkout session created", { sessionId: session.id });

    return new Response(
      JSON.stringify({ url: session.url, sessionId: session.id }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
