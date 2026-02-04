import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { Resend } from "npm:resend@2.0.0";
import {
  createCorsHeaders,
  checkRateLimit,
  getClientIP,
  rateLimitResponse,
  DEFAULT_RATE_LIMIT,
} from "../_shared/rate-limit.ts";
import { isValidEmail, sanitizeText } from "../_shared/validation.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SEND-SSF-INVOICE] ${step}${detailsStr}`);
};

const BUNDLE_PRICE_ID = "price_1Sx854QP580MvrLEZAxk6BOn";

serve(async (req) => {
  const corsHeaders = createCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const clientIP = getClientIP(req);
  if (!checkRateLimit(clientIP, "send-ssf-invoice", DEFAULT_RATE_LIMIT)) {
    logStep("Rate limit exceeded", { ip: clientIP });
    return rateLimitResponse(corsHeaders);
  }

  try {
    logStep("Function started");

    const body = await req.json();
    const { email, name, businessName } = body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Valid email address is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const safeEmail = sanitizeText(email, 255);
    const safeName = sanitizeText(name || "", 100);
    const safeBusinessName = sanitizeText(businessName || "", 100);

    logStep("Creating Stripe checkout session", { email: safeEmail });

    // Create Stripe checkout session
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: safeEmail, limit: 1 });
    let customerId: string | undefined;

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      const customer = await stripe.customers.create({
        email: safeEmail,
        name: safeName || undefined,
        metadata: { source: "ssf_invoice" },
      });
      customerId = customer.id;
      logStep("Created new customer", { customerId });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [{ price: BUNDLE_PRICE_ID, quantity: 1 }],
      mode: "payment",
      success_url: "https://phresh-connect-hub.lovable.app/socially-selling-food?success=true",
      cancel_url: "https://phresh-connect-hub.lovable.app/socially-selling-food?canceled=true",
      metadata: {
        program: "socially_selling_food",
        customer_email: safeEmail,
        invoice_sent: "true",
      },
      custom_text: {
        submit: {
          message: "Your enrollment will be confirmed after payment. You'll receive access to Google Classroom within 24 hours.",
        },
      },
    });

    logStep("Checkout session created", { sessionId: session.id });

    // Send email with payment link
    const displayName = safeName || safeBusinessName || "there";
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #E85D04; margin-bottom: 10px;">Socially Selling Food</h1>
          <p style="color: #666; font-size: 14px;">4-Session Workshop Series</p>
        </div>
        
        <p>Hey ${displayName}! 👋</p>
        
        <p>Thank you for your interest in <strong>Socially Selling Food</strong>! Here's your personalized payment link for the complete 4-session bundle:</p>
        
        <div style="background: linear-gradient(135deg, #E85D04 0%, #DC2F02 100%); border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
          <p style="color: white; font-size: 24px; font-weight: bold; margin: 0 0 8px 0;">$299</p>
          <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 0 0 16px 0;">All 4 Sessions Included</p>
          <a href="${session.url}" style="display: inline-block; background: white; color: #E85D04; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">Complete Payment →</a>
        </div>
        
        <h3 style="color: #E85D04; margin-top: 30px;">What's Included:</h3>
        <ul style="padding-left: 20px;">
          <li><strong>Session 1 (Feb 10):</strong> Package What You Sell</li>
          <li><strong>Session 2 (Feb 17):</strong> Conversion-Ready Video</li>
          <li><strong>Session 3 (Feb 24):</strong> Create Timely, Sellable Drops</li>
          <li><strong>Session 4 (Mar 3):</strong> Prepare for 24/7 Selling</li>
        </ul>
        
        <p style="margin-top: 24px;">After payment, you'll receive Google Classroom access within 24 hours with all materials and live session links.</p>
        
        <p>Questions? Just reply to this email.</p>
        
        <p style="margin-top: 30px;">
          See you in class! 🍽️<br>
          <strong>Kiera H.</strong><br>
          <span style="color: #666;">Phresh Phactory</span>
        </p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #999; font-size: 12px; text-align: center;">
          This payment link expires in 24 hours. If you have any issues, contact kiera@eatokra.com
        </p>
      </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Socially Selling Food <notifications@phreshphactory.co>",
      to: [safeEmail],
      subject: "Your Socially Selling Food Payment Link — $299 Bundle",
      html: emailHtml,
    });

    logStep("Invoice email sent", { emailId: emailResponse.id, to: safeEmail });

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailId: emailResponse.id,
        checkoutUrl: session.url,
        message: `Invoice sent to ${safeEmail}` 
      }),
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
