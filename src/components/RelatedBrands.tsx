import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Youtube } from 'lucide-react';

interface Brand {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  feature_image: string;
  video_url: string;
}

interface RelatedBrandsProps {
  currentSlug: string;
  limit?: number;
}

const RelatedBrands = ({ currentSlug, limit = 3 }: RelatedBrandsProps) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedBrands();
  }, [currentSlug]);

  const fetchRelatedBrands = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, excerpt, slug, feature_image, video_url')
        .eq('category', 'Product Spotlight')
        .eq('published', true)
        .neq('slug', currentSlug)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      setBrands(data || []);
    } catch (error) {
      console.error('Error fetching related brands:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || brands.length === 0) return null;

  return (
    <section className="py-16 bg-muted mt-16">
      <div className="container-custom max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-foreground">
          More Black-Owned Brands to Support
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <Link 
              key={brand.id} 
              to={`/shop/${brand.slug}`}
              className="group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
      </div>
    </section>
  );
};

export default RelatedBrands;
