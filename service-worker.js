const CACHE_NAME = "pet-photo-order-app-v41";
const APP_FILES = [
  "./",
  "./index.html",
  "./style.css?v=33",
  "./app.js?v=36",
  "./manifest.json",
  "./fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Black.ttf",
  "./fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Bold.ttf",
  "./fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-ExtraBold.ttf",
  "./fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Light.ttf",
  "./fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Medium.ttf",
  "./fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Regular.ttf",
  "./fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Thin.ttf",
  "./images/2026:6:19写真追加分/②飾れるグッズ/2.アクリルスタンド.jpg",
  "./images/2026:6:19写真追加分/②飾れるグッズ/6.アクリル時計.jpg",
  "./images/2026:6:19写真追加分/③バッグ類/4.スリムポーチ.jpg",
  "./images/2026:6:19写真追加分/④日用雑貨/18.缶.jpg",
  "./images/2026:6:19写真追加分/④日用雑貨/5.パスケース.jpg",
  "./images/2026:6:4写真追加分/④日用雑貨/3-1.iPadケース.jpg",
  "./images/2026:6:4写真追加分/④日用雑貨/3-2.iPadケース.jpg",
  "./images/2026:6:4写真追加分/④日用雑貨/5-1.パスケース.jpg",
  "./images/2026:6:4写真追加分/④日用雑貨/5-2.パスケース.jpg",
  "./images/hero-rose.jpg",
  "./images/icon.svg",
  "./images/LINE.JPG",
  "./images/product-acrylic-m.svg",
  "./images/product-acrylic-s.svg",
  "./images/product-canvas.svg",
  "./images/product-keyholder.svg",
  "./images/product-photo-book.svg",
  "./images/product-photo-panel.svg",
  "./images/写真追加分/1.ノーマルスマホケース(FD).jpg",
  "./images/写真追加分/3.iPad(FD).jpg",
  "./images/写真追加分/5.パスケース(FD).jpg",
  "./images/写真追加分/6.モバイルバッテリー(FD).jpg",
  "./images/写真追加分/7.コンパクトミラー(FD).jpg",
  "./images/写真追加分/8.スタンドミラー(FD).jpg",
  "./images/写真追加分/FD.jpg",
  "./images/端末用フォトグッズ写真/①データ、フォトブック/1.データCD、2.超特急.jpg",
  "./images/端末用フォトグッズ写真/①データ、フォトブック/3.オリジナル冊子.jpg",
  "./images/端末用フォトグッズ写真/①データ、フォトブック/4.フォトブック.jpg",
  "./images/端末用フォトグッズ写真/②飾れる/1.キャンバス.jpg",
  "./images/端末用フォトグッズ写真/②飾れる/3.タペストリー.png",
  "./images/端末用フォトグッズ写真/②飾れる/4.スクウェア台紙.jpg",
  "./images/端末用フォトグッズ写真/②飾れる/5.多面額縁A4.jpg",
  "./images/端末用フォトグッズ写真/②飾れる/9.パズル.png",
  "./images/端末用フォトグッズ写真/③バッグ類/1-1.トートバッグS.jpg",
  "./images/端末用フォトグッズ写真/③バッグ類/1-2.トートバッグL.jpg",
  "./images/端末用フォトグッズ写真/③バッグ類/2.ミニショルダーバッグ.jpg",
  "./images/端末用フォトグッズ写真/③バッグ類/3.サコッシュ.png",
  "./images/端末用フォトグッズ写真/③バッグ類/5.スーツケース.jpg",
  "./images/端末用フォトグッズ写真/④使える（小物類）/1.手帳型スマホケース.jpg",
  "./images/端末用フォトグッズ写真/④使える（小物類）/10.シール.jpg",
  "./images/端末用フォトグッズ写真/④使える（小物類）/11.缶バッジ.jpg",
  "./images/端末用フォトグッズ写真/④使える（小物類）/12.コンパクトミラー.jpg",
  "./images/端末用フォトグッズ写真/④使える（小物類）/13.スタンドミラー.png",
  "./images/端末用フォトグッズ写真/④使える（小物類）/14.マグカップ.jpg",
  "./images/端末用フォトグッズ写真/④使える（小物類）/15.グラス.png",
  "./images/端末用フォトグッズ写真/④使える（小物類）/16.コースター.png",
  "./images/端末用フォトグッズ写真/④使える（小物類）/17.マウスパッド.png",
  "./images/端末用フォトグッズ写真/④使える（小物類）/18.缶.png",
  "./images/端末用フォトグッズ写真/④使える（小物類）/2.ノーマルスマホケース.png",
  "./images/端末用フォトグッズ写真/④使える（小物類）/3.iPadケース.png",
  "./images/端末用フォトグッズ写真/④使える（小物類）/4.コインケース.jpg",
  "./images/端末用フォトグッズ写真/④使える（小物類）/6.モバイルバッテリー.png",
  "./images/端末用フォトグッズ写真/④使える（小物類）/7.クッション.jpg",
  "./images/端末用フォトグッズ写真/④使える（小物類）/8.ブランケット.jpg",
  "./images/端末用フォトグッズ写真/⑤LINEスタンプ/1.言葉固定A.png",
  "./images/端末用フォトグッズ写真/⑤LINEスタンプ/2.言葉固定B.png",
  "./images/端末用フォトグッズ写真/⑤LINEスタンプ/4.アメコミ風言葉固定.png",
  "./images/端末用フォトグッズ写真/⑥Face Dots/2.手帳型スマホケース（FD）.jpg",
  "./images/端末用フォトグッズ写真/⑥Face Dots/4.コインケース（FD）.jpg"
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
