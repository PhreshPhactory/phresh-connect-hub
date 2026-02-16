import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Please enter a valid email",
        description: "An email address is required to subscribe.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: email.trim().toLowerCase(),
          source: 'footer-product-digest',
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already subscribed",
            description: "This email is already on our list!",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        try {
          await supabase.functions.invoke('send-welcome-email', {
            body: {
              email: email.trim().toLowerCase(),
              source: 'footer-product-digest',
            },
          });
        } catch (emailError) {
          console.error('Error sending welcome email:', emailError);
        }

        toast({
          title: "You're in!",
          description: "Welcome to The Product Digest. Check your inbox!",
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Brands', path: '/brands' },
    { label: 'Affiliates', path: '/Affiliate' },
    { label: 'Blueprint', path: '/affiliate-sales-blueprint' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  const TikTokIcon = ({ size = 22 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.16z"/>
    </svg>
  );

  const socials = [
    { icon: Linkedin, href: 'https://www.linkedin.com/newsletters/phresh-phactory-growth-notes-7320251645966061568/', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://www.youtube.com/@PhreshPhactoryTV', label: 'YouTube' },
    { icon: Instagram, href: 'https://www.instagram.com/phreshphactorytv', label: 'Instagram' },
    { icon: TikTokIcon, href: 'https://www.tiktok.com/@phreshphactorytv', label: 'TikTok' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter CTA Band */}
      <div className="border-b border-muted-foreground/20 bg-primary-foreground/5">
        <div className="container-custom py-16 lg:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-tertiary font-semibold tracking-widest uppercase text-sm mb-3">
              Join the Newsletter
            </p>
            <h3 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Culture and Commerce
            </h3>
            <p className="text-primary-foreground/80 text-lg lg:text-xl leading-relaxed mb-4">
              Watch our LIVE product showcases. Then receive the curated collection of Afro-descendant created products directly in your inbox: every brand vetted, every selection intentional.
            </p>
            <a
              href="https://www.tiktok.com/@phreshphactorytv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-tertiary hover:text-tertiary/80 font-semibold text-base underline underline-offset-4 mb-8 transition-colors duration-300"
            >
              Watch the LIVES on TikTok
            </a>
            <form onSubmit={handleSubscribe} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-primary-foreground/10 border-primary-foreground/30 focus:border-tertiary text-primary-foreground placeholder:text-primary-foreground/50 h-14 text-lg flex-1"
                />
                <Button type="submit" disabled={isSubmitting} className="bg-tertiary hover:bg-tertiary/90 text-primary h-14 px-8 font-semibold text-base shrink-0">
                  {isSubmitting ? 'Subscribing...' : 'Get the Collection'}
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </div>
              <p className="text-primary-foreground/50 text-sm mt-4">
                Curated selections. No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
          {/* Brand */}
          <div className="lg:max-w-xs">
            <div className="mb-5">
              <Logo className="max-w-[120px] h-auto" textColor="white" />
            </div>
            <p className="text-primary-foreground/70 text-base leading-relaxed mb-6">
              Your startup's secret weapon for scaling without chaos.
            </p>
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/60 hover:text-tertiary transition-colors duration-300 p-1.5"
                >
                  <Icon size={22} />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3 lg:gap-x-10">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="text-primary-foreground/70 hover:text-tertiary transition-colors duration-300 text-base py-1"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-muted-foreground/20">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p>© {new Date().getFullYear()} Phresh Phactory, Inc. All rights reserved.</p>
            <Link to="/privacy" className="hover:text-tertiary transition-colors duration-300">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
