import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';

export default function Blog() {
  return (
    <>
      <SEOHead 
        title="Blog - Strategic Insights for Vision-Led Businesses"
        description="Weekly strategies on transformation, global talent, and building high-performance teams. Get strategic frameworks, global talent insights, transformation guides, and leadership principles."
        keywords="strategic insights, business transformation, global talent, leadership, transformation guides"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-teal text-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Strategic Insights
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Weekly strategies on transformation, global talent, and building high-performance teams.
              </p>
            </div>
          </div>
        </section>

        {/* YouTube Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
              Follow Us on YouTube
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12">
              Watch our latest insights on strategic business transformation
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <article className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video relative">
                  <img 
                    src="https://img.youtube.com/vi/DFaDI9UIJHA/maxresdefault.jpg" 
                    alt="Global Talent Excellence" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">▶</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-teal font-medium mb-2">Global Talent</div>
                  <h3 className="text-xl font-heading font-semibold mb-3">
                    Global Talent Excellence
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Discover why hiring from Africa and the Caribbean delivers unmatched results for businesses.
                  </p>
                  <a 
                    href="https://www.youtube.com/watch?v=DFaDI9UIJHA" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-teal hover:text-teal/80 font-medium"
                  >
                    Watch on YouTube →
                  </a>
                </div>
              </article>
              
              <article className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video relative">
                  <img 
                    src="https://img.youtube.com/vi/0I4B4SvY654/maxresdefault.jpg" 
                    alt="High-Performance Systems" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">▶</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary font-medium mb-2">Systems</div>
                  <h3 className="text-xl font-heading font-semibold mb-3">
                    High-Performance Systems
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    See how we build systems with accountability frameworks and quick pivot capabilities.
                  </p>
                  <a 
                    href="https://www.youtube.com/watch?v=0I4B4SvY654" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Watch on YouTube →
                  </a>
                </div>
              </article>
              
              <article className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video relative">
                  <img 
                    src="https://img.youtube.com/vi/6EVfQotUeEM/maxresdefault.jpg" 
                    alt="Strategic Business Transformation" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">▶</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-tertiary font-medium mb-2">Transformation</div>
                  <h3 className="text-xl font-heading font-semibold mb-3">
                    Strategic Business Transformation
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Learn how we help businesses scale through strategic leadership and global talent excellence.
                  </p>
                  <a 
                    href="https://www.youtube.com/watch?v=6EVfQotUeEM" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-tertiary hover:text-tertiary/80 font-medium"
                  >
                    Watch on YouTube →
                  </a>
                </div>
              </article>
            </div>
            
            <div className="text-center">
              <a 
                href="https://www.youtube.com/@PhreshPhactoryTV" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary inline-block"
              >
                Subscribe to Our Channel
              </a>
            </div>
          </div>
        </section>

        {/* Strategic Insights */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
              Strategic Frameworks
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12">
              Deep insights on transformation, leadership, and global talent management
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">Strategic Frameworks</h3>
                <p className="text-muted-foreground">
                  Proven methodologies for business transformation and growth.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">Global Talent Insights</h3>
                <p className="text-muted-foreground">
                  Best practices for hiring and managing international teams.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">Transformation Guides</h3>
                <p className="text-muted-foreground">
                  Step-by-step approaches to modernizing business operations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👑</span>
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">Leadership Principles</h3>
                <p className="text-muted-foreground">
                  Essential skills for leading high-performance teams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Insights */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
              Latest Insights
            </h2>
            
            <div className="space-y-8 max-w-4xl mx-auto">
              <article className="bg-card p-8 rounded-lg">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-48 h-32 bg-gradient-to-br from-primary to-teal rounded-lg flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-2xl">🎯</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-primary font-medium mb-2">Strategic Advisory</div>
                    <h3 className="text-2xl font-heading font-semibold mb-3">
                      Advisory Services That Accelerate Growth
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      How to implement advisory services that help you move faster, not slower, with proven frameworks for accelerated decision-making.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Strategic frameworks</span>
                      <span className="text-primary font-medium">Coming Soon</span>
                    </div>
                  </div>
                </div>
              </article>
              
              <article className="bg-card p-8 rounded-lg">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-48 h-32 bg-gradient-to-br from-teal to-tertiary rounded-lg flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-2xl">⚡</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-teal font-medium mb-2">High Performance</div>
                    <h3 className="text-2xl font-heading font-semibold mb-3">
                      Building Systems with Quick Pivot Capabilities
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Learn how to build structure, implement checks and balances, and create rip cords for quick pivots in high-performance organizations.
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Transformation guides</span>
                      <span className="text-teal font-medium">Coming Soon</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="section-padding bg-primary text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Join Leaders Getting Strategic Insights
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Weekly strategies on transformation, global talent, and building high-performance teams.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 rounded-lg text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-tertiary"
                />
                <button type="submit" className="btn-tertiary whitespace-nowrap">
                  Subscribe
                </button>
              </form>
              <p className="text-sm text-white/70">
                No spam. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}