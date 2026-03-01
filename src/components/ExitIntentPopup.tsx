import React, { useState, useEffect } from 'react';
import { X, Mail, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if already shown this session
    const alreadyShown = sessionStorage.getItem('exitPopupShown');
    if (alreadyShown) {
      setHasShown(true);
      return;
    }

    // Desktop: mouse leave detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        showPopup();
      }
    };

    // Mobile: scroll up quickly or time-based trigger
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // User scrolled up significantly (trying to leave)
        if (window.scrollY < lastScrollY - 200 && window.scrollY < 100 && !hasShown) {
          showPopup();
        }
        lastScrollY = window.scrollY;
      }, 100);
    };

    // Time-based fallback: show after 45 seconds if user hasn't signed up
    const timeoutId = setTimeout(() => {
      if (!hasShown) {
        showPopup();
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      clearTimeout(timeoutId);
    };
  }, [hasShown]);

  const showPopup = () => {
    setIsVisible(true);
    setHasShown(true);
    sessionStorage.setItem('exitPopupShown', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Actually save to database
      const { error } = await supabase.from('newsletter_subscribers').insert({
        email: email.toLowerCase().trim(),
        source: 'exit_popup_shop',
      });

      if (error) {
        if (error.code === '23505') {
          // Duplicate email
          toast({
            title: "You're already subscribed!",
            description: "Check your inbox for our latest curated picks.",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Welcome to the Digest! 🎉",
          description: "You'll get curated Afro-descendant brand picks in your inbox.",
        });
      }
      
      setEmail('');
      setIsVisible(false);
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

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm">
      <Card className="max-w-md w-full relative animate-scale-in border-2 border-primary/20 shadow-2xl">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 hover:bg-muted"
          onClick={() => setIsVisible(false)}
        >
          <X className="w-4 h-4" />
        </Button>
        
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-3 w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
            <Gift className="w-7 h-7 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Culture and Commerce</CardTitle>
          <CardDescription className="text-base">
            Get curated Afro-descendant brands, gifts & hidden gems delivered weekly. No spam, just products worth knowing about.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="h-12 text-base"
            />
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Subscribing..."
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Get the Digest (Free)
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Join 100+ shoppers discovering Afro-descendant brands weekly.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExitIntentPopup;
