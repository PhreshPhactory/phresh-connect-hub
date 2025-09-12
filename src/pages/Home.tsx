
import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterForm from '@/components/NewsletterForm';
import CallToAction from '@/components/CallToAction';

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
        <WhatWeDoSection />
        <TestimonialsSection />
        <ResultsSection />

      <NewsletterForm 
        title="Join leaders getting strategic insights"
        subtitle="Weekly strategies on transformation, global talent, and building high-performance teams."
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
        title="Ready for strategic business transformation?"
        subtitle="Let's build the systems and teams your business needs to scale."
        primaryButtonText="Book a Discovery Call"
        primaryButtonLink="http://calendly.com/PhreshPhactory"
        secondaryButtonText="Explore Services"
        secondaryButtonLink="/services"
        dark={true}
        className="py-24"
      />
      
      <YouTubeSection />
      
      </main>
    </>
  );
};

export default Home;
