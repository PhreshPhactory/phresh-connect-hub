import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { Check } from "lucide-react";

const HolidaySprintExplained = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead
        title="THE HOLIDAY AFFILIATE SALES SPRINT™ - Phresh Phactory"
        description="A 3-day, done-with-you accelerator that builds the affiliate sales system your brand needs to move products before the holiday window closes."
        keywords="holiday affiliate sales, affiliate marketing sprint, Q4 sales accelerator, affiliate content creation, brand partnership"
        canonicalUrl="https://phreshphactory.com/holiday-explained"
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-20 md:pt-32 pb-12 md:pb-16 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-tertiary/5 via-background to-teal/5" />
          
          <div className="container max-w-5xl mx-auto relative z-10">
            <div className="text-center space-y-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight">
                THE HOLIDAY AFFILIATE<br />SALES SPRINT™
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 max-w-4xl mx-auto font-light leading-relaxed">
                A 3-day, done-with-you accelerator that builds the affiliate sales system your brand needs to move products before the holiday window closes.
              </p>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                This sprint is for brands who need results fast — not just a link.
              </p>
              
              <div className="pt-6 flex flex-col items-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Link to="/holiday">Apply Now</Link>
                </Button>
                <p className="text-sm text-muted-foreground italic">
                  Limited holiday enrollment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="pt-12 pb-20 px-4 bg-muted/30">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-8 text-center">
              Most affiliate programs fail because affiliates don't get what they need to actually sell.
            </h2>
            
            <div className="prose prose-lg md:prose-xl max-w-none space-y-6 text-foreground/90">
              <p>
                Affiliates can't drive sales if they're sent into Q4 empty-handed.<br />
                They need messaging. Assets. Talking points. Scripts. Content.
              </p>
              
              <p>
                Most brands never give them these tools — and then assume affiliates "don't work."
              </p>
              
              <p className="font-medium text-foreground">
                The truth is simple:<br />
                Affiliates WANT to sell your products — but no one has given them what to say or share.
              </p>
              
              <p className="text-xl font-semibold text-foreground">
                The Holiday Affiliate Sales Sprint solves this in 72 hours.
              </p>
            </div>
          </div>
        </section>

        {/* 3 Hero Products Framework */}
        <section className="py-20 px-4">
          <div className="container max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-12 text-center">
              We streamline your brand into three products that convert best.
            </h2>
            
            <p className="text-lg md:text-xl text-foreground/90 mb-12 text-center max-w-3xl mx-auto">
              Instead of overwhelming affiliates with your entire catalog, the sprint helps your brand choose the three products most likely to sell RIGHT NOW:
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Product 1 */}
              <div className="bg-card border border-border p-8 rounded-lg space-y-4">
                <div className="w-12 h-12 rounded-full bg-tertiary/20 flex items-center justify-center text-2xl font-bold text-tertiary">
                  1
                </div>
                <h3 className="text-2xl font-heading font-semibold">
                  Highest-Margin Product
                </h3>
                <p className="text-muted-foreground text-sm uppercase tracking-wide">
                  Your Profit Driver
                </p>
                <p className="text-foreground/90">
                  The product that makes you the most per sale.<br />
                  Great for affiliate boosts + holiday promos.
                </p>
              </div>

              {/* Product 2 */}
              <div className="bg-card border border-border p-8 rounded-lg space-y-4">
                <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center text-2xl font-bold text-teal">
                  2
                </div>
                <h3 className="text-2xl font-heading font-semibold">
                  Best-Selling Product
                </h3>
                <p className="text-muted-foreground text-sm uppercase tracking-wide">
                  Your Fastest Converter
                </p>
                <p className="text-foreground/90">
                  Your proven winner — the product audiences already want.<br />
                  Perfect for quick results and easy affiliate content.
                </p>
              </div>

              {/* Product 3 */}
              <div className="bg-card border border-border p-8 rounded-lg space-y-4">
                <div className="w-12 h-12 rounded-full bg-rust/20 flex items-center justify-center text-2xl font-bold text-rust">
                  3
                </div>
                <h3 className="text-2xl font-heading font-semibold">
                  Seasonal or Holiday Product
                </h3>
                <p className="text-muted-foreground text-sm uppercase tracking-wide">
                  Your Urgency Driver
                </p>
                <p className="text-foreground/90">
                  A limited-edition item, seasonal collection, or giftable product.<br />
                  Affiliates love sharing what's timely + exclusive.
                </p>
              </div>
            </div>

            <div className="mt-12 space-y-4 text-center max-w-3xl mx-auto">
              <p className="text-lg text-foreground/90">
                These three products become the <strong>"Holiday Hero Trio"</strong> — the foundation of all the assets we build.
              </p>
              <p className="text-lg text-foreground/90">
                Affiliates don't need 50 SKUs.<br />
                <strong>They need three products they can confidently push.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* 3-Day Sprint Breakdown */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-12 text-center">
              In just 72 hours, your brand leaves with a complete affiliate sales system.
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Day 1 */}
              <div className="bg-card border-2 border-tertiary/30 p-8 rounded-lg space-y-6">
                <div>
                  <div className="inline-block px-4 py-2 bg-tertiary/20 rounded-full mb-4">
                    <span className="text-sm font-semibold uppercase tracking-wide text-tertiary-foreground">Day 1</span>
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    Strategy + Positioning
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-tertiary mt-0.5 flex-shrink-0" />
                    <span>Identify your three Hero Products</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-tertiary mt-0.5 flex-shrink-0" />
                    <span>Map your seasonal offer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-tertiary mt-0.5 flex-shrink-0" />
                    <span>Define brand messaging affiliates will use</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-tertiary mt-0.5 flex-shrink-0" />
                    <span>Review your affiliate setup or platform</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-tertiary mt-0.5 flex-shrink-0" />
                    <span>"Affiliate Sales Positioning Framework" session</span>
                  </li>
                </ul>
              </div>

              {/* Day 2 */}
              <div className="bg-card border-2 border-teal/30 p-8 rounded-lg space-y-6">
                <div>
                  <div className="inline-block px-4 py-2 bg-teal/20 rounded-full mb-4">
                    <span className="text-sm font-semibold uppercase tracking-wide text-teal-foreground">Day 2</span>
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    The Affiliate Asset Kit
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                    <span>Branded share-ready images</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                    <span>3–5 talking point templates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                    <span>Short & long scripts for affiliates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                    <span>Creator brief</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                    <span>Caption starters</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                    <span>Link placement guide</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                    <span>Holiday product positioning</span>
                  </li>
                </ul>
              </div>

              {/* Day 3 */}
              <div className="bg-card border-2 border-rust/30 p-8 rounded-lg space-y-6">
                <div>
                  <div className="inline-block px-4 py-2 bg-rust/20 rounded-full mb-4">
                    <span className="text-sm font-semibold uppercase tracking-wide text-rust-foreground">Day 3</span>
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    The Holiday Launch Plan
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-rust mt-0.5 flex-shrink-0" />
                    <span>7-day promo & posting plan</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-rust mt-0.5 flex-shrink-0" />
                    <span>Affiliate activation messages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-rust mt-0.5 flex-shrink-0" />
                    <span>Content distribution roadmap</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-rust mt-0.5 flex-shrink-0" />
                    <span>Step-by-step instructions for keeping affiliates engaged</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-rust mt-0.5 flex-shrink-0" />
                    <span>Holiday offer rollout checklist</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-xl md:text-2xl font-semibold text-center mt-12 text-foreground">
              Affiliates won't post without content.<br />
              This sprint creates everything they need — fast.
            </p>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-12 text-center">
              Perfect for brands who need to move product this holiday season.
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg">
                <Check className="w-6 h-6 text-tertiary flex-shrink-0 mt-1" />
                <span className="text-lg">Brands on Afrofiliate or any affiliate platform</span>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg">
                <Check className="w-6 h-6 text-tertiary flex-shrink-0 mt-1" />
                <span className="text-lg">Brands whose affiliates aren't posting</span>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg">
                <Check className="w-6 h-6 text-tertiary flex-shrink-0 mt-1" />
                <span className="text-lg">Founders without a marketing team</span>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg">
                <Check className="w-6 h-6 text-tertiary flex-shrink-0 mt-1" />
                <span className="text-lg">Businesses launching last-minute Q4 campaigns</span>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg">
                <Check className="w-6 h-6 text-tertiary flex-shrink-0 mt-1" />
                <span className="text-lg">Brands missing the internal capacity to make content</span>
              </div>
              
              <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-lg">
                <Check className="w-6 h-6 text-tertiary flex-shrink-0 mt-1" />
                <span className="text-lg">Anyone who wants real affiliate sales before December ends</span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-tertiary/5 via-background to-teal/5">
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

        {/* Why This Works */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-12 text-center">
              Why this sprint delivers results in days — not months.
            </h2>
            
            <div className="prose prose-lg md:prose-xl max-w-none space-y-6 text-foreground/90">
              <p>
                Most affiliate strategies rely on hope.<br />
                Hope affiliates post.<br />
                Hope affiliates know what to say.<br />
                Hope customers understand the offer.
              </p>
              
              <p className="text-xl font-bold text-foreground">
                Hope is not a system.
              </p>
              
              <p>
                This sprint works because it gives affiliates what they've been missing:<br />
                clarity, content, instructions, and a structured plan.
              </p>
              
              <p>
                Phresh Phactory works directly with Afrofiliate and understands exactly what affiliates need to convert.<br />
                This sprint was built from real-world affiliate behavior — not theory.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Teaser */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-8">
              A holiday-only offer for brands who want to make Q4 count.
            </h2>
            
            <p className="text-lg md:text-xl text-foreground/90 mb-10">
              Because this sprint involves hands-on work, enrollment is extremely limited.<br />
              Pricing will be shared upon application approval.
            </p>
            
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link to="/holiday">Apply Now</Link>
            </Button>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-32 px-4 bg-gradient-to-br from-teal/10 via-background to-tertiary/10">
          <div className="container max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold">
              Holiday sales aren't waiting — your affiliate system shouldn't either.
            </h2>
            
            <p className="text-xl md:text-2xl text-foreground/90">
              Apply now to secure your 3-day sprint slot.
            </p>
            
            <div className="pt-6 flex flex-col items-center gap-4">
              <Button
                asChild
                size="lg"
                className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link to="/holiday">Apply Now</Link>
              </Button>
              <p className="text-sm text-muted-foreground italic">
                Slots are extremely limited for the holiday season.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HolidaySprintExplained;
