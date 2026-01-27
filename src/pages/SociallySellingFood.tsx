import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, Check, Calendar, Clock } from 'lucide-react';
import ssfHeroBanner from '@/assets/ssf-hero-banner.png';
import kieraHeadshot from '@/assets/kiera-headshot.png';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(1, 'Name is required'),
  businessName: z.string().min(1, 'Business name is required'),
  businessWebsite: z.string().min(1, 'Business website or EatOkra profile is required'),
  googleEmail: z.string().email('Please enter a valid Gmail address').refine(
    (email) => email.endsWith('@gmail.com'),
    'Must be a @gmail.com address for Google Classroom access'
  ),
});

type FormValues = z.infer<typeof formSchema>;

const SociallySellingFood = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      businessName: '',
      businessWebsite: '',
      googleEmail: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const { error: dbError } = await supabase
        .from('socially_selling_food_enrollments')
        .insert({
          email: data.email,
          name: data.name,
          business_name: data.businessName,
          business_city_state: 'N/A',
          business_website: data.businessWebsite,
          google_email: data.googleEmail,
          selected_sessions: ['ai101'],
          confidence_level: 5,
          accommodations: null,
          total_amount: 0,
          payment_status: 'free',
        });

      if (dbError) throw dbError;

      // Send notification email to admin (non-blocking)
      supabase.functions.invoke('send-ssf-enrollment-notification', {
        body: {
          email: data.email,
          name: data.name,
          businessName: data.businessName,
          businessCityState: 'N/A',
          businessWebsite: data.businessWebsite,
          googleEmail: data.googleEmail,
          selectedSessions: ['ai101'],
          confidenceLevel: 5,
          totalAmount: 0,
        },
      }).catch(err => console.error('Notification email failed:', err));

      toast({
        title: 'Registration confirmed',
        description: 'You are registered for the free AI 101 prep session. Check your email for details.',
      });

      form.reset();
    } catch (error: any) {
      console.error('Enrollment error:', error);
      toast({
        title: 'Registration failed',
        description: error.message || 'Please try again or contact info@phreshphactory.co',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Socially Selling Food | Free AI 101 Workshop for Food-Related Businesses"
        description="Register for the free AI 101 prep session. A hands-on working lab that helps restaurants, food trucks, caterers, private chefs, and food-related businesses learn to build sellable offers for 24/7 online revenue."
        keywords="food business e-commerce, restaurant online sales, food truck digital revenue, catering business systems, sell food online, 24/7 food sales, food business workshop, free AI workshop, food business AI"
        canonicalUrl="https://phreshphactory.com/socially-selling-food"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "Socially Selling Food: AI 101 Prep Session",
          "description": "A free hands-on prep session that introduces food-related businesses to the AI tools used in the Socially Selling Food program.",
          "provider": {
            "@type": "Organization",
            "name": "Phresh Phactory",
            "sameAs": "https://phreshphactory.com"
          },
          "instructor": {
            "@type": "Person",
            "name": "Kiera H.",
            "jobTitle": "Strategic Advisor"
          },
          "courseMode": "online",
          "isAccessibleForFree": true,
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-tertiary/10 via-muted/30 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <img 
              src={ssfHeroBanner} 
              alt="Socially Selling Food - Starting February 3, 2026 - Hosted by Kiera H." 
              className="w-full max-w-3xl mx-auto mb-8 rounded-lg"
            />
            
            {/* Who + Outcome */}
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Sell Beyond Your Operating Hours
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              A hands-on lab for restaurants, food trucks, caterers, chefs, and food-related businesses to build offers that generate revenue 24/7.
            </p>
            
            {/* Single Primary CTA */}
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="text-lg px-8 py-6 h-auto bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
            >
              Register for Free AI 101
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            {/* Microcopy beneath CTA */}
            <p className="text-sm text-muted-foreground mt-4">
              Free prep session · Feb 3, 2026 · 2:30 PM ET
            </p>
            
            {/* Trust element */}
            <p className="text-sm text-muted-foreground mt-6 max-w-xl mx-auto">
              Led by <span className="text-foreground font-medium">Kiera H.</span>, 20+ years helping food-related businesses modernize operations and build digital revenue.
            </p>
          </div>
        </section>

        {/* Problem → Solution */}
        <section className="py-10 md:py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              The Problem: <span className="text-tertiary">You Only Earn When Open</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Food-related businesses earn revenue only during operating hours. Every hour you are closed is income you will never recover.
              </p>
              <p>
                E-commerce brands operate differently. They sell around the clock while their owners sleep, travel, or focus on other things.
              </p>
              <p className="text-foreground font-medium">
                The solution: zero-cost revenue. Income streams that require no additional food, labor, or overhead.
              </p>
            </div>
          </div>
        </section>

        {/* What Makes This Different */}
        <section className="py-10 md:py-14 px-4 bg-tertiary/5 border-y border-tertiary/20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              This Is Not a Marketing Class
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                You will not leave with ideas. You will leave with finished, sellable assets:
              </p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {[
                  'Pre-orders that capture demand before you cook',
                  'Digital products like recipe guides or meal plans',
                  'Limited-time drops that create urgency',
                  'Live systems that sell while you sleep',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 p-3 bg-card rounded-lg border border-tertiary/20">
                    <Check className="h-5 w-5 text-tertiary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Start Here: Free AI 101 */}
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="p-6 md:p-8 border-2 border-tertiary rounded-xl bg-tertiary/5">
              <div className="inline-block bg-tertiary text-tertiary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                START HERE
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Free AI 101 Prep Session
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Get set up with the AI tools you will use throughout the program. This session prepares you for the hands-on work ahead and helps you decide if the full program is right for you.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-5 w-5 text-tertiary" />
                  <span>Tuesday, February 3, 2026</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5 text-tertiary" />
                  <span>2:30 PM Eastern</span>
                </div>
              </div>
              <Button 
                size="lg"
                onClick={scrollToForm}
                className="text-lg px-8 py-6 h-auto bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
              >
                Register for Free AI 101
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-12 md:py-16 px-4 bg-muted/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Who This Is For
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {['Restaurants', 'Food Trucks', 'Caterers', 'Private Chefs', 'Home Chefs'].map((type) => (
                <div key={type} className="px-5 py-2.5 bg-card border-2 border-tertiary/30 rounded-full text-base font-medium text-foreground">
                  {type}
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-lg">
              If you sell food and want to sell more of it beyond your physical location and operating hours, this lab is for you.
            </p>
          </div>
        </section>

        {/* Your Starting Point - Linear Path */}
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Your Starting Point
            </h2>
            
            {/* Step 1 */}
            <div className="relative mb-8">
              <div className="flex gap-4 p-6 bg-tertiary/10 border-2 border-tertiary rounded-xl">
                <div className="flex-shrink-0 w-10 h-10 bg-tertiary text-tertiary-foreground rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Attend the Free AI 101 Prep Session</h3>
                  <p className="text-muted-foreground">
                    Get set up with the AI tools you will use throughout the program. This session prepares you for the hands-on work ahead and helps you decide if continuing is right for you.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-tertiary" />
                      <span>Feb 3, 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-tertiary" />
                      <span>2:30 PM ET</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Connector line */}
              <div className="absolute left-9 top-full h-8 w-0.5 bg-border"></div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 p-6 bg-muted/50 border border-border rounded-xl">
              <div className="flex-shrink-0 w-10 h-10 bg-muted text-muted-foreground rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">Decide Whether to Continue</h3>
                <p className="text-muted-foreground mb-4">
                  After AI 101, attendees will be invited to continue into a 4-session working lab focused on building and launching sellable offers.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-muted-foreground" />
                    <span>Package what you sell into digital offers</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-muted-foreground" />
                    <span>Build conversion-ready video content</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-muted-foreground" />
                    <span>Create timely, sellable promotional drops</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-muted-foreground" />
                    <span>Prepare systems that sell 24/7</span>
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-4 italic">
                  Full program details shared during AI 101. No commitment required to attend the free session.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section ref={formRef} className="py-12 md:py-16 px-4 bg-tertiary/5 border-y border-tertiary/20">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Register for Free AI 101
              </h2>
              <p className="text-muted-foreground">
                Tuesday, February 3, 2026 at 2:30 PM Eastern
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              {/* Framing line above form */}
              <p className="text-sm text-center text-muted-foreground mb-6 pb-4 border-b border-border">
                This registration is for the free AI 101 prep session only.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your business name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="businessWebsite"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Website or EatOkra Profile</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="googleEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.name@gmail.com" {...field} />
                        </FormControl>
                        <p className="text-xs text-muted-foreground mt-1">
                          For Google Classroom access. Must be a @gmail.com address.
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg py-6 h-auto bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Registering...' : 'Register for Free AI 101'}
                  </Button>

                  {/* Reassurance line below button */}
                  <p className="text-sm text-center text-muted-foreground pt-2">
                    No payment required. You will decide whether to continue after the session.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </section>

        {/* What Happens After */}
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              What Happens After the Lab
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                After the lab, you leave with real offers that can be purchased online. Once your food business creates a sellable offer with an online checkout, that offer becomes distributable.
              </p>
              <p>
                Affiliates, creators, and partners can discover and choose to sell your offers through the platforms hosting the purchase.
              </p>
              <p className="text-foreground font-medium">
                Without a sellable offer, there is no distribution. Having a sell-ready offer is what enables any distribution relationship to exist.
              </p>
            </div>
          </div>
        </section>

        {/* Meet the Instructor */}
        <section className="py-12 px-4 bg-secondary/30">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Meet the Instructor</h2>
            <div className="flex justify-center">
              <img 
                src={kieraHeadshot} 
                alt="Kiera H. - Strategic Advisor" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-tertiary shadow-lg shadow-tertiary/20"
              />
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kiera H. is a strategic advisor with 20+ years of experience helping food and consumer businesses modernize operations and build sustainable digital revenue streams.
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link to="/KieraH">
                Meet Kiera H. <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Your Business Can Sell While You Sleep
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start with the free AI 101 prep session. See if this is right for you.
            </p>
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="text-lg px-8 py-6 h-auto bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
            >
              Register for Free AI 101
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Questions about the workshop? Contact the instructor at <a href="mailto:kiera@phreshphactory.co" className="underline hover:text-foreground">kiera@phreshphactory.co</a>
            </p>
            <p className="text-sm text-muted-foreground">
              © 2026 Phresh Phactory. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SociallySellingFood;
