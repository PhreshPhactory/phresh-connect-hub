
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { emailSchema, createRateLimiter, validateHoneypot } from '@/utils/security';

interface NewsletterFormProps {
  title?: string;
  subtitle?: string;
  className?: string;
  dark?: boolean;
  benefits?: string[];
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  title = 'Join 500+ founders getting practical ops strategies.',
  subtitle = 'Get weekly insights on managing teams, optimizing operations, and growing without chaos.',
  className = '',
  dark = false,
  benefits = []
}) => {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const { toast } = useToast();

  const rateLimiter = createRateLimiter(5, 300000); // 5 attempts per 5 minutes
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot validation
    if (!validateHoneypot(honeypot)) {
      return; // Silent failure for bots
    }

    // Rate limiting
    if (!rateLimiter(email)) {
      toast({
        title: 'Too many attempts',
        description: 'Please wait before submitting again.',
        variant: 'destructive',
      });
      return;
    }

    // Email validation
    try {
      emailSchema.parse(email);
    } catch (error) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          email,
          formType: 'newsletter'
        }
      });

      if (error) {
        throw error;
      }
      
      toast({
        title: 'Success!',
        description: 'You\'ve been signed up for our newsletter.',
      });
      
      setEmail('');
    } catch (error) {
      console.error('Error submitting newsletter:', error);
      
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  };
  
  const bgColor = dark ? 'bg-primary' : 'bg-muted';
  const textColor = dark ? 'text-primary-foreground' : 'text-foreground';
  
  return (
    <section className={`relative overflow-hidden ${bgColor} ${textColor} py-10 px-6 sm:py-20 md:py-24 sm:px-4 animate-on-scroll ${className}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-tertiary/5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-tertiary/10 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary/10 to-transparent rounded-full translate-y-32 -translate-x-32"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content Section */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${dark ? 'text-white' : 'text-foreground'}`}>
                  {title}
                </h2>
                <p className={`text-lg md:text-xl leading-relaxed ${dark ? 'text-accent/80' : 'text-muted-foreground'}`}>
                  {subtitle}
                </p>
              </div>
              
              {benefits.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start group">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-4 mt-0.5 transition-all duration-300 group-hover:scale-110 ${dark ? 'bg-primary/20' : 'bg-primary/10'}`}>
                        <Check className={`w-4 h-4 ${dark ? 'text-primary' : 'text-primary'}`} />
                      </div>
                      <span className={`text-base font-medium leading-relaxed ${dark ? 'text-accent/90' : 'text-foreground/80'}`}>
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Form Section */}
            <div className="relative">
              <div className={`p-8 md:p-10 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:shadow-2xl ${dark ? 'bg-secondary/20 border-secondary/30' : 'bg-white/80 border-border shadow-xl'}`}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`h-14 text-lg px-6 rounded-xl border-2 transition-all duration-300 focus:scale-[1.02] ${dark ? 'bg-secondary/50 border-secondary/50 text-white placeholder:text-gray-400 focus:border-primary' : 'bg-white border-border focus:border-primary'}`}
                    />
                    {/* Honeypot field - hidden from users */}
                    <div style={{ display: 'none' }}>
                      <input
                        type="text"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-tertiary hover:from-primary/90 hover:to-tertiary/90 text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    >
                      Subscribe
                    </Button>
                  </div>
                  
                  <p className={`text-base text-center ${dark ? 'text-accent/70' : 'text-muted-foreground'}`}>
                    No spam. Unsubscribe at any time.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterForm;
