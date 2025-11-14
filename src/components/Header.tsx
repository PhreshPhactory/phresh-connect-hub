
import React, { useState, useEffect, memo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
  
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Holiday Sprint', path: '/holiday-explained' },
    { label: 'Blueprint', path: '/affiliate-sales-blueprint' },
    { label: 'Services', path: '/services' },
    { label: 'Shop', path: '/shop' },
    { label: 'Brands', path: '/brands' },
    { label: 'Blog', path: '/blog' }
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
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-base xl:text-lg font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 ${
                isActive(item.path) 
                  ? 'text-primary after:scale-x-100' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-4 px-4 xl:px-6">
            <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer">Book a Discovery Call</a>
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="lg:hidden z-50 text-muted-foreground hover:text-primary transition-colors p-2"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        
        {/* Mobile Navigation Panel */}
        {isOpen && (
          <div 
            className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-background z-40 shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden animate-in slide-in-from-left"
          >
            <div className="flex flex-col h-full">
              {/* Header area with logo */}
              <div className="flex items-center justify-between p-6 border-b">
                <Link to="/" onClick={closeMenu}>
                  <Logo className="max-w-[100px] h-auto" />
                </Link>
              </div>
              
              {/* Navigation items */}
              <div className="flex-1 px-6 py-4">
                <nav className="space-y-0">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => handleMenuItemClick(item.path)}
                      className={`block text-lg font-medium py-4 px-2 transition-all duration-200 border-b border-border hover:bg-muted hover:pl-4 ${
                        isActive(item.path) 
                          ? 'text-primary bg-muted' 
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                
                {/* CTA Button */}
                <div className="mt-6 px-2">
                  <Button asChild className="w-full py-3 text-base">
                    <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Book a Discovery Call</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
