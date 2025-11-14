import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Target, Users, Rocket, Package, TrendingUp, FileText, Share2, Zap } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import NewsletterSignup from '@/components/NewsletterSignup';

const AffiliateSalesBlueprint = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    brand: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const scrollToForm = () => {
    document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead
        title="The Affiliate Sales Blueprint™ Bootcamp | Phresh Phactory"
        description="A 1:1 working session for brands ready to turn affiliate programs into actual revenue. Strategic guidance from Kiera H., Founder of Phresh Phactory, Inc."
        keywords="affiliate marketing, brand strategy, affiliate sales, bootcamp, affiliate program, product marketing"
        canonicalUrl="/affiliate-sales-blueprint"
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-ink-black via-teal-700 to-ink-black">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,108,108,0.3),transparent_50%)]" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-block mb-6 px-6 py-2 bg-strategic-gold/20 border border-strategic-gold rounded-full">
                <span className="text-strategic-gold font-heading font-semibold tracking-wide">EXCLUSIVE 1:1 WORKING SESSION</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-bright-white mb-6 leading-tight">
                The Affiliate Sales<br />Blueprint™ Bootcamp
              </h1>
              
              <p className="text-xl md:text-2xl text-bright-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                A 1:1 working session for brands ready to turn affiliate programs into actual revenue.
              </p>
              
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-strategic-gold hover:bg-strategic-gold/90 text-ink-black font-heading font-semibold text-lg px-8 py-6 h-auto shadow-2xl hover:shadow-strategic-gold/50 transition-all duration-300 hover:scale-105"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-rust shadow-xl">
                <CardContent className="p-10 md:p-16">
                  <div className="text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
                      Most brands launch an affiliate program… then wonder why nothing sells.
                    </h2>
                    <p className="text-xl text-muted-foreground">
                      It's not the affiliates. It's not the product. <span className="text-rust font-semibold">It's the missing system.</span>
                    </p>
                    <p className="text-xl text-foreground font-semibold border-t-2 border-strategic-gold pt-6">
                      Affiliates cannot sell what a brand hasn't prepared for them. This bootcamp fixes that.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What You'll Walk Away With */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  What You'll Walk Away With
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-strategic-gold via-rust to-teal mx-auto" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Package, title: 'Affiliate Asset Kit', desc: 'Complete package of ready-to-use resources' },
                  { icon: TrendingUp, title: 'Product Sales Breakdown', desc: 'Data-driven sales strategy framework' },
                  { icon: Target, title: 'Messaging Hooks', desc: 'Compelling angles that convert' },
                  { icon: FileText, title: 'Scripts + Captions', desc: 'Copy-paste ready content templates' },
                  { icon: Zap, title: 'Sell-This-Week Micro Campaign', desc: 'Immediate action plan for quick wins' },
                  { icon: Share2, title: 'Affiliate Distribution Plan', desc: 'Strategic outreach and activation roadmap' },
                  { icon: CheckCircle2, title: 'Brand-Specific Cheat Sheet', desc: 'Your personalized sales playbook' }
                ].map((item, index) => (
                  <Card key={index} className="border-2 border-border hover:border-strategic-gold transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-strategic-gold to-rust flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-bright-white" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  Who This Is For
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-teal via-strategic-gold to-rust mx-auto" />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { icon: Target, text: 'Brands with an affiliate program but low sales' },
                  { icon: Users, text: 'Brands on Afrofiliate, CashBlack, or other platforms' },
                  { icon: Rocket, text: 'Brands preparing for Q4 or product launches' },
                  { icon: TrendingUp, text: 'Founders who want affiliates to talk about their product confidently' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-6 rounded-lg bg-muted/50 border-l-4 border-teal">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-bright-white" />
                    </div>
                    <p className="text-lg text-foreground font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Inside the Bootcamp Session */}
        <section className="py-20 bg-gradient-to-br from-teal-700/10 to-ink-black/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  Inside the Bootcamp Session
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-rust via-strategic-gold to-teal mx-auto" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: '01',
                    title: 'Audit',
                    desc: 'We analyze your current affiliate setup, identify gaps, and uncover what\'s blocking sales.'
                  },
                  {
                    step: '02',
                    title: 'Build',
                    desc: 'We create a strategic framework designed specifically for your brand and product lineup.'
                  },
                  {
                    step: '03',
                    title: 'Create',
                    desc: 'We develop all assets, messaging, and content your affiliates need to start selling.'
                  },
                  {
                    step: '04',
                    title: 'Package',
                    desc: 'We deliver everything in an organized, actionable format with a clear launch plan.'
                  }
                ].map((item, index) => (
                  <Card key={index} className="relative overflow-hidden border-2 border-border hover:border-strategic-gold transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-strategic-gold/20 to-transparent rounded-bl-full" />
                    <CardContent className="p-8 relative">
                      <div className="text-6xl font-heading font-bold text-strategic-gold/20 mb-4">{item.step}</div>
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-4">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Investment Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="border-4 border-strategic-gold shadow-2xl bg-gradient-to-br from-background to-strategic-gold/5">
                <CardContent className="p-12 text-center">
                  <div className="mb-6">
                    <p className="text-muted-foreground text-lg mb-2 uppercase tracking-wide font-heading">Investment</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-7xl font-heading font-bold text-foreground">$497</span>
                    </div>
                  </div>
                  <p className="text-xl text-muted-foreground mb-8">
                    One private session + full deliverables + follow-up review
                  </p>
                  <Button
                    onClick={scrollToForm}
                    size="lg"
                    className="bg-strategic-gold hover:bg-strategic-gold/90 text-ink-black font-heading font-semibold text-lg px-12 py-6 h-auto shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About the Strategist */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  About the Strategist
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-strategic-gold to-rust mx-auto" />
              </div>

              <Card className="border-2 border-border shadow-xl">
                <CardContent className="p-10 md:p-16">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-strategic-gold via-rust to-teal flex items-center justify-center text-5xl font-heading font-bold text-bright-white">
                        K
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                        Kiera H., Founder of Phresh Phactory, Inc.
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        Advisor to culturally relevant founders, brands, and freelancers. Producer behind <span className="text-foreground font-semibold">Phresh Phactory TV</span>. Affiliate ecosystem strategist behind <span className="text-teal font-semibold">Afrofiliate</span> and <span className="text-rust font-semibold">CashBlack</span>.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  See what Afrofiliate/CashBlack have to say about Kiera and Phresh Phactory, Inc.
                </h2>
              </div>

              <Card className="border-2 border-strategic-gold shadow-2xl bg-gradient-to-br from-background to-muted/20">
                <CardContent className="p-10 md:p-16">
                  <div className="text-center mb-8">
                    <p className="font-heading font-bold text-2xl text-foreground mb-1">Matthew Addai</p>
                    <p className="text-lg text-muted-foreground mb-2">Co-Founder and CEO</p>
                    <p className="text-lg text-teal font-semibold mb-6">Afrofiliate / CashBlack</p>
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 text-strategic-gold fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed text-center italic border-t-2 border-strategic-gold/30 pt-8">
                    "Working with Kiera has been transformational to me and my business on a personal and professional level. In addition to the improved communication and organisation skills we now posses, the processes and systems we've built together and put in place have proved invaluable to the growth and sustainability in everything we do. We can see a tangible and measurable difference in before working with Kiera to where we are now and I would highly recommend her to everyone."
                  </blockquote>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Primary CTA Section */}
        <section id="apply-form" className="py-20 bg-gradient-to-br from-ink-black via-teal-700 to-ink-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.4),transparent_70%)]" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-bright-white mb-6">
                  Let's build a system your affiliates can actually sell.
                </h2>
                <div className="w-24 h-1 bg-strategic-gold mx-auto" />
              </div>

              <Card className="border-2 border-strategic-gold shadow-2xl bg-background">
                <CardContent className="p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-foreground font-semibold">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-2 border-2 focus:border-strategic-gold"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-foreground font-semibold">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-2 border-2 focus:border-strategic-gold"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="brand" className="text-foreground font-semibold">Brand Name *</Label>
                      <Input
                        id="brand"
                        required
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="mt-2 border-2 focus:border-strategic-gold"
                        placeholder="Your brand name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-foreground font-semibold">Tell us about your affiliate program *</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="mt-2 border-2 focus:border-strategic-gold min-h-32"
                        placeholder="What platform are you using? What challenges are you facing?"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-strategic-gold hover:bg-strategic-gold/90 text-ink-black font-heading font-semibold text-lg py-6 h-auto shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <NewsletterSignup 
              source="affiliate-sales-blueprint"
              title="Get Strategic Affiliate Marketing Insights"
              description="Join brand founders receiving actionable strategies to transform affiliate programs into revenue drivers."
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-ink-black text-bright-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-heading font-bold text-xl mb-4 text-strategic-gold">Quick Links</h3>
                  <nav className="space-y-2">
                    <Link to="/" className="block hover:text-strategic-gold transition-colors">Home</Link>
                    <Link to="/about" className="block hover:text-strategic-gold transition-colors">About</Link>
                    <Link to="/services" className="block hover:text-strategic-gold transition-colors">Services</Link>
                    <Link to="/contact" className="block hover:text-strategic-gold transition-colors">Contact</Link>
                  </nav>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl mb-4 text-strategic-gold">Connect</h3>
                  <div className="space-y-2">
                    <a href="https://www.linkedin.com/company/phresh-phactory" target="_blank" rel="noopener noreferrer" className="block hover:text-strategic-gold transition-colors">LinkedIn</a>
                    <a href="https://www.youtube.com/@PhreshPhactory" target="_blank" rel="noopener noreferrer" className="block hover:text-strategic-gold transition-colors">YouTube</a>
                    <a href="https://www.instagram.com/phreshphactory" target="_blank" rel="noopener noreferrer" className="block hover:text-strategic-gold transition-colors">Instagram</a>
                  </div>
                </div>
              </div>

              <div className="border-t border-bright-white/20 pt-8">
                <p className="text-sm text-bright-white/70 mb-4 leading-relaxed">
                  <strong className="text-bright-white">Disclaimer:</strong> Phresh Phactory, Inc. provides advisory, strategy, and systems development for brand–affiliate ecosystems.
                </p>
                <p className="text-sm text-bright-white/70">
                  © {new Date().getFullYear()} Phresh Phactory, Inc. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AffiliateSalesBlueprint;
