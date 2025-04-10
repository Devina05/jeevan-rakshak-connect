
const CACHE_NAME = 'jeevanrakshak-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/main.tsx',
  '/src/index.css',
  '/jeevanrakshak-icon-192.png',
  '/jeevanrakshak-icon-512.png'
];

// First aid content to cache for offline use
const firstAidContent = [
  '/api/firstaid/cpr',
  '/api/firstaid/bleeding',
  '/api/firstaid/burns',
  '/api/firstaid/choking',
  '/api/firstaid/fractures',
  '/api/firstaid/seizures',
  '/api/firstaid/heart-attack',
  '/api/firstaid/stroke'
];

// Install event - cache all static resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll([...urlsToCache, ...firstAidContent]);
      })
  );
});

// Fetch event - respond with cached resources when available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return the response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the fetched resource
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      }).catch(() => {
        // Return a custom offline page if the fetch fails and we're offline
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
