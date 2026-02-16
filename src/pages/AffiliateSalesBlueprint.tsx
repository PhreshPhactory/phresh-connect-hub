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

  const scrollToPricing = () => {
    document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
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
        canonicalUrl="https://phreshphactory.com/affiliate-sales-blueprint"
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
                Master the System That Makes Affiliate Sales Work, All Year Long.
              </h1>
              
              <p className="text-xl md:text-2xl text-bright-white/90 mb-6 max-w-3xl mx-auto leading-relaxed">
                A 1-on-1 bootcamp built from real operational work with EatOkra and Afrofiliate.
              </p>
              
              <p className="text-lg md:text-xl text-bright-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
                Most brands don't have a sales problem. They have an affiliate preparation problem. This Bootcamp fixes that in one working session.
              </p>
              
              <Button
                onClick={scrollToPricing}
                size="lg"
                className="bg-strategic-gold hover:bg-strategic-gold/90 text-ink-black font-heading font-semibold text-lg px-8 py-6 h-auto shadow-2xl hover:shadow-strategic-gold/50 transition-all duration-300 hover:scale-105"
              >
                Choose Your Blueprint Tier
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
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  What You'll Walk Away With
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-strategic-gold via-rust to-teal mx-auto mb-8" />
                
                <div className="max-w-3xl mx-auto mb-16">
                  <div className="bg-teal/10 p-8 rounded-lg border-2 border-teal/30">
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-3">The Goal:</h3>
                    <p className="text-lg text-foreground/90 leading-relaxed">
                      By the end of your session, your brand will have a complete affiliate activation system: assets, messaging, scripts, and a campaign you can run the same week.
                    </p>
                  </div>
                </div>
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
              
              <div className="mt-12 text-center">
                <Card className="border-2 border-strategic-gold shadow-lg bg-gradient-to-br from-background to-strategic-gold/5">
                  <CardContent className="p-8">
                    <p className="text-lg text-foreground/90 leading-relaxed">
                      All deliverables are packaged in a clean, actionable <strong className="text-strategic-gold">Affiliate Asset Kit</strong> you can share with your affiliates immediately.
                    </p>
                  </CardContent>
                </Card>
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
              
              {/* Trusted By Section */}
              <div className="mt-16 text-center">
                <p className="text-muted-foreground mb-6 uppercase tracking-wide text-sm font-semibold">
                  Trusted By
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                  <span className="text-2xl font-heading font-bold text-foreground/70">Afrofiliate</span>
                  <span className="text-2xl font-heading font-bold text-foreground/70">CashBlack</span>
                  <span className="text-2xl font-heading font-bold text-foreground/70">EatOkra</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compatible With These Affiliate Platforms Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  Compatible With These Affiliate Platforms
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-teal via-strategic-gold to-rust mx-auto" />
              </div>
              
              <p className="text-lg md:text-xl text-foreground/90 mb-10 text-center max-w-4xl mx-auto">
                Our systems work seamlessly across the most widely used affiliate platforms for product-based brands, including:
              </p>
              
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 max-w-4xl mx-auto mb-12">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0"></div>
                    <span className="text-foreground/90">Shopify Affiliate & Referral Programs</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0"></div>
                    <span className="text-foreground/90">Impact</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0"></div>
                    <span className="text-foreground/90">CJ Affiliate (Commission Junction)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0"></div>
                    <span className="text-foreground/90">ShareASale</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0"></div>
                    <span className="text-foreground/90">Refersion</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0"></div>
                    <span className="text-foreground/90">UpPromote (Shopify)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0"></div>
                    <span className="text-foreground/90">GoAffPro</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0"></div>
                    <span className="text-foreground/90">Awin</span>
                  </li>
                </ul>
                
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0"></div>
                    <span className="text-foreground/90">Rakuten Advertising</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0"></div>
                    <span className="text-foreground/90">Amazon Associates</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0"></div>
                    <span className="text-foreground/90">Pepperjam</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0"></div>
                    <span className="text-foreground/90">Skimlinks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0"></div>
                    <span className="text-foreground/90">LTK (LIKEtoKNOW.it)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0"></div>
                    <span className="text-foreground/90">ShopStyle Collective</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0"></div>
                    <span className="text-foreground/90">CashBlack</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0"></div>
                    <span className="text-foreground/90">Afrofiliate</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-center text-lg text-foreground/80 italic max-w-3xl mx-auto">
                Your brand can use any affiliate platform. The systems we build are platform-agnostic and fully adaptable.
              </p>
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

        {/* Deliverable Format Clarification */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-card p-8 rounded-lg border-2 border-strategic-gold/30 shadow-lg">
                <p className="text-xl text-foreground leading-relaxed">
                  All deliverables are packaged in a clean, actionable <strong className="text-strategic-gold">Affiliate Asset Kit</strong> you can share with your affiliates immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How This Differs From Holiday Sprint */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-teal shadow-xl bg-gradient-to-br from-background to-teal/5">
                <CardContent className="p-10 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-8">
                    How This Differs From the Holiday Sprint
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h3 className="text-xl font-heading font-bold mb-3 text-strategic-gold">
                        Affiliate Sales Blueprint™ Bootcamp
                      </h3>
                      <p className="text-foreground/90">
                        This Bootcamp is a live working session where we build the system together. You're involved in every decision, and we tailor everything to your specific needs in real-time.
                      </p>
                    </div>
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <h3 className="text-xl font-heading font-bold mb-3 text-rust">
                        72-Hour Holiday Sprint
                      </h3>
                      <p className="text-foreground/90">
                        The Holiday Sprint is a done-for-you build with no meetings, ideal for fast Q4 execution. You submit your information, and we deliver a complete system in 72 hours.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What Happens After You Apply */}
        <section className="py-20 bg-gradient-to-br from-strategic-gold/5 via-background to-teal/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12">
                What Happens After You Apply
              </h2>
              
              <div className="space-y-6">
                <Card className="border-l-4 border-strategic-gold">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-strategic-gold flex items-center justify-center flex-shrink-0 text-ink-black font-bold">
                        1
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">We review your application within 24 hours.</h3>
                        <p className="text-muted-foreground">
                          We'll assess your brand's needs and confirm if the Bootcamp is the right fit.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-teal">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center flex-shrink-0 text-bright-white font-bold">
                        2
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">You receive a link to secure your session date.</h3>
                        <p className="text-muted-foreground">
                          Choose a time that works for your schedule.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-rust">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-rust flex items-center justify-center flex-shrink-0 text-bright-white font-bold">
                        3
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">You complete a brief pre-session questionnaire.</h3>
                        <p className="text-muted-foreground">
                          This helps us prepare and maximize our time together.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-strategic-gold">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-strategic-gold flex items-center justify-center flex-shrink-0 text-ink-black font-bold">
                        4
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">We meet 1:1 and build your Affiliate Sales Blueprint live.</h3>
                        <p className="text-muted-foreground">
                          Together, we create your complete affiliate activation system during the session.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-teal">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center flex-shrink-0 text-bright-white font-bold">
                        5
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">You receive your Affiliate Asset Kit + a follow-up review.</h3>
                        <p className="text-muted-foreground">
                          Everything organized and ready to deploy to your affiliates immediately.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Which Option Is Right for You? */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
                Which Option Is Right for You?
              </h2>
              
              <div className="space-y-4 text-lg text-foreground">
                <p>
                  <strong>Choose Tier 1 ($1,500)</strong> if you're a small brand, new to affiliates, or only need support with ONE product.
                </p>
                <p>
                  <strong>Choose Tier 2 ($2,500)</strong> if you want a complete affiliate system built WITH you in a single working session.
                </p>
                <p>
                  <strong>Choose Tier 3 ($5,000)</strong> if you want a fully done-for-you system that requires zero meetings and is delivered in 72 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Section */}
        <section id="pricing-section" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  Investment
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-strategic-gold to-rust mx-auto" />
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <Card className="border-2 border-border hover:border-strategic-gold transition-all duration-300 shadow-lg">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                        TIER 1: Affiliate Sales Blueprint™ Bootcamp (Starter)
                      </h3>
                      <div className="flex items-baseline mb-4">
                        <span className="text-5xl font-heading font-bold text-foreground">$1,500</span>
                      </div>
                      <p className="text-muted-foreground">
                        Perfect for small brands or first-time affiliate programs.
                      </p>
                    </div>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">1 Hero Product</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">1 Creator Brief</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">1 Script + set of talking points</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">"Sell This Week" Micro Campaign</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">1 deep link map</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Affiliate activation instructions</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Delivered live inside the 1:1 session</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Full asset kit for immediate use</span>
                      </div>
                    </div>

                    <Button
                      onClick={scrollToForm}
                      className="w-full bg-background hover:bg-muted text-foreground border-2 border-strategic-gold font-heading font-semibold"
                    >
                      Choose Tier 1
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-4 border-strategic-gold shadow-2xl transform scale-105 relative">
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-strategic-gold text-ink-black text-sm font-heading font-semibold px-4 py-1 rounded-full">
                      RECOMMENDED
                    </span>
                  </div>
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                        TIER 2: Affiliate Sales Blueprint™ Working Session (Growth)
                      </h3>
                      <div className="flex items-baseline mb-4">
                        <span className="text-5xl font-heading font-bold text-foreground">$2,500</span>
                      </div>
                      <p className="text-muted-foreground">
                        For brands with some traction who need a complete affiliate activation system.
                      </p>
                    </div>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">2 Hero Products</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">2 Creator Briefs</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Scripts + talking points for each product</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Product positioning cheat sheet</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Seasonal Micro Campaign</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Deep link maps</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Full affiliate activation plan</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Delivered live inside the 1:1 session</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Full asset kit</span>
                      </div>
                    </div>

                    <Button
                      onClick={scrollToForm}
                      className="w-full bg-strategic-gold hover:bg-strategic-gold/90 text-ink-black font-heading font-semibold"
                    >
                      Choose Tier 2
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border hover:border-rust transition-all duration-300 shadow-lg">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                        TIER 3: Holiday Affiliate Sales Sprint™ (Premium)
                      </h3>
                      <div className="flex items-baseline mb-4">
                        <span className="text-5xl font-heading font-bold text-foreground">$5,000</span>
                      </div>
                      <p className="text-muted-foreground">
                        A 72-hour, fully done-for-you build. No meetings. No calls.
                      </p>
                    </div>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">3 Hero Products</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Complete creator briefs</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Holiday scripts + talking points</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Full content kit</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Holiday angles + B-roll direction</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Affiliate deep link map</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Rollout checklist</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Master PDF + organized asset folder</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Delivered in 72 hours after intake</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-strategic-gold mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">Ideal for seasonal selling or Q4 urgency</span>
                      </div>
                    </div>

                    <Button
                      onClick={scrollToForm}
                      className="w-full bg-background hover:bg-muted text-foreground border-2 border-rust font-heading font-semibold"
                    >
                      Choose Tier 3
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Coming Soon Course Placeholder */}
              <div className="max-w-3xl mx-auto">
                <Card className="border-2 border-teal/30 bg-gradient-to-br from-background to-teal/5">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                      Coming Soon: Affiliate Sales Starter Course
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      A self-paced course for founders who want to set up their affiliate programs the right way, at a beginner-friendly price.
                    </p>
                    <p className="text-foreground mb-6">
                      Join the waitlist to be notified when it launches.
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="border-teal hover:bg-teal/10 font-heading font-semibold"
                    >
                      <Link to="/affiliate-starter-course-waitlist">Join the Waitlist</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-8 italic max-w-2xl mx-auto">
                If your affiliates cannot use what we build, we will revise it until it is fully sellable.
              </p>
            </div>
          </div>
        </section>

        {/* Built For Our Two-Sided Community Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  Built For Our Two-Sided Community
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-strategic-gold to-rust mx-auto mb-6" />
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  The Affiliate Sales Blueprint™ Bootcamp supports both sides of our ecosystem:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Phactory */}
                <Card className="border-2 border-border hover:border-primary transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">Phactory (Brands)</h3>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      Become affiliate-ready with systems, templates, and messaging frameworks.
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <a href="https://tinyurl.com/Phactory-Owners" target="_blank" rel="noopener noreferrer">
                        Join Phactory
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Phreelance */}
                <Card className="border-2 border-border hover:border-primary transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">Phreelance (Affiliates + Freelancers)</h3>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      Learn how to promote brands professionally and earn commissions consistently.
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <a href="https://tinyurl.com/Phreelance-Affiliate" target="_blank" rel="noopener noreferrer">
                        Join Phreelance
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <p className="text-xl text-center text-foreground font-medium">
                This two-way readiness system is what makes affiliate sales predictable and sustainable.
              </p>
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
