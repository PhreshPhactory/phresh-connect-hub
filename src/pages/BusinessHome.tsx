
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import NewsletterForm from '@/components/NewsletterForm';
import CallToAction from '@/components/CallToAction';
import FeaturedBrands from '@/components/FeaturedBrands';

import HeroSection from '@/components/home/HeroSection';
import WhatWeDoSection from '@/components/home/WhatWeDoSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ResultsSection from '@/components/home/ResultsSection';
import YouTubeSection from '@/components/home/YouTubeSection';
import EcosystemSection from '@/components/home/EcosystemSection';
import LeadingPlatformsSection from '@/components/home/LeadingPlatformsSection';
import ChoosePathSection from '@/components/home/ChoosePathSection';
import SEOHead from '@/components/SEOHead';

const Home = () => {
  return (
    <>
      <SEOHead 
        title="Phresh Phactory | Your Business Transformation & Growth Strategy"
        description="Phresh Phactory powers growth with business transformation, fractional leadership, global talent, legacy modernization, and scalable operations."
        keywords="business transformation, fractional leadership, global talent, legacy modernization, scalable operations, growth strategy, C-Suite executives, digital transformation"
        canonicalUrl="https://phreshphactory.com/"
      />
       <main>
        <HeroSection />
        
        {/* Video content moved higher for engagement */}
        <YouTubeSection />
        
        {/* Our Ecosystem */}
        <EcosystemSection />
        
        {/* Leading Platforms Work */}
        <LeadingPlatformsSection />
        
        <WhatWeDoSection />
        
        {/* Choose Your Path */}
        <ChoosePathSection />
        
        {/* Social proof */}
        <TestimonialsSection />
        <ResultsSection />

      <NewsletterForm
        title="Join leaders from culturally impactful, global organizations and brands"
        subtitle="Weekly strategies on transformation, global talent, and building high-performance teams: insights for executives and brand owners."
        benefits={[
          "Strategic frameworks",
          "Global talent insights", 
          "Transformation guides", 
          "Leadership principles"
        ]}
        className="bg-brand-smoke"
        dark={false}
      />
      
      <div className="bg-background py-8 text-center">
        <p className="text-muted-foreground mb-3">Prefer LinkedIn?</p>
        <a 
          href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7320251645966061568"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          Subscribe on LinkedIn
        </a>
      </div>
      
      <CallToAction
        title="Let's build the systems and teams you need to scale"
        subtitle="Work with the operational partner behind EatOkra, Afrofiliate, and leading diaspora brands."
        primaryButtonText="Schedule a Call"
        primaryButtonLink="http://calendly.com/PhreshPhactory"
        secondaryButtonText="View All Services"
        secondaryButtonLink="/services"
        dark={true}
        className="py-16"
      />
      </main>
    </>
  );
};

export default Home;
