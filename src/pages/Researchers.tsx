import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Beaker,
  Layers,
  Video,
  Megaphone,
  Building2,
  Users,
  GraduationCap,
  ShoppingBag,
} from "lucide-react";

const GOLD = "#c9a84c";

const needs = [
  {
    icon: Beaker,
    title: "Translate expertise into revenue",
    body: "Productize your knowledge into offers, pricing, and monetization architecture that compounds.",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce and product sales",
    body: "Direct-to-consumer storefronts, digital product delivery, checkout, fulfillment, and subscription billing built for scale.",
  },
  {
    icon: Layers,
    title: "Digital infrastructure",
    body: "Cross-platform setup, product tagging, content calendars, subscription and membership systems.",
  },
  {
    icon: Video,
    title: "Content production and distribution",
    body: "Syndicated short-form, AI-assisted editing, live streaming operations, and repeatable publishing engines.",
  },
  {
    icon: Megaphone,
    title: "Authority and PR",
    body: "Strategic press, journalist outreach, speaker positioning, and thought-leadership ghostwriting.",
  },
  {
    icon: Building2,
    title: "Institutional and corporate partnerships",
    body: "Sponsorship decks, grant-adjacent funding, and high-ticket consulting introductions.",
  },
  {
    icon: Users,
    title: "Team, volunteers, and operations",
    body: "Volunteer coordination, fractional leadership, and the SOPs that make growth survivable.",
  },
  {
    icon: GraduationCap,
    title: "Education and youth distribution",
    body: "Pathways to place curriculum into K through 12 districts and higher-education pipelines.",
  },
];

const Researchers = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Helmet>
        <title>For PhDs and Researchers | Phresh Phactory</title>
        <meta
          name="description"
          content="Commercialization and distribution partnership for PhDs working as professionals, executives, and founders ready to turn expertise into products, audience, and revenue."
        />
        <link rel="canonical" href="https://phreshphactory.com/researchers" />
      </Helmet>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <nav className="container-custom flex items-center justify-between h-16">
          <Link to="/" className="font-semibold tracking-tight text-lg">
            Phresh Phactory
          </Link>
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            <li><Link to="/" className="text-neutral-600 hover:text-black transition">Home</Link></li>
            <li><Link to="/phdkeys" className="text-neutral-600 hover:text-black transition">Podcast</Link></li>
            <li><Link to="/KieraH" className="text-neutral-600 hover:text-black transition">About</Link></li>
            <li><Link to="/contact" className="text-neutral-600 hover:text-black transition">Contact</Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-black text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, ${GOLD} 0, transparent 45%), radial-gradient(circle at 80% 60%, ${GOLD} 0, transparent 40%)`,
          }}
        />
        <div className="container-custom relative py-20 md:py-28 max-w-4xl">
          <p className="uppercase tracking-[0.25em] text-xs font-semibold mb-4" style={{ color: GOLD }}>
            For PhDs and Researchers
          </p>
          <h1
            className="text-4xl md:text-6xl font-semibold leading-tight mb-6"
            style={{ textShadow: "0 0 40px rgba(255,255,255,0.9), 0 0 18px rgba(255,255,255,0.7), 0 2px 14px rgba(0,0,0,0.85)" }}
          >
            Your expertise deserves more than a citation.
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-10">
            Most PhDs do not stay in the lab. They lead companies, advise boards, build practices, and run organizations.
            Phresh Phactory is the commercialization and distribution partner that turns that real-world expertise into
            products, audience, and revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="text-black hover:opacity-90" style={{ backgroundColor: GOLD }}>
              <Link to="/contact">Book an Intro Call <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white hover:text-black">
              <Link to="/phdkeys">Listen to PhD Keys</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* The Gap */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-black">
            The gap between deep expertise and a thriving business.
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-neutral-800">
            <p>
              The credentials and the knowledge are already there. What is missing is the operating system around it:
              the offer architecture, the e-commerce engine, the distribution channels, the audience pipeline, and the
              team to execute against all of it.
            </p>
            <p>
              We work with PhDs operating as professionals, executives, founders, and practice owners who are tired of
              advice and ready for a partner that builds, ships, and sells alongside them.
            </p>
            <p className="text-xl font-medium text-black border-l-4 pl-5" style={{ borderColor: GOLD }}>
              We do not coach you into action. We build with you, in your name.
            </p>
          </div>
        </div>
      </section>

      {/* What we help with */}
      <section className="bg-neutral-50 py-20 md:py-28">
        <div className="container-custom max-w-6xl">
          <div className="max-w-2xl mb-12">
            <p className="uppercase tracking-[0.25em] text-xs font-semibold mb-3" style={{ color: GOLD }}>
              What We Build Together
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-black">
              The seven things every researcher-founder eventually needs.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {needs.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="bg-white border border-neutral-200 rounded-2xl p-7 hover:border-black/40 transition"
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${GOLD}1A`, color: GOLD }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>
                <p className="text-sm leading-relaxed text-neutral-700">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-custom max-w-5xl grid md:grid-cols-2 gap-12">
          <div>
            <p className="uppercase tracking-[0.25em] text-xs font-semibold mb-3" style={{ color: GOLD }}>
              Built For
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">Is this the right fit?</h2>
            <p className="text-lg leading-relaxed text-neutral-800">
              Our partnership model is reserved for experts whose work is ready to leave the institution and meet the
              market. We are selective by design so that every engagement gets the strategic attention it deserves.
            </p>
          </div>
          <ul className="space-y-4 text-base text-neutral-800">
            <li className="flex gap-3"><span style={{ color: GOLD }} className="font-bold">+</span> Academics ready to monetize beyond the institution</li>
            <li className="flex gap-3"><span style={{ color: GOLD }} className="font-bold">+</span> Researcher-founders scaling a category of one</li>
            <li className="flex gap-3"><span style={{ color: GOLD }} className="font-bold">+</span> Specialists pursuing speaking, media, and corporate revenue</li>
            <li className="flex gap-3"><span style={{ color: GOLD }} className="font-bold">+</span> Experts placing curriculum into schools and enterprises</li>
            <li className="flex gap-3"><span style={{ color: GOLD }} className="font-bold">+</span> Founders who would rather build than be coached</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-20 md:py-24">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-semibold mb-5">
            Let's see what your research can become.
          </h2>
          <p className="text-lg text-white/80 mb-10">
            Tell us about your work. If there is a fit, we will schedule a private strategy session to map the path
            from expertise to enterprise.
          </p>
          <Button asChild size="lg" className="text-black hover:opacity-90" style={{ backgroundColor: GOLD }}>
            <Link to="/contact">Request an Intro Call <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      <footer className="bg-black text-neutral-400 py-10 border-t border-white/10">
        <div className="container-custom text-center text-sm">
          A Phresh Phactory, Inc. Production.
        </div>
      </footer>
    </div>
  );
};

export default Researchers;
