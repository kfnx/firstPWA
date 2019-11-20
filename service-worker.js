var root_path = 'https://kafinsalim.github.io/firstPWA'
var CACHE_NAME = "kucingku-v3.2";
console.warn("sw: loaded with CACHE_NAME[" + CACHE_NAME + "]");
var urlsToCache = [
  root_path+"/",
  root_path+"/nav.html",
  root_path+"/index.html",
  root_path+"/article.html",
  root_path+"/pages/home.html",
  root_path+"/pages/about.html",
  root_path+"/pages/bengal.html",
  root_path+"/pages/munchkin.html",
  root_path+"/pages/sphynx.html",
  root_path+"/pages/news.html",
  root_path+"/css/materialize.min.css",
  root_path+"/css/style.css",
  root_path+"/js/materialize.min.js",
  root_path+"/js/main.js",
  root_path+"/js/newsApi.js",
  root_path+"/images/avatar-kafin.jpg",
  root_path+"/images/bengal.jpg",
  root_path+"/images/munchkin.jpg",
  root_path+"/images/sphynx.jpg",
  root_path+"/images/icon-192.jpg",
  root_path+"/images/favicon.png",
  root_path+"/manifest.json"
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
