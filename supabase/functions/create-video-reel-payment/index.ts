import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import {
  checkRateLimit,
  getClientIP,
  createCorsHeaders,
  rateLimitResponse,
  DEFAULT_RATE_LIMIT,
} from "../_shared/rate-limit.ts";
import {
  isValidEmail,
  isValidUrl,
  sanitizeText,
  validateRequiredFields,
} from "../_shared/validation.ts";

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VIDEO-REEL-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  const corsHeaders = createCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const clientIP = getClientIP(req);
  if (!checkRateLimit(clientIP, "create-video-reel-payment", DEFAULT_RATE_LIMIT)) {
    logStep("Rate limit exceeded", { ip: clientIP });
    return rateLimitResponse(corsHeaders);
  }

  try {
    logStep("Function started");

    const body = await req.json();
    
    // Validate required fields
    const { valid, missing } = validateRequiredFields(body, [
      'productName', 'productDescription', 'productUrl', 'brandName', 'brandEmail'
    ]);
    
    if (!valid) {
      return new Response(
        JSON.stringify({ error: `Missing required fields: ${missing.join(', ')}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { productName, productDescription, productUrl, brandName, brandEmail, imageUrls } = body;

    // Validate email
    if (!isValidEmail(brandEmail)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate URL
    if (!isValidUrl(productUrl)) {
      return new Response(
        JSON.stringify({ error: "Invalid product URL" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize inputs
    const safeProductName = sanitizeText(productName, 200);
    const safeProductDescription = sanitizeText(productDescription, 2000);
    const safeProductUrl = sanitizeText(productUrl, 2000);
    const safeBrandName = sanitizeText(brandName, 200);
    const safeBrandEmail = sanitizeText(brandEmail, 255);

    // Validate and limit image URLs
    const safeImageUrls: string[] = [];
    if (Array.isArray(imageUrls)) {
      for (const url of imageUrls.slice(0, 10)) { // Max 10 images
        if (typeof url === 'string' && isValidUrl(url)) {
          safeImageUrls.push(sanitizeText(url, 2000));
        }
      }
    }

    logStep("Request validated", { safeBrandName, safeBrandEmail, safeProductName });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create submission record
    const { data: submission, error: dbError } = await supabase
      .from("video_reel_submissions")
      .insert({
        product_name: safeProductName,
        product_description: safeProductDescription,
        product_url: safeProductUrl,
        brand_name: safeBrandName,
        brand_email: safeBrandEmail,
        image_urls: safeImageUrls,
        payment_status: "pending"
      })
      .select()
      .single();

    if (dbError) {
      logStep("Database error", { error: dbError.message });
      throw new Error(`Failed to create submission: ${dbError.message}`);
    }

    logStep("Submission created", { submissionId: submission.id });

    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    
    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: safeBrandEmail, limit: 1 });
    let customerId;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      const customer = await stripe.customers.create({
        email: safeBrandEmail,
        name: safeBrandName,
      });
      customerId = customer.id;
      logStep("New customer created", { customerId });
    }

    // Create checkout session with the $100 price
    const origin = req.headers.get("origin") || "https://phresh-connect-hub.lovable.app";
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: "price_1SZvDHQP580MvrLErAYkvrPz", // $100 video reel price
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/brands?payment=success&submission=${submission.id}`,
      cancel_url: `${origin}/brands?payment=cancelled`,
      metadata: {
        submissionId: submission.id,
        productType: "video_reel",
      },
    });

    // Update submission with stripe session id
    await supabase
      .from("video_reel_submissions")
      .update({ stripe_session_id: session.id })
      .eq("id", submission.id);

    logStep("Checkout session created", { sessionId: session.id });

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
