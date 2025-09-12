
import React, { useState } from 'react';
import { Youtube, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InsightsSection = () => {
  const [failedVideos, setFailedVideos] = useState<Set<string>>(new Set());
  const videos = [
    {
      id: '6EVfQotUeEM',
      title: 'Strategic Business Transformation',
      description: 'Learn how we help businesses scale through strategic leadership and global talent excellence.'
    },
    {
      id: 'DFaDI9UIJHA', 
      title: 'Global Talent Excellence',
      description: 'Discover why hiring from Africa and the Caribbean delivers unmatched results for businesses.'
    },
    {
      id: '0I4B4SvY654',
      title: 'High-Performance Systems',
      description: 'See how we build systems with accountability frameworks and quick pivot capabilities.'
    }
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container-custom">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-medium mb-4">
            Insights & <span className="text-tertiary text-highlight">Thought Leadership</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
            Strategic insights on transformation, talent, and building high-performance teams through real case studies and expert guidance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div key={video.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 animate-on-scroll">
              <div className="relative pb-[56.25%] h-0 overflow-hidden bg-gray-100">
                {failedVideos.has(video.id) ? (
                  // Fallback content when video fails to load
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-muted to-secondary">
                    <Youtube className="w-12 h-12 text-primary mb-4" />
                    <p className="text-primary font-medium text-center px-4">{video.title}</p>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    >
                      <span className="text-base">Watch on YouTube</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                    title={video.title}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    onError={() => {
                      setFailedVideos(prev => new Set([...prev, video.id]));
                    }}
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2">{video.title}</h3>
                <p className="text-muted-foreground text-base">{video.description}</p>
                {!failedVideos.has(video.id) && (
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mt-3 text-base"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* YouTube Follow Button */}
        <div className="text-center mt-12 animate-on-scroll">
          <Button 
            asChild
            size="lg"
            className="px-8 py-3 text-lg font-semibold mb-8"
          >
            <a 
              href="https://www.youtube.com/@PhreshPhactoryTV" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <Youtube size={24} />
              Follow Us on YouTube
            </a>
          </Button>
        </div>
        
        <div className="text-center animate-on-scroll">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border max-w-2xl mx-auto">
            <h3 className="text-2xl font-medium mb-3">Ready to Transform Your Business?</h3>
            <p className="text-muted-foreground mb-4">
              Get strategic insights delivered weekly, plus access to our exclusive transformation frameworks and case studies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="http://calendly.com/PhreshPhactory" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Book Discovery Call
              </a>
              <a
                href="/blog"
                className="border border-primary text-primary hover:bg-muted px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View All Insights
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
