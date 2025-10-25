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
  category: z.string().min(1, { message: 'Please select a category.' }),
  stage: z.string().min(1, { message: 'Please select your brand stage.' }),
  socialMedia: z.string().max(500).optional(),
  helpNeeded: z.string().min(10, { message: 'Please describe what help you need (minimum 10 characters).' }).max(1000),
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
      category: '',
      stage: '',
      socialMedia: '',
      helpNeeded: '',
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
      helpNeeded: sanitizeInput(data.helpNeeded),
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
        title: 'Application submitted successfully!',
        description: 'We\'ll review your brand and get back to you within 2-3 business days.',
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
        title="Feature Your Black-Owned Brand | Phresh Phactory Buy Black Directory"
        description="Get your Black-owned brand featured in Phresh Phactory's Buy Black directory. Receive video reviews, written content, and consulting support to grow your business."
        keywords="Feature Black-owned brand, Black business directory, brand partnerships, Black entrepreneurship, business growth support"
        canonicalUrl="https://phreshphactory.co/brand-partnership"
      />
      
      {/* Hero Section */}
      <section className="bg-background py-15 md:py-15">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Feature Your Brand & Get Strategic Support
            </h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Join our Buy Black directory and receive comprehensive brand support including video reviews, 
              content creation, and business consulting to help you grow.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-muted">
        <div className="container-custom max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">What You'll Get</h2>
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
              <h3 className="text-xl font-semibold mb-2 text-foreground">Growth Support</h3>
              <p className="text-muted-foreground">Access to business consulting, operational support, and strategic guidance.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="py-15 bg-background">
        <div className="container-custom max-w-3xl">
          <div className="animate-on-scroll">
            <h2 className="text-3xl font-bold mb-6 text-center text-foreground">Apply to Feature Your Brand</h2>
            <p className="text-center text-muted-foreground mb-8">
              Fill out the form below and we'll review your brand within 2-3 business days.
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
                        <FormLabel>Brand Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://yourbrand.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beauty">Beauty & Cosmetics</SelectItem>
                            <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                            <SelectItem value="home">Home Goods & Decor</SelectItem>
                            <SelectItem value="food">Food & Beverages</SelectItem>
                            <SelectItem value="wellness">Wellness & Health</SelectItem>
                            <SelectItem value="accessories">Accessories & Jewelry</SelectItem>
                            <SelectItem value="gifts">Gifts & Specialty Items</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="stage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Stage</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select stage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pre-launch">Pre-Launch</SelectItem>
                            <SelectItem value="new">New (0-1 year)</SelectItem>
                            <SelectItem value="growing">Growing (1-3 years)</SelectItem>
                            <SelectItem value="established">Established (3+ years)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="socialMedia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Social Media Links (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Instagram, TikTok, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="helpNeeded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What help do you need to grow your brand?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="E.g., Marketing strategy, operations support, team building, systems design, etc." 
                          className="min-h-32"
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
