
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { emailSchema, createRateLimiter, validateHoneypot } from '@/utils/security';

const rateLimiter = createRateLimiter(5, 300000);

const AffiliateNewsletter = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateHoneypot(honeypot)) return;

    if (!rateLimiter(email)) {
      toast({ title: 'Too many attempts', description: 'Please wait before submitting again.', variant: 'destructive' });
      return;
    }

    try {
      emailSchema.parse(email);
    } catch {
      toast({ title: 'Invalid Email', description: 'Please enter a valid email address.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      // Fetch country from free IP geolocation API
      let country = 'Unknown';
      try {
        const geoRes = await fetch('https://ipapi.co/json/');
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          country = geoData.country_name || 'Unknown';
        }
      } catch { /* ignore geo errors */ }

      const { error } = await supabase.from('newsletter_subscribers').insert({
        email: email.trim().toLowerCase(),
        name: name.trim() || null,
        source: 'affiliate-newsletter',
        country,
      });

      if (error) {
        if (error.code === '23505') {
          toast({ title: "You're already signed up!", description: 'Check your inbox for the latest updates.' });
          setSubmitted(true);
          return;
        }
        throw error;
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      toast({ title: 'Something went wrong', description: 'Please try again later.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    'Early access to new brand partnerships',
    'Exclusive commission opportunities',
    'Weekly tips on growing affiliate income',
    'Community of Afro-descendant brand advocates',
  ];

  return (
    <>
      <SEOHead
        title="Become an Affiliate | Phresh Phactory"
        description="Join our affiliate newsletter and get exclusive brand partnership opportunities, commission tips, and community access."
      />
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full">
          <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary mb-8 inline-block">
            ← Back to Shop
          </Link>

          {submitted ? (
            <div className="text-center space-y-6 py-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">You're in!</h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Welcome to the affiliate community. Watch your inbox for exclusive brand partnership opportunities.
              </p>
              <Button asChild size="lg" className="mt-4">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                  Earn while you share brands you love.
                </h1>
                <p className="text-lg text-muted-foreground">
                  Sign up for our affiliate newsletter and be the first to know about partnership opportunities with Afro-descendant brands.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground/80">{benefit}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 p-6 md:p-8 rounded-2xl border bg-card shadow-sm">
                <div className="space-y-2">
                  <Label htmlFor="name">Name (optional)</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    maxLength={255}
                  />
                </div>
                <div style={{ display: 'none' }}>
                  <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? 'Signing up...' : 'Join the Affiliate Newsletter'}
                  {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
                <p className="text-xs text-center text-muted-foreground">No spam. Unsubscribe anytime.</p>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AffiliateNewsletter;
