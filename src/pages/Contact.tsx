import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SectionTitle from '@/components/SectionTitle';
import { useToast } from '@/hooks/use-toast';
import SEOHead from '@/components/SEOHead';

import { emailSchema, nameSchema, urlSchema, challengesSchema, messageSchema, createRateLimiter, validateHoneypot, sanitizeInput } from '@/utils/security';

const formSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  website: urlSchema,
  companyStage: z.string().min(1, { message: 'Please select your startup stage.' }),
  challenges: challengesSchema,
  serviceInterest: z.string().min(1, { message: 'Please select a service you\'re interested in.' }),
  message: messageSchema,
  honeypot: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const rateLimiter = createRateLimiter(3, 600000); // 3 attempts per 10 minutes

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      website: '',
      companyStage: '',
      challenges: '',
      serviceInterest: '',
      message: '',
      honeypot: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log('=== FORM SUBMISSION START ===');
    
    // Honeypot validation
    if (!validateHoneypot(data.honeypot || '')) {
      return; // Silent failure for bots
    }

    // Rate limiting
    if (!rateLimiter(data.email)) {
      toast({
        title: 'Too many attempts',
        description: 'Please wait before submitting again.',
        variant: 'destructive',
      });
      return;
    }

    // Sanitize inputs
    const sanitizedData = {
      ...data,
      name: sanitizeInput(data.name),
      challenges: sanitizeInput(data.challenges),
      message: data.message ? sanitizeInput(data.message) : ''
    };

    console.log('Contact form submitted with data:', sanitizedData);
    console.log('Setting isSubmitting to true');
    setIsSubmitting(true);
    
    // Add timeout to prevent stuck state
    const timeoutId = setTimeout(() => {
      console.log('=== TIMEOUT TRIGGERED ===');
      console.log('Form submission timeout - resetting button state');
      setIsSubmitting(false);
      toast({
        title: 'Request timeout',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }, 30000); // 30 second timeout
    
    try {
      console.log('Importing supabase client...');
      const { supabase } = await import('@/integrations/supabase/client');
      
      console.log('Calling send-contact-email function...');
      const { data: result, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...sanitizedData,
          formType: 'contact'
        }
      });

      console.log('Function response:', { result, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }
      
      console.log('Email sent successfully!');
      toast({
        title: 'Form submitted successfully!',
        description: 'We\'ll be in touch with you shortly.',
      });
      
      console.log('Resetting form...');
      form.reset();
    } catch (error) {
      console.error('=== ERROR CAUGHT ===');
      console.error('Error submitting form:', error);
      
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      console.log('=== FINALLY BLOCK ===');
      console.log('Clearing timeout and resetting isSubmitting');
      clearTimeout(timeoutId);
      setIsSubmitting(false);
      console.log('=== FORM SUBMISSION END ===');
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Phresh Phactory | Start Your Growth Journey"
        description="Ready to grow? Contact Phresh Phactory to discuss strategic business solutions, fractional leadership, and building your global talent team."
        keywords="Contact Phresh Phactory, Get a Consultation, Partner for Growth, Business Solutions, Speak to an Expert"
        canonicalUrl="https://phreshphactory.co/contact"
      />
      {/* Hero Section */}
      <section className="bg-background py-15 md:py-15">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Let's Start the Conversation</h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Schedule a discovery call or send us a message to explore how we can help your startup.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-15 bg-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-on-scroll">
              <h2 className="text-3xl font-medium mb-6 text-foreground">Get in Touch</h2>
              <p className="mb-8 text-muted-foreground">
                Fill out the form and we'll be in touch within one business day to schedule your discovery call or answer your questions.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-teal text-teal-foreground p-3 rounded-full mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1 text-foreground">Call Us</h3>
                    <a href="tel:+18328523367" className="text-teal hover:text-teal-600">
                      832-852-3367
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-teal text-teal-foreground p-3 rounded-full mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1 text-foreground">Email</h3>
                    <a href="mailto:Info@PhreshPhactory.co" className="text-teal hover:text-teal-600">
                      Info@PhreshPhactory.co
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-teal text-teal-foreground p-3 rounded-full mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1 text-foreground">Deliveries</h3>
                    <p className="text-muted-foreground">
                      3139 W. Holcombe Blvd. #364<br />
                      Houston, TX 77025
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-teal text-teal-foreground p-3 rounded-full mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1 text-foreground">Social</h3>
                    <div className="flex space-x-3">
                      <a href="https://linkedin.com/company/phresh-phactory" target="_blank" rel="noopener noreferrer" className="text-teal hover:text-teal-600">
                        LinkedIn
                      </a>
                      <span className="text-muted-foreground">•</span>
                      <a href="https://www.youtube.com/@PhreshPhactoryTV" target="_blank" rel="noopener noreferrer" className="text-teal hover:text-teal-600">
                        YouTube
                      </a>
                      <span className="text-muted-foreground">•</span>
                      <a href="https://instagram.com/phreshphactory" target="_blank" rel="noopener noreferrer" className="text-teal hover:text-teal-600">
                        Instagram
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-teal text-teal-foreground p-3 rounded-full mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1 text-foreground">Response Time</h3>
                    <p className="text-muted-foreground">
                      We typically respond within 24 hours on business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-on-scroll">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
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
                            <Input placeholder="you@company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://yourcompany.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="companyStage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Startup Stage</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your company stage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pre-seed">Pre-Seed / Idea Stage</SelectItem>
                            <SelectItem value="seed">Seed / Early Stage</SelectItem>
                            <SelectItem value="series-a">Series A / Growth Stage</SelectItem>
                            <SelectItem value="series-b-plus">Series B+ / Scale Stage</SelectItem>
                            <SelectItem value="established">Established Business</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="challenges"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What operational challenges are you facing?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="E.g., We're struggling with team coordination, unclear processes, etc." 
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
                    name="serviceInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Which service are you most interested in?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="audit">Starter Audit</SelectItem>
                            <SelectItem value="fractional">Fractional Executive</SelectItem>
                            <SelectItem value="phreelance">Phreelance™ Team Management</SelectItem>
                            <SelectItem value="hiring">Hiring & Onboarding Support</SelectItem>
                            <SelectItem value="advisory">Advisory Board Role</SelectItem>
                            <SelectItem value="feature-brand">Feature My Brand</SelectItem>
                            <SelectItem value="not-sure">Not Sure Yet</SelectItem>
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
                        <FormLabel>Additional Information (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any other details you'd like to share..." 
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Honeypot field - hidden from users */}
                  <FormField
                    control={form.control}
                    name="honeypot"
                    render={({ field }) => (
                      <div style={{ display: 'none' }}>
                        <Input {...field} tabIndex={-1} autoComplete="off" />
                      </div>
                    )}
                  />
                  
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit & Schedule'}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
      
    </>
  );
};

export default Contact;
