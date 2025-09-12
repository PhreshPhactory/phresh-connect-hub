import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CallToActionProps {
  title: string;
  subtitle?: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  className?: string;
  dark?: boolean;
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  className = '',
  dark = false,
}) => {
  const bgColor = dark ? 'bg-primary' : 'bg-muted';
  const textColor = dark ? 'text-primary-foreground' : 'text-foreground';
  
  return (
    <section className={`${bgColor} ${textColor} py-10 px-6 sm:py-20 md:py-24 sm:px-4 animate-on-scroll ${className}`}>
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-medium mb-6 ${dark ? 'text-primary-foreground' : ''} text-[24px] leading-[32px] sm:text-3xl md:text-4xl lg:text-5xl sm:leading-9 md:leading-10 lg:leading-none`}>
            {title}
          </h2>
          {subtitle && <p className={`mb-10 text-xl ${dark ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{subtitle}</p>}
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-tertiary hover:bg-tertiary/90 text-primary px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center justify-center">
              <Link to={primaryButtonLink}>{primaryButtonText}</Link>
            </Button>
            
            {secondaryButtonText && secondaryButtonLink && (
              <Button asChild variant="outline" size="lg" className={`px-8 py-6 text-lg font-medium transition-all duration-300 ${dark ? 'bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary' : ''}`}>
                <Link to={secondaryButtonLink}>{secondaryButtonText}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;