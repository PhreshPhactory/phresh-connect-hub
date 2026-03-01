// Service Worker for caching and performance optimization
const CACHE_VERSION = '2.1.0';
const CACHE_NAME = `phresh-phactory-v${CACHE_VERSION}`;
const STATIC_CACHE_NAME = `phresh-phactory-static-v${CACHE_VERSION}`;
const DYNAMIC_CACHE_NAME = `phresh-phactory-dynamic-v${CACHE_VERSION}`;

// Static assets that rarely change - cache for 1 year
const STATIC_CACHE_URLS = [
  '/',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap'
];

// Resources to cache dynamically
const DYNAMIC_CACHE_PATTERNS = [
  /^https:\/\/fonts\.googleapis\.com/,
  /^https:\/\/fonts\.gstatic\.com/,
  /^\/lovable-uploads\//
];

// HTML pages - cache for 1 hour
const HTML_CACHE_PATTERNS = [
  /^\/$/,
  /^\/about$/,
  /^\/services/,
  /^\/contact$/,
  /^\/blog/,
  /^\/packages$/,
  /^\/remote-teams$/
];

// Cache duration constants (in seconds)
const CACHE_DURATIONS = {
  STATIC: 31536000,  // 1 year
  HTML: 3600,        // 1 hour
  DYNAMIC: 86400,    // 1 day
  API: 300           // 5 minutes
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME)
        .then((cache) => {
          console.log('Caching static assets');
          return cache.addAll(STATIC_CACHE_URLS);
        }),
      caches.open(DYNAMIC_CACHE_NAME)
        .then((cache) => {
          console.log('Dynamic cache opened');
          return cache;
        })
    ]).then(() => {
      console.log('Service Worker installed successfully');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        console.log('Existing caches:', cacheNames);
        return Promise.all(
          cacheNames
            .filter((cacheName) => 
              cacheName.startsWith('phresh-phactory-') && 
              !cacheName.includes(CACHE_VERSION)
            )
            .map((cacheName) => {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('Service Worker activated and claimed');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Skip non-http(s) requests
  if (!request.url.startsWith('http')) return;

  // Handle different types of requests with appropriate strategies
  if (request.destination === 'image' || request.url.match(/\.(png|jpg|jpeg|svg|gif|webp|avif|ico)$/)) {
    // Images: cache first strategy with long-term caching
    event.respondWith(cacheFirstWithHeaders(request, STATIC_CACHE_NAME, CACHE_DURATIONS.STATIC));
  } else if (request.destination === 'script' || request.destination === 'style' || request.url.match(/\.(?:css|js)(?:\?.*)?$/)) {
    // JS/CSS: network first so deployments get fresh code immediately
    event.respondWith(networkFirstWithCache(request, DYNAMIC_CACHE_NAME, CACHE_DURATIONS.API));
  } else if (DYNAMIC_CACHE_PATTERNS.some(pattern => pattern.test(request.url))) {
    // Fonts and stable assets: cache first strategy
    event.respondWith(cacheFirstWithHeaders(request, STATIC_CACHE_NAME, CACHE_DURATIONS.STATIC));
  } else if (request.destination === 'document' || HTML_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    // HTML pages: stale while revalidate strategy
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE_NAME, CACHE_DURATIONS.HTML));
  } else if (request.url.includes('/api/') || request.url.includes('supabase')) {
    // API requests: network first with short cache
    event.respondWith(networkFirstWithCache(request, DYNAMIC_CACHE_NAME, CACHE_DURATIONS.API));
  } else {
    // Default: network first strategy
    event.respondWith(networkFirstWithCache(request, DYNAMIC_CACHE_NAME, CACHE_DURATIONS.DYNAMIC));
  }
});

// Cache first strategy with proper headers
async function cacheFirstWithHeaders(request, cacheName, maxAge) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    // Check if cached response is still fresh
    const cachedDate = new Date(cachedResponse.headers.get('date') || 0);
    const now = new Date();
    const ageInSeconds = (now - cachedDate) / 1000;
    
    if (ageInSeconds < maxAge) {
      return cachedResponse;
    }
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      const cache = await caches.open(cacheName);
      
      // Add cache headers to response
      const headers = new Headers(responseToCache.headers);
      headers.set('Cache-Control', `public, max-age=${maxAge}`);
      headers.set('sw-cache-timestamp', Date.now().toString());
      
      const enhancedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers
      });
      
      cache.put(request, enhancedResponse.clone());
      return enhancedResponse;
    }
    return networkResponse;
  } catch (error) {
    console.log('Network request failed:', error);
    if (cachedResponse) {
      return cachedResponse;
    }
    return createOfflineResponse();
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request, cacheName, maxAge) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      const cache = caches.open(cacheName);
      cache.then(c => {
        const headers = new Headers(networkResponse.headers);
        headers.set('Cache-Control', `public, max-age=${maxAge}`);
        headers.set('sw-cache-timestamp', Date.now().toString());
        
        const responseToCache = new Response(networkResponse.body, {
          status: networkResponse.status,
          statusText: networkResponse.statusText,
          headers: headers
        });
        
        c.put(request, responseToCache);
      });
    }
    return networkResponse;
  }).catch(() => cachedResponse || createOfflineResponse());

  return cachedResponse || fetchPromise;
}

// Network first with cache fallback
async function networkFirstWithCache(request, cacheName, maxAge) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      const headers = new Headers(networkResponse.headers);
      headers.set('Cache-Control', `public, max-age=${maxAge}`);
      headers.set('sw-cache-timestamp', Date.now().toString());
      
      const responseToCache = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: headers
      });
      
      cache.put(request, responseToCache.clone());
      return responseToCache;
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return createOfflineResponse();
  }
}

// Create offline response
function createOfflineResponse() {
  return new Response(
    JSON.stringify({
      error: 'Offline',
      message: 'You are currently offline. Please check your internet connection.'
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    }
  );
}