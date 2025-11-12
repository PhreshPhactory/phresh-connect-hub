import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Youtube, ArrowRight, Heart } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import ShortsGallery from '@/components/ShortsGallery';

interface ProductSpotlight {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  feature_image: string;
  video_url: string;
  shopping_link: string;
  brand_name: string;
  category: string;
  created_at: string;
  shorts_url?: string;
  products?: any[];
}

const ProductSpotlights = () => {
  const [allContent, setAllContent] = useState<ProductSpotlight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpotlights();

    // Set up realtime subscription for new product spotlights
    const channel = supabase
      .channel('product-spotlights-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'blog_posts',
          filter: 'category=eq.Product Spotlight'
        },
        (payload) => {
          console.log('New product spotlight added:', payload.new);
          // Add new spotlight to the list
          setAllContent(prev => [payload.new as ProductSpotlight, ...prev]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'blog_posts',
          filter: 'category=eq.Product Spotlight'
        },
        (payload) => {
          console.log('Product spotlight updated:', payload.new);
          // Update the spotlight in the list
          setAllContent(prev => 
            prev.map(item => item.id === payload.new.id ? payload.new as ProductSpotlight : item)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Throttled (1h) playlist sync to ensure latest videos/shorts are imported
  useEffect(() => {
    const key = 'bb_last_playlist_sync';
    const last = localStorage.getItem(key);
    const now = Date.now();
    const shouldSync = !last || now - Number(last) > 60 * 60 * 1000; // 1 hour

    if (!shouldSync) return;

    supabase.functions
      .invoke('sync-youtube-playlist')
      .then((res) => {
        console.log('Invoked sync-youtube-playlist:', res);
        localStorage.setItem(key, String(now));
        // Refresh after sync
        fetchSpotlights();
      })
      .catch((err) => {
        console.error('Failed to invoke sync-youtube-playlist:', err);
      });
  }, []);

  const fetchSpotlights = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', 'Product Spotlight')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setAllContent((data || []) as any);
    } catch (error) {
      console.error('Error fetching product spotlights:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create ItemList Schema for search engines and Afrobot
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Black-Owned Christmas Gifts & Product Spotlights",
    "description": "Curated collection of Black-owned businesses and products for holiday shopping",
    "numberOfItems": allContent.length,
    "itemListElement": allContent.map((spotlight, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": spotlight.title,
        "description": spotlight.excerpt,
        "image": spotlight.feature_image,
        "url": `https://phreshphactory.com/shop/${spotlight.slug}`,
        "brand": {
          "@type": "Brand",
          "name": spotlight.brand_name || spotlight.title.split(/[-:]/)[0].trim()
        },
        "offers": spotlight.shopping_link ? {
          "@type": "Offer",
          "url": spotlight.shopping_link,
          "availability": "https://schema.org/InStock"
        } : undefined,
        "category": "Black-owned business",
        "additionalType": "Black-owned product"
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Shop - Black-Owned Christmas Gifts & Holiday Shopping 2025"
        description="Discover Black-owned brands and products for Christmas shopping. Support Black entrepreneurs with curated holiday gift ideas. Featured brands with video reviews and shopping links for the 2025 holiday season."
        keywords="Buy Black, Black-owned businesses, Black-owned gifts, Christmas gifts Black-owned, African American businesses, Black entrepreneurs, holiday shopping Black-owned, support Black businesses, Black Friday, Cyber Monday, Christmas 2025, Black-owned products, Afrofiliate, shop Black-owned"
        structuredData={itemListSchema}
      />

      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Supporting Black Excellence
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Shop
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore Black-owned brands and products featured this holiday season. Each spotlight includes a YouTube video walkthrough and detailed written content.
            </p>
            
            <Button asChild size="lg">
              <Link to="/brands">
                Feature Your Brand
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* All Content Grid - Mixed Videos and Shorts */}
      <section className="py-16 bg-muted">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading brands...</p>
            </div>
          ) : allContent.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No brands available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
              {allContent.map((item) => {
                const isShort = !!item.shorts_url;
                
                return (
                  <Link 
                    key={item.id} 
                    to={`/shop/${item.slug}`}
                    className={`group ${isShort ? 'col-span-1 md:col-span-1 lg:col-span-1' : 'col-span-2 md:col-span-2 lg:col-span-2'}`}
                  >
                    <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 bg-card border border-border">
                      {isShort ? (
                        // Short Video Display
                        <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                          <iframe
                            src={`https://www.youtube.com/embed/${item.shorts_url!.split('/').pop()}?controls=1&modestbranding=1&rel=0`}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={item.title}
                            style={{ border: 'none' }}
                          />
                        </div>
                      ) : (
                        // Regular Video/Image Display
                        <div className="relative pb-[56.25%] bg-muted overflow-hidden">
                          {item.feature_image ? (
                            <img
                              src={item.feature_image}
                              alt={item.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                              <Youtube className="w-16 h-16 text-primary/40" />
                            </div>
                          )}
                          {item.video_url && (
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-red-600 text-white hover:bg-red-700">
                                <Youtube className="w-4 h-4 mr-1" />
                                Video
                              </Badge>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <CardContent className="p-6">
                        {isShort && (
                          <Badge className="mb-3 bg-primary/10 text-primary">
                            Short
                          </Badge>
                        )}
                        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {item.excerpt}
                        </p>
                        {item.shopping_link && (
                          <Button 
                            asChild 
                            size="lg"
                            className="w-full mb-3"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a 
                              href={item.shopping_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-center"
                            >
                              Shop {item.brand_name || 'Now'}
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                          </Button>
                        )}
                        <Button variant="outline" className="w-full">
                          {isShort ? 'View Short' : 'View Full Review'}
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* About and CTA Section */}
      <section className="py-16 bg-background">
        <div className="container-custom max-w-4xl mx-auto">
          {/* About This Directory */}
          <div className="bg-muted/50 rounded-lg p-8 mb-12 text-left">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">About This Directory</h2>
            <p className="text-base text-muted-foreground mb-4">
              <strong>Phresh Phactory's Shop</strong> features curated Black-owned businesses for Christmas and holiday shopping. 
              Each featured brand includes comprehensive product reviews, video content, and direct shopping links.
            </p>
            <p className="text-base text-muted-foreground">
              Categories include beauty, fashion, home goods, food & beverages, and unique gifts from Black entrepreneurs. 
              All brands are personally reviewed and vetted to help shoppers discover quality Black-owned products for the 2025 holiday season.
            </p>
          </div>

          {/* Join Afrofiliate CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Want to Earn Commissions Sharing These Brands?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the Afrofiliate Network and earn by promoting Black-owned businesses you love
            </p>
            <Button asChild size="lg">
              <a href="http://bit.ly/3WdRD6F" target="_blank" rel="noopener noreferrer">
                Join Afrofiliate Network
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductSpotlights;