import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Headphones, Youtube, Music2, ArrowRight, Facebook, Instagram, Linkedin, Twitter, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import phdKeysLogo from "@/assets/phdkeys-logo.png";
import kieraHost from "@/assets/kiera-host.jpeg";



const PhDKeys = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("newsletter_subscribers").insert({
        email: email.trim().toLowerCase(),
        name: name.trim() || null,
        source: "phdkeys",
      });
      if (error) throw error;
      toast({
        title: "You're on the list",
        description: "We'll email you the moment new episodes drop.",
      });
      setName("");
      setEmail("");
    } catch (err: any) {
      toast({
        title: "Something went wrong",
        description: err.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>PhD Keys Podcast | Phresh Phactory</title>
        <meta
          name="description"
          content="PhD Keys, the multimedia podcast hosted by Kiera H. that translates expert research into actionable, real-world frameworks."
        />
        <link rel="canonical" href="https://phreshphactory.com/PhDKeys" />
      </Helmet>

      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <nav className="container-custom flex items-center justify-between h-16">
          <Link to="/" className="font-semibold tracking-tight text-lg">
            Phresh Phactory
          </Link>
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            <li><Link to="/" className="text-muted-foreground hover:text-foreground transition">Home</Link></li>
            <li><Link to="/KieraH" className="text-muted-foreground hover:text-foreground transition">About</Link></li>
            <li><Link to="/holiday" className="text-muted-foreground hover:text-foreground transition">Services</Link></li>
            <li><Link to="/PhDKeys" className="text-foreground font-semibold border-b-2 border-primary pb-1">Podcast</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition">Contact</Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #c9a84c 0, transparent 45%), radial-gradient(circle at 80% 60%, #c9a84c 0, transparent 40%)",
        }} />
        <div className="container-custom relative py-20 md:py-28 text-center max-w-5xl mx-auto">
          <img
            src={phdKeysLogo}
            alt="PhD Keys, Unlocking the World's Sharpest Minds. A Phresh Phactory, Inc. Production"
            className="w-full max-w-md md:max-w-lg mx-auto mb-10 rounded-2xl shadow-2xl"
          />
          <h1 className="sr-only">PhD Keys, Unlocking the World's Sharpest Minds</h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-10">
            Everyone doesn't need a doctorate to master life, but we all need the right keys.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-[#c9a84c] text-black hover:bg-[#b8973d]">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Headphones className="mr-2 h-5 w-5" /> Listen on Apple Podcasts
              </a>
            </Button>
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Music2 className="mr-2 h-5 w-5" /> Listen on Spotify
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 text-white bg-transparent hover:bg-white hover:text-black">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Youtube className="mr-2 h-5 w-5" /> Watch on YouTube
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About the Show */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-black">About the Show</h2>
          <div className="space-y-6 text-lg leading-relaxed text-neutral-800">
            <p>
              Welcome to PhD Keys, the multimedia podcast that unlocks the minds of experts and translates their complex
              research into actionable, real-world frameworks for every day.
            </p>
            <p>
              We sit down with PhDs, researchers, and innovators to bridge the gap between the laboratory and the real
              world. Kiera navigates the academic landscape, doing the deep-dive research so we can get straight to the
              practical takeaways. In each episode, she extracts the exact "keys" from decades of study and distills
              them into usable cheat codes for our daily routines.
            </p>
            <p>
              Whether it is utilizing behavioral psychology to negotiate a higher salary, leveraging emerging tech to
              scale a business, applying cognitive science to help a child navigate learning hurdles, or using longevity
              research to maximize our retirement years, PhD Keys hands us the exact strategies we need to thrive. We
              take complex research and turn it into practical tools for our businesses, our careers, our households,
              and our future.
            </p>
            <p className="text-xl font-medium text-black border-l-4 border-[#c9a84c] pl-5">
              Get the ROI of 10,000 hours of research in a single episode.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Host */}
      <section className="bg-neutral-50 py-20 md:py-28">
        <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-200 shadow-xl">
              <img
                src={kieraHost}
                alt="Kiera H., host of PhD Keys podcast"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 hidden md:block w-40 h-40 rounded-2xl border-4 border-[#c9a84c] -z-10" />
          </div>
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-[#c9a84c] font-semibold mb-3">The Host</p>
            <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-black">Meet Kiera H.</h2>
            <p className="text-lg leading-relaxed text-neutral-800">
              Hosted by Kiera H., a multi-patent inventor and executive strategist to Founders, professionals, and
              entrepreneurs, PhD Keys bypasses heavy industry jargon to ask the fundamental questions everyone is
              thinking, but no one else is asking.
            </p>
            <Button asChild variant="outline" className="mt-8 border-black text-black hover:bg-black hover:text-white">
              <Link to="/KieraH">Learn more about Kiera <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Episodes */}
      <section className="py-20 md:py-28">
        <div className="container-custom max-w-2xl text-center">
          <p className="uppercase tracking-[0.25em] text-xs text-primary font-semibold mb-3">Coming Soon</p>
          <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 mb-6">Episodes Drop Soon</h2>
          <p className="text-lg leading-relaxed text-slate-700 mb-8">
            New episodes of PhD Keys are in production. Sign up below to be notified the moment the first episode goes live.
          </p>
          <form
            onSubmit={handleSignup}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto text-left"
          >
            <Input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12"
              maxLength={100}
            />
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
              maxLength={255}
            />
            <Button type="submit" size="lg" disabled={submitting} className="h-12 shrink-0">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Notify Me"}
            </Button>
          </form>
          <p className="text-xs text-slate-500 mt-4">
            We respect your inbox. Unsubscribe anytime.
          </p>
        </div>

      </section>

      {/* Work With Us */}
      <section className="bg-slate-900 text-white py-20 md:py-28">
        <div className="container-custom max-w-4xl">
          <div className="grid md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3">
              <p className="uppercase tracking-[0.25em] text-xs text-primary font-semibold mb-3">Work With Us</p>
              <h2 className="text-3xl md:text-4xl font-semibold mb-5">Are you the expert, not just the audience?</h2>
              <p className="text-lg leading-relaxed text-slate-300 mb-4">
                PhD Keys exists because brilliant research rarely reaches the people it should serve. If you are a PhD,
                researcher, or specialist sitting on work the world needs, Phresh Phactory is the commercialization and
                distribution partner that turns your expertise into products, audience, and revenue.
              </p>
              <p className="text-base leading-relaxed text-slate-400 mb-8">
                Productized offers and pricing. Cross-platform digital infrastructure. Short-form content engines.
                Strategic PR and speaker positioning. Corporate, institutional, and K through 12 partnerships. Fractional
                leadership for the build.
              </p>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/drgreen">See How We Work Together <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="md:col-span-2">
              <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6 space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Built For</p>
                <ul className="space-y-3 text-sm text-slate-200">
                  <li className="flex gap-3"><span className="text-primary">+</span> Academics ready to monetize beyond the institution</li>
                  <li className="flex gap-3"><span className="text-primary">+</span> Researcher-founders scaling a category of one</li>
                  <li className="flex gap-3"><span className="text-primary">+</span> Specialists pursuing speaking, media, and corporate revenue</li>
                  <li className="flex gap-3"><span className="text-primary">+</span> Experts placing curriculum into schools and enterprises</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container-custom text-center">
          <div className="flex justify-center gap-5 mb-6">
            <a href="#" aria-label="Instagram" className="hover:text-white transition"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-white transition"><Twitter className="h-5 w-5" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white transition"><Linkedin className="h-5 w-5" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-white transition"><Facebook className="h-5 w-5" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-white transition"><Youtube className="h-5 w-5" /></a>
          </div>
          <p className="text-sm mb-4">A Phresh Phactory, Inc. Production.</p>
          <div className="flex justify-center gap-6 text-xs">
            <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/privacy" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PhDKeys;
