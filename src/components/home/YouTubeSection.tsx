import React, { useState } from 'react';
import { Youtube, ExternalLink, Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const YouTubeSection = () => {
  const [failedThumbnails, setFailedThumbnails] = useState<Set<string>>(new Set());
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [embedErrors, setEmbedErrors] = useState<Set<string>>(new Set());
  
  const videos = [
    {
      id: 'DFaDI9UIJHA',
      title: 'Global Talent Excellence',
      description: 'Discover why hiring from Africa and the Caribbean delivers unmatched results for businesses.'
    },
    {
      id: '0I4B4SvY654',
      title: 'High-Performance Systems',
      description: 'See how we build systems with accountability frameworks and quick pivot capabilities.'
    },
    {
      id: '6EVfQotUeEM',
      title: 'Strategic Business Transformation',
      description: 'Learn how we help businesses scale through strategic leadership and global talent excellence.'
    }
  ];

  const handleThumbnailError = (videoId: string) => {
    setFailedThumbnails(prev => new Set([...prev, videoId]));
  };

  const handleEmbedError = (videoId: string) => {
    console.log(`Embed failed for video: ${videoId}`);
    setEmbedErrors(prev => new Set([...prev, videoId]));
    setPlayingVideo(null);
  };

  const handlePlayClick = (videoId: string) => {
    console.log(`Attempting to play video: ${videoId}`);
    // For videos with embedding restrictions, open directly in YouTube
    // This is the most reliable approach for restricted videos
    if (typeof window !== 'undefined') {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="py-10 px-6 sm:py-24 sm:px-0 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-black section-title-accent center text-[32px] leading-[40px] sm:text-[48px] md:text-[64px] sm:leading-tight">
            Follow Us on <span className="text-strategic-gold text-highlight">YouTube</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {videos.map((video, index) => (
            <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 animate-on-scroll border-2 border-strategic-gold/10 hover:border-strategic-gold/30 group">
              <div className="relative pb-[56.25%] h-0 overflow-hidden bg-gray-100 group">
                {failedThumbnails.has(video.id) ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
                    <Youtube className="w-12 h-12 text-primary-500 mb-4" />
                    <p className="text-primary-600 font-medium text-center px-4">{video.title}</p>
                  </div>
                ) : (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                      alt={video.title}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      onError={() => handleThumbnailError(video.id)}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handlePlayClick(video.id);
                        }}
                        className="bg-white bg-opacity-90 rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300 hover:bg-opacity-100"
                        aria-label={`Play ${video.title}`}
                      >
                        <Play className="w-8 h-8 text-primary-600 ml-1" fill="currentColor" />
                      </button>
                    </div>
                  </>
                )}
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label={`Watch ${video.title} on YouTube`}
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-xl font-heading font-bold mb-3 text-black group-hover:text-global-teal transition-colors text-center">{video.title}</h3>
                <p className="text-jet-gray text-base mb-6 font-medium leading-relaxed text-center">{video.description}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 transition-colors text-base font-medium"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center animate-on-scroll">
          <Button 
            asChild
            size="lg"
            className="bg-strategic-gold hover:bg-strategic-gold/90 text-black px-10 py-4 text-lg font-bold shadow-xl transition-all duration-300 hover:scale-105"
          >
            <a 
              href="https://www.youtube.com/@PhreshPhactoryTV" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <Youtube size={24} />
              Subscribe to Our Channel
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;