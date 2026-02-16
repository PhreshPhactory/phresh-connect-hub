import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Thanks for subscribing!",
        description: "You'll now receive our weekly ops insights."
      });
      setEmail('');
    } else {
      toast({
        title: "Please enter your email",
        description: "An email address is required to subscribe.",
        variant: "destructive"
      });
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

  const socials = [
    { icon: Linkedin, href: 'https://linkedin.com/company/phresh-phactory', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://www.youtube.com/@PhreshPhactoryTV', label: 'YouTube' },
    { icon: Instagram, href: 'https://instagram.com/phreshphactory', label: 'Instagram' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter CTA Band */}
      <div className="border-b border-muted-foreground/20">
        <div className="container-custom py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-2">
                Get Ops Insights
              </h3>
              <p className="text-primary-foreground/70 text-base lg:text-lg">
                Join 500+ founders getting practical ops strategies, delivered weekly.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="w-full max-w-md">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-primary-foreground/10 border-primary-foreground/20 focus:border-tertiary text-primary-foreground placeholder:text-primary-foreground/50 h-12 text-base flex-1"
                />
                <Button type="submit" className="bg-tertiary hover:bg-tertiary/90 text-primary h-12 px-6 font-medium shrink-0">
                  <ArrowRight size={20} />
                  <span className="sr-only">Subscribe</span>
                </Button>
              </div>
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
