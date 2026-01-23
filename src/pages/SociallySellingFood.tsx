import React, { useState } from 'react';
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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      businessName: '',
      businessCityState: '',
      businessWebsite: '',
      googleEmail: '',
      selectedSessions: [],
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

      // Save enrollment to database
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
        // Create Stripe checkout session
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
            description: 'Complete your payment in the new tab. Payment instructions have been opened.',
          });
        }
      } else {
        toast({
          title: 'Enrollment confirmed',
          description: 'You have been enrolled in the free AI 101 prep session. Check your email for details.',
        });
      }

      form.reset();
    } catch (error: any) {
      console.error('Enrollment error:', error);
      toast({
        title: 'Enrollment failed',
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
        title="Socially Selling Food | Working Class Series for Food Businesses"
        description="A hands-on working series for food businesses to prepare menus, dishes, and experiences for digital selling and promotion. Enroll in AI 101 prep session and 4 working classes."
        keywords="food business, digital marketing, social selling, restaurant marketing, food truck marketing, catering business, AI for food business"
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Socially Selling Food
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              A hands-on working series for food businesses to prepare menus, dishes, and experiences for digital selling and promotion.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Socially Selling Food begins with an AI 101 preparation session, followed by four working classes designed to help food businesses turn what they already sell into packaged, distributable assets ready for modern digital channels.
            </p>
          </div>
        </section>

        {/* Program Overview */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Program Overview
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">This is a working lab, not a lecture series.</strong> Each session is designed for active participation where you will create real, usable assets for your business.
              </p>
              <p>
                Participants will prepare actual content, menus, and promotional materials they can immediately deploy across their digital platforms.
              </p>
              <p>
                <strong className="text-foreground">Designed for:</strong> Restaurants, food trucks, caterers, food brands, and culinary entrepreneurs ready to strengthen their digital presence.
              </p>
            </div>
          </div>
        </section>

        {/* Class Schedule */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Class Schedule & Options
            </h2>
            <p className="text-muted-foreground mb-6">
              Select one or multiple sessions based on your needs. Each paid session is $99.
            </p>
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="flex items-center gap-3">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">FREE</span>
                  <div>
                    <p className="font-medium text-foreground">AI 101 (Prep Session)</p>
                    <p className="text-sm text-muted-foreground">Tuesday, February 3, 2026</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="flex items-center gap-3">
                  <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">$99</span>
                  <div>
                    <p className="font-medium text-foreground">Session 1: Package What You Sell</p>
                    <p className="text-sm text-muted-foreground">Tuesday, February 10, 2026</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="flex items-center gap-3">
                  <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">$99</span>
                  <div>
                    <p className="font-medium text-foreground">Session 2: Conversion-Ready Video</p>
                    <p className="text-sm text-muted-foreground">Tuesday, February 17, 2026</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="flex items-center gap-3">
                  <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">$99</span>
                  <div>
                    <p className="font-medium text-foreground">Session 3: Create Timely, Sellable Drops</p>
                    <p className="text-sm text-muted-foreground">Tuesday, February 24, 2026</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-border rounded-lg bg-card">
                <div className="flex items-center gap-3">
                  <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">$99</span>
                  <div>
                    <p className="font-medium text-foreground">Session 4: Prepare for Promotion</p>
                    <p className="text-sm text-muted-foreground">Tuesday, March 3, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enrollment Form */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
              Socially Selling Food – Enrollment Form
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Fields marked with * are required
            </p>

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
                      <FormLabel>Business Website or EatOkra Profile Link *</FormLabel>
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
                        Must be a @gmail.com address to access Google Classroom materials
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
                      <FormLabel>Select the class(es) you wish to register for *</FormLabel>
                      <div className="space-y-3 mt-2">
                        {CLASS_OPTIONS.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="selectedSessions"
                            render={({ field }) => (
                              <FormItem className="flex items-start space-x-3 space-y-0">
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
                                <Label className="font-normal text-sm cursor-pointer">
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
                        How would you rate your confidence level for successfully completing the course workload?
                      </FormLabel>
                      <div className="pt-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-2">
                          <span>0 = Not at all confident</span>
                          <span>10 = Extremely confident</span>
                        </div>
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
                        <div className="text-center mt-2">
                          <span className="text-lg font-semibold text-foreground">{field.value}</span>
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
                      <FormLabel>Do you require any accommodations or special considerations?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe any accommodations you may need..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Total Display */}
                {selectedSessions.length > 0 && (
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">Total Amount:</span>
                      <span className="text-xl font-bold text-foreground">
                        {calculateTotal() === 0 ? 'FREE' : `$${calculateTotal()}`}
                      </span>
                    </div>
                    {calculateTotal() > 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Payment instructions will be provided after form submission.
                      </p>
                    )}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Enrollment'}
                </Button>
              </form>
            </Form>
          </div>
        </section>

        {/* Access Note */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="p-4 bg-muted/50 border border-border rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Access Note:</strong> Participants must use a Google email address (@gmail.com) to access course materials via Google Classroom.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              Questions? Contact{' '}
              <a href="mailto:kiera@eatokra.com" className="text-primary hover:underline">
                kiera@eatokra.com
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SociallySellingFood;
