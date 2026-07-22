"use strict";

const STORE_NAME = "pet-photo-order-store-v1";
const DB_NAME = "petPhotoOrders";
const DB_VERSION = 1;
const STORAGE_FALLBACK_KEY = "petPhotoOrdersFallback";

const customerFields = [
  { id: "name", label: "氏名", required: true, placeholder: "例：山田 花子" },
  { id: "phone", label: "電話番号", required: true, placeholder: "例：090-1234-5678" }
];

const LINE_QR_IMAGE = "assets/img/img001.jpg";

const categories = [
  { id: "data-book", name: "データ・フォトブック", description: "データCDや冊子、フォトブック" },
  { id: "display", name: "飾れるグッズ", description: "お部屋に飾れる写真グッズ" },
  { id: "bags", name: "バッグ類", description: "バッグやポーチなどのお出かけグッズ" },
  { id: "daily-goods", name: "日常雑貨", description: "スマホケースや日用品などの小物" },
  { id: "line-stamp", name: "LINEスタンプ", description: "LINEで使えるオリジナルスタンプ" },
  { id: "face-dots", name: "Face Dots", description: "お顔を切り取ったかわいいデザイン Face Dots(フェイスドット)" }
];

const products = [
  { id: "data-cd", categoryId: "data-book", name: "データCD", price: 12000, image: "assets/img/img002.svg", description: "撮影データをCDでお渡しします。", options: [] },
  { id: "express-data-cd", categoryId: "data-book", name: "超特急データCD", price: 17000, image: "assets/img/img002.svg", description: "お急ぎ仕上げのデータCDです。", options: [] },
  { id: "original-booklet", categoryId: "data-book", name: "オリジナル冊子", price: 16000, image: "assets/img/img002.svg", description: "追加オプションを選べる冊子商品です。", options: [
    { id: "addons", label: "追加オプション", type: "addons", values: [
      { label: "5冊追加", price: 3000 },
      { label: "2ページ追加", price: 3000 },
      { label: "イラストオプション", price: 10000 },
      { label: "イラスト追加", price: 8000 }
    ] }
  ] },
  { id: "photo-book-main", categoryId: "data-book", name: "フォトブック", price: 30000, image: "assets/img/img002.svg", description: "思い出をしっかり残せるフォトブックです。", options: [] },

  { id: "canvas-board", categoryId: "display", name: "キャンバスボード", price: 9000, image: "assets/img/img003.svg", description: "飾りやすいキャンバスボードです。", options: [
    { id: "size", label: "サイズ", values: ["Sサイズ", "Mサイズ", "Lサイズ", "LLサイズ"] }
  ], optionPrices: { size: { "Sサイズ": 9000, "Mサイズ": 14000, "Lサイズ": 22000, "LLサイズ": 28000 } } },
  { id: "acrylic-stand", categoryId: "display", name: "アクリルスタンド", price: 10000, image: "assets/img/img004.svg", description: "立てて飾れるアクリルグッズです。", options: [] },
  { id: "tapestry", categoryId: "display", name: "タペストリー", price: 17000, image: "assets/img/img005.svg", description: "壁に飾れる大きめグッズです。", options: [
    { id: "size", label: "サイズ", values: ["Mサイズ", "Lサイズ"] }
  ], optionPrices: { size: { "Mサイズ": 17000, "Lサイズ": 32000 } } },
  { id: "square-mount", categoryId: "display", name: "スクウェア台紙", price: 6000, image: "assets/img/img005.svg", description: "写真をきれいに残せる台紙です。", options: [] },
  { id: "multi-frame", categoryId: "display", name: "多面額縁", price: 9000, image: "assets/img/img005.svg", description: "複数カットを飾れる額縁です。", options: [
    { id: "size", label: "サイズ", values: ["A4サイズ", "A3サイズ"] }
  ], optionPrices: { size: { "A4サイズ": 9000, "A3サイズ": 15000 } } },
  { id: "acrylic-clock", categoryId: "display", name: "アクリル時計", price: 24000, image: "assets/img/img004.svg", description: "写真入りのアクリル時計です。", options: [] },
  { id: "cushion-display", categoryId: "display", name: "クッション", price: 11000, image: "assets/img/img003.svg", description: "複数カテゴリーに掲載されるクッションです。", options: [
    { id: "type", label: "タイプ", values: ["小サイズ片面タイプ", "小サイズ両面タイプ", "大サイズ片面タイプ", "大サイズ両面タイプ"] }
  ], optionPrices: { type: { "小サイズ片面タイプ": 11000, "小サイズ両面タイプ": 13000, "大サイズ片面タイプ": 20000, "大サイズ両面タイプ": 24000 } } },
  { id: "blanket-display", categoryId: "display", name: "ブランケット", price: 13000, image: "assets/img/img003.svg", description: "複数カテゴリーに掲載されるブランケットです。", options: [
    { id: "size", label: "サイズ", values: ["Sサイズ", "Lサイズ"] }
  ], optionPrices: { size: { "Sサイズ": 13000, "Lサイズ": 22000 } } },
  { id: "jigsaw-display", categoryId: "display", name: "ジグソーパズル", price: 6000, image: "assets/img/img005.svg", description: "飾って楽しめるジグソーパズルです。", options: [
    { id: "size", label: "サイズ", values: ["Sサイズ(縁なし)", "Mサイズ(縁あり)"] }
  ], optionPrices: { size: { "Sサイズ(縁なし)": 6000, "Mサイズ(縁あり)": 12000 } } },

  { id: "tote-bag", categoryId: "bags", name: "トートバッグ", price: 8500, image: "assets/img/img006.svg", description: "日常使いしやすいトートバッグです。", options: [
    { id: "size", label: "サイズ", values: ["Sサイズ", "Lサイズ"] }
  ], optionPrices: { size: { "Sサイズ": 8500, "Lサイズ": 9000 } } },
  { id: "mini-shoulder-bag", categoryId: "bags", name: "ミニショルダーバッグ", price: 10000, image: "assets/img/img006.svg", description: "持ち歩きやすいミニショルダーバッグです。", options: [] },
  { id: "sacoche", categoryId: "bags", name: "サコッシュ", price: 7500, image: "assets/img/img006.svg", description: "軽くて使いやすいサコッシュです。", options: [] },
  { id: "slim-pouch", categoryId: "bags", name: "スリムポーチ", price: 4500, image: "assets/img/img006.svg", description: "小物入れに便利なポーチです。", options: [] },
  { id: "suitcase", categoryId: "bags", name: "スーツケース", price: 63000, image: "assets/img/img006.svg", description: "存在感のあるオリジナルスーツケースです。", options: [] },

  { id: "wallet-phone-case", categoryId: "daily-goods", name: "手帳型スマホケース", price: 9000, image: "assets/img/img007.svg", description: "手帳型のスマホケースです。", options: [] },
  { id: "normal-phone-case", categoryId: "daily-goods", name: "ノーマルスマホケース", price: 7500, image: "assets/img/img007.svg", description: "シンプルなスマホケースです。", options: [] },
  { id: "ipad-case", categoryId: "daily-goods", name: "iPadケース", price: 10000, image: "assets/img/img007.svg", description: "iPad用ケースです。", options: [] },
  { id: "coin-case", categoryId: "daily-goods", name: "コインケース", price: 8500, image: "assets/img/img006.svg", description: "小物収納に便利なコインケースです。", options: [] },
  { id: "pass-case", categoryId: "daily-goods", name: "パスケース", price: 6500, image: "assets/img/img006.svg", description: "通勤通学にも使えるパスケースです。", options: [] },
  { id: "mobile-battery", categoryId: "daily-goods", name: "モバイルバッテリー", price: 11000, image: "assets/img/img006.svg", description: "写真入りモバイルバッテリーです。", options: [] },
  { id: "cushion-goods", categoryId: "daily-goods", name: "クッション", price: 11000, image: "assets/img/img003.svg", description: "複数カテゴリーに掲載されるクッションです。", options: [
    { id: "type", label: "タイプ", values: ["小サイズ片面タイプ", "小サイズ両面タイプ", "大サイズ片面タイプ", "大サイズ両面タイプ"] }
  ], optionPrices: { type: { "小サイズ片面タイプ": 11000, "小サイズ両面タイプ": 13000, "大サイズ片面タイプ": 20000, "大サイズ両面タイプ": 24000 } } },
  { id: "blanket-goods", categoryId: "daily-goods", name: "ブランケット", price: 13000, image: "assets/img/img003.svg", description: "複数カテゴリーに掲載されるブランケットです。", options: [
    { id: "size", label: "サイズ", values: ["Sサイズ", "Lサイズ"] }
  ], optionPrices: { size: { "Sサイズ": 13000, "Lサイズ": 22000 } } },
  { id: "jigsaw-goods", categoryId: "daily-goods", name: "ジグソーパズル", price: 6000, image: "assets/img/img005.svg", description: "複数カテゴリーに掲載されるジグソーパズルです。", options: [
    { id: "size", label: "サイズ", values: ["Sサイズ", "Mサイズ"] }
  ], optionPrices: { size: { "Sサイズ": 6000, "Mサイズ": 12000 } } },
  { id: "print-seal", categoryId: "daily-goods", name: "プリントシール", price: 2000, image: "assets/img/img006.svg", description: "分割タイプを選べるプリントシールです。", options: [
    { id: "split", label: "分割", values: ["2分割", "4分割", "8分割", "16分割"] }
  ] },
  { id: "can-badge", categoryId: "daily-goods", name: "缶バッジ", price: 2500, image: "assets/img/img006.svg", description: "タイプを選べる缶バッジです。", options: [
    { id: "type", label: "タイプ", values: ["ピンタイプ", "マグネットタイプ"] }
  ] },
  { id: "compact-mirror", categoryId: "daily-goods", name: "コンパクトミラー", price: 3500, image: "assets/img/img006.svg", description: "持ち歩きやすいコンパクトミラーです。", options: [] },
  { id: "stand-mirror", categoryId: "daily-goods", name: "スタンドミラー", price: 7500, image: "assets/img/img006.svg", description: "飾って使えるスタンドミラーです。", options: [] },
  { id: "mug", categoryId: "daily-goods", name: "マグカップ", price: 5500, image: "assets/img/img006.svg", description: "写真入りマグカップです。", options: [] },
  { id: "glass", categoryId: "daily-goods", name: "グラス", price: 6000, image: "assets/img/img006.svg", description: "写真入りグラスです。", options: [] },
  { id: "diatomite-coaster", categoryId: "daily-goods", name: "珪藻土コースター", price: 4500, image: "assets/img/img006.svg", description: "吸水性のあるコースターです。", options: [] },
  { id: "mouse-pad", categoryId: "daily-goods", name: "マウスパッド", price: 6000, image: "assets/img/img006.svg", description: "デスクで使えるマウスパッドです。", options: [] },
  { id: "can", categoryId: "daily-goods", name: "缶", price: 6500, image: "assets/img/img006.svg", description: "小物入れにも使える缶です。", options: [] },

  { id: "line-fixed-a", categoryId: "line-stamp", name: "言葉固定Aタイプ", price: 5500, image: "assets/img/img002.svg", description: "言葉固定のLINEスタンプAタイプです。", options: [] },
  { id: "line-fixed-b", categoryId: "line-stamp", name: "言葉固定Bタイプ", price: 5500, image: "assets/img/img002.svg", description: "言葉固定のLINEスタンプBタイプです。", options: [] },
  { id: "line-choice", categoryId: "line-stamp", name: "言葉選択タイプ", price: 6500, image: "assets/img/img002.svg", description: "言葉を選べるLINEスタンプです。", options: [] },
  { id: "line-comic-fixed", categoryId: "line-stamp", name: "アメコミ風言葉固定タイプ", price: 7000, image: "assets/img/img002.svg", description: "アメコミ風の言葉固定タイプです。", options: [] },
  { id: "line-comic-choice", categoryId: "line-stamp", name: "アメコミ風言葉選択タイプ", price: 8000, image: "assets/img/img002.svg", description: "アメコミ風の言葉選択タイプです。", options: [] },

  { id: "fd-normal-phone-case", categoryId: "face-dots", name: "ノーマルスマホケース(FD)", price: 9000, image: "assets/img/img007.svg", description: "Face Dotsデザインのスマホケースです。", options: faceDotsOptions() },
  { id: "fd-wallet-phone-case", categoryId: "face-dots", name: "手帳型スマホケース(FD)", price: 10500, image: "assets/img/img007.svg", description: "Face Dotsデザインの手帳型スマホケースです。", options: faceDotsOptions() },
  { id: "fd-ipad-case", categoryId: "face-dots", name: "iPadケース(FD)", price: 11500, image: "assets/img/img007.svg", description: "Face DotsデザインのiPadケースです。", options: faceDotsOptions() },
  { id: "fd-coin-case", categoryId: "face-dots", name: "コインケース(FD)", price: 10000, image: "assets/img/img006.svg", description: "Face Dotsデザインのコインケースです。", options: faceDotsOptions() },
  { id: "fd-pass-case", categoryId: "face-dots", name: "パスケース(FD)", price: 8000, image: "assets/img/img006.svg", description: "Face Dotsデザインのパスケースです。", options: faceDotsOptions() },
  { id: "fd-mobile-battery", categoryId: "face-dots", name: "モバイルバッテリー(FD)", price: 12500, image: "assets/img/img006.svg", description: "Face Dotsデザインのモバイルバッテリーです。", options: faceDotsOptions() },
  { id: "fd-compact-mirror", categoryId: "face-dots", name: "コンパクトミラー(FD)", price: 5000, image: "assets/img/img006.svg", description: "Face Dotsデザインのコンパクトミラーです。", options: faceDotsOptions() },
  { id: "fd-stand-mirror", categoryId: "face-dots", name: "スタンドミラー(FD)", price: 9000, image: "assets/img/img006.svg", description: "Face Dotsデザインのスタンドミラーです。", options: faceDotsOptions() }
];

const productImages = {
  "data-cd": "assets/img/img008.jpg",
  "express-data-cd": "assets/img/img008.jpg",
  "original-booklet": "assets/img/img009.jpg",
  "photo-book-main": "assets/img/img010.jpg",
  "canvas-board": "assets/img/img011.jpg",
  "acrylic-stand": "assets/img/img012.jpg",
  "tapestry": "assets/img/img013.png",
  "square-mount": "assets/img/img014.jpg",
  "multi-frame": "assets/img/img015.jpg",
  "acrylic-clock": "assets/img/img016.jpg",
  "cushion-display": "assets/img/img017.jpg",
  "blanket-display": "assets/img/img018.jpg",
  "jigsaw-display": "assets/img/img019.png",
  "tote-bag": "assets/img/img020.jpg",
  "mini-shoulder-bag": "assets/img/img021.jpg",
  "sacoche": "assets/img/img022.png",
  "slim-pouch": "assets/img/img023.jpg",
  "suitcase": "assets/img/img024.jpg",
  "wallet-phone-case": "assets/img/img025.jpg",
  "normal-phone-case": "assets/img/img026.png",
  "ipad-case": "assets/img/img027.png",
  "coin-case": "assets/img/img028.jpg",
  "pass-case": "assets/img/img029.jpg",
  "mobile-battery": "assets/img/img030.png",
  "cushion-goods": "assets/img/img017.jpg",
  "blanket-goods": "assets/img/img018.jpg",
  "jigsaw-goods": "assets/img/img019.png",
  "print-seal": "assets/img/img031.jpg",
  "can-badge": "assets/img/img032.jpg",
  "compact-mirror": "assets/img/img033.jpg",
  "stand-mirror": "assets/img/img034.png",
  "mug": "assets/img/img035.jpg",
  "glass": "assets/img/img036.png",
  "diatomite-coaster": "assets/img/img037.png",
  "mouse-pad": "assets/img/img038.png",
  "can": "assets/img/img039.jpg",
  "line-fixed-a": "assets/img/img040.png",
  "line-fixed-b": "assets/img/img041.png",
  "line-choice": "assets/img/img040.png",
  "line-comic-fixed": "assets/img/img042.png",
  "line-comic-choice": "assets/img/img042.png",
  "fd-normal-phone-case": "assets/img/img043.jpg",
  "fd-wallet-phone-case": "assets/img/img044.jpg",
  "fd-ipad-case": "assets/img/img045.jpg",
  "fd-coin-case": "assets/img/img046.jpg",
  "fd-pass-case": "assets/img/img047.jpg",
  "fd-mobile-battery": "assets/img/img048.jpg",
  "fd-compact-mirror": "assets/img/img049.jpg",
  "fd-stand-mirror": "assets/img/img050.jpg"
};

const productOptionImages = {
  "tote-bag": {
    size: {
      "Sサイズ": "assets/img/img020.jpg",
      "Lサイズ": "assets/img/img051.jpg"
    }
  }
};

const faceDotsDesignImage = "assets/img/img052.jpg";
const productGalleries = {
  "tote-bag": [
    "assets/img/img020.jpg",
    "assets/img/img051.jpg"
  ],
  "ipad-case": [
    productImages["ipad-case"],
    "assets/img/img053.jpg",
    "assets/img/img054.jpg"
  ],
  "pass-case": [
    productImages["pass-case"],
    "assets/img/img055.jpg",
    "assets/img/img056.jpg"
  ],
  "can": [
    productImages["can"],
    "assets/img/img057.png"
  ],
  "fd-normal-phone-case": [productImages["fd-normal-phone-case"], faceDotsDesignImage],
  "fd-wallet-phone-case": [productImages["fd-wallet-phone-case"], faceDotsDesignImage],
  "fd-ipad-case": [productImages["fd-ipad-case"], faceDotsDesignImage],
  "fd-coin-case": [productImages["fd-coin-case"], faceDotsDesignImage],
  "fd-pass-case": [productImages["fd-pass-case"], faceDotsDesignImage],
  "fd-mobile-battery": [productImages["fd-mobile-battery"], faceDotsDesignImage],
  "fd-compact-mirror": [productImages["fd-compact-mirror"], faceDotsDesignImage],
  "fd-stand-mirror": [productImages["fd-stand-mirror"], faceDotsDesignImage]
};

const lineStampCommonDescription = "弊社からお送りさせていただくのはお1人様のみですが、LINEスタンプのショップに販売しておりますので、どなたでも購入・プレゼントが可能です。（50コイン / 約150円）";
const lineStampChoiceDescription = "後日LINEで、スタンプにしたい言葉を8種類お送りください。後から言葉の変更はできませんので、決定した言葉をお送りください。";

const productDetailDescriptions = {
  "data-cd": "Googleフォトでも全データお送り可能です。",
  "express-data-cd": "2週間程でご自宅へCDをお届けする、送料込みのプランです。",
  "photo-book-main": "260×210mm。見開き6ページ、写真7〜13枚程度。",
  "canvas-board": "Sサイズ：227×158×厚さ17mm。Mサイズ：273×220×厚さ17mm。Lサイズ：410×308×厚さ17mm。LLサイズ：455×380×厚さ17mm。",
  "acrylic-stand": "A4サイズ×厚さ3mm。",
  "tapestry": "サテン生地。Mサイズ：512×748mm（B2サイズ）。Lサイズ：774×1050mm（B1サイズ）。",
  "square-mount": "2L版写真×2枚。",
  "multi-frame": "A4サイズ：写真3枚。A3サイズ：写真6枚。",
  "acrylic-clock": "直径230mm×厚さ5mm。デザインはスタッフにお尋ねください。",
  "cushion-display": "小サイズ：300×300mm。大サイズ：450×450mm。片面タイプ、両面タイプから選べます。",
  "blanket-display": "Sサイズ：650×480mm。Lサイズ：900×650mm。",
  "jigsaw-display": "Sサイズ：170×170×3mm、縁なし。Mサイズ：210×297×3mm、縁あり。",
  "tote-bag": "Sサイズ：300×200×マチ100mm。Lサイズ：360×370×マチ110mm。",
  "mini-shoulder-bag": "150×220mm。ベルト長さ約120cm。",
  "sacoche": "300×230mm。ベルト長さ約105cm。",
  "slim-pouch": "115×110mm。",
  "suitcase": "560×230×360mm。3.4kg、52L。360°回転4輪キャスター、TSA認証ロック。",
  "normal-phone-case": "お使いの機種に合わせて作成いたします。",
  "wallet-phone-case": "お使いの機種に合わせて作成いたします。",
  "ipad-case": "お使いの機種に合わせて作成いたします。",
  "coin-case": "直径90mm×厚さ20mm。",
  "pass-case": "106×76mm。",
  "mobile-battery": "99×63×厚さ14mm。容量：5000mAh。",
  "cushion-goods": "小サイズ：300×300mm。大サイズ：450×450mm。片面タイプ、両面タイプから選べます。",
  "blanket-goods": "Sサイズ：650×480mm。Lサイズ：900×650mm。",
  "jigsaw-goods": "Sサイズ：170×170×3mm、縁なし。Mサイズ：210×297×3mm、縁あり。",
  "print-seal": "L版サイズ。全て同じお写真です。",
  "can-badge": "直径54mm。ピンタイプ、マグネットタイプから選べます。",
  "compact-mirror": "88×61×厚さ10mm。",
  "stand-mirror": "165×111mm（閉じた状態）。",
  "mug": "陶器製。直径82×高さ95mm。",
  "glass": "ガラス製。直径76×高さ151mm。",
  "diatomite-coaster": "直径100mm×厚さ9mm。",
  "mouse-pad": "200×235×厚さ4mm。",
  "can": "直径122×厚さ44mm。",
  "line-fixed-a": `${lineStampCommonDescription}\nありがとう、了解！、イイね！、お疲れさまです、！？、わーい、お願いします、ごめんなさい、の8種類です。`,
  "line-fixed-b": `${lineStampCommonDescription}\nありがとう、了解！、おはよう、おやすみ、うれしい、よろしく、頑張れ！、ガーンの8種類です。`,
  "line-choice": `${lineStampChoiceDescription}\n\n${lineStampCommonDescription}`,
  "line-comic-fixed": `${lineStampCommonDescription}\nHello!、Good Night…、OK!、Nice！、Please!、Hey!、Yeah！、！？の8種類です。`,
  "line-comic-choice": `${lineStampChoiceDescription}\n\n${lineStampCommonDescription}`,
  "fd-normal-phone-case": "お使いの機種に合わせて作成いたします。",
  "fd-wallet-phone-case": "お使いの機種に合わせて作成いたします。",
  "fd-ipad-case": "お使いの機種に合わせて作成いたします。",
  "fd-coin-case": "直径90mm×厚さ20mm。",
  "fd-pass-case": "106×76mm。",
  "fd-mobile-battery": "99×63×厚さ14mm。容量：5000mAh。",
  "fd-compact-mirror": "88×61×厚さ10mm。",
  "fd-stand-mirror": "165×111mm（閉じた状態）。"
};

products.forEach((product) => {
  if (productImages[product.id]) product.image = productImages[product.id];
  if (productGalleries[product.id]) product.galleryImages = productGalleries[product.id];
  if (productDetailDescriptions[product.id]) product.detailDescription = productDetailDescriptions[product.id];
});

const paymentMethods = ["現金", "カード", "電子マネー", "PayPay"];
const deliveryMethods = ["店舗", "ご自宅"];
const HOME_DELIVERY_FEE = 1500;
const agreementItems = [
  "ご注文いただいたデータ以外のデータは近日中に削除いたします。",
  "返品、交換、キャンセルはご対応いたしかねます。",
  "掲載時の掲載ミスがあった場合、ご返金は対象外となりますが、再掲載が可能な場合もございますのでご連絡くださいませ。",
  "グッズに不備があった場合は、お早めにご連絡をお願いいたします。"
];

function faceDotsOptions() {
  return [
    { id: "faceAdd", label: "お顔追加", type: "addonQuantity", unitPrice: 1000, min: 0, max: 10, unit: "個" },
    { id: "color", label: "色", values: ["ライトブルー", "ブルー", "ピンク", "グリーン", "イエロー"] }
  ];
}

const venueSuggestions = [
  "東京会場",
  "横浜会場",
  "大阪会場",
  "名古屋会場",
  "福岡会場"
];

const state = {
  view: "home",
  selectedCategoryId: null,
  selectedProductId: null,
  currentSession: null,
  customer: {},
  cart: [],
  paymentMethod: "",
  orderAgreementAccepted: false,
  deliveryLocation: "店舗",
  freePaperPhoto: "",
  orders: [],
  editingOrderId: null,
  adminReturnView: ""
};

const app = document.getElementById("app");
const toast = document.getElementById("toast");
let dbPromise = null;
let toastTimer = null;
let completionTimer = null;

document.addEventListener("DOMContentLoaded", init);

async function init() {
  await loadState();
  render();
  registerServiceWorker();
}

function defaultSession() {
  const today = new Date().toISOString().slice(0, 10);
  return {
    id: makeId(),
    name: "本日の撮影会",
    venueName: "会場未設定",
    date: today,
    photoGoodsDeliveryDate: addMonths(today, 2),
    freePaperDeliveryDate: getFreePaperDeliveryDate(today),
    passcode: "",
    createdAt: new Date().toISOString()
  };
}

function emptyPet() {
  return { name: "", breed: "", birthdayMonth: "", birthdayDay: "" };
}

function normalizePet(pet = {}) {
  return {
    name: pet.name || pet.petName || "",
    breed: pet.breed || "",
    birthdayMonth: pet.birthdayMonth || "",
    birthdayDay: pet.birthdayDay || ""
  };
}

function normalizeCustomer(customer = {}) {
  const sourcePets = Array.isArray(customer.pets) && customer.pets.length
    ? customer.pets
    : [{ name: customer.petName || "", breed: customer.breed || "", birthdayMonth: customer.birthdayMonth || "", birthdayDay: customer.birthdayDay || "" }];
  const pets = sourcePets.map(normalizePet);
  return {
    name: customer.name || "",
    phone: customer.phone || "",
    pets: pets.length ? pets : [emptyPet()]
  };
}

function ensureCustomer() {
  state.customer = normalizeCustomer(state.customer);
  return state.customer;
}

async function loadState() {
  const saved = await storageGet("state");
  if (saved) {
    state.currentSession = normalizeSession(saved.currentSession || defaultSession());
    state.orders = Array.isArray(saved.orders) ? saved.orders.map(normalizeOrder) : [];
    return;
  }
  state.currentSession = defaultSession();
  state.orders = [];
  await persistState();
}

async function persistState() {
  await storageSet("state", {
    currentSession: state.currentSession,
    orders: state.orders
  });
}

function normalizeSession(session) {
  const date = session.date || new Date().toISOString().slice(0, 10);
  return {
    ...session,
    date,
    venueName: session.venueName || "会場未設定",
    photoGoodsDeliveryDate: session.photoGoodsDeliveryDate || addMonths(date, 2),
    freePaperDeliveryDate: session.freePaperDeliveryDate || getFreePaperDeliveryDate(date),
    passcode: session.passcode || ""
  };
}

function normalizeOrder(order) {
  return {
    ...order,
    customer: normalizeCustomer(order.customer || {})
  };
}

function openDb() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB is not available"));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return dbPromise;
}

async function storageGet(key) {
  try {
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const request = transaction.objectStore(STORE_NAME).get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    const raw = localStorage.getItem(STORAGE_FALLBACK_KEY);
    return raw ? JSON.parse(raw)[key] || null : null;
  }
}

async function storageSet(key, value) {
  try {
    const db = await openDb();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      transaction.objectStore(STORE_NAME).put(value, key);
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    const raw = localStorage.getItem(STORAGE_FALLBACK_KEY);
    const data = raw ? JSON.parse(raw) : {};
    data[key] = value;
    localStorage.setItem(STORAGE_FALLBACK_KEY, JSON.stringify(data));
  }
}

function registerServiceWorker() {
  if (window.location.protocol === "file:" || window.webkit?.messageHandlers?.downloadCsv) return;
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      showToast("オフライン用の準備に失敗しました。通常表示はできます。");
    });
  }
}

function render() {
  if (completionTimer) {
    clearTimeout(completionTimer);
    completionTimer = null;
  }

  const content = getViewHtml();
  app.innerHTML = `${renderTopbar()}${content}${renderModalRoot()}`;
  bindEvents();

  if (state.view === "complete") {
    completionTimer = setTimeout(() => {
      resetOrder();
      state.view = "home";
      render();
    }, 6000);
  }
}

function renderTopbar() {
  const count = cartCount();
  const title = state.currentSession ? `${escapeHtml(state.currentSession.name)} / ${escapeHtml(state.currentSession.venueName)} / ${escapeHtml(formatDate(state.currentSession.date))}` : "撮影会未設定";
  const showHomeButton = state.view !== "home" && !isOrderFlowView(state.view);
  return `
    <header class="topbar">
      <div class="brand">
        <span>Photojoy! 注文受付メニュー</span>
      </div>
      <div class="top-actions">
        <span class="help">${title}</span>
        ${showHomeButton ? `<button class="ghost" data-action="go-home">トップへ</button>` : ""}
        ${state.view !== "cart" ? `<button class="secondary" data-action="go-cart">カート ${count ? `(${count})` : ""}</button>` : ""}
        <button class="ghost" data-action="go-admin">管理</button>
      </div>
    </header>
  `;
}

function getViewHtml() {
  switch (state.view) {
    case "customer":
      return renderCustomer();
    case "categories":
      return renderCategories();
    case "products":
      return renderProducts();
    case "detail":
      return renderProductDetail();
    case "cart":
      return renderCart();
    case "payment":
      return renderPayment();
    case "complete":
      return renderComplete();
    case "admin":
      return renderAdmin();
    default:
      return renderHome();
  }
}

function renderHome() {
  return `
    <main class="screen">
      <section class="hero">
        <div class="hero-main">
          <h1 class="home-title">フォトグッズのご注文</h1>
          <p class="lead">商品写真を見ながら選び、最後に決済方法を確認して注文を保存します。</p>
          <div class="button-row">
            <button class="primary big-button" data-action="start-order">ご注文</button>
            <button class="secondary big-button" data-action="go-admin">管理画面</button>
          </div>
        </div>
        <div class="home-photo" aria-label="フォトグッズのイメージ"></div>
      </section>
    </main>
  `;
}

function renderCustomer() {
  const customer = ensureCustomer();
  return `
    <main class="screen">
      ${renderSteps(1)}
      <section class="customer-layout">
        <div class="panel pad">
          <h2>お客様情報</h2>
          <div class="form-grid owner-form-grid">
            ${customerFields.map((field) => `
              <label class="field">
                ${escapeHtml(field.label)}
                <input data-customer-field="${field.id}" value="${escapeAttr(customer[field.id] || "")}" placeholder="${escapeAttr(field.placeholder)}" ${field.required ? "required" : ""}>
              </label>
            `).join("")}
          </div>
          <div class="pet-section">
            <div class="section-title-row">
              <h3>ペット情報</h3>
              <button class="secondary small-button" data-action="add-pet">＋ ペットを追加</button>
            </div>
            <div class="pet-list">
              ${customer.pets.map((pet, index) => renderPetRow(pet, index, "customer", customer.pets.length > 1)).join("")}
            </div>
          </div>
          <p class="help">誕生日は任意です。月日だけ選べます。</p>
          <div class="button-row">
            <button class="ghost" data-action="go-home">戻る</button>
            <button class="primary big-button" data-action="save-customer">商品を選ぶ</button>
          </div>
        </div>
        <aside class="panel pad line-card">
          <img src="${escapeAttr(LINE_QR_IMAGE)}" alt="LINEお友達登録QRコード">
          <p>こちらからお友達登録をお願いします。登録後はフルネームを漢字でお送りください。</p>
        </aside>
      </section>
    </main>
  `;
}

function renderPetRow(pet, index, scope, canRemove) {
  return `
    <div class="pet-row" data-pet-row="${index}">
      <label class="field">
        ペットの名前
        <input data-pet-field="${scope}" data-index="${index}" data-field="name" value="${escapeAttr(pet.name || "")}" placeholder="例：もも">
      </label>
      <label class="field">
        犬種・猫種など
        <input data-pet-field="${scope}" data-index="${index}" data-field="breed" value="${escapeAttr(pet.breed || "")}" placeholder="例：トイプードル">
      </label>
      <div class="birthday-fields">
        <label class="field">
          誕生日 月
          <select data-pet-field="${scope}" data-index="${index}" data-field="birthdayMonth">
            <option value="">月</option>
            ${Array.from({ length: 12 }, (_, itemIndex) => {
              const value = String(itemIndex + 1);
              return `<option value="${value}" ${String(pet.birthdayMonth) === value ? "selected" : ""}>${value}月</option>`;
            }).join("")}
          </select>
        </label>
        <label class="field">
          誕生日 日
          <select data-pet-field="${scope}" data-index="${index}" data-field="birthdayDay">
            <option value="">日</option>
            ${Array.from({ length: 31 }, (_, itemIndex) => {
              const value = String(itemIndex + 1);
              return `<option value="${value}" ${String(pet.birthdayDay) === value ? "selected" : ""}>${value}日</option>`;
            }).join("")}
          </select>
        </label>
      </div>
      <div class="pet-row-actions">
        ${canRemove ? `<button class="ghost small-button" data-action="remove-pet" data-index="${index}">削除</button>` : ""}
      </div>
    </div>
  `;
}

function renderCategories() {
  const isEditingOrder = Boolean(state.editingOrderId);
  return `
    <main class="screen">
      ${renderSteps(2)}
      <h2>商品カテゴリ</h2>
      ${isEditingOrder ? `<p class="help">修正中の注文に追加する商品を選んでください。</p>` : ""}
      <div class="category-grid">
        ${categories.map((category) => `
          <button class="category-card" data-action="select-category" data-id="${category.id}">
            <strong>${escapeHtml(category.name)}</strong>
            <span>${escapeHtml(category.description)}</span>
          </button>
        `).join("")}
      </div>
      <div class="button-row" style="margin-top: 22px;">
        <button class="ghost" data-action="${isEditingOrder ? "cancel-add-order-item" : "go-customer"}">戻る</button>
      </div>
    </main>
  `;
}

function renderProducts() {
  const category = categories.find((item) => item.id === state.selectedCategoryId);
  const shown = products.filter((product) => product.categoryId === state.selectedCategoryId);
  return `
    <main class="screen">
      ${renderSteps(2)}
      <h2>${escapeHtml(category ? category.name : "商品一覧")}</h2>
      <div class="product-grid">
        ${shown.map(renderProductCard).join("")}
      </div>
      <div class="button-row" style="margin-top: 22px;">
        <button class="ghost" data-action="go-categories">カテゴリへ戻る</button>
      </div>
    </main>
  `;
}

function renderProductCard(product) {
  return `
    <article class="product-card">
      <img src="${escapeAttr(product.image)}" alt="${escapeAttr(product.name)}">
      <div class="product-card-body">
        <h3>${escapeHtml(product.name)}</h3>
        <div class="price">${escapeHtml(formatProductPriceLabel(product))}</div>
        <p class="description">${escapeHtml(product.description)}</p>
        <button class="primary" data-action="select-product" data-id="${product.id}">選択する</button>
      </div>
    </article>
  `;
}

function renderProductDetail() {
  const product = products.find((item) => item.id === state.selectedProductId);
  if (!product) return renderProducts();
  const selected = getCurrentSelections(product);
  const isEditingOrder = Boolean(state.editingOrderId);
  const unitPrice = getProductUnitPrice(product, selected.options);
  const galleryImages = getProductGalleryImages(product);
  const optionImage = getProductOptionImage(product, selected.options);
  const activeImage = optionImage || (galleryImages.includes(state.selectedGalleryImage) ? state.selectedGalleryImage : galleryImages[0]);
  return `
    <main class="screen">
      ${renderSteps(3)}
      <section class="product-detail">
        <div class="detail-gallery">
          <img class="detail-image" src="${escapeAttr(activeImage)}" alt="${escapeAttr(product.name)}">
          ${galleryImages.length > 1 ? `
            <div class="gallery-thumbs" aria-label="商品写真の切り替え">
              ${galleryImages.map((image, index) => `
                <button class="gallery-thumb ${activeImage === image ? "selected" : ""}" data-action="select-gallery-image" data-image="${escapeAttr(image)}" aria-label="商品写真${index + 1}">
                  <img src="${escapeAttr(image)}" alt="">
                </button>
              `).join("")}
            </div>
          ` : ""}
        </div>
        <div class="panel pad">
          <h2>${escapeHtml(product.name)}</h2>
          <p class="price">${formatYen(unitPrice)}</p>
          <p class="help">${escapeHtml(product.description)}</p>
          ${product.detailDescription ? `
            <div class="detail-description">
              <h3>商品説明</h3>
              <p>${escapeHtml(product.detailDescription)}</p>
            </div>
          ` : ""}
          ${product.options.length ? product.options.map((option) => `
            <div class="option-group">
              <h3>${escapeHtml(option.label)}</h3>
              <div class="option-buttons">
                ${renderOptionButtons(option, selected)}
              </div>
            </div>
          `).join("") : `<p class="help">この商品は追加オプションなしで注文できます。</p>`}
          <div class="option-group">
            <h3>数量</h3>
            ${renderQuantity("detail", selected.quantity)}
          </div>
          <div class="total-line">
            <span>小計</span>
            <strong>${formatYen(unitPrice * selected.quantity)}</strong>
          </div>
          <div class="button-row">
            <button class="ghost" data-action="back-products">戻る</button>
            <button class="primary big-button" data-action="add-cart">${isEditingOrder ? "注文に追加" : "カートに追加"}</button>
          </div>
        </div>
      </section>
    </main>
  `;
}

function getProductGalleryImages(product) {
  const images = product.galleryImages && product.galleryImages.length ? product.galleryImages : [product.image];
  return [...new Set(images.filter(Boolean))];
}

function getProductOptionImage(product, options) {
  const optionImages = productOptionImages[product.id];
  if (!optionImages) return "";
  for (const [optionId, imagesByValue] of Object.entries(optionImages)) {
    const image = imagesByValue[options?.[optionId]];
    if (image) return image;
  }
  return "";
}

function getCurrentSelections(product) {
  if (!state.detailSelection || state.detailSelection.productId !== product.id) {
    state.detailSelection = {
      productId: product.id,
      quantity: 1,
      options: Object.fromEntries(product.options.map((option) => {
        if (option.type === "addons") return [option.id, []];
        if (option.type === "addonQuantity") return [option.id, 0];
        return [option.id, option.values[0]];
      }))
    };
  }
  return state.detailSelection;
}

function renderOptionButtons(option, selected) {
  if (option.type === "addonQuantity") {
    const current = Number(selected.options[option.id] || 0);
    const values = Array.from({ length: option.max - option.min + 1 }, (_, index) => option.min + index);
    return `
      <div class="addon-quantity-row">
        <span>${formatYen(option.unitPrice)} / ${escapeHtml(option.unit || "個")}</span>
        <select data-addon-quantity="${option.id}">
          ${values.map((value) => `<option value="${value}" ${current === value ? "selected" : ""}>${value}${escapeHtml(option.unit || "")}</option>`).join("")}
        </select>
      </div>
    `;
  }
  if (option.type === "addons") {
    const selectedValues = selected.options[option.id] || [];
    return option.values.map((value) => `
      <button class="option-button ${selectedValues.includes(value.label) ? "selected" : ""}" data-action="toggle-addon" data-option-id="${option.id}" data-value="${escapeAttr(value.label)}">${escapeHtml(value.label)} ${formatYen(value.price)}</button>
    `).join("");
  }
  return option.values.map((value) => `
    <button class="option-button ${selected.options[option.id] === value ? "selected" : ""}" data-action="set-option" data-option-id="${option.id}" data-value="${escapeAttr(value)}">${escapeHtml(value)}</button>
  `).join("");
}

function renderCart() {
  const hasItems = state.cart.length > 0;
  return `
    <main class="screen">
      ${renderSteps(4)}
      <h2>カート確認</h2>
      <section class="cart-layout">
        <div class="panel">
          ${hasItems ? state.cart.map(renderCartItem).join("") : `<div class="empty">カートに商品が入っていません。</div>`}
        </div>
        <aside class="panel total-box">
          <div class="total-line"><span>商品数</span><strong>${cartCount()}</strong></div>
          <div class="delivery-choice">
            <h3>受け取り場所</h3>
            <div class="delivery-buttons">
              ${deliveryMethods.map((method) => `
                <button class="option-button ${state.deliveryLocation === method ? "selected" : ""}" data-action="select-delivery" data-method="${escapeAttr(method)}">${escapeHtml(method)}</button>
              `).join("")}
            </div>
          </div>
          <label class="field compact-field">
            フリーペーパー掲載用写真
            <input data-free-paper-photo value="${escapeAttr(state.freePaperPhoto)}" placeholder="例：12">
          </label>
          <div class="total-line"><span>商品小計</span><strong>${formatYen(cartItemsTotal())}</strong></div>
          <div class="total-line"><span>送料</span><strong>${formatYen(cartShippingFee())}</strong></div>
          <div class="total-line"><span>合計</span><strong>${formatYen(cartTotal())}</strong></div>
          <div class="button-row">
            <button class="ghost" data-action="go-categories">商品を追加</button>
            <button class="primary big-button" data-action="go-payment" ${hasItems ? "" : "disabled"}>決済方法へ</button>
          </div>
        </aside>
      </section>
    </main>
  `;
}

function renderCartItem(item) {
  const requiresNote = isCartNoteRequired(item);
  return `
    <div class="cart-item">
      <div>
        <h3>${escapeHtml(item.name)}</h3>
        <p class="help">${escapeHtml(formatOptions(item.options))}</p>
        <p class="price">${formatYen(item.price * item.quantity)}</p>
        <label class="field note-field">
          備考${requiresNote ? "（必須）" : ""}
          <textarea data-cart-note="${item.id}" placeholder="${requiresNote ? "必ず入力してください" : "必要な場合のみ入力してください"}">${escapeHtml(item.note || "")}</textarea>
        </label>
      </div>
      <div class="cart-item-actions">
        ${renderQuantity(`cart:${item.id}`, item.quantity)}
        <button class="danger" data-action="remove-cart" data-id="${item.id}">削除</button>
      </div>
    </div>
  `;
}

function isCartNoteRequired(item) {
  const product = products.find((productItem) => productItem.id === item.productId);
  if (!product) return true;
  if (["data-cd", "express-data-cd"].includes(product.id)) return false;
  return product.categoryId !== "line-stamp";
}

function renderPayment() {
  const canConfirmOrder = state.paymentMethod && state.orderAgreementAccepted;
  return `
    <main class="screen">
      ${renderSteps(5)}
      <section class="panel pad">
        <h2>決済方法</h2>
        <div class="payment-grid">
          ${paymentMethods.map((method) => `
            <button class="payment-button ${state.paymentMethod === method ? "selected" : ""}" data-action="select-payment" data-method="${escapeAttr(method)}">${escapeHtml(method)}</button>
          `).join("")}
        </div>
        <div class="total-line" style="margin-top: 24px;">
          <span>受け取り場所</span>
          <strong>${escapeHtml(state.deliveryLocation)}</strong>
        </div>
        <div class="total-line">
          <span>送料</span>
          <strong>${formatYen(cartShippingFee())}</strong>
        </div>
        <div class="total-line">
          <span>合計金額</span>
          <strong>${formatYen(cartTotal())}</strong>
        </div>
        <div class="agreement-box">
          <h3>ご注文前の確認事項</h3>
          <ul>
            ${agreementItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
          <label class="agreement-check">
            <input type="checkbox" data-order-agreement ${state.orderAgreementAccepted ? "checked" : ""}>
            <span>上記内容に同意しました</span>
          </label>
        </div>
        <div class="button-row">
          <button class="ghost" data-action="go-cart">戻る</button>
          <button class="primary big-button" data-action="confirm-order" ${canConfirmOrder ? "" : "disabled"}>注文を確定</button>
        </div>
      </section>
    </main>
  `;
}

function renderComplete() {
  return `
    <main class="screen">
      <section class="panel pad" style="text-align: center;">
        <h1>ご注文を保存しました</h1>
        <p class="lead" style="margin-left: auto; margin-right: auto;">外部端末でのお支払い確認をお願いします。数秒後にトップ画面へ戻ります。</p>
        <div class="button-row" style="justify-content: center;">
          <button class="primary big-button" data-action="return-home-after-complete">トップへ戻る</button>
        </div>
      </section>
    </main>
  `;
}

function renderAdmin() {
  const sessionOrders = getSessionOrders();
  const sessionTotal = sessionOrders.reduce((sum, order) => sum + order.total, 0);
  const sessionItemCount = sessionOrders.reduce((sum, order) => (
    sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0)
  ), 0);
  return `
    <main class="screen">
      <h2>管理画面</h2>
      ${state.adminReturnView ? `
        <div class="panel pad resume-order-panel">
          <h3>入力中の注文</h3>
          <p class="help">管理画面へ移動する前の商品選択画面に戻れます。入力済みのお客様情報やカートの商品は残っています。</p>
          <div class="button-row">
            <button class="primary" data-action="return-order-flow">注文画面へ戻る</button>
          </div>
        </div>
      ` : ""}
      <section class="admin-grid">
        <div class="panel pad">
          <h3>現在の撮影会</h3>
          <p><strong>${escapeHtml(state.currentSession.name)}</strong></p>
          <p class="help">${escapeHtml(state.currentSession.venueName)} / ${escapeHtml(formatDate(state.currentSession.date))}</p>
          <p class="help">フォトグッズお届け時期：${escapeHtml(formatDate(state.currentSession.photoGoodsDeliveryDate))}</p>
          <p class="help">フリーペーパーお届け時期：${escapeHtml(formatDate(state.currentSession.freePaperDeliveryDate))}</p>
          <div class="button-row">
            <button class="primary" data-action="open-new-session">新しい撮影会を開始</button>
          </div>
          <hr>
          <h3>各種データ出力</h3>
          <div class="button-row">
            <button class="secondary" data-action="export-orders">注文一覧CSV</button>
            <button class="secondary" data-action="export-summary">商品別集計CSV</button>
            <button class="secondary" data-action="export-all-receipts" ${sessionOrders.length ? "" : "disabled"}>全員分の明細PNG</button>
          </div>
          <hr>
          <h3>データ操作</h3>
          <div class="button-row">
            <button class="danger" data-action="delete-all-orders">すべての注文データ削除</button>
          </div>
        </div>
        <div class="panel pad">
          <h3>保存済み注文一覧</h3>
          <div class="admin-summary">
            <div class="summary-card">
              <span>注文数</span>
              <strong>${sessionOrders.length}件</strong>
            </div>
            <div class="summary-card">
              <span>商品点数</span>
              <strong>${sessionItemCount}点</strong>
            </div>
            <div class="summary-card highlight">
              <span>全顧客の合計金額</span>
              <strong>${formatYen(sessionTotal)}</strong>
            </div>
          </div>
          <div class="data-list">
            ${sessionOrders.length ? renderOrderTable(sessionOrders) : `<div class="empty">現在の撮影会の注文はまだありません。</div>`}
          </div>
        </div>
      </section>
    </main>
  `;
}

function renderOrderTable(orders) {
  return `
    <table class="order-table">
      <thead><tr><th>注文日時</th><th>お客様</th><th>商品</th><th>合計</th><th>決済</th><th>操作</th></tr></thead>
      <tbody>
        ${orders.map((order) => `
          <tr>
            <td>${escapeHtml(formatDateTime(order.createdAt))}</td>
            <td>${escapeHtml(order.customer.name)}<br>${escapeHtml(order.customer.phone)}<br>${escapeHtml(formatPetsForDisplay(order.customer))}</td>
            <td>${escapeHtml(order.items.map(formatItemForCsv).join(" / "))}</td>
            <td>${formatYen(order.total)}</td>
            <td>${escapeHtml(order.paymentMethod)}</td>
            <td>
              <div class="table-actions">
                <button class="secondary small-button" data-action="edit-order" data-id="${order.id}">修正</button>
                <button class="secondary small-button" data-action="export-receipt" data-id="${order.id}">明細PNG</button>
                <button class="danger small-button" data-action="cancel-order" data-id="${order.id}">キャンセル</button>
              </div>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderProductTable() {
  return `
    <table class="product-table">
      <thead><tr><th>商品名</th><th>価格</th><th>カテゴリ</th><th>オプション</th><th>画像</th></tr></thead>
      <tbody>
        ${products.map((product) => `
          <tr>
            <td>${escapeHtml(product.name)}</td>
            <td>${escapeHtml(formatProductPriceLabel(product))}</td>
            <td>${escapeHtml(categories.find((item) => item.id === product.categoryId)?.name || "")}</td>
            <td>${escapeHtml(formatProductOptionsForTable(product))}</td>
            <td>${escapeHtml(product.image)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderSteps(active) {
  const steps = ["お客様情報", "商品選択", "オプション", "カート", "決済"];
  return `<nav class="steps" aria-label="注文ステップ">${steps.map((step, index) => `<div class="step ${index + 1 === active ? "active" : ""}">${step}</div>`).join("")}</nav>`;
}

function renderQuantity(target, quantity) {
  return `
    <div class="quantity-control" data-quantity-target="${escapeAttr(target)}">
      <button data-action="quantity-minus" data-target="${escapeAttr(target)}">−</button>
      <div class="quantity-value">${quantity}</div>
      <button data-action="quantity-plus" data-target="${escapeAttr(target)}">＋</button>
    </div>
  `;
}

function renderModalRoot() {
  return `<div id="modal-root"></div>`;
}

function bindEvents() {
  app.querySelectorAll("button[data-action]").forEach((button) => {
    button.addEventListener("click", handleAction);
  });
  app.querySelectorAll("[data-customer-field]").forEach((input) => {
    input.addEventListener("input", (event) => {
      state.customer[event.target.dataset.customerField] = event.target.value;
    });
  });
  app.querySelectorAll("[data-pet-field=\"customer\"]").forEach((input) => {
    input.addEventListener("input", updateCustomerPetFromInput);
    input.addEventListener("change", updateCustomerPetFromInput);
  });
  app.querySelectorAll("[data-cart-note]").forEach((input) => {
    input.addEventListener("input", (event) => {
      const item = state.cart.find((cartItem) => cartItem.id === event.target.dataset.cartNote);
      if (item) item.note = event.target.value;
    });
  });
  app.querySelectorAll("[data-addon-quantity]").forEach((select) => {
    select.addEventListener("change", (event) => {
      setAddonQuantity(event.target.dataset.addonQuantity, event.target.value);
    });
  });
  app.querySelectorAll("[data-free-paper-photo]").forEach((input) => {
    input.addEventListener("input", (event) => {
      state.freePaperPhoto = event.target.value;
    });
  });
  app.querySelectorAll("[data-order-agreement]").forEach((input) => {
    input.addEventListener("change", (event) => {
      state.orderAgreementAccepted = event.target.checked;
      render();
    });
  });
}

async function handleAction(event) {
  const button = event.currentTarget;
  const action = button.dataset.action;
  if (action === "start-order") startOrder();
  if (action === "go-home") goHome();
  if (action === "go-admin") goAdmin();
  if (action === "return-order-flow") returnOrderFlow();
  if (action === "go-cart") setView("cart");
  if (action === "go-customer") setView("customer");
  if (action === "go-categories") setView("categories");
  if (action === "save-customer") saveCustomerAndContinue();
  if (action === "select-category") selectCategory(button.dataset.id);
  if (action === "select-product") selectProduct(button.dataset.id);
  if (action === "select-gallery-image") selectGalleryImage(button.dataset.image);
  if (action === "add-pet") addCustomerPet();
  if (action === "remove-pet") removeCustomerPet(button.dataset.index);
  if (action === "back-products") setView("products");
  if (action === "set-option") setOption(button.dataset.optionId, button.dataset.value);
  if (action === "toggle-addon") toggleAddon(button.dataset.optionId, button.dataset.value);
  if (action === "quantity-minus") changeQuantity(button.dataset.target, -1);
  if (action === "quantity-plus") changeQuantity(button.dataset.target, 1);
  if (action === "add-cart") await addCart();
  if (action === "remove-cart") removeCart(button.dataset.id);
  if (action === "select-delivery") selectDelivery(button.dataset.method);
  if (action === "go-payment") goPayment();
  if (action === "select-payment") selectPayment(button.dataset.method);
  if (action === "confirm-order") openOrderConfirm();
  if (action === "return-home-after-complete") {
    resetOrder();
    setView("home");
  }
  if (action === "open-new-session") openNewSessionDialog();
  if (action === "export-orders") exportOrdersCsv();
  if (action === "export-summary") exportSummaryCsv();
  if (action === "export-receipt") exportReceiptPng(button.dataset.id);
  if (action === "export-all-receipts") exportAllReceiptsPng();
  if (action === "delete-all-orders") await deleteAllOrders();
  if (action === "edit-order") openEditOrderDialog(button.dataset.id);
  if (action === "cancel-order") await cancelSavedOrder(button.dataset.id);
  if (action === "add-order-item") await openAddOrderItemFlow(button.dataset.id);
  if (action === "cancel-add-order-item") cancelAddOrderItemFlow();
}

function startOrder() {
  resetOrder();
  state.view = "customer";
  render();
}

function goHome() {
  if (hasDraftOrder()) {
    openDiscardDraftConfirm();
    return;
  }
  resetOrder();
  state.adminReturnView = "";
  state.view = "home";
  render();
}

function openDiscardDraftConfirm() {
  const modalRoot = document.getElementById("modal-root");
  modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-modal="true" aria-label="入力中の注文の確認">
        <h2>入力中の注文があります</h2>
        <p class="help">トップへ戻ると、入力済みのお客様情報やカートの商品はリセットされます。</p>
        <div class="button-row">
          <button class="ghost" data-discard-draft-cancel>戻る</button>
          <button class="danger" data-discard-draft-confirm>トップへ戻る</button>
        </div>
      </div>
    </div>
  `;
  modalRoot.querySelector("[data-discard-draft-cancel]").addEventListener("click", () => {
    modalRoot.innerHTML = "";
  });
  modalRoot.querySelector("[data-discard-draft-confirm]").addEventListener("click", () => {
    resetOrder();
    state.adminReturnView = "";
    state.view = "home";
    render();
  });
}

function goAdmin() {
  if (isOrderFlowView(state.view) && hasDraftOrder() && !state.editingOrderId) {
    state.adminReturnView = state.view;
  }
  setView("admin");
}

function returnOrderFlow() {
  if (!state.adminReturnView) return;
  state.view = state.adminReturnView;
  state.adminReturnView = "";
  render();
}

function setView(view) {
  if (!["categories", "products", "detail"].includes(view)) {
    state.editingOrderId = null;
  }
  state.view = view;
  render();
}

function saveCustomerAndContinue() {
  const customer = ensureCustomer();
  const missing = customerFields.filter((field) => field.required && !String(state.customer[field.id] || "").trim());
  if (missing.length) {
    showToast(`${missing[0].label}を入力してください。`);
    return;
  }
  const invalidPetIndex = customer.pets.findIndex((pet) => !String(pet.name || "").trim() || !String(pet.breed || "").trim());
  if (invalidPetIndex >= 0) {
    showToast(`${invalidPetIndex + 1}頭目のペットの名前と犬種・猫種などを入力してください。`);
    return;
  }
  state.view = "categories";
  render();
}

function updateCustomerPetFromInput(event) {
  const customer = ensureCustomer();
  const index = Number.parseInt(event.target.dataset.index, 10);
  const field = event.target.dataset.field;
  if (!customer.pets[index]) customer.pets[index] = emptyPet();
  customer.pets[index][field] = event.target.value;
}

function addCustomerPet() {
  const customer = ensureCustomer();
  customer.pets.push(emptyPet());
  render();
}

function removeCustomerPet(index) {
  const customer = ensureCustomer();
  if (customer.pets.length <= 1) return;
  customer.pets.splice(Number.parseInt(index, 10), 1);
  render();
}

function selectCategory(id) {
  state.selectedCategoryId = id;
  state.view = "products";
  render();
}

function selectProduct(id) {
  state.selectedProductId = id;
  state.detailSelection = null;
  state.selectedGalleryImage = "";
  state.view = "detail";
  render();
}

function selectGalleryImage(image) {
  state.selectedGalleryImage = image;
  render();
}

function setOption(optionId, value) {
  const product = products.find((item) => item.id === state.selectedProductId);
  const selected = getCurrentSelections(product);
  selected.options[optionId] = value;
  state.selectedGalleryImage = "";
  render();
}

function toggleAddon(optionId, value) {
  const product = products.find((item) => item.id === state.selectedProductId);
  const selected = getCurrentSelections(product);
  const values = selected.options[optionId] || [];
  selected.options[optionId] = values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
  render();
}

function setAddonQuantity(optionId, value) {
  const product = products.find((item) => item.id === state.selectedProductId);
  const selected = getCurrentSelections(product);
  selected.options[optionId] = Number.parseInt(value, 10) || 0;
  render();
}

function changeQuantity(target, delta) {
  if (target === "detail") {
    const product = products.find((item) => item.id === state.selectedProductId);
    const selected = getCurrentSelections(product);
    selected.quantity = Math.max(1, selected.quantity + delta);
  } else if (target.startsWith("cart:")) {
    const id = target.replace("cart:", "");
    const item = state.cart.find((cartItem) => cartItem.id === id);
    if (item) item.quantity = Math.max(1, item.quantity + delta);
  }
  render();
}

async function addCart() {
  const product = products.find((item) => item.id === state.selectedProductId);
  const selected = getCurrentSelections(product);
  const unitPrice = getProductUnitPrice(product, selected.options);
  const newItem = {
    id: makeId(),
    productId: product.id,
    name: product.name,
    price: unitPrice,
    options: { ...selected.options },
    quantity: selected.quantity,
    note: ""
  };

  if (state.editingOrderId) {
    await addItemToSavedOrder(newItem);
    return;
  }

  state.cart.push(newItem);
  showToast("カートに追加しました。");
  state.view = "cart";
  render();
}

function removeCart(id) {
  state.cart = state.cart.filter((item) => item.id !== id);
  render();
}

function selectPayment(method) {
  state.paymentMethod = method;
  render();
}

function selectDelivery(method) {
  state.deliveryLocation = method;
  render();
}

function goPayment() {
  if (!String(state.freePaperPhoto || "").trim()) {
    showToast("フリーペーパー掲載用写真を入力してください。");
    return;
  }
  const missingNoteItem = state.cart.find((item) => isCartNoteRequired(item) && !String(item.note || "").trim());
  if (missingNoteItem) {
    showToast(`${missingNoteItem.name}の備考を入力してください。`);
    return;
  }
  setView("payment");
}

function openOrderConfirm() {
  if (!state.orderAgreementAccepted) {
    showToast("ご注文前の確認事項に同意してください。");
    return;
  }
  const modalRoot = document.getElementById("modal-root");
  modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-modal="true" aria-label="注文確定の確認">
        <h2>注文を確定しますか？</h2>
        <p class="help">ご注文確定後の返品、交換はできません。</p>
        <div class="total-line"><span>受け取り場所</span><strong>${escapeHtml(state.deliveryLocation)}</strong></div>
        <div class="total-line"><span>フリーペーパー掲載用写真</span><strong>${escapeHtml(state.freePaperPhoto)}</strong></div>
        <div class="total-line"><span>送料</span><strong>${formatYen(cartShippingFee())}</strong></div>
        <div class="total-line"><span>合計</span><strong>${formatYen(cartTotal())}</strong></div>
        <p><strong>決済方法：</strong>${escapeHtml(state.paymentMethod)}</p>
        <div class="button-row">
          <button class="ghost" data-modal-close>戻る</button>
          <button class="primary big-button" data-save-order>注文を確定</button>
        </div>
      </div>
    </div>
  `;
  modalRoot.querySelector("[data-modal-close]").addEventListener("click", () => {
    modalRoot.innerHTML = "";
  });
  modalRoot.querySelector("[data-save-order]").addEventListener("click", saveOrder);
}

async function saveOrder() {
  const customer = normalizeCustomer(state.customer);
  customer.name = customer.name.trim();
  customer.phone = customer.phone.trim();
  customer.pets = customer.pets.map((pet) => ({
    name: pet.name.trim(),
    breed: pet.breed.trim(),
    birthdayMonth: pet.birthdayMonth,
    birthdayDay: pet.birthdayDay
  }));
  const order = {
    id: makeId(),
    sessionId: state.currentSession.id,
    sessionName: state.currentSession.name,
    sessionVenueName: state.currentSession.venueName,
    sessionDate: state.currentSession.date,
    photoGoodsDeliveryDate: state.currentSession.photoGoodsDeliveryDate,
    freePaperDeliveryDate: state.currentSession.freePaperDeliveryDate,
    createdAt: new Date().toISOString(),
    customer,
    items: state.cart.map((item) => ({ ...item, note: item.note || "", options: { ...item.options } })),
    deliveryLocation: state.deliveryLocation,
    freePaperPhoto: state.freePaperPhoto.trim(),
    shippingFee: cartShippingFee(),
    itemsTotal: cartItemsTotal(),
    total: cartTotal(),
    paymentMethod: state.paymentMethod
  };
  state.orders.push(order);
  await persistState();
  resetOrder();
  state.view = "complete";
  render();
}

function openNewSessionDialog() {
  if (state.currentSession?.passcode) {
    openSessionPasscodeDialog();
    return;
  }
  openNewSessionForm();
}

function openSessionPasscodeDialog() {
  const modalRoot = document.getElementById("modal-root");
  modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-modal="true" aria-label="撮影会パスコード確認">
        <h2>パスコード確認</h2>
        <p class="help">新しい撮影会を開始するには、現在の撮影会で設定した4桁のパスコードを入力してください。</p>
        <label class="field" style="margin-top: 14px;">現在の撮影会のパスコード
          <input data-session-passcode-check type="password" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="off" placeholder="4桁">
        </label>
        <div class="button-row" style="margin-top: 20px;">
          <button class="ghost" data-modal-close>キャンセル</button>
          <button class="primary big-button" data-verify-session-passcode>次へ</button>
        </div>
      </div>
    </div>
  `;
  modalRoot.querySelector("[data-modal-close]").addEventListener("click", () => {
    modalRoot.innerHTML = "";
  });
  modalRoot.querySelector("[data-verify-session-passcode]").addEventListener("click", () => {
    const passcode = modalRoot.querySelector("[data-session-passcode-check]").value.trim();
    if (passcode !== state.currentSession.passcode) {
      showToast("パスコードが違います。");
      return;
    }
    openNewSessionForm();
  });
}

function openNewSessionForm() {
  const modalRoot = document.getElementById("modal-root");
  const today = new Date().toISOString().slice(0, 10);
  const defaultPhotoGoodsDeliveryDate = addMonths(today, 2);
  const defaultFreePaperDeliveryDate = getFreePaperDeliveryDate(today);
  modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-modal="true" aria-label="新しい撮影会">
        <h2>新しい撮影会を開始</h2>
        <label class="field">撮影会名<input data-new-session-name value="本日の撮影会"></label>
        <label class="field" style="margin-top: 14px;">会場名
          <input data-new-session-venue list="venue-suggestions" placeholder="例：東京会場">
          <datalist id="venue-suggestions">
            ${venueSuggestions.map((venue) => `<option value="${escapeAttr(venue)}"></option>`).join("")}
          </datalist>
        </label>
        <label class="field" style="margin-top: 14px;">開催日<input data-new-session-date type="date" value="${today}"></label>
        <label class="field" style="margin-top: 14px;">フォトグッズお届け時期
          <input data-new-session-photo-goods-delivery type="date" value="${defaultPhotoGoodsDeliveryDate}">
        </label>
        <label class="field" style="margin-top: 14px;">フリーペーパーお届け時期
          <input data-new-session-free-paper-delivery type="date" value="${defaultFreePaperDeliveryDate}">
        </label>
        <label class="field" style="margin-top: 14px;">4桁パスコード
          <input data-new-session-passcode type="password" inputmode="numeric" pattern="[0-9]*" maxlength="4" autocomplete="off" placeholder="例：1234">
        </label>
        <p class="help">次に新しい撮影会を開始するとき、このパスコードの入力が必要になります。</p>
        <div class="button-row" style="margin-top: 20px;">
          <button class="ghost" data-modal-close>キャンセル</button>
          <button class="primary big-button" data-create-session>開始する</button>
        </div>
      </div>
    </div>
  `;
  modalRoot.querySelector("[data-modal-close]").addEventListener("click", () => {
    modalRoot.innerHTML = "";
  });
  modalRoot.querySelector("[data-create-session]").addEventListener("click", async () => {
    const name = modalRoot.querySelector("[data-new-session-name]").value.trim();
    const venueName = modalRoot.querySelector("[data-new-session-venue]").value.trim();
    const date = modalRoot.querySelector("[data-new-session-date]").value;
    const photoGoodsDeliveryDate = modalRoot.querySelector("[data-new-session-photo-goods-delivery]").value;
    const freePaperDeliveryDate = modalRoot.querySelector("[data-new-session-free-paper-delivery]").value;
    const passcode = modalRoot.querySelector("[data-new-session-passcode]").value.trim();
    if (!name || !venueName || !date || !photoGoodsDeliveryDate || !freePaperDeliveryDate) {
      showToast("撮影会名、会場名、開催日、お届け時期を入力してください。");
      return;
    }
    if (!isValidSessionPasscode(passcode)) {
      showToast("パスコードは数字4桁で入力してください。");
      return;
    }
    state.currentSession = { id: makeId(), name, venueName, date, photoGoodsDeliveryDate, freePaperDeliveryDate, passcode, createdAt: new Date().toISOString() };
    await persistState();
    showToast("新しい撮影会を開始しました。");
    render();
  });
}

function isValidSessionPasscode(passcode) {
  return /^\d{4}$/.test(passcode);
}

async function deleteAllOrders() {
  if (!window.confirm("すべての注文データを削除します。この操作は元に戻せません。")) return;
  if (!window.confirm("本当に削除しますか？CSV出力が必要な場合は先に保存してください。")) return;
  state.orders = [];
  await persistState();
  showToast("注文データを削除しました。");
  render();
}

function openEditOrderDialog(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) {
    showToast("注文が見つかりませんでした。");
    return;
  }
  order.customer = normalizeCustomer(order.customer);
  const modalRoot = document.getElementById("modal-root");
  modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal wide-modal" role="dialog" aria-modal="true" aria-label="注文情報の修正">
        <h2>注文情報の修正</h2>
        <p class="help">数量を0にすると、その商品を注文から削除できます。</p>
        <div class="form-grid edit-form-grid">
          ${customerFields.map((field) => `
            <label class="field">
              ${escapeHtml(field.label)}
              <input data-edit-customer="${field.id}" value="${escapeAttr(order.customer[field.id] || "")}">
            </label>
          `).join("")}
        </div>
        <div class="pet-section">
          <div class="section-title-row">
            <h3>ペット情報</h3>
            <button class="secondary small-button" data-edit-add-pet>＋ ペットを追加</button>
          </div>
          <div class="pet-list" data-edit-pet-list>
            ${order.customer.pets.map((pet, index) => renderPetRow(pet, index, "edit", order.customer.pets.length > 1)).join("")}
          </div>
        </div>
        <label class="field" style="margin-top: 16px;">
          決済方法
          <select data-edit-payment>
            ${paymentMethods.map((method) => `<option value="${escapeAttr(method)}" ${order.paymentMethod === method ? "selected" : ""}>${escapeHtml(method)}</option>`).join("")}
          </select>
        </label>
        <label class="field" style="margin-top: 16px;">
          受け取り場所
          <select data-edit-delivery>
            ${deliveryMethods.map((method) => `<option value="${escapeAttr(method)}" ${getOrderDeliveryLocation(order) === method ? "selected" : ""}>${escapeHtml(method)}</option>`).join("")}
          </select>
        </label>
        <label class="field compact-field" style="margin-top: 16px;">
          フリーペーパー掲載用写真
          <input data-edit-free-paper-photo value="${escapeAttr(getOrderFreePaperPhoto(order))}" placeholder="例：12">
        </label>
        <div class="edit-items">
          <h3>注文商品</h3>
          ${order.items.map((item) => `
            <div class="edit-item-row">
              <div>
                <strong>${escapeHtml(item.name)}</strong>
                <p class="help">${escapeHtml(formatOptions(item.options))}<br>単価：${formatYen(item.price)}</p>
                <label class="field note-field">
                  備考${isCartNoteRequired(item) ? "（必須）" : ""}
                  <textarea data-edit-note="${item.id}" placeholder="${isCartNoteRequired(item) ? "必ず入力してください" : "必要な場合のみ入力してください"}">${escapeHtml(item.note || "")}</textarea>
                </label>
              </div>
              <label class="field edit-quantity-field">
                数量
                <input data-edit-quantity="${item.id}" type="number" min="0" step="1" value="${item.quantity}">
              </label>
            </div>
          `).join("")}
        </div>
        <div class="button-row" style="margin-top: 20px;">
          <button class="ghost" data-modal-close>閉じる</button>
          <button class="secondary big-button" data-action="add-order-item" data-id="${order.id}">商品を追加</button>
          <button class="primary big-button" data-save-edited-order>修正を保存</button>
        </div>
      </div>
    </div>
  `;
  modalRoot.querySelector("[data-modal-close]").addEventListener("click", () => {
    modalRoot.innerHTML = "";
  });
  modalRoot.querySelector("[data-save-edited-order]").addEventListener("click", () => saveEditedOrder(orderId));
  modalRoot.querySelector("[data-action=\"add-order-item\"]").addEventListener("click", handleAction);
  modalRoot.querySelector("[data-edit-add-pet]").addEventListener("click", () => addEditPetRow(modalRoot));
  modalRoot.querySelectorAll("[data-action=\"remove-pet\"]").forEach((button) => {
    button.addEventListener("click", () => removeEditPetRow(modalRoot, button.dataset.index));
  });
}

function readEditPets(modalRoot) {
  const rows = Array.from(modalRoot.querySelectorAll("[data-pet-row]"));
  return rows.map((row) => {
    const pet = emptyPet();
    row.querySelectorAll("[data-pet-field=\"edit\"]").forEach((input) => {
      pet[input.dataset.field] = input.value;
    });
    return pet;
  });
}

function refreshEditPetRows(modalRoot, pets) {
  const list = modalRoot.querySelector("[data-edit-pet-list]");
  list.innerHTML = pets.map((pet, index) => renderPetRow(pet, index, "edit", pets.length > 1)).join("");
  list.querySelectorAll("[data-action=\"remove-pet\"]").forEach((button) => {
    button.addEventListener("click", () => removeEditPetRow(modalRoot, button.dataset.index));
  });
}

function addEditPetRow(modalRoot) {
  const pets = readEditPets(modalRoot);
  pets.push(emptyPet());
  refreshEditPetRows(modalRoot, pets);
}

function removeEditPetRow(modalRoot, index) {
  const pets = readEditPets(modalRoot);
  if (pets.length <= 1) return;
  pets.splice(Number.parseInt(index, 10), 1);
  refreshEditPetRows(modalRoot, pets);
}

async function openAddOrderItemFlow(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) {
    showToast("注文が見つかりませんでした。");
    return;
  }
  const saved = await applyEditedOrder(orderId, { renderAfter: false, silent: true });
  if (!saved) return;
  document.getElementById("modal-root").innerHTML = "";
  state.editingOrderId = orderId;
  state.selectedCategoryId = null;
  state.selectedProductId = null;
  state.detailSelection = null;
  state.cart = [];
  state.view = "categories";
  render();
  showToast("追加する商品を選んでください。");
}

function cancelAddOrderItemFlow() {
  state.editingOrderId = null;
  state.selectedCategoryId = null;
  state.selectedProductId = null;
  state.detailSelection = null;
  state.view = "admin";
  render();
}

async function addItemToSavedOrder(newItem) {
  const order = state.orders.find((item) => item.id === state.editingOrderId);
  if (!order) {
    state.editingOrderId = null;
    showToast("注文が見つかりませんでした。");
    state.view = "admin";
    render();
    return;
  }
  order.items.push(newItem);
  order.deliveryLocation = getOrderDeliveryLocation(order);
  order.shippingFee = getDeliveryFee(order.deliveryLocation);
  order.itemsTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  order.total = order.itemsTotal + order.shippingFee;
  order.updatedAt = new Date().toISOString();
  await persistState();
  state.editingOrderId = null;
  state.selectedCategoryId = null;
  state.selectedProductId = null;
  state.detailSelection = null;
  state.view = "admin";
  render();
  openEditOrderDialog(order.id);
  showToast("注文に商品を追加しました。備考も続けて入力できます。");
}

async function saveEditedOrder(orderId) {
  await applyEditedOrder(orderId, { renderAfter: true, silent: false });
}

async function applyEditedOrder(orderId, options = {}) {
  const { renderAfter = true, silent = false } = options;
  const order = state.orders.find((item) => item.id === orderId);
  const modalRoot = document.getElementById("modal-root");
  if (!order || !modalRoot) return false;

  const updatedCustomer = {};
  for (const field of customerFields) {
    const input = modalRoot.querySelector(`[data-edit-customer="${field.id}"]`);
    updatedCustomer[field.id] = input ? input.value.trim() : "";
    if (field.required && !updatedCustomer[field.id]) {
      showToast(`${field.label}を入力してください。`);
      return false;
    }
  }
  updatedCustomer.pets = readEditPets(modalRoot).map((pet) => ({
    name: pet.name.trim(),
    breed: pet.breed.trim(),
    birthdayMonth: pet.birthdayMonth,
    birthdayDay: pet.birthdayDay
  }));
  const invalidPetIndex = updatedCustomer.pets.findIndex((pet) => !pet.name || !pet.breed);
  if (invalidPetIndex >= 0) {
    showToast(`${invalidPetIndex + 1}頭目のペットの名前と犬種・猫種などを入力してください。`);
    return false;
  }

  const updatedItems = order.items
    .map((item) => {
      const quantityInput = modalRoot.querySelector(`[data-edit-quantity="${item.id}"]`);
      const noteInput = modalRoot.querySelector(`[data-edit-note="${item.id}"]`);
      const quantity = Math.max(0, Number.parseInt(quantityInput ? quantityInput.value : item.quantity, 10) || 0);
      return { ...item, quantity, note: noteInput ? noteInput.value.trim() : item.note || "" };
    })
    .filter((item) => item.quantity > 0);

  const missingNoteItem = updatedItems.find((item) => isCartNoteRequired(item) && !String(item.note || "").trim());
  if (missingNoteItem) {
    showToast(`${missingNoteItem.name}の備考を入力してください。`);
    return false;
  }

  if (!updatedItems.length) {
    showToast("商品がすべて0です。注文をキャンセルする場合は一覧のキャンセルを押してください。");
    return false;
  }

  order.customer = updatedCustomer;
  order.paymentMethod = modalRoot.querySelector("[data-edit-payment]").value;
  order.deliveryLocation = modalRoot.querySelector("[data-edit-delivery]").value;
  order.freePaperPhoto = modalRoot.querySelector("[data-edit-free-paper-photo]").value.trim();
  if (!order.freePaperPhoto) {
    showToast("フリーペーパー掲載用写真を入力してください。");
    return false;
  }
  order.shippingFee = getDeliveryFee(order.deliveryLocation);
  order.itemsTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  order.items = updatedItems;
  order.total = order.itemsTotal + order.shippingFee;
  order.updatedAt = new Date().toISOString();

  await persistState();
  if (!silent) showToast("注文情報を修正しました。");
  if (renderAfter) render();
  return true;
}

async function cancelSavedOrder(orderId) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) {
    showToast("注文が見つかりませんでした。");
    return;
  }
  const label = `${order.customer.name || "お客様"} / ${formatYen(order.total)}`;
  if (!window.confirm(`${label} の注文をキャンセルしますか？この注文は一覧とCSVから削除されます。`)) return;
  state.orders = state.orders.filter((item) => item.id !== orderId);
  await persistState();
  showToast("注文をキャンセルしました。");
  render();
}

function exportOrdersCsv() {
  const orders = getSessionOrders();
  const rows = [
    ["注文日時", "撮影会名", "会場名", "開催日", "氏名", "電話番号", "ペット情報", "ペットの名前", "犬種・猫種など", "誕生日", "注文商品一覧", "受け取り場所", "フリーペーパー掲載用写真", "送料", "合計金額", "決済方法"],
    ...orders.map((order) => [
      formatDateTime(order.createdAt),
      order.sessionName,
      order.sessionVenueName || "会場未設定",
      order.sessionDate,
      order.customer.name,
      order.customer.phone,
      formatPetsForDisplay(order.customer),
      formatPetNames(order.customer),
      formatPetBreeds(order.customer),
      formatPetBirthdays(order.customer),
      order.items.map(formatItemForCsv).join(" / "),
      getOrderDeliveryLocation(order),
      getOrderFreePaperPhoto(order),
      getOrderShippingFee(order),
      order.total,
      order.paymentMethod
    ])
  ];
  downloadCsv(rows, `${state.currentSession.date}_${safeFileName(state.currentSession.venueName)}_${safeFileName(state.currentSession.name)}_注文一覧.csv`);
}

function exportSummaryCsv() {
  const summary = new Map();
  getSessionOrders().forEach((order) => {
    order.items.forEach((item) => {
      const optionText = formatOptions(item.options);
      const key = `${item.name}__${optionText}`;
      const current = summary.get(key) || { name: item.name, optionText, count: 0, total: 0 };
      current.count += item.quantity;
      current.total += item.price * item.quantity;
      summary.set(key, current);
    });
  });
  const rows = [
    ["商品名", "オプション", "注文数", "売上合計"],
    ...Array.from(summary.values()).map((item) => [item.name, item.optionText, item.count, item.total])
  ];
  downloadCsv(rows, `${state.currentSession.date}_${safeFileName(state.currentSession.venueName)}_${safeFileName(state.currentSession.name)}_商品別集計.csv`);
}

function exportReceiptPng(orderId, options = {}) {
  const { silent = false } = options;
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) {
    showToast("注文が見つかりませんでした。");
    return;
  }
  const canvas = createReceiptCanvas(order);
  const filename = receiptFileName(order);
  downloadCanvasPng(canvas, filename);
  if (!silent) showToast("ご注文明細書PNGを出力しました。");
}

function exportAllReceiptsPng() {
  const orders = getSessionOrders();
  if (!orders.length) {
    showToast("出力できる注文がありません。");
    return;
  }
  orders.forEach((order, index) => {
    window.setTimeout(() => exportReceiptPng(order.id, { silent: true }), index * 250);
  });
  showToast(`${orders.length}件分のご注文明細書PNGを出力します。`);
}

function createReceiptCanvas(order) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const width = 1200;
  const padding = 80;
  const maxTextWidth = width - padding * 2;
  const lineHeight = 38;
  const sectionGap = 28;
  const rows = buildReceiptRows(order);
  const deliveryNotice = "物流や天候の影響などを受け、お届け時期に遅れが生じる場合がございます。記載している日付は目安なので、ご了承ください。";
  const deliveryNoticeLines = wrapCanvasText(ctx, deliveryNotice, maxTextWidth, "700 24px sans-serif");
  const agreementGroups = agreementItems.map((item) => wrapCanvasText(ctx, item, maxTextWidth - 42, "26px sans-serif"));
  const agreementLineCount = agreementGroups.reduce((sum, lines) => sum + lines.length, 0);
  const itemLineCount = rows.reduce((sum, row) => sum + row.lines.length + 1, 0);
  const height = Math.max(1760, 840 + itemLineCount * lineHeight + deliveryNoticeLines.length * 30 + agreementLineCount * 34 + agreementGroups.length * 14);

  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = "#fffaf4";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, 42, 42, width - 84, height - 84, 28);
  ctx.fill();
  ctx.strokeStyle = "#e6d8c8";
  ctx.lineWidth = 4;
  ctx.stroke();

  let y = 125;
  ctx.fillStyle = "#2f2d2a";
  ctx.textAlign = "center";
  ctx.font = "700 52px sans-serif";
  ctx.fillText("ご注文明細書", width / 2, y);
  y += 64;
  ctx.font = "24px sans-serif";
  ctx.fillStyle = "#756b61";
  ctx.fillText(`${formatDateTime(order.createdAt)} 発行`, width / 2, y);

  y += 72;
  ctx.textAlign = "left";
  ctx.fillStyle = "#2f2d2a";
  ctx.font = "700 34px sans-serif";
  ctx.fillText(`${order.customer.name || "お客様"} さま`, padding, y);
  y += 48;
  ctx.font = "700 30px sans-serif";
  ctx.fillText(formatPetNamesWithChan(order.customer), padding, y);

  y += sectionGap + 18;
  y = drawReceiptSectionTitle(ctx, "ご注文内容", padding, y);
  rows.forEach((row) => {
    ctx.font = "700 28px sans-serif";
    ctx.fillStyle = "#2f2d2a";
    row.lines.forEach((line) => {
      ctx.fillText(line, padding, y);
      y += lineHeight;
    });
    ctx.font = "700 28px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(row.amount, width - padding, y - lineHeight);
    ctx.textAlign = "left";
    y += 18;
  });
  if (getOrderShippingFee(order) > 0) {
    y += 10;
    ctx.font = "700 28px sans-serif";
    ctx.fillText("送料", padding, y);
    ctx.textAlign = "right";
    ctx.fillText(formatYen(getOrderShippingFee(order)), width - padding, y);
    ctx.textAlign = "left";
  }

  y += 54;
  ctx.fillStyle = "#f5e7d8";
  roundRect(ctx, padding, y - 42, maxTextWidth, 74, 16);
  ctx.fill();
  ctx.fillStyle = "#7b4d25";
  ctx.font = "700 34px sans-serif";
  ctx.fillText("合計金額", padding + 24, y + 7);
  ctx.textAlign = "right";
  ctx.font = "700 42px sans-serif";
  ctx.fillText(formatYen(order.total), width - padding - 24, y + 10);
  ctx.textAlign = "left";

  y += 112;
  y = drawReceiptSectionTitle(ctx, "フォトグッズお届け時期", padding, y);
  ctx.font = "28px sans-serif";
  ctx.fillStyle = "#2f2d2a";
  ctx.fillText(formatDate(getOrderPhotoGoodsDeliveryDate(order)), padding, y);

  y += 86;
  y = drawReceiptSectionTitle(ctx, "フリーペーパーお届け時期", padding, y);
  ctx.font = "28px sans-serif";
  ctx.fillStyle = "#2f2d2a";
  ctx.fillText(formatDate(getOrderFreePaperDeliveryDate(order)), padding, y);

  y += 52;
  ctx.font = "700 24px sans-serif";
  ctx.fillStyle = "#b22222";
  deliveryNoticeLines.forEach((line) => {
    ctx.fillText(line, padding, y);
    y += 30;
  });

  y += sectionGap + 54;
  y = drawReceiptSectionTitle(ctx, "ご確認事項", padding, y);
  ctx.font = "26px sans-serif";
  ctx.fillStyle = "#2f2d2a";
  agreementGroups.forEach((lines) => {
    ctx.fillText("・", padding, y);
    lines.forEach((line, index) => {
      ctx.fillText(line, padding + 42, y + index * 34);
    });
    y += lines.length * 34 + 14;
  });

  y = height - 145;
  ctx.textAlign = "center";
  ctx.font = "700 28px sans-serif";
  ctx.fillText("株式会社プラスラブ　代表取締役　力久くるみ", width / 2, y);

  return canvas;
}

function receiptFileName(order) {
  return `${formatDateForFile(order.createdAt)}_${safeFileName(order.customer.name || "お客様")}_ご注文明細書.png`;
}

function buildReceiptRows(order) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const textWidth = 760;
  return order.items.map((item) => {
    const optionText = formatOptions(item.options);
    const detail = `${item.name} / ${optionText} / 数量:${item.quantity}`;
    return {
      lines: wrapCanvasText(ctx, detail, textWidth, "700 28px sans-serif"),
      amount: formatYen(item.price * item.quantity)
    };
  });
}

function wrapCanvasText(ctx, text, maxWidth, font) {
  ctx.font = font;
  const parts = String(text).split(/([、。])/).reduce((tokens, part, index, source) => {
    if (!part) return tokens;
    if ((part === "、" || part === "。") && tokens.length) {
      tokens[tokens.length - 1] += part;
    } else if (source[index + 1] === "、" || source[index + 1] === "。") {
      tokens.push(part);
    } else {
      tokens.push(...Array.from(part));
    }
    return tokens;
  }, []);
  const lines = [];
  let current = "";
  parts.forEach((part) => {
    const next = current + part;
    if (current && ctx.measureText(next).width > maxWidth) {
      lines.push(current);
      current = part;
    } else {
      current = next;
    }
  });
  if (current) lines.push(current);
  return lines;
}

function drawReceiptSectionTitle(ctx, title, x, y) {
  ctx.fillStyle = "#7b4d25";
  ctx.font = "700 30px sans-serif";
  ctx.fillText(title, x, y);
  ctx.strokeStyle = "#e6d8c8";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y + 16);
  ctx.lineTo(1120, y + 16);
  ctx.stroke();
  return y + 58;
}

function downloadCanvasPng(canvas, filename) {
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function downloadCsv(rows, filename) {
  const bom = "\uFEFF";
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\r\n");
  if (window.webkit?.messageHandlers?.downloadCsv) {
    window.webkit.messageHandlers.downloadCsv.postMessage({ filename, csv: bom + csv });
    return;
  }
  const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function resetOrder() {
  state.customer = {};
  state.cart = [];
  state.paymentMethod = "";
  state.orderAgreementAccepted = false;
  state.deliveryLocation = "店舗";
  state.freePaperPhoto = "";
  state.selectedCategoryId = null;
  state.selectedProductId = null;
  state.detailSelection = null;
  state.editingOrderId = null;
  state.adminReturnView = "";
}

function isOrderFlowView(view) {
  return ["customer", "categories", "products", "detail", "cart", "payment"].includes(view);
}

function hasDraftOrder() {
  const customer = normalizeCustomer(state.customer);
  const hasCustomerInfo = customerFields.some((field) => String(customer[field.id] || "").trim());
  const hasPetInfo = customer.pets.some((pet) => (
    String(pet.name || "").trim() ||
    String(pet.breed || "").trim() ||
    String(pet.birthdayMonth || "").trim() ||
    String(pet.birthdayDay || "").trim()
  ));
  return Boolean(
    hasCustomerInfo ||
    hasPetInfo ||
    state.cart.length ||
    state.selectedCategoryId ||
    state.selectedProductId ||
    state.detailSelection ||
    state.paymentMethod ||
    state.orderAgreementAccepted ||
    state.freePaperPhoto
  );
}

function cartCount() {
  return state.cart.reduce((sum, item) => sum + item.quantity, 0);
}

function cartItemsTotal() {
  return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getDeliveryFee(method) {
  return method === "ご自宅" ? HOME_DELIVERY_FEE : 0;
}

function cartShippingFee() {
  return getDeliveryFee(state.deliveryLocation);
}

function cartTotal() {
  return cartItemsTotal() + cartShippingFee();
}

function getOrderDeliveryLocation(order) {
  return order.deliveryLocation || "店舗";
}

function getOrderShippingFee(order) {
  return order.shippingFee ?? getDeliveryFee(getOrderDeliveryLocation(order));
}

function getOrderFreePaperPhoto(order) {
  return order.freePaperPhoto || "";
}

function getSessionOrders() {
  return state.orders.filter((order) => order.sessionId === state.currentSession.id);
}

function getCustomerPets(customer) {
  return normalizeCustomer(customer).pets;
}

function formatPetBirthday(pet) {
  if (!pet.birthdayMonth || !pet.birthdayDay) return "";
  return `${pet.birthdayMonth}月${pet.birthdayDay}日`;
}

function formatPetsForDisplay(customer) {
  return getCustomerPets(customer).map((pet, index) => {
    const birthday = formatPetBirthday(pet);
    return `${index + 1}. ${pet.name}${pet.breed ? ` / ${pet.breed}` : ""}${birthday ? ` / ${birthday}` : ""}`;
  }).join(" / ");
}

function formatPetNames(customer) {
  return getCustomerPets(customer).map((pet) => pet.name).join(" / ");
}

function formatPetNamesWithChan(customer) {
  return getCustomerPets(customer)
    .map((pet) => `${pet.name || "ペット"}ちゃん`)
    .join("、");
}

function formatPetBreeds(customer) {
  return getCustomerPets(customer).map((pet) => pet.breed).join(" / ");
}

function formatPetBirthdays(customer) {
  return getCustomerPets(customer).map(formatPetBirthday).join(" / ");
}

function formatOptions(options) {
  const entries = Object.entries(options || {});
  if (!entries.length) return "オプションなし";
  const labels = new Map();
  const optionTypes = new Map();
  const optionUnits = new Map();
  products.forEach((product) => product.options.forEach((option) => {
    labels.set(option.id, option.label);
    optionTypes.set(option.id, option.type || "choice");
    optionUnits.set(option.id, option.unit || "");
  }));
  const formatted = entries
    .filter(([key, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      if (optionTypes.get(key) === "addonQuantity") return Number(value) > 0;
      return true;
    })
    .map(([key, value]) => {
      const formattedValue = optionTypes.get(key) === "addonQuantity"
        ? `${value}${optionUnits.get(key) || ""}`
        : Array.isArray(value) ? value.join("/") : value;
      return `${labels.get(key) || key}: ${formattedValue}`;
    });
  return formatted.length ? formatted.join("、") : "オプションなし";
}

function getProductUnitPrice(product, selectedOptions = {}) {
  let price = product.price;
  if (product.optionPrices) {
    for (const [optionId, prices] of Object.entries(product.optionPrices)) {
      const selectedValue = selectedOptions[optionId];
      if (selectedValue && prices[selectedValue] !== undefined) {
        price = prices[selectedValue];
      }
    }
  }
  for (const option of product.options || []) {
    if (option.type === "addons") {
      const selectedValues = selectedOptions[option.id] || [];
      price += option.values
        .filter((value) => selectedValues.includes(value.label))
        .reduce((sum, value) => sum + value.price, 0);
    }
    if (option.type === "addonQuantity") {
      price += (Number(selectedOptions[option.id]) || 0) * option.unitPrice;
    }
  }
  return price;
}

function formatProductPriceLabel(product) {
  if (!product.optionPrices) return formatYen(product.price);
  const prices = Object.values(product.optionPrices).flatMap((priceMap) => Object.values(priceMap));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  if (minPrice === maxPrice) return formatYen(minPrice);
  return `${formatYen(minPrice)}〜`;
}

function formatProductOptionsForTable(product) {
  if (!product.options.length) return "なし";
  return product.options.map((option) => {
    if (option.type === "addons") {
      return `${option.label}: ${option.values.map((value) => `${value.label} +${formatYen(value.price)}`).join("/")}`;
    }
    if (option.type === "addonQuantity") {
      return `${option.label}: ${option.min}${option.unit || ""}-${option.max}${option.unit || ""}（${formatYen(option.unitPrice)} / ${option.unit || "個"}）`;
    }
    return `${option.label}: ${option.values.join("/")}`;
  }).join("、");
}

function formatItemForCsv(item) {
  const noteText = item.note ? `、備考:${item.note}` : "";
  return `${item.name}（${formatOptions(item.options)}、数量:${item.quantity}、小計:${item.price * item.quantity}円${noteText}）`;
}

function formatYen(value) {
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(value);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "long", day: "numeric" }).format(new Date(`${value}T00:00:00`));
}

function addMonths(value, months) {
  const date = new Date(value);
  date.setMonth(date.getMonth() + months);
  return date.toISOString().slice(0, 10);
}

function getFreePaperDeliveryDate(value) {
  const date = new Date(value);
  const month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (month >= 12) year += 1;
  if (month === 12 || month <= 2) return `${year}-03-31`;
  if (month <= 5) return `${year}-06-30`;
  if (month <= 8) return `${year}-09-30`;
  return `${year}-12-24`;
}

function getOrderPhotoGoodsDeliveryDate(order) {
  return order.photoGoodsDeliveryDate || state.currentSession?.photoGoodsDeliveryDate || addMonths(order.createdAt, 2);
}

function getOrderFreePaperDeliveryDate(order) {
  return order.freePaperDeliveryDate || state.currentSession?.freePaperDeliveryDate || getFreePaperDeliveryDate(order.createdAt);
}

function formatDateForFile(value) {
  return new Date(value).toISOString().slice(0, 10);
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function safeFileName(value) {
  return String(value).replace(/[\\/:*?"<>|]/g, "_").trim() || "撮影会";
}

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}
