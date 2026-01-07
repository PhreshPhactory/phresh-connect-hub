import { Button } from '@/components/ui/button';
import { Star, ArrowRight } from 'lucide-react';
import AssessmentForm from '@/components/AssessmentForm';
import { useState } from 'react';

const HeroSection = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-gradient-hero px-6 sm:px-0">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-strategic-gold/20 to-global-teal/30"></div>
      </div>
      
      <div className="container-custom relative z-20 py-10 sm:py-24">
        {/* Business Hero Content */}
        <div className="max-w-3xl animate-on-scroll is-visible">
          <h1 className="font-heading font-bold mb-6 leading-tight text-white text-[40px] leading-[48px] sm:text-[60px] sm:leading-tight">
            Scale Without
            <span className="block text-strategic-gold">the Chaos.</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-white/90 leading-relaxed font-medium">
            Strategic leadership, global talent, and operations systems for founders ready to grow.
          </p>
          <p className="text-base mb-8 font-medium flex items-center text-strategic-gold">
            <Star className="text-strategic-gold w-5 h-5 mr-3 glow-tertiary flex-shrink-0" />
            We turn your vision into action and lead the people who keep your business moving.
          </p>
          
          {/* Services CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-tertiary hover:bg-tertiary/90 text-primary px-10 py-6 text-xl font-bold shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-tertiary/30"
            >
              <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer">
                Work With Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-lg border-2 border-white/80 text-white hover:bg-white hover:text-black transition-all duration-300 font-semibold"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Hide Form' : 'Quick Contact'}
            </Button>
          </div>
        </div>
        
        {/* Contact Form Section - appears directly below CTAs */}
        {showForm && (
          <div className="max-w-xl mt-10 animate-on-scroll">
            <div className="bg-white/95 backdrop-blur-sm p-8 sm:p-10 rounded-xl shadow-2xl border border-strategic-gold/20 card-enhanced">
              <h3 className="text-2xl font-heading font-bold mb-3 text-black">Want to Connect?</h3>
              <p className="text-jet-gray mb-6 font-medium">Let's get in touch</p>
              
              <AssessmentForm />
              
              <p className="text-sm text-jet-gray mt-6 text-center">
                No spam. We respect your privacy.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
