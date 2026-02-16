import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Target, Users, Zap, Award } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import SectionTitle from "@/components/SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HolidaySprintLanding() {
  return (
    <>
      <SEOHead
        title="THE HOLIDAY AFFILIATE SALES SPRINT™ - Get Affiliates Selling Your Products This Season"
        description="A 2-week sprint that equips your brand with everything affiliates need to sell your products before the holiday window closes. Done-for-you affiliate sales kits, scripts, and strategy."
        keywords="affiliate marketing, holiday sales, affiliate program, Q4 sales, brand growth, affiliate sales kit"
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-background via-background to-muted/10 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-6 px-4 py-2 bg-strategic-gold/10 border border-strategic-gold/20 rounded-full">
                <span className="text-strategic-gold font-semibold text-sm uppercase tracking-wide">
                  Limited Holiday Offer
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 leading-tight">
                THE HOLIDAY AFFILIATE
                <br />
                SALES SPRINT™
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
                A fast-action, 2-week sprint that equips your brand with everything affiliates need to sell your products before the holiday window closes.
              </p>
              
              <Button
                asChild
                size="lg"
                className="bg-strategic-gold hover:bg-strategic-gold/90 text-background font-bold text-lg px-12 py-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                <Link to="/holiday-sprint-payment">
                  Start Your Holiday Sprint
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Problem / Urgency Section */}
        <section className="py-20 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <SectionTitle
                title="The Holiday Revenue Window Is Open Right Now"
                subtitle="Most brands will miss it."
                center
              />
              
              <div className="space-y-6 text-lg text-foreground leading-relaxed">
                <p>
                  Affiliates want to sell your products. They're ready. But most brands give them nothing to work with: no assets, no scripts, no clear direction. So affiliates promote the brands who make it easy.
                </p>
                
                <p>
                  Q4 is the most competitive season of the year. Consumers are buying now. Affiliates are choosing which brands to promote now. And if your brand isn't prepared with clear positioning, ready-to-use content, and a simple promotion plan, you're already behind.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <Card className="border-2 border-border bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Clock className="w-8 h-8 text-strategic-gold flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-xl mb-2">The Problem</h3>
                          <p className="text-muted-foreground">
                            Most brands start planning their affiliate strategy too late, missing the critical Q4 buying window when consumers are actively purchasing.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-border bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Zap className="w-8 h-8 text-strategic-gold flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-xl mb-2">The Solution</h3>
                          <p className="text-muted-foreground">
                            This sprint is designed to fix that in 14 days, giving you everything affiliates need to start promoting immediately.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <p className="font-semibold text-xl text-center">
                  Affiliates promote the brands who are prepared. This sprint gets you prepared, fast.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <SectionTitle
                title="What This Sprint Includes"
                subtitle="Everything your affiliates need to start selling immediately"
                center
              />
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Target,
                    title: "Done-For-You Affiliate Sales Kit",
                    description: "Complete package of materials your affiliates can use immediately. No extra work required from your team."
                  },
                  {
                    icon: Users,
                    title: "Content Scripts & Templates",
                    description: "Pre-written social media scripts, email templates, and promotional content affiliates can customize and deploy."
                  },
                  {
                    icon: Award,
                    title: "Product Positioning Breakdown",
                    description: "Clear messaging framework that helps affiliates understand exactly how to position and sell your products."
                  },
                  {
                    icon: CheckCircle,
                    title: "Affiliate Onboarding Instructions",
                    description: "Step-by-step guide that makes it simple for new affiliates to join your program and start promoting."
                  },
                  {
                    icon: Zap,
                    title: "Holiday Promotion Plan",
                    description: "Strategic content calendar and promotional timeline designed specifically for Q4 holiday sales."
                  },
                  {
                    icon: Clock,
                    title: "Strategy Review Session",
                    description: "Direct consultation to ensure your affiliate materials are optimized for maximum conversion and sales."
                  }
                ].map((item, index) => (
                  <Card key={index} className="border-2 border-border hover:border-strategic-gold/50 transition-all bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-strategic-gold/10 rounded-lg">
                          <item.icon className="w-6 h-6 text-strategic-gold" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who This Is For Section */}
        <section className="py-20 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <SectionTitle
                title="Who This Sprint Is For"
                center
              />
              
              <Card className="border-2 border-strategic-gold/20 bg-card">
                <CardContent className="p-8 md:p-12">
                  <div className="space-y-4">
                    {[
                      "Brands already on Afrofiliate, ShareASale, Amazon Associates, Impact, or any affiliate platform",
                      "Founders who want affiliate sales but don't have time to create promotional assets",
                      "Brands with great products but no structured holiday marketing plan",
                      "Small teams that need clear, simple systems to scale affiliate relationships",
                      "Anyone who wants affiliates to actually promote their products this holiday season",
                      "E-commerce businesses ready to activate dormant affiliate partnerships"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <CheckCircle className="w-6 h-6 text-strategic-gold flex-shrink-0 mt-1" />
                        <p className="text-lg text-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <SectionTitle
                title="How The Sprint Works"
                subtitle="Fast, focused, and designed to get results before the holiday window closes"
                center
              />
              
              <div className="space-y-6">
                {[
                  {
                    days: "Day 1–3",
                    title: "Foundation & Asset Development",
                    description: "We analyze your brand, products, and current positioning. Then we begin building your comprehensive affiliate sales kit with all necessary materials."
                  },
                  {
                    days: "Day 4–6",
                    title: "Product Positioning & Scripts",
                    description: "You receive custom product positioning frameworks, social media scripts, and promotional content templates tailored to your brand voice and target audience."
                  },
                  {
                    days: "Day 7–10",
                    title: "Affiliate Onboarding & Content Strategy",
                    description: "We create your affiliate onboarding guide and holiday content calendar, giving affiliates a clear roadmap for promoting your products throughout Q4."
                  },
                  {
                    days: "Day 11–14",
                    title: "Delivery & Implementation Support",
                    description: "All materials are finalized, packaged, and delivered. You receive implementation guidance to ensure affiliates can start promoting immediately."
                  }
                ].map((step, index) => (
                  <Card key={index} className="border-2 border-border bg-card">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-strategic-gold/10 border-2 border-strategic-gold flex items-center justify-center">
                            <span className="text-strategic-gold font-bold text-lg">{index + 1}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-strategic-gold font-semibold mb-2">{step.days}</div>
                          <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-10 text-center">
                <p className="text-lg font-semibold text-foreground mb-6">
                  This process is fast, clear, and achievable. Designed specifically for busy founders who need results now.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-strategic-gold hover:bg-strategic-gold/90 text-background font-bold text-lg px-12 py-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  <Link to="/holiday">
                    Start Your Sprint Today
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-20 md:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <SectionTitle
                title="What Industry Leaders Are Saying"
                center
              />
              
              <Card className="border-2 border-strategic-gold/30 bg-card shadow-2xl">
                <CardContent className="p-8 md:p-12">
                  <div className="mb-6">
                    <svg className="w-12 h-12 text-strategic-gold/20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  
                  <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                    "Working with Kiera has been transformational to me and my business on a personal and professional level. In addition to the improved communication and organisation skills we now possess, the processes and systems we've built together and put in place have proved invaluable to the growth and sustainability in everything we do. We can see a tangible and measurable difference from before working with Kiera to where we are now, and I would highly recommend her to everyone."
                  </p>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-lg text-foreground">Matthew Addai</p>
                      <p className="text-strategic-gold font-semibold">Co-Founder and CEO</p>
                      <p className="text-muted-foreground">Afrofiliate / CashBlack</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why This Works Section */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <SectionTitle
                title="Why This Framework Works"
                subtitle="Built from real results with actual affiliate networks and brands"
                center
              />
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Proven Track Record",
                    description: "These frameworks have been developed and refined while working directly with Afrofiliate and hundreds of affiliate partnerships."
                  },
                  {
                    title: "Built for Speed",
                    description: "Designed specifically for brands who need quick wins during the limited Q4 holiday window. No wasted time or unnecessary complexity."
                  },
                  {
                    title: "Affiliate-Tested",
                    description: "Every template, script, and strategy has been validated with real affiliates who actually use these materials to drive sales."
                  },
                  {
                    title: "Easy Implementation",
                    description: "Clear, simple systems that your team (or freelancers) can execute without extensive training or complicated processes."
                  }
                ].map((item, index) => (
                  <Card key={index} className="border-2 border-border bg-card">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-xl mb-3 text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-10">
                <Card className="border-2 border-strategic-gold/20 bg-strategic-gold/5">
                  <CardContent className="p-8 text-center">
                    <p className="text-lg font-semibold text-foreground">
                      The bottom line: This gives affiliates everything they need to start selling your products immediately, which means more revenue for your brand during the most important sales period of the year.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <SectionTitle
                title="Investment"
                subtitle="Everything you need to activate affiliate sales this holiday season"
                center
              />
              
              <Card className="border-2 border-strategic-gold shadow-2xl bg-card">
                <CardContent className="p-10 md:p-14">
                  <div className="text-center mb-8">
                    <div className="inline-block mb-4 px-4 py-2 bg-strategic-gold/10 border border-strategic-gold/20 rounded-full">
                      <span className="text-strategic-gold font-semibold text-sm uppercase tracking-wide">
                        Limited Holiday Offer
                      </span>
                    </div>
                    <div className="mb-4">
                      <span className="text-6xl font-bold text-foreground">$497</span>
                    </div>
                    <p className="text-xl text-muted-foreground">One-time investment</p>
                  </div>
                  
                  <div className="space-y-4 mb-10">
                    {[
                      "Complete done-for-you affiliate sales kit",
                      "Content scripts and promotional templates",
                      "Product positioning framework",
                      "Affiliate onboarding guide",
                      "Holiday promotion and content calendar",
                      "Strategy review session",
                      "14-day delivery timeline"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-strategic-gold flex-shrink-0 mt-0.5" />
                        <p className="text-lg text-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-6 mb-8">
                    <p className="text-center text-foreground">
                      <strong className="text-strategic-gold">Time-Sensitive:</strong> The holiday buying window is limited. Secure your spot now to ensure delivery before the peak shopping period.
                    </p>
                  </div>
                  
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-strategic-gold hover:bg-strategic-gold/90 text-background font-bold text-lg py-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    <Link to="/holiday">
                      Enroll in The Holiday Affiliate Sales Sprint™
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <SectionTitle
                title="Frequently Asked Questions"
                center
              />
              
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border-2 border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-lg font-semibold text-left hover:text-strategic-gold">
                    Do I need to already be on an affiliate platform?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    While it's helpful if you're already on platforms like Afrofiliate, ShareASale, Amazon Associates, or Impact, it's not required. This sprint focuses on creating the materials and strategy you'll need regardless of which platform you use. If you're not on a platform yet, we'll include guidance on getting started.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-2 border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-lg font-semibold text-left hover:text-strategic-gold">
                    What if I don't have affiliates yet?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Perfect. That means you'll have professional, compelling materials ready when you start recruiting affiliates. Having these assets prepared makes it significantly easier to attract quality affiliates because you're showing them exactly what they'll get and how easy it will be to promote your products.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-2 border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-lg font-semibold text-left hover:text-strategic-gold">
                    How long does the sprint take?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    The sprint is designed as a focused 14-day process from start to finish. This timeline ensures you receive everything before the peak holiday shopping period while maintaining the quality and strategic depth your affiliate program needs to succeed.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-2 border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-lg font-semibold text-left hover:text-strategic-gold">
                    What if my team isn't ready to implement this right now?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    The materials we create are designed to be "shelf-ready," meaning they can be used immediately or saved for when you're ready to activate. Everything is documented clearly so anyone on your team (or freelancers you hire) can implement without extensive training. The holiday window won't wait, but these assets will be ready when you are.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-2 border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-lg font-semibold text-left hover:text-strategic-gold">
                    Can freelancers or team members use these materials?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Absolutely. All materials are created with clear documentation and usage guidelines, making it simple for anyone on your team, or external contractors, to understand and implement. The goal is to make affiliate promotion as turnkey as possible for everyone involved.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="border-2 border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-lg font-semibold text-left hover:text-strategic-gold">
                    What if my products aren't specifically holiday-themed?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    That's completely fine. The holiday season is about gift-giving, treating yourself, and taking advantage of promotions, not just holiday-specific products. We'll position your products in a way that makes them relevant and appealing for Q4 buyers, regardless of whether they're seasonal items.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7" className="border-2 border-border rounded-lg px-6 bg-card">
                  <AccordionTrigger className="text-lg font-semibold text-left hover:text-strategic-gold">
                    What happens after the 14 days?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    You'll have a complete, ready-to-use affiliate sales system that you own and can continue using beyond the holiday season. While this sprint is focused on Q4, the frameworks, templates, and positioning we create will serve your affiliate program long-term. You can reuse, adapt, and build on these materials for future campaigns.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                The Holiday Buying Window Is Open Right Now
              </h2>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
                Affiliates promote brands who are prepared. Get everything you need in the next 14 days.
              </p>
              
              <Button
                asChild
                size="lg"
                className="bg-strategic-gold hover:bg-strategic-gold/90 text-background font-bold text-xl px-14 py-7 rounded-lg transition-all shadow-2xl hover:shadow-3xl"
              >
                <Link to="/holiday">
                  Enroll in The Holiday Affiliate Sales Sprint™
                </Link>
              </Button>
              
              <p className="mt-8 text-sm text-muted-foreground">
                Questions? Email us at{" "}
                <a
                  href="mailto:info@phreshphactory.co"
                  className="text-strategic-gold hover:underline font-semibold"
                >
                  info@phreshphactory.co
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
