
import React from 'react';
import { Briefcase, Building, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceCard from '@/components/ServiceCard';
import SectionTitle from '@/components/SectionTitle';

const WhatWeDoSection = () => {
  return (
    <section className="py-10 px-6 sm:py-24 sm:px-0 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-black section-title-accent center text-[40px] leading-[50px] sm:text-[48px] md:text-[64px] sm:leading-tight">
            Strategic Business Transformation
          </h2>
          <p className="text-xl md:text-2xl text-jet-gray font-heading font-medium mb-8 max-w-4xl mx-auto leading-relaxed">
            Having flexible workforces aren't a fallback. They're your competitive edge. We build systems and teams that reduce pressure, and unlock long-term growth.
          </p>
        </div>
        
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 stagger-children">
          <ServiceCard
            icon={<Briefcase className="w-12 h-12" />}
            title="Fractional Executive Leadership"
            description="High-level strategy and hands-on transformation, without the full-time overhead."
            link="/services/fractional-leadership"
            className="card-enhanced hover-lift glow-tertiary"
          />
          
          <ServiceCard
            icon={<Building className="w-12 h-12" />}
            title="Global Talent Teams"
            description="We source, hire, and manage top-tier talent across Africa, America and the Caribbean: not just to check a box, but to raise the standard."
            link="/services/global-talent"
            className="card-enhanced hover-lift glow-tertiary"
          />
          
          <ServiceCard
            icon={<Star className="w-12 h-12" />}
            title="Legacy Business Transformation"
            description="We restructure, digitize, and modernize operations so your business is easier to run, scale, or pass on."
            link="/services/legacy-transformation"
            className="card-enhanced hover-lift glow-tertiary"
          />
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
