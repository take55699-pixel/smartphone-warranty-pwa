const CACHE_PREFIX='smartphone-warranty-root-';
const CACHE_NAME='smartphone-warranty-root-v8';
const LEGACY_CACHE_RE=/^smartphone-warranty-pwa-v\d+$/;
const CORE=[
  './',
  './index.html',
  './data.js',
  './extra-data.js',
  './live-fixes.js',
  './manifest.webmanifest',
  './icons/warranty-pwa-20260812-192.png',
  './icons/warranty-pwa-20260812-512.png',
  './icons/warranty-pwa-20260812-maskable-512.png'
];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys
        .filter(k=>(k.startsWith(CACHE_PREFIX)||LEGACY_CACHE_RE.test(k))&&k!==CACHE_NAME)
        .map(k=>caches.delete(k))
    ))
  );
  self.clients.claim();
});

async function networkFirst(request,fallback){
  const cache=await caches.open(CACHE_NAME);
  try{
    const response=await fetch(request);
    if(response&&response.ok) cache.put(request,response.clone());
    return response;
  }catch(_){
    return (await cache.match(request)) || (fallback ? await cache.match(fallback) : undefined) || Response.error();
  }
}

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET') return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin) return;

  const scopePath=new URL(self.registration.scope).pathname;
  const careSubappPath=scopePath+'applecare-pixelcare/';
  if(url.pathname.startsWith(careSubappPath)) return;

  if(request.mode==='navigate'){
    event.respondWith(networkFirst(request,'./index.html'));
    return;
  }

  const refreshFirst=['/index.html','/manifest.webmanifest','/data.js','/extra-data.js','/live-fixes.js'];
  if(refreshFirst.some(s=>url.pathname.endsWith(s))){
    event.respondWith(networkFirst(request));
    return;
  }

  if(url.pathname.includes('/icons/warranty-pwa-20260812-')){
    event.respondWith(caches.match(request).then(cached=>cached||networkFirst(request)));
    return;
  }

  event.respondWith(networkFirst(request));
});
