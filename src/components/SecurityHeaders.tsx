import React, { useEffect } from 'react';
import { generateNonce } from '@/utils/security';

export const SecurityHeaders: React.FC = () => {
  useEffect(() => {
    // Only run on client side
    if (typeof document === 'undefined') return;
    
    const nonce = generateNonce();
    
    // Set only valid meta tags (remove X-Frame-Options as it must be HTTP header)
    const securityMetas = [
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      { name: 'X-Content-Type-Options', content: 'nosniff' },
      { name: 'X-XSS-Protection', content: '1; mode=block' }
    ];

    securityMetas.forEach(({ name, content }) => {
      if (!document.querySelector(`meta[name="${name}"]`)) {
        const meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    });
  }, []);

  return null;
};