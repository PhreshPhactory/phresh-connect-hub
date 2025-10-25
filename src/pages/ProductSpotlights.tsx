import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Youtube, ArrowRight, Heart } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

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
}

const ProductSpotlights = () => {
  const [spotlights, setSpotlights] = useState<ProductSpotlight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpotlights();
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
      setSpotlights(data || []);
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
    "numberOfItems": spotlights.length,
    "itemListElement": spotlights.map((spotlight, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": spotlight.title,
        "description": spotlight.excerpt,
        "image": spotlight.feature_image,
        "url": `https://phreshphactory.com/BuyBlack/${spotlight.slug}`,
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
        title="Buy Black - Black-Owned Christmas Gifts & Holiday Shopping 2025"
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
              Buy Black
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

      {/* Spotlights Grid */}
      <section className="py-16 bg-muted">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading brands...</p>
            </div>
          ) : spotlights.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No brands available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {spotlights.map((spotlight) => (
                <Link 
                  key={spotlight.id} 
                  to={`/BuyBlack/${spotlight.slug}`}
                  className="group"
                >
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 bg-card border border-border">
                    <div className="relative pb-[56.25%] bg-muted overflow-hidden">
                      {spotlight.feature_image ? (
                        <img
                          src={spotlight.feature_image}
                          alt={spotlight.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                          <Youtube className="w-16 h-16 text-primary/40" />
                        </div>
                      )}
                      {spotlight.video_url && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-red-600 text-white hover:bg-red-700">
                            <Youtube className="w-4 h-4 mr-1" />
                            Video
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {spotlight.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {spotlight.excerpt}
                      </p>
                      <Button className="w-full mb-3">
                        View Spotlight
                      </Button>
                      {spotlight.shopping_link && (
                        <Button 
                          asChild 
                          variant="outline"
                          className="w-full"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <a 
                            href={spotlight.shopping_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center"
                          >
                            Shop {spotlight.brand_name || spotlight.title.split(/[-:]/)[0].trim()} Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
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
              <strong>Phresh Phactory's Buy Black initiative</strong> features curated Black-owned businesses for Christmas and holiday shopping. 
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