import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import CallToAction from '@/components/CallToAction';
import SEOHead from '@/components/SEOHead';

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Phresh Phactory Services | Business Transformation & Leadership"
        description="Phresh Phactory drives business transformation with fractional leadership, global talent, legacy modernization, and systems built for sustainable growth."
        keywords="Business Transformation Services, Fractional Leadership, Global Talent Acquisition, Legacy Modernization, Strategic Operations, Phresh Phactory Solutions"
        canonicalUrl="https://phreshphactory.co/services"
      />
      {/* Hero Section */}
      <section className="bg-background py-12 md:py-16 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-[32px] leading-[40px] sm:text-4xl md:text-5xl sm:leading-tight md:leading-tight font-bold mb-6 text-foreground">
              Business Transformation Through <span className="text-tertiary">Strategic Leadership</span>
            </h1>
            <div className="text-xl mb-6 text-muted-foreground">
              <p>Advisory services that help you move faster, not slower. We deliver strategic business transformation — helping owners digitize, streamline, and scale.</p>
              <p className="mt-4">When you need more than consulting but can't afford full-time executive overhead, we bridge that gap with fractional leadership that delivers real results.</p>
            </div>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer">Book Discovery Call</a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="py-12 bg-muted" id="services-overview">
        <div className="container-custom">
          <SectionTitle 
            title="Our Transformation Services" 
            subtitle="From strategic advisory to hands-on implementation, we provide the leadership and systems you need to scale your business without the traditional overhead." 
            center 
          />
          
          <div className="max-w-4xl mx-auto text-center mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most business owners know they need help, but traditional solutions are either too expensive or too generic. 
                We've spent nearly two decades building a different approach — one that combines strategic leadership with 
                high-performance teams that actually deliver results. Here's how we transform businesses:
              </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {/* Service 1 */}
            <div className="bg-card border border-border p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-tertiary/20 p-1 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <div className="bg-tertiary text-tertiary-foreground w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">1</span>
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2 text-foreground" id="fractional-leadership">Fractional Executive Leadership</h3>
              <p className="text-muted-foreground mb-3 text-sm">
                A lot of people say they're bootstrapping and that's why they're not hiring, but the truth is they just need help — maybe not full-time employees, and definitely not at Silicon Valley prices.
              </p>
              <div className="p-3 rounded-lg mb-3 border-l-4 border-tertiary">
                <p className="text-xs font-medium" style={{ color: '#9c7a0a' }}>The Reality:</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You don't need another consultant who gives you a report and leaves. You need someone who understands your business, 
                  makes decisions with you, and stays accountable for the outcomes. That's fractional leadership done right.
                </p>
              </div>
              <ul className="space-y-1 mb-3 text-sm">
                <li className="flex">
                  <Check className="text-tertiary mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Strategic sessions that accelerate decision-making</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Business transformation roadmapping</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>High-performance team structure design</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Systems with built-in accountability</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Weekly strategic guidance and course corrections</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Direct access for urgent strategic decisions</span>
                </li>
              </ul>
              <div className="bg-card border border-tertiary/20 p-2 rounded-lg mb-3">
                <p className="text-xs font-medium text-tertiary mb-1">Perfect For:</p>
                <p className="text-xs text-muted-foreground">
                  Growing businesses that need strategic leadership but aren't ready for C-level hires. Companies stuck between 
                  "solopreneur" and "enterprise" that need someone to own the transformation process.
                </p>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="hover:border-tertiary text-sm flex-1">
                  <Link to="/services/fractional-leadership">View More</Link>
                </Button>
                <Button asChild variant="outline" className="hover:border-tertiary text-sm flex-1">
                  <Link to="/packages#fractional-exec">View Pricing</Link>
                </Button>
              </div>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-tertiary-100 p-1 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <div className="bg-tertiary-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">2</span>
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2" id="global-talent">Global Talent Excellence</h3>
              <p className="text-muted-foreground mb-3 text-sm">
                We hire people from Africa and the Caribbean exclusively — not just to give opportunities, but because the results speak for themselves. Nearly two decades of proven excellence.
              </p>
              <div className="bg-accent-50 p-3 rounded-lg mb-3 border-l-4 border-tertiary-500">
                <p className="text-xs font-medium text-tertiary-700">Why This Works:</p>
                <p className="text-xs text-muted-foreground mt-1">
                  When you hire people who are genuinely grateful for the opportunity and bring exceptional skills to the table, 
                  you get loyalty, dedication, and performance that's impossible to find elsewhere. We've proven this for nearly 20 years.
                </p>
              </div>
              <ul className="space-y-1 mb-3 text-sm">
                <li className="flex">
                  <Check className="text-tertiary-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Elite talent from Africa and the Caribbean</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>People who bring out their best when valued</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Project ownership and excellence mindset</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Structured accountability systems</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Cultural fit assessment and onboarding</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Ongoing performance management and development</span>
                </li>
              </ul>
              <div className="bg-white border border-tertiary-200 p-2 rounded-lg mb-3">
                <p className="text-xs font-medium text-tertiary-700 mb-1">The Difference:</p>
                <p className="text-xs text-muted-foreground">
                  Unlike typical remote hiring, we provide full team integration, cultural training, and ongoing management. 
                  You get enterprise-level talent with the dedication of people who truly appreciate the opportunity.
                </p>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="hover:border-tertiary-500 text-sm flex-1">
                  <Link to="/services/global-talent">View More</Link>
                </Button>
                <Button asChild variant="outline" className="hover:border-tertiary-500 text-sm flex-1">
                  <Link to="/packages#global-talent">View Pricing</Link>
                </Button>
              </div>
            </div>
            
            {/* Service 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-tertiary-100 p-1 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <div className="bg-tertiary-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">3</span>
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2" id="legacy-transformation">Legacy Business Transformation</h3>
              <p className="text-muted-foreground mb-3 text-sm">
                Some businesses are ready to grow — but the family doesn't want to take it over. We help restructure, digitize, and rebuild so the business becomes something worth continuing — or selling.
              </p>
              <div className="bg-accent-50 p-3 rounded-lg mb-3 border-l-4 border-tertiary-500">
                <p className="text-xs font-medium text-tertiary-700">The Challenge:</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Many family businesses hit a wall where they're successful but outdated. The next generation doesn't want to inherit 
                  the chaos, and selling isn't viable because the business isn't attractive to buyers. We fix both problems.
                </p>
              </div>
              <ul className="space-y-1 mb-3 text-sm">
                <li className="flex">
                  <Check className="text-tertiary-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Digital transformation strategy</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Operational restructuring</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Scalable systems implementation</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Exit or succession planning</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Process documentation and standardization</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Financial optimization and cleanup</span>
                </li>
              </ul>
              <div className="bg-white border border-tertiary-200 p-2 rounded-lg mb-3">
                <p className="text-xs font-medium text-tertiary-700 mb-1">Typical Outcomes:</p>
                <p className="text-xs text-muted-foreground">
                  Businesses that were "unsellable" become attractive acquisition targets. Family operations that ran on institutional 
                  knowledge become systematic and transferable. Usually 2-3x valuation improvement within 18 months.
                </p>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="hover:border-tertiary-500 text-sm flex-1">
                  <Link to="/services/legacy-transformation">View More</Link>
                </Button>
                <Button asChild variant="outline" className="hover:border-tertiary-500 text-sm flex-1">
                  <Link to="/packages#legacy-transformation">View Pricing</Link>
                </Button>
              </div>
            </div>
            
            {/* Service 4 */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-tertiary-100 p-1 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <div className="bg-tertiary-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">4</span>
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2" id="systems-implementation">High-Performance Systems Design</h3>
              <p className="text-muted-foreground mb-3 text-sm">
                We had to build structure, implement checks and balances, and create rip cords for quick pivots. That's what high performance looks like.
              </p>
              <div className="bg-accent-50 p-3 rounded-lg mb-3 border-l-4 border-tertiary-500">
                <p className="text-xs font-medium text-tertiary-700">Why Systems Matter:</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Great people can't perform without great systems. We don't just build processes — we build intelligent systems 
                  that make it easier to do the right thing and harder to make mistakes. Plus built-in pivots when things change.
                </p>
              </div>
              <ul className="space-y-1 mb-3 text-sm">
                <li className="flex">
                  <Check className="text-tertiary-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Accountability frameworks with quick pivots</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>End-to-end process optimization</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Strategic systems integration</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Performance tracking and optimization</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Quality control and error prevention</span>
                </li>
                <li className="flex">
                  <Check className="text-tertiary-500 mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                  <span>Scalability planning and implementation</span>
                </li>
              </ul>
              <div className="bg-white border border-tertiary-200 p-2 rounded-lg mb-3">
                <p className="text-xs font-medium text-tertiary-700 mb-1">What Makes Ours Different:</p>
                <p className="text-xs text-muted-foreground">
                  Most consultants build rigid systems that break when reality hits. We build adaptive systems with "rip cords" — 
                  ways to quickly pivot when market conditions change or new opportunities emerge. Flexibility built into the foundation.
                </p>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="hover:border-tertiary-500 text-sm flex-1">
                  <Link to="/services/systems-design">View More</Link>
                </Button>
                <Button asChild variant="outline" className="hover:border-tertiary-500 text-sm flex-1">
                  <Link to="/packages#systems">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How We Work */}
      <section className="py-12 bg-gradient-to-br from-accent-100 to-tertiary-50">
        <div className="container-custom">
          <SectionTitle 
            title="Our Strategic Operating Model" 
            subtitle="If you want great outcomes from gig teams, you may not be the person to manage the project. Sometimes you need to trust someone who can own it end-to-end." 
            center 
          />
          
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed mb-3">
              The biggest mistake business owners make with remote teams is trying to manage them the same way they'd manage 
              local employees. That doesn't work. Here's our proven 3-phase approach that actually delivers results:
            </p>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-tertiary-200">
              <p className="text-sm font-medium text-tertiary-700 mb-1">The Key Insight:</p>
              <p className="text-sm text-muted-foreground">
                When you hire a team through us, you're not getting employees to manage — you're getting a complete business 
                function that we own, optimize, and scale for you. That's the difference between success and struggle.
              </p>
            </div>
          </div>
          
          {/* Operating Model Steps */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-tertiary-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold">1</span>
              </div>
              <h4 className="text-lg font-medium text-center mb-3">Strategic Assessment</h4>
              <p className="text-sm text-muted-foreground text-center">
                We analyze your current operations, identify bottlenecks, and design a transformation roadmap tailored to your specific needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-tertiary-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold">2</span>
              </div>
              <h4 className="text-lg font-medium text-center mb-3">Team Integration</h4>
              <p className="text-sm text-muted-foreground text-center">
                We assemble and manage high-performance teams that integrate seamlessly with your business culture and objectives.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-tertiary-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold">3</span>
              </div>
              <h4 className="text-lg font-medium text-center mb-3">Continuous Optimization</h4>
              <p className="text-sm text-muted-foreground text-center">
                We continuously monitor, optimize, and scale your operations to ensure sustained growth and performance improvement.
              </p>
            </div>
          </div>
          
          {/* Additional Context Section */}
          <div className="mt-16 bg-white p-6 rounded-lg shadow-sm border border-tertiary-200">
            <h4 className="text-lg font-medium mb-3 text-center">Why This Model Works Where Others Fail</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-tertiary-700 mb-2 text-sm">Traditional Approach Problems:</h5>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Consultants deliver reports, not results</li>
                  <li>• Remote teams lack proper oversight</li>
                  <li>• No accountability for outcomes</li>
                  <li>• Systems break when consultants leave</li>
                  <li>• Business owners become project managers</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-tertiary-700 mb-2 text-sm">Our Strategic Difference:</h5>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• We own the entire transformation process</li>
                  <li>• Direct accountability for business outcomes</li>
                  <li>• Built-in systems for quick pivots</li>
                  <li>• Ongoing optimization and scaling</li>
                  <li>• You focus on growing, we handle execution</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      
      {/* CTA */}
      <CallToAction 
        title="Ready for strategic business transformation?" 
        subtitle="Let's discuss how we can help you build the systems and teams your business needs to scale without the traditional overhead or management headaches." 
        primaryButtonText="Book Your Discovery Call" 
        primaryButtonLink="http://calendly.com/PhreshPhactory"
        secondaryButtonText="View Pricing" 
        secondaryButtonLink="/packages" 
        dark={true} 
      />
    </div>
  );
};

export default Services;
