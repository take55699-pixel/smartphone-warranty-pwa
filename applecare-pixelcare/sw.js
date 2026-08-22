const CACHE_PREFIX='applecare-pixelcare-pwa-';
const CACHE_NAME='applecare-pixelcare-pwa-v5';
const FONT_CSS='./noto-font.css?v=1';
const APP_SHELL=[
  './',
  './index.html',
  './manifest.webmanifest',
  './noto-font.css',
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

async function applyNoto(response){
  if(!response) return response;
  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html')) return response;
  let html=await response.text();
  if(!html.includes('noto-font.css')){
    html=html.replace('</head>',`<link rel="stylesheet" href="${FONT_CSS}"><style>html,body,button,input,select,textarea{font-family:'Noto Sans JP',sans-serif!important}</style></head>`);
  }
  const headers=new Headers(response.headers);
  headers.delete('content-length');
  return new Response(html,{status:response.status,statusText:response.statusText,headers});
}

self.addEventListener('fetch', event => {
  const request=event.request;
  if(request.method!=='GET') return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin) return;

  if(request.mode==='navigate'){
    event.respondWith((async()=>{
      const cache=await caches.open(CACHE_NAME);
      try{
        const response=await fetch(request);
        if(response.ok) cache.put(request,response.clone());
        return applyNoto(response);
      }catch(_){
        const cached=(await cache.match(request)) || (await cache.match('./index.html'));
        return cached ? applyNoto(cached) : Response.error();
      }
    })());
    return;
  }

  event.respondWith(
    fetch(request)
      .then(response => {
        const copy=response.clone();
        caches.open(CACHE_NAME).then(cache=>cache.put(request,copy));
        return response;
      })
      .catch(()=>caches.match(request))
  );
});
