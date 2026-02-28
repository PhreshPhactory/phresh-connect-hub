import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import {
  checkRateLimit,
  getClientIP,
  createCorsHeaders,
  rateLimitResponse,
  DEFAULT_RATE_LIMIT,
} from "../_shared/rate-limit.ts";
import {
  isValidEmail,
  sanitizeText,
  validateRequiredFields,
} from "../_shared/validation.ts";

serve(async (req) => {
  const corsHeaders = createCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const clientIP = getClientIP(req);
  if (!checkRateLimit(clientIP, "create-tiktok-live-payment", DEFAULT_RATE_LIMIT)) {
    return rateLimitResponse(corsHeaders);
  }

  try {
    const body = await req.json();

    // Validate required fields
    const { valid, missing } = validateRequiredFields(body, ["email", "brandName"]);
    if (!valid) {
      return new Response(
        JSON.stringify({ error: `Missing required fields: ${missing.join(", ")}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { email, brandName } = body;

    // Validate email format
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize inputs
    const safeEmail = sanitizeText(email, 255);
    const safeBrandName = sanitizeText(brandName, 200);

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("Payment service not configured");

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-08-27.basil",
    });

    // Check for existing customer
    const customers = await stripe.customers.list({ email: safeEmail, limit: 1 });
    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const origin = req.headers.get("origin") || "https://phresh-connect-hub.lovable.app";

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : safeEmail,
      line_items: [
        {
          price: "price_1T1RKyQP580MvrLEmUIxfcal",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/brands?payment=success`,
      cancel_url: `${origin}/brands?payment=cancelled`,
      metadata: {
        brand_name: safeBrandName,
        service: "tiktok-shop-hosted-live",
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
