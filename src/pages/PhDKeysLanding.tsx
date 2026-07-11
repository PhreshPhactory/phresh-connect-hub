import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Play, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import kieraHost from "@/assets/kiera-host.jpeg";

const PhDKeysLanding = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    originalAssignee: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.originalAssignee.trim() || !form.description.trim()) {
      toast({
        title: "Missing fields",
        description: "Please complete all required fields.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("phd_keys_applications").insert({
        full_name: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        original_assignee: form.originalAssignee.trim(),
        patent_number: form.patentNumber.trim() || null,
        description: form.description.trim(),
        source: "phdkeys_landing",
      });
      if (error) throw error;
      toast({
        title: "Application received",
        description: "Our AI audit team will review your submission.",
      });
      setForm({
        fullName: "",
        email: "",
        originalAssignee: "",
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
    <div className="dark min-h-screen bg-background text-foreground overflow-x-hidden">
      <Helmet>
        <title>PhD Keys | Reclaiming the $100B Corporate Patent Graveyard</title>
        <meta
          name="description"
          content="PhD Keys by Phresh Phactory, Inc. locates abandoned corporate patents, secures the rights, and partners with elite inventors to bring shelved IP to market."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://phreshphactory.com/phdkeys" />
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, hsl(var(--tertiary)) 0, transparent 45%), radial-gradient(circle at 80% 70%, hsl(var(--tertiary)) 0, transparent 40%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="container-custom relative z-10 py-24 md:py-32 text-center max-w-5xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-xs md:text-sm text-strategic-gold font-semibold mb-6">
            Phresh Phactory, Inc. Presents
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-8">
            Reclaiming the{" "}
            <span className="text-strategic-gold">$100B Corporate Patent Graveyard</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            We use AI to locate valuable abandoned patents, inject capital to secure the rights, and confront elite inventors with a brutal choice: join our minority-led alliance to launch your life's work, or watch us bring it to market alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("initiation")}
              className="bg-strategic-gold text-foreground hover:bg-tertiary-600 font-heading font-semibold tracking-wide px-8"
            >
              Submit Your Shelved IP <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("docuseries")}
              className="border-strategic-gold text-strategic-gold bg-transparent hover:bg-strategic-gold hover:text-foreground font-heading font-semibold tracking-wide px-8"
            >
              Watch the Docuseries Teaser
            </Button>
          </div>
        </div>
      </section>

      {/* THE BLINDSPOT */}
      <section className="relative py-24 md:py-32 bg-background border-t border-border">
        <div className="container-custom max-w-6xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-xs text-strategic-gold font-semibold mb-4 text-center">
            The Blindspot
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-center mb-16">
            Why Brilliant IP Dies Inside Corporations
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 border border-border bg-card/50 hover:border-strategic-gold/60 transition-colors">
              <div className="w-12 h-12 rounded-full border border-strategic-gold flex items-center justify-center text-strategic-gold font-heading font-bold text-xl mb-6">
                01
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-4">The Corporate Machine</h3>
              <p className="text-muted-foreground leading-relaxed">
                Researchers are bound to assign patents to employers. But corporations are blind to discoveries outside their quarterly mandates.
              </p>
            </div>
            <div className="group p-8 border border-border bg-card/50 hover:border-strategic-gold/60 transition-colors">
              <div className="w-12 h-12 rounded-full border border-strategic-gold flex items-center justify-center text-strategic-gold font-heading font-bold text-xl mb-6">
                02
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-4">The Abandonment</h3>
              <p className="text-muted-foreground leading-relaxed">
                When budgets trim, multi-million dollar medical tech and heavy machinery patents are allowed to die in public registries—without the inventor even knowing.
              </p>
            </div>
            <div className="group p-8 border border-border bg-card/50 hover:border-strategic-gold/60 transition-colors">
              <div className="w-12 h-12 rounded-full border border-strategic-gold flex items-center justify-center text-strategic-gold font-heading font-bold text-xl mb-6">
                03
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-4">The Rescue</h3>
              <p className="text-muted-foreground leading-relaxed">
                We crawl international databases to isolate these lapsed assets, clear the USPTO bottlenecks, and lock down clean, unencumbered ownership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE ULTIMATUM */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, hsl(var(--tertiary)) 0, transparent 60%)",
          }}
        />
        <div className="container-custom relative z-10 max-w-4xl mx-auto text-center">
          <blockquote className="font-serif italic text-3xl md:text-5xl lg:text-6xl text-strategic-gold leading-tight mb-10">
            "We own your invention. Now, let's build an empire."
          </blockquote>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            If the scientist lets implicit bias or intellectual ego stop them from partnering, we walk away and manufacture it ourselves. But for the minds who see the vision, our S-Corporation alliance shields their brilliance and conquers the market together.
          </p>
        </div>
      </section>

      {/* THE COMMANDER & THE GLOBAL BOARD */}
      <section className="relative py-24 md:py-32 bg-background border-t border-border">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-2 md:order-1">
              <div className="aspect-[4/5] rounded-sm overflow-hidden border border-strategic-gold/30">
                <img
                  src={kieraHost}
                  alt="Kiera H., Army veteran, multi-patented applied-science inventor, and founder of Phresh Phactory, Inc."
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-strategic-gold/20 -z-10 hidden md:block" />
            </div>
            <div className="order-1 md:order-2">
              <p className="uppercase tracking-[0.3em] text-xs text-strategic-gold font-semibold mb-4">
                The Commander &amp; The Global Board
              </p>
              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8">
                Led by Kiera H.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                An unpolished, no-nonsense Black woman, Army veteran, and multi-patented applied-science inventor. She brings 20 years of raw operational execution and workforce logistics straight into elite scientific circles, backed by a Global Board of the world's finest technical minds from India, China, Africa, Europe, and the US.
              </p>
              <p className="text-base text-muted-foreground/80 leading-relaxed">
                We don't do corporate doublespeak. We overhaul engineering, pass regulatory testing, and out-maneuver traditional monopolies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUSERIES */}
      <section id="docuseries" className="relative py-24 md:py-32 bg-black overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, hsl(var(--tertiary)) 0, transparent 50%)",
          }}
        />
        <div className="container-custom relative z-10 max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-xs text-strategic-gold font-semibold mb-4">
            PhD Keys: The Docuseries
          </p>
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Watch The Collision
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
            The cameras capture the raw human tension, the data hunt, and the real-world manufacturing grind required to drop physical assets onto the commercial market.
          </p>

          <div className="relative aspect-video max-w-4xl mx-auto rounded-sm overflow-hidden border border-strategic-gold/30 bg-neutral-950 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-strategic-gold bg-black/60 flex items-center justify-center group-hover:bg-strategic-gold group-hover:text-black transition-colors">
                <Play className="h-8 w-8 md:h-10 md:w-10 text-strategic-gold group-hover:text-black fill-current ml-1" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-left">
              <p className="text-xs uppercase tracking-widest text-strategic-gold font-semibold mb-2">Coming Soon</p>
              <p className="text-white/90 font-heading text-lg md:text-xl font-semibold">Episode 1: The Graveyard Opens</p>
            </div>
          </div>

          <div className="mt-12">
            <Button
              size="lg"
              onClick={() => scrollToSection("initiation")}
              className="bg-strategic-gold text-black hover:bg-tertiary-600 font-heading font-semibold tracking-wide px-8"
            >
              Request the Pitch Deck <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* THE INITIATION */}
      <section id="initiation" className="relative py-24 md:py-32 bg-background border-t border-border">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.3em] text-xs text-strategic-gold font-semibold mb-4">
              The Initiation
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              The Alliance Application
            </h2>
            <p className="text-muted-foreground">
              Submit your shelved IP for AI-powered viability analysis.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="h-12 bg-card border-border focus:border-strategic-gold focus:ring-strategic-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@institution.edu"
                  className="h-12 bg-card border-border focus:border-strategic-gold focus:ring-strategic-gold"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="originalAssignee" className="text-foreground font-medium">
                  Original Assignee
                </Label>
                <Input
                  id="originalAssignee"
                  name="originalAssignee"
                  value={form.originalAssignee}
                  onChange={handleChange}
                  required
                  placeholder="Institution / Corporation"
                  className="h-12 bg-card border-border focus:border-strategic-gold focus:ring-strategic-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patentNumber" className="text-foreground font-medium">
                  USPTO Patent / Application Number
                </Label>
                <Input
                  id="patentNumber"
                  name="patentNumber"
                  value={form.patentNumber}
                  onChange={handleChange}
                  placeholder="e.g. US10,123,456 B2"
                  className="h-12 bg-card border-border focus:border-strategic-gold focus:ring-strategic-gold"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground font-medium">
                Brief Description of the Science
              </Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Describe the technology, its market potential, and why it was shelved."
                className="bg-card border-border focus:border-strategic-gold focus:ring-strategic-gold resize-none"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full h-14 bg-strategic-gold text-black hover:bg-tertiary-600 font-heading font-semibold tracking-wide text-lg"
            >
              {submitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>Initiate AI Audit <ArrowRight className="ml-2 h-5 w-5" /></>
              )}
            </Button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-border py-16">
        <div className="container-custom text-center">
          <p className="font-heading text-2xl md:text-3xl font-bold text-strategic-gold mb-6">
            Let the smartest people win.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            &copy; {new Date().getFullYear()} Phresh Phactory, Inc.
          </p>
          <div className="flex justify-center gap-6 text-xs text-muted-foreground">
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
