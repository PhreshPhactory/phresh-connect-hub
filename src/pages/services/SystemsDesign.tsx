import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, Settings, Zap, Shield } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import CallToAction from '@/components/CallToAction';

const SystemsDesign = () => {
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
                <span className="text-xl font-bold">4</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              High-Performance <span className="text-tertiary-500">Systems Design</span>
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
              We had to build structure, implement checks and balances, and create rip cords for quick pivots. 
              That's what high performance looks like.
            </p>
            <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700 text-white">
              <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer">Book Discovery Call</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Systems Matter */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-accent-50 p-8 rounded-lg border-l-4 border-tertiary-500 mb-12">
              <h2 className="text-2xl font-bold text-tertiary-700 mb-4">Why Systems Matter</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Great people can't perform without great systems. We don't just build processes — we build intelligent systems 
                that make it easier to do the right thing and harder to make mistakes. Plus built-in pivots when things change.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="bg-tertiary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Settings className="w-8 h-8 text-tertiary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Intelligent Design</h3>
                <p className="text-muted-foreground text-sm">
                  Systems that guide behavior and prevent errors automatically
                </p>
              </div>
              <div className="text-center">
                <div className="bg-tertiary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-tertiary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Quick Pivots</h3>
                <p className="text-muted-foreground text-sm">
                  Built-in "rip cords" for rapid adaptation to changing conditions
                </p>
              </div>
              <div className="text-center">
                <div className="bg-tertiary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-tertiary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Error Prevention</h3>
                <p className="text-muted-foreground text-sm">
                  Quality control built into every step of your processes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-16 bg-gradient-to-br from-accent-100 to-tertiary-50">
        <div className="container-custom">
          <SectionTitle 
            title="What We Build" 
            subtitle="Adaptive systems with flexibility built into the foundation" 
            center 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Core Systems</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Accountability frameworks with quick pivots</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>End-to-end process optimization</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Strategic systems integration</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Quality control and error prevention</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Performance & Scale</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Performance tracking and optimization</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Scalability planning and implementation</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Automated reporting and insights</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-tertiary-500 mr-3 mt-1 flex-shrink-0 h-5 w-5" />
                  <span>Continuous improvement frameworks</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-tertiary-200 p-8 rounded-lg mt-8">
            <h3 className="text-xl font-semibold text-tertiary-700 mb-4">What Makes Ours Different:</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Most consultants build rigid systems that break when reality hits. We build adaptive systems with "rip cords" — 
              ways to quickly pivot when market conditions change or new opportunities emerge. Flexibility built into the foundation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-tertiary-50 p-4 rounded-lg">
                <h4 className="font-semibold text-tertiary-700 mb-2">Traditional Systems</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Rigid processes that break under pressure</li>
                  <li>• Complex procedures that slow down teams</li>
                  <li>• Inflexible rules that can't adapt</li>
                </ul>
              </div>
              <div className="bg-primary-50 p-4 rounded-lg">
                <h4 className="font-semibold text-primary-700 mb-2">Our Adaptive Systems</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Flexible frameworks that bend, don't break</li>
                  <li>• Intelligent automation that speeds up work</li>
                  <li>• Built-in pivot points for rapid adaptation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CallToAction 
        title="Ready to Build High-Performance Systems?"
        subtitle="Get systems that make it easier to do the right thing and harder to make mistakes."
        primaryButtonText="Book Discovery Call"
        primaryButtonLink="http://calendly.com/PhreshPhactory"
        secondaryButtonText="View Pricing"
        secondaryButtonLink="/packages#systems"
        dark
      />
    </div>
  );
};

export default SystemsDesign;