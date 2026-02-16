import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import SEOHead from '@/components/SEOHead';
import { emailSchema, nameSchema, urlSchema, messageSchema, createRateLimiter, validateHoneypot, sanitizeInput } from '@/utils/security';
import NewsletterForm from '@/components/NewsletterForm';
import { Video, ShoppingBag, Tv, FileText, TrendingUp, ArrowRight, Calendar, DollarSign } from 'lucide-react';

const formSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  brandName: z.string().min(1, { message: 'Brand name is required.' }).max(100),
  website: urlSchema,
  instagram: z.string().max(100).optional(),
  tiktok: z.string().max(100).optional(),
  youtube: z.string().max(100).optional(),
  hasTiktokShop: z.string().min(1, { message: 'Please let us know.' }),
  productDescription: z.string().min(10, { message: 'Please describe your product(s).' }).max(2000),
  interestedIn: z.string().min(1, { message: 'Please select what you are interested in.' }),
  budget: z.string().min(1, { message: 'Please select your budget range.' }),
  message: messageSchema,
  honeypot: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const rateLimiter = createRateLimiter(3, 600000);

const BrandPartnership = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBookingPayment, setIsBookingPayment] = useState(false);
  const [searchParams] = useSearchParams();
  
  
  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    if (paymentStatus === 'success') {
      toast({
        title: 'Payment successful!',
        description: 'Your TikTok Shop Live Session is booked! Check your email for confirmation and calendar details.',
      });
    } else if (paymentStatus === 'cancelled') {
      toast({
        title: 'Payment cancelled',
        description: 'Your payment was cancelled. You can try again anytime.',
        variant: 'destructive',
      });
    }
  }, [searchParams, toast]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      brandName: '',
      website: '',
      instagram: '',
      tiktok: '',
      youtube: '',
      hasTiktokShop: '',
      productDescription: '',
      interestedIn: '',
      budget: '',
      message: '',
      honeypot: '',
    },
  });

  const watchInterestedIn = form.watch('interestedIn');

  const onSubmit = async (data: FormValues) => {
    if (!validateHoneypot(data.honeypot || '')) {
      return;
    }

    if (!rateLimiter(data.email)) {
      toast({
        title: 'Too many attempts',
        description: 'Please wait before submitting again.',
        variant: 'destructive',
      });
      return;
    }

    const sanitizedData = {
      ...data,
      name: sanitizeInput(data.name),
      brandName: sanitizeInput(data.brandName),
      productDescription: sanitizeInput(data.productDescription),
      message: data.message ? sanitizeInput(data.message) : '',
      instagram: data.instagram ? sanitizeInput(data.instagram) : '',
      tiktok: data.tiktok ? sanitizeInput(data.tiktok) : '',
      youtube: data.youtube ? sanitizeInput(data.youtube) : '',
    };

    setIsSubmitting(true);
    
    const timeoutId = setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: 'Request timeout',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }, 30000);
    
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { data: result, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...sanitizedData,
          formType: 'brand-partnership'
        }
      });

      if (error) {
        throw error;
      }
      
      toast({
        title: 'Application received!',
        description: 'Thank you for your interest! We\'ll review your submission and reach out within 2-3 business days.',
      });
      
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  const handleBookPayment = async () => {
    const email = form.getValues('email');
    const brandName = form.getValues('brandName');
    
    if (!email || !brandName) {
      toast({
        title: 'Missing info',
        description: 'Please fill in your email and brand name above first.',
        variant: 'destructive',
      });
      return;
    }

    setIsBookingPayment(true);
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { data, error } = await supabase.functions.invoke('create-tiktok-live-payment', {
        body: { email, brandName }
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsBookingPayment(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Get Your Brand Featured | Phresh Phactory Afro-Descendant Directory"
        description="We post your products and host live shopping events to drive sales for Afro-descendant brands. Apply to get featured."
        keywords="Afro-descendant brand feature, live shopping, product spotlight, Afro-descendant created brands, brand visibility, diaspora commerce"
        canonicalUrl="https://phreshphactory.com/brands"
      />
      
      {/* Hero Section */}
      <section className="bg-background py-20 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              We Post Your Products &amp; Host Live Shopping
            </h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Get your brand in front of a buying audience. We feature Afro-descendant products 
              through curated content, video reviews, and live shopping events across our platforms.
            </p>
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg"
              onClick={() => {
                const formSection = document.getElementById('brand-application');
                if (formSection) {
                  formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Apply to Get Featured
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 bg-muted">
        <div className="container-custom max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">How We Feature Your Brand</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Multiple touchpoints designed to drive awareness and sales for your products.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-3">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Product Spotlights</h3>
              <p className="text-muted-foreground">Your products posted on our Afro-descendant created brands and products directory with shopping links, brand story, and curated positioning.</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Tv className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Live Shopping Events</h3>
              <p className="text-muted-foreground">We host live shopping sessions showcasing your products to an engaged, ready-to-buy audience.</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Video className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Video Reviews</h3>
              <p className="text-muted-foreground">Professional product review videos shared across YouTube and social media channels.</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Written Features</h3>
              <p className="text-muted-foreground">Blog posts and editorial content telling your brand story with embedded shopping links.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-background">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Why Brands Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-muted border border-border rounded-lg p-8 space-y-4">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Built for Diaspora Commerce</h3>
              <p className="text-muted-foreground">
                5+ years operating at the intersection of Afro-descendant brands and digital commerce. 
                We understand the audience, the culture, and what drives purchasing decisions.
              </p>
            </div>
            <div className="bg-muted border border-border rounded-lg p-8 space-y-4">
              <Video className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">End-to-End Content Production</h3>
              <p className="text-muted-foreground">
                We handle everything — product photography concepts, video production, scriptwriting, 
                editing, and distribution. You send the product, we do the rest.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're launching a new product or looking for ongoing brand visibility, 
              we have packages that fit. Fill out one simple application below and we'll 
              match you with the right option.
            </p>
          </div>
        </div>
      </section>
      
      {/* Application Form */}
      <section id="brand-application" className="py-16 bg-muted">
        <div className="container-custom max-w-3xl">
          <div className="animate-on-scroll">
            <h2 className="text-3xl font-bold mb-4 text-center text-foreground">Apply to Get Featured</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              One application — we'll review your brand and reach out with the best options for your goals and budget.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Smith" {...field} />
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
                          <Input placeholder="you@yourbrand.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="brandName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Brand Co." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Website or Social Link</FormLabel>
                        <FormControl>
                          <Input placeholder="https://yourbrand.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Social Media Handles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram @</FormLabel>
                        <FormControl>
                          <Input placeholder="@yourbrand" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tiktok"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TikTok @</FormLabel>
                        <FormControl>
                          <Input placeholder="@yourbrand" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="youtube"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>YouTube @</FormLabel>
                        <FormControl>
                          <Input placeholder="@yourbrand" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* TikTok Shop Question */}
                <FormField
                  control={form.control}
                  name="hasTiktokShop"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you have a TikTok Shop set up already?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes-products-ready">Yes — products are loaded and ready to sell</SelectItem>
                          <SelectItem value="yes-setting-up">Yes — but still setting up products</SelectItem>
                          <SelectItem value="no-interested">No — but I'm interested in setting one up</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tell Us About Your Product(s)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What do you sell? What makes it special? Include any links to your product pages." 
                          className="min-h-24"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interestedIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What are you most interested in?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="product-spotlight">Product Spotlight (directory listing)</SelectItem>
                          <SelectItem value="live-shopping">Live Shopping Event</SelectItem>
                          <SelectItem value="tiktok-shop-live">TikTok Shop Hosted Live Session ($199)</SelectItem>
                          <SelectItem value="video-review">Video Review / Reel</SelectItem>
                          <SelectItem value="written-feature">Written Feature / Blog Post</SelectItem>
                          <SelectItem value="full-package">Full Package (all of the above)</SelectItem>
                          <SelectItem value="not-sure">Not Sure — Help Me Decide</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* TikTok Shop Hosted Live Session - shown when selected */}
                {watchInterestedIn === 'tiktok-shop-live' && (
                  <div className="bg-background border border-border rounded-xl p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 text-primary p-2 rounded-lg">
                        <Tv className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">TikTok Shop Hosted Live Session</h3>
                        <p className="text-sm text-muted-foreground">45-minute hosted session — you showcase, we host &amp; interview</p>
                      </div>
                      <span className="ml-auto text-2xl font-bold text-foreground">$199</span>
                    </div>
                    
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>45-minute hosted session — you showcase your products, we host &amp; interview</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Video className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Professional hosting to keep the energy up and drive sales</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Broadcast to our engaged audience ready to buy</span>
                      </li>
                    </ul>

                    {/* Calendly Scheduling */}
                    <div className="rounded-lg overflow-hidden border border-border">
                      <iframe 
                        src="https://calendly.com/phreshphactory/tiktok-shop-live?embed_type=Inline&embed_domain=phreshphactory.com"
                        width="100%" 
                        height="630" 
                        frameBorder="0"
                        title="Book your TikTok Shop Live Session"
                        className="w-full"
                        style={{ minWidth: '320px' }}
                      />
                    </div>

                    <Button 
                      type="button"
                      size="lg" 
                      className="w-full text-lg py-6" 
                      onClick={handleBookPayment}
                      disabled={isBookingPayment}
                    >
                      <DollarSign className="w-5 h-5 mr-2" />
                      {isBookingPayment ? 'Processing...' : 'Pay $199 & Confirm Booking'}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Secure payment via Stripe. Pick a date above, then pay to confirm.
                    </p>
                  </div>
                )}
                
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is your budget range?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="under-500">Under $500</SelectItem>
                          <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                          <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                          <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                          <SelectItem value="5000-plus">$5,000+</SelectItem>
                          <SelectItem value="flexible">Flexible / Open to discussion</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anything else we should know? (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Timeline, upcoming launches, specific goals..." 
                          className="min-h-24"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="honeypot"
                  render={({ field }) => (
                    <div style={{ display: 'none' }}>
                      <Input {...field} tabIndex={-1} autoComplete="off" />
                    </div>
                  )}
                />
                
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterForm
        title="Brand Growth Insights for Afro-Descendant Businesses"
        subtitle="Get practical strategies on brand partnerships, content marketing, and scaling your Afro-descendant business through strategic visibility."
        benefits={[
          "Live shopping event announcements",
          "Brand feature opportunities",
          "Content marketing strategies that work",
          "Exclusive invites to brand collaboration events"
        ]}
      />
    </>
  );
};

export default BrandPartnership;
