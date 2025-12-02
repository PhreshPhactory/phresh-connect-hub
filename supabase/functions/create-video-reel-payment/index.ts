import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VIDEO-REEL-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const { 
      productName, 
      productDescription, 
      productUrl, 
      brandName, 
      brandEmail,
      imageUrls 
    } = await req.json();
    
    if (!productName || !productDescription || !productUrl || !brandName || !brandEmail) {
      throw new Error("Missing required fields");
    }

    logStep("Request received", { brandName, brandEmail, productName });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create submission record
    const { data: submission, error: dbError } = await supabase
      .from("video_reel_submissions")
      .insert({
        product_name: productName,
        product_description: productDescription,
        product_url: productUrl,
        brand_name: brandName,
        brand_email: brandEmail,
        image_urls: imageUrls || [],
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
    const customers = await stripe.customers.list({ email: brandEmail, limit: 1 });
    let customerId;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      const customer = await stripe.customers.create({
        email: brandEmail,
        name: brandName,
      });
      customerId = customer.id;
      logStep("New customer created", { customerId });
    }

    // Create checkout session with the $100 price
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: "price_1SZvDHQP580MvrLErAYkvrPz", // $100 video reel price
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/brands?payment=success&submission=${submission.id}`,
      cancel_url: `${req.headers.get("origin")}/brands?payment=cancelled`,
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

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

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
