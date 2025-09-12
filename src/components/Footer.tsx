import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/Logo';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');

  const handleSubscribe = (e: React.FormEvent) => {
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

  return (
    <footer className="bg-primary text-primary-foreground pt-16 sm:pt-20 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Column 1: Logo and about */}
          <div className="lg:col-span-1">
            <div className="hover:opacity-80 transition-opacity duration-300 mb-6 lg:mb-8">
              <Logo className="max-w-[125px] h-auto" textColor="white" />
            </div>
            <p className="text-white mb-6 lg:mb-8 text-base lg:text-lg leading-relaxed">
              Your startup's secret weapon for scaling without chaos.
            </p>
            <div className="flex space-x-4 lg:space-x-6">
              <a href="https://linkedin.com/company/phresh-phactory" target="_blank" rel="noopener noreferrer" className="hover:text-tertiary transition-all duration-300 hover:scale-110 p-2">
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://www.youtube.com/@PhreshPhactoryTV" target="_blank" rel="noopener noreferrer" className="hover:text-tertiary transition-all duration-300 hover:scale-110 p-2">
                <Youtube size={24} />
                <span className="sr-only">YouTube</span>
              </a>
              <a href="https://instagram.com/phreshphactory" target="_blank" rel="noopener noreferrer" className="hover:text-tertiary transition-all duration-300 hover:scale-110 p-2">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          {/* Column 2: Company Links */}
          <div className="lg:col-span-1">
            <h3 className="font-medium text-lg lg:text-xl mb-4 lg:mb-6 text-white">Company</h3>
            <ul className="space-y-3 lg:space-y-4">
              <li>
                <Link to="/" className="text-white hover:text-tertiary transition-colors duration-300 text-base lg:text-lg block py-1">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-tertiary transition-colors duration-300 text-base lg:text-lg block py-1">About</Link>
              </li>
              <li>
                <Link to="/services" className="text-white hover:text-tertiary transition-colors duration-300 text-base lg:text-lg block py-1">Services</Link>
              </li>
              <li>
                <Link to="/packages" className="text-white hover:text-tertiary transition-colors duration-300 text-base lg:text-lg block py-1">Packages</Link>
              </li>
              <li>
                <Link to="/blog" className="text-white hover:text-tertiary transition-colors duration-300 text-base lg:text-lg block py-1">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:text-tertiary transition-colors duration-300 text-base lg:text-lg block py-1">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Resources */}
          <div className="lg:col-span-1">
            <h3 className="font-medium text-lg lg:text-xl mb-4 lg:mb-6 text-white">Resources</h3>
            <ul className="space-y-3 lg:space-y-4">
              <li>
                <Link to="/remote-teams" className="text-white hover:text-tertiary transition-colors duration-300 text-base lg:text-lg block py-1">Remote Teams</Link>
              </li>
              <li>
                <Link to="/blog" className="text-white hover:text-tertiary transition-colors duration-300 text-base lg:text-lg block py-1">Hiring Tips</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="font-medium text-lg lg:text-xl mb-4 lg:mb-6 text-white">Get Ops Insights</h3>
            <p className="text-white mb-4 lg:mb-6 text-base lg:text-lg">
              Join 500+ founders getting practical ops strategies, delivered weekly.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex flex-col gap-3">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="bg-secondary border-secondary focus:border-tertiary text-primary-foreground placeholder:text-muted-foreground h-12 text-base" 
                />
                <Button type="submit" className="bg-tertiary hover:bg-tertiary/90 text-primary transition-all duration-300 hover:scale-105 h-12 text-base font-medium">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-6 lg:pt-8 border-t border-muted">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-white text-base lg:text-lg text-center lg:text-left">
              © {new Date().getFullYear()} Phresh Phactory, Inc. All rights reserved.
            </p>
            <div>
              <ul className="flex flex-col sm:flex-row gap-4 lg:gap-8 text-base lg:text-lg">
                <li>
                  <Link to="/privacy" className="text-white hover:text-tertiary transition-colors duration-300 block py-1">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
