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
  keywords = "business transformation, remote workforce, fractional leadership, global talent, legacy modernization, strategic consulting, executive leadership, systems design",
  canonicalUrl,
  ogImage = "https://phreshphactory.com/og-image.jpg",
  structuredData,
  articleAuthor,
  publishDate,
  modifiedDate,
  pageType = 'website'
}) => {
  const fullTitle = title.includes('Phresh Phactory') ? title : `${title} | Phresh Phactory - Strategic Business Transformation`;
  const fullCanonicalUrl = canonicalUrl || (typeof window !== 'undefined' ? `https://phreshphactory.com${window.location.pathname}` : 'https://phreshphactory.com');
  
  // Enhanced structured data
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Phresh Phactory, Inc.",
    "alternateName": "Phresh Phactory",
    "description": "Strategic business transformation through fractional leadership, global talent teams, and legacy system modernization.",
    "url": "https://phreshphactory.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://phreshphactory.com/logo.png",
      "width": 400,
      "height": 400
    },
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Kiera Foley"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "United States",
      "addressCountry": "US"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-555-PHRESH",
        "contactType": "customer service",
        "availableLanguage": "English",
        "areaServed": "US"
      },
      {
        "@type": "ContactPoint",
        "email": "info@phreshphactory.co",
        "contactType": "sales",
        "availableLanguage": "English"
      }
    ],
    "sameAs": [
      "https://linkedin.com/company/phresh-phactory",
      "https://www.youtube.com/@PhreshPhactoryTV",
      "https://instagram.com/phreshphactory",
      "https://twitter.com/phreshphactory"
    ],
    "serviceType": [
      "Business Transformation",
      "Fractional Leadership",
      "Remote Team Management",
      "Legacy System Modernization",
      "Strategic Consulting"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Business Transformation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fractional Leadership",
            "description": "C-level executive leadership on a fractional basis"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Global Talent Teams",
            "description": "Skilled remote teams from around the world"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Legacy Transformation",
            "description": "Modernization of legacy systems and processes"
          }
        }
      ]
    }
  };

  // Create breadcrumb structured data
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

  // Add current page to breadcrumb if not home
  if (typeof window !== 'undefined' && window.location.pathname !== '/') {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    pathSegments.forEach((segment, index) => {
      breadcrumbData.itemListElement.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' '),
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
      <meta name="copyright" content="© 2024 Phresh Phactory, Inc. All rights reserved." />
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
      <meta name="expires" content="never" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
      
      {/* Structured Data - Breadcrumbs */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
      
      {/* Structured Data - Website */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Phresh Phactory",
          "url": "https://phreshphactory.com",
          "description": "Strategic business transformation through fractional leadership, global talent teams, and legacy system modernization.",
          "publisher": {
            "@type": "Organization",
            "name": "Phresh Phactory, Inc."
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://phreshphactory.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;