import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

const srcJpg = path.join(publicDir, "services-hive-bg.jpg");
const outWebp = path.join(publicDir, "services-hive-bg.webp");
const outAvif = path.join(publicDir, "services-hive-bg.avif");

async function optimize() {
  console.log("🚀 [IMAGE OPT] services-hive-bg.jpg dönüştürülüyor...");
  const inputBuffer = fs.readFileSync(srcJpg);
  const initialBytes = inputBuffer.length;

  // 1. WebP Üretimi
  const webpBuffer = await sharp(inputBuffer)
    .webp({ quality: 80, effort: 6 })
    .toBuffer();
  fs.writeFileSync(outWebp, webpBuffer);
  const webpBytes = webpBuffer.length;

  // 2. AVIF Üretimi
  const avifBuffer = await sharp(inputBuffer)
    .avif({ quality: 75, effort: 6 })
    .toBuffer();
  fs.writeFileSync(outAvif, avifBuffer);
  const avifBytes = avifBuffer.length;

  // 3. Optimize Edilmiş JPG
  const optJpgBuffer = await sharp(inputBuffer)
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
  fs.writeFileSync(srcJpg, optJpgBuffer);
  const optJpgBytes = optJpgBuffer.length;

  console.log("\n════════════════════════════════════════════════════════════════");
  console.log("📊 [GÖRSEL OPTİMİZASYON BAYT RAPORU: services-hive-bg]");
  console.log(`  Orijinal JPEG:       ${(initialBytes / 1024).toFixed(2)} KB (${initialBytes.toLocaleString()} bayt) [BAŞLANGIÇ]`);
  console.log(`  Optimize JPEG:       ${(optJpgBytes / 1024).toFixed(2)} KB (${optJpgBytes.toLocaleString()} bayt) [-%${(((initialBytes - optJpgBytes) / initialBytes) * 100).toFixed(1)}]`);
  console.log(`  WebP Türevi:         ${(webpBytes / 1024).toFixed(2)} KB (${webpBytes.toLocaleString()} bayt) [-%${(((initialBytes - webpBytes) / initialBytes) * 100).toFixed(1)}]`);
  console.log(`  AVIF Türevi (Ana):   ${(avifBytes / 1024).toFixed(2)} KB (${avifBytes.toLocaleString()} bayt) [-%${(((initialBytes - avifBytes) / initialBytes) * 100).toFixed(1)}]`);
  console.log("════════════════════════════════════════════════════════════════\n");

  const reportData = {
    originalBytes: initialBytes,
    originalKb: (initialBytes / 1024).toFixed(2),
    optimizedJpgBytes: optJpgBytes,
    optimizedJpgKb: (optJpgBytes / 1024).toFixed(2),
    webpBytes: webpBytes,
    webpKb: (webpBytes / 1024).toFixed(2),
    avifBytes: avifBytes,
    avifKb: (avifBytes / 1024).toFixed(2),
    reductionPercentWebp: (((initialBytes - webpBytes) / initialBytes) * 100).toFixed(1),
    reductionPercentAvif: (((initialBytes - avifBytes) / initialBytes) * 100).toFixed(1),
  };

  fs.writeFileSync(
    path.join(rootDir, "data", "hive-bg-optimization-report.json"),
    JSON.stringify(reportData, null, 2),
    "utf-8"
  );
}

optimize().catch((err) => {
  console.error("Optimizasyon hatası:", err);
  process.exit(1);
});
