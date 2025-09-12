
import React from 'react';
import { Clock, TrendingUp, Zap, Target } from 'lucide-react';
import OutcomeCard from '@/components/OutcomeCard';

const ResultsSection = () => {
  return (
    <section className="bg-jet-gray py-10 px-6 sm:py-24 sm:px-0">
      <div className="container-custom">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-white section-title-accent center text-[32px] leading-[40px] sm:text-[48px] md:text-[64px] sm:leading-tight">
            Real Business <span className="text-strategic-gold glow-pulse">Transformation</span>
          </h2>
          <p className="text-xl text-white/90 font-heading font-medium max-w-4xl mx-auto">We had to build structure, implement checks and balances, and create rip cords for quick pivots. That's what high performance looks like.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-children">
          <OutcomeCard
            icon={<Clock className="w-8 h-8 stroke-1" />}
            title="Strategic Advisory"
            description="Advisory services that help you move faster, not slower."
            benefit="Accelerated decision-making"
          />
          
          <OutcomeCard
            icon={<TrendingUp className="w-8 h-8 stroke-1" />}
            title="Global Excellence"
            description="Hiring remotely, globally for over two decades with proven results."
            benefit="Unmatched talent quality"
          />
          
          <OutcomeCard
            icon={<Zap className="w-8 h-8 stroke-1" />}
            title="Strategic Business Transformation"
            description="Learn how we help businesses scale through strategic leadership and global talent management."
            benefit="End-to-end solutions"
          />

          <OutcomeCard
            icon={<Target className="w-8 h-8 stroke-1" />}
            title="Global Talent Excellence"
            description="Learn what roles to fill and how to staff your startup the smart way."
            benefit="Future-ready operations"
          />
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
