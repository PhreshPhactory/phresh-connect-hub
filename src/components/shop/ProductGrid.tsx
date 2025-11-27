import { useQuery } from '@tanstack/react-query';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Package } from 'lucide-react';

interface ProductGridProps {
  limit?: number;
  query?: string;
}

export function ProductGrid({ limit = 20, query }: ProductGridProps) {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['shopify-products', limit, query],
    queryFn: () => fetchProducts(limit, query),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-destructive">Failed to load products. Please try again.</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">No products yet</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Products coming soon! Check back later or tell me what products you'd like to add.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product: ShopifyProduct) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </div>
  );
}
