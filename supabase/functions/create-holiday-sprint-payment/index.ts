import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[HOLIDAY-SPRINT-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const { paymentType, customerEmail, customerName } = await req.json();
    
    if (!paymentType || !customerEmail) {
      throw new Error("Missing required fields: paymentType and customerEmail");
    }

    logStep("Payment request received", { paymentType, customerEmail, customerName });

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    
    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Check if customer already exists
    const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
    let customerId;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      const customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
      });
      customerId = customer.id;
      logStep("New customer created", { customerId });
    }

    // Determine price ID based on payment type
    const priceId = paymentType === "full" 
      ? "price_1SUA9bQP580MvrLEOkMCSFZ4"  // $5,000 one-time
      : "price_1SUABRQP580MvrLE65popQdD";  // $2,750/month

    const mode = paymentType === "full" ? "payment" : "subscription";
    
    logStep("Creating checkout session", { priceId, mode });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode,
      success_url: `${req.headers.get("origin")}/holiday?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/holiday-sprint-landing`,
      payment_method_types: ['card', 'affirm', 'afterpay_clearpay', 'klarna'],
      custom_text: {
        submit: {
          message: "Complete 72-hour, done-for-you Holiday Affiliate Sales System. Includes hero product selection, creator brief, holiday talking points, scripts, B-roll direction, affiliate link map, rollout checklist, and the master PDF system. No meetings. No calls. Immediate delivery in 72 hours after all assets are submitted."
        },
        after_submit: {
          message: "Thank you! Your Holiday Affiliate Sales Sprint™ is officially booked. Please complete the application form so we can begin your 72-hour build."
        }
      },
      metadata: {
        paymentType: paymentType,
        productType: "holiday_sprint",
      },
      // For subscription, cancel after 2 months
      ...(mode === "subscription" && {
        subscription_data: {
          metadata: {
            cancel_at_period_count: "2",
          },
        },
      }),
    });

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
