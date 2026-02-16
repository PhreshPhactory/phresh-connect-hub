import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Youtube, ShoppingBag } from 'lucide-react';

interface Brand {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  feature_image: string;
  video_url: string;
}

const FeaturedBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, excerpt, slug, feature_image, video_url')
        .eq('category', 'Product Spotlight')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setBrands(data || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || brands.length === 0) return null;

  return (
    <section className="py-20 bg-muted">
      <div className="container-custom">
        <div className="text-center mb-12">
          <Badge className="mb-4">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Afro-Descendant Created Brands
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Shop the Diaspora
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Afro-Descendant Created Brands Curated Daily
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
          {brands.map((brand) => (
            <Link 
              key={brand.id} 
              to={`/shop/${brand.slug}`}
              className="group"
            >
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative pb-[56.25%] bg-muted overflow-hidden">
                  {brand.feature_image ? (
                    <img
                      src={brand.feature_image}
                      alt={brand.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                      <Youtube className="w-12 h-12 text-primary/40" />
                    </div>
                  )}
                  {brand.video_url && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-red-600 text-white">
                        <Youtube className="w-3 h-3 mr-1" />
                        Video
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {brand.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {brand.excerpt}
                  </p>
                  <div className="flex items-center text-primary font-medium text-sm">
                    <span>View Brand</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/shop">
              View All Afro-Descendant Created Brands
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;
