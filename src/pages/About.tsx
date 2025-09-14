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
        canonicalUrl="https://phreshphactory.co/about"
      />
      {/* Hero Section */}
      <section className="bg-background py-20 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-[32px] leading-[40px] sm:text-4xl md:text-6xl sm:leading-tight md:leading-tight font-bold mb-8 text-foreground">Building Systems That Power Visionaries Across the Diaspora</h1>
            
            <p className="text-xl md:text-2xl mb-10 text-muted-foreground max-w-3xl mx-auto">
              Phresh Phactory, Inc. is a boutique operations consultancy helping visionary founders, creatives, and early-stage companies transform ideas into repeatable infrastructure. Founded by Kiera H., a fractional executive and systems strategist with over 20 years of experience, we specialize in building the teams, systems, and strategic frameworks that turn momentum into sustainable growth.
            </p>
            <div className="bg-card border border-border p-2 sm:p-8 rounded-lg mb-10 max-w-2xl mx-auto">
              <p className="text-xl font-medium text-teal">
                We don't just consult—we co-create.
              </p>
            </div>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/contact">Start Building Together</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
       <section className="py-10 sm:py-15 bg-muted">
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
                <h3 className="text-[24px] leading-[32px] sm:text-xl sm:leading-normal font-medium mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Diaspora Focus Section */}
      <section className="bg-background py-10 sm:py-15">
        <div className="container-custom">
          <SectionTitle
            title="Diaspora-Focused, Globally Grounded"
            center
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border p-8 rounded-lg mb-8 shadow-sm">
              <p className="text-lg text-muted-foreground mb-6">
                Phresh Phactory operates remotely through a presence in the U.S. and Caribbean with clients across the globe. We are proudly diaspora-focused, supporting founders and teams with culturally aligned, results-driven strategy.
              </p>
              <p className="text-lg text-muted-foreground">
                Our clients span industries and continents, but they all share a common goal: to build something meaningful and lasting. Whether you're launching a new venture, preparing to scale, or restructuring for peace of mind, we bring clarity, systems, and smart support to help you lead with vision and execute with excellence.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Caribbean Kiera Section */}
      <section className="py-10 sm:py-15 bg-muted">
        <div className="container-custom">
          <SectionTitle
            title="Caribbean Kiera: The Personal Side of the Mission"
            center
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border p-6 sm:p-8 rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-lg text-muted-foreground mb-6">
                In addition to leading Phresh Phactory, Kiera also shares her personal journey through her YouTube channel, Caribbean Kiera. The channel documents expat life, remote work, digital entrepreneurship, and what it means to build legacy while living in alignment with purpose and place.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                It's a real-time look at how systems meet soul—and how powerful things happen when you stop waiting for permission and start building your own blueprint.
              </p>
              <div className="text-center">
                <Button variant="outline" size="lg" asChild>
                  <a href="https://youtube.com/@CaribbeanKiera" target="_blank" rel="noopener noreferrer">
                    <Video className="w-5 h-5 mr-2" />
                    Visit Caribbean Kiera
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Caribbean Vision Section */}
      <section className="bg-background py-10 sm:py-15">
        <div className="container-custom">
          <SectionTitle
            title="Why the Caribbean? Why Now?"
            center
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border p-6 sm:p-8 rounded-lg mb-8 text-lg sm:text-base">
              <p className="text-lg text-muted-foreground mb-6">
                After years of working behind the scenes to support founders culturally impactful founders—Kiera made the decision to evaluate opportunities in the Dominican Republic and the greater Caribbean. It was both a strategic and personal shift.
              </p>
              <p className="text-lg text-muted-foreground">
                What began as a lifestyle shift quickly became a larger mission. Remote work is still rare in many parts of the Caribbean, and tech infrastructure is in its early stages. Phresh Phactory is uniquely positioned to help support this evolution—bringing proven systems, digital fluency, and scalable strategies to regions ready for transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-10 sm:py-15 bg-muted">
        <div className="container-custom">
          <SectionTitle
            title="Let's Collaborate"
            subtitle="We are open to partnerships, press features, and aligned collaborations with organizations ready to transform together."
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {collaborationAreas.map((item, index) => (
              <div key={index} className="bg-card border border-border p-6 rounded-lg animate-on-scroll hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="mr-4 text-teal-foreground bg-teal p-3 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
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
      
      {/* About Kiera Section */}
      <section className="bg-background py-10 sm:py-15">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="About Kiera H."
              center
            />
            
            <div className="flex flex-col items-center gap-8 mt-12 text-center">
              <div>
                <img 
                  src={kieraFounderImage} 
                  alt="Kiera H., Founder of Phresh Phactory"
                  className="w-64 h-80 rounded-lg mx-auto object-cover border-4 border-primary/20 shadow-lg"
                />
              </div>
              <div className="max-w-4xl">
                <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    Kiera H. is a results-driven business strategist, fractional executive, and founder of Phresh Phactory, Inc., a global operations and systems consultancy that helps vision-led startups, Black-owned businesses, and remote-first companies streamline operations, scale sustainably, and build high-performing virtual teams. With over 20 years of experience spanning the U.S., the Caribbean, and Africa, Kiera is widely recognized for helping CEOs and founders turn scattered efforts into structured, profitable operations.
                  </p>
                  
                  <p>
                    A leading voice in the world of remote workforce development and diaspora business strategy, Kiera takes on Fractional Executive roles that create immediate and measurable impact. Her current roles include:
                  </p>
                  
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Supplier Relationship Manager at EatOkra, where she supports Black-owned food and drink brands through partnerships, visibility strategies, and technology integration.</li>
                    <li>Affiliate Manager at Afrofiliate, where she leads performance-based marketing strategies for culturally relevant, small and mid-sized brands.</li>
                  </ul>
                  
                  <p>
                    Through Phresh Phactory, Inc., she and her team lead client engagements that drive digital transformation, automated systems implementation, and global talent development, with a focus on helping consumer product companies, food entrepreneurs, and tech-enabled platforms scale without burnout.
                  </p>
                  
                  <p>
                    Kiera is also a strategic collaborator to award-winning platforms like EatOkra and Afrofiliate, and has supported initiatives with CS Connect through partnership development and operational insight. Her operational expertise, cultural intelligence, and sharp strategic insight contribute directly to revenue growth, team alignment, and long-term scalability.
                  </p>
                  
                  <p>
                    She is also a published thought leader. Kiera writes two weekly newsletters:
                  </p>
                  
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>"EatOkra for Business" – offering practical advice and grant resources for Black-owned food and beverage brands listed on the EatOkra app.</li>
                    <li>"Phresh Phactory: Growth Notes" – a LinkedIn newsletter offering bold, no-fluff guidance to startup CEOs and founders focused on sustainable growth and operational excellence.</li>
                  </ul>
                  
                  <p>
                    Looking for a strategist who can help you grow your business, train your team, and turn operations into income?
                  </p>
                  
                  <div className="mt-6 text-center">
                    <Button asChild size="lg">
                      <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer">
                        Book a Call with Kiera H.
                      </a>
                    </Button>
                  </div>
                </div>
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
        className="py-15"
      />
    </>
  );
};

export default About;
