
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SectionTitle from '@/components/SectionTitle';
import PricingCard from '@/components/PricingCard';
import CallToAction from '@/components/CallToAction';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SEOHead from '@/components/SEOHead';

const Packages = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  // Toggle between monthly and quarterly billing
  const handleBillingToggle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'quarterly' : 'monthly');
  };

  // Pricing plans
  const pricingPlans = [
    {
      title: 'Starter Audit',
      price: billingCycle === 'monthly' ? '$3,000' : '$3,000',
      period: 'one-time',
      description: 'A comprehensive assessment of your current operations with actionable recommendations.',
      features: [
        { text: 'Full operations audit' },
        { text: 'Gap analysis report' },
        { text: '90-day roadmap' },
        { text: '2 implementation sessions' },
        { text: 'Priority access to other services' }
      ]
    },
    {
      title: 'Fractional Exec',
      price: billingCycle === 'monthly' ? '$8,000' : '$21,600',
      period: billingCycle === 'monthly' ? '/month' : '/quarter',
      description: 'Ongoing operational leadership and hands-on implementation support.',
      features: [
        { text: 'Dedicated operations leader' },
        { text: 'Weekly strategic sessions' },
        { text: 'Systems implementation' },
        { text: 'Team management support' },
        { text: 'Unlimited email/chat access' }
      ],
      isPopular: true
    },
    {
      title: 'Board Advisor',
      price: billingCycle === 'monthly' ? '$1,500' : '$4,050',
      period: billingCycle === 'monthly' ? '/month' : '/quarter',
      description: 'Strategic guidance and accountability for established businesses.',
      features: [
        { text: 'Monthly advisory sessions' },
        { text: 'Quarterly strategy reviews' },
        { text: 'On-call support (5hrs/mo)' },
        { text: 'Network introductions' },
        { text: 'Growth planning' }
      ]
    },
    {
      title: 'Ops Metrics Kit',
      price: '$497',
      period: 'one-time',
      description: 'A plug-and-play dashboard to give you visibility into your operations: before you hire, scale, or make your next big move.',
      features: [
        { text: 'Plug-and-play dashboard (Google Sheets or Notion)' },
        { text: 'Weekly productivity + deliverables tracker' },
        { text: 'Project status snapshot (color-coded)' },
        { text: 'Hiring and contractor gap overview' },
        { text: 'Tool + software usage visibility' },
        { text: 'SOP development tracker' },
        { text: 'Optional: +$150 for 1:1 walkthrough and fix-it plan' }
      ],
      buttonText: 'Book Now'
    }
  ];

  const faqItems = [
    {
      question: "What's included in the Starter Audit?",
      answer: "The Starter Audit includes a comprehensive assessment of your current operations, identifying gaps and inefficiencies. You'll receive a detailed report with actionable recommendations and a 90-day roadmap for implementation. We also include two implementation sessions to help you get started."
    },
    {
      question: "Can I upgrade from one package to another?",
      answer: "Absolutely! Many clients start with a Starter Audit and then move to the Fractional Exec package for implementation support. We make the transition seamless and will apply any relevant credits from your current package."
    },
    {
      question: "Is there a minimum commitment period?",
      answer: "The Starter Audit is a one-time engagement. For Fractional Exec, we require a 3-month minimum commitment to ensure we have enough time to implement meaningful changes. The Board Advisor role requires a 6-month commitment."
    },
    {
      question: "What if I need additional services beyond my package?",
      answer: "We offer add-on services for all packages. These include additional implementation hours, specialized consultant sessions, team training workshops, and more. We'll provide transparent pricing for any add-ons before proceeding."
    },
    {
      question: "Do you offer refunds if I'm not satisfied?",
      answer: "We stand behind our work. If you're not satisfied with our services within the first 30 days, we'll work with you to address any concerns or offer a partial refund based on the work completed."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Packages | Business Transformation & Scalable Growth Plans"
        description="Explore Phresh Phactory's tailored packages for transformation, leadership, and talent, built to match your growth stage with simple, transparent pricing."
        keywords="Business Transformation Packages, Executive Leadership, Talent Solutions, Scalable Growth Plans"
        canonicalUrl="https://phreshphactory.com/packages"
      />
      {/* Hero Section */}
      <section className="bg-background py-16 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Simple, Transparent Pricing</h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Flexible packages designed to fit your business needs and growth stage.
            </p>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-4 sm:py-16 bg-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PricingCard
              title="Fractional Ops Leader"
              price="$8,000"
              period="/month"
              description="Ongoing operational leadership and hands-on implementation support."
              features={[
                { text: 'Dedicated operations leader' },
                { text: 'Weekly strategic sessions' },
                { text: 'Systems implementation' },
                { text: 'Team management support' },
                { text: 'Unlimited email/chat access' }
              ]}
              isPopular={true}
              buttonText="Get Started"
              buttonLink="/contact"
            />
            
            <PricingCard
              title="Advisory Board Program"
              price="$12,000"
              period="/quarter"
              description="Strategic guidance and accountability for established businesses."
              features={[
                { text: 'Monthly advisory sessions' },
                { text: 'Quarterly strategy reviews' },
                { text: 'On-call support (15hrs/quarter)' },
                { text: 'Network introductions' },
                { text: 'Growth planning' },
                { text: 'Board-level insights' }
              ]}
              buttonText="Learn More"
              buttonLink="/contact"
            />
            
            <PricingCard
              title="Ops Metrics Kit"
              price="$497"
              period="one-time"
              description="A plug-and-play dashboard to give you visibility into your operations: before you hire, scale, or make your next big move."
              features={[
                { text: 'Plug-and-play dashboard (Google Sheets or Notion)' },
                { text: 'Weekly productivity + deliverables tracker' },
                { text: 'Project status snapshot (color-coded)' },
                { text: 'Hiring and contractor gap overview' },
                { text: 'Tool + software usage visibility' },
                { text: 'SOP development tracker' },
                { text: 'Optional: +$150 for 1:1 walkthrough and fix-it plan' }
              ]}
              buttonText="Book Now"
              buttonLink="/contact"
            />
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-medium mb-6 text-foreground">Need a Custom Solution?</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We understand that every business has unique needs. Contact us to discuss a tailored package for your specific requirements.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">Contact for Custom Package</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our pricing and packages."
            center
          />
          
          <div className="max-w-4xl mx-auto mt-12">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <AccordionTrigger className="px-4 sm:px-8 py-6 text-left hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <span className="text-base sm:text-lg font-semibold text-foreground pr-4 leading-relaxed">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-8 pb-8 pt-0">
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      
      
      {/* CTA */}
      <CallToAction
        title="Ready to Get Started?"
        subtitle="Book a discovery call to discuss which package is right for your business."
        primaryButtonText="Book a Discovery Call"
        primaryButtonLink="http://calendly.com/PhreshPhactory"
        dark={true}
      />
    </div>
  );
};

export default Packages;
