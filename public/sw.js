// Enhanced Service Worker with efficient caching strategy
const CACHE_NAME = 'invoice-pro-v3';
const STATIC_CACHE = 'static-v3';
const DYNAMIC_CACHE = 'dynamic-v3';
const IMAGE_CACHE = 'images-v3';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/src/main.tsx',
  '/src/index.css',
  '/og-image.webp',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
];

// Cache-first strategy for these resources
const CACHE_FIRST_PATTERNS = [
  /\.(?:js|css|woff2?|ttf|eot)$/,
  /^https:\/\/fonts\.googleapis\.com/,
  /^https:\/\/fonts\.gstatic\.com/,
];

// Network-first strategy for API and dynamic content
const NETWORK_FIRST_PATTERNS = [
  /\/api\//,
  /supabase\.co/,
  /stripe\.com/,
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      try {
        await cache.addAll(CRITICAL_RESOURCES);
      } catch (error) {
        console.log('SW: Failed to cache critical resources:', error);
      }
      self.skipWaiting();
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      const oldCaches = cacheNames.filter(name => 
        name !== CACHE_NAME && 
        name !== STATIC_CACHE && 
        name !== DYNAMIC_CACHE && 
        name !== IMAGE_CACHE
      );
      
      await Promise.all(
        oldCaches.map(cacheName => caches.delete(cacheName))
      );
      
      self.clients.claim();
    })()
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    (async () => {
      try {
        // Handle images with cache-first strategy
        if (request.destination === 'image') {
          return await handleImageRequest(request);
        }

        // Handle static assets with cache-first
        if (CACHE_FIRST_PATTERNS.some(pattern => pattern.test(request.url))) {
          return await handleCacheFirst(request);
        }

        // Handle API requests with network-first
        if (NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(request.url))) {
          return await handleNetworkFirst(request);
        }

        // Handle navigation requests
        if (request.mode === 'navigate') {
          return await handleNavigationRequest(request);
        }

        // Default: network-first with fallback
        return await handleNetworkFirst(request);
      } catch (error) {
        console.log('SW: Fetch error:', error);
        return new Response('Network error', { status: 408 });
      }
    })()
  );
});

// Cache-first strategy for static assets
async function handleCacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Update cache in background
    updateCacheInBackground(request, cache);
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    return new Response('Asset not available', { status: 404 });
  }
}

// Network-first strategy for dynamic content
async function handleNetworkFirst(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Cache successful responses
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    // Fall back to cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw new Error('No network or cache available');
  }
}

// Image caching with compression awareness
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Cache images for longer periods
      const headers = new Headers(networkResponse.headers);
      headers.set('Cache-Control', 'public, max-age=31536000'); // 1 year
      
      const responseWithHeaders = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: headers,
      });
      
      cache.put(request, responseWithHeaders.clone());
      return responseWithHeaders;
    }
    return networkResponse;
  } catch {
    return new Response('Image not available', { status: 404 });
  }
}

// Navigation request handling with offline fallback
async function handleNavigationRequest(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch {
    // Return cached index.html for SPA routing
    const cache = await caches.open(STATIC_CACHE);
    const cachedIndex = await cache.match('/');
    return cachedIndex || new Response('App not available offline', { status: 404 });
  }
}

// Background cache update for performance
async function updateCacheInBackground(request, cache) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
  } catch {
    // Silent fail for background updates
  }
}

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});