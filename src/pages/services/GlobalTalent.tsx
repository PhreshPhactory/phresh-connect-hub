import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, Globe, Heart, Award } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import CallToAction from '@/components/CallToAction';

const GlobalTalent = () => {
  return (
    <div className="min-h-screen">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/services" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent-200 to-tertiary-100 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-tertiary-500 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary-500 rounded-full filter blur-3xl opacity-20"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-tertiary-100 p-2 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <div className="bg-tertiary-500 text-white w-12 h-12 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">2</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Global Talent <span className="text-tertiary-500">Excellence</span>
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
              We source, hire, and manage top-tier talent across Africa, America and the Caribbean: not just to check a box, 
              but to raise the standard. Nearly two decades of proven excellence.
            </p>
            <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700 text-white">
              <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer">Book Discovery Call</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Why This Works */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-accent-50 p-8 rounded-lg border-l-4 border-tertiary-500 mb-12">
              <h2 className="text-2xl font-bold text-tertiary-700 mb-4">Why This Works</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When you hire people who are genuinely grateful for the opportunity and bring exceptional skills to the table, 
                you get loyalty, dedication, and performance that's impossible to find elsewhere. We've proven this for nearly 20 years.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="bg-tertiary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-tertiary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Global Reach</h3>
                <p className="text-muted-foreground text-sm">
                  Access to elite talent pools across Africa and the Caribbean
                </p>
              </div>
              <div className="text-center">
                <div className="bg-tertiary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-tertiary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Genuine Commitment</h3>
                <p className="text-muted-foreground text-sm">
                  People who bring out their best when they feel valued and appreciated
                </p>
              </div>
              <div className="text-center">
                <div className="bg-tertiary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-8 h-8 text-tertiary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Proven Results</h3>
                <p className="text-muted-foreground text-sm">
                  Nearly 20 years of building high-performance global teams
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-16 bg-gradient-to-br from-accent-100 to-tertiary-50">
        <div className="container-custom">
          <SectionTitle 
            title="What You Get" 
            subtitle="Enterprise-level talent with the dedication of people who truly appreciate the opportunity" 
            center 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Talent Acquisition</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Elite talent from Africa and the Caribbean</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Cultural fit assessment and screening</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Skills verification and testing</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Reference checks and background verification</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Team Management</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Structured accountability systems</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Ongoing performance management</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Professional development and training</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Team integration and cultural training</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-tertiary-200 p-8 rounded-lg mt-8">
            <h3 className="text-xl font-semibold text-tertiary-700 mb-4">The Difference:</h3>
            <p className="text-muted-foreground leading-relaxed">
              Unlike typical remote hiring, we provide full team integration, cultural training, and ongoing management. 
              You get enterprise-level talent with the dedication of people who truly appreciate the opportunity. Our teams 
              don't just execute. They think, contribute, and take ownership of outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction 
        title="Ready to Build Your Global Team?"
        subtitle="Access elite talent that brings exceptional skills and genuine commitment to your business."
        primaryButtonText="Book Discovery Call"
        primaryButtonLink="http://calendly.com/PhreshPhactory"
        secondaryButtonText="View Pricing"
        secondaryButtonLink="/packages#global-talent"
        dark
      />
    </div>
  );
};

export default GlobalTalent;