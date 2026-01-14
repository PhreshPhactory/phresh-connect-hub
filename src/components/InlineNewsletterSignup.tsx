import React, { useState } from 'react';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface InlineNewsletterSignupProps {
  source?: string;
  variant?: 'default' | 'minimal' | 'hero';
}

const InlineNewsletterSignup = ({ 
  source = 'inline_shop', 
  variant = 'default' 
}: InlineNewsletterSignupProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({
        email: email.toLowerCase().trim(),
        source,
      });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "You're already on the list!",
            description: "Check your inbox for our latest picks.",
          });
          setIsSuccess(true);
        } else {
          throw error;
        }
      } else {
        toast({
          title: "You're in! 🎉",
          description: "Welcome to The Product Digest.",
        });
        setIsSuccess(true);
      }
      
      setEmail('');
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`text-center py-6 ${variant === 'hero' ? 'bg-primary/5 rounded-2xl px-6' : ''}`}>
        <div className="inline-flex items-center gap-2 text-primary font-medium">
          <Sparkles className="w-5 h-5" />
          <span>You're on the list! Check your inbox soon.</span>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Get the weekly digest..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          className="flex-1"
        />
        <Button type="submit" size="sm" disabled={isSubmitting}>
          {isSubmitting ? '...' : <ArrowRight className="w-4 h-4" />}
        </Button>
      </form>
    );
  }

  if (variant === 'hero') {
    return (
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 md:p-8 border border-primary/10">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            The Product Digest
          </h3>
          <p className="text-muted-foreground mb-6">
            Curated Black-owned brands, gift ideas & hidden gems—delivered weekly.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="h-12 text-base flex-1"
            />
            <Button 
              type="submit" 
              size="lg"
              disabled={isSubmitting}
              className="h-12 px-6 font-semibold"
            >
              {isSubmitting ? 'Joining...' : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Subscribe
                </>
              )}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            Free forever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Mail className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-1">Get The Product Digest</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Weekly picks of Black-owned brands you'll actually want to shop.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="flex-1"
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '...' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InlineNewsletterSignup;
