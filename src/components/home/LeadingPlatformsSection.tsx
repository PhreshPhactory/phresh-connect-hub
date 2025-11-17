import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';

const LeadingPlatformsSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container max-w-6xl mx-auto">
        <SectionTitle
          title="Our Work With Leading Platforms"
          center
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* EatOkra */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold mb-4">
              EatOkra
              <span className="block text-lg text-muted-foreground font-normal mt-2">
                U.S. – National Platform
              </span>
            </h3>
            
            <ul className="space-y-4">
              {[
                'Operational partner for 5+ years',
                'Manage & maintain national restaurant database',
                'Advise thousands of food business owners 1-on-1',
                'Run vendor advertising campaigns',
                'Write the "EatOkra for Business" B2B newsletter',
                'Support marketplace operations and vendor success'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-lg text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Afrofiliate */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold mb-4">
              Afrofiliate
              <span className="block text-lg text-muted-foreground font-normal mt-2">
                Diaspora Affiliate Network
              </span>
            </h3>
            
            <ul className="space-y-4">
              {[
                'Strategic advisor to the founders',
                'Built a two-sided training community ecosystem (Phactory + Phreelance)',
                'Improved affiliate readiness for both brands and creators',
                'Enhanced clarity, communication, and success across the network'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-lg text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
            Work with the team behind today's diaspora commerce leaders.
          </p>
          <Button asChild size="lg">
            <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer">
              Book a Discovery Call
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LeadingPlatformsSection;
