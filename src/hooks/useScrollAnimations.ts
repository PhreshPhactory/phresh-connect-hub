import * as React from 'react';

export const useScrollAnimations = () => {
  React.useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '50px 0px'
    });

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .stagger-children');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);
};