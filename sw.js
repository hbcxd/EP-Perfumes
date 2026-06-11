const CACHE_NAME = 'ep-perfumes-v1.1';
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
