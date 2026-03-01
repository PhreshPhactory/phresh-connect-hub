import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ExternalLink, 
  ArrowRight, 
  ShoppingBag, 
  Search, 
  Grid3X3, 
  LayoutList,
  Play,
  Sparkles,
  Filter,
  X
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import InlineNewsletterSignup from '@/components/InlineNewsletterSignup';
interface ProductSpotlight {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  feature_image: string;
  video_url: string;
  shopping_link: string;
  brand_name: string;
  category: string;
  created_at: string;
  shorts_url?: string;
}

type ViewMode = 'grid' | 'list';
type FilterType = 'all' | 'shop' | 'video';

const ProductSpotlights = () => {
  const [allContent, setAllContent] = useState<ProductSpotlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const siteOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://phreshphactory.com';
  const shopCanonicalUrl = `${siteOrigin}/shop`;
  const shopOgImage = allContent.find((item) => item.feature_image)?.feature_image || undefined;

  // Helper function to get reliable YouTube thumbnail (hqdefault always exists)
  const getReliableThumbnail = (imageUrl: string | null, videoUrl: string | null, shortsUrl: string | null): string | null => {
    // If we have an image that's not a YouTube thumbnail, use it
    if (imageUrl && !imageUrl.includes('i.ytimg.com')) {
      return imageUrl;
    }
    
    // Extract video ID from shorts or video URL and use hqdefault (always available)
    const url = shortsUrl || videoUrl;
    if (url) {
      const videoIdMatch = url.match(/(?:shorts\/|watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (videoIdMatch) {
        return `https://i.ytimg.com/vi/${videoIdMatch[1]}/hqdefault.jpg`;
      }
    }
    
    // Fallback: if maxresdefault fails, try hqdefault
    if (imageUrl?.includes('maxresdefault')) {
      return imageUrl.replace('maxresdefault', 'hqdefault');
    }
    
    return imageUrl;
  };

  // Helper function to extract first URL from text (content/excerpt)
  const extractFirstShopLink = (text: string | null): string | null => {
    if (!text) return null;
    // Match URLs that look like shopping links (tinyurl, amazon, etsy, etc.) - including www. prefix
    const urlRegex = /(https?:\/\/(?:www\.)?(?:tinyurl\.com|amzn\.to|bit\.ly|amazon\.com|etsy\.com|shopify\.com|gumroad\.com|[a-zA-Z0-9-]+\.myshopify\.com)[^\s<>"')\]]*)/gi;
    const match = text.match(urlRegex);
    return match ? match[0] : null;
  };

  // Get shop link - either from shopping_link field or extracted from content/excerpt
  const getShopLink = (product: ProductSpotlight): string | null => {
    if (product.shopping_link) return product.shopping_link;
    // Try to extract from excerpt first, then content
    return extractFirstShopLink(product.excerpt) || extractFirstShopLink(product.content);
  };

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
  }, []);

  const fetchSpotlights = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', 'Product Spotlight')
        .eq('published', true)
        .eq('language', 'en')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAllContent((data || []) as ProductSpotlight[]);
    } catch (error) {
      console.error('Error fetching product spotlights:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtered and searched products
  const filteredProducts = useMemo(() => {
    let products = allContent;

    // Apply filter
    if (activeFilter === 'shop') {
      products = products.filter(p => getShopLink(p));
    } else if (activeFilter === 'video') {
      products = products.filter(p => p.shorts_url || p.video_url);
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      products = products.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.brand_name?.toLowerCase().includes(query) ||
        p.excerpt?.toLowerCase().includes(query)
      );
    }

    return products;
  }, [allContent, searchQuery, activeFilter]);

  // Filter counts
  const filterCounts = useMemo(() => ({
    all: allContent.length,
    shop: allContent.filter(p => getShopLink(p)).length,
    video: allContent.filter(p => p.shorts_url || p.video_url).length,
  }), [allContent]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Afro-Descendant Created Brands Christmas Gifts & Product Spotlights",
    "description": "Curated collection of Afro-descendant created brands and products for holiday shopping",
    "numberOfItems": allContent.length,
    "itemListElement": allContent.map((spotlight, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": spotlight.title,
        "description": spotlight.excerpt,
        "image": {
          "@type": "ImageObject",
          "url": spotlight.feature_image,
          "copyrightNotice": `© ${new Date().getFullYear()} ${spotlight.brand_name || spotlight.title.split(/[-:]/)[0].trim()}. All rights reserved.`,
          "creditText": spotlight.brand_name || spotlight.title.split(/[-:]/)[0].trim(),
          "creator": {
            "@type": "Organization",
            "name": spotlight.brand_name || spotlight.title.split(/[-:]/)[0].trim()
          },
          "acquireLicensePage": `https://phreshphactory.com/shop/${spotlight.slug}`
        },
        "url": `https://phreshphactory.com/shop/${spotlight.slug}`,
        "brand": {
          "@type": "Brand",
          "name": spotlight.brand_name || spotlight.title.split(/[-:]/)[0].trim()
        },
        "offers": {
          "@type": "Offer",
          "url": `https://phreshphactory.com/shop/${spotlight.slug}`,
          "availability": "https://schema.org/InStock",
          "priceCurrency": "USD",
          "price": "0"
        }
      }
    }))
  };

  const ProductCard = ({ product, isListView = false }: { product: ProductSpotlight; isListView?: boolean }) => {
    const shopLink = getShopLink(product);
    const hasShopLink = !!shopLink;
    const hasVideo = !!(product.shorts_url || product.video_url);
    const thumbnailUrl = getReliableThumbnail(product.feature_image, product.video_url, product.shorts_url);

    if (isListView) {
      return (
        <div className="group flex gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
          {/* Image - links to detail page */}
          <Link to={`/shop/${product.slug}`} className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted relative block">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                <ShoppingBag className="w-8 h-8 text-primary/30" />
              </div>
            )}
            {hasVideo && (
              <div className="absolute bottom-1 right-1 bg-red-500 rounded-full p-1">
                <Play className="w-3 h-3 text-white fill-white" />
              </div>
            )}
          </Link>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center min-w-0">
            <Link to={`/shop/${product.slug}`}>
              <h3 className="font-semibold text-foreground text-base md:text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {product.brand_name || product.title.split(/[-:|]/)[0].trim()}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {product.excerpt || "Discover this amazing Afro-descendant created brand"}
            </p>
            <div className="flex items-center gap-2 mt-3">
              {hasShopLink && shopLink && (
                <a
                  href={shopLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick(product.brand_name || product.title, shopLink)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg hover:bg-foreground/90 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Shop this item
                </a>
              )}
              {hasVideo && (
                <Badge variant="outline" className="text-xs text-red-500 border-red-500/30">
                  <Play className="w-3 h-3 mr-1" />
                  Video
                </Badge>
              )}
            </div>
          </div>

          {/* Action - View Details */}
          <Link to={`/shop/${product.slug}`} className="flex-shrink-0 flex items-center">
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        </div>
      );
    }

    return (
      <div className="group block">
        {/* Product Image - links to detail page */}
        <Link to={`/shop/${product.slug}`} className="block">
          <div className="aspect-square bg-muted rounded-xl overflow-hidden relative border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                <ShoppingBag className="w-12 h-12 text-primary/30" />
              </div>
            )}
            
            {/* Play Button Overlay - centered for videos */}
            {hasVideo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-4 group-hover:bg-black/70 transition-colors duration-300">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </div>
            )}
            
            {/* Hover Overlay for non-video items */}
            {!hasVideo && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-3 shadow-lg transform scale-90 group-hover:scale-100">
                  <ArrowRight className="w-5 h-5 text-foreground" />
                </div>
              </div>
            )}
          </div>
        </Link>

        {/* Product Info */}
        <div className="mt-3 space-y-2">
          <Link to={`/shop/${product.slug}`}>
            <h3 className="font-medium text-foreground text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors">
              {product.brand_name || product.title.split(/[-:|]/)[0].trim()}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {product.excerpt || "Click to discover"}
          </p>
          
          {/* Shop this item button */}
          {hasShopLink && shopLink ? (
            <a
              href={shopLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick(product.brand_name || product.title, shopLink)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs font-medium rounded-lg hover:bg-foreground/90 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Shop this item
            </a>
          ) : (
            <Link 
              to={`/shop/${product.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs font-medium rounded-lg hover:bg-foreground/90 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Shop this item
            </Link>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Shop Afro-Descendant Created Brands | Curated Gifts, Home & Beauty Products 2025"
        description="Discover 100+ curated Afro-descendant created brands. Shop unique gifts, home decor, beauty products & more. Support Afro-descendant created brands and products with every purchase. Updated daily."
        keywords="Afro-descendant created brands, shop Afro-descendant, Afro-descendant gifts, Afro-descendant created products, support Afro-descendant business, Afro-descendant entrepreneurs, Afro-descendant created brands and products, Afro-descendant home decor, Afro-descendant beauty, Afro-descendant gifts 2025"
        structuredData={itemListSchema}
        canonicalUrl={shopCanonicalUrl}
        ogImage={shopOgImage}
      />

      {/* Spanish Language Banner */}
      <div className="bg-primary text-primary-foreground py-3">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3">
          <span className="text-sm font-medium">¿Hablas español?</span>
          <Link 
            to="/compro" 
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-primary text-sm font-semibold rounded-full hover:bg-white/90 transition-colors"
          >
            Compro en Español
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/5 via-background to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Curated Collection
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground tracking-tight">
              Afro-descendant created brands curated daily.
            </h1>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <Button asChild size="lg" className="btn-primary">
                <Link to="/brands">Feature Your Brand</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/AffiliateApplication">Become an Affiliate</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filters - Sticky */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search brands & products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 bg-muted/50 border-border focus:bg-background"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filters & View Toggle */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              {/* Filter Pills */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground hidden md:block" />
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                      activeFilter === 'all' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    All ({filterCounts.all})
                  </button>
                  <button
                    onClick={() => setActiveFilter('shop')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                      activeFilter === 'shop' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    Shop ({filterCounts.shop})
                  </button>
                  <button
                    onClick={() => setActiveFilter('video')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                      activeFilter === 'video' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <Play className="w-3 h-3 inline mr-1" />
                    Video ({filterCounts.video})
                  </button>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {searchQuery ? `Search Results` : activeFilter === 'all' ? 'All Products' : activeFilter === 'shop' ? 'Shoppable Products' : 'Video Content'}
            </h2>
            <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {loading ? (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" 
              : "flex flex-col gap-3"
            }>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`animate-pulse ${viewMode === 'list' ? 'flex gap-4 p-4 bg-card rounded-xl' : ''}`}>
                  <div className={viewMode === 'list' ? "w-24 h-24 md:w-32 md:h-32 bg-muted rounded-lg flex-shrink-0" : "aspect-square bg-muted rounded-xl mb-3"} />
                  <div className={viewMode === 'list' ? "flex-1 space-y-2" : ""}>
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-2xl border border-border">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? `No results for "${searchQuery}". Try a different search term.`
                  : "No products match your current filter."
                }
              </p>
              <Button variant="outline" onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}>
                Clear Filters
              </Button>
            </div>
          ) : viewMode === 'list' ? (
            <div className="flex flex-col gap-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} isListView />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <InlineNewsletterSignup variant="hero" source="shop_page_inline" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              For Business Owners
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Want Your Brand Featured?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join our curated collection and reach thousands of shoppers looking to support Afro-descendant businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="shadow-lg">
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
      
      {/* Exit intent popup */}
      <ExitIntentPopup />
    </div>
  );
};

export default ProductSpotlights;
