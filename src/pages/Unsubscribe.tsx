import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";

const Unsubscribe = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      // Store unsubscribe request for manual processing
      const { error } = await supabase
        .from("newsletter_subscribers")
        .update({ source: "unsubscribe_requested" })
        .eq("email", email.toLowerCase().trim());

      // Always show success to avoid revealing if email exists
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Unsubscribe | Phresh Phactory"
        description="Unsubscribe from the Phresh Phactory mailing list."
      />
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Unsubscribe</h1>

          {!submitted ? (
            <>
              <p className="text-muted-foreground">
                Enter your email address below and we'll remove you from our mailing list.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-center"
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Unsubscribe"}
                </Button>
              </form>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Your request has been received. You will be removed from our mailing list shortly.
              </p>
              <p className="text-sm text-muted-foreground">
                If you continue to receive emails, please contact us at{" "}
                <a href="mailto:hello@phreshphactory.com" className="text-primary underline">
                  hello@phreshphactory.com
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Unsubscribe;
