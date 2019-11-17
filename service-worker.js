var CACHE_NAME = "kucingku-v3.1";
console.warn("sw: loaded with CACHE_NAME[" + CACHE_NAME + "]");
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/article.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/bengal.html",
  "/pages/munchkin.html",
  "/pages/sphynx.html",
  "/pages/news.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/main.js",
  "/js/newsApi.js",
  "/images/avatar-kafin.jpg",
  "/images/bengal.jpg",
  "/images/munchkin.jpg",
  "/images/sphynx.jpg",
  "/images/icon-192.jpg",
  "/images/favicon.png",
  "/manifest.json"
];

self.addEventListener("install", function(event) {
  console.warn("sw: install");
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  console.warn("sw: fetch", event);
  var base_url = "https://readerapi.codepolitan.com/";
  if (event.request.url.indexOf(base_url) > -1) {
    console.log(`event.request.url.indexOf(${base_url})`);
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    console.log(`event.respondWith normally`);
    // event.respondWith(
    //   caches.match(event.request).then(function(response) {
    //     return response || fetch(event.request);
    //   })
    // );
    event.respondWith(
      caches
        .match(event.request, { ignoreSearch: true })
        .then(function(response) {
          return response || fetch(event.request);
        })
    );
  }

  // event.respondWith(
  //   caches
  //     .match(event.request, { cacheName: CACHE_NAME })
  //     .then(function(response) {
  //       return response || fetch(event.request);
  //     })
  // );
});

self.addEventListener("activate", function(event) {
  console.warn("sw: activate");
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
