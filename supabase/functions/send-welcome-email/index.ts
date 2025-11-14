import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  name?: string;
  source: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, source }: WelcomeEmailRequest = await req.json();

    console.log(`Sending welcome email to ${email} from source: ${source}`);

    const emailResponse = await resend.emails.send({
      from: "Phresh Phactory <info@phreshphactory.co>",
      to: [email],
      subject: "Welcome to Phresh Phactory's Insider List! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Phresh Phactory</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; background-color: #f9fafb;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Welcome to Phresh Phactory! 🎉</h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                          ${name ? `Hey ${name}!` : 'Hey there!'}
                        </p>
                        
                        <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                          Thanks for joining our community! We're excited to have you on board.
                        </p>
                        
                        <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                          You'll receive strategic insights on:
                        </p>
                        
                        <ul style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px; padding-left: 20px;">
                          <li style="margin-bottom: 10px;">Affiliate marketing strategies that actually work</li>
                          <li style="margin-bottom: 10px;">Holiday sales tactics to maximize revenue</li>
                          <li style="margin-bottom: 10px;">Exclusive brand partnership opportunities</li>
                          <li style="margin-bottom: 10px;">Behind-the-scenes insights from successful campaigns</li>
                        </ul>
                        
                        <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                          In the meantime, check out our latest resources and connect with us on social media!
                        </p>
                        
                        <!-- CTA Button -->
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="padding: 20px 0;">
                              <a href="https://phreshphactory.co" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: bold; font-size: 16px;">
                                Visit Our Website
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 30px 0 0;">
                          To your success,<br>
                          <strong>The Phresh Phactory Team</strong>
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                        <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 10px;">
                          Phresh Phactory Inc.
                        </p>
                        <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 10px;">
                          You're receiving this email because you subscribed to our newsletter.
                        </p>
                        <p style="color: #6b7280; font-size: 12px; line-height: 1.6; margin: 0;">
                          Source: ${source}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
