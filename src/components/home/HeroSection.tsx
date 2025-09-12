import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import TypingText from '@/components/TypingText';
import OptimizedImage from '@/components/OptimizedImage';
import AssessmentForm from '@/components/AssessmentForm';
const HeroSection = () => {
  return <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-gradient-hero px-6 sm:px-0">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-strategic-gold/20 to-global-teal/30"></div>
      </div>
      
      <div className="container-custom relative z-20 py-10 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll relative z-30">
            <h1 className="font-heading font-bold mb-8 leading-tight text-white text-center sm:text-left text-[40px] leading-[50px] sm:text-[56px] sm:leading-tight">
              Global Operations Partners for
              <span className="block text-strategic-gold">Vision-Led Businesses</span>
            </h1>
            <div className="text-xl md:text-2xl mb-6 text-white/90 relative z-30 font-heading font-medium" style={{ lineHeight: '1.4' }}>
              <TypingText text="Transformation is not scary - stagnation is. We step into the chaos, build order from it, and leave businesses stronger than they have ever been." speed={30} delay={500} className="relative z-30" />
            </div>
            <p className="text-lg mb-6 text-white/80 leading-relaxed font-medium">
              Transform your business with <Link to="/services/fractional-leadership" className="text-strategic-gold hover:text-strategic-gold/80 underline transition-colors">fractional executive leadership</Link>, <Link to="/services/global-talent" className="text-strategic-gold hover:text-strategic-gold/80 underline transition-colors">global talent teams</Link>, and <Link to="/services/legacy-transformation" className="text-strategic-gold hover:text-strategic-gold/80 underline transition-colors">legacy system modernization</Link>. We help companies scale efficiently without the overhead of traditional business models.
            </p>
            <p className="text-lg mb-10 font-medium flex items-center text-strategic-gold animate-on-scroll relative z-30">
              <Star className="text-strategic-gold w-6 h-6 mr-3 glow-tertiary" />
              We turn your vision into action and lead the people who keep your business moving.
            </p>
            <div className="hidden flex-col sm:flex-row gap-6 stagger-children relative z-30">
              <Button asChild size="lg" className="bg-tertiary hover:bg-tertiary/90 text-primary px-12 py-4 text-xl font-bold shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-tertiary/30">
                <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer">Book a Discovery Call</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-10 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 hover-lift font-semibold">
                <Link to="/services">See How It Works</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative animate-on-scroll block z-10">
            <div className="bg-white/95 backdrop-blur-sm p-10 rounded-xl shadow-2xl border border-strategic-gold/20 card-enhanced">
              <h3 className="text-2xl font-heading font-bold mb-3 text-black">Want to Connect?</h3>
              <p className="text-jet-gray mb-8 font-medium">Let's get in touch</p>
              
              <AssessmentForm />
              
              <p className="text-base text-jet-gray mt-6 text-center">
                No spam. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;