import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';
import { ArrowRight, Target, Users, Cog, TrendingUp } from 'lucide-react';

const Home = () => {
  const services = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Fractional Leadership',
      description: 'Strategic C-suite expertise without the full-time commitment. Drive growth with proven leaders.',
      href: '/services/fractional-leadership'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Global Talent',
      description: 'Access world-class talent across time zones. Build high-performing distributed teams.',
      href: '/services/global-talent'
    },
    {
      icon: <Cog className="h-8 w-8" />,
      title: 'Legacy Transformation',
      description: 'Modernize systems and processes. Transform legacy infrastructure for future growth.',
      href: '/services/legacy-transformation'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Systems Design',
      description: 'Build scalable systems that grow with your business. Architecture for sustainable success.',
      href: '/services/systems-design'
    }
  ];

  const testimonials = [
    {
      quote: "Phresh Phactory transformed our operations completely. Their fractional leadership approach delivered results we never thought possible.",
      author: "Sarah Chen",
      role: "CEO, TechScale"
    },
    {
      quote: "The global talent they connected us with became integral to our team. Outstanding quality and cultural fit.",
      author: "Marcus Rodriguez",
      role: "CTO, InnovateNow"
    },
    {
      quote: "Their legacy transformation saved us millions and positioned us for the next decade of growth.",
      author: "Jennifer Park",
      role: "COO, Heritage Systems"
    }
  ];

  return (
    <>
      <SEOHead
        title="Phresh Phactory | Business Transformation & Growth Strategy"
        description="Phresh Phactory powers growth with business transformation, fractional leadership, global talent, legacy modernization, and scalable operations."
        keywords="business transformation, fractional leadership, global talent, legacy modernization, scalable operations, growth strategy, C-Suite executives, digital transformation"
        canonicalUrl="https://phreshphactory.co/"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background to-muted section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
              Power Your Growth with 
              <span className="text-tertiary"> Strategic </span>
              Transformation
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We partner with ambitious businesses to unlock exponential growth through fractional leadership, 
              global talent, and legacy transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary">
                <Link to="/contact">
                  Start Your Transformation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              What We Do
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions designed to accelerate your business transformation and drive sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border">
                <CardContent className="p-6">
                  <div className="text-primary mb-4 group-hover:text-tertiary transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Link 
                    to={service.href}
                    className="inline-flex items-center text-primary hover:text-tertiary transition-colors font-medium"
                  >
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/50 section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Client Success Stories
            </h2>
            <p className="text-xl text-muted-foreground">
              See how we've helped businesses transform and scale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="p-6">
                  <blockquote className="text-lg mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="border-t pt-4">
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Join hundreds of companies that have accelerated their growth with Phresh Phactory. 
              Let's discuss your transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-tertiary">
                <Link to="/contact">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/packages">View Packages</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;