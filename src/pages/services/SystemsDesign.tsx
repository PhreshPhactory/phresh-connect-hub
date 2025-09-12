import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';
import { TrendingUp, Layers, Zap, CheckCircle, ArrowRight, Building } from 'lucide-react';

const SystemsDesign = () => {
  const benefits = [
    'Scalable architecture that grows with your business',
    'High performance and reliability standards',
    'Future-proof technology choices and patterns',
    'Reduced development time and costs',
    'Enhanced security and compliance',
    'Improved team productivity and collaboration'
  ];

  const services = [
    {
      icon: <Building className="h-8 w-8" />,
      title: 'Architecture Design',
      description: 'Design scalable, maintainable system architectures that support long-term growth.'
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: 'Platform Engineering',
      description: 'Build robust platforms and infrastructure that enable rapid development and deployment.'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Performance Optimization',
      description: 'Optimize systems for maximum performance, efficiency, and user experience.'
    }
  ];

  const designPrinciples = [
    'Scalability',
    'Reliability',
    'Security',
    'Maintainability',
    'Performance',
    'Cost Efficiency'
  ];

  const technologies = [
    'Cloud-Native Architecture',
    'Microservices Design',
    'API-First Approach',
    'Event-Driven Systems',
    'Containerization',
    'Infrastructure as Code'
  ];

  return (
    <>
      <SEOHead
        title="Systems Design & Architecture | Build Scalable Technology Solutions"
        description="Design and build scalable systems that grow with your business. Expert architecture, platform engineering, and performance optimization."
        keywords="systems design, software architecture, scalable systems, platform engineering, cloud architecture, microservices design"
      />

      <div className="section-padding">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Systems Design & Architecture
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Build scalable, reliable systems that grow with your business. Our expert architects design 
              future-proof solutions that optimize performance, reduce costs, and accelerate development.
            </p>
            <Button asChild className="btn-primary">
              <Link to="/contact">
                Design Your System
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="text-muted-foreground mb-4 flex justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Design Principles & Technologies */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Card className="bg-muted/50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Our Design Principles</h2>
                <div className="grid grid-cols-2 gap-4">
                  {designPrinciples.map((principle, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <span className="font-medium">{principle}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Modern Technologies</h2>
                <div className="space-y-3">
                  {technologies.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full flex-shrink-0"></div>
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-heading text-center mb-8">Why Expert Systems Design Matters</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Proper systems design is the foundation of successful technology companies. It determines your ability 
              to scale, innovate, and compete in the market.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="bg-muted/50 rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold font-heading text-center mb-12">Our Design Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-muted-foreground text-background rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-semibold mb-2">Discovery</h3>
                <p className="text-sm text-muted-foreground">Understand business requirements and constraints</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-muted-foreground text-background rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-semibold mb-2">Analysis</h3>
                <p className="text-sm text-muted-foreground">Analyze current systems and identify opportunities</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-muted-foreground text-background rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-semibold mb-2">Design</h3>
                <p className="text-sm text-muted-foreground">Create comprehensive architecture and design documents</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-muted-foreground text-background rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
                <h3 className="font-semibold mb-2">Prototype</h3>
                <p className="text-sm text-muted-foreground">Build and validate key architectural components</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-muted-foreground text-background rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">5</div>
                <h3 className="font-semibold mb-2">Implementation</h3>
                <p className="text-sm text-muted-foreground">Guide development teams through implementation</p>
              </div>
            </div>
          </div>

          {/* Architecture Examples */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-heading text-center mb-12">Architecture Patterns We Design</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3">Event-Driven Architecture</h3>
                  <p className="text-muted-foreground text-sm">
                    Build responsive, scalable systems that react to events in real-time.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3">Microservices Architecture</h3>
                  <p className="text-muted-foreground text-sm">
                    Decompose monoliths into maintainable, independently deployable services.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3">Serverless Architecture</h3>
                  <p className="text-muted-foreground text-sm">
                    Leverage cloud functions for cost-effective, auto-scaling solutions.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3">CQRS & Event Sourcing</h3>
                  <p className="text-muted-foreground text-sm">
                    Separate read and write operations for optimal performance and scalability.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3">API-First Design</h3>
                  <p className="text-muted-foreground text-sm">
                    Design APIs before implementation for better integration and developer experience.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3">Domain-Driven Design</h3>
                  <p className="text-muted-foreground text-sm">
                    Align system design with business domains for better maintainability.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Ready to Build Your System?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Let our expert architects design a system that scales with your ambitions. 
              Start with a free architecture consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-tertiary">
                <Link to="/contact">
                  Get Architecture Consultation
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

export default SystemsDesign;