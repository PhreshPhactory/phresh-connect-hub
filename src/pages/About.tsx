import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe, Users, Video, Handshake, MapPin, Target } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import CallToAction from '@/components/CallToAction';
import SEOHead from '@/components/SEOHead';
import kieraFounderImage from '@/assets/kiera-founder.png';

const About = () => {
  const missionPoints = [
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Co-Creation, Not Just Consulting',
      description: 'From operations audits to full execution plans, we serve leaders who are building responsibly, scaling intentionally, and working toward long-term impact.'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Diaspora-Focused Excellence',
      description: 'We are proudly diaspora-focused, supporting founders and teams with culturally aligned, results-driven strategy across industries and continents.'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Systems That Scale',
      description: 'We bring clarity, systems, and smart support to help you lead with vision and execute with excellence—whether launching, scaling, or restructuring.'
    }
  ];

  const collaborationAreas = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Tourism & Development',
      description: 'Boards of tourism and regional development organizations'
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: 'Media & Editorial',
      description: 'Platforms spotlighting innovation, tech, and diaspora success stories'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Digital Infrastructure',
      description: 'Institutions ready to bring remote work and digital systems to underserved communities'
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: 'Strategic Partnerships',
      description: 'Brands seeking authentic, globally minded representation rooted in strategy and lived experience'
    }
  ];

  return (
    <>
      <SEOHead
        title="About Phresh Phactory | Operations Consulting for Your Business Growth"
        description="Phresh Phactory helps visionary founders scale through operational strategy, business systems, and culturally aligned teams built for sustainable growth."
        keywords="Operational Strategy, Operations Consulting, Sustainable Growth, Business Systems, Scaling Startups"
        canonicalUrl="https://phreshphactory.com/about"
      />
      {/* Hero Section */}
      <section className="bg-background py-16 md:py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">Building Systems That Power Visionaries Across the Diaspora</h1>
            
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-3xl mx-auto">
              Phresh Phactory, Inc. is a boutique operations consultancy helping visionary founders, creatives, and early-stage companies transform ideas into repeatable infrastructure. Founded by Kiera H., a fractional executive and systems strategist with over 20 years of experience, we specialize in building the teams, systems, and strategic frameworks that turn momentum into sustainable growth.
            </p>
            <div className="bg-card border border-border p-6 rounded-lg mb-8 max-w-2xl mx-auto">
              <p className="text-lg font-medium text-teal">
                We don't just consult—we co-create.
              </p>
            </div>
            <Button asChild size="lg">
              <Link to="/contact">Start Building Together</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
       <section className="py-12 md:py-16 bg-muted">
        <div className="container-custom">
          <SectionTitle
            title="Our Mission"
            subtitle="Transforming ideas into repeatable infrastructure with culturally aligned, results-driven strategy."
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {missionPoints.map((item, index) => (
              <div key={index} className="text-center animate-on-scroll">
                <div className="mx-auto mb-4 text-teal-foreground bg-teal w-16 h-16 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-medium mb-3 text-foreground">{item.title}</h3>
                <p className="text-base text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Diaspora Focus Section */}
      <section className="bg-background py-12 md:py-16">
        <div className="container-custom">
          <SectionTitle
            title="Diaspora-Focused, Globally Grounded"
            center
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border p-6 md:p-8 rounded-lg shadow-sm">
              <p className="text-base md:text-lg text-muted-foreground mb-4">
                Phresh Phactory operates remotely through a presence in the U.S. and Caribbean with clients across the globe. We are proudly diaspora-focused, supporting founders and teams with culturally aligned, results-driven strategy.
              </p>
              <p className="text-base md:text-lg text-muted-foreground">
                Our clients span industries and continents, but they all share a common goal: to build something meaningful and lasting. Whether you're launching a new venture, preparing to scale, or restructuring for peace of mind, we bring clarity, systems, and smart support to help you lead with vision and execute with excellence.
              </p>
            </div>
          </div>
        </div>
      </section>
      

      {/* Collaboration Section */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container-custom">
          <SectionTitle
            title="Let's Collaborate"
            subtitle="We are open to partnerships, press features, and aligned collaborations with organizations ready to transform together."
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {collaborationAreas.map((item, index) => (
              <div key={index} className="bg-card border border-border p-6 rounded-lg animate-on-scroll hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="mr-4 text-teal-foreground bg-teal p-3 rounded-full flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-foreground">{item.title}</h3>
                    <p className="text-base text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/contact">Explore Partnership Opportunities</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* The Communities Behind Our Work Section */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container-custom">
          <SectionTitle
            title="The Communities Behind Our Work"
            center
            className="mb-12"
          />
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground mb-12 text-center leading-relaxed">
              To support the long-term success of diaspora-centered companies, Phresh Phactory created two online communities — one for talent and one for brands.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Phreelance */}
              <div className="bg-background p-8 rounded-lg border border-border hover:border-primary transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold">Phreelance</h3>
                </div>
                <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                  Affiliate + Freelancer Community
                </p>
                <p className="text-base text-foreground mb-8 leading-relaxed">
                  A training community for freelancers, creators, and affiliates looking to support brands and create income through digital partnerships.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <a href="https://tinyurl.com/Phreelance-Affiliate" target="_blank" rel="noopener noreferrer">
                    Join Phreelance
                  </a>
                </Button>
              </div>

              {/* Phactory */}
              <div className="bg-background p-8 rounded-lg border border-border hover:border-primary transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <Handshake className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold">Phactory</h3>
                </div>
                <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                  Brand Owner Community
                </p>
                <p className="text-base text-foreground mb-8 leading-relaxed">
                  A training community for founders and product-based businesses learning to prepare for affiliate partnerships and digital growth.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <a href="https://tinyurl.com/Phactory-Owners" target="_blank" rel="noopener noreferrer">
                    Join Phactory
                  </a>
                </Button>
              </div>
            </div>
            
            <p className="text-lg text-center text-foreground font-medium">
              These communities form a complete ecosystem that strengthens the companies we serve — including EatOkra and Afrofiliate.
            </p>
          </div>
        </div>
      </section>
      
      {/* About Kiera Section - Brief */}
      <section className="bg-background py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Meet the Founder"
              center
            />
            
            <div className="flex flex-col items-center gap-6 mt-8 text-center">
              <div>
                <img 
                  src={kieraFounderImage} 
                  alt="Kiera H., Founder of Phresh Phactory"
                  className="w-48 h-60 rounded-lg mx-auto object-cover border-4 border-primary/20 shadow-lg"
                />
              </div>
              <div className="max-w-3xl">
                <h3 className="text-2xl font-bold mb-4 text-foreground">Kiera H.</h3>
                <p className="text-base md:text-lg text-muted-foreground mb-6">
                  Kiera H. is a results-driven business strategist, Fractional Executive, and Founder of Phresh Phactory, Inc. With over 20 years of experience spanning the U.S., the Caribbean, and Africa, she helps vision-led startups and Afro-descendant businesses streamline operations, scale sustainably, and build high-performing virtual teams.
                </p>
                <Button asChild size="lg" variant="outline">
                  <Link to="/KieraH">
                    Learn More About Kiera
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <CallToAction
        title="Ready for Strategic Transformation?"
        subtitle="Let's discuss how we can help you build the systems and teams your business needs to scale."
        primaryButtonText="Book a Strategy Call"
        primaryButtonLink="http://calendly.com/PhreshPhactory"
        dark={true}
      />
    </>
  );
};

export default About;
