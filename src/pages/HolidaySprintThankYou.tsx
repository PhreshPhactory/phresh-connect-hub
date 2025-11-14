import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ExternalLink } from "lucide-react";
import SEOHead from "@/components/SEOHead";

export default function HolidaySprintThankYou() {
  // Replace this with your actual Stripe checkout URL
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
                Application Received for
                <br />
                THE HOLIDAY AFFILIATE SALES SPRINT™
              </h1>

              {/* Subtext */}
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Thank you — your application has been submitted.
                <br />
                To secure your session, complete payment below.
              </p>

              {/* Payment Button */}
              <Button
                asChild
                size="lg"
                className="w-full md:w-auto bg-strategic-gold hover:bg-strategic-gold/90 text-background font-bold text-lg px-12 py-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                <a href={stripeCheckoutUrl} target="_blank" rel="noopener noreferrer">
                  Complete Payment - $497
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>

              {/* Note */}
              <div className="mt-10 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground italic">
                  Your session date will be emailed after payment is confirmed.
                </p>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-6 bg-muted/30 rounded-lg">
                <p className="text-sm text-foreground">
                  <strong className="text-strategic-gold">What's Next?</strong>
                  <br />
                  Once payment is complete, you'll receive a confirmation email with:
                </p>
                <ul className="text-sm text-muted-foreground mt-3 space-y-2 text-left max-w-md mx-auto">
                  <li>• Your scheduled session date and time</li>
                  <li>• Pre-session questionnaire link</li>
                  <li>• Meeting access details</li>
                  <li>• What to prepare before your session</li>
                </ul>
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
