
import { useEffect, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ChatWidget from '@/components/ChatWidget';
import AnimationFallback from '@/components/AnimationFallback';

const Layout = () => {
  const location = useLocation();

  // Optimize animation initialization with debouncing and memory management
  const initializeOptimizedAnimations = useCallback(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Use requestIdleCallback for non-critical animations
    const runWhenIdle = (callback: () => void) => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback, { timeout: 2000 });
      } else {
        setTimeout(callback, 100);
      }
    };

    runWhenIdle(() => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      
      if (animatedElements.length === 0) return;

      // Reset all animations first
      animatedElements.forEach((el) => {
        el.classList.remove('is-visible');
      });

      // Use more efficient observer with reduced options
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              // Don't unobserve immediately to allow for re-triggering
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: '30px 0px -10px 0px'
        }
      );

      // Observe all animated elements
      animatedElements.forEach((el) => {
        observer.observe(el);
      });

      // Optimized parallax with throttling
      let ticking = false;
      let lastScrollY = 0;
      
      const optimizedParallax = () => {
        const scrollY = window.pageYOffset;
        
        // Only update if scroll changed significantly
        if (Math.abs(scrollY - lastScrollY) < 2) {
          ticking = false;
          return;
        }
        
        lastScrollY = scrollY;
        
        const parallaxElements = document.querySelectorAll('.parallax');
        if (parallaxElements.length > 0 && scrollY < window.innerHeight * 2) {
          parallaxElements.forEach((element) => {
            const rate = scrollY * -0.25; // Reduced for smoother performance
            (element as HTMLElement).style.transform = `translate3d(0, ${rate}px, 0)`;
          });
        }
        ticking = false;
      };

      const handleOptimizedScroll = () => {
        if (!ticking) {
          requestAnimationFrame(optimizedParallax);
          ticking = true;
        }
      };

      // Only add scroll listener if parallax elements exist
      const parallaxElements = document.querySelectorAll('.parallax');
      if (parallaxElements.length > 0) {
        window.addEventListener('scroll', handleOptimizedScroll, { passive: true });
      }

      return () => {
        window.removeEventListener('scroll', handleOptimizedScroll);
        observer.disconnect();
      };
    });
  }, []);

  // Re-initialize animations when route changes
  useEffect(() => {
    // Small delay to ensure DOM is ready after route change
    const timer = setTimeout(() => {
      initializeOptimizedAnimations();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname, initializeOptimizedAnimations]);

  // Initial animation setup
  useEffect(() => {
    // Defer initialization to avoid blocking main thread
    const timer = setTimeout(initializeOptimizedAnimations, 50);
    
    return () => clearTimeout(timer);
  }, [initializeOptimizedAnimations]);

  // Preconnect to external resources
  useEffect(() => {
    // Only run on client side
    if (typeof document === 'undefined') return;
    
    const preconnectUrls = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://api.us.elevenlabs.io'
    ];

    preconnectUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />
      <Header />
      <main className="pt-20 md:pt-24 min-h-screen bg-background text-foreground">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
      <AnimationFallback />
    </div>
  );
};

export default Layout;
