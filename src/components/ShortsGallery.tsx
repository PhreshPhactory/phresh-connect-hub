import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface Product {
  item_name: string;
  link: string;
}

interface Short {
  id: string;
  title: string;
  shorts_url?: string;
  shopping_link?: string;
  products?: Product[];
  slug: string;
}

interface ShortsGalleryProps {
  shorts: Short[];
}

const getYouTubeShortsEmbedUrl = (url: string): string => {
  // Handle various YouTube Shorts URL formats
  const patterns = [
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  return url;
};

const ShortsGallery: React.FC<ShortsGalleryProps> = ({ shorts }) => {
  if (!shorts || shorts.length === 0) return null;

  // Filter out any shorts without a shorts_url
  const validShorts = shorts.filter(short => short.shorts_url);
  
  if (validShorts.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Quick Picks
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shoppable Shorts
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quick highlights of amazing Black-owned brands. Watch and shop in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {validShorts.map((short) => (
            <Card key={short.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              {/* Video Player - Mobile Optimized */}
              <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                <iframe
                  src={getYouTubeShortsEmbedUrl(short.shorts_url!)}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={short.title}
                  style={{ border: 'none' }}
                />
              </div>

              {/* Shop Section */}
              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]">
                  {short.title}
                </h3>

                {/* Products List */}
                {short.products && short.products.length > 0 && (
                  <div className="space-y-2">
                    {short.products.slice(0, 2).map((product, idx) => (
                      <a
                        key={idx}
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-xs text-muted-foreground hover:text-primary transition-colors group/product"
                      >
                        <span className="line-clamp-1">{product.item_name}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/product:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                )}

                {/* Shop Buttons */}
                <div className="flex gap-2">
                  {short.shopping_link && (
                    <Button
                      asChild
                      size="sm"
                      className="flex-1"
                    >
                      <a
                        href={short.shopping_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Shop Now
                      </a>
                    </Button>
                  )}
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <a href={`/product-spotlight/${short.slug}`}>
                      View More
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShortsGallery;
