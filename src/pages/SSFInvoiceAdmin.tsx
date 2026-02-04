import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, Send, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const SSFInvoiceAdmin = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generatePaymentLink = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    setIsLoading(true);
    setCheckoutUrl(null);

    try {
      const { data, error } = await supabase.functions.invoke("create-ssf-payment", {
        body: {
          priceIds: ["price_1Sx854QP580MvrLEZAxk6BOn"],
          customerEmail: email,
          customerName: name || undefined,
        },
      });

      if (error) throw error;

      if (data?.url) {
        setCheckoutUrl(data.url);
        toast.success("Payment link generated!");
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Error generating payment link:", error);
      toast.error("Failed to generate payment link");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (checkoutUrl) {
      await navigator.clipboard.writeText(checkoutUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetForm = () => {
    setEmail("");
    setName("");
    setCheckoutUrl(null);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-xl mx-auto">
        <Link to="/admin" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Admin
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Send SSF Payment Link
            </CardTitle>
            <CardDescription>
              Generate a $299 payment link for the 4-session Socially Selling Food bundle
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!checkoutUrl ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="customer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Name (optional)</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Customer Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <Button
                  onClick={generatePaymentLink}
                  disabled={isLoading || !email}
                  className="w-full"
                >
                  {isLoading ? "Generating..." : "Generate Payment Link"}
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Payment link for {email}:</p>
                  <p className="text-xs break-all font-mono bg-background p-2 rounded border">
                    {checkoutUrl}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button onClick={copyToClipboard} className="flex-1">
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    Send Another
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  Send this link to the customer. They'll complete payment on Stripe's secure checkout page.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick list of existing signups */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Recent Signups</CardTitle>
            <CardDescription>People who registered for SSF</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>Dawn Lewis (D's Roti & Trini Cuisine)</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEmail("dawnlwis1961@gmail.com");
                    setName("Dawn Lewis");
                    setCheckoutUrl(null);
                  }}
                >
                  Select
                </Button>
              </div>
              <div className="flex justify-between p-2 bg-muted rounded">
                <span>Metro Smalls (Low Country Kid BBQ)</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEmail("lcbbqgrill4u@gmail.com");
                    setName("Metro Smalls");
                    setCheckoutUrl(null);
                  }}
                >
                  Select
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SSFInvoiceAdmin;
