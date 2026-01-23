import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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
  console.log(`[SSF-ENROLLMENT-NOTIFICATION] ${step}${detailsStr}`);
};

interface EnrollmentData {
  email: string;
  name?: string;
  businessName?: string;
  businessCityState: string;
  businessWebsite: string;
  googleEmail: string;
  selectedSessions: string[];
  confidenceLevel: number;
  totalAmount: number;
}

serve(async (req) => {
  const corsHeaders = createCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const clientIP = getClientIP(req);
  if (!checkRateLimit(clientIP, "ssf-enrollment-notification", DEFAULT_RATE_LIMIT)) {
    logStep("Rate limit exceeded", { ip: clientIP });
    return rateLimitResponse(corsHeaders);
  }

  try {
    logStep("Function started");

    const data: EnrollmentData = await req.json();
    logStep("Received enrollment data", { email: data.email, sessions: data.selectedSessions });

    // Validate email
    if (!isValidEmail(data.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Format session list
    const sessionLabels: Record<string, string> = {
      'ai101': 'AI 101 (Free Prep Session) - Feb. 3',
      'session1': 'Session 1: Package What You Sell - Feb. 10',
      'session2': 'Session 2: Conversion-Ready Video - Feb. 17',
      'session3': 'Session 3: Create Timely, Sellable Drops - Feb. 24',
      'session4': 'Session 4: Prepare for 24/7 Selling - Mar. 3',
    };

    const selectedSessionsList = data.selectedSessions
      .map(id => sessionLabels[id] || id)
      .join('<br>• ');

    const totalFormatted = data.totalAmount > 0 
      ? `$${(data.totalAmount / 100).toFixed(2)}` 
      : 'Free (AI 101 only)';

    const emailHtml = `
      <h2>New Socially Selling Food Enrollment</h2>
      
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Name</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${sanitizeText(data.name || 'Not provided', 100)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${sanitizeText(data.email, 255)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Business Name</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${sanitizeText(data.businessName || 'Not provided', 100)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Location</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${sanitizeText(data.businessCityState, 100)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Website</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${sanitizeText(data.businessWebsite, 255)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Google Email</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${sanitizeText(data.googleEmail, 255)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Confidence Level</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.confidenceLevel}/10</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Total Amount</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${totalFormatted}</td>
        </tr>
      </table>
      
      <h3 style="margin-top: 20px;">Selected Sessions</h3>
      <p>• ${selectedSessionsList}</p>
      
      <p style="margin-top: 20px; color: #666; font-size: 14px;">
        ${data.totalAmount > 0 ? 'Note: This enrollment is pending payment completion via Stripe.' : 'This is a free registration for the AI 101 prep session.'}
      </p>
    `;

    const emailResponse = await resend.emails.send({
      from: "Socially Selling Food <notifications@tx.phreshphactory.com>",
      to: ["kiera@eatokra.com"],
      subject: `New SSF Enrollment: ${sanitizeText(data.businessName || data.name || data.email, 50)}`,
      html: emailHtml,
    });

    logStep("Email sent successfully", { emailResponse });

    return new Response(
      JSON.stringify({ success: true, emailId: emailResponse.id }),
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
