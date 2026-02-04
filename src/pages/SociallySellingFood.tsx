import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useSearchParams } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, Check, Calendar, Clock, Sparkles } from 'lucide-react';
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

// Session data with Stripe price IDs
const SESSIONS = [
  {
    id: 'session1',
    priceId: 'price_1SsYPvQP580MvrLE8Xvac2Zh',
    name: 'Portable Offer Build Lab',
    description: 'Choose and begin building a sellable product, service, or event',
    date: 'Feb 10, 2026',
    price: 99,
  },
  {
    id: 'session2',
    priceId: 'price_1SsYQiQP580MvrLEDiRA7jXl',
    name: 'Offer Packaging + Content Creation Lab',
    description: 'Turn the idea into a polished, customer-ready offer',
    date: 'Feb 17, 2026',
    price: 99,
  },
  {
    id: 'session3',
    priceId: 'price_1SsYR7QP580MvrLEBqTG3EAy',
    name: 'Visibility + Launch Preparation Lab',
    description: 'Build marketing assets and prepare for distribution',
    date: 'Feb 24, 2026',
    price: 99,
  },
  {
    id: 'session4',
    priceId: 'price_1SsYReQP580MvrLEH3PchosX',
    name: 'Launch + Amplification Lab',
    description: 'Go live and position the offer for EatOkra promotion',
    date: 'Mar 3, 2026',
    price: 99,
  },
];

const BUNDLE_PRICE_ID = 'price_1Sx854QP580MvrLEZAxk6BOn';
const BUNDLE_PRICE = 299;
const INDIVIDUAL_TOTAL = SESSIONS.reduce((sum, s) => sum + s.price, 0); // $396

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
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [registrationType, setRegistrationType] = useState<'free' | 'paid'>('free');
  const formRef = useRef<HTMLDivElement>(null);
  const paidFormRef = useRef<HTMLDivElement>(null);

  // Check for success/cancel from Stripe
  const paymentSuccess = searchParams.get('success') === 'true';
  const paymentCanceled = searchParams.get('canceled') === 'true';

  React.useEffect(() => {
    if (paymentSuccess) {
      toast({
        title: 'Payment successful!',
        description: 'You are enrolled in the Socially Selling Food program. Check your email for Google Classroom access.',
      });
    } else if (paymentCanceled) {
      toast({
        title: 'Payment canceled',
        description: 'Your payment was not completed. You can try again when ready.',
        variant: 'destructive',
      });
    }
  }, [paymentSuccess, paymentCanceled, toast]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToPaidForm = () => {
    paidFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const allSessionsSelected = selectedSessions.length === SESSIONS.length;
  const someSessionsSelected = selectedSessions.length > 0;

  const calculateTotal = () => {
    if (allSessionsSelected) {
      return BUNDLE_PRICE;
    }
    return selectedSessions.length * 99;
  };

  const getSavings = () => {
    if (allSessionsSelected) {
      return INDIVIDUAL_TOTAL - BUNDLE_PRICE;
    }
    return 0;
  };

  const toggleSession = (sessionId: string) => {
    setSelectedSessions((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const selectAllSessions = () => {
    if (allSessionsSelected) {
      setSelectedSessions([]);
    } else {
      setSelectedSessions(SESSIONS.map((s) => s.id));
    }
  };

  const onSubmitFree = async (data: FormValues) => {
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

  const onSubmitPaid = async (data: FormValues) => {
    if (selectedSessions.length === 0) {
      toast({
        title: 'No sessions selected',
        description: 'Please select at least one session to continue.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Determine price IDs to send
      let priceIds: string[];
      if (allSessionsSelected) {
        priceIds = [BUNDLE_PRICE_ID];
      } else {
        priceIds = selectedSessions.map(
          (sessionId) => SESSIONS.find((s) => s.id === sessionId)!.priceId
        );
      }

      // Save enrollment record first (pending payment)
      const { error: dbError } = await supabase
        .from('socially_selling_food_enrollments')
        .insert({
          email: data.email,
          name: data.name,
          business_name: data.businessName,
          business_city_state: 'N/A',
          business_website: data.businessWebsite,
          google_email: data.googleEmail,
          selected_sessions: allSessionsSelected ? ['bundle'] : selectedSessions,
          confidence_level: 5,
          accommodations: null,
          total_amount: calculateTotal(),
          payment_status: 'pending',
        });

      if (dbError) throw dbError;

      // Create Stripe checkout session
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke(
        'create-ssf-payment',
        {
          body: {
            priceIds,
            customerEmail: data.email,
            customerName: data.name,
          },
        }
      );

      if (checkoutError) throw checkoutError;

      if (checkoutData?.url) {
        window.location.href = checkoutData.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment setup failed',
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
        title="Socially Selling Food | AI Workshop for Food-Related Businesses"
        description="Join the Socially Selling Food program. A hands-on working lab that helps restaurants, food trucks, caterers, private chefs, and food-related businesses learn to build sellable offers for 24/7 online revenue."
        keywords="food business e-commerce, restaurant online sales, food truck digital revenue, catering business systems, sell food online, 24/7 food sales, food business workshop, food business AI"
        canonicalUrl="https://phreshphactory.com/socially-selling-food"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "Socially Selling Food: Portable Offer Building Lab",
          "description": "A hands-on working lab that helps food-related businesses build and launch sellable offers for 24/7 online revenue.",
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
          "offers": {
            "@type": "Offer",
            "price": "99",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-tertiary/10 via-muted/30 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <button 
              onClick={scrollToForm}
              className="w-full max-w-3xl mx-auto mb-8 cursor-pointer transition-transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-offset-2 rounded-lg"
            >
              <img 
                src={ssfHeroBanner} 
                alt="Socially Selling Food - Starting February 3, 2026 - Hosted by Kiera H. - Click to register" 
                className="w-full rounded-lg"
              />
            </button>
            
            {/* Who + Outcome */}
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Sell Beyond Your Operating Hours
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              A hands-on lab for restaurants, food trucks, caterers, chefs, and food-related businesses to build offers that generate revenue 24/7.
            </p>
            
            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={scrollToForm}
                className="text-lg px-8 py-6 h-auto bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
              >
                Start Free: AI 101 Prep
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={scrollToPaidForm}
                className="text-lg px-8 py-6 h-auto border-tertiary text-tertiary hover:bg-tertiary/10"
              >
                View Full Program
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
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

        {/* Free AI 101 Registration Section */}
        <section ref={formRef} className="py-12 md:py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="p-6 md:p-8 border-2 border-tertiary rounded-xl bg-tertiary/5">
              <div className="inline-block bg-tertiary text-tertiary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                START HERE — FREE
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                AI 101 Prep Session
              </h2>
              <p className="text-lg text-muted-foreground mb-2">
                <span className="font-medium text-foreground">Learn tools that speed creation and marketing.</span>
              </p>
              <p className="text-muted-foreground mb-6">
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

              {/* Free Registration Form */}
              <div className="bg-card border border-border rounded-xl p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitFree)} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
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
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
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
                            <FormLabel>Website / EatOkra Profile</FormLabel>
                            <FormControl>
                              <Input placeholder="https://..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="googleEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Google Email (for Classroom access)</FormLabel>
                          <FormControl>
                            <Input placeholder="your.name@gmail.com" {...field} />
                          </FormControl>
                          <p className="text-xs text-muted-foreground mt-1">
                            Must be a @gmail.com address for Google Classroom access.
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
                    <p className="text-sm text-center text-muted-foreground">
                      No payment required. You will decide whether to continue after the session.
                    </p>
                  </form>
                </Form>
              </div>
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

        {/* Full Program - Paid Sessions */}
        <section ref={paidFormRef} className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                The Complete Portable Offer Building Lab
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Four weekly sessions to build and launch your sellable offers. Every Tuesday from February 10 to March 3, 2026.
              </p>
            </div>

            {/* Session Cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {SESSIONS.map((session, index) => (
                <div
                  key={session.id}
                  className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedSessions.includes(session.id)
                      ? 'border-tertiary bg-tertiary/10'
                      : 'border-border hover:border-tertiary/50 bg-card'
                  }`}
                  onClick={() => toggleSession(session.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="pt-1">
                      <Checkbox
                        checked={selectedSessions.includes(session.id)}
                        onCheckedChange={() => toggleSession(session.id)}
                        className="h-5 w-5"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-tertiary bg-tertiary/20 px-2 py-0.5 rounded">
                          Session {index + 1}
                        </span>
                        <span className="text-xs text-muted-foreground">{session.date}</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{session.name}</h3>
                      <p className="text-sm text-muted-foreground">{session.description}</p>
                      <p className="text-sm font-medium text-foreground mt-2">${session.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bundle Option */}
            <div
              className={`p-6 rounded-xl border-2 transition-all cursor-pointer mb-8 ${
                allSessionsSelected
                  ? 'border-tertiary bg-tertiary/10'
                  : 'border-tertiary/50 hover:border-tertiary bg-gradient-to-r from-tertiary/5 to-tertiary/10'
              }`}
              onClick={selectAllSessions}
            >
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={allSessionsSelected}
                  onCheckedChange={selectAllSessions}
                  className="h-6 w-6"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-5 w-5 text-tertiary" />
                    <span className="font-semibold text-foreground">All 4 Sessions Bundle</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Complete the full journey from idea to launch
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">${BUNDLE_PRICE}</p>
                  <p className="text-sm text-tertiary font-medium">Save ${INDIVIDUAL_TOTAL - BUNDLE_PRICE}</p>
                  <p className="text-xs text-muted-foreground line-through">${INDIVIDUAL_TOTAL}</p>
                </div>
              </div>
            </div>

            {/* Pricing Summary */}
            {someSessionsSelected && (
              <div className="bg-card border border-border rounded-xl p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">
                    {allSessionsSelected
                      ? 'All 4 Sessions (Bundle)'
                      : `${selectedSessions.length} session${selectedSessions.length > 1 ? 's' : ''} selected`}
                  </span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-foreground">${calculateTotal()}</span>
                    {getSavings() > 0 && (
                      <span className="ml-2 text-sm text-tertiary font-medium">
                        (Save ${getSavings()})
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  All sessions run Tuesdays, 2:30 PM – 4:00 PM Eastern
                </p>
              </div>
            )}

            {/* Paid Registration Form */}
            {someSessionsSelected && (
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Complete Your Enrollment</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitPaid)} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
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
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
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
                            <FormLabel>Website / EatOkra Profile</FormLabel>
                            <FormControl>
                              <Input placeholder="https://..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="googleEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Google Email (for Classroom access)</FormLabel>
                          <FormControl>
                            <Input placeholder="your.name@gmail.com" {...field} />
                          </FormControl>
                          <p className="text-xs text-muted-foreground mt-1">
                            Must be a @gmail.com address for Google Classroom access.
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
                      {isSubmitting ? 'Processing...' : `Proceed to Payment — $${calculateTotal()}`}
                    </Button>
                    <p className="text-sm text-center text-muted-foreground">
                      Secure payment via Stripe. You'll receive Google Classroom access within 24 hours.
                    </p>
                  </form>
                </Form>
              </div>
            )}
          </div>
        </section>

        {/* What Happens After */}
        <section className="py-12 md:py-16 px-4 bg-muted/30">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={scrollToForm}
                className="text-lg px-8 py-6 h-auto bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
              >
                Register for Free AI 101
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={scrollToPaidForm}
                className="text-lg px-8 py-6 h-auto border-tertiary text-tertiary hover:bg-tertiary/10"
              >
                Enroll in Full Program
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Questions about the workshop? Contact the instructor at <a href="mailto:Kiera@PhreshPhactory.co" className="underline hover:text-foreground">Kiera@PhreshPhactory.co</a>
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
