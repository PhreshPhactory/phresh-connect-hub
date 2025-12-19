import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, ExternalLink, Play, Grid3X3, List, ShoppingBag, Video, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';

interface ProductSpotlight {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  slug: string;
  feature_image: string | null;
  video_url: string | null;
  shopping_link: string | null;
  brand_name: string | null;
  category: string;
  created_at: string;
  shorts_url?: string | null;
}

type ViewMode = 'grid' | 'list';
type FilterType = 'all' | 'shop' | 'video';

const Compro = () => {
  const [allContent, setAllContent] = useState<ProductSpotlight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Helper to extract shop link from content
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
        .select('*')
        .eq('category', 'Product Spotlight')
        .eq('published', true)
        .eq('language', 'es')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching spotlights:', error);
      } else {
        setAllContent(data || []);
      }
      setIsLoading(false);
    };

    fetchSpotlights();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = allContent;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.brand_name?.toLowerCase().includes(query) ||
        item.excerpt?.toLowerCase().includes(query)
      );
    }

    // Apply type filter
    if (activeFilter === 'shop') {
      filtered = filtered.filter(item => getShopLink(item));
    } else if (activeFilter === 'video') {
      filtered = filtered.filter(item => item.video_url || item.shorts_url);
    }

    return filtered;
  }, [allContent, searchQuery, activeFilter]);

  const filterCounts = useMemo(() => ({
    all: allContent.length,
    shop: allContent.filter(item => getShopLink(item)).length,
    video: allContent.filter(item => item.video_url || item.shorts_url).length,
  }), [allContent]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Marcas Afrodescendientes Seleccionadas",
    "description": "Productos seleccionados de marcas afrodescendientes",
    "numberOfItems": filteredProducts.length,
    "itemListElement": filteredProducts.slice(0, 10).map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": item.title,
        "description": item.excerpt,
        "image": item.feature_image,
        "brand": item.brand_name ? { "@type": "Brand", "name": item.brand_name } : undefined,
      }
    }))
  };

  const ProductCard = ({ item, isListView }: { item: ProductSpotlight; isListView: boolean }) => {
    const shopLink = getShopLink(item);
    const videoLink = item.shorts_url || item.video_url;

    if (isListView) {
      return (
        <Card className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
          <div className="flex flex-col sm:flex-row">
            {item.feature_image && (
              <div className="sm:w-48 h-32 sm:h-auto flex-shrink-0">
                <img
                  src={item.feature_image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                {item.brand_name && (
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {item.brand_name}
                  </Badge>
                )}
                <h3 className="font-semibold text-foreground line-clamp-1 mb-1">
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.excerpt}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Button size="sm" variant="outline" asChild className="gap-1.5">
                  <Link to={`/shop/${item.slug}`}>
                    <ExternalLink className="w-3.5 h-3.5" />
                    Detalles
                  </Link>
                </Button>

                {shopLink && (
                  <Button
                    size="sm"
                    className="gap-1.5"
                    onClick={() => {
                      trackClick(item.title, shopLink);
                      window.open(shopLink, '_blank');
                    }}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Comprar
                  </Button>
                )}
                {videoLink && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="gap-1.5"
                    onClick={() => {
                      trackClick(`${item.title} - Video`, videoLink);
                      window.open(videoLink, '_blank');
                    }}
                  >
                    <Play className="w-3.5 h-3.5" />
                    Ver
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <Link to={`/shop/${item.slug}`} className="block">
          <div className="aspect-video relative overflow-hidden bg-muted">
            {item.feature_image ? (
              <img
                src={item.feature_image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
              </div>
            )}
          </div>
        </Link>

        <div className="p-4">
          {item.brand_name && (
            <Badge variant="secondary" className="mb-2 text-xs">
              {item.brand_name}
            </Badge>
          )}
          <Link to={`/shop/${item.slug}`} className="block">
            <h3 className="font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
          </Link>
          {item.excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.excerpt}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            <Button size="sm" variant="outline" asChild className="gap-1.5">
              <Link to={`/shop/${item.slug}`}>
                <ExternalLink className="w-3.5 h-3.5" />
                Detalles
              </Link>
            </Button>

            {shopLink && (
              <Button
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  trackClick(item.title, shopLink);
                  window.open(shopLink, '_blank');
                }}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Comprar
              </Button>
            )}
            {videoLink && (
              <Button
                size="sm"
                variant="secondary"
                className="gap-1.5"
                onClick={() => {
                  trackClick(`${item.title} - Video`, videoLink);
                  window.open(videoLink, '_blank');
                }}
              >
                <Play className="w-3.5 h-3.5" />
                Ver
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <>
      <SEOHead
        title="Compro | Marcas Afrodescendientes"
        description="Descubre productos únicos de marcas afrodescendientes seleccionadas diariamente."
        keywords="marcas afrodescendientes, compras, productos, negocios negros, apoyar negocios negros"
        structuredData={itemListSchema}
      />

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              Colección Curada
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground tracking-tight">
              Marcas afrodescendientes curadas diariamente.
            </h1>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50 py-4">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar productos o marcas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1 p-1 bg-muted rounded-lg">
                {([
                  { key: 'all', label: 'Todos', icon: Sparkles },
                  { key: 'shop', label: 'Comprar', icon: ShoppingBag },
                  { key: 'video', label: 'Videos', icon: Video },
                ] as const).map(({ key, label, icon: Icon }) => (
                  <Button
                    key={key}
                    variant={activeFilter === key ? 'default' : 'ghost'}
                    size="sm"
                    className={cn(
                      "gap-1.5 text-xs",
                      activeFilter === key && "shadow-sm"
                    )}
                    onClick={() => setActiveFilter(key)}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                    <span className="text-[10px] opacity-70">({filterCounts[key]})</span>
                  </Button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex gap-1 p-1 bg-muted rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  className="px-2"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  className="px-2"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Display */}
      <section className="py-8 md:py-12">
        <div className="container-custom">
          {isLoading ? (
            <div className={cn(
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            )}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className={cn(
                    "bg-muted",
                    viewMode === 'grid' ? "aspect-video" : "h-32"
                  )} />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No se encontraron productos
              </h3>
              <p className="text-muted-foreground mb-4">
                Intenta ajustar tu búsqueda o filtros
              </p>
              <Button variant="outline" onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}>
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <div className={cn(
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            )}>
              {filteredProducts.map((item) => (
                <ProductCard key={item.id} item={item} isListView={viewMode === 'list'} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary/5">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            ¿Tienes una marca afrodescendiente?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Presenta tu marca a nuestra audiencia y conecta con clientes que apoyan negocios afrodescendientes.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link to="/brands">
              <Sparkles className="w-4 h-4" />
              Ser Destacado
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Compro;
