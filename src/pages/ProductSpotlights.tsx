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

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Buy Black - Support Black-Owned Brands"
        description="Discover and support Black-owned brands and products I feature. Watch my YouTube videos and read detailed content about each brand."
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
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Explore Black-owned brands and products featured this holiday season. Each spotlight includes a YouTube video walkthrough and detailed written content.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <a href="http://bit.ly/3WdRD6F" target="_blank" rel="noopener noreferrer">
                  Join Afrofiliate Network
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">
                  Feature Your Brand
                </Link>
              </Button>
            </div>
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
                      {spotlight.shopping_link && (
                        <Button 
                          asChild 
                          className="w-full mb-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <a 
                            href={spotlight.shopping_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            Shop Now
                          </a>
                        </Button>
                      )}
                      <div className="flex items-center text-primary font-medium">
                        <span>View Spotlight</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container-custom max-w-3xl mx-auto text-center">
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
      </section>
    </div>
  );
};

export default ProductSpotlights;