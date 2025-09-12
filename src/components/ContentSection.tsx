import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Cog, Globe, Monitor } from 'lucide-react';

const ContentSection = () => {
  const services = [
    {
      icon: Users,
      title: "Strategic Leadership Solutions",
      description: "Our fractional executive leadership services provide high-level strategic guidance without the full-time executive overhead. We help businesses navigate complex transformations and implement sustainable growth strategies.",
      link: "/services/fractional-leadership",
      features: [
        "Executive strategy development",
        "Organizational restructuring", 
        "Performance optimization",
        "Change management leadership"
      ]
    },
    {
      icon: Globe,
      title: "Global Talent Acquisition",
      description: "Access top-tier talent across Africa, America, and the Caribbean through our global talent teams service. We don't just fill positions – we raise standards and build high-performance teams.",
      link: "/services/global-talent",
      features: [
        "International talent sourcing",
        "Remote team management",
        "Cultural integration support", 
        "Performance monitoring systems"
      ]
    },
    {
      icon: Cog,
      title: "Legacy System Modernization", 
      description: "Transform outdated business processes with our legacy business transformation solutions. We restructure, digitize, and modernize operations to make your business easier to run, scale, or pass on.",
      link: "/services/legacy-transformation",
      features: [
        "Process automation",
        "Digital transformation",
        "System integration",
        "Workflow optimization"
      ]
    },
    {
      icon: Monitor,
      title: "Remote Workforce Management",
      description: "Master the art of remote team management and freelancer integration. Our expertise in remote workforce solutions helps businesses leverage distributed teams for maximum productivity and growth.",
      link: "/remote-teams", 
      features: [
        "Remote team setup",
        "Freelancer integration",
        "Virtual collaboration tools",
        "Performance management systems"
      ]
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-muted/20"></div>
      
      <div className="container-custom relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 section-title-accent center">
            Comprehensive Business Transformation
            <span className="block text-3xl md:text-4xl font-medium text-tertiary mt-2">
              Services
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Elevate your business with our premium transformation solutions designed to drive sustainable growth and operational excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 card-enhanced"
            >
              {/* Icon & Title */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-tertiary to-teal rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-tertiary transition-colors">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {service.description.split('fractional executive leadership').map((part, i) => 
                  i === 0 ? part : [
                    <Link key="link1" to={service.link} className="text-tertiary hover:text-tertiary/80 font-medium underline decoration-2 underline-offset-2">
                      fractional executive leadership
                    </Link>,
                    part
                  ]
                )}
                {service.description.split('global talent teams').map((part, i) => 
                  i === 0 ? part : [
                     <Link key="link2" to={service.link} className="text-tertiary hover:text-tertiary/80 font-medium underline decoration-2 underline-offset-2">
                       global talent teams
                     </Link>,
                     part
                   ]
                 )}
                 {service.description.split('legacy business transformation').map((part, i) => 
                   i === 0 ? part : [
                     <Link key="link3" to={service.link} className="text-tertiary hover:text-tertiary/80 font-medium underline decoration-2 underline-offset-2">
                       legacy business transformation
                     </Link>,
                     part
                   ]
                 )}
                 {service.description.split('remote team management').map((part, i) => 
                   i === 0 ? part : [
                     <Link key="link4" to={service.link} className="text-tertiary hover:text-tertiary/80 font-medium underline decoration-2 underline-offset-2">
                      remote team management
                    </Link>,
                    part
                  ]
                )}
              </p>

              {/* Features List */}
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-gradient-to-r from-tertiary to-teal rounded-full flex-shrink-0"></div>
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Learn More Link */}
              <Link 
                to={service.link}
                className="inline-flex items-center gap-2 text-tertiary hover:text-tertiary/80 font-medium group-hover:gap-3 transition-all duration-300"
              >
                Learn More 
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary to-teal-600 rounded-2xl p-12 text-white">
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-white">
            Ready to Transform Your Business Operations?
          </h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Explore our comprehensive service packages or discover the latest insights on business transformation strategies.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/packages" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-tertiary text-primary hover:bg-tertiary/90 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              View Service Packages
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <a 
              href="http://calendly.com/PhreshPhactory" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur text-white border border-white/20 hover:bg-white/20 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1"
            >
              Schedule Discovery Call
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;