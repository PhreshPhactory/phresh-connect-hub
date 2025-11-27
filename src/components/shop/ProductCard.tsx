import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { node } = product;
  
  const firstImage = node.images.edges[0]?.node;
  const firstVariant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;
    
    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });
    
    toast.success(`${node.title} added to cart`, {
      position: "top-center",
    });
  };

  return (
    <Link to={`/product/${node.handle}`}>
      <Card className="group overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="aspect-square overflow-hidden bg-muted">
          {firstImage ? (
            <img
              src={firstImage.url}
              alt={firstImage.altText || node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground truncate mb-1">{node.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 min-h-[2.5rem]">
            {node.description || 'No description'}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
            </span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={!firstVariant?.availableForSale}
              className="gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
