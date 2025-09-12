import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';

const RemoteTeams = () => {
  const benefits = [
    {
      title: "Remote Workforce Specialists",
      description: "We understand the nuances of remote work and the unique dynamics of managing virtual teams. Through our remote jobs workforce management service, we help you optimize your remote workforce to drive efficiency and productivity."
    },
    {
      title: "Freelancer Integration", 
      description: "Our specialization in working with freelancers ensures seamless integration within your organization. Leverage the power of freelancers to enhance your team's capabilities and access a diverse pool of talent."
    },
    {
      title: "Tailored Solutions",
      description: "We provide customized strategies and solutions to fit your specific needs. From providing the best solution to 'how can I hire a freelancer' to onboarding and performance management and collaboration tools, we ensure a tailored approach for your remote workforce success."
    },
    {
      title: "Proven Results",
      description: "Countless businesses have benefited from our guidance and expertise in remote workforce management. Join our community of successful organizations that have harnessed the power of remote work."
    }
  ];

  return (
    <>
      <SEOHead 
        title="Remote Teams & Freelancer Management Solutions - Phresh Phactory"
        description="Expert remote workforce solutions and freelancer integration services. Learn how to build, manage, and scale remote teams effectively with our proven strategies and comprehensive guide."
        keywords="remote teams, freelancer management, remote workforce, virtual teams, remote work solutions, freelancer integration, remote job management"
        canonicalUrl="https://phreshphactory.com/remote-teams"
      />
      <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Multiply Your Workforce:
              <span className="block text-teal mt-2">
                Unleash the Power of Freelancers and Remote Work
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              Discover the Future of Work with Phresh Phactory, Inc. We specialize in empowering businesses to harness the potential of remote workforces and freelancers. Our remote workforce solutions are customized to seamlessly integrate these talented individuals into your organization. As such, we help you transform your teams into highly productive units that drive success.
            </p>
            <Button size="lg" className="text-lg px-8 py-4" asChild>
              <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer">
                Book a Chat
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Choose Phresh Phactory, Inc.?</h2>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-secondary-600 leading-relaxed">
              As experts in <Link to="/services" className="text-primary-600 hover:text-primary-700 underline">remote workforce management</Link> and <Link to="/remote-teams" className="text-primary-600 hover:text-primary-700 underline">freelancer integration</Link>, we provide comprehensive solutions for modern businesses looking to leverage distributed teams and flexible talent.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted">
        <div className="container-custom">
          <SectionTitle
            title="Remote Team Services"
            subtitle="Comprehensive solutions for building and managing high-performing remote teams"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-4 text-primary-600">
                    Freelance Team Management
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Expert management and coordination of freelance teams to maximize productivity and ensure seamless project delivery. We handle the complexities of managing distributed talent so you can focus on your core business.
                  </p>
                  <ul className="text-left space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span className="text-gray-600">Team coordination and communication</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span className="text-gray-600">Project management and deliverable tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span className="text-gray-600">Performance monitoring and optimization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span className="text-gray-600">Quality assurance and standards enforcement</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full">
                    <Link to="/packages">View Pricing</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-4 text-primary-600">
                    Hiring & Onboarding Support
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    End-to-end support for finding, vetting, and onboarding the right remote talent for your team. From job posting to first-day success, we ensure you get the best candidates who fit your culture and requirements.
                  </p>
                  <ul className="text-left space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span className="text-gray-600">Talent sourcing and candidate screening</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span className="text-gray-600">Interview process design and facilitation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span className="text-gray-600">Comprehensive onboarding programs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span className="text-gray-600">90-day integration support</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full">
                    <Link to="/packages">View Pricing</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ready to Unlock Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">Ready to Unlock the Power of Your Workforce?</h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Take the first step towards transforming your organization with Phresh Phactory, Inc. Contact us today and let's explore how we can collaborate to maximize your workforce's potential. Besides, we help you embrace remote work, and leverage the benefits of using freelancers.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Whether you're looking for expert guidance on managing your remote workforce, strategic staffing solutions or technology optimization, we got you covered. You can also count on us for customized managing remote workers training programs.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Let's discuss your unique business needs and goals. Schedule a consultation with us and discover how Phresh Phactory, Inc. can help you thrive in the digital age.
            </p>

            <Button size="lg" className="text-lg px-8 py-4" asChild>
              <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer">
                Schedule a Consultation
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Book Section */}
      <section className="py-20 bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">Get the steps to Become or Hire the Correct Freelancer every time!</h2>
            
            <Card className="p-8 mb-8 bg-card border border-border">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="lg:w-1/3">
                    <img 
                      src="/lovable-uploads/5ed3b302-59d8-4819-ad61-811bf7dd4381.png" 
                      alt="Virtual. Freelance. Work from Home. - Create Highly Productive Teams by Learning to Become or Hire Remote Workers, Correctly"
                      className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="lg:w-2/3 text-left lg:text-left">
                    <h3 className="text-2xl font-bold mb-4 text-teal">
                      "Virtual. Freelance. Work from Home.: Create Highly Productive Teams by Learning to Become or Hire Remote Workers, Correctly."
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      This insightful book delves into the world of freelancers, exploring who they are, how they can benefit individuals and businesses, and most importantly, how to successfully integrate them into your workforce. Gain a deep understanding of remote work dynamics, effective communication strategies, and the best practices for remote jobs workforce management. Whether you're a business owner, a freelancer, or a professional seeking remote work opportunities, this book is your ultimate guide to unlocking the full potential of remote work.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button size="lg" className="text-lg px-8 py-4" asChild>
                        <a href="https://www.amazon.com/Virtual-Freelance-Work-Home-Productive-ebook/dp/B0C6JB32S4" target="_blank" rel="noopener noreferrer">
                          Buy on Amazon
                        </a>
                      </Button>
                      <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                        <a href="https://phreshphactoryinc.gumroad.com/l/GigEconomyBook" target="_blank" rel="noopener noreferrer">
                          Buy on Gumroad
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </main>
    </>
  );
};

export default RemoteTeams;