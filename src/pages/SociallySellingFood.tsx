import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, Check, Calendar, Clock, MapPin } from 'lucide-react';
import ssfLogo from '@/assets/socially-selling-food-logo.png';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const CLASS_OPTIONS = [
  { id: 'ai101', label: 'AI 101 (Prep Session) – FREE – Tue. Feb. 3, 2026', price: 0, priceId: null },
  { id: 'session1', label: 'Session 1: Package What You Sell – $99 – Tue. Feb. 10, 2026', price: 99, priceId: 'price_1SsYPvQP580MvrLE8Xvac2Zh' },
  { id: 'session2', label: 'Session 2: Conversion-Ready Video – $99 – Tue. Feb. 17, 2026', price: 99, priceId: 'price_1SsYQiQP580MvrLEDiRA7jXl' },
  { id: 'session3', label: 'Session 3: Create Timely, Sellable Drops – $99 – Tue. Feb. 24, 2026', price: 99, priceId: 'price_1SsYR7QP580MvrLEBqTG3EAy' },
  { id: 'session4', label: 'Session 4: Prepare for Promotion – $99 – Tue. Mar. 3, 2026', price: 99, priceId: 'price_1SsYReQP580MvrLEH3PchosX' },
];

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().optional(),
  businessName: z.string().optional(),
  businessCityState: z.string().min(1, 'Business city and state is required'),
  businessWebsite: z.string().min(1, 'Business website or EatOkra profile is required'),
  googleEmail: z.string().email('Please enter a valid Gmail address').refine(
    (email) => email.endsWith('@gmail.com'),
    'Must be a @gmail.com address to access Google Classroom'
  ),
  selectedSessions: z.array(z.string()).min(1, 'Please select at least one session'),
  confidenceLevel: z.number().min(0).max(10),
  accommodations: z.string().optional(),
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
      businessCityState: '',
      businessWebsite: '',
      googleEmail: '',
      selectedSessions: ['ai101'],
      confidenceLevel: 5,
      accommodations: '',
    },
  });

  const selectedSessions = form.watch('selectedSessions');

  const calculateTotal = () => {
    return CLASS_OPTIONS.filter(
      (option) => selectedSessions.includes(option.id)
    ).reduce((sum, option) => sum + option.price, 0);
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const total = calculateTotal();
      const paidSessions = CLASS_OPTIONS.filter(
        (option) => data.selectedSessions.includes(option.id) && option.price > 0
      );

      const { error: dbError } = await supabase
        .from('socially_selling_food_enrollments')
        .insert({
          email: data.email,
          name: data.name || null,
          business_name: data.businessName || null,
          business_city_state: data.businessCityState,
          business_website: data.businessWebsite,
          google_email: data.googleEmail,
          selected_sessions: data.selectedSessions,
          confidence_level: data.confidenceLevel,
          accommodations: data.accommodations || null,
          total_amount: total * 100,
          payment_status: total > 0 ? 'pending' : 'free',
        });

      if (dbError) throw dbError;

      if (total > 0) {
        const priceIds = paidSessions.map((s) => s.priceId).filter(Boolean);
        
        const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke(
          'create-ssf-payment',
          {
            body: {
              priceIds,
              customerEmail: data.email,
              customerName: data.name || data.businessName || 'Participant',
            },
          }
        );

        if (checkoutError) throw checkoutError;

        if (checkoutData?.url) {
          window.open(checkoutData.url, '_blank');
          toast({
            title: 'Enrollment submitted',
            description: 'Complete your payment in the new tab.',
          });
        }
      } else {
        toast({
          title: 'Registration confirmed',
          description: 'You are registered for the free AI 101 session. Check your email for details.',
        });
      }

      form.reset();
    } catch (error: any) {
      console.error('Enrollment error:', error);
      toast({
        title: 'Registration failed',
        description: error.message || 'Please try again or contact kiera@eatokra.com',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Socially Selling Food | Sell 24/7 Like E-Commerce Brands"
        description="A hands-on working series that helps restaurants, food trucks, and caterers sell 24/7 using social selling, AI-powered content, and modern commerce tools."
        keywords="restaurant marketing, food business sales, social selling food, 24/7 sales, food truck marketing, catering business, AI for restaurants"
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <img 
              src={ssfLogo} 
              alt="Socially Selling Food with Kiera H." 
              className="w-64 md:w-80 mx-auto mb-10"
            />
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Restaurants should not stop making money when they close.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              A hands-on working series that helps food businesses sell 24/7.
            </p>
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="text-lg px-8 py-6 h-auto"
            >
              Register for Free AI 101
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-16 md:py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              The problem with how most food businesses operate
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Most restaurants, food trucks, and caterers only generate revenue during open hours. When the doors close, the register stops.
              </p>
              <p>
                Meanwhile, e-commerce brands sell around the clock — while their owners sleep, travel, or focus on other things.
              </p>
              <p className="text-foreground font-medium">
                In today's economy, limiting your sales to physical hours is leaving money on the table.
              </p>
            </div>
          </div>
        </section>

        {/* The Shift */}
        <section className="py-16 md:py-20 px-4 bg-muted/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              The shift: From open-hours only to modern commerce
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Socially Selling Food teaches food businesses how to operate like e-commerce brands — generating revenue through content, platforms, and digital assets.
              </p>
              <p>
                This is not a marketing class. This is not about growing followers or going viral.
              </p>
              <p className="text-foreground font-medium">
                This is a business model upgrade.
              </p>
              <p>
                You will learn to turn your menus, dishes, and experiences into sellable digital assets that work for you 24/7.
              </p>
            </div>
          </div>
        </section>

        {/* How the Program Works */}
        <section className="py-16 md:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
              How the program works
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border border-primary/20 rounded-xl bg-primary/5">
                <div className="inline-block bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  FREE
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">AI 101 Prep Session</h3>
                <p className="text-muted-foreground">
                  Get set up with the AI tools you will use throughout the series. No prior experience required.
                </p>
              </div>
              <div className="p-6 border border-border rounded-xl bg-card">
                <div className="inline-block bg-muted text-muted-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  4 WORKING SESSIONS
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Build Sellable Assets</h3>
                <p className="text-muted-foreground">
                  Four sessions where you create real, usable assets for your business. Not lectures — working sessions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Session Breakdown */}
        <section className="py-16 md:py-20 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
              Session breakdown
            </h2>
            <div className="space-y-6">
              {[
                {
                  number: 1,
                  title: 'Package What You Sell',
                  outcome: 'Turn your menu items into clear, sellable offers that work online.',
                },
                {
                  number: 2,
                  title: 'Build Conversion-Ready Video',
                  outcome: 'Create vertical video assets designed to drive sales, not just views.',
                },
                {
                  number: 3,
                  title: 'Create Timely, Sellable Drops',
                  outcome: 'Develop seasonal or limited-time offers that create urgency and revenue.',
                },
                {
                  number: 4,
                  title: 'Prepare for 24/7 Selling',
                  outcome: 'Set up your systems to sell while you sleep, travel, or focus elsewhere.',
                },
              ].map((session) => (
                <div key={session.number} className="flex gap-4 p-6 bg-card border border-border rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {session.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{session.title}</h3>
                    <p className="text-muted-foreground">{session.outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Leave With */}
        <section className="py-16 md:py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              What you leave with
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Clear, sellable offers packaged for digital platforms',
                'Vertical video assets ready to deploy',
                'Seasonal or limited-time drops that drive urgency',
                'Content that enables selling beyond walk-in traffic',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-16 md:py-20 px-4 bg-muted/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Who this is for
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['Restaurants', 'Food Trucks', 'Caterers'].map((type) => (
                <div key={type} className="px-6 py-3 bg-card border border-border rounded-full text-lg font-medium text-foreground">
                  {type}
                </div>
              ))}
            </div>
            <p className="mt-8 text-muted-foreground text-lg">
              If you sell food and want to sell more of it — beyond your physical location and operating hours — this series is for you.
            </p>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-16 md:py-20 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="p-8 bg-card border-2 border-primary/20 rounded-2xl text-center">
              <div className="inline-block bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                FREE INTRO SESSION
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                AI 101 Prep Session
              </h2>
              <div className="space-y-3 text-lg text-muted-foreground mb-8">
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Tuesday, February 3, 2026</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>2:30 PM Eastern</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>Virtual (Google Classroom)</span>
                </div>
              </div>
              <Button 
                size="lg" 
                onClick={scrollToForm}
                className="text-lg px-8 py-6 h-auto"
              >
                Register Now — It's Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section ref={formRef} className="py-16 md:py-20 px-4 bg-muted/30">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              Register for Socially Selling Food
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Start with the free AI 101 session. Add paid sessions if you want the full experience.
            </p>

            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full name" {...field} />
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
                  </div>

                  <FormField
                    control={form.control}
                    name="businessCityState"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business City, State *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Atlanta, GA" {...field} />
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
                        <FormLabel>Business Website or EatOkra Profile *</FormLabel>
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
                        <FormLabel>Google Email Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="your.name@gmail.com" {...field} />
                        </FormControl>
                        <p className="text-xs text-muted-foreground mt-1">
                          Must be @gmail.com for Google Classroom access
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="selectedSessions"
                    render={() => (
                      <FormItem>
                        <FormLabel>Select your sessions *</FormLabel>
                        <div className="space-y-3 mt-2">
                          {CLASS_OPTIONS.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="selectedSessions"
                              render={({ field }) => (
                                <FormItem className="flex items-start space-x-3 space-y-0 p-3 bg-muted/50 rounded-lg">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, option.id])
                                          : field.onChange(
                                              field.value?.filter((value) => value !== option.id)
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <Label className="font-normal text-sm cursor-pointer leading-relaxed">
                                    {option.label}
                                  </Label>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confidenceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Confidence level for completing the workload (0-10)
                        </FormLabel>
                        <div className="pt-2">
                          <FormControl>
                            <Slider
                              min={0}
                              max={10}
                              step={1}
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                              className="w-full"
                            />
                          </FormControl>
                          <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>Not confident</span>
                            <span className="font-semibold text-foreground text-base">{field.value}</span>
                            <span>Very confident</span>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="accommodations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accommodations or notes (optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any accommodations needed or additional information..."
                            className="resize-none"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {calculateTotal() > 0 && (
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-lg font-semibold text-foreground">
                        Total: ${calculateTotal()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        You will be redirected to complete payment after registration.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg py-6 h-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Registering...' : calculateTotal() > 0 ? 'Register & Continue to Payment' : 'Register for Free'}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Your business can sell while you sleep.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the free AI 101 session and see how Socially Selling Food can change the way your business operates.
            </p>
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="text-lg px-8 py-6 h-auto"
            >
              Register Now — It's Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="py-8 px-4 border-t border-border">
          <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
            <p>Questions? Contact <a href="mailto:kiera@eatokra.com" className="underline hover:text-foreground">kiera@eatokra.com</a></p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SociallySellingFood;
