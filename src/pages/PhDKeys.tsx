import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Headphones, Youtube, Music2, ArrowRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import phdKeysLogo from "@/assets/phdkeys-logo.png";
import kieraHost from "@/assets/kiera-host.jpeg";

const episodes = [
  {
    title: "Episode 1: The Behavioral Economics of Negotiation",
    description:
      "We decode the psychology behind high-stakes salary conversations. Learn the exact cognitive levers that move outcomes in your favor.",
    image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Episode 2: Longevity Science for Everyday Founders",
    description:
      "A leading researcher breaks down the protocols that compound across decades. Practical routines you can install this week.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Episode 3: Cognitive Science for Raising Resilient Kids",
    description:
      "How learning hurdles actually form, and the parent-led interventions backed by peer-reviewed studies. No fluff, just frameworks.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
  },
];

const PhDKeys = () => {
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
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, hsl(var(--primary)) 0, transparent 40%), radial-gradient(circle at 80% 60%, #c9a84c 0, transparent 40%)",
        }} />
        <div className="container-custom relative py-20 md:py-28 text-center max-w-5xl mx-auto">
          <img
            src={phdKeysLogo}
            alt="PhD Keys — Unlocking the World's Sharpest Minds. A Phresh Phactory, Inc. Production"
            className="w-full max-w-md md:max-w-lg mx-auto mb-10 rounded-2xl shadow-2xl"
          />
          <h1 className="sr-only">PhD Keys — Unlocking the World's Sharpest Minds</h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-10">
            Everyone doesn't need a doctorate to master life, but we all need the right keys.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Headphones className="mr-2 h-5 w-5" /> Listen on Apple Podcasts
              </a>
            </Button>
            <Button asChild size="lg" className="bg-[#1DB954] text-white hover:bg-[#1aa84a]">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Music2 className="mr-2 h-5 w-5" /> Listen on Spotify
              </a>
            </Button>
            <Button asChild size="lg" className="bg-[#FF0000] text-white hover:bg-[#e60000]">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Youtube className="mr-2 h-5 w-5" /> Watch on YouTube
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About the Show */}
      <section className="py-20 md:py-28">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-slate-900">About the Show</h2>
          <div className="space-y-6 text-lg leading-relaxed text-slate-700">
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
            <p className="text-xl font-medium text-slate-900 border-l-4 border-primary pl-5">
              Get the ROI of 10,000 hours of research in a single episode.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Host */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-200 shadow-xl">
              <img
                src={kieraHost}
                alt="Kiera H., host of PhD Keys podcast"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 hidden md:block w-40 h-40 rounded-2xl border-4 border-primary -z-10" />
          </div>
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-primary font-semibold mb-3">The Host</p>
            <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-slate-900">Meet Kiera H.</h2>
            <p className="text-lg leading-relaxed text-slate-700">
              Hosted by Kiera H., a multi-patent inventor and executive strategist to Founders, professionals, and
              entrepreneurs, PhD Keys bypasses heavy industry jargon to ask the fundamental questions everyone is
              thinking, but no one else is asking.
            </p>
            <Button asChild variant="outline" className="mt-8">
              <Link to="/KieraH">Learn more about Kiera <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Episodes */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-semibold text-slate-900">Unlock the Latest Episodes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {episodes.map((ep) => (
              <Card key={ep.title} className="overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow">
                <div className="aspect-video overflow-hidden bg-slate-100">
                  <img src={ep.image} alt={ep.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-slate-900 mb-3 leading-snug">{ep.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5">{ep.description}</p>
                  <a href="#" className="inline-flex items-center text-primary font-semibold text-sm hover:underline">
                    Listen Now <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">View All Episodes</Button>
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
