import { useEffect } from 'react';

interface CacheHeadersProps {
  cacheType?: 'static' | 'dynamic' | 'html';
  maxAge?: number;
}

const CacheHeaders = ({ 
  cacheType = 'html', 
  maxAge 
}: CacheHeadersProps) => {
  useEffect(() => {
    // Set appropriate cache headers based on content type
    const setCacheHeaders = () => {
      const headers: Record<string, string> = {};
      
      switch (cacheType) {
        case 'static':
          // Cache static assets (CSS, JS, images, fonts) for 1 year
          headers['Cache-Control'] = `public, max-age=${maxAge || 31536000}, immutable`;
          headers['Expires'] = new Date(Date.now() + (maxAge || 31536000) * 1000).toUTCString();
          break;
          
        case 'dynamic':
          // Cache API responses for shorter periods
          headers['Cache-Control'] = `public, max-age=${maxAge || 300}, s-maxage=${maxAge || 300}`;
          break;
          
        case 'html':
        default:
          // Cache HTML pages for 1 hour to allow updates
          headers['Cache-Control'] = `public, max-age=${maxAge || 3600}, s-maxage=${maxAge || 3600}`;
          headers['Vary'] = 'Accept-Encoding';
          break;
      }
      
      // Add ETag for better cache validation
      headers['ETag'] = `W/"${Date.now()}-${Math.random().toString(36).substr(2, 9)}"`;
      
      // Set headers via meta tags (limited effectiveness in SPA)
      Object.entries(headers).forEach(([key, value]) => {
        const existingMeta = document.querySelector(`meta[http-equiv="${key}"]`);
        if (existingMeta) {
          existingMeta.setAttribute('content', value);
        } else {
          const meta = document.createElement('meta');
          meta.setAttribute('http-equiv', key);
          meta.setAttribute('content', value);
          document.head.appendChild(meta);
        }
      });
    };

    setCacheHeaders();
  }, [cacheType, maxAge]);

  return null;
};

export default CacheHeaders;