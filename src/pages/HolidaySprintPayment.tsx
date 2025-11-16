import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, CreditCard, Calendar } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function HolidaySprintPayment() {
  const [paymentType, setPaymentType] = useState<"full" | "split">("full");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    if (!customerEmail || !customerName) {
      toast({
        title: "Required Fields",
        description: "Please enter your name and email to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke("create-holiday-sprint-payment", {
        body: {
          paymentType,
          customerEmail,
          customerName,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: "Failed to create payment session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Payment - Holiday Affiliate Sales Sprint™"
        description="Choose your payment option for The Holiday Affiliate Sales Sprint™"
        keywords="payment, holiday sprint, affiliate marketing"
      />

      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/10 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Start Your Holiday Sprint
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose your payment option and complete enrollment
            </p>
          </div>

          <Card className="border-2 shadow-lg">
            <CardHeader className="space-y-4 pb-8">
              <CardTitle className="text-2xl">Select Payment Option</CardTitle>
              <CardDescription className="text-base">
                No additional fees, add-ons, or tiers. This is the complete Holiday Sprint package.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Payment Options */}
              <RadioGroup
                value={paymentType}
                onValueChange={(value) => setPaymentType(value as "full" | "split")}
                className="space-y-4"
              >
                {/* Pay in Full */}
                <Label
                  htmlFor="full"
                  className={`flex items-start p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentType === "full"
                      ? "border-strategic-gold bg-strategic-gold/5"
                      : "border-border hover:border-strategic-gold/50"
                  }`}
                >
                  <RadioGroupItem value="full" id="full" className="mt-1 mr-4" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-strategic-gold" />
                        <span className="font-bold text-lg">Pay in Full</span>
                      </div>
                      <span className="text-2xl font-bold text-foreground">$5,000</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      One-time payment. Complete access immediately.
                    </p>
                  </div>
                </Label>

                {/* Split Pay */}
                <Label
                  htmlFor="split"
                  className={`flex items-start p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentType === "split"
                      ? "border-strategic-gold bg-strategic-gold/5"
                      : "border-border hover:border-strategic-gold/50"
                  }`}
                >
                  <RadioGroupItem value="split" id="split" className="mt-1 mr-4" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-strategic-gold" />
                        <span className="font-bold text-lg">Split Payment</span>
                      </div>
                      <span className="text-2xl font-bold text-foreground">$2,750 × 2</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Two monthly payments of $2,750. Start now, pay over 2 months.
                    </p>
                  </div>
                </Label>
              </RadioGroup>

              {/* Customer Information */}
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-muted/30 p-6 rounded-lg space-y-3">
                <h3 className="font-bold text-lg mb-4">What's Included:</h3>
                <div className="space-y-2">
                  {[
                    "Complete affiliate sales kit built in 72 hours",
                    "Product positioning & messaging framework",
                    "Ready-to-use scripts for all platforms",
                    "Promotional calendar & content schedule",
                    "Email & social templates",
                    "Creator outreach system",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-strategic-gold flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing || !customerEmail || !customerName}
                size="lg"
                className="w-full bg-strategic-gold hover:bg-strategic-gold/90 text-background font-bold text-lg py-6"
              >
                {isProcessing ? "Processing..." : "Continue to Payment"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                After payment, you'll complete your application and we'll start building your system within 24 hours.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
