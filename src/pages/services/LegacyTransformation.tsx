import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';
import { Cog, Shield, Zap, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react';

const LegacyTransformation = () => {
  const benefits = [
    'Modernize systems without business disruption',
    'Reduce technical debt and maintenance costs',
    'Improve security and compliance posture',
    'Enable rapid feature development and deployment',
    'Integrate with modern tools and platforms',
    'Future-proof your technology infrastructure'
  ];

  const services = [
    {
      icon: <Cog className="h-8 w-8" />,
      title: 'System Modernization',
      description: 'Transform legacy applications and infrastructure to modern, scalable architectures.'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Security Enhancement',
      description: 'Implement modern security practices and compliance standards throughout your systems.'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Performance Optimization',
      description: 'Dramatically improve system performance, reliability, and user experience.'
    }
  ];

  const challenges = [
    'Outdated technology stacks limiting growth',
    'High maintenance costs and technical debt',
    'Security vulnerabilities and compliance issues',
    'Poor integration with modern tools',
    'Slow development and deployment cycles',
    'Difficulty attracting and retaining talent'
  ];

  const solutions = [
    'Cloud migration and containerization',
    'API-first architecture design',
    'Microservices transformation',
    'Database modernization',
    'CI/CD pipeline implementation',
    'Modern UI/UX redesign'
  ];

  return (
    <>
      <SEOHead
        title="Legacy System Transformation | Modernize Your Technology Stack"
        description="Transform legacy systems into modern, scalable architectures. Reduce technical debt, improve security, and enable rapid innovation."
        keywords="legacy system transformation, system modernization, technical debt reduction, cloud migration, application modernization"
      />

      <div className="section-padding">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Legacy System Transformation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Transform your legacy systems into modern, scalable architectures without disrupting your business. 
              Reduce technical debt, improve security, and unlock innovation potential.
            </p>
            <Button asChild className="btn-primary">
              <Link to="/contact">
                Start Your Transformation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="text-primary mb-4 flex justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Challenges vs Solutions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Card className="border-destructive/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <AlertTriangle className="h-6 w-6 text-destructive mr-3" />
                  <h2 className="text-2xl font-bold">Common Legacy Challenges</h2>
                </div>
                <ul className="space-y-3">
                  {challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <CheckCircle className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold">Our Solutions</h2>
                </div>
                <ul className="space-y-3">
                  {solutions.map((solution, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Section */}
          <div className="bg-muted/50 rounded-2xl p-8 md:p-12 mb-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold font-heading text-center mb-8">Transformation Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-heading text-center mb-12">Our Transformation Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-semibold mb-2">Assessment</h3>
                <p className="text-sm text-muted-foreground">Comprehensive analysis of your current systems</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-semibold mb-2">Strategy</h3>
                <p className="text-sm text-muted-foreground">Create detailed transformation roadmap</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-semibold mb-2">Planning</h3>
                <p className="text-sm text-muted-foreground">Risk mitigation and migration planning</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
                <h3 className="font-semibold mb-2">Execution</h3>
                <p className="text-sm text-muted-foreground">Phased implementation with minimal disruption</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">5</div>
                <h3 className="font-semibold mb-2">Testing</h3>
                <p className="text-sm text-muted-foreground">Comprehensive testing and validation</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">6</div>
                <h3 className="font-semibold mb-2">Support</h3>
                <p className="text-sm text-muted-foreground">Ongoing monitoring and optimization</p>
              </div>
            </div>
          </div>

          {/* Case Study Highlight */}
          <Card className="mb-16 overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-muted p-8 text-primary-foreground">
              <h3 className="text-2xl font-bold mb-2">Success Story</h3>
              <p className="text-primary-foreground/90">
                How we helped a 20-year-old financial services company modernize their core banking system
              </p>
            </div>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">75%</div>
                  <p className="text-muted-foreground">Reduction in maintenance costs</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">10x</div>
                  <p className="text-muted-foreground">Faster deployment cycles</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                  <p className="text-muted-foreground">System uptime achieved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Ready to Modernize Your Systems?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Don't let legacy systems hold back your growth. Start your transformation journey with our expert team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-tertiary">
                <Link to="/contact">
                  Get Free Assessment
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

export default LegacyTransformation;