import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Loader2, FileText, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import kieraHost from "@/assets/kiera-h-phd-keys-2026.png.asset.json";
import phdKeysLogo from "@/assets/phd-keys-logo-2026.png.asset.json";

const inquiryOptions = [
  { value: "researcher", label: "Researcher / Inventor" },
  { value: "sponsor", label: "Potential Sponsor / Partner" },
  { value: "media", label: "Media Inquiry" },
];

const PhDKeysLanding = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    inquiryType: "",
    patentNumber: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setForm((prev) => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.inquiryType.trim() ||
      !form.description.trim()
    ) {
      toast({
        title: "Missing fields",
        description: "Please complete all required fields.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await (supabase as any).from("phd_keys_applications").insert({
        full_name: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        inquiry_type: form.inquiryType,
        patent_number: form.patentNumber.trim() || null,
        description: form.description.trim(),
        source: "phdkeys_landing",
      });
      if (error) throw error;
      toast({
        title: "Application received",
        description: "Our team will review your submission and reach out soon.",
      });
      setForm({
        fullName: "",
        email: "",
        inquiryType: "",
        patentNumber: "",
        description: "",
      });
    } catch (err: any) {
      toast({
        title: "Submission failed",
        description: err.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Helmet>
        <title>PhD Keys by Phresh Phactory, Inc. | Unlock Your Shelved Science</title>
        <meta
          name="description"
          content="PhD Keys by Phresh Phactory, Inc. helps elite researchers reclaim abandoned corporate patents and commercialize shelved science with capital, operations, and a global PR engine."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://phreshphactory.com/phdkeys" />
      </Helmet>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container-custom flex items-center justify-between h-20">
          <a
            href="/phdkeys"
            className="font-heading text-xl md:text-2xl font-bold text-navy tracking-tight"
          >
            PhD Keys
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a
              href="#scoreboard"
              className="text-muted-foreground hover:text-navy transition"
            >
              The Problem
            </a>
            <a
              href="#alliance"
              className="text-muted-foreground hover:text-navy transition"
            >
              The Playbook
            </a>
            <a
              href="#leadership"
              className="text-muted-foreground hover:text-navy transition"
            >
              About
            </a>
            <a
              href="#apply"
              className="text-muted-foreground hover:text-navy transition"
            >
              Apply
            </a>
          </nav>
          <a
            href="#apply"
            className="hidden sm:inline-flex items-center justify-center h-10 px-4 text-xs md:text-sm font-semibold rounded-md bg-navy text-white hover:bg-navy-700 transition"
          >
            Start the Conversation
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 20%, hsl(var(--teal) / 0.15) 0, transparent 45%), radial-gradient(circle at 15% 80%, hsl(var(--tertiary) / 0.12) 0, transparent 40%)",
          }}
        />
        <div className="container-custom relative z-10 py-24 md:py-32 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-teal font-bold mb-6">
                PhD Keys by Phresh Phactory, Inc.
              </p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-8">
                Unlock Your Shelved Science.{" "}
                <span className="text-strategic-gold">Build Your Empire.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                Millions of dollars of world-changing research are abandoned by institutions every year. Phresh Phactory, Inc. partners with brilliant minds to rescue their patents, fund their commercialization, and build the business operations to bring their life's work to the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("apply")}
                  className="bg-teal text-white hover:bg-teal/90 font-heading font-semibold tracking-wide px-6 h-12 text-sm md:text-base"
                >
                  Submit Your IP{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("apply")}
                  className="border-navy text-navy hover:bg-navy hover:text-white font-heading font-semibold tracking-wide px-6 h-12 text-sm md:text-base"
                >
                  Become a Sponsor
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden shadow-2xl border border-border bg-white flex items-center justify-center p-8">
                <img
                  src={phdKeysLogo.url}
                  alt="PhD Keys by Phresh Phactory, Inc. logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE OPPORTUNITY */}
      <section id="scoreboard" className="relative py-24 md:py-32 bg-secondary-100">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-xs text-teal font-bold mb-4">
              The Opportunity
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy mb-6">
              The Billion-Dollar Graveyard
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The most transformative discoveries often fail not because of the science, but because of the system around it.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 md:p-10 rounded-lg border border-border shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center text-navy font-heading font-bold text-xl mb-6">
                01
              </div>
              <h3 className="font-heading text-2xl font-semibold text-navy mb-4">
                The Bottleneck
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Incredible innovations are often sidelined by universities and corporations simply because they don't fit a near-term budget. It's not a flaw in the science; it's a flaw in the system.
              </p>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-lg border border-border shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center text-teal font-heading font-bold text-xl mb-6">
                02
              </div>
              <h3 className="font-heading text-2xl font-semibold text-navy mb-4">
                The Reversion
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We help researchers leverage reversion rights to legally reclaim their abandoned patents, rescuing their life's work from the archives.
              </p>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-lg border border-border shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-strategic-gold/20 flex items-center justify-center text-strategic-gold font-heading font-bold text-xl mb-6">
                03
              </div>
              <h3 className="font-heading text-2xl font-semibold text-navy mb-4">
                The Alliance
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We provide the capital, business operations, and go-to-market strategy. You provide the genius. Together, we form a NewCo where you share in the true upside of your invention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE VALIDATION */}
      <section className="relative py-24 md:py-32 bg-background">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-xs text-teal font-bold mb-4">
            The Validation
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy mb-10">
            The Science of Success
          </h2>
          <blockquote className="relative bg-white border-l-4 border-strategic-gold p-8 md:p-12 rounded-lg shadow-sm text-left">
            <p className="text-lg md:text-xl text-navy/90 leading-relaxed font-medium italic">
              "The blueprint for success is proven. In their 2021 landmark paper, <span className="not-italic font-semibold">Academic Teams and Commercialization in the Life Sciences</span>, researchers Clayton and Feldman demonstrated that for scientific breakthroughs to survive, business operators and academic researchers must collaborate to bypass traditional systems."
            </p>
          </blockquote>
        </div>
      </section>


      {/* THE NEWCO ALLIANCE */}
      <section id="alliance" className="relative py-24 md:py-32 bg-background">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-xs text-teal font-bold mb-4">
              The Playbook
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy mb-6">
              How We Champion You
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A clear, collaborative path from abandoned patent to market-leading company.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-border" />
            <div className="relative bg-white p-8 md:p-10 rounded-lg border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-navy text-white flex items-center justify-center font-heading font-bold text-2xl mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="font-heading text-2xl font-semibold text-navy mb-4">
                Secure the Rights
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We fund the USPTO fees and handle the legal paperwork to put the IP back in your hands.
              </p>
            </div>
            <div className="relative bg-white p-8 md:p-10 rounded-lg border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-teal text-white flex items-center justify-center font-heading font-bold text-2xl mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="font-heading text-2xl font-semibold text-navy mb-4">
                Scale the Operations
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                With 20 years of experience, our team handles the manufacturing, regulatory compliance, and business development.
              </p>
            </div>
            <div className="relative bg-white p-8 md:p-10 rounded-lg border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-strategic-gold text-navy flex items-center justify-center font-heading font-bold text-2xl mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="font-heading text-2xl font-semibold text-navy mb-4">
                Build the Brand
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                While the technology develops, we actively work to make you a recognized industry superstar, securing paid board seats, speaking engagements, and consulting roles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE COMMANDER & THE GLOBAL BOARD */}
      <section id="leadership" className="relative py-24 md:py-32 bg-navy text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, hsl(var(--teal)) 0, transparent 50%)",
          }}
        />
        <div className="container-custom relative z-10 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 md:order-1">
              <div className="aspect-[4/5] rounded-lg overflow-hidden border border-white/20 shadow-2xl">
                <img
                  src={kieraHost.url}
                  alt="Kiera H., Black Army veteran, multi-patented industrial researcher, and founder of Phresh Phactory, Inc."
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="uppercase tracking-[0.3em] text-xs text-strategic-gold font-bold mb-4">
                The Leadership
              </p>
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8">
                About Us
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                Led by Kiera H.—a Black Army veteran, multi-patented industrial researcher, and seasoned business operator. After spending 20 years building the operational backbone for startups across retail, tech, and creative industries, Phresh Phactory, Inc. is bringing its execution engine to the scientific community. We know the reality of the lab, and we know exactly how to scale a business.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-strategic-gold flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">
                    Veteran-led operational discipline
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-strategic-gold flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">
                    Deep respect for the scientific method
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-strategic-gold flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">
                    Proven track record scaling ventures from zero to revenue
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE PODCAST */}
      <section id="podcast" className="relative py-24 md:py-32 bg-secondary-100 overflow-hidden">
        <div className="container-custom relative z-10 max-w-4xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-xs text-teal font-bold mb-4">
            The Podcast
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy mb-6">
            PhD Keys: Unlocking the World's Sharpest Minds
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            Our companion podcast sits down with researchers, inventors, and specialists to translate their expertise into practical frameworks the world can use. Hosted by Kiera H.
          </p>
          <a
            href="/phdkeyspodcast"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-navy text-white hover:bg-navy-700 font-heading font-semibold tracking-wide transition"
          >
            Explore the Podcast <ArrowRight className="h-4 w-4" />
          </a>
          <p className="text-sm text-muted-foreground mt-6">
            Details at{" "}
            <a href="/phdkeyspodcast" className="text-teal font-semibold underline underline-offset-4 hover:text-navy transition">
              /phdkeyspodcast
            </a>
          </p>
        </div>
      </section>

      {/* THE ALLIANCE APPLICATION */}
      <section id="apply" className="relative py-24 md:py-32 bg-background border-t border-border">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.3em] text-xs text-teal font-bold mb-4">
              The Invitation
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy mb-4">
              Let's Build Together
            </h2>
            <p className="text-muted-foreground text-lg">
              Whether you are a researcher ready to reclaim your work, or a sponsor looking to fund the future of deep tech, we want to hear from you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-10 rounded-lg border border-border shadow-sm">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Dr. Jane Doe"
                  className="h-12 bg-background border-border focus:border-navy focus:ring-navy"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@institution.edu"
                  className="h-12 bg-background border-border focus:border-navy focus:ring-navy"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="inquiryType" className="text-foreground font-medium">
                  I am a:
                </Label>
                <Select
                  value={form.inquiryType}
                  onValueChange={handleSelectChange}
                  required
                >
                  <SelectTrigger
                    id="inquiryType"
                    className="h-12 bg-background border-border focus:border-navy focus:ring-navy"
                  >
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent>
                    {inquiryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="patentNumber" className="text-foreground font-medium">
                  USPTO Patent / Application Number{" "}
                  <span className="text-muted-foreground font-normal">(Optional)</span>
                </Label>
                <Input
                  id="patentNumber"
                  name="patentNumber"
                  value={form.patentNumber}
                  onChange={handleChange}
                  placeholder="e.g. US10,123,456 B2"
                  className="h-12 bg-background border-border focus:border-navy focus:ring-navy"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground font-medium">
                Tell us about the science or your partnership interest:
              </Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Share the technology, the story of how it was shelved, or the kind of partnership you're exploring."
                className="bg-background border-border focus:border-navy focus:ring-navy resize-none"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full h-14 bg-navy text-white hover:bg-navy-700 font-heading font-semibold tracking-wide text-lg"
            >
              {submitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Start the Conversation{" "}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy text-white border-t border-white/10 py-16">
        <div className="container-custom text-center">
          <p className="font-heading text-2xl md:text-3xl font-bold text-strategic-gold mb-2">
            PhD Keys
          </p>
          <p className="text-sm text-white/60 mb-6">
            A Phresh Phactory, Inc. Initiative
          </p>
          <p className="font-heading text-xl md:text-2xl font-bold text-white/90 mb-6">
            Let the smartest people win.
          </p>
          <p className="text-sm text-white/60 mb-6">
            &copy; {new Date().getFullYear()} PhD Keys by Phresh Phactory, Inc.
          </p>
          <div className="flex justify-center gap-6 text-xs text-white/60">
            <a href="/privacy" className="hover:text-strategic-gold transition">
              Privacy Policy
            </a>
            <a href="/privacy" className="hover:text-strategic-gold transition">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PhDKeysLanding;
