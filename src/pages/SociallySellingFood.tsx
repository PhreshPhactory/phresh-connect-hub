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
import { ArrowRight, Clock } from 'lucide-react';
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

// February 4-Session Bundle - $299
const BUNDLE_PRICE_ID = 'price_1Sx854QP580MvrLEZAxk6BOn';
const BUNDLE_PRICE = 299;
const DEADLINE = 'February 10th';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(1, 'Name is required'),
  businessName: z.string().min(1, 'Business name is required'),
  businessWebsite: z.string().min(1, 'Business website or social profile is required'),
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
  const formRef = useRef<HTMLDivElement>(null);

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
    setIsSubmitting(true);
    try {
      // Save enrollment to database
      const { error: dbError } = await supabase
        .from('socially_selling_food_enrollments')
        .insert({
          email: data.email,
          name: data.name,
          business_name: data.businessName,
          business_city_state: 'N/A',
          business_website: data.businessWebsite,
          google_email: data.googleEmail,
          selected_sessions: ['feb-bundle'],
          confidence_level: 5,
          accommodations: null,
          total_amount: BUNDLE_PRICE,
          payment_status: 'pending',
        });

      if (dbError) throw dbError;

      // Create Stripe checkout session
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
    } catch (error: any) {
      console.error('Enrollment error:', error);
      toast({
        title: 'Registration failed',
        description: error.message || 'Please try again or contact Kiera@PhreshPhactory.co',
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
              4-Session Working Lab: Launch Your Offer
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
              Build a market-ready product with AI tools. Leave with everything you need to sell.
            </p>
            
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-2 mb-4 inline-block">
              <p className="text-sm font-medium text-destructive flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Register by {DEADLINE} — Sessions start Feb 10
              </p>
            </div>
            
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="text-lg px-8 py-6 h-auto bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
            >
              Enroll Now — $299
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <p className="text-sm text-muted-foreground mt-4">
              4 live sessions · Tuesdays 2:30 PM ET · Feb 10 – Mar 3
            </p>
          </div>
        </section>

        {/* Registration Form - Primary Focus */}
        <section ref={formRef} className="py-10 md:py-14 px-4">
          <div className="max-w-xl mx-auto">
            <div className="bg-card border-2 border-tertiary rounded-2xl p-6 md:p-8 shadow-lg shadow-tertiary/10">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Enroll in the 4-Session Lab</h2>
                <p className="text-muted-foreground">$299 — All 4 sessions, Feb 10 – Mar 3</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3" />
                  Tuesdays, 2:30 PM – 4:00 PM ET
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

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
                        <FormLabel>Website or Social Profile</FormLabel>
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting 
                      ? 'Processing...' 
                      : `Proceed to Payment — $${BUNDLE_PRICE}`
                    }
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    Secure payment via Stripe. Access within 24 hours.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </section>

        {/* The Journey - Solution Based */}
        <section className="py-10 px-4 bg-muted/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
              Your Journey: Idea to Launch
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
              We start with your idea, build it with AI, and give you everything to launch and scale.
            </p>
            <div className="grid sm:grid-cols-5 gap-4">
              {[
                { step: '1', title: 'Your Idea', desc: 'Start with what you already know: your recipes, your expertise, your story' },
                { step: '2', title: 'Build with AI', desc: 'Use AI tools to create your offer: product pages, pricing, packaging' },
                { step: '3', title: 'Test & Refine', desc: 'Get feedback, refine messaging, perfect your presentation' },
                { step: '4', title: 'Marketing Ready', desc: 'AI-generated email copy, product descriptions, social content' },
                { step: '5', title: 'Launch & Scale', desc: 'Go live with a polished product, then expand to every channel you choose' },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center p-4 bg-card rounded-lg border border-border relative">
                  <div className="w-8 h-8 rounded-full bg-tertiary text-tertiary-foreground font-bold flex items-center justify-center mb-3 text-sm">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  {index < 4 && (
                    <ArrowRight className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You'll Build */}
        <section className="py-10 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              What You'll Build in 4 Sessions
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'Session 1 — Feb 10', desc: 'Portable Offer Build Lab: Define your sellable offer and pricing' },
                { title: 'Session 2 — Feb 17', desc: 'Offer Packaging + Content: Create AI-generated product pages and descriptions' },
                { title: 'Session 3 — Feb 24', desc: 'Visibility + Launch Prep: Build marketing assets and email sequences' },
                { title: 'Session 4 — Mar 3', desc: 'Launch + Amplification: Go live and set up ongoing sales systems' },
              ].map((session, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tertiary flex items-center justify-center text-tertiary-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">{session.title}</h3>
                    <p className="text-xs text-muted-foreground">{session.desc}</p>
                  </div>
                </div>
              ))}
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
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-2 mb-4 inline-block">
              <p className="text-sm font-medium text-destructive flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Deadline: {DEADLINE}
              </p>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Ready to Build Your Offer?
            </h2>
            <p className="text-muted-foreground mb-6">
              4 sessions. $299. Leave with a launch-ready product.
            </p>
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="text-lg px-8 py-6 h-auto bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
            >
              Enroll Now — $299
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
