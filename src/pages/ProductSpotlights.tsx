import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Heart, ArrowRight, ShoppingBag } from 'lucide-react';
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
  shorts_url?: string;
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
      setAllContent((data || []) as ProductSpotlight[]);
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
        .eq('is_featured', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setBrandLinks(data || []);
    } catch (error) {
      console.error('Error fetching brand links:', error);
    }
  };

  // Get all items with images and shopping links
  const shopItems = allContent.filter(item => item.feature_image && item.shopping_link);
  
  // Items with images but no shopping link (show anyway with "View Details" option)
  const videoItems = allContent.filter(item => item.feature_image && !item.shopping_link);

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
        }
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Shop - Black-Owned Christmas Gifts & Holiday Shopping 2025"
        description="Discover Black-owned brands and products for Christmas shopping. Support Black entrepreneurs with curated holiday gift ideas."
        keywords="Buy Black, Black-owned businesses, Black-owned gifts, Christmas gifts Black-owned, African American businesses"
        structuredData={itemListSchema}
      />

      {/* Clean Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Heart className="w-3 h-3 mr-1.5" />
              Black-Owned Brands
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
              Shop Black Excellence
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Click any product to shop directly from the brand. Every purchase supports Black entrepreneurs.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Brands - Shopify Style Grid */}
      {brandLinks.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Featured Brands</h2>
              <span className="text-sm text-muted-foreground">{brandLinks.length} brands</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {brandLinks.map((brand) => (
                <a
                  key={brand.id}
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick(brand.name, brand.url)}
                  className="group block"
                >
                  <div className="aspect-square bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl overflow-hidden relative border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <div className="text-center">
                        <ShoppingBag className="w-10 h-10 text-primary/40 mx-auto mb-3 group-hover:text-primary/60 transition-colors" />
                        <h3 className="font-semibold text-foreground text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors">
                          {brand.name}
                        </h3>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground text-center group-hover:text-primary transition-colors">
                    Shop Now →
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Grid - Shopify Style */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">All Products</h2>
            <span className="text-sm text-muted-foreground">{allContent.length} items</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-muted rounded-xl mb-3" />
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : allContent.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Products coming soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {allContent.map((product) => {
                const hasShopLink = !!product.shopping_link;
                const CardWrapper = hasShopLink ? 'a' : Link;
                const cardProps = hasShopLink 
                  ? { 
                      href: product.shopping_link, 
                      target: "_blank", 
                      rel: "noopener noreferrer",
                      onClick: () => trackClick(product.brand_name || product.title, product.shopping_link)
                    }
                  : { to: `/shop/${product.slug}` };

                return (
                  <CardWrapper
                    key={product.id}
                    {...cardProps as any}
                    className="group block"
                  >
                    {/* Product Image */}
                    <div className="aspect-square bg-muted rounded-xl overflow-hidden relative border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                      {product.feature_image ? (
                        <img
                          src={product.feature_image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                          <ShoppingBag className="w-12 h-12 text-primary/30" />
                        </div>
                      )}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-3 shadow-lg">
                          {hasShopLink ? (
                            <ExternalLink className="w-5 h-5 text-foreground" />
                          ) : (
                            <ArrowRight className="w-5 h-5 text-foreground" />
                          )}
                        </div>
                      </div>

                      {/* Badge */}
                      {product.shorts_url && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                          Video
                        </Badge>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="mt-3 space-y-1">
                      <h3 className="font-medium text-foreground text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors">
                        {product.brand_name || product.title.split(/[-:|]/)[0].trim()}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {product.excerpt || "Click to shop"}
                      </p>
                      <p className="text-xs font-medium text-primary">
                        {hasShopLink ? "Shop Now →" : "View Details →"}
                      </p>
                    </div>
                  </CardWrapper>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Want Your Brand Featured?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join our curated collection of Black-owned businesses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/brands">
                  Feature Your Brand
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="http://bit.ly/3WdRD6F" target="_blank" rel="noopener noreferrer">
                  Join Afrofiliate Network
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductSpotlights;
