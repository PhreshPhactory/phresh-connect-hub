import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface IntakeConfirmationRequest {
  email: string;
  name: string;
  brandName: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, brandName }: IntakeConfirmationRequest = await req.json();

    console.log("Sending intake confirmation email to:", email);

    const emailResponse = await resend.emails.send({
      from: "Phresh Phactory, Inc. <info@phreshphactory.co>",
      to: [email],
      subject: "Intake Form Received — Your 72-Hour Sprint Is Almost Ready",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <p style="font-size: 16px; color: #333; line-height: 1.6;">Hi there,</p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">We received your Holiday Sprint intake form — thank you for submitting everything.</p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">Your 72-hour sprint window will begin once we confirm that all required brand assets have been received.</p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">We will review your submission and email you shortly with:</p>
          
          <ul style="font-size: 16px; color: #333; line-height: 1.8; padding-left: 20px;">
            <li>Confirmation that all assets are complete</li>
            <li>Your official Sprint Start Date</li>
            <li>Your delivery window</li>
          </ul>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6;">If anything is missing, we will notify you right away so you can upload the final items.</p>
          
          <h3 style="font-size: 18px; color: #333; margin-top: 30px; margin-bottom: 15px;">Once the Sprint begins, we create your full system and deliver:</h3>
          
          <ul style="font-size: 16px; color: #333; line-height: 1.8; padding-left: 20px;">
            <li>One Master PDF</li>
            <li>One organized asset folder (scripts, talking points, content kit, link map, creator brief)</li>
            <li>Your holiday activation plan, ready to send to affiliates immediately</li>
          </ul>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 30px;">If you have any questions before your Sprint begins, reply to this email.</p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6; margin-top: 30px;">— Phresh Phactory, Inc.</p>
        </div>
      `,
    });

    console.log("Intake confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending intake confirmation email:", error);
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
