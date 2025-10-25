import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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
  category: string;
  stage: string;
  socialMedia?: string;
  helpNeeded: string;
  message?: string;
  formType: 'brand-partnership';
}

type FormData = ContactFormData | NewsletterData | AssessmentData | BrandPartnershipData;

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: FormData = await req.json();
    console.log("Received form data:", data);

    let emailResponse;

    if (data.formType === 'contact') {
      const contactData = data as ContactFormData;
      
      // Send email to business
      emailResponse = await resend.emails.send({
        from: "Phresh Phactory Contact Form <no-reply@phreshphactory.com>",
        to: ["info@phreshphactory.co"],
        subject: `New Contact Form Submission - ${contactData.serviceInterest || 'General Inquiry'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #555; margin-top: 0;">Contact Information</h3>
              <p><strong>Name:</strong> ${contactData.name}</p>
              <p><strong>Email:</strong> ${contactData.email}</p>
              ${contactData.website ? `<p><strong>Website:</strong> ${contactData.website}</p>` : ''}
            </div>

            <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #555; margin-top: 0;">Business Details</h3>
              ${contactData.companyStage ? `<p><strong>Company Stage:</strong> ${contactData.companyStage}</p>` : ''}
              ${contactData.serviceInterest ? `<p><strong>Service Interest:</strong> ${contactData.serviceInterest}</p>` : ''}
            </div>

            ${contactData.challenges ? `
              <div style="background: #fff5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #555; margin-top: 0;">Challenges</h3>
                <p>${contactData.challenges}</p>
              </div>
            ` : ''}

            ${contactData.message ? `
              <div style="background: #f5fff5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #555; margin-top: 0;">Additional Message</h3>
                <p>${contactData.message}</p>
              </div>
            ` : ''}

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p>This email was sent from the Phresh Phactory contact form.</p>
              <p>Submitted on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      });

    } else if (data.formType === 'newsletter') {
      const newsletterData = data as NewsletterData;
      
      // Send newsletter signup notification to business
      emailResponse = await resend.emails.send({
        from: "Phresh Phactory Newsletter <no-reply@phreshphactory.com>",
        to: ["info@phreshphactory.co"],
        subject: "New Newsletter Subscription",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Newsletter Subscription</h2>
            <p><strong>Email:</strong> ${newsletterData.email}</p>
            <p><strong>Subscribed on:</strong> ${new Date().toLocaleString()}</p>
          </div>
        `,
      });

    } else if (data.formType === 'assessment') {
      const assessmentData = data as AssessmentData;
      
      // Send assessment request to business
      emailResponse = await resend.emails.send({
        from: "Phresh Phactory Assessment <no-reply@phreshphactory.com>",
        to: ["info@phreshphactory.co"],
        subject: "New Free Assessment Request",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Free Assessment Request</h2>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${assessmentData.name}</p>
              <p><strong>Email:</strong> ${assessmentData.email}</p>
              <p><strong>Type:</strong> ${assessmentData.type}</p>
              ${assessmentData.company ? `<p><strong>Company:</strong> ${assessmentData.company}</p>` : ''}
            </div>
            <p><strong>Requested on:</strong> ${new Date().toLocaleString()}</p>
          </div>
        `,
      });
    } else if (data.formType === 'brand-partnership') {
      const brandData = data as BrandPartnershipData;
      
      // Send brand partnership application to business
      emailResponse = await resend.emails.send({
        from: "Phresh Phactory Brand Partnership <no-reply@phreshphactory.com>",
        to: ["info@phreshphactory.co"],
        subject: `New Brand Partnership Application - ${brandData.brandName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
              New Brand Partnership Application
            </h2>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #555; margin-top: 0;">Contact Information</h3>
              <p><strong>Owner Name:</strong> ${brandData.name}</p>
              <p><strong>Email:</strong> ${brandData.email}</p>
            </div>

            <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #555; margin-top: 0;">Brand Information</h3>
              <p><strong>Brand Name:</strong> ${brandData.brandName}</p>
              <p><strong>Website:</strong> <a href="${brandData.website}">${brandData.website}</a></p>
              <p><strong>Category:</strong> ${brandData.category}</p>
              <p><strong>Stage:</strong> ${brandData.stage}</p>
              ${brandData.socialMedia ? `<p><strong>Social Media:</strong> ${brandData.socialMedia}</p>` : ''}
            </div>

            <div style="background: #fff5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #555; margin-top: 0;">Help Needed</h3>
              <p>${brandData.helpNeeded}</p>
            </div>

            ${brandData.message ? `
              <div style="background: #f5fff5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #555; margin-top: 0;">About the Brand</h3>
                <p>${brandData.message}</p>
              </div>
            ` : ''}

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p>This email was sent from the Phresh Phactory Brand Partnership form.</p>
              <p>Submitted on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      });
    }

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
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