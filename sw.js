const CACHE_NAME = 'ep-perfumes-v1.2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './LOGO.png',
  './perfumes.png'
];

// Instalar el Service Worker y guardar archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Interceptar peticiones y usar caché si no hay internet (ideal para cargar la app rápido)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
// Escucha cuando el SW recibe un mensaje para saltar la espera
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

