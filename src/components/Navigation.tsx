import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const services = [
    { name: 'Fractional Leadership', href: '/services/fractional-leadership' },
    { name: 'Global Talent', href: '/services/global-talent' },
    { name: 'Legacy Transformation', href: '/services/legacy-transformation' },
    { name: 'Systems Design', href: '/services/systems-design' },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="text-2xl font-bold font-heading text-primary">
              Phresh<span className="text-tertiary">Phactory</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/shop') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Buy Black
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/about') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              About
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-50">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      to={service.href}
                      className="block px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                      onClick={() => setServicesOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/holiday-explained"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/holiday-explained') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Holiday Sprint
            </Link>
            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/blog') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/contact') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Contact
            </Link>
            
            <Button asChild className="btn-primary">
              <Link to="/holiday-explained">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-border">
            <div className="py-4 space-y-4">
              <Link
                to="/"
                className="block text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="block text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Buy Black
              </Link>
              <Link
                to="/about"
                className="block text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Services</div>
                {services.map((service) => (
                  <Link
                    key={service.href}
                    to={service.href}
                    className="block ml-4 text-sm text-muted-foreground hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
              <Link
                to="/holiday-explained"
                className="block text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Holiday Sprint
              </Link>
              <Link
                to="/blog"
                className="block text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="block text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Button asChild className="btn-primary w-full mt-4">
                <Link to="/holiday-explained">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;