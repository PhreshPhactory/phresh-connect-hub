
import React, { useEffect } from 'react';

const AnimationFallback = () => {
  useEffect(() => {
    // Only run on client side
    if (typeof document === 'undefined') return;
    
    // Fallback: Make all animated elements visible after a delay if they haven't appeared
    const timer = setTimeout(() => {
      const hiddenElements = document.querySelectorAll('.animate-on-scroll:not(.is-visible)');
      hiddenElements.forEach((el) => {
        el.classList.add('is-visible');
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default AnimationFallback;
