import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (path) => readFileSync(join(root, path), "utf8");

const app = read("app.js");
const index = read("index.html");
const serviceWorker = read("service-worker.js");
const manifest = read("manifest.json");
const style = read("style.css");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function matchOne(source, pattern, message) {
  const match = source.match(pattern);
  assert(match, message);
  return match;
}

const appVersion = matchOne(index, /app\.js\?v=(\d+)/, "index.html must load versioned app.js")[1];
assert(
  serviceWorker.includes(`"./app.js?v=${appVersion}"`),
  `service-worker.js must cache app.js?v=${appVersion}`
);

const cacheVersion = Number(matchOne(serviceWorker, /pet-photo-order-app-v(\d+)/, "service worker cache must be versioned")[1]);
assert(cacheVersion > 0, "service worker cache version must be a positive number");

assert(
  app.includes('["氏名", "注文日時", "撮影会名", "会場名", "開催日"'),
  "注文一覧CSVのA列は氏名である必要があります"
);
assert(
  /orders\.map\(\(order\) => \[\s*order\.customer\.name,\s*formatDateTime\(order\.createdAt\)/s.test(app),
  "注文一覧CSVのデータ行もA列にお客様氏名を出力する必要があります"
);

assert(
  app.includes("注文受付日時：${formatDateTime(getOrderAcceptedAt(order))}"),
  "明細PNGの発行時間は注文受付日時を使う必要があります"
);
assert(
  app.includes("開催店舗名：${getOrderVenueName(order)}"),
  "明細PNGには開催店舗名が必要です"
);
assert(
  app.includes("発送先：${getOrderDeliveryLocation(order)}"),
  "明細PNGには発送先が必要です"
);

assert(
  /function downloadCanvasPng[\s\S]*downloadPng[\s\S]*downloadBlob\(blob, filename, "image\/png"/.test(app),
  "明細PNGの保存はiPad用ブリッジと共有/ダウンロードのフォールバックに対応する必要があります"
);
assert(
  /function downloadCsv[\s\S]*downloadCsv[\s\S]*downloadBlob\(blob, filename, "text\/csv;charset=utf-8"/.test(app),
  "CSV保存はiPad用ブリッジと共有/ダウンロードのフォールバックに対応する必要があります"
);
assert(
  /function downloadBlob[\s\S]*navigator\.canShare[\s\S]*navigator\.share[\s\S]*triggerLinkDownload/.test(app),
  "iPad保存用にWeb Share APIから通常ダウンロードへ戻る処理が必要です"
);

const referencedAssets = new Set(
  [...`${app}\n${index}\n${serviceWorker}\n${manifest}\n${style}`.matchAll(/(?:assets|fonts)\/[^"'`) ,]+/g)]
    .map((match) => match[0].split("?")[0])
);

for (const assetPath of referencedAssets) {
  assert(existsSync(join(root, assetPath)), `参照ファイルが見つかりません: ${assetPath}`);
}

console.log(`Smoke test passed: app.js?v=${appVersion}, cache v${cacheVersion}, ${referencedAssets.size} assets checked.`);
