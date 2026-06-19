import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// SERVER-SIDE PRICE CATALOG.
// Client may only reference items by ID — amounts are never trusted from the
// request body, preventing arbitrary-price checkout sessions.
type CatalogItem = { name: string; description?: string; amount: number };

const BASE_RETAINER: CatalogItem = {
  name: "Base Strategic Advisory & Talent Floor",
  description: "Monthly base retainer",
  amount: 350000,
};

const PREMIUM_UPGRADE_IDS = new Set([
  "task-1-2", "task-1-3", "task-1-5", "task-1-6", "task-1-7",
  "task-1-8", "task-1-9", "task-1-11", "task-1-13", "task-1-14", "task-1-15",
]);
const PREMIUM_UPGRADE_AMOUNT = 25000; // $250/mo each, fixed
const PREMIUM_UPGRADE_NAMES: Record<string, string> = {
  "task-1-2": "Task 1.2: Cross-Platform Fundraiser Duplication — Premium Agency-Managed",
  "task-1-3": "Task 1.3: Omnichannel Product Tagging — Premium Agency-Managed",
  "task-1-5": "Task 1.5: Live Streaming Infrastructure — Premium Agency-Managed",
  "task-1-6": "Task 1.6: AI-Assisted Content Syndication — Premium Agency-Managed",
  "task-1-7": "Task 1.7: Strategic Media Relations & PR — Premium Agency-Managed",
  "task-1-8": "Task 1.8: Citizen Scientist Subscription Architecture — Premium Agency-Managed",
  "task-1-9": "Task 1.9: Digital Youth Curriculum — Premium Agency-Managed",
  "task-1-11": "Task 1.11: Institutional Corporate Sponsorship — Premium Agency-Managed",
  "task-1-13": "Task 1.13: TED Talk Acquisition — Premium Managed PR Pitching",
  "task-1-14": "Task 1.14: Board of Director Placement — Premium Agency-Managed",
  "task-1-15": "Task 1.15: Strategic Fundraising Planning — Premium Agency-Managed",
};

const MOR_SETUP: CatalogItem = {
  name: "MoR Upfront Setup Fee (Addendum A)",
  description: "One-time storefront build, tax/legal infrastructure, payment gateways",
  amount: 1000000,
};
const MOR_OPS: CatalogItem = {
  name: "MoR Monthly Operations (Addendum A)",
  description: "$1,000/week — customer support, web maintenance, platform subscriptions",
  amount: 400000,
};

interface Payload {
  mode: "payment" | "subscription";
  customer_email?: string;
  // IDs only — no amounts accepted from client
  premium_upgrade_ids?: string[];
  include_mor_setup?: boolean;
  include_mor_ops?: boolean;
  base_description?: string; // priorities text, descriptive only
  origin?: string;
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 255;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY not configured");

    const body: Payload = await req.json();
    const {
      mode,
      customer_email,
      premium_upgrade_ids = [],
      include_mor_setup = false,
      include_mor_ops = false,
      base_description,
    } = body;
    const origin = body.origin || req.headers.get("origin") || "https://phreshphactory.com";

    if (!["payment", "subscription"].includes(mode)) {
      throw new Error("Invalid mode");
    }
    if (customer_email && !isEmail(customer_email)) {
      throw new Error("Invalid email");
    }
    if (!Array.isArray(premium_upgrade_ids) || premium_upgrade_ids.length > 50) {
      throw new Error("Invalid upgrade list");
    }

    // Build trusted line items from server catalog
    const baseItem: CatalogItem = {
      ...BASE_RETAINER,
      description: typeof base_description === "string" && base_description.length
        ? base_description.slice(0, 500)
        : BASE_RETAINER.description,
    };

    const upgradeItems: CatalogItem[] = [];
    for (const id of premium_upgrade_ids) {
      if (!PREMIUM_UPGRADE_IDS.has(id)) continue; // silently ignore unknown IDs
      upgradeItems.push({
        name: PREMIUM_UPGRADE_NAMES[id],
        amount: PREMIUM_UPGRADE_AMOUNT,
      });
    }

    const monthly_items: CatalogItem[] = [baseItem, ...upgradeItems];
    if (include_mor_ops) monthly_items.push(MOR_OPS);

    const one_time_items: CatalogItem[] = [];
    if (include_mor_setup) one_time_items.push(MOR_SETUP);

    if (monthly_items.length === 0 && one_time_items.length === 0) {
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
          quantity: 1,
        });
      }
    } else {
      for (const it of [...one_time_items, ...monthly_items]) {
        line_items.push({
          price_data: {
            currency: "usd",
            product_data: { name: it.name, description: it.description?.slice(0, 500) },
            unit_amount: it.amount,
          },
          quantity: 1,
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

    if (mode === "subscription" && one_time_items.length > 0) {
      const created = await Promise.all(one_time_items.map(it =>
        stripe.products.create({ name: it.name, description: it.description?.slice(0, 500) })
      ));
      sessionParams.subscription_data = {
        add_invoice_items: one_time_items.map((it, i) => ({
          quantity: 1,
          price_data: {
            currency: "usd",
            product: created[i].id,
            unit_amount: it.amount,
          },
        })),
      };
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
      status: 400,
    });
  }
});
