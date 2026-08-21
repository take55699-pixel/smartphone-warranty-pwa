const CACHE_PREFIX='applecare-pixelcare-pwa-';
const CACHE_NAME='applecare-pixelcare-pwa-v4';
const APP_SHELL=[
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/care-flat-180-v3.png',
  './icons/care-flat-192-v3.png',
  './icons/care-flat-512-v3.png',
  './icons/care-flat-maskable-512-v3.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return response;
      })
      .catch(() => caches.match(request).then(cached => cached || caches.match('./index.html')))
  );
});
