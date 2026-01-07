import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
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
        {/* Shopping First - Primary Focus - Always visible since above the fold */}
        <div className="flex flex-col items-center text-center mb-16 animate-on-scroll is-visible">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-strategic-gold" />
            <span className="text-sm font-semibold text-strategic-gold uppercase tracking-wide">Curated Collection</span>
          </div>
          <h1 className="font-heading font-bold mb-4 leading-tight text-white text-[44px] leading-[54px] sm:text-[64px] sm:leading-tight">
            Shop the Diaspora
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed font-medium max-w-2xl">
            Afro-Descendant Brands Curated Daily
          </p>
          
          {/* Primary Product CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-tertiary hover:bg-tertiary/90 text-primary px-10 py-6 text-xl font-bold shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-tertiary/30"
            >
              <Link to="/shop">
                <ShoppingBag className="mr-3 w-6 h-6" />
                Shop Products
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              className="px-8 py-6 text-lg bg-white text-black hover:bg-white/90 transition-all duration-300 font-semibold"
            >
              <Link to="/compro">
                Comprar en Español
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Services Section - Below the Fold */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-8 border-t border-white/10">
          {/* Left: Brand Authority */}
          <div className="animate-on-scroll relative z-30">
            <h2 className="font-heading font-bold mb-6 leading-tight text-white text-center sm:text-left text-[32px] leading-[40px] sm:text-[44px] sm:leading-tight">
              Scale Without
              <span className="block text-strategic-gold">the Chaos.</span>
            </h2>
            <p className="text-lg md:text-xl mb-6 text-white/90 leading-relaxed font-medium">
              Strategic leadership, global talent, and operations systems for founders ready to grow.
            </p>
            <p className="text-base mb-8 font-medium flex items-center text-strategic-gold animate-on-scroll relative z-30">
              <Star className="text-strategic-gold w-5 h-5 mr-3 glow-tertiary flex-shrink-0" />
              We turn your vision into action and lead the people who keep your business moving.
            </p>
            
            {/* Secondary CTA for Services */}
            <div className="flex flex-col sm:flex-row gap-4 stagger-children relative z-30">
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg border-2 border-white/80 text-white hover:bg-white hover:text-black transition-all duration-300 font-semibold"
              >
                <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer">
                  Work With Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="px-6 py-4 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? 'Hide Form' : 'Quick Contact'}
              </Button>
            </div>
          </div>
          
          {/* Right: Contact Form */}
          <div className="relative animate-on-scroll z-10">
            {showForm && (
              <div className="bg-white/95 backdrop-blur-sm p-8 sm:p-10 rounded-xl shadow-2xl border border-strategic-gold/20 card-enhanced">
                <h3 className="text-2xl font-heading font-bold mb-3 text-black">Want to Connect?</h3>
                <p className="text-jet-gray mb-6 font-medium">Let's get in touch</p>
                
                <AssessmentForm />
                
                <p className="text-sm text-jet-gray mt-6 text-center">
                  No spam. We respect your privacy.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
