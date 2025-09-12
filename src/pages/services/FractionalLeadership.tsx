import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';
import { Target, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react';

const FractionalLeadership = () => {
  const benefits = [
    'Access to C-suite expertise without full-time costs',
    'Proven leaders with track records of success',
    'Flexible engagement models to fit your needs',
    'Strategic planning and execution guidance',
    'Team development and leadership coaching',
    'Objective third-party perspective on challenges'
  ];

  const services = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Strategic Planning',
      description: 'Develop comprehensive business strategies aligned with your vision and market opportunities.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Team Leadership',
      description: 'Guide and develop your existing team while building high-performance culture.'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Growth Acceleration',
      description: 'Identify and execute growth opportunities to scale your business rapidly.'
    }
  ];

  return (
    <>
      <SEOHead
        title="Fractional Leadership Services | Expert C-Suite Executives"
        description="Access experienced C-suite executives on a fractional basis. Get strategic leadership, team development, and growth acceleration without full-time costs."
        keywords="fractional leadership, fractional CEO, fractional CTO, fractional CFO, part-time executives, C-suite leadership, strategic leadership"
      />

      <div className="section-padding">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Fractional Leadership
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get the strategic expertise of seasoned C-suite executives without the full-time commitment. 
              Our fractional leaders bring proven experience to drive your business forward.
            </p>
            <Button asChild className="btn-primary">
              <Link to="/contact">
                Schedule Leadership Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="text-tertiary mb-4 flex justify-center">
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
              <h2 className="text-3xl font-bold font-heading mb-6">Why Choose Fractional Leadership?</h2>
              <p className="text-muted-foreground mb-6">
                Fractional leadership provides access to top-tier executive talent at a fraction of the cost. 
                Our leaders have guided companies through transformations, exits, and explosive growth phases.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-tertiary mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Card className="bg-muted/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Our Leadership Expertise</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-tertiary">CEO/COO</h4>
                    <p className="text-sm text-muted-foreground">Strategic vision, operations, scaling</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-tertiary">CTO/Engineering</h4>
                    <p className="text-sm text-muted-foreground">Technology strategy, team building</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-tertiary">CFO/Finance</h4>
                    <p className="text-sm text-muted-foreground">Financial planning, fundraising</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-tertiary">CMO/Marketing</h4>
                    <p className="text-sm text-muted-foreground">Growth marketing, brand strategy</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-tertiary">CHRO/People</h4>
                    <p className="text-sm text-muted-foreground">Culture, talent, organizational design</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Process Section */}
          <div className="bg-muted/50 rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold font-heading text-center mb-12">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-tertiary text-tertiary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-semibold mb-2">Discovery</h3>
                <p className="text-sm text-muted-foreground">Understand your business challenges and leadership needs</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-tertiary text-tertiary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-semibold mb-2">Matching</h3>
                <p className="text-sm text-muted-foreground">Match you with the perfect fractional leader for your industry and stage</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-tertiary text-tertiary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-semibold mb-2">Integration</h3>
                <p className="text-sm text-muted-foreground">Seamless integration with your team and existing processes</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-tertiary text-tertiary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
                <h3 className="font-semibold mb-2">Results</h3>
                <p className="text-sm text-muted-foreground">Drive measurable results and sustainable growth</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Ready for Strategic Leadership?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Connect with proven leaders who have scaled businesses like yours. Start your fractional leadership journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-tertiary">
                <Link to="/contact">
                  Get Matched with a Leader
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/packages">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FractionalLeadership;