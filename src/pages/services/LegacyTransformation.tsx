import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, Building, RefreshCw, TrendingUp } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import CallToAction from '@/components/CallToAction';

const LegacyTransformation = () => {
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
                <span className="text-xl font-bold">3</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Legacy Business <span className="text-tertiary-500">Transformation</span>
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
              We restructure, digitize, and modernize operations so your business is easier to run, scale, or pass on.
            </p>
            <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700 text-white">
              <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer">Book Discovery Call</a>
            </Button>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-accent-50 p-8 rounded-lg border-l-4 border-tertiary-500 mb-12">
              <h2 className="text-2xl font-bold text-tertiary-700 mb-4">The Challenge</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Many family businesses hit a wall where they're successful but outdated. The next generation doesn't want to inherit 
                the chaos, and selling isn't viable because the business isn't attractive to buyers. We fix both problems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Building className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Outdated Systems</h3>
                <p className="text-muted-foreground text-sm">
                  Processes that depend on institutional knowledge and manual work
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Succession Problems</h3>
                <p className="text-muted-foreground text-sm">
                  Next generation doesn't want to inherit chaos and complexity
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Low Valuations</h3>
                <p className="text-muted-foreground text-sm">
                  Businesses that are "unsellable" due to operational dependencies
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
            title="What We Transform" 
            subtitle="From chaos to systems, from dependency to independence, from unsellable to valuable" 
            center 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Digital & Operations</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Digital transformation strategy</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Operational restructuring</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Process documentation and standardization</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Scalable systems implementation</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Strategic & Financial</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Exit or succession planning</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Financial optimization and cleanup</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Valuation improvement strategies</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Knowledge transfer systems</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-tertiary-200 p-8 rounded-lg mt-8">
            <h3 className="text-xl font-semibold text-tertiary-700 mb-4">Typical Outcomes:</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Businesses that were "unsellable" become attractive acquisition targets. Family operations that ran on institutional 
              knowledge become systematic and transferable. Usually 2-3x valuation improvement within 18 months.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-tertiary-50 rounded-lg">
                <div className="text-2xl font-bold text-tertiary-600">2-3x</div>
                <div className="text-sm text-muted-foreground">Valuation Increase</div>
              </div>
              <div className="text-center p-4 bg-tertiary-50 rounded-lg">
                <div className="text-2xl font-bold text-tertiary-600">18</div>
                <div className="text-sm text-muted-foreground">Months Timeline</div>
              </div>
              <div className="text-center p-4 bg-tertiary-50 rounded-lg">
                <div className="text-2xl font-bold text-tertiary-600">90%</div>
                <div className="text-sm text-muted-foreground">Process Automation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction 
        title="Ready to Transform Your Legacy Business?"
        subtitle="Turn your business into something worth passing on, scaling, or selling."
        primaryButtonText="Book Discovery Call"
        primaryButtonLink="http://calendly.com/PhreshPhactory"
        secondaryButtonText="View Pricing"
        secondaryButtonLink="/packages#legacy-transformation"
        dark
      />
    </div>
  );
};

export default LegacyTransformation;