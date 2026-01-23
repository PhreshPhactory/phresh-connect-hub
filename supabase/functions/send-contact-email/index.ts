import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import {
  checkRateLimit,
  getClientIP,
  createCorsHeaders,
  rateLimitResponse,
  STRICT_RATE_LIMIT,
} from "../_shared/rate-limit.ts";
import {
  isValidEmail,
  sanitizeText,
  escapeHtml,
  validateRequiredFields,
} from "../_shared/validation.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface ContactFormData {
  name: string;
  email: string;
  website?: string;
  companyStage?: string;
  challenges?: string;
  serviceInterest?: string;
  message?: string;
  formType: 'contact';
}

interface NewsletterData {
  email: string;
  formType: 'newsletter';
}

interface AssessmentData {
  name: string;
  email: string;
  type: string;
  company?: string;
  formType: 'assessment';
}

interface BrandPartnershipData {
  name: string;
  email: string;
  brandName: string;
  website: string;
  hasJoinedAfrofiliate: string;
  budget: string;
  interestedInVideoFeature: string;
  interestedInWrittenContent: string;
  interestedInGrowthSupport: string;
  interestedInUGC: string;
  interestedInSocialMedia: string;
  otherServices?: string;
  message?: string;
  formType: 'brand-partnership';
}

type FormData = ContactFormData | NewsletterData | AssessmentData | BrandPartnershipData;

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = createCorsHeaders(req);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const clientIP = getClientIP(req);
  if (!checkRateLimit(clientIP, "send-contact-email", STRICT_RATE_LIMIT)) {
    console.log(`Rate limit exceeded for IP: ${clientIP}`);
    return rateLimitResponse(corsHeaders);
  }

  try {
    const data: FormData = await req.json();
    console.log("Received form submission of type:", data.formType);

    // Validate email exists for all form types
    const email = "email" in data ? data.email : undefined;
    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let emailResponse;

    if (data.formType === 'contact') {
      const contactData = data as ContactFormData;
      
      // Validate required fields
      const { valid, missing } = validateRequiredFields(contactData, ['name', 'email']);
      if (!valid) {
        return new Response(
          JSON.stringify({ error: `Missing required fields: ${missing.join(', ')}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Sanitize inputs
      const safeName = sanitizeText(contactData.name, 100);
      const safeEmail = sanitizeText(contactData.email, 255);
      const safeWebsite = sanitizeText(contactData.website, 500);
      const safeCompanyStage = sanitizeText(contactData.companyStage, 100);
      const safeChallenges = sanitizeText(contactData.challenges, 2000);
      const safeServiceInterest = sanitizeText(contactData.serviceInterest, 200);
      const safeMessage = sanitizeText(contactData.message, 2000);
      
      // Send email to business
      emailResponse = await resend.emails.send({
        from: "Phresh Phactory <onboarding@resend.dev>",
        to: ["info@phreshphactory.co"],
        subject: `New Contact Form Submission - ${escapeHtml(safeServiceInterest) || 'General Inquiry'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #555; margin-top: 0;">Contact Information</h3>
              <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
              <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
              ${safeWebsite ? `<p><strong>Website:</strong> ${escapeHtml(safeWebsite)}</p>` : ''}
            </div>

            <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #555; margin-top: 0;">Business Details</h3>
              ${safeCompanyStage ? `<p><strong>Company Stage:</strong> ${escapeHtml(safeCompanyStage)}</p>` : ''}
              ${safeServiceInterest ? `<p><strong>Service Interest:</strong> ${escapeHtml(safeServiceInterest)}</p>` : ''}
            </div>

            ${safeChallenges ? `
              <div style="background: #fff5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #555; margin-top: 0;">Challenges</h3>
                <p>${escapeHtml(safeChallenges)}</p>
              </div>
            ` : ''}

            ${safeMessage ? `
              <div style="background: #f5fff5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #555; margin-top: 0;">Additional Message</h3>
                <p>${escapeHtml(safeMessage)}</p>
              </div>
            ` : ''}

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p>This email was sent from the Phresh Phactory contact form.</p>
              <p>Submitted on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      });

      // Send confirmation email to submitter
      await resend.emails.send({
        from: "Phresh Phactory <onboarding@resend.dev>",
        to: [safeEmail],
        subject: "Thank you for contacting Phresh Phactory",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
              Thank You for Reaching Out!
            </h2>
            
            <p>Hi ${escapeHtml(safeName)},</p>
            
            <p>We've received your message and appreciate you taking the time to contact us. Our team will review your inquiry and get back to you shortly.</p>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #555; margin-top: 0;">Your Submission Summary</h3>
              <p><strong>Service Interest:</strong> ${escapeHtml(safeServiceInterest) || 'General Inquiry'}</p>
              ${safeCompanyStage ? `<p><strong>Company Stage:</strong> ${escapeHtml(safeCompanyStage)}</p>` : ''}
            </div>
            
            <p>In the meantime, feel free to explore our services and resources on our website.</p>
            
            <p>Best regards,<br>The Phresh Phactory Team</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p>Questions? Reply to this email at info@phreshphactory.co</p>
            </div>
          </div>
        `,
      });

    } else if (data.formType === 'newsletter') {
      const newsletterData = data as NewsletterData;
      const safeEmail = sanitizeText(newsletterData.email, 255);
      
      // Send newsletter signup notification to business
      emailResponse = await resend.emails.send({
        from: "Phresh Phactory <onboarding@resend.dev>",
        to: ["info@phreshphactory.co"],
        subject: "New Newsletter Subscription",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Newsletter Subscription</h2>
            <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
            <p><strong>Subscribed on:</strong> ${new Date().toLocaleString()}</p>
          </div>
        `,
      });

    } else if (data.formType === 'assessment') {
      const assessmentData = data as AssessmentData;
      
      const { valid, missing } = validateRequiredFields(assessmentData, ['name', 'email', 'type']);
      if (!valid) {
        return new Response(
          JSON.stringify({ error: `Missing required fields: ${missing.join(', ')}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const safeName = sanitizeText(assessmentData.name, 100);
      const safeEmail = sanitizeText(assessmentData.email, 255);
      const safeType = sanitizeText(assessmentData.type, 100);
      const safeCompany = sanitizeText(assessmentData.company, 200);
      
      // Send assessment request to business
      emailResponse = await resend.emails.send({
        from: "Phresh Phactory <onboarding@resend.dev>",
        to: ["info@phreshphactory.co"],
        subject: "New Free Assessment Request",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Free Assessment Request</h2>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
              <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
              <p><strong>Type:</strong> ${escapeHtml(safeType)}</p>
              ${safeCompany ? `<p><strong>Company:</strong> ${escapeHtml(safeCompany)}</p>` : ''}
            </div>
            <p><strong>Requested on:</strong> ${new Date().toLocaleString()}</p>
          </div>
        `,
      });
    } else if (data.formType === 'brand-partnership') {
      const brandData = data as BrandPartnershipData;
      
      const { valid, missing } = validateRequiredFields(brandData, ['name', 'email', 'brandName', 'website']);
      if (!valid) {
        return new Response(
          JSON.stringify({ error: `Missing required fields: ${missing.join(', ')}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const safeName = sanitizeText(brandData.name, 100);
      const safeEmail = sanitizeText(brandData.email, 255);
      const safeBrandName = sanitizeText(brandData.brandName, 200);
      const safeWebsite = sanitizeText(brandData.website, 500);
      const safeMessage = sanitizeText(brandData.message, 2000);
      const safeOtherServices = sanitizeText(brandData.otherServices, 500);
      
      // Send brand partnership application to business
      emailResponse = await resend.emails.send({
        from: "Phresh Phactory <onboarding@resend.dev>",
        to: ["info@phreshphactory.co"],
        subject: `Brand Feature Application - ${escapeHtml(safeBrandName)}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
              New Brand Feature Application
            </h2>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #555; margin-top: 0;">Contact Information</h3>
              <p><strong>Owner Name:</strong> ${escapeHtml(safeName)}</p>
              <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
            </div>

            <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #555; margin-top: 0;">Brand Information</h3>
              <p><strong>Brand Name:</strong> ${escapeHtml(safeBrandName)}</p>
              <p><strong>Website:</strong> <a href="${escapeHtml(safeWebsite)}">${escapeHtml(safeWebsite)}</a></p>
              <p><strong>On Afrofiliate:</strong> ${escapeHtml(sanitizeText(brandData.hasJoinedAfrofiliate, 50))}</p>
              <p><strong>Budget Range:</strong> ${escapeHtml(sanitizeText(brandData.budget, 100))}</p>
            </div>

            <div style="background: #fff5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #555; margin-top: 0;">Services Interested In</h3>
              <p><strong>Video Feature:</strong> ${escapeHtml(sanitizeText(brandData.interestedInVideoFeature, 50))}</p>
              <p><strong>Written Content:</strong> ${escapeHtml(sanitizeText(brandData.interestedInWrittenContent, 50))}</p>
              <p><strong>Growth Support (Paid Service):</strong> ${escapeHtml(sanitizeText(brandData.interestedInGrowthSupport, 50))}</p>
              <p><strong>UGC Creation:</strong> ${escapeHtml(sanitizeText(brandData.interestedInUGC, 50))}</p>
              <p><strong>Social Media Management:</strong> ${escapeHtml(sanitizeText(brandData.interestedInSocialMedia, 50))}</p>
              ${safeOtherServices ? `<p><strong>Other Services:</strong> ${escapeHtml(safeOtherServices)}</p>` : ''}
            </div>

            ${safeMessage ? `
              <div style="background: #f5fff5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #555; margin-top: 0;">About the Brand</h3>
                <p>${escapeHtml(safeMessage)}</p>
              </div>
            ` : ''}

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p>This email was sent from the Phresh Phactory Brand Feature Application form.</p>
              <p>Submitted on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      });
    }

    console.log("Email sent successfully");

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
