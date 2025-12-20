import React, { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your newsletter signup logic here
    toast({
      title: "Thanks for subscribing!",
      description: "Check your email for strategic insights.",
    });
    setEmail('');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="max-w-md w-full relative animate-scale-in">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={() => setIsVisible(false)}
        >
          <X className="w-4 h-4" />
        </Button>
        
        <CardHeader>
          <CardTitle className="text-2xl">Get the Product Recap</CardTitle>
          <CardDescription>
            A curated digital magazine featuring the best products from Phresh Phactory TV — with direct shopping links to cards, gifts, and culturally impactful Black-owned brands.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Where should we send the drops?"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              Send Me the Drops
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Featured products. No spam. Unsubscribe anytime.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExitIntentPopup;
