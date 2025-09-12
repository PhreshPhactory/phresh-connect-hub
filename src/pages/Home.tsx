import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';

export default function Home() {
  return (
    <>
      <SEOHead 
        title="Global Operations Partners for Vision-Led Businesses - Phresh Phactory"
        description="Transform your business with fractional executive leadership, global talent teams, and legacy system modernization. We help companies scale efficiently without the overhead of traditional business models."
        keywords="fractional leadership, global talent, legacy transformation, business transformation, operations partners"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-teal text-white py-20 lg:py-32">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                  Global Operations Partners for <span className="text-tertiary">Vision-Led Businesses</span>
                </h1>
                <p className="text-lg md:text-xl mb-6 text-white/90">
                  Transformation is not scary - stagnation is. We step into the chaos, build order from it, and leave better systems behind.
                </p>
                <p className="text-lg mb-8 text-white/80">
                  Transform your business with fractional executive leadership, global talent teams, and legacy system modernization. We help companies scale efficiently without the overhead of traditional business models.
                </p>
                <p className="text-lg mb-8 text-white/90 font-medium">
                  We turn your vision into action and lead the people who keep your business moving.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer" className="btn-tertiary inline-block text-center">
                    Book a Discovery Call
                  </a>
                  <Link to="/services" className="btn-secondary inline-block text-center">
                    See How It Works
                  </Link>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                <h3 className="text-2xl font-heading font-semibold mb-4">Want to Connect?</h3>
                <p className="text-white/80 mb-6">Let's get in touch</p>
                <form className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Your name" 
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-tertiary"
                  />
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-tertiary"
                  />
                  <select className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-tertiary">
                    <option value="">Business or Freelancer</option>
                    <option value="business">Business</option>
                    <option value="freelancer">Freelancer</option>
                  </select>
                  <button type="submit" className="w-full btn-primary">
                    Submit
                  </button>
                  <p className="text-sm text-white/60 text-center">
                    No spam. We respect your privacy.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Business Transformation */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Strategic Business Transformation
              </h2>
              <p className="text-xl text-muted-foreground">
                Having flexible workforces aren't a fallback — they're your competitive edge. We build systems and teams that reduce pressure, and unlock long-term growth.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center group">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <span className="text-3xl">👑</span>
                </div>
                <h3 className="text-2xl font-heading font-semibold mb-4">Fractional Executive Leadership</h3>
                <p className="text-muted-foreground mb-6">
                  High-level strategy and hands-on transformation — without the full-time overhead.
                </p>
                <Link to="/services/fractional-leadership" className="text-primary hover:text-primary/80 font-medium text-lg">
                  Learn More →
                </Link>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-teal/20 transition-colors">
                  <span className="text-3xl">🌍</span>
                </div>
                <h3 className="text-2xl font-heading font-semibold mb-4">Global Talent Teams</h3>
                <p className="text-muted-foreground mb-6">
                  We source, hire, and manage top-tier talent across Africa, America and the Caribbean — not just to check a box, but to raise the standard.
                </p>
                <Link to="/services/global-talent" className="text-teal hover:text-teal/80 font-medium text-lg">
                  Learn More →
                </Link>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary/20 transition-colors">
                  <span className="text-3xl">🔄</span>
                </div>
                <h3 className="text-2xl font-heading font-semibold mb-4">Legacy Business Transformation</h3>
                <p className="text-muted-foreground mb-6">
                  We restructure, digitize, and modernize operations so your business is easier to run, scale, or pass on.
                </p>
                <Link to="/services/legacy-transformation" className="text-tertiary hover:text-tertiary/80 font-medium text-lg">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
              What Others Are Saying
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16">
              Real feedback from partners…
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="bg-card p-8 rounded-lg shadow-sm">
                <blockquote className="text-lg italic mb-6 text-muted-foreground">
                  "Working with Kiera has been transformational to me and my business on a personal and professional level. In addition to the improved communication and organisation skills we now posses, the processes and systems we've built together and put in place have proved invaluable to the growth and sustainability in everything we do. We can see a tangible and measurable difference in before working with Kiera to where we are now and I would highly recommend her to everyone."
                </blockquote>
                <div className="flex items-center">
                  <div>
                    <div className="font-semibold">Matthew Addai</div>
                    <div className="text-sm text-muted-foreground">Co-Founder and CEO, Afrofiliate /Cashblack</div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-8 rounded-lg shadow-sm">
                <blockquote className="text-lg italic mb-6 text-muted-foreground">
                  "We went from 3,600 restaurants to receiving 8,000 restaurant submissions in 2020… Each one takes 10–15 minutes to review. I'd still be going through them today if I hadn't trusted other people to get involved...Kiera came in, taught herself the system, trained people, and built an amazing team. It's been incredible ever since."
                </blockquote>
                <div className="flex items-center">
                  <div>
                    <div className="font-semibold">Anthony Edwards Jr.</div>
                    <div className="text-sm text-muted-foreground">Founder and CEO, EatOkra, Inc.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real Business Transformation */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Real Business Transformation
              </h2>
              <p className="text-xl text-muted-foreground">
                We had to build structure, implement checks and balances, and create rip cords for quick pivots. That's what high performance looks like.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-heading font-semibold mb-3">Strategic Advisory</h3>
                <p className="text-muted-foreground mb-2">Advisory services that help you move faster, not slower.</p>
                <div className="text-sm text-primary font-medium">Accelerated decision-making</div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-heading font-semibold mb-3">Global Excellence</h3>
                <p className="text-muted-foreground mb-2">Hiring remotely, globally for over two decades with proven results.</p>
                <div className="text-sm text-teal font-medium">Unmatched talent quality</div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-heading font-semibold mb-3">Strategic Business Transformation</h3>
                <p className="text-muted-foreground mb-2">Learn how we help businesses scale through strategic leadership and global talent management.</p>
                <div className="text-sm text-tertiary font-medium">End-to-end solutions</div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-heading font-semibold mb-3">Global Talent Excellence</h3>
                <p className="text-muted-foreground mb-2">Learn what roles to fill and how to staff your startup the smart way.</p>
                <div className="text-sm text-foreground font-medium">Future-ready operations</div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Join leaders getting strategic insights
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Weekly strategies on transformation, global talent, and building high-performance teams.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Strategic frameworks</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Global talent insights</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Transformation guides</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Leadership principles</div>
                </div>
              </div>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </form>
              <p className="text-sm text-muted-foreground">
                No spam. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Ready for strategic business transformation?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Let's build the systems and teams your business needs to scale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="http://calendly.com/PhreshPhactory" target="_blank" rel="noopener noreferrer" className="btn-tertiary inline-block text-center">
                  Book a Discovery Call
                </a>
                <Link to="/services" className="btn-secondary inline-block text-center">
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}