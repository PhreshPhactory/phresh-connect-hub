import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold font-heading">
              Phresh<span className="text-tertiary">Phactory</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Powering growth through business transformation, fractional leadership, and strategic innovation.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/fractional-leadership" className="hover:text-tertiary transition-colors">
                  Fractional Leadership
                </Link>
              </li>
              <li>
                <Link to="/services/global-talent" className="hover:text-tertiary transition-colors">
                  Global Talent
                </Link>
              </li>
              <li>
                <Link to="/services/legacy-transformation" className="hover:text-tertiary transition-colors">
                  Legacy Transformation
                </Link>
              </li>
              <li>
                <Link to="/services/systems-design" className="hover:text-tertiary transition-colors">
                  Systems Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-tertiary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-tertiary transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-tertiary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-tertiary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Get Started</h3>
            <p className="text-sm text-primary-foreground/80">
              Ready to transform your business?
            </p>
            <Link 
              to="/contact" 
              className="inline-block btn-tertiary text-sm"
            >
              Start Your Journey
            </Link>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
            <p>&copy; 2024 Phresh Phactory. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-tertiary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-tertiary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;