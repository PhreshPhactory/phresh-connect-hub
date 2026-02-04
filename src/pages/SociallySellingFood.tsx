import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useSearchParams } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, Check, Calendar, Clock, Users } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Simplified session options - all available for registration
const SESSION_OPTIONS = [
  { id: 'feb-ai101', label: 'AI 101 Prep — Feb 3 (Free)', date: 'Feb 3, 2026', type: 'free', cohort: 'February' },
  { id: 'feb-bundle', label: 'Full Program — Feb 10 - Mar 3 ($299)', date: 'Feb 10 - Mar 3', type: 'bundle', price: 299, cohort: 'February' },
  { id: 'mar-ai101', label: 'AI 101 Prep — Mar 10 (Free)', date: 'Mar 10, 2026', type: 'free', cohort: 'March' },
  { id: 'mar-bundle', label: 'Full Program — Mar 17 - Apr 7 ($299)', date: 'Mar 17 - Apr 7', type: 'bundle', price: 299, cohort: 'March' },
];

const BUNDLE_PRICE_ID = 'price_1Sx854QP580MvrLEZAxk6BOn';

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
  const [selectedSession, setSelectedSession] = useState<string>('');
  const formRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = SESSION_OPTIONS.find(s => s.id === selectedSession);
  const isFreeSession = selectedOption?.type === 'free';

  // Check for success/cancel from Stripe
  const paymentSuccess = searchParams.get('success') === 'true';
  const paymentCanceled = searchParams.get('canceled') === 'true';

  React.useEffect(() => {
    if (paymentSuccess) {
      toast({
        title: 'Payment successful!',
        description: 'You are enrolled. Check your email for Google Classroom access.',
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
    if (!selectedSession) {
      toast({
        title: 'Please select a session',
        description: 'Choose a session from the dropdown to continue.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (isFreeSession) {
        // Free AI 101 registration
        const { error: dbError } = await supabase
          .from('socially_selling_food_enrollments')
          .insert({
            email: data.email,
            name: data.name,
            business_name: data.businessName,
            business_city_state: 'N/A',
            business_website: data.businessWebsite,
            google_email: data.googleEmail,
            selected_sessions: [selectedSession],
            confidence_level: 5,
            accommodations: null,
            total_amount: 0,
            payment_status: 'free',
          });

        if (dbError) throw dbError;

        supabase.functions.invoke('send-ssf-enrollment-notification', {
          body: {
            email: data.email,
            name: data.name,
            businessName: data.businessName,
            businessCityState: 'N/A',
            businessWebsite: data.businessWebsite,
            googleEmail: data.googleEmail,
            selectedSessions: [selectedSession],
            confidenceLevel: 5,
            totalAmount: 0,
          },
        }).catch(err => console.error('Notification email failed:', err));

        toast({
          title: 'Registration confirmed',
          description: `You're registered for the ${selectedOption?.cohort} AI 101 session. Check your email for details.`,
        });

        form.reset();
        setSelectedSession('');
      } else {
        // Paid bundle registration
        const { error: dbError } = await supabase
          .from('socially_selling_food_enrollments')
          .insert({
            email: data.email,
            name: data.name,
            business_name: data.businessName,
            business_city_state: 'N/A',
            business_website: data.businessWebsite,
            google_email: data.googleEmail,
            selected_sessions: ['bundle'],
            confidence_level: 5,
            accommodations: null,
            total_amount: 299,
            payment_status: 'pending',
          });

        if (dbError) throw dbError;

        const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke(
          'create-ssf-payment',
          {
            body: {
              priceIds: [BUNDLE_PRICE_ID],
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
      }
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
        title="Socially Selling Food | AI Workshop for Food-Related Businesses"
        description="Join the Socially Selling Food program. A hands-on working lab that helps restaurants, food trucks, caterers, private chefs, and food-related businesses learn to build sellable offers for 24/7 online revenue."
        keywords="food business e-commerce, restaurant online sales, food truck digital revenue, catering business systems, sell food online, 24/7 food sales, food business workshop, food business AI"
        canonicalUrl="https://phreshphactory.com/socially-selling-food"
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section - Focused */}
        <section className="py-10 md:py-14 px-4 bg-gradient-to-b from-tertiary/10 to-background">
          <div className="max-w-3xl mx-auto text-center">
            <button 
              onClick={scrollToForm}
              className="w-full max-w-2xl mx-auto mb-6 cursor-pointer transition-transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-offset-2 rounded-lg"
            >
              <img 
                src={ssfHeroBanner} 
                alt="Socially Selling Food - Click to register" 
                className="w-full rounded-lg shadow-lg"
              />
            </button>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
              Sell Beyond Your Operating Hours
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
              Build offers that generate revenue 24/7 — even when your kitchen is closed.
            </p>
            
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="text-lg px-8 py-6 h-auto bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
            >
              Register Now — Free to Start
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <p className="text-sm text-muted-foreground mt-4">
              Free AI 101 prep session · No payment required
            </p>
          </div>
        </section>

        {/* Registration Form - Primary Focus */}
        <section ref={formRef} className="py-10 md:py-14 px-4">
          <div className="max-w-xl mx-auto">
            <div className="bg-card border-2 border-tertiary rounded-2xl p-6 md:p-8 shadow-lg shadow-tertiary/10">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Reserve Your Spot</h2>
                <p className="text-muted-foreground">Choose your session and complete registration</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* Session Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Select Session</label>
                    <Select value={selectedSession} onValueChange={setSelectedSession}>
                      <SelectTrigger className="w-full h-12">
                        <SelectValue placeholder="Choose a session..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feb-ai101" className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded">FREE</span>
                            <span>AI 101 Prep — Feb 3</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="feb-bundle" className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-tertiary text-tertiary-foreground px-2 py-0.5 rounded">$299</span>
                            <span>Full Program — Feb 10 - Mar 3</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="mar-ai101" className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded">FREE</span>
                            <span>AI 101 Prep — Mar 10</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="mar-bundle" className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-tertiary text-tertiary-foreground px-2 py-0.5 rounded">$299</span>
                            <span>Full Program — Mar 17 - Apr 7</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {selectedOption && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        All sessions: Tuesdays, 2:30 PM – 4:00 PM ET
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
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
                            <Input placeholder="you@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
                        <FormLabel>Website or EatOkra Profile</FormLabel>
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
                        <FormLabel>Gmail Address</FormLabel>
                        <FormControl>
                          <Input placeholder="you@gmail.com" {...field} />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">For Google Classroom access</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg py-6 h-auto bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
                    disabled={isSubmitting || !selectedSession}
                  >
                    {isSubmitting 
                      ? 'Processing...' 
                      : isFreeSession 
                        ? 'Register — Free'
                        : `Proceed to Payment — $${selectedOption?.price || 299}`
                    }
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    {isFreeSession 
                      ? 'No payment required. You decide whether to continue after the session.'
                      : 'Secure payment via Stripe. Access within 24 hours.'
                    }
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </section>

        {/* What You Get - Compact */}
        <section className="py-10 px-4 bg-muted/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              What You Will Build
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Pre-orders that capture demand before you cook',
                'Digital products like recipe guides or meal plans',
                'Limited-time drops that create urgency',
                'Systems that sell while you sleep',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                  <Check className="h-5 w-5 text-tertiary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Program Structure - Simple */}
        <section className="py-10 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              The Program
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-accent/10 border border-accent/30 rounded-xl">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">AI 101 Prep Session — Free</h3>
                  <p className="text-sm text-muted-foreground">Get set up with the AI tools you'll use throughout the program. See if this is right for you.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-tertiary/5 border border-tertiary/30 rounded-xl">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-tertiary flex items-center justify-center text-tertiary-foreground font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">4-Session Working Lab — $299</h3>
                  <p className="text-sm text-muted-foreground">Build, package, and launch your portable offer over four hands-on sessions. Leave with live, sellable assets.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instructor - Compact */}
        <section className="py-10 px-4 bg-secondary/20">
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <img 
              src={kieraHeadshot} 
              alt="Kiera H." 
              className="w-24 h-24 rounded-full object-cover border-4 border-tertiary flex-shrink-0"
            />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Led by Kiera H.</h3>
              <p className="text-sm text-muted-foreground mb-3">
                20+ years helping businesses modernize operations and build digital revenue streams.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link to="/KieraH">
                  Learn More <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Ready to Sell While You Sleep?
            </h2>
            <p className="text-muted-foreground mb-6">
              Start with the free AI 101 session. No commitment.
            </p>
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="text-lg px-8 py-6 h-auto bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
            >
              Register Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Footer - Minimal */}
        <footer className="py-6 px-4 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              Questions? <a href="mailto:Kiera@PhreshPhactory.co" className="underline hover:text-foreground">Kiera@PhreshPhactory.co</a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SociallySellingFood;
