import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, ArrowRight } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';

const EcosystemSection = () => {
  return (
    <section className="py-20 px-4 bg-muted">
      <div className="container max-w-6xl mx-auto">
        <SectionTitle
          title="A Two-Sided Ecosystem Built for Diaspora Commerce"
          center
          className="mb-12"
        />
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xl text-muted-foreground leading-relaxed">
            Phresh Phactory doesn't just advise businesses — we build the systems and communities that help them grow.
            Our two community hubs support the entire diaspora commerce ecosystem:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Phreelance Community */}
          <div className="bg-background p-8 rounded-lg border border-border hover:border-primary transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Phreelance</h3>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              For freelancers, affiliates, creators, and remote workers
            </p>
            
            <p className="text-base text-foreground mb-8 leading-relaxed">
              A training community that equips talent to support mission-driven brands and create reliable income streams.
            </p>
            
            <Button asChild className="w-full">
              <a href="https://tinyurl.com/Phreelance-Affiliate" target="_blank" rel="noopener noreferrer">
                Join Phreelance <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Phactory Community */}
          <div className="bg-background p-8 rounded-lg border border-border hover:border-primary transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Phactory</h3>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              For founders, brand owners, and product-based businesses
            </p>
            
            <p className="text-base text-foreground mb-8 leading-relaxed">
              A training community that helps brands get "affiliate-ready," strengthen their digital systems, and make it easier for affiliates to sell their products.
            </p>
            
            <Button asChild className="w-full">
              <a href="https://tinyurl.com/Phactory-Owners" target="_blank" rel="noopener noreferrer">
                Join Phactory <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl font-medium text-foreground">
            Together, they create a dynamic marketplace where brands get support — and support gets brands.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
