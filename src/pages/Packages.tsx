import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SEOHead from '@/components/SEOHead';
import { Check, ArrowRight, Star } from 'lucide-react';

const Packages = () => {
  const packages = [
    {
      name: 'Starter',
      price: '$5,000',
      period: '/month',
      description: 'Perfect for growing businesses ready to scale operations and leadership.',
      features: [
        '20 hours fractional leadership',
        'Strategic planning session',
        'Monthly performance review',
        'Basic systems assessment',
        'Email support'
      ],
      popular: false,
      color: 'border-border'
    },
    {
      name: 'Growth',
      price: '$12,000',
      period: '/month',
      description: 'Comprehensive transformation for businesses serious about exponential growth.',
      features: [
        '40 hours fractional leadership',
        'Global talent placement (1-2 roles)',
        'Legacy system assessment',
        'Custom process optimization',
        'Weekly strategy sessions',
        'Priority phone & email support',
        'Quarterly business reviews'
      ],
      popular: true,
      color: 'border-tertiary'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Full-scale transformation for large organizations with complex needs.',
      features: [
        'Unlimited fractional leadership hours',
        'Complete global talent team',
        'Full legacy transformation',
        'Custom systems design',
        'Dedicated account manager',
        '24/7 support',
        'Monthly executive briefings',
        'Custom integrations & training'
      ],
      popular: false,
      color: 'border-primary'
    }
  ];

  const addOns = [
    {
      title: 'Additional Leadership Hours',
      price: '$200/hour',
      description: 'Extra fractional leadership time for specific projects.'
    },
    {
      title: 'Emergency Support',
      price: '$500/incident',
      description: '24/7 emergency support for critical business issues.'
    },
    {
      title: 'Training & Workshops',
      price: '$2,000/session',
      description: 'Custom training sessions for your team on transformation best practices.'
    },
    {
      title: 'Additional Talent Placement',
      price: '$3,000/placement',
      description: 'Extra global talent placements beyond package limits.'
    }
  ];

  return (
    <>
      <SEOHead
        title="Pricing & Packages | Phresh Phactory Business Transformation"
        description="Explore our flexible pricing packages for business transformation services. From startups to enterprise, find the right plan for your growth."
        keywords="business transformation pricing, fractional leadership packages, global talent pricing, legacy transformation cost"
      />

      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Transformation Packages
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the perfect package for your business transformation journey. All packages include our core services with flexible scaling options.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.color} ${pkg.popular ? 'border-2 scale-105' : ''} transition-transform hover:scale-105`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-tertiary text-tertiary-foreground flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{pkg.price}</span>
                      <span className="text-muted-foreground">{pkg.period}</span>
                    </div>
                    <p className="text-muted-foreground">{pkg.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-tertiary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    asChild 
                    className={`w-full ${pkg.popular ? 'btn-tertiary' : 'btn-primary'}`}
                  >
                    <Link to="/contact">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add-ons Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Add-On Services</h2>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Enhance your package with additional services tailored to your specific needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addOns.map((addon, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold">{addon.title}</h3>
                      <span className="text-lg font-bold text-tertiary">{addon.price}</span>
                    </div>
                    <p className="text-muted-foreground">{addon.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I change packages later?</h3>
                <p className="text-muted-foreground">Yes, you can upgrade or downgrade your package at any time with 30 days notice.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">What's included in fractional leadership?</h3>
                <p className="text-muted-foreground">Strategic planning, team leadership, process optimization, and direct executive guidance tailored to your business.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">How quickly can we get started?</h3>
                <p className="text-muted-foreground">Most packages can be initiated within 1-2 weeks of contract signing, depending on complexity.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Do you offer custom packages?</h3>
                <p className="text-muted-foreground">Absolutely! We create custom solutions for unique business needs. Contact us to discuss your requirements.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold font-heading mb-4">
              Ready to Start Your Transformation?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss which package is right for your business. Schedule a free consultation to get personalized recommendations.
            </p>
            <Button asChild className="btn-primary">
              <Link to="/contact">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Packages;