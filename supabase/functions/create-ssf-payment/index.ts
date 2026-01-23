import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-SSF-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const { priceIds, customerEmail, customerName } = await req.json();
    logStep("Request parsed", { priceIds, customerEmail, customerName });

    if (!priceIds || priceIds.length === 0) {
      throw new Error("No price IDs provided");
    }

    if (!customerEmail) {
      throw new Error("Customer email is required");
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    logStep("Stripe key verified");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
    let customerId: string | undefined;

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
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
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/socially-selling-food?success=true`,
      cancel_url: `${origin}/socially-selling-food?canceled=true`,
      metadata: {
        program: "socially_selling_food",
        customer_email: customerEmail,
      },
      custom_text: {
        submit: {
          message: "Your enrollment will be confirmed after payment. You'll receive access to Google Classroom within 24 hours.",
        },
      },
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

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
