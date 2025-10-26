import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import ShortsGallery from '@/components/ShortsGallery';

interface Product {
  item_name: string;
  link: string;
}

interface VideoContent {
  id: string;
  title: string;
  excerpt: string | null;
  feature_image: string | null;
  video_url: string | null;
  shopping_link: string | null;
  brand_name: string | null;
  category: string;
  created_at: string;
  shorts_url?: string;
  products?: Product[];
  slug: string;
}

const TV = () => {
  const [featuredVideos, setFeaturedVideos] = useState<VideoContent[]>([]);
  const [productVideos, setProductVideos] = useState<VideoContent[]>([]);
  const [shorts, setShorts] = useState<VideoContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideoContent();
  }, []);

  const fetchVideoContent = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, excerpt, feature_image, video_url, shopping_link, brand_name, category, created_at, shorts_url, products, slug, published')
        .eq('published', true)
        .not('video_url', 'is', null)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        // Transform the data to match our VideoContent interface
        const transformedData: VideoContent[] = data.map(post => {
          let products: Product[] = [];
          
          // Safely parse products JSON
          if (post.products && Array.isArray(post.products)) {
            products = (post.products as unknown as Product[]);
          }
          
          return {
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            feature_image: post.feature_image,
            video_url: post.video_url,
            shopping_link: post.shopping_link,
            brand_name: post.brand_name,
            category: post.category,
            created_at: post.created_at,
            shorts_url: post.shorts_url,
            products: products,
            slug: post.slug
          };
        });

        const shortsData = transformedData.filter(post => post.shorts_url);
        const featured = transformedData.filter(post => post.category === 'Product Spotlight' && !post.shorts_url).slice(0, 6);
        const products = transformedData.filter(post => post.category === 'Product Spotlight');
        
        setShorts(shortsData);
        setFeaturedVideos(featured);
        setProductVideos(products);
      }
    } catch (error) {
      console.error('Error fetching video content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <>
      <Helmet>
        <title>Phresh TV - Black-Owned Business Video Content | Phresh Phactory</title>
        <meta name="description" content="Watch product spotlights, brand stories, and shoppable video content featuring Black-owned businesses and entrepreneurs." />
        <meta name="keywords" content="Black-owned business videos, product spotlights, brand stories, video content, YouTube, shoppable videos" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full mb-6">
              <Play className="w-5 h-5" />
              <span className="font-medium">Phresh TV</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Watch & Shop Black-Owned
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover product spotlights, brand stories, and exclusive content featuring amazing Black-owned businesses you can support today.
            </p>
          </div>
        </section>

        {/* Featured Video Section */}
        {featuredVideos.length > 0 && (
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <SectionTitle 
                title="Featured Episodes" 
                subtitle="Latest product spotlights and brand stories"
                center
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredVideos.map((video) => (
                  <Card key={video.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video bg-muted">
                      {video.feature_image ? (
                        <img 
                          src={video.feature_image} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Play className="w-16 h-16 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2">{video.title}</h3>
                      {video.brand_name && (
                        <p className="text-sm text-muted-foreground mb-3">Brand: {video.brand_name}</p>
                      )}
                      {video.excerpt && (
                        <p className="text-muted-foreground mb-4 line-clamp-2">{video.excerpt}</p>
                      )}
                      <div className="flex gap-2">
                        {video.video_url && (
                          <Button asChild variant="default" className="flex-1">
                            <a href={`/product-spotlight/${video.id}`}>
                              Watch Now
                            </a>
                          </Button>
                        )}
                        {video.shopping_link && (
                          <Button asChild variant="outline" size="icon">
                            <a href={video.shopping_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Shoppable Shorts Section */}
        {shorts.length > 0 && (
          <ShortsGallery shorts={shorts} />
        )}

        {/* All Product Spotlights */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <SectionTitle 
              title="All Product Spotlights" 
              subtitle="Browse our complete collection of brand features"
              center
            />
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading videos...</p>
              </div>
            ) : productVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {productVideos.map((video) => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video bg-muted">
                      {video.feature_image && (
                        <img 
                          src={video.feature_image} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <a href={`/product-spotlight/${video.id}`}>
                          Watch
                        </a>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No videos available yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want Your Brand Featured?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join our growing network of Black-owned businesses and get your products in front of our engaged audience.
            </p>
            <Button asChild size="lg" variant="secondary">
              <a href="/brands">Apply Now</a>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default TV;
