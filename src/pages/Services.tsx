import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';
import { Target, Users, Cog, TrendingUp, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Target className="h-12 w-12" />,
      title: 'Fractional Leadership',
      description: 'Get strategic C-suite expertise without the full-time commitment. Our fractional executives bring proven leadership to drive your growth.',
      features: ['Strategic Planning', 'Team Development', 'Operational Excellence', 'Change Management'],
      href: '/services/fractional-leadership',
      color: 'text-tertiary'
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: 'Global Talent',
      description: 'Access world-class talent across time zones. Build high-performing distributed teams with our global talent network.',
      features: ['Talent Sourcing', 'Cultural Integration', 'Remote Team Building', 'Performance Management'],
      href: '/services/global-talent',
      color: 'text-teal'
    },
    {
      icon: <Cog className="h-12 w-12" />,
      title: 'Legacy Transformation',
      description: 'Modernize your systems and processes for the digital age. Transform legacy infrastructure into competitive advantages.',
      features: ['System Modernization', 'Process Optimization', 'Digital Integration', 'Risk Mitigation'],
      href: '/services/legacy-transformation',
      color: 'text-primary'
    },
    {
      icon: <TrendingUp className="h-12 w-12" />,
      title: 'Systems Design',
      description: 'Build scalable systems that grow with your business. Architecture and design for sustainable long-term success.',
      features: ['Scalable Architecture', 'Performance Optimization', 'Security Implementation', 'Future-Proofing'],
      href: '/services/systems-design',
      color: 'text-muted-foreground'
    }
  ];

  return (
    <>
      <SEOHead
        title="Services | Phresh Phactory Business Transformation Solutions"
        description="Explore our comprehensive business transformation services including fractional leadership, global talent, legacy transformation, and systems design."
        keywords="business transformation services, fractional leadership, global talent, legacy transformation, systems design, strategic consulting"
      />

      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive solutions designed to accelerate your business transformation and drive sustainable growth. 
              Choose from our core services or combine them for maximum impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className={`${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-1">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-tertiary rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild className="w-full group-hover:bg-tertiary group-hover:text-tertiary-foreground transition-colors">
                    <Link to={service.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Let's discuss which services are right for your business. Our experts are ready to create a custom transformation plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-tertiary">
                <Link to="/contact">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/packages">View Packages</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;