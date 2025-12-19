import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

interface ProductSpotlight {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  video_url: string | null;
  shopping_link: string | null;
  shorts_url?: string | null;
}

const Compro = () => {
  const [products, setProducts] = useState<ProductSpotlight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const extractFirstShopLink = (content: string): string | null => {
    const shopPatterns = [
      /https?:\/\/[^\s<>"]*(?:shop|store|buy|amazon|etsy|shopify)[^\s<>"]*/i,
      /https?:\/\/(?:www\.)?amazon\.com[^\s<>"]*/i,
      /https?:\/\/[^\s<>"]+\/(?:products?|shop|store)[^\s<>"]*/i,
    ];
    for (const pattern of shopPatterns) {
      const match = content.match(pattern);
      if (match) return match[0];
    }
    return null;
  };

  const getShopLink = (item: ProductSpotlight): string | null => {
    if (item.shopping_link) return item.shopping_link;
    return extractFirstShopLink(item.content);
  };

  const getVideoId = (url: string | null): string | null => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
  };

  const trackClick = async (linkName: string, linkUrl: string) => {
    try {
      await supabase.from('link_clicks').insert({
        link_name: linkName,
        link_url: linkUrl,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent || null,
      });
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  useEffect(() => {
    const fetchSpotlights = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, excerpt, content, video_url, shopping_link, shorts_url')
        .eq('category', 'Product Spotlight')
        .eq('published', true)
        .eq('language', 'es')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching spotlights:', error);
      } else {
        setProducts(data || []);
      }
      setIsLoading(false);
    };

    fetchSpotlights();
  }, []);

  return (
    <>
      <SEOHead
        title="Compro | Tienda de Marcas Afrodescendientes | Compras Navideñas 2025"
        description="Descubre y compra productos únicos de marcas afrodescendientes. Apoya a emprendedores negros con regalos navideños, decoración y más. Compras en español."
        keywords="comprar negro, marcas afrodescendientes, tienda afrolatina, regalos navideños, compras navideñas 2025, productos afrodescendientes, negocios negros, apoyar negocios negros, tienda latina, compras en español, regalos afrolatinos"
      />

      <div className="min-h-screen bg-background py-8">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
            Marcas afrodescendientes curadas diariamente.
          </h1>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-muted rounded-lg mb-3" />
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-10 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">
              No se encontraron productos.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products
                .filter((item) => {
                  const videoUrl = item.shorts_url || item.video_url;
                  return videoUrl && getVideoId(videoUrl);
                })
                .map((item) => {
                const videoUrl = item.shorts_url || item.video_url;
                const videoId = getVideoId(videoUrl);
                const shopLink = getShopLink(item);

                return (
                  <div key={item.id} className="flex flex-col">
                    {/* Video */}
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-3">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?controls=0&modestbranding=1`}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full pointer-events-none"
                      />
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                      {item.excerpt || item.title}
                    </p>

                    {/* Buy Button */}
                    {shopLink && (
                      <Button
                        className="gap-2 w-fit"
                        onClick={() => {
                          trackClick(item.title, shopLink);
                          window.open(shopLink, '_blank');
                        }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Comprar
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Compro;
