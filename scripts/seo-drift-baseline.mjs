import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const baselineFile = path.join(dataDir, "seo-baseline.json");

const ROUTES = [
  "/",
  "/fiyatlar",
  "/hizmetler",
  "/kirsehir-dijital-pazarlama-ajansi",
  "/nevsehir-dijital-pazarlama-ajansi",
  "/kapadokya-web-tasarim",
  "/konya-dijital-pazarlama",
  "/aksaray-dijital-pazarlama",
  "/hizmetler/web-tasarim-yazilim",
  "/hizmetler/google-harita-yerel-seo",
  "/hizmetler/sosyal-medya-yonetimi",
  "/hizmetler/grafik-tasarim-kurumsal-kimlik",
  "/hizmetler/meta-reklam-yonetimi",
  "/hizmetler/google-ads-reklamlari",
  "/hizmetler/video-reels-ai-produksiyon",
  "/hizmetler/icerik-yazarligi-satis-metni",
  "/hizmetler/seo-organik-gorunurluk",
  "/hizmetler/e-ticaret-satis-sistemleri",
  "/hizmetler/crm-whatsapp-takip",
  "/hizmetler/rakip-pazar-analizi",
  "/hizmetler/aylik-buyume-danismanligi",
  "/kvkk-aydinlatma-metni",
  "/gizlilik-politikasi",
  "/cerez-politikasi",
  "/mesafeli-hizmet-sozlesmesi",
];

function cleanText(text) {
  if (!text) return "";
  return text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export function parseSeoElements(html) {
  // 1. Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? cleanText(titleMatch[1]) : null;

  // 2. Meta Description
  const descMatch =
    html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const meta_description = descMatch ? cleanText(descMatch[1]) : null;

  // 3. Canonical URL
  const canonMatch =
    html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
    html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  const canonical = canonMatch ? canonMatch[1].trim() : null;

  // 4. Meta Robots
  const robotsMatch =
    html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i) ||
    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']robots["']/i);
  const meta_robots = robotsMatch ? robotsMatch[1].trim() : null;

  // 5. H1 Headings
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  const h1 = h1Matches.map((m) => cleanText(m[1])).filter(Boolean);

  // 6. JSON-LD Schemas
  const schemaMatches = [
    ...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
  ];
  const schema = [];
  for (const match of schemaMatches) {
    try {
      schema.push(JSON.parse(match[1]));
    } catch {
      // JSON parse hatası durumunda ham metni koru
      schema.push({ raw: match[1].trim() });
    }
  }

  // 7. Open Graph Tags
  const open_graph = {};
  const ogMatches = [...html.matchAll(/<meta[^>]*property=["']og:([^"']+)["'][^>]*content=["']([^"']*)["']/gi)];
  for (const m of ogMatches) {
    open_graph[m[1]] = m[2];
  }

  // 8. Hashes
  const schema_hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(schema))
    .digest("hex");
  const html_hash = crypto.createHash("sha256").update(html).digest("hex");

  return {
    title,
    meta_description,
    canonical,
    meta_robots,
    h1,
    schema,
    schema_hash,
    open_graph,
    html_hash,
  };
}

async function getHtmlForRoute(route) {
  // Önce çalışan yerel sunucuya bak (port 3001)
  try {
    const res = await fetch(`http://localhost:3001${route}`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      return await res.text();
    }
  } catch {
    // Yerel sunucu yanıt vermediyse derleme dosyalarına (.next/server/app) başvur
  }

  // .next/server/app static html fallback
  const cleanRoute = route === "/" ? "index" : route.replace(/^\//, "");
  const filePath1 = path.join(rootDir, ".next", "server", "app", `${cleanRoute}.html`);
  const filePath2 = path.join(rootDir, ".next", "server", "app", cleanRoute, "index.html");

  if (fs.existsSync(filePath1)) {
    return fs.readFileSync(filePath1, "utf-8");
  }
  if (fs.existsSync(filePath2)) {
    return fs.readFileSync(filePath2, "utf-8");
  }

  throw new Error(`HTML bulunamadı: ${route}. Lütfen 'npm run build' çalıştırın.`);
}

async function captureBaseline() {
  console.log("🚀 [SEO DRIFT] 32 Rota İçin SEO Baseline Snapshot Başlatılıyor...");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const baselineData = {
    capturedAt: new Date().toISOString(),
    routesCount: ROUTES.length,
    routes: {},
  };

  for (const route of ROUTES) {
    try {
      const html = await getHtmlForRoute(route);
      const parsed = parseSeoElements(html);
      baselineData.routes[route] = parsed;
      console.log(`  ✓ ${route.padEnd(45)} | H1: ${parsed.h1.length} | Schema: ${parsed.schema.length} | Title: "${parsed.title?.slice(0, 30)}..."`);
    } catch (err) {
      console.error(`  ✗ ${route}: ${err.message}`);
    }
  }

  fs.writeFileSync(baselineFile, JSON.stringify(baselineData, null, 2), "utf-8");
  console.log(`\n🎉 [BAŞARILI] SEO Drift Baseline kaydedildi: ${baselineFile}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  captureBaseline().catch((err) => {
    console.error("Baseline oluşturma hatası:", err);
    process.exit(1);
  });
}
