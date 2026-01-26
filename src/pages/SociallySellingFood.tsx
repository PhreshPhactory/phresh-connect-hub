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
        title="Socially Selling Food | Workshop for Food Businesses to Sell 24/7"
        description="A hands-on working lab that helps restaurants, food trucks, caterers, private chefs, and home chefs build sellable offers and systems for 24/7 online revenue. Learn e-commerce distribution mechanics for food businesses."
        keywords="food business e-commerce, restaurant online sales, food truck digital revenue, catering business systems, sell food online, 24/7 food sales, food business workshop, zero-cost revenue, sellable offers, e-commerce distribution"
        canonicalUrl="https://phreshphactory.com/socially-selling-food"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "Socially Selling Food",
          "description": "A hands-on working lab that helps food businesses build systems to sell 24/7 through sellable offers and e-commerce distribution.",
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
          "isAccessibleForFree": false,
          "offers": {
            "@type": "Offer",
            "price": "99",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section - Optimized for 5-second clarity */}
        <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-tertiary/10 via-muted/30 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <img 
              src={ssfHeroBanner} 
              alt="Socially Selling Food - Starting February 3, 2026 - Hosted by Kiera H." 
              className="w-full max-w-3xl mx-auto mb-8 rounded-lg"
            />
            
            {/* Who + Outcome - Clear in 5 seconds */}
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Sell Beyond Your Operating Hours
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              A hands-on lab for restaurants, food trucks, caterers, and chefs to build offers that generate revenue 24/7.
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
            
            {/* Trust element moved below CTA */}
            <p className="text-sm text-muted-foreground mt-6 max-w-xl mx-auto">
              Led by <span className="text-foreground font-medium">Kiera H.</span>, 20+ years helping food businesses modernize operations and build digital revenue.
            </p>
          </div>
        </section>

        {/* Problem → Solution - Scannable */}
        <section className="py-10 md:py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              The Problem: <span className="text-tertiary">You Only Earn When Open</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Food businesses earn revenue only during operating hours. Every hour you are closed is income you will never recover.
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

        {/* What Makes This Different - Moved Higher */}
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

        {/* Program Structure - Simplified */}
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
              Your Path to 24/7 Revenue
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Choose how you want to participate.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Start Here: Free AI 101 */}
              <div className="p-6 border-2 border-tertiary/40 rounded-xl bg-tertiary/5">
                <div className="inline-block bg-tertiary text-tertiary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  START HERE
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Free AI 101 Prep Session</h3>
                <p className="text-muted-foreground mb-4">
                  Get set up with the AI tools you will use throughout the program. Attend this session before deciding if the full program is right for you.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Tuesday, February 3, 2026</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Clock className="h-4 w-4" />
                  <span>2:30 PM Eastern</span>
                </div>
                <Button 
                  variant="outline"
                  onClick={scrollToForm}
                  className="w-full mt-6 border-tertiary/50 text-tertiary hover:bg-tertiary/10"
                >
                  Register for Free AI 101
                </Button>
              </div>

              {/* Continue With: Full Program */}
              <div className="p-6 border-2 border-tertiary rounded-xl bg-card relative shadow-lg shadow-tertiary/10">
                <div className="absolute -top-3 right-4">
                  <span className="bg-tertiary text-tertiary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> RECOMMENDED
                  </span>
                </div>
                <div className="inline-block bg-muted text-muted-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  CONTINUE WITH
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Full Program: ${FULL_PROGRAM_PRICE}</h3>
                <p className="text-muted-foreground mb-4">
                  All 5 sessions plus hands-on support from Kiera H. through offer creation and launch.
                </p>
                <ul className="space-y-2 text-sm">
                  {[
                    'AI 101 Prep (Free)',
                    '4 Working Sessions ($99 each)',
                    'Direct support through launch',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-4 w-4 text-tertiary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => {
                    selectAllSessions();
                    scrollToForm();
                  }}
                  className="w-full mt-6 bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
                >
                  Register for Full Program
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Session Breakdown */}
        <section className="py-12 md:py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
              The 4 Working Sessions
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Each session produces a real, deployable asset.
            </p>
            <div className="space-y-4">
              {[
                {
                  number: 1,
                  title: 'Package What You Sell',
                  deliverable: 'Defined digital offers ready to list and sell.',
                  date: 'Feb. 10',
                },
                {
                  number: 2,
                  title: 'Build Conversion-Ready Video',
                  deliverable: 'Video content formatted for conversion across platforms.',
                  date: 'Feb. 17',
                },
                {
                  number: 3,
                  title: 'Create Timely, Sellable Drops',
                  deliverable: 'A promotional calendar with deployable offer campaigns.',
                  date: 'Feb. 24',
                },
                {
                  number: 4,
                  title: 'Prepare for 24/7 Selling',
                  deliverable: 'Live systems that generate revenue beyond operating hours.',
                  date: 'Mar. 3',
                },
              ].map((session) => (
                <div key={session.number} className="flex gap-4 p-5 bg-card border border-border rounded-xl hover:border-tertiary/50 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 bg-tertiary text-tertiary-foreground rounded-full flex items-center justify-center font-bold">
                    {session.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-foreground">{session.title}</h3>
                      <span className="text-sm text-muted-foreground">• {session.date}</span>
                    </div>
                    <p className="text-sm text-tertiary font-medium">You leave with: {session.deliverable}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className="text-sm font-medium text-muted-foreground">$99</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-12 md:py-16 px-4">
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

        {/* Full Program Support */}
        <section className="py-12 md:py-16 px-4 bg-card border-y border-tertiary/30">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-tertiary" />
              <span className="text-sm font-medium text-tertiary uppercase tracking-wide">Full Program Only</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
              Hands-On Support Through Launch
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-8">
              Full program participants receive direct support from Kiera H. through offer creation and deployment.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Identify the right digital offers for your business',
                'Package and create those offers step by step',
                'Guide launch and deployment during the program',
                'Continued guidance as your offers go live',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-tertiary/10 rounded-lg border border-tertiary/20">
                  <Check className="h-5 w-5 text-tertiary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section ref={formRef} className="py-12 md:py-16 px-4 bg-muted/30">
          <div className="max-w-2xl mx-auto">
            {/* Reassurance Above Form */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Register Now
              </h2>
              <p className="text-muted-foreground mb-2">
                Ready to build 24/7 revenue for your food business? Select your starting point below.
              </p>
              <p className="text-sm text-tertiary font-medium">
                Selecting only the free AI 101 session is a great way to begin.
              </p>
            </div>

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
                            Select All 5
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
                        ? `Register Now`
                        : 'Register for Free AI 101'
                    }
                  </Button>

                  {selectedSessions.length === ALL_SESSIONS.length && (
                    <p className="text-center text-sm text-primary font-medium">
                      Full program selected: all 5 sessions with hands-on support.
                    </p>
                  )}
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
