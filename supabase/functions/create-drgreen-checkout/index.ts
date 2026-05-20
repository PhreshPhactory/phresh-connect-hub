import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LineItemInput {
  name: string;
  description?: string;
  amount: number; // cents
  quantity?: number;
}

interface Payload {
  mode: "payment" | "subscription";
  customer_email?: string;
  one_time_items?: LineItemInput[]; // setup fees, one-time selections
  monthly_items?: LineItemInput[];  // monthly recurring (used when mode=subscription) or charged once when mode=payment
  origin?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY not configured");

    const body: Payload = await req.json();
    const { mode, customer_email, one_time_items = [], monthly_items = [] } = body;
    const origin = body.origin || req.headers.get("origin") || "https://phreshphactory.com";

    if (!["payment", "subscription"].includes(mode)) {
      throw new Error("Invalid mode");
    }
    if (one_time_items.length === 0 && monthly_items.length === 0) {
      throw new Error("No items selected");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    const line_items: any[] = [];

    if (mode === "subscription") {
      for (const it of monthly_items) {
        line_items.push({
          price_data: {
            currency: "usd",
            product_data: { name: it.name, description: it.description?.slice(0, 500) },
            unit_amount: it.amount,
            recurring: { interval: "month" },
          },
          quantity: it.quantity ?? 1,
        });
      }
    } else {
      // one-time payment: include both one-time and monthly items as one-time charges (this month only)
      for (const it of [...one_time_items, ...monthly_items]) {
        line_items.push({
          price_data: {
            currency: "usd",
            product_data: { name: it.name, description: it.description?.slice(0, 500) },
            unit_amount: it.amount,
          },
          quantity: it.quantity ?? 1,
        });
      }
    }

    const sessionParams: any = {
      mode,
      line_items,
      success_url: `${origin}/drgreen?payment=success`,
      cancel_url: `${origin}/drgreen?payment=cancelled`,
    };
    if (customer_email) sessionParams.customer_email = customer_email;

    // If subscription + one_time_items, add them via invoice_items not directly supported in checkout subscription.
    // Workaround: add to subscription as additional add_invoice_items.
    if (mode === "subscription" && one_time_items.length > 0) {
      sessionParams.subscription_data = {
        ...(sessionParams.subscription_data || {}),
      };
      // Use add_invoice_items at checkout session level
      sessionParams.invoice_creation = undefined;
      // Stripe Checkout supports adding one-time invoice items via subscription_data.add_invoice_items in some versions; safer approach:
      // Create dedicated invoice items by adding them as one-off line items requires payment mode. So instead push them as price_data on the first invoice via subscription_data.invoice_settings is not possible.
      // Cleanest path: include one-time charges as "subscription_data: { invoice_settings: ... }" not supported; instead append them as part of line_items with recurring on the first invoice — not possible mixed.
      // We'll attach one-time items as separate subscription_data.add_invoice_items.
      (sessionParams.subscription_data as any).add_invoice_items = one_time_items.map(it => ({
        quantity: it.quantity ?? 1,
        price_data: {
          currency: "usd",
          product: undefined,
          unit_amount: it.amount,
        },
      }));
      // Stripe requires a product reference for add_invoice_items price_data; create on the fly
      const created = await Promise.all(one_time_items.map(it =>
        stripe.products.create({ name: it.name, description: it.description?.slice(0, 500) })
      ));
      (sessionParams.subscription_data as any).add_invoice_items = one_time_items.map((it, i) => ({
        quantity: it.quantity ?? 1,
        price_data: {
          currency: "usd",
          product: created[i].id,
          unit_amount: it.amount,
        },
      }));
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e) {
    console.error("[create-drgreen-checkout]", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
