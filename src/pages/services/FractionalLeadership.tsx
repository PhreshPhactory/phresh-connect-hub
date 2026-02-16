import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, Users, Target, TrendingUp } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import CallToAction from '@/components/CallToAction';

const FractionalLeadership = () => {
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
                <span className="text-xl font-bold">1</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Fractional Executive <span className="text-tertiary-500">Leadership</span>
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
              High-level strategy and hands-on transformation, without the full-time overhead. 
              Get strategic leadership that accelerates decision-making and drives real results.
            </p>
            <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700 text-white">
              <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer">Book Discovery Call</a>
            </Button>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-accent-50 p-8 rounded-lg border-l-4 border-tertiary-500 mb-12">
              <h2 className="text-2xl font-bold text-tertiary-700 mb-4">The Reality</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                You don't need another consultant who gives you a report and leaves. You need someone who understands your business, 
                makes decisions with you, and stays accountable for the outcomes. That's fractional leadership done right.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Too Expensive</h3>
                <p className="text-muted-foreground text-sm">
                  Full-time C-level executives cost $200K+ plus benefits and equity
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Too Generic</h3>
                <p className="text-muted-foreground text-sm">
                  Traditional consultants deliver reports, not sustained transformation
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Too Slow</h3>
                <p className="text-muted-foreground text-sm">
                  Waiting for the "right time" to hire means missing opportunities
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
            subtitle="Strategic leadership that delivers measurable results, without the overhead" 
            center 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Strategic Services</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Strategic sessions that accelerate decision-making</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Business transformation roadmapping</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>High-performance team structure design</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Systems with built-in accountability</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Ongoing Support</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Weekly strategic guidance and course corrections</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Direct access for urgent strategic decisions</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Quarterly business reviews and planning</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Performance tracking and optimization</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-tertiary-200 p-8 rounded-lg mt-8">
            <h3 className="text-xl font-semibold text-tertiary-700 mb-4">Perfect For:</h3>
            <p className="text-muted-foreground leading-relaxed">
              Growing businesses that need strategic leadership but aren't ready for C-level hires. Companies stuck between 
              "solopreneur" and "enterprise" that need someone to own the transformation process. Organizations ready to scale 
              but lacking the strategic framework to do it systematically.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction 
        title="Ready to Transform Your Business?"
        subtitle="Get the strategic leadership you need to scale without the full-time overhead."
        primaryButtonText="Book Discovery Call"
        primaryButtonLink="http://calendly.com/PhreshPhactory"
        secondaryButtonText="View Pricing"
        secondaryButtonLink="/packages#fractional-exec"
        dark
      />
    </div>
  );
};

export default FractionalLeadership;