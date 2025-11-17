
import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterForm from '@/components/NewsletterForm';
import CallToAction from '@/components/CallToAction';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import FeaturedBrands from '@/components/FeaturedBrands';

import HeroSection from '@/components/home/HeroSection';
import WhatWeDoSection from '@/components/home/WhatWeDoSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ResultsSection from '@/components/home/ResultsSection';
import YouTubeSection from '@/components/home/YouTubeSection';
import SEOHead from '@/components/SEOHead';

const Home = () => {
  return (
    <>
      <SEOHead 
        title="Phresh Phactory | Your Business Transformation & Growth Strategy"
        description="Phresh Phactory powers growth with business transformation, fractional leadership, global talent, legacy modernization, and scalable operations."
        keywords="business transformation, fractional leadership, global talent, legacy modernization, scalable operations, growth strategy, C-Suite executives, digital transformation"
        canonicalUrl="https://phreshphactory.co/"
      />
       <main>
        <HeroSection />
        
        {/* Early CTA for engagement */}
        <CallToAction
          title="Ready for strategic business transformation?"
          subtitle="Book a free discovery call to discuss your growth challenges."
          primaryButtonText="Book a Discovery Call"
          primaryButtonLink="http://calendly.com/PhreshPhactory"
          secondaryButtonText="Explore Services"
          secondaryButtonLink="/services"
          dark={false}
          className="py-16"
        />
        
        {/* Video content moved higher for engagement */}
        <YouTubeSection />
        
        <WhatWeDoSection />
        
        {/* Social proof early in the journey */}
        <TestimonialsSection />
        <ResultsSection />

      <NewsletterForm
        title="Join leaders from culturally impactful, global organizations and brands"
        subtitle="Weekly strategies on transformation, global talent, and building high-performance teams—insights for executives and brand owners."
        benefits={[
          "Strategic frameworks",
          "Global talent insights", 
          "Transformation guides", 
          "Leadership principles"
        ]}
        className="bg-brand-smoke"
        dark={false}
      />
      
      <CallToAction
        title="Let's build the systems and teams you need to scale"
        subtitle="Connect with our team to explore fractional leadership, global talent, and transformation services."
        primaryButtonText="Schedule a Call"
        primaryButtonLink="http://calendly.com/PhreshPhactory"
        secondaryButtonText="View All Services"
        secondaryButtonLink="/services"
        dark={true}
        className="py-24"
      />
      
      {/* Exit intent popup */}
      <ExitIntentPopup />
      </main>
    </>
  );
};

export default Home;
