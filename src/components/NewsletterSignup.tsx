import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface NewsletterSignupProps {
  source: string;
  title?: string;
  description?: string;
  className?: string;
}

const NewsletterSignup = ({ 
  source, 
  title = "Stay Updated",
  description = "Get strategic insights on affiliate marketing and holiday sales strategies.",
  className = ""
}: NewsletterSignupProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: email.trim().toLowerCase(),
          name: name.trim() || null,
          source,
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already subscribed",
            description: "This email is already on our list!",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        // Send welcome email
        try {
          await supabase.functions.invoke('send-welcome-email', {
            body: {
              email: email.trim().toLowerCase(),
              name: name.trim() || undefined,
              source,
            },
          });
        } catch (emailError) {
          console.error('Error sending welcome email:', emailError);
          // Don't fail the whole subscription if email fails
        }

        toast({
          title: "Success!",
          description: "You've been added to our newsletter. Check your email for a welcome message!",
        });
        setEmail('');
        setName('');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-accent/50 border border-border rounded-lg p-8 ${className}`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        
        <p className="text-muted-foreground mb-6">
          {description}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;