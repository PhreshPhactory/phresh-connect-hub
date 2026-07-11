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
import { ArrowRight, Loader2, Play, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import kieraHost from "@/assets/kiera-host.jpeg";

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
            className="inline-flex items-center justify-center h-11 px-6 text-sm font-semibold rounded-md bg-navy text-white hover:bg-navy-700 transition"
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
                Millions of dollars of world-changing research are abandoned by institutions every year. If your employer has sidelined your breakthrough, we provide the capital and operations to help you take it back.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("apply")}
                  className="bg-navy text-white hover:bg-navy-700 font-heading font-semibold tracking-wide px-8 h-14"
                >
                  Submit Your IP for Review{" "}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("docuseries")}
                  className="border-navy text-navy hover:bg-navy hover:text-white font-heading font-semibold tracking-wide px-8 h-14"
                >
                  Request the Pitch Deck
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-2xl border border-border">
                <img
                  src={kieraHost}
                  alt="Kiera H., founder of Phresh Phactory, Inc., leading the PhD Keys initiative"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl border border-border max-w-xs hidden lg:block">
                <p className="font-heading text-navy font-bold text-lg mb-1">
                  $100B+
                </p>
                <p className="text-sm text-muted-foreground">
                  in corporate patents abandoned annually, waiting for the right operational partner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE INNOVATION SCOREBOARD */}
      <section id="scoreboard" className="relative py-24 md:py-32 bg-secondary-100">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-xs text-teal font-bold mb-4">
              The Innovation Scoreboard
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy mb-6">
              The Problem
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The most transformative discoveries often fail not because of science, but because of systems.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 md:p-10 rounded-lg border border-border shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center text-navy font-heading font-bold text-xl mb-6">
                01
              </div>
              <h3 className="font-heading text-2xl font-semibold text-navy mb-4">
                The Corporate Machine
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Breakthroughs are sidelined simply because they don't fit a near-term quarterly budget. It’s a flaw in the system, not the science.
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
                We help researchers leverage reversion rights to legally reclaim abandoned patents from their university or corporate employer.
              </p>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-lg border border-border shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-strategic-gold/20 flex items-center justify-center text-strategic-gold font-heading font-bold text-xl mb-6">
                03
              </div>
              <h3 className="font-heading text-2xl font-semibold text-navy mb-4">
                The Validation
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Clayton and Feldman's 2021 data proves that for breakthroughs to survive, business operators and academic researchers must collaborate directly to bypass traditional systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE NEWCO ALLIANCE */}
      <section id="alliance" className="relative py-24 md:py-32 bg-background">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-xs text-teal font-bold mb-4">
              The NewCo Alliance
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy mb-6">
              The Playbook
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A clear path from abandoned patent to market-leading company.
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
                We handle the manufacturing, regulatory compliance, and business development to bring it to market.
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
                We actively work to make you a recognized industry superstar, securing paid board seats, speaking engagements, and consulting roles.
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
                  src={kieraHost}
                  alt="Kiera H., Black Army veteran, multi-patented industrial researcher, and founder of Phresh Phactory, Inc."
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="uppercase tracking-[0.3em] text-xs text-strategic-gold font-bold mb-4">
                About Us
              </p>
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8">
                The Commander & The Global Board
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                Led by Kiera H.—a Black Army veteran, multi-patented industrial researcher, and seasoned business operator. With zero corporate doublespeak and 20 years of experience scaling startups across retail, tech, and creative industries, Phresh Phactory, Inc. brings its execution engine to the scientific community. She is backed by a Global Board of elite technical minds deploying deep operational expertise.
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

      {/* PR ENGINE / DOCUSERIES */}
      <section id="docuseries" className="relative py-24 md:py-32 bg-secondary-100 overflow-hidden">
        <div className="container-custom relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-teal font-bold mb-4">
                The PR Engine
              </p>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy mb-6">
                Bringing Your Story to the World
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We don't just build companies; we build movements. "PhD Keys" is an upcoming premium unscripted docuseries currently in development that pulls back the curtain on the $100B corporate patent graveyard. Partnering with us means your breakthrough gains a global PR engine.
              </p>
              <Button
                size="lg"
                onClick={() => scrollToSection("apply")}
                className="bg-navy text-white hover:bg-navy-700 font-heading font-semibold tracking-wide px-8 h-14"
              >
                Request the Docuseries Pitch Deck{" "}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden border border-border shadow-2xl bg-navy group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-navy/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white flex items-center justify-center group-hover:bg-white group-hover:text-navy transition-colors">
                  <Play className="h-8 w-8 md:h-10 md:w-10 text-white group-hover:text-navy fill-current ml-1" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs uppercase tracking-widest text-strategic-gold font-bold mb-2">
                  In Development
                </p>
                <p className="text-white font-heading text-lg md:text-xl font-semibold">
                  PhD Keys: The Docuseries
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE ALLIANCE APPLICATION */}
      <section id="apply" className="relative py-24 md:py-32 bg-background border-t border-border">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.3em] text-xs text-teal font-bold mb-4">
              The Alliance Application
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-navy mb-4">
              Let's Build Together
            </h2>
            <p className="text-muted-foreground text-lg">
              Ready to reclaim your work or sponsor the future of deep tech?
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
                Why was this science shelved by the institution?
              </Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Describe the technology, the circumstances of its abandonment, and its market potential."
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
