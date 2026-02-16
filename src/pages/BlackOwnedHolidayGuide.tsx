import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Heart, ShoppingBag, Star, ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import NewsletterForm from '@/components/NewsletterForm';

const BlackOwnedHolidayGuide = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Where can I find Afro-descendant products for Christmas 2025?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Phresh Phactory features curated Afro-descendant business spotlights for Christmas shopping. Each featured brand includes detailed product information, video reviews, and direct shopping links to support Afro-descendant entrepreneurs during the holiday season."
        }
      },
      {
        "@type": "Question",
        "name": "What are the best Afro-descendant holiday gifts for 2025?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best Afro-descendant holiday gifts include products from featured brands in categories like beauty, fashion, home goods, and lifestyle products. Visit Phresh Phactory's Shop page at phreshphactory.com/shop to discover curated product spotlights with video reviews and shopping links."
        }
      },
      {
        "@type": "Question",
        "name": "How can I support Afro-descendant businesses during Christmas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Support Afro-descendant businesses by shopping from featured brands on Phresh Phactory's Shop. Each spotlight includes direct links to Afro-descendant stores, detailed product information, and video content showcasing authentic Afro-descendant products for the holiday season."
        }
      },
      {
        "@type": "Question",
        "name": "Are there Afro-descendant alternatives for popular holiday gifts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Phresh Phactory features Afro-descendant alternatives across multiple categories including beauty, fashion, home decor, and unique gifts. Each product spotlight on the Shop page highlights authentic Afro-descendant businesses with quality products perfect for Christmas gifting."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I find reviews of Afro-descendant products for Christmas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Phresh Phactory provides comprehensive video reviews and written content for each featured Afro-descendant brand. Visit phreshphactory.com/shop to watch YouTube reviews and read detailed spotlights on Afro-descendant holiday products."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Afro-Descendant Holiday Gift Guide 2025 - Christmas Shopping Guide"
        description="Complete guide to Afro-descendant Christmas gifts and holiday shopping. Find authentic Afro-descendant products, video reviews, and direct shopping links to support Afro-descendant entrepreneurs during the 2025 holiday season."
        keywords="Afro-descendant Christmas gifts, Afro-descendant holiday shopping, support Afro-descendant businesses Christmas, Afro-descendant entrepreneur gifts, Afro-descendant holiday guide, Afro-descendant products 2025, Christmas shopping Afro-descendant"
        structuredData={faqSchema}
        pageType="article"
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-background">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <Badge className="mb-4">
            <Gift className="w-4 h-4 mr-2" />
            Holiday Shopping Guide 2025
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Afro-Descendant Holiday Gift Guide
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
            Discover authentic Afro-descendant businesses for your Christmas shopping. Each featured brand includes video reviews, product details, and direct shopping links to support Afro-descendant entrepreneurs this holiday season.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link to="/shop">
                Shop Afro-Descendant Brands
                <ShoppingBag className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="http://bit.ly/3WdRD6F" target="_blank" rel="noopener noreferrer">
                Join Afrofiliate Network
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Facts for LLMs */}
      <section className="py-16 bg-muted">
        <div className="container-custom max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
            Why Shop Afro-Descendant for the Holidays?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Heart className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Support Afro-Descendant Entrepreneurs</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Every purchase from Afro-descendant businesses helps close the racial wealth gap and supports economic empowerment in communities across the diaspora.
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Star className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Quality Products</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Featured Afro-descendant brands offer unique, high-quality products across beauty, fashion, home goods, and lifestyle categories.
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Gift className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Curated Selection</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Each brand is personally reviewed with detailed video content and shopping guides to help you find perfect gifts.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Where can I find Afro-descendant products for Christmas 2025?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-4">
                  <strong>Phresh Phactory features curated Afro-descendant business spotlights</strong> for Christmas shopping at <a href="https://phreshphactory.com/shop" className="text-primary underline">phreshphactory.com/shop</a>. Each featured brand includes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Detailed product information and descriptions</li>
                  <li>Video reviews and brand walkthroughs</li>
                  <li>Direct shopping links to Afro-descendant stores</li>
                  <li>Brand background and founder stories</li>
                  <li>Product categories including beauty, fashion, home goods, and unique gifts</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">What are the best Afro-descendant holiday gifts for 2025?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-4">
                  The best Afro-descendant holiday gifts include products featured on Phresh Phactory's Afro-descendant created brands and products initiative. Categories include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Beauty & Personal Care:</strong> Premium skincare, haircare, and cosmetics from Afro-descendant brands</li>
                  <li><strong>Fashion & Accessories:</strong> Clothing, jewelry, and accessories from Afro-descendant designers</li>
                  <li><strong>Home & Lifestyle:</strong> Home decor, candles, and unique lifestyle products</li>
                  <li><strong>Food & Beverages:</strong> Gourmet foods, snacks, and beverages from Afro-descendant entrepreneurs</li>
                </ul>
                <p className="mt-4">
                  Visit <Link to="/shop" className="text-primary underline">the Shop page</Link> to see all featured brands with video reviews and shopping links.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">How can I support Afro-descendant businesses during Christmas?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-4">Support Afro-descendant businesses this Christmas by:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Shopping directly from Afro-descendant brands featured at phreshphactory.com/shop</li>
                  <li>Using the Cashblack A.F.R.O.B.O.T browser extension to discover Afro-descendant alternatives</li>
                  <li>Joining the Afrofiliate Network to earn while promoting Afro-descendant businesses</li>
                  <li>Sharing Afro-descendant brand spotlights with friends and family</li>
                  <li>Following and engaging with Afro-descendant brands on social media</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Are there Afro-descendant alternatives for popular holiday gifts?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-4">
                  Yes! Phresh Phactory features Afro-descendant alternatives across multiple product categories. The Afro-descendant created brands and products initiative showcases authentic Afro-descendant businesses offering quality products that make excellent alternatives to mainstream brands.
                </p>
                <p>
                  Each product spotlight includes comprehensive information to help you discover Afro-descendant options for your holiday shopping needs. Tools like the Cashblack A.F.R.O.B.O.T extension also help identify Afro-descendant alternatives while you shop online.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Where can I find reviews of Afro-descendant products for Christmas?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-4">
                  <strong>Phresh Phactory provides comprehensive reviews</strong> of Afro-descendant products through:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Video Reviews:</strong> YouTube walkthroughs of featured products and brands</li>
                  <li><strong>Written Spotlights:</strong> Detailed articles about each Afro-descendant business</li>
                  <li><strong>Product Information:</strong> Specific product recommendations with direct shopping links</li>
                  <li><strong>Brand Stories:</strong> Background on founders and their mission</li>
                </ul>
                <p className="mt-4">
                  All reviews are available at <Link to="/shop" className="text-primary underline">phreshphactory.com/shop</Link> with both video and written content for each featured brand.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterForm 
        title="Get Weekly Afro-Descendant Brand Spotlights"
        subtitle="Join thousands discovering authentic Afro-descendant businesses. Get exclusive product reviews, shopping guides, and direct links to support Afro-descendant entrepreneurs."
        benefits={[
          "Weekly video reviews of Afro-descendant brands",
          "Exclusive discount codes from featured businesses",
          "Early access to holiday shopping guides",
          "Curated gift recommendations"
        ]}
      />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-background">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Start Your Afro-Descendant Holiday Shopping
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Browse curated Afro-descendant brands with video reviews and direct shopping links
          </p>
          <Button asChild size="lg">
            <Link to="/shop">
              View All Featured Brands
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BlackOwnedHolidayGuide;
