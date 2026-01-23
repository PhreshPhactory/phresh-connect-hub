import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, Check, Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import ssfLogo from '@/assets/socially-selling-food-logo.png';
import kieraHeadshot from '@/assets/kiera-headshot.png';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const ALL_SESSIONS = [
  { id: 'ai101', label: 'AI 101 (Prep Session)', date: 'Tue. Feb. 3', price: 0, priceId: null },
  { id: 'session1', label: 'Package What You Sell', date: 'Tue. Feb. 10', price: 99, priceId: 'price_1SsYPvQP580MvrLE8Xvac2Zh' },
  { id: 'session2', label: 'Conversion-Ready Video', date: 'Tue. Feb. 17', price: 99, priceId: 'price_1SsYQiQP580MvrLEDiRA7jXl' },
  { id: 'session3', label: 'Create Timely, Sellable Drops', date: 'Tue. Feb. 24', price: 99, priceId: 'price_1SsYR7QP580MvrLEBqTG3EAy' },
  { id: 'session4', label: 'Prepare for 24/7 Selling', date: 'Tue. Mar. 3', price: 99, priceId: 'price_1SsYReQP580MvrLEH3PchosX' },
];

const PAID_SESSIONS = ALL_SESSIONS.filter(s => s.price > 0);
const FULL_PROGRAM_PRICE = PAID_SESSIONS.reduce((sum, s) => sum + s.price, 0);

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
    return ALL_SESSIONS.filter(
      (s) => selectedSessions.includes(s.id) && s.price > 0
    ).reduce((sum, s) => sum + s.price, 0);
  };

  const selectAllSessions = () => {
    form.setValue('selectedSessions', ALL_SESSIONS.map(s => s.id));
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const total = calculateTotal();
      const paidSessionIds = PAID_SESSIONS.filter(
        s => data.selectedSessions.includes(s.id)
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

      // Send notification email to admin (non-blocking)
      supabase.functions.invoke('send-ssf-enrollment-notification', {
        body: {
          email: data.email,
          name: data.name,
          businessName: data.businessName,
          businessCityState: data.businessCityState,
          businessWebsite: data.businessWebsite,
          googleEmail: data.googleEmail,
          selectedSessions: data.selectedSessions,
          confidenceLevel: data.confidenceLevel,
          totalAmount: total * 100,
        },
      }).catch(err => console.error('Notification email failed:', err));

      if (total > 0) {
        const priceIds = paidSessionIds.map((s) => s.priceId).filter(Boolean);
        
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
          description: 'You are registered for the free AI 101 prep session. Check your email for details.',
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
        <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-tertiary/10 via-muted/30 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <img 
              src={ssfLogo} 
              alt="Socially Selling Food with Kiera H." 
              className="w-64 md:w-80 mx-auto mb-8"
            />
            <p className="text-sm md:text-base text-muted-foreground mb-10 max-w-2xl mx-auto">
              Led by <span className="text-foreground font-medium">Kiera H.</span>, a strategic advisor with 20+ years helping food and consumer businesses modernize operations and build digital revenue.
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Food businesses should not stop making money when they close.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              A hands-on working lab that helps food businesses build systems to sell 24/7.
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

        {/* The Problem */}
        <section className="py-8 md:py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Thin margins. Fixed hours. <span className="text-tertiary">No room for error.</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Food businesses operate on some of the slimmest margins in any industry. Every plate has a cost. Every ingredient cuts into profit. Every hour you're closed is revenue you'll never recover.
              </p>
              <p>
                Meanwhile, e-commerce brands sell around the clock — while their owners sleep, travel, or focus on other things.
              </p>
              <p className="text-foreground font-medium">
                The math is simple: you need revenue streams that cost you zero extra dollars to deliver.
              </p>
            </div>
          </div>
        </section>

        {/* The Shift */}
        <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-tertiary/5 via-tertiary/10 to-tertiary/5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              The opportunity: <span className="text-tertiary">Zero-cost revenue.</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Digital products, pre-orders, affiliate partnerships, branded content — these generate revenue without additional food, labor, or overhead after creation. Once built, they sell on repeat. Pure margin.
              </p>
              <p>
                This is not a marketing class. This is not about growing followers or going viral.
              </p>
              <p className="text-foreground font-medium">
                This is a hands-on working lab where you build real, deployable assets — not learn theory.
              </p>
              <p>
                You will turn your expertise, recipes, and reputation into sellable digital assets that generate revenue 24/7 — with zero cost of goods.
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
              <div className="p-6 border-2 border-tertiary/40 rounded-xl bg-tertiary/5">
                <div className="inline-block bg-tertiary text-tertiary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  FREE PREP SESSION
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">AI 101</h3>
                <p className="text-muted-foreground">
                  Get set up with the AI tools you will use throughout the full program. This session prepares you for the four working sessions ahead.
                </p>
              </div>
              <div className="p-6 border-2 border-tertiary rounded-xl bg-card relative shadow-lg shadow-tertiary/10">
                <div className="absolute -top-3 right-4">
                  <span className="bg-tertiary text-tertiary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> RECOMMENDED
                  </span>
                </div>
                <div className="inline-block bg-muted text-muted-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  FULL PROGRAM • ${FULL_PROGRAM_PRICE}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">4 Working Sessions</h3>
                <p className="text-muted-foreground">
                  Build every asset you need to sell 24/7. Each session produces real, deployable content for your business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Session Breakdown */}
        <section className="py-16 md:py-20 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
              The full program: 4 working sessions
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Each session produces a real, deployable asset. By the end, you will have everything you need to sell beyond your physical location.
            </p>
            <div className="space-y-6">
              {[
                {
                  number: 1,
                  title: 'Package What You Sell',
                  outcome: 'Turn your menu items into clear, sellable offers that work online.',
                  deliverable: 'You leave with: Defined digital offers ready to list and sell.',
                  date: 'Feb. 10',
                },
                {
                  number: 2,
                  title: 'Build Conversion-Ready Video',
                  outcome: 'Create vertical video assets designed to drive sales, not just views.',
                  deliverable: 'You leave with: Video content formatted for conversion across platforms.',
                  date: 'Feb. 17',
                },
                {
                  number: 3,
                  title: 'Create Timely, Sellable Drops',
                  outcome: 'Develop seasonal or limited-time offers that create urgency and revenue.',
                  deliverable: 'You leave with: A promotional calendar with deployable offer campaigns.',
                  date: 'Feb. 24',
                },
                {
                  number: 4,
                  title: 'Prepare for 24/7 Selling',
                  outcome: 'Set up your systems to sell while you sleep, travel, or focus elsewhere.',
                  deliverable: 'You leave with: Live systems that generate revenue beyond operating hours.',
                  date: 'Mar. 3',
                },
              ].map((session) => (
                <div key={session.number} className="flex gap-4 p-6 bg-card border border-border rounded-xl hover:border-tertiary/50 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 bg-tertiary text-tertiary-foreground rounded-full flex items-center justify-center font-bold">
                    {session.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-foreground">{session.title}</h3>
                      <span className="text-sm text-muted-foreground">• {session.date}</span>
                    </div>
                    <p className="text-muted-foreground">{session.outcome}</p>
                    <p className="text-sm text-tertiary font-medium mt-2">{session.deliverable}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className="text-sm font-medium text-muted-foreground">$99</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-tertiary/15 border border-tertiary/30 rounded-xl text-center">
              <p className="text-lg font-semibold text-foreground">
                Full Program: ${FULL_PROGRAM_PRICE}
              </p>
              <p className="text-sm text-muted-foreground">
                AI 101 prep session included free with full program registration
              </p>
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
                'Defined digital offers packaged and ready to list',
                'Conversion-ready video assets formatted for sales',
                'Seasonal campaigns and limited-time drops that drive urgency',
                'Live systems that generate revenue beyond your operating hours',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-tertiary/10 rounded-lg border border-tertiary/20">
                  <Check className="h-5 w-5 text-tertiary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Happens After the Lab */}
        <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-tertiary/5 via-tertiary/10 to-tertiary/5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              What Happens After the Lab
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                After the lab, businesses leave with real offers that can be purchased online. Once a food business creates a sellable offer with an online checkout, that offer becomes distributable.
              </p>
              <p>
                Affiliates, creators, educators, or partners can discover it and choose to sell it through the platform hosting the purchase. They are not owned or controlled by any platform. They choose what they sell based on what is available and compelling.
              </p>
              <p className="text-foreground font-medium">
                Without a sellable offer, there is no distribution. Having a sell-ready offer is what enables any distribution relationship to exist.
              </p>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-16 md:py-20 px-4 bg-muted/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Who this is for
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['Restaurants', 'Food Trucks', 'Caterers', 'Private Chefs', 'Home Chefs'].map((type) => (
                <div key={type} className="px-5 py-2.5 bg-card border-2 border-tertiary/30 rounded-full text-base font-medium text-foreground hover:bg-tertiary/10 transition-colors">
                  {type}
                </div>
              ))}
            </div>
            <p className="mt-8 text-muted-foreground text-lg">
              If you sell food and want to sell more of it — beyond your physical location and operating hours — this lab is for you.
            </p>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-16 md:py-20 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="p-8 bg-card border-2 border-tertiary/40 rounded-2xl text-center shadow-lg shadow-tertiary/10">
              <div className="inline-block bg-tertiary text-tertiary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                START HERE
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                AI 101 Prep Session
              </h2>
              <p className="text-muted-foreground mb-6">
                This free session prepares you for the full program. Get set up with the tools and understand what's ahead.
              </p>
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
                className="text-lg px-8 py-6 h-auto bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
              >
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section ref={formRef} className="py-16 md:py-20 px-4 bg-muted/30">
          <div className="max-w-2xl mx-auto">
            {/* Decisive transition */}
            <div className="text-center mb-10">
              <p className="text-xl md:text-2xl text-foreground font-medium mb-4">
                If your business currently only earns while the doors are open, this program is designed to change that permanently.
              </p>
              <p className="text-sm text-muted-foreground">
                This is a live, working cohort with limited capacity to ensure hands-on execution and direct feedback.
              </p>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              Register for Socially Selling Food
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Choose your registration option below.
            </p>

            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Session Selection */}
                  <FormField
                    control={form.control}
                    name="selectedSessions"
                    render={() => (
                      <FormItem>
                        <div className="flex items-center justify-between mb-2">
                          <FormLabel className="text-base">Select your sessions *</FormLabel>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={selectAllSessions}
                            className="text-xs"
                          >
                            <Sparkles className="h-3 w-3 mr-1" />
                            Select All 5 Sessions
                          </Button>
                        </div>
                        <div className="space-y-3">
                          {ALL_SESSIONS.map((session) => (
                            <FormField
                              key={session.id}
                              control={form.control}
                              name="selectedSessions"
                              render={({ field }) => (
                                <FormItem 
                                  className={`flex items-start space-x-3 space-y-0 p-4 rounded-xl border-2 transition-colors ${
                                    field.value?.includes(session.id)
                                      ? 'border-primary bg-primary/5'
                                      : 'border-border hover:border-primary/50'
                                  }`}
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(session.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, session.id])
                                          : field.onChange(
                                              field.value?.filter((value) => value !== session.id)
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <Label className="font-medium cursor-pointer">
                                        {session.label}
                                      </Label>
                                      <span className={`text-sm font-semibold ${session.price === 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                                        {session.price === 0 ? 'FREE' : `$${session.price}`}
                                      </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{session.date}, 2026</p>
                                  </div>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border-t border-border pt-6">
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
                  </div>

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
                    {isSubmitting 
                      ? 'Registering...' 
                      : calculateTotal() > 0 
                        ? `Register — $${calculateTotal()}` 
                        : 'Register for Free AI 101 Session'
                    }
                  </Button>

                  {selectedSessions.length === ALL_SESSIONS.length && (
                    <p className="text-center text-sm text-primary font-medium">
                      You've selected the full program — all 5 sessions!
                    </p>
                  )}
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
              Join the free AI 101 prep session and get ready to transform how your business operates.
            </p>
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="text-lg px-8 py-6 h-auto"
            >
              Register Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Meet the Instructor Section */}
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

        {/* Minimal Footer */}
        <footer className="py-8 px-4 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              Questions? Contact <a href="mailto:kiera@eatokra.com" className="underline hover:text-foreground">kiera@eatokra.com</a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SociallySellingFood;
