import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: any;
  articleAuthor?: string;
  publishDate?: string;
  modifiedDate?: string;
  pageType?: 'website' | 'article' | 'service' | 'product';
}

const SEOHead: React.FC<SEOHeadProps> = ({ 
  title, 
  description, 
  keywords = "operations consulting, fractional leadership, diaspora commerce, Afro-descendant brands, global talent, business transformation, systems design, affiliate marketing, EatOkra, Afrofiliate",
  canonicalUrl,
  ogImage = "https://storage.googleapis.com/gpt-engineer-file-uploads/ezQitgdysuP0qHyBvOF4YpuyqpK2/social-images/social-1757765627192-Phresh Phactory Logo.png",
  structuredData,
  articleAuthor,
  publishDate,
  modifiedDate,
  pageType = 'website'
}) => {
  const fullTitle = title.includes('Phresh Phactory') ? title : `${title} | Phresh Phactory`;
  const fullCanonicalUrl = canonicalUrl || (typeof window !== 'undefined' ? `https://phreshphactory.com${window.location.pathname}` : 'https://phreshphactory.com');
  
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Phresh Phactory, Inc.",
    "alternateName": "Phresh Phactory",
    "description": "Boutique operations consultancy helping visionary founders scale through fractional leadership, global talent, systems design, and affiliate programs. Diaspora-focused, globally grounded.",
    "url": "https://phreshphactory.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://phreshphactory.com/phresh-phactory-favicon.png",
      "width": 400,
      "height": 400,
      "copyrightNotice": "© 2026 Phresh Phactory, Inc. All rights reserved.",
      "creditText": "Phresh Phactory, Inc.",
      "creator": {
        "@type": "Organization",
        "name": "Phresh Phactory, Inc."
      }
    },
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Kiera H.",
      "jobTitle": "Fractional Executive and Systems Strategist"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "email": "info@phreshphactory.com",
        "contactType": "customer service",
        "availableLanguage": "English",
        "areaServed": ["US", "Caribbean"]
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/newsletters/phresh-phactory-growth-notes-7320251645966061568/",
      "https://www.youtube.com/@PhreshPhactoryTV",
      "https://www.instagram.com/phreshphactorytv",
      "https://www.tiktok.com/@phreshphactorytv"
    ],
    "knowsAbout": [
      "Operations Consulting",
      "Fractional Leadership",
      "Diaspora Commerce",
      "Affiliate Marketing Systems",
      "Global Talent Management",
      "Business Transformation",
      "Systems Design"
    ],
    "serviceType": [
      "Fractional Executive Leadership",
      "Global Talent Excellence",
      "Legacy Business Transformation",
      "High-Performance Systems Design",
      "Affiliate Sales Blueprint Bootcamp",
      "Socially Selling Food Workshop"
    ],
    "areaServed": [
      { "@type": "Country", "name": "United States" },
      { "@type": "Place", "name": "Caribbean" },
      { "@type": "Continent", "name": "Africa" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Business Transformation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fractional Executive Leadership",
            "description": "Strategic sessions, roadmapping, team structure design, and weekly guidance for growing businesses"
          },
          "price": "8000",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Global Talent Excellence",
            "description": "Elite diaspora talent sourcing with full team integration and ongoing performance management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Legacy Business Transformation",
            "description": "Digital transformation, operational restructuring, and exit or succession planning for family businesses"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Affiliate Sales Blueprint Bootcamp",
            "description": "1-on-1 working session for brands to build a complete affiliate activation system"
          },
          "price": "1500",
          "priceCurrency": "USD"
        }
      ]
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://phreshphactory.com"
      }
    ]
  };

  if (typeof window !== 'undefined' && window.location.pathname !== '/') {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    pathSegments.forEach((segment, index) => {
      breadcrumbData.itemListElement.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
        "item": `https://phreshphactory.com/${pathSegments.slice(0, index + 1).join('/')}`
      });
    });
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Phresh Phactory, Inc." />
      <meta name="publisher" content="Phresh Phactory, Inc." />
      <meta name="copyright" content="© 2026 Phresh Phactory, Inc. All rights reserved." />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="en-US" />
      <link rel="alternate" hrefLang="en" href={fullCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={pageType} />
      <meta property="og:site_name" content="Phresh Phactory" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${title} - Phresh Phactory`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@phreshphactory" />
      <meta name="twitter:creator" content="@phreshphactory" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${title} - Phresh Phactory`} />
      
      {/* Article-specific meta tags */}
      {pageType === 'article' && articleAuthor && (
        <>
          <meta name="article:author" content={articleAuthor} />
          {publishDate && <meta name="article:published_time" content={publishDate} />}
          {modifiedDate && <meta name="article:modified_time" content={modifiedDate} />}
          <meta name="article:section" content="Business" />
          <meta name="article:tag" content={keywords} />
        </>
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="7 days" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
      
      {/* Structured Data - Breadcrumbs */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
      
      {/* Structured Data - Website with Search */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Phresh Phactory",
          "url": "https://phreshphactory.com",
          "description": "Boutique operations consultancy helping visionary founders scale through fractional leadership, global talent, and systems design.",
          "publisher": {
            "@type": "Organization",
            "name": "Phresh Phactory, Inc."
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
