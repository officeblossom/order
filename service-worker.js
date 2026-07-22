const CACHE_NAME = "pet-photo-order-app-v42";
const APP_FILES = [
  "./",
  "./index.html",
  "./style.css?v=34",
  "./app.js?v=37",
  "./manifest.json",
  "./fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Black.ttf",
  "./fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Bold.ttf",
  "./fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-ExtraBold.ttf",
  "./fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Light.ttf",
  "./fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Medium.ttf",
  "./fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Regular.ttf",
  "./fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Thin.ttf",
  "./assets/img/img012.jpg",
  "./assets/img/img016.jpg",
  "./assets/img/img023.jpg",
  "./assets/img/img039.jpg",
  "./assets/img/img029.jpg",
  "./assets/img/img053.jpg",
  "./assets/img/img054.jpg",
  "./assets/img/img055.jpg",
  "./assets/img/img056.jpg",
  "./assets/img/img059.svg",
  "./assets/img/img001.jpg",
  "./assets/img/hero.jpg",
  "./assets/img/img004.svg",
  "./assets/img/img007.svg",
  "./assets/img/img003.svg",
  "./assets/img/img006.svg",
  "./assets/img/img002.svg",
  "./assets/img/img005.svg",
  "./assets/img/img043.jpg",
  "./assets/img/img045.jpg",
  "./assets/img/img047.jpg",
  "./assets/img/img048.jpg",
  "./assets/img/img049.jpg",
  "./assets/img/img050.jpg",
  "./assets/img/img052.jpg",
  "./assets/img/img008.jpg",
  "./assets/img/img009.jpg",
  "./assets/img/img010.jpg",
  "./assets/img/img011.jpg",
  "./assets/img/img013.png",
  "./assets/img/img014.jpg",
  "./assets/img/img015.jpg",
  "./assets/img/img019.png",
  "./assets/img/img020.jpg",
  "./assets/img/img051.jpg",
  "./assets/img/img021.jpg",
  "./assets/img/img022.png",
  "./assets/img/img024.jpg",
  "./assets/img/img025.jpg",
  "./assets/img/img031.jpg",
  "./assets/img/img032.jpg",
  "./assets/img/img033.jpg",
  "./assets/img/img034.png",
  "./assets/img/img035.jpg",
  "./assets/img/img036.png",
  "./assets/img/img037.png",
  "./assets/img/img038.png",
  "./assets/img/img057.png",
  "./assets/img/img026.png",
  "./assets/img/img027.png",
  "./assets/img/img028.jpg",
  "./assets/img/img030.png",
  "./assets/img/img017.jpg",
  "./assets/img/img018.jpg",
  "./assets/img/img040.png",
  "./assets/img/img041.png",
  "./assets/img/img042.png",
  "./assets/img/img044.jpg",
  "./assets/img/img046.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const freshFirstTypes = ["document", "style", "script", "worker"];
  if (event.request.mode === "navigate" || freshFirstTypes.includes(event.request.destination)) {
    event.respondWith(
      fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
