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
                Your Holiday Affiliate Sales System — Built in 72 Hours
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 max-w-4xl mx-auto font-light leading-relaxed">
                A complete, plug-and-play affiliate sales system created for your brand in just 72 hours — so your creators know exactly what to say, what to post, and where to send buyers this holiday season.
              </p>
              
              <div className="pt-6">
                <Button
                  onClick={handleCTAClick}
                  size="lg"
                  className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Start Your Holiday Sprint
                </Button>
                <p className="text-sm text-foreground/70 mt-3">
                  The 72-hour timer starts once your intake form is submitted.
                </p>
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

        {/* Is This for You? Section */}
        <section className="py-20 px-4">
          <div className="container max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-12 text-center">
              Is This for You?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Perfect for you if */}
              <div className="bg-card border-2 border-tertiary/30 p-8 rounded-lg">
                <h3 className="text-2xl font-heading font-bold mb-6 text-tertiary">Perfect for you if:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-tertiary flex-shrink-0 mt-1" />
                    <span className="text-foreground/90">You sell physical products online (beauty, CPG, lifestyle, wellness, apparel, etc.)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-tertiary flex-shrink-0 mt-1" />
                    <span className="text-foreground/90">You have at least one product with healthy margins</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-tertiary flex-shrink-0 mt-1" />
                    <span className="text-foreground/90">You have an affiliate program already OR want to set one up quickly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-tertiary flex-shrink-0 mt-1" />
                    <span className="text-foreground/90">You want a clean, done-for-you holiday system your affiliates can use immediately</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-tertiary flex-shrink-0 mt-1" />
                    <span className="text-foreground/90">You don't have time to train creators or build assets during Q4</span>
                  </li>
                </ul>
              </div>

              {/* Not a good fit if */}
              <div className="bg-card border-2 border-rust/30 p-8 rounded-lg">
                <h3 className="text-2xl font-heading font-bold mb-6 text-rust">Not a good fit if:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rust/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-rust text-lg font-bold">×</span>
                    </span>
                    <span className="text-foreground/90">You do not sell a physical product</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rust/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-rust text-lg font-bold">×</span>
                    </span>
                    <span className="text-foreground/90">You do not have a product page or basic brand assets</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rust/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-rust text-lg font-bold">×</span>
                    </span>
                    <span className="text-foreground/90">You cannot provide affiliate links or tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rust/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-rust text-lg font-bold">×</span>
                    </span>
                    <span className="text-foreground/90">You are not prepared to approve your 3 hero products</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Compatible With These Affiliate Platforms Section */}
        <section className="py-20 px-4">
          <div className="container max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-12 text-center">
              Compatible With These Affiliate Platforms
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-foreground/90 mb-8 text-center">
                Our systems work seamlessly across the most widely used affiliate platforms for product-based brands, including:
              </p>
              
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0"></div>
                    <span className="text-foreground/90">Shopify Affiliate & Referral Programs</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0"></div>
                    <span className="text-foreground/90">Impact</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0"></div>
                    <span className="text-foreground/90">CJ Affiliate (Commission Junction)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0"></div>
                    <span className="text-foreground/90">ShareASale</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0"></div>
                    <span className="text-foreground/90">Refersion</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0"></div>
                    <span className="text-foreground/90">UpPromote (Shopify)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0"></div>
                    <span className="text-foreground/90">GoAffPro</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0"></div>
                    <span className="text-foreground/90">Awin</span>
                  </li>
                </ul>
                
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0"></div>
                    <span className="text-foreground/90">Rakuten Advertising</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0"></div>
                    <span className="text-foreground/90">Amazon Associates</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0"></div>
                    <span className="text-foreground/90">Pepperjam</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0"></div>
                    <span className="text-foreground/90">Skimlinks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0"></div>
                    <span className="text-foreground/90">LTK (LIKEtoKNOW.it)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0"></div>
                    <span className="text-foreground/90">ShopStyle Collective</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0"></div>
                    <span className="text-foreground/90">CashBlack</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0"></div>
                    <span className="text-foreground/90">Afrofiliate</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-center text-lg text-foreground/80 italic">
                Your brand can use any affiliate platform — the systems we build are platform-agnostic and fully adaptable.
              </p>
            </div>
          </div>
        </section>

        {/* How the 72-Hour Sprint Works */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-12 text-center">
              How the 72-Hour Sprint Works
            </h2>
            
            <div className="space-y-6">
              {/* Day 0 */}
              <div className="bg-card border-2 border-primary/30 p-8 rounded-lg">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-primary">0</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold mb-3">Day 0 — You Submit the Intake Form</h3>
                    <p className="text-foreground/90 text-lg">
                      You share brand details, product links, your affiliate platform, margins, and any product assets.
                    </p>
                  </div>
                </div>
              </div>

              {/* Day 1 */}
              <div className="bg-card border-2 border-tertiary/30 p-8 rounded-lg">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-tertiary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-tertiary">1</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold mb-3">Day 1 — Strategy & Product Focus</h3>
                    <p className="text-foreground/90 text-lg">
                      We select your 3 high-earning holiday hero products and define the angles your creators will use to sell them.
                    </p>
                  </div>
                </div>
              </div>

              {/* Day 2 */}
              <div className="bg-card border-2 border-teal/30 p-8 rounded-lg">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-teal">2</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold mb-3">Day 2 — Asset Build</h3>
                    <p className="text-foreground/90 text-lg">
                      We create your creator brief, holiday talking points, content kit, B-roll guidance, and your affiliate link map.
                    </p>
                  </div>
                </div>
              </div>

              {/* Day 3 */}
              <div className="bg-card border-2 border-rust/30 p-8 rounded-lg">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-rust/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-rust">3</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold mb-3">Day 3 — Delivery</h3>
                    <p className="text-foreground/90 text-lg mb-3">
                      You receive your full Holiday Affiliate Sales System PDF package, plus all assets ready to send to your affiliates immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-foreground/80 mt-8 text-lg">
              <strong>Note:</strong> The 72-hour window begins once all required assets are received.
            </p>
          </div>
        </section>

        {/* What You Get in Your Holiday Affiliate Sales System */}
        <section className="py-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-6 text-center">
              What You Get in Your Holiday Affiliate Sales System
            </h2>
            
            <p className="text-xl text-center text-foreground/90 max-w-3xl mx-auto mb-16">
              A complete, done-for-you package with everything your affiliates need to start selling immediately.
            </p>

            <div className="space-y-6">
              <div className="bg-card border border-border p-6 rounded-lg flex items-start gap-4">
                <Check className="w-6 h-6 text-tertiary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Holiday Product Focus Strategy</h3>
                  <p className="text-foreground/80">Your 3 hero products chosen for maximum earning potential</p>
                </div>
              </div>

              <div className="bg-card border border-border p-6 rounded-lg flex items-start gap-4">
                <Check className="w-6 h-6 text-teal flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Creator Brief</h3>
                  <p className="text-foreground/80">What to say, what to highlight, who it's for</p>
                </div>
              </div>

              <div className="bg-card border border-border p-6 rounded-lg flex items-start gap-4">
                <Check className="w-6 h-6 text-rust flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Holiday Talking Points & Scripts</h3>
                  <p className="text-foreground/80">Copy/paste messaging for affiliates</p>
                </div>
              </div>

              <div className="bg-card border border-border p-6 rounded-lg flex items-start gap-4">
                <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Content Kit</h3>
                  <p className="text-foreground/80">Stills, mockups, angles, and positioning statements</p>
                </div>
              </div>

              <div className="bg-card border border-border p-6 rounded-lg flex items-start gap-4">
                <Check className="w-6 h-6 text-tertiary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Holiday Sales Angles + B-Roll Guidance</h3>
                  <p className="text-foreground/80">Visual direction for creator content</p>
                </div>
              </div>

              <div className="bg-card border border-border p-6 rounded-lg flex items-start gap-4">
                <Check className="w-6 h-6 text-teal flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Affiliate Link Map with Deep Links</h3>
                  <p className="text-foreground/80">Organized, ready-to-use affiliate links</p>
                </div>
              </div>

              <div className="bg-card border border-border p-6 rounded-lg flex items-start gap-4">
                <Check className="w-6 h-6 text-rust flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Rollout Checklist</h3>
                  <p className="text-foreground/80">For your internal team & affiliates</p>
                </div>
              </div>

              <div className="bg-card border-2 border-primary/30 p-6 rounded-lg flex items-start gap-4">
                <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">One Master PDF: Your Holiday Affiliate Sales System</h3>
                  <p className="text-foreground/80">Presentation-ready + easy to distribute</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Revenue Impact */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-12 text-center">
              The Revenue Impact
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-card border-2 border-primary/30 p-8 md:p-10 rounded-lg mb-8">
                <h3 className="text-2xl font-heading font-bold mb-4">
                  What a Holiday Sprint Can Do for Your Revenue:
                </h3>
                <p className="text-lg text-foreground/90 mb-6">
                  Your affiliates can only sell what they clearly understand. With a plug-and-play system, holiday conversions rise dramatically because creators have exactly what they need.
                </p>

                <div className="bg-tertiary/10 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-tertiary">Example Holiday Scenario:</h4>
                  <p className="text-foreground/90 leading-relaxed">
                    20 engaged affiliates × 3 holiday posts each × 2% conversion × $75 average order value
                  </p>
                  <p className="text-2xl font-bold mt-4 text-primary">
                    = ~9% boost in Q4 revenue
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    (based on creator activation averages)
                  </p>
                </div>
              </div>

              <p className="text-center text-sm text-foreground/70">
                <strong>Disclaimer:</strong> Actual results vary based on audience size, product pricing, and existing conversion rates.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-4 bg-background">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-12 text-center">
              Investment
            </h2>
            
            <div className="bg-card border-4 border-primary p-10 md:p-14 rounded-lg shadow-2xl max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-6xl md:text-7xl font-heading font-bold text-primary mb-4">
                  $5,000
                </p>
                <p className="text-2xl font-semibold mb-6">
                  The Holiday Affiliate Sales Sprint™
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Includes:</h3>
                <p className="text-foreground/90 leading-relaxed">
                  A complete 72-hour build of your full affiliate sales system — hero product selection, talking points, scripts, deep link map, content kit, creator brief, holiday angles, and the master PDF system.
                </p>
              </div>
              
              <div className="mb-8 p-6 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Payment Options:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Pay in full: $5,000</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>Split-Pay: $2,750 × 2 months</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-center pt-4 pb-6 px-4">
                <p className="text-sm text-foreground/70 italic">
                  If your system is not fully usable by your affiliates, we will revise it until it is.
                </p>
              </div>
              
              <div className="text-center">
                <Button
                  onClick={handleCTAClick}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-6"
                >
                  Start Your Holiday Sprint
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Mockups Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-12 text-center">
              What Your System Looks Like
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg border-2 border-border">
                <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-tertiary/10 rounded-lg mb-4 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm px-4 text-center">Master PDF Preview</p>
                </div>
                <h3 className="font-semibold text-lg text-center">Complete System PDF</h3>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Everything in one organized document
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border-2 border-border">
                <div className="aspect-[3/4] bg-gradient-to-br from-teal/10 to-primary/10 rounded-lg mb-4 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm px-4 text-center">Creator Brief Sample</p>
                </div>
                <h3 className="font-semibold text-lg text-center">Creator Briefs</h3>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Clear instructions for your affiliates
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border-2 border-border">
                <div className="aspect-[3/4] bg-gradient-to-br from-rust/10 to-teal/10 rounded-lg mb-4 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm px-4 text-center">Link Map Example</p>
                </div>
                <h3 className="font-semibold text-lg text-center">Affiliate Link Map</h3>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Organized tracking for every product
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mid-Page CTA */}
        <section className="py-16 px-4">
          <div className="container max-w-3xl mx-auto text-center">
            <Button
              onClick={handleCTAClick}
              size="lg"
              className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Start Your Holiday Sprint
            </Button>
            <p className="text-sm text-foreground/70 mt-3">
              Takes 7 minutes. No meetings. No calls.
            </p>
          </div>
        </section>

        {/* What Happens After You Book */}
        <section className="py-20 px-4 bg-gradient-to-br from-teal/5 via-background to-primary/5">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-12 text-center">
              What Happens After You Book
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Complete the 7-minute intake form.</h3>
                  <p className="text-foreground/90">
                    Provide your brand details, product information, and affiliate links.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold text-xl">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Select your Sprint Start Date.</h3>
                  <p className="text-foreground/90">
                    Choose when you want your 72-hour build to begin.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold text-xl">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Your 72-hour build begins once assets are submitted.</h3>
                  <p className="text-foreground/90">
                    We immediately start creating your complete affiliate sales system.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold text-xl">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">We create your full system and deliver:</h3>
                  <ul className="space-y-2 mt-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>1 Master PDF</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>1 Organized Asset Folder (scripts, talking points, link map, content kit)</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold text-xl">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">You send it to affiliates immediately.</h3>
                  <p className="text-foreground/90">
                    No calls. No meetings. Everything is ready to use.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto">
            <div className="bg-card border-2 border-primary/30 p-8 md:p-12 rounded-lg shadow-lg">
              <div className="mb-6">
                <svg className="w-12 h-12 text-primary mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <blockquote className="text-lg md:text-xl text-center text-foreground/90 mb-8 leading-relaxed">
                "Working with Kiera has been transformational to me and my business on a personal and professional level. In addition to the improved communication and organisation skills we now posses, the processes and systems we've built together and put in place have proved invaluable to the growth and sustainability in everything we do. We can see a tangible and measurable difference in before working with Kiera to where we are now and I would highly recommend her to everyone."
              </blockquote>
              <div className="text-center">
                <p className="font-semibold text-foreground text-lg">Matthew Addai</p>
                <p className="text-muted-foreground">Co-Founder & CEO, Afrofiliate / Cashblack</p>
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

        {/* Scarcity / Urgency Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-rust/5 via-background to-primary/5">
          <div className="container max-w-4xl mx-auto">
            <div className="bg-card border-2 border-rust/30 p-10 md:p-12 rounded-lg text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Holiday Sprint Availability
              </h2>
              <p className="text-xl text-foreground/90 mb-6 leading-relaxed">
                Limited to <strong className="text-rust">15 Holiday Sprints</strong> this season. First come, first served.
              </p>
              <p className="text-xl text-foreground/90 mb-6 leading-relaxed">
                To protect quality, we're accepting a limited number of Holiday Sprints this season. Once the calendar is full, the offer closes until next year.
              </p>
              <div className="bg-rust/10 p-6 rounded-lg mb-4">
                <p className="text-2xl font-bold text-rust mb-2">
                  Holiday 2025 Cutoff Date: December 10 (11:59 PM EST)
                </p>
                <p className="text-foreground/80">
                  (Ensures full delivery before the final holiday sales window.)
                </p>
              </div>
              <p className="text-lg text-foreground/80">
                <strong>Note:</strong> Holiday Sprints must be booked before the final seasonal cutoff date to ensure delivery before the holiday sales window.
              </p>
            </div>
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
              If you want your affiliates selling for you this holiday season — this is the system they need.
            </h2>
            
            <p className="text-xl md:text-2xl text-foreground/90 font-light">
              Click below to reserve your 72-Hour Holiday Sprint.
            </p>
            
            <div className="pt-6">
              <Button
                onClick={handleCTAClick}
                size="lg"
                className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Start Your Holiday Sprint
              </Button>
              <p className="text-sm text-foreground/70 mt-3">
                Takes 7 minutes. No meetings. No calls.
              </p>
            </div>

            <p className="text-lg md:text-xl text-foreground/80 mt-12 pt-8 border-t border-border">
              Want a year-round affiliate system, not just a holiday sprint?<br />
              <Link to="/affiliate-sales-blueprint" className="text-primary hover:text-primary/80 underline font-semibold">
                Explore The Evergreen Affiliate Sales Blueprint™
              </Link>
            </p>
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
