import React, { useState } from 'react';
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

const formSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  brandName: z.string().min(1, { message: 'Brand name is required.' }).max(100),
  website: urlSchema,
  hasJoinedAfrofiliate: z.string().min(1, { message: 'Please confirm if you have joined Afrofiliate.' }),
  interestedInVideoFeature: z.string().min(1, { message: 'Please indicate your interest in video feature.' }),
  interestedInWrittenContent: z.string().min(1, { message: 'Please indicate your interest in written content.' }),
  interestedInGrowthSupport: z.string().min(1, { message: 'Please indicate your interest in growth support.' }),
  interestedInUGC: z.string().min(1, { message: 'Please indicate your interest in UGC.' }),
  interestedInSocialMedia: z.string().min(1, { message: 'Please indicate your interest in social media management.' }),
  otherServices: z.string().max(1000).optional(),
  message: messageSchema,
  honeypot: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const rateLimiter = createRateLimiter(3, 600000);

const BrandPartnership = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      brandName: '',
      website: '',
      hasJoinedAfrofiliate: '',
      interestedInVideoFeature: '',
      interestedInWrittenContent: '',
      interestedInGrowthSupport: '',
      interestedInUGC: '',
      interestedInSocialMedia: '',
      otherServices: '',
      message: '',
      honeypot: '',
    },
  });

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
      otherServices: data.otherServices ? sanitizeInput(data.otherServices) : '',
      message: data.message ? sanitizeInput(data.message) : ''
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
        description: 'Thank you for your interest in partnering with us. We\'ll review your application and reach out within 2-3 business days.',
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

  return (
    <>
      <SEOHead
        title="Brand Feature Services | Phresh Phactory Buy Black Directory"
        description="Partner with Phresh Phactory for professional brand feature services including video reviews, written content, and business consulting."
        keywords="Feature Black-owned brand, Black business directory, brand services, Black entrepreneurship, video reviews, content creation, Afrofiliate"
        canonicalUrl="https://phreshphactory.co/brands"
      />
      
      {/* Hero Section */}
      <section className="bg-background py-15 md:py-15">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Brand Feature Services
            </h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Partner with Phresh Phactory for professional brand feature services including video reviews, 
              written content, and business growth consulting. We work with brands through Afrofiliate&apos;s 
              affiliate program or through direct partnership arrangements.
            </p>
            <Button asChild size="lg" className="mb-4">
              <a 
                href="https://members.afrofiliate.com/advertiser/signup?oid=24&affid=53" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Join Afrofiliate (Optional)
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 bg-muted">
        <div className="container-custom max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">Our Partnership Services</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Select the services that align with your brand&apos;s growth goals in the application form below.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal text-teal-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Video Feature</h3>
              <p className="text-muted-foreground">Professional YouTube video review of your products shared with our engaged audience.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal text-teal-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Written Content</h3>
              <p className="text-muted-foreground">Detailed blog post spotlight with your brand story, products, and shopping links.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal text-teal-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Growth Support (Paid Service)</h3>
              <p className="text-muted-foreground">Business consulting, operational support, and strategic guidance for scaling your brand.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="py-15 bg-background">
        <div className="container-custom max-w-3xl">
          <div className="animate-on-scroll">
            <h2 className="text-3xl font-bold mb-6 text-center text-foreground">Partnership Application</h2>
            <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-3 text-foreground">How It Works:</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <strong>Partnership Options:</strong> We work with brands through{' '}
                  <a 
                    href="https://members.afrofiliate.com/advertiser/signup?oid=24&affid=53" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Afrofiliate&apos;s platform
                  </a>
                  {' '}or through direct arrangements
                </li>
                <li><strong>Professional Services:</strong> Our feature services are premium offerings tailored to your brand&apos;s needs</li>
                <li><strong>Selective Process:</strong> We carefully curate partnerships to ensure the best fit and value for both our audience and your brand</li>
                <li><strong>Next Steps:</strong> After reviewing your application, we&apos;ll reach out within 2-3 business days with pricing and partnership details</li>
              </ul>
            </div>
            
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
                        <FormLabel>Brand Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://yourbrand.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="hasJoinedAfrofiliate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Are you currently on Afrofiliate&apos;s platform?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes">Yes, I&apos;m already listed</SelectItem>
                          <SelectItem value="in-progress">Application in progress</SelectItem>
                          <SelectItem value="not-yet">No, interested in direct partnership</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Which services are you interested in?</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="interestedInVideoFeature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video Feature (Paid)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="maybe">Maybe / Learn More</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="interestedInWrittenContent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Written Content (Paid)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="maybe">Maybe / Learn More</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="interestedInGrowthSupport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Growth Support - Business Consulting (Paid Service)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                            <SelectItem value="maybe">Maybe / Learn More</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="interestedInUGC"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>UGC (User Generated Content) Creation</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="maybe">Maybe / Learn More</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="interestedInSocialMedia"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Social Media Management</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="maybe">Maybe / Learn More</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="otherServices"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Other services you're interested in (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="E.g., Email marketing, influencer partnerships, brand strategy, operations consulting, etc." 
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
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tell Us About Your Brand (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Share your brand story, mission, or any other details..." 
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
    </>
  );
};

export default BrandPartnership;
