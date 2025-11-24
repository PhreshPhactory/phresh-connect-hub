import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Youtube, ArrowRight, Heart, ExternalLink, ShoppingBag } from 'lucide-react';
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

interface BrandLink {
  id: string;
  name: string;
  url: string;
  display_order: number;
  is_featured: boolean;
}

const ProductSpotlights = () => {
  const [allContent, setAllContent] = useState<ProductSpotlight[]>([]);
  const [brandLinks, setBrandLinks] = useState<BrandLink[]>([]);
  const [upNextBrands, setUpNextBrands] = useState<BrandLink[]>([]);
  const [loading, setLoading] = useState(true);

  const trackClick = async (linkName: string, linkUrl: string) => {
    try {
      await supabase.from('link_clicks').insert({
        link_name: linkName,
        link_url: linkUrl,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      });
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  useEffect(() => {
    fetchSpotlights();
    fetchBrandLinks();

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

  // Note: YouTube playlist sync has been moved to manual admin control
  // to prevent API quota exhaustion from high traffic auto-syncing

  const fetchSpotlights = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', 'Product Spotlight')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      console.log('Fetched spotlights:', data?.length, 'brands');
      console.log('Shorts found:', data?.filter(item => item.shorts_url).length);
      console.log('Recent shorts:', data?.filter(item => item.shorts_url).slice(0, 3).map(s => ({ title: s.title, created_at: s.created_at })));
      setAllContent((data || []) as any);
    } catch (error) {
      console.error('Error fetching product spotlights:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBrandLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('brand_links')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      
      const featured = (data || []).filter(link => link.is_featured);
      const upNext = (data || []).filter(link => !link.is_featured);
      
      setBrandLinks(featured);
      setUpNextBrands(upNext);
    } catch (error) {
      console.error('Error fetching brand links:', error);
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
      <section className="py-12 bg-gradient-to-b from-tertiary/5 to-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <Badge className="mb-4 bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
              <Heart className="w-4 h-4 mr-2" />
              Supporting Black Excellence
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Shop Black-Owned Brands
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Click any brand below to shop directly. Scroll down to watch video reviews.
            </p>
          </div>

          {/* Featured Brands - Direct Shop Links */}
          {brandLinks.length > 0 && (
            <div className="max-w-4xl mx-auto mb-8">
              <h2 className="text-3xl font-bold text-center mb-6 text-foreground">Featured Brands</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {brandLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick(link.name, link.url)}
                    className="block p-6 bg-gradient-to-br from-tertiary/10 to-teal/10 hover:from-tertiary/20 hover:to-teal/20 border-2 border-tertiary/30 rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-tertiary/20 hover:scale-[1.02] group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <ShoppingBag className="w-6 h-6 text-tertiary" />
                      <ExternalLink className="w-5 h-5 text-tertiary group-hover:text-teal transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-tertiary transition-colors">{link.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Click to shop →</p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Up Next Brands */}
          {upNextBrands.length > 0 && (
            <div className="max-w-4xl mx-auto mb-8">
              <h2 className="text-2xl font-bold text-center mb-6 text-muted-foreground">Coming Soon</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upNextBrands.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick(link.name, link.url)}
                    className="block p-6 bg-muted/50 hover:bg-muted border border-border rounded-2xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{link.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Click to shop →</p>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-tertiary to-teal text-primary-foreground hover:opacity-90">
              <Link to="/links">
                View All {brandLinks.length + upNextBrands.length} Brand Links
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-tertiary text-tertiary hover:bg-tertiary/10">
              <Link to="/brands">
                Feature Your Brand
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Shorts Gallery Section */}
      <ShortsGallery shorts={allContent.filter(item => item.shorts_url)} />

      {/* Video Content Section */}
      <section className="py-16 bg-gradient-to-b from-background to-teal/5">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Watch & Learn About Each Brand</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get an inside look at each Black-owned brand with our video reviews and product showcases
            </p>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading brands...</p>
            </div>
          ) : allContent.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No brands available yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {allContent.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-card border border-border flex flex-col">
                    {item.shorts_url ? (
                      // Short Video Display
                      <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                        <iframe
                          src={`https://www.youtube.com/embed/${item.shorts_url.split('/').pop()}?controls=1&modestbranding=1&rel=0`}
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
                            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                    
                    <CardContent className="p-6 flex-1 flex flex-col">
                      {item.shorts_url && (
                        <Badge className="mb-3 bg-primary/10 text-primary w-fit">
                          Short
                        </Badge>
                      )}
                      <h3 className="text-xl font-bold mb-3 text-foreground line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {item.excerpt}
                      </p>
                      
                      <div className="space-y-3 mt-auto">
                        {item.shopping_link && (
                          <Button 
                            asChild 
                            size="lg"
                            className="w-full bg-gradient-to-r from-tertiary to-teal hover:opacity-90"
                          >
                            <a 
                              href={item.shopping_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                e.stopPropagation();
                                trackClick(`Shop ${item.brand_name || item.title}`, item.shopping_link!);
                              }}
                              className="flex items-center justify-center"
                            >
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              Shop {item.brand_name || 'Now'}
                            </a>
                          </Button>
                        )}
                        <Button asChild variant="outline" className="w-full">
                          <Link to={`/shop/${item.slug}`}>
                            {item.shorts_url ? 'View Short Details' : 'Watch Full Review'}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
          </>
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
            <Button asChild size="lg" className="bg-gradient-to-r from-teal to-tertiary text-primary-foreground hover:opacity-90">
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