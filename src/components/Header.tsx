
import { useState, useEffect, memo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const Header: React.FC = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const handleScroll = () => {
    if (typeof window === 'undefined') return;
    if (window.scrollY > 30) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (typeof document !== 'undefined') {
      if (!isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  };

  const handleMenuItemClick = (path: string) => {
    closeMenu();
    
    // If it's a home page section link, scroll smoothly to the section
    if (typeof document !== 'undefined' && path.startsWith('#') && location.pathname === '/') {
      const sectionId = path.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };
  
  // Shop items with sublabels - visually emphasized
  const shopItems = [
    { label: 'Shop', sublabel: 'Cards & Gifts', path: '/shop' },
    { label: 'Compro', sublabel: 'Tarjetas y Regalos', path: '/compro' },
  ];
  
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Brands', path: '/brands' },
    { label: 'Affiliates', path: '/Affiliate' },
    { label: 'Blueprint', path: '/affiliate-sales-blueprint' }
  ];
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 h-20 md:h-24 flex items-center ${
        isScrolled 
          ? 'bg-background shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex justify-between items-center w-full px-4 sm:px-6">
        <Link to="/" className="z-50 flex-shrink-0">
          <Logo className="max-w-[125px] h-auto" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Shop items - Visually emphasized with sublabels */}
          <div className="flex items-center gap-1 mr-2 px-3 py-1.5 bg-strategic-gold/10 rounded-full border border-strategic-gold/20">
            <ShoppingBag className="w-4 h-4 text-strategic-gold mr-1" />
            {shopItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => handleMenuItemClick(item.path)}
                className={`group flex flex-col items-center px-3 py-1 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-strategic-gold/20 text-strategic-gold'
                    : 'text-foreground hover:bg-strategic-gold/10 hover:text-strategic-gold'
                }`}
              >
                <span className="text-sm font-bold">{item.label}</span>
                <span className="text-[10px] opacity-70 font-medium">{item.sublabel}</span>
              </Link>
            ))}
          </div>
          
          {/* Regular nav items */}
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => handleMenuItemClick(item.path)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'text-tertiary'
                  : 'text-foreground hover:text-tertiary'
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          <Button asChild size="sm" className="ml-3 bg-tertiary hover:bg-tertiary/90 text-primary font-semibold">
            <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer">
              Get Started
            </a>
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden z-50 text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        
        {/* Mobile Navigation */}
        <div 
          className={`fixed inset-0 bg-background/98 backdrop-blur-sm lg:hidden transition-all duration-300 ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
            {/* Shop items first - emphasized on mobile */}
            <div className="flex flex-col items-center gap-3 pb-4 mb-2 border-b border-border/30 w-full max-w-xs">
              <div className="flex items-center gap-2 text-strategic-gold mb-2">
                <ShoppingBag className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">Shop Now</span>
              </div>
              {shopItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => handleMenuItemClick(item.path)}
                  className={`flex flex-col items-center px-6 py-3 rounded-xl w-full transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-strategic-gold/20 text-strategic-gold'
                      : 'text-foreground hover:bg-strategic-gold/10'
                  }`}
                >
                  <span className="text-xl font-bold">{item.label}</span>
                  <span className="text-sm opacity-70">{item.sublabel}</span>
                </Link>
              ))}
            </div>
            
            {/* Regular nav items */}
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => handleMenuItemClick(item.path)}
                className={`text-lg font-medium py-2 transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-tertiary'
                    : 'text-foreground hover:text-tertiary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <Button asChild size="lg" className="mt-4 bg-tertiary hover:bg-tertiary/90 text-primary font-semibold px-8">
              <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer">
                Book a Discovery Call
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
