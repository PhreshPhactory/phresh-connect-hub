import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ExternalLink } from "lucide-react";
import SEOHead from "@/components/SEOHead";

export default function HolidaySprintThankYou() {
  // Replace this with your actual Stripe checkout URL for the $5,000 Holiday Sprint
  const stripeCheckoutUrl = "https://buy.stripe.com/test_yourcheckoutlink";

  return (
    <>
      <SEOHead
        title="Application Received - THE HOLIDAY AFFILIATE SALES SPRINT™"
        description="Your application has been submitted. Complete payment to secure your session."
      />

      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/10 flex items-center justify-center py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="border-2 border-strategic-gold shadow-2xl bg-card">
            <CardContent className="p-12 md:p-16 text-center">
              {/* Success Icon */}
              <div className="mb-8">
                <CheckCircle className="w-20 h-20 mx-auto text-strategic-gold" />
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Your Holiday Sprint Application Has Been Received
              </h1>

              {/* Subtext */}
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Thank you — your application has been submitted.
                <br />
                To secure your 72-Hour Holiday Sprint, please complete your payment below.
              </p>

              {/* Payment Button */}
              <Button
                asChild
                size="lg"
                className="w-full md:w-auto bg-strategic-gold hover:bg-strategic-gold/90 text-background font-bold text-lg px-12 py-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                <a href={stripeCheckoutUrl} target="_blank" rel="noopener noreferrer">
                  Complete Payment — $5,000
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>

              {/* Clarity Line */}
              <div className="mt-6">
                <p className="text-sm text-muted-foreground italic">
                  Takes 7 minutes. No meetings. No calls. Your 72 hours begin after assets are received.
                </p>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-6 bg-muted/30 rounded-lg">
                <p className="text-sm text-foreground mb-4">
                  <strong className="text-strategic-gold">What Happens After Payment</strong>
                </p>
                <p className="text-sm text-foreground mb-3">
                  After your payment is confirmed, you will automatically receive:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
                  <li>• A confirmation email</li>
                  <li>• A link to your 7-minute intake form</li>
                  <li>• Instructions for submitting brand assets</li>
                  <li>• Your Sprint Start Date</li>
                  <li>• Details on when your 72-hour build will begin</li>
                </ul>
                <p className="text-sm text-foreground mt-4 italic">
                  <strong>Reminder:</strong> Your 72-hour Sprint begins once your intake form and required brand assets are submitted.
                </p>
              </div>

              {/* Contact */}
              <p className="mt-8 text-sm text-muted-foreground">
                Questions? Email us at{" "}
                <a
                  href="mailto:info@phreshphactory.co"
                  className="text-strategic-gold hover:underline font-semibold"
                >
                  info@phreshphactory.co
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
