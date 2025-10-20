import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Youtube, ExternalLink } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

interface Spotlight {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  feature_image: string;
  video_url: string;
  category: string;
  created_at: string;
}

const ProductSpotlight = () => {
  const { slug } = useParams<{ slug: string }>();
  const [spotlight, setSpotlight] = useState<Spotlight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchSpotlight();
    }
  }, [slug]);

  const fetchSpotlight = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('category', 'Product Spotlight')
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;
      setSpotlight(data);
    } catch (error) {
      console.error('Error fetching product spotlight:', error);
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : '';
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading brand spotlight...</p>
      </div>
    );
  }

  if (!spotlight) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Brand not found</h1>
          <Link to="/product-spotlights">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Buy Black
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(spotlight.video_url);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={`${spotlight.title} - Buy Black`}
        description={spotlight.excerpt}
        ogImage={spotlight.feature_image}
      />

      <article className="py-12">
        <div className="container-custom max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/product-spotlights" className="inline-flex items-center text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Buy Black
          </Link>

          {/* Header */}
          <header className="mb-8">
            <Badge className="mb-4">{spotlight.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {spotlight.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <time dateTime={spotlight.created_at}>
                {new Date(spotlight.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </header>

          {/* YouTube Video */}
          {embedUrl && (
            <div className="mb-12">
              <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={embedUrl}
                  title={spotlight.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </AspectRatio>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <a 
                    href={spotlight.video_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Youtube className="w-5 h-5" />
                    Watch on YouTube
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          )}

          {/* Feature Image (if no video) */}
          {!embedUrl && spotlight.feature_image && (
            <div className="mb-12">
              <img
                src={spotlight.feature_image}
                alt={spotlight.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:text-foreground
              prose-p:text-muted-foreground
              prose-a:text-primary
              prose-strong:text-foreground
              prose-ul:text-muted-foreground
              prose-ol:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: spotlight.content }}
          />
        </div>
      </article>
    </div>
  );
};

export default ProductSpotlight;