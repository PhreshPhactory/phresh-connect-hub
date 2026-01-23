
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';

const LandingPageLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />
      <main className="min-h-screen bg-background text-foreground">
        <Outlet />
      </main>
      
      {/* Minimal footer with link to Kiera's profile */}
      <footer className="bg-brand-charcoal text-white py-8">
        <div className="container-custom text-center">
          <Link 
            to="/KieraH" 
            className="text-brand-gold hover:text-brand-gold/80 transition-colors font-medium"
          >
            Meet Kiera H. →
          </Link>
          <p className="text-sm text-gray-400 mt-4">
            © {new Date().getFullYear()} Phresh Phactory. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageLayout;
