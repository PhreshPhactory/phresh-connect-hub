import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";

export default function HolidaySprintPaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    // Send confirmation email if we have a session ID
    const sendConfirmationEmail = async () => {
      if (sessionId && !emailSent) {
        try {
          console.log("Sending confirmation email for session:", sessionId);
          await supabase.functions.invoke("send-holiday-sprint-confirmation", {
            body: { sessionId },
          });
          setEmailSent(true);
          console.log("Confirmation email sent successfully");
        } catch (error) {
          console.error("Error sending confirmation email:", error);
          // Don't block the user experience if email fails
        }
      }
    };

    sendConfirmationEmail();

    // Redirect to application form after 5 seconds
    const timer = setTimeout(() => {
      navigate("/holiday-sprint");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, sessionId, emailSent]);

  return (
    <>
      <SEOHead
        title="Payment Successful - Holiday Affiliate Sales Sprint™"
        description="Your payment was successful. Complete your application now."
        keywords="payment success, holiday sprint"
      />

      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/10 flex items-center justify-center py-20 px-4">
        <Card className="max-w-2xl w-full border-2 shadow-lg">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                Payment Successful! 🎉
              </h1>
              <p className="text-xl text-muted-foreground">
                Welcome to The Holiday Affiliate Sales Sprint™
              </p>
            </div>

            <div className="bg-muted/30 p-6 rounded-lg space-y-3 text-left max-w-md mx-auto">
              <h2 className="font-bold text-lg text-center mb-4">Next Steps:</h2>
              <div className="space-y-2 text-sm">
                <p>✅ Payment received and confirmed</p>
                <p>✅ You'll receive a confirmation email shortly</p>
                <p>🎯 <strong>Now:</strong> Complete your application form</p>
                <p>⚡ <strong>Then:</strong> We'll start building within 24 hours</p>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                Redirecting you to complete your intake form in a few seconds...
              </p>
              <button
                onClick={() => navigate("/holiday-sprint")}
                className="text-strategic-gold hover:underline font-semibold mt-2"
              >
                Click here if you're not redirected automatically
              </button>
            </div>

            {sessionId && (
              <p className="text-xs text-muted-foreground pt-4">
                Session ID: {sessionId}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
