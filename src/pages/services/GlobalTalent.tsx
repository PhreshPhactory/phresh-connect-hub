import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';
import { Globe, Users, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const GlobalTalent = () => {
  const benefits = [
    'Access to top 1% global talent across all time zones',
    'Cost savings of 40-60% compared to local hiring',
    'Cultural integration and team cohesion support',
    'Pre-vetted professionals with proven track records',
    'Ongoing performance management and support',
    'Scalable team building as you grow'
  ];

  const services = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Global Sourcing',
      description: 'Access talent from top universities and companies worldwide across all skill levels.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Team Integration',
      description: 'Seamless integration of global talent with your existing team and culture.'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: '24/7 Coverage',
      description: 'Build teams across time zones for continuous productivity and customer support.'
    }
  ];

  const roles = [
    'Software Engineers', 'Product Managers', 'Designers', 'Data Scientists',
    'Marketing Specialists', 'Sales Representatives', 'Customer Success',
    'DevOps Engineers', 'QA Engineers', 'Business Analysts'
  ];

  const locations = [
    'Eastern Europe', 'Latin America', 'Southeast Asia', 'South Asia',
    'Middle East', 'Africa', 'North America', 'Western Europe'
  ];

  return (
    <>
      <SEOHead
        title="Global Talent Solutions | Access Top International Professionals"
        description="Build high-performing distributed teams with top global talent. Access skilled professionals worldwide at competitive rates with full support."
        keywords="global talent, remote hiring, distributed teams, international talent, offshore development, global workforce"
      />

      <div className="section-padding">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Global Talent Solutions
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Build world-class distributed teams with top talent from around the globe. 
              Access skilled professionals at competitive rates with full cultural integration support.
            </p>
            <Button asChild className="btn-primary">
              <Link to="/contact">
                Start Building Your Global Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="text-teal mb-4 flex justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-6">Why Global Talent?</h2>
              <p className="text-muted-foreground mb-6">
                The best talent isn't limited by geography. Our global talent solutions connect you with 
                exceptional professionals worldwide, enabling 24/7 productivity and significant cost savings 
                without compromising quality.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-teal mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Card className="bg-muted/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Available Roles</h3>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((role, index) => (
                    <div key={index} className="bg-background rounded-lg p-3 text-sm text-center">
                      {role}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Global Reach Section */}
          <div className="bg-muted/50 rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Global Reach</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              We source talent from the world's leading tech hubs and emerging markets, 
              ensuring you get the best combination of skills, cost-effectiveness, and cultural fit.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {locations.map((location, index) => (
                <div key={index} className="text-center">
                  <div className="bg-teal text-teal-foreground rounded-lg p-4 mb-2">
                    <Globe className="h-6 w-6 mx-auto" />
                  </div>
                  <p className="text-sm font-medium">{location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-heading text-center mb-12">Our Talent Acquisition Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-teal text-teal-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-semibold mb-2">Requirements</h3>
                <p className="text-sm text-muted-foreground">Define your needs, culture, and expectations</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-teal text-teal-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-semibold mb-2">Sourcing</h3>
                <p className="text-sm text-muted-foreground">Global search across our network and partnerships</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-teal text-teal-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-semibold mb-2">Vetting</h3>
                <p className="text-sm text-muted-foreground">Technical assessment and cultural fit evaluation</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-teal text-teal-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
                <h3 className="font-semibold mb-2">Integration</h3>
                <p className="text-sm text-muted-foreground">Smooth onboarding and team integration</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-teal text-teal-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">5</div>
                <h3 className="font-semibold mb-2">Support</h3>
                <p className="text-sm text-muted-foreground">Ongoing performance and relationship management</p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal mb-2">95%</div>
              <p className="text-muted-foreground">Retention Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal mb-2">2 weeks</div>
              <p className="text-muted-foreground">Average Time to Hire</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal mb-2">50%</div>
              <p className="text-muted-foreground">Average Cost Savings</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal mb-2">24/7</div>
              <p className="text-muted-foreground">Global Coverage</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Ready to Build Your Global Team?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Access world-class talent that can transform your business. Let's discuss your hiring needs and build your dream team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-tertiary">
                <Link to="/contact">
                  Start Hiring Global Talent
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

export default GlobalTalent;