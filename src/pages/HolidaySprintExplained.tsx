import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import EmailCaptureModal from "@/components/EmailCaptureModal";
import NewsletterSignup from "@/components/NewsletterSignup";

const HolidaySprintExplained = () => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [capturedEmail, setCapturedEmail] = useState('');

  const handleCTAClick = () => {
    setIsEmailModalOpen(true);
  };

  const handleEmailSuccess = (email: string) => {
    setCapturedEmail(email);
    setIsEmailModalOpen(false);
    
    // Navigate to application form with pre-filled email
    window.location.href = `/holiday?email=${encodeURIComponent(email)}`;
  };

  return (
    <>
      <SEOHead
        title="Holiday Affiliate Sales Strategy | THE HOLIDAY AFFILIATE SALES SPRINT™ - Phresh Phactory"
        description="Get a complete holiday affiliate sales system in 72 hours. Phresh Phactory helps product brands optimize affiliate programs with multicultural storytelling and premium content production."
        keywords="holiday affiliate sales, affiliate marketing sprint, Q4 sales accelerator, affiliate content creation, brand partnership, product content agency, affiliate sales strategist, holiday sales system, e-commerce brand strategy"
        canonicalUrl="https://phreshphactory.com/holiday-explained"
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-20 md:pt-32 pb-16 md:pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-tertiary/5 via-background to-teal/5" />
          
          <div className="container max-w-5xl mx-auto relative z-10">
            {/* SEO Introduction */}
            <div className="mb-8">
              <p className="text-lg md:text-xl text-center text-foreground/90 max-w-4xl mx-auto leading-relaxed">
                Phresh Phactory, Inc. helps product brands grow through multicultural storytelling, affiliate program optimization, and premium content production designed to increase visibility and sales.
              </p>
            </div>

            <div className="text-center space-y-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-tight">
                Your Holiday Affiliate Sales Strategy — Built in 72 Hours
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 max-w-4xl mx-auto font-light leading-relaxed">
                No meetings. No calls. No overwhelm. Just results.
              </p>
              
              <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                We build the assets your affiliates need so they can finally sell your products during the holiday rush.
              </p>
              
              <div className="pt-6">
                <Button
                  onClick={handleCTAClick}
                  size="lg"
                  className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Start Your Holiday Sprint
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-4">
              Watch: Why Most Affiliate Programs Don't Work (and How We Fix Them)
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10">
              A short message from Kiera H., Founder of Phresh Phactory, Inc.
            </p>
            
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-muted">
              <iframe
                src="https://www.youtube.com/embed/2FWrAuYIlmU"
                title="Holiday Affiliate Sales Strategy: Why Most Affiliate Programs Don't Work - Phresh Phactory"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container max-w-5xl mx-auto">
            <p className="text-xl md:text-2xl text-center text-foreground/90 max-w-4xl mx-auto mb-12">
              Most holiday affiliate programs fail not because of the affiliates — but because brands don't have a system designed for seasonal selling.
            </p>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-12 text-center">
              Why Most Affiliate Programs Fail
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-card border border-border p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-rust/20 flex items-center justify-center mb-4">
                  <span className="text-rust text-xl font-bold">×</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">No Talking Points</h3>
                <p className="text-muted-foreground">Affiliates don't know what to say about your products.</p>
              </div>
              
              <div className="bg-card border border-border p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-rust/20 flex items-center justify-center mb-4">
                  <span className="text-rust text-xl font-bold">×</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">No Consistent Content Kit</h3>
                <p className="text-muted-foreground">No branded assets, product images, or positioning guides.</p>
              </div>
              
              <div className="bg-card border border-border p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-rust/20 flex items-center justify-center mb-4">
                  <span className="text-rust text-xl font-bold">×</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">No Seasonal Angles</h3>
                <p className="text-muted-foreground">Missing the urgency and gifting angles that drive holiday sales.</p>
              </div>
              
              <div className="bg-card border border-border p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-rust/20 flex items-center justify-center mb-4">
                  <span className="text-rust text-xl font-bold">×</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">No Clear Product Focus</h3>
                <p className="text-muted-foreground">Affiliates are overwhelmed by too many SKUs and no guidance.</p>
              </div>
              
              <div className="bg-card border border-border p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-rust/20 flex items-center justify-center mb-4">
                  <span className="text-rust text-xl font-bold">×</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">No Ready Links</h3>
                <p className="text-muted-foreground">Affiliates can't find or access the right links when they need them.</p>
              </div>
              
              <div className="bg-card border border-border p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-rust/20 flex items-center justify-center mb-4">
                  <span className="text-rust text-xl font-bold">×</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">No Creator Brief</h3>
                <p className="text-muted-foreground">No instructions on how to create content or what to emphasize.</p>
              </div>
              
              <div className="bg-card border border-border p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-rust/20 flex items-center justify-center mb-4">
                  <span className="text-rust text-xl font-bold">×</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">No Sample Scripts</h3>
                <p className="text-muted-foreground">Affiliates have to guess what to say in videos and posts.</p>
              </div>
              
              <div className="bg-card border border-border p-6 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-rust/20 flex items-center justify-center mb-4">
                  <span className="text-rust text-xl font-bold">×</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">No System to Follow</h3>
                <p className="text-muted-foreground">No clear roadmap for affiliates to execute successfully.</p>
              </div>
            </div>

            <div className="text-center max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                Brands think affiliates aren't working.
              </p>
              <p className="text-xl md:text-2xl text-foreground/90">
                But affiliates simply have nothing strong to work with.
              </p>
            </div>
          </div>
        </section>

        {/* What This Sprint Delivers */}
        <section className="py-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-6 text-center">
              What This Sprint Delivers — Fully Done For You
            </h2>
            
            <p className="text-xl text-center text-foreground/90 max-w-3xl mx-auto mb-16">
              Submit one intake form and we handle the rest. This is a fast, done-for-you 72-hour build where every piece of your holiday affiliate system is created and delivered ready to launch — with zero meetings required.
            </p>

            <div className="space-y-8">
              {/* Holiday Product Focus Strategy */}
              <div className="bg-card border-2 border-tertiary/30 p-8 rounded-lg">
                <h3 className="text-2xl font-heading font-bold mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-tertiary" />
                  </div>
                  Holiday Product Focus Strategy
                </h3>
                <p className="text-foreground/90 mb-6 ml-11">
                  We choose 3 products with the highest earning potential:
                </p>
                <div className="grid md:grid-cols-3 gap-6 ml-11">
                  <div className="space-y-2">
                    <div className="text-lg font-semibold text-tertiary">1. Highest-Margin Product</div>
                    <p className="text-sm text-muted-foreground">the one that earns you the most profit</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-semibold text-teal">2. Top-Selling Product</div>
                    <p className="text-sm text-muted-foreground">the one that converts quickly</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-semibold text-rust">3. Seasonal or Giftable Product</div>
                    <p className="text-sm text-muted-foreground">positioned specifically for holiday buyers</p>
                  </div>
                </div>
                <p className="text-foreground/90 mt-6 ml-11">
                  We choose products strategically so your affiliates aren't overwhelmed and can promote with clarity and confidence.
                </p>
              </div>

              {/* Complete Creator Brief */}
              <div className="bg-card border border-border p-8 rounded-lg">
                <h3 className="text-2xl font-heading font-bold mb-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-teal" />
                  </div>
                  Complete Creator Brief
                </h3>
                <p className="text-foreground/90 ml-11">
                  Tells affiliates exactly what to highlight, how to speak about your product, and who it's for.
                </p>
              </div>

              {/* Holiday Talking Points */}
              <div className="bg-card border border-border p-8 rounded-lg">
                <h3 className="text-2xl font-heading font-bold mb-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rust/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-rust" />
                  </div>
                  Holiday Talking Points
                </h3>
                <p className="text-foreground/90 ml-11">
                  Clear, persuasive, benefit-led messaging affiliates can copy/paste.
                </p>
              </div>

              {/* Content Kit for Affiliates */}
              <div className="bg-card border border-border p-8 rounded-lg">
                <h3 className="text-2xl font-heading font-bold mb-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-tertiary" />
                  </div>
                  Content Kit for Affiliates
                </h3>
                <p className="text-foreground/90 ml-11">
                  Includes stills, mockups, angles, and positioning statements.
                </p>
              </div>

              {/* Holiday Sales Angles + B-Roll Guidance */}
              <div className="bg-card border border-border p-8 rounded-lg">
                <h3 className="text-2xl font-heading font-bold mb-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-teal" />
                  </div>
                  Holiday Sales Angles + B-Roll Guidance
                </h3>
                <p className="text-foreground/90 ml-11">
                  Shows affiliates how to naturally incorporate your product in holiday moments.
                </p>
              </div>

              {/* Affiliate Deep Links + Easy Access */}
              <div className="bg-card border border-border p-8 rounded-lg">
                <h3 className="text-2xl font-heading font-bold mb-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rust/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-rust" />
                  </div>
                  Affiliate Deep Links + Easy Access
                </h3>
                <p className="text-foreground/90 ml-11">
                  Ensures every affiliate has the right link, ready to use instantly.
                </p>
              </div>

              {/* Your Holiday Affiliate Sales System */}
              <div className="bg-card border-2 border-primary/30 p-8 rounded-lg">
                <h3 className="text-2xl font-heading font-bold mb-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  Your Holiday Affiliate Sales System (PDF)
                </h3>
                <p className="text-foreground/90 ml-11">
                  One organized, easy-to-share package.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container max-w-4xl mx-auto">
            <div className="bg-card border-2 border-primary/30 p-8 md:p-12 rounded-lg shadow-lg">
              <div className="text-center mb-6">
                <svg className="w-12 h-12 mx-auto text-primary/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <blockquote className="text-lg md:text-xl text-center text-foreground/90 mb-8 leading-relaxed">
                "This testimonial content should be replaced with the actual Matthew Addai testimonial. The structure is ready to highlight social proof and build credibility for the Holiday Affiliate Sales Sprint program."
              </blockquote>
              <div className="text-center">
                <p className="font-semibold text-foreground text-lg">Matthew Addai</p>
                <p className="text-muted-foreground">Co-Founder and CEO, Afrofiliate/ Cashblack</p>
              </div>
            </div>
          </div>
        </section>

        {/* No-Meeting Structure */}
        <section className="py-20 px-4 bg-gradient-to-br from-teal/5 via-background to-tertiary/5">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="bg-card border-2 border-primary/30 p-10 md:p-16 rounded-lg shadow-lg">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Built for Busy Founders
              </h2>
              <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed mb-6">
                This Sprint is built for busy founders. There are no meetings, no calls, and no strategy sessions. You submit your information, and in 72 hours, your entire holiday affiliate system is complete.
              </p>
              <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
                You don't need a kickoff call, a strategy session, or any back-and-forth. We build everything using the information you submit.
              </p>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-12 text-center">
              Why This Matters for Holiday Sales
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-tertiary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-6 h-6 text-tertiary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Creators Need Simplicity</h3>
                  <p className="text-foreground/90">
                    Affiliates perform best when they have clear, organized instructions they can follow immediately.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-6 h-6 text-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">The Holiday Window Is Short</h3>
                  <p className="text-foreground/90">
                    You have weeks, not months, to maximize Q4 sales. Every day without a system is lost revenue.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-rust/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-6 h-6 text-rust" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">You Can't Afford to Waste 30 Days Training Affiliates</h3>
                  <p className="text-foreground/90">
                    Traditional onboarding takes too long. This system gets affiliates selling from day one.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">A Done-For-You System Means Affiliates Can Start Selling Immediately</h3>
                  <p className="text-foreground/90">
                    No learning curve. No confusion. Just clear content and instant activation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Sprint Works Section */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-8">
              Why This Sprint Works
            </h2>
            <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed max-w-3xl mx-auto">
              Affiliates can only sell what they clearly understand.
            </p>
            <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed max-w-3xl mx-auto mt-4">
              This system gives them simple talking points, clean assets, organized links, and ready-to-use content so they can start promoting immediately — without asking you questions.
            </p>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-12 text-center">
              What Founders Are Saying
            </h2>
            
            <div className="bg-card border border-border p-8 md:p-12 rounded-lg shadow-lg">
              <blockquote className="space-y-6">
                <p className="text-lg md:text-xl leading-relaxed font-serif italic text-foreground/90">
                  "Working with Kiera has been transformational to me and my business on a personal and professional level. In addition to the improved communication and organisation skills we now posses, the processes and systems we've built together and put in place have proved invaluable to the growth and sustainability in everything we do. We can see a tangible and measurable difference in before working with Kiera to where we are now and I would highly recommend her to everyone."
                </p>
                
                <footer className="pt-6 border-t border-border">
                  <div className="font-semibold text-foreground">Matthew Addai</div>
                  <div className="text-muted-foreground">Co-Founder & CEO, Afrofiliate / CashBlack</div>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-12 text-center">
              Frequently Asked Questions
            </h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  Do I need to get on a meeting?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/90 text-base">
                  No. Everything is done without calls. You submit your intake form, and we build your complete system — no meetings required.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  How long does it take?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/90 text-base">
                  72 hours from completed intake. Once you submit your information, we deliver your full holiday affiliate sales system within three business days.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  What if I don't have an affiliate program yet?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/90 text-base">
                  We will guide you on the simplest path to get started. Our system works with any affiliate platform or can help you choose the right one for your brand.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  Will I need to create content?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/90 text-base">
                  No, we handle the structure and creator assets. You provide product information and brand details — we build everything your affiliates need to create content and drive sales.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  Can my team use the system internally?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/90 text-base">
                  Yes, it's yours permanently. You can share it with your team, use it for your own content creation, and adapt it as your business grows.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 px-4 bg-background">
          <div className="container max-w-5xl mx-auto">
            <NewsletterSignup 
              source="holiday-explained"
              title="Get Strategic Insights for Your Brand"
              description="Join brand founders receiving weekly insights on affiliate marketing, holiday strategies, and scaling affiliate revenue."
            />
          </div>
        </section>

        {/* Work With Us for Content Creation Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-teal/5">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Work With Us for Content Creation
            </h2>
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed max-w-3xl mx-auto">
              Need premium content to promote your products? Phresh Phactory, Inc. creates high-quality product videos, UGC-style reels, and branded content your team can use across your channels to increase visibility and conversions.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="outline" className="px-8">
                <Link to="/brands">
                  Explore Content Production Services
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-32 px-4 bg-gradient-to-br from-tertiary/10 via-background to-teal/10">
          <div className="container max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
              Holiday sales do not happen by accident.<br />They happen because affiliates have a system.
            </h2>
            
            <p className="text-xl md:text-2xl text-foreground/90 font-light">
              Let us build yours — fast.
            </p>
            
            <p className="text-lg md:text-xl text-foreground/80 mt-8">
              Want a year-round affiliate system, not just a holiday sprint?<br />
              <Link to="/affiliate-sales-blueprint" className="text-primary hover:text-primary/80 underline font-semibold">
                Explore The Evergreen Affiliate Sales Blueprint™
              </Link>
            </p>
            
            <div className="pt-6">
              <Button
                onClick={handleCTAClick}
                size="lg"
                className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Start Your Holiday Sprint
              </Button>
            </div>
          </div>
        </section>
      </div>

      <EmailCaptureModal 
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSuccess={handleEmailSuccess}
      />
    </>
  );
};

export default HolidaySprintExplained;
