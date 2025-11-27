import { ProductGrid } from '@/components/shop/ProductGrid';
import { CartDrawer } from '@/components/shop/CartDrawer';
import SEOHead from '@/components/SEOHead';

export default function Shop() {
  return (
    <>
      <SEOHead
        title="Shop | Phresh Phactory"
        description="Shop exclusive products curated by Phresh Phactory. Support Black-owned brands and discover unique items."
        canonicalUrl="https://phreshphactory.com/shop"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Shop
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Discover curated products from Black-owned brands. Every purchase supports the diaspora commerce ecosystem.
                </p>
              </div>
              <CartDrawer />
            </div>
          </div>
        </section>
        
        {/* Products Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <ProductGrid limit={20} />
          </div>
        </section>
      </div>
    </>
  );
}
