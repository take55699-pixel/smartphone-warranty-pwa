const CACHE_PREFIX='applecare-pixelcare-pwa-';
const CACHE_NAME='applecare-pixelcare-pwa-v8';
const APP_SHELL=[
  './',
  './index.html',
  './app-v11.html',
  './manifest-v11.webmanifest?v=11',
  './noto-font.css',
  './icons/care-v11-48.png',
  './icons/care-v11-180.png',
  './icons/care-v11-192.png',
  './icons/care-v11-512.png',
  './icons/care-v11-maskable-512.png'
];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k.startsWith(CACHE_PREFIX)&&k!==CACHE_NAME).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET') return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin) return;
  if(request.mode==='navigate' || url.pathname.endsWith('.webmanifest')){
    event.respondWith(fetch(request).then(response=>{
      if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy));}
      return response;
    }).catch(()=>caches.match(request).then(hit=>hit||caches.match('./app-v11.html'))));
    return;
  }
  event.respondWith(caches.match(request).then(hit=>hit||fetch(request).then(response=>{
    if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy));}
    return response;
  })));
});
