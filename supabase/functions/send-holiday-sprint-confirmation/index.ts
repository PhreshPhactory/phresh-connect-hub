import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import Stripe from "https://esm.sh/stripe@18.5.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2025-08-27.basil",
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  sessionId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId }: ConfirmationEmailRequest = await req.json();

    console.log("Retrieving session details for:", sessionId);

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (!session || !session.customer_details?.email) {
      throw new Error("Could not retrieve customer email from session");
    }

    const email = session.customer_details.email;
    console.log("Sending Holiday Sprint confirmation email to:", email);

    const emailResponse = await resend.emails.send({
      from: "Phresh Phactory, Inc. <info@phreshphactory.co>",
      to: [email],
      subject: "Your Holiday Sprint Is Officially Booked 🎁",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <p style="font-size: 16px; color: #333; line-height: 1.6;">Hi there,</p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">Thank you for securing your spot in <strong>The Holiday Affiliate Sales Sprint™</strong>.</p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">Your Sprint is now officially booked.</p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">To begin your 72-hour build, please complete your 7-minute intake form here:<br/>
          👉 <a href="https://www.phreshphactory.com/holiday-sprint" style="color: #D4AF37; text-decoration: underline;">Complete Your Intake Form</a></p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">Once your intake form and required brand assets are submitted, your 72-hour sprint window begins. You will receive:</p>
          
          <ul style="font-size: 16px; color: #333; line-height: 1.8; padding-left: 20px;">
            <li>Your Sprint Start Date</li>
            <li>A confirmation that your assets have been received</li>
            <li>Your delivery window</li>
            <li>The exact time your system will be completed</li>
          </ul>
          
          <h3 style="font-size: 18px; color: #333; margin-top: 30px; margin-bottom: 15px;">What You'll Receive in 72 Hours:</h3>
          
          <ul style="font-size: 16px; color: #333; line-height: 1.8; padding-left: 20px;">
            <li>3 Hero Products selected for holiday performance</li>
            <li>Holiday Creator Brief (what to say + highlight)</li>
            <li>Plug-and-play talking points & scripts</li>
            <li>Full content kit</li>
            <li>Holiday B-roll guidance</li>
            <li>Affiliate deep link map</li>
            <li>Internal rollout checklist</li>
            <li>One Master PDF with your entire system</li>
            <li>Organized asset folder for immediate affiliate distribution</li>
          </ul>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 30px;">If you have any questions, reply to this email.</p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">We're excited to create your complete Holiday Affiliate Sales System.</p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 30px;">Phresh Phactory, Inc.</p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending Holiday Sprint confirmation email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
