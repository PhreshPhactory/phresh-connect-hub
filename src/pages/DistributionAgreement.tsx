import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";

const DistributionAgreement = () => {
  const { toast } = useToast();
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    legal_name: "",
    brand_name: "",
    contact_name: "",
    email: "",
    region: "",
    tiktok_shop: "",
    willing_to_start_tiktok_shop: "",
    tiktok_handle: "",
    tiktok_live_handle: "",
    youtube_live_handle: "",
    affiliate_split: "",
    brand_fee: "",
    sponsored_split: "",
    brand_routing: "",
    ownership_acknowledgement: "",
    non_replication: "",
    term_length: "",
    termination_notice: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      toast({ title: "Please confirm you agree to the terms", variant: "destructive" });
      return;
    }

    if (!form.legal_name || !form.contact_name || !form.email || !form.region || !form.tiktok_shop || !form.tiktok_live_handle || !form.youtube_live_handle || !form.brand_routing || !form.ownership_acknowledgement || !form.non_replication) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      // For now, log the submission. A DB table can be added later.
      console.log("Distribution Agreement Submission:", form);
      setSubmitted(true);
      toast({ title: "Agreement submitted successfully!" });
    } catch {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <SEOHead title="Agreement Submitted | Phresh Phactory" description="Your Regional Distribution Partner Agreement has been submitted." />
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <div className="max-w-xl text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Thank You!</h2>
            <p className="text-muted-foreground text-lg">Your Regional Distribution Partner Agreement has been submitted. We'll be in touch soon.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead title="Regional Distribution Partner Agreement | Phresh Phactory" description="Submit your Regional Distribution Partner Agreement for Phresh Phactory TV's Culture and Commerce LIVE." />
      <div className="min-h-screen bg-background py-12 px-4">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Regional Distribution Partner Agreement</h2>
            <p className="text-muted-foreground">This agreement outlines the terms under which you will participate as a Regional Distribution Partner for Phresh Phactory TV's Culture and Commerce LIVE.</p>
          </div>

          <Separator />

          {/* 1. Partner Information */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">1. Partner Information</h3>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Legal Business Name <span className="text-destructive">*</span></label>
              <Input value={form.legal_name} onChange={(e) => updateField("legal_name", e.target.value)} required />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Operating Brand Name (if different)</label>
              <Input value={form.brand_name} onChange={(e) => updateField("brand_name", e.target.value)} />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Primary Contact Name <span className="text-destructive">*</span></label>
              <Input value={form.contact_name} onChange={(e) => updateField("contact_name", e.target.value)} required />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Email Address <span className="text-destructive">*</span></label>
              <Input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} required />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Region of Operation <span className="text-destructive">*</span></label>
              <Select value={form.region} onValueChange={(v) => updateField("region", v)}>
                <SelectTrigger><SelectValue placeholder="Select Region" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="Caribbean">Caribbean</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          <Separator />

          {/* 2. Hosting Structure & Live Platforms */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">2. Hosting Structure & Live Platforms</h3>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Do you currently have a TikTok Shop? <span className="text-destructive">*</span></label>
              <Select value={form.tiktok_shop} onValueChange={(v) => updateField("tiktok_shop", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {form.tiktok_shop === "No" && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Are you willing to start one?</label>
                <Select value={form.willing_to_start_tiktok_shop} onValueChange={(v) => updateField("willing_to_start_tiktok_shop", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">What is your TikTok @ handle?</label>
              <Input value={form.tiktok_handle} onChange={(e) => updateField("tiktok_handle", e.target.value)} placeholder="@yourhandle" />
            </div>

            <Separator className="my-2" />

            <p className="text-sm font-medium text-foreground">Approved GO LIVE Handles</p>
            <p className="text-sm text-muted-foreground">Please provide the TikTok and YouTube handles you are approved to GO LIVE on.</p>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">TikTok GO LIVE Handle <span className="text-destructive">*</span></label>
              <Input value={form.tiktok_live_handle} onChange={(e) => updateField("tiktok_live_handle", e.target.value)} placeholder="@yourlivehandle" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">YouTube GO LIVE Handle <span className="text-destructive">*</span></label>
              <Input value={form.youtube_live_handle} onChange={(e) => updateField("youtube_live_handle", e.target.value)} placeholder="@youryoutubehandle" />
            </div>
          </section>

          <Separator />

          {/* 3. Revenue Structure */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">3. Revenue Structure</h3>
            <p className="text-sm text-muted-foreground">All revenue terms are fixed as follows and must be agreed upon prior to broadcast.</p>

            <div className="space-y-3 rounded-md border border-border bg-muted/50 p-4">
              <div>
                <p className="text-sm font-medium text-foreground">Affiliate Commission Split (Regional Tagged Sales)</p>
                <p className="text-sm text-muted-foreground">70% Regional Partner / 30% Show Owner</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-foreground">Brand Placement Fee</p>
                <p className="text-sm text-muted-foreground">£500 per feature</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-foreground">Revenue Share on Sponsored Broadcasts</p>
                <p className="text-sm text-muted-foreground">50/50 split</p>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Do you agree to the revenue terms outlined above? <span className="text-destructive">*</span></label>
              <Select value={form.affiliate_split} onValueChange={(v) => updateField("affiliate_split", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          <Separator />

          {/* 4. Brand Intake Agreement */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">4. Brand Intake Agreement</h3>
            <p className="text-sm text-muted-foreground">All brands must apply through PhreshPhactory.com/Brands unless otherwise agreed in writing.</p>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Do you agree to route all brand applicants through Phresh Phactory TV? <span className="text-destructive">*</span></label>
              <Select value={form.brand_routing} onValueChange={(v) => updateField("brand_routing", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          <Separator />

          {/* 5. Content Ownership */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">5. Content Ownership</h3>
            <p className="text-sm text-muted-foreground">
              Phresh Phactory TV retains ownership of the show name, format, structure, and master recordings. Regional partners may repost approved content with attribution.
            </p>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Do you acknowledge and agree to these ownership terms? <span className="text-destructive">*</span></label>
              <Select value={form.ownership_acknowledgement} onValueChange={(v) => updateField("ownership_acknowledgement", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          <Separator />

          {/* 6. Non-Replication */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">6. Non-Replication</h3>
            <p className="text-sm text-muted-foreground">
              You may not independently reproduce or rebrand the Culture and Commerce LIVE format without written permission.
            </p>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Do you agree not to replicate the show format independently? <span className="text-destructive">*</span></label>
              <Select value={form.non_replication} onValueChange={(v) => updateField("non_replication", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          <Separator />

          {/* 7. Term */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">7. Term</h3>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Initial Partnership Term</label>
              <Select value={form.term_length} onValueChange={(v) => updateField("term_length", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="3 Months">3 Months</SelectItem>
                  <SelectItem value="6 Months">6 Months</SelectItem>
                  <SelectItem value="12 Months">12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground">Termination Notice Period (Days)</label>
              <Input type="number" value={form.termination_notice} onChange={(e) => updateField("termination_notice", e.target.value)} placeholder="Example: 30" />
            </div>
          </section>

          <Separator />

          {/* Confirmation */}
          <div className="flex items-start space-x-3">
            <Checkbox id="agree" checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} />
            <label htmlFor="agree" className="text-sm text-foreground leading-snug cursor-pointer">
              I confirm that I have reviewed and agree to the terms outlined above.
            </label>
          </div>

          <Button type="submit" disabled={submitting || !agreed} className="w-full">
            {submitting ? "Submitting..." : "Submit Agreement"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default DistributionAgreement;
