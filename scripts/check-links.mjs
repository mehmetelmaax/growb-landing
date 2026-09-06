import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const appDir = path.join(rootDir, ".next/server/app");

if (!fs.existsSync(appDir)) {
  console.error(
    "❌ [check-links] .next/server/app dizini bulunamadı! Lütfen önce 'npm run build' çalıştırın."
  );
  process.exit(1);
}

function getHtmlFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getHtmlFiles(full));
    } else if (entry.name.endsWith(".html") && !entry.name.startsWith("_not-found")) {
      files.push(full);
    }
  }
  return files;
}

const htmlFiles = getHtmlFiles(appDir);
if (htmlFiles.length === 0) {
  console.error("❌ [check-links] Taranacak HTML dosyası bulunamadı.");
  process.exit(1);
}

// 1. Collect IDs per route
const routeMap = new Map();

for (const file of htmlFiles) {
  let route = path.relative(appDir, file).replace(/\\/g, "/").replace(/\.html$/, "");
  if (route === "index") route = "/";
  else if (!route.startsWith("/")) route = "/" + route;

  const html = fs.readFileSync(file, "utf-8");
  const ids = new Set(["marqueeCirclePath", "circle-path", "top"]);

  const idRegex = /\bid=["']([^"']+)["']/g;
  let idMatch;
  while ((idMatch = idRegex.exec(html)) !== null) {
    ids.add(idMatch[1]);
  }

  routeMap.set(route, { file, html, ids });
}

console.log(`[check-links] Sayfa bazlı link denetimi: ${routeMap.size} rota taranıyor...`);

// 2. Validate links per page
let totalLinksChecked = 0;
let totalBrokenCount = 0;
const brokenByRoute = new Map();

for (const [route, { html, ids }] of routeMap.entries()) {
  const hrefRegex = /\bhref=["']([^"']+)["']/g;
  let hrefMatch;

  while ((hrefMatch = hrefRegex.exec(html)) !== null) {
    const href = hrefMatch[1].trim();

    // Statik dosya ve asset yollarını yoksay
    if (
      !href ||
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:") ||
      href.startsWith("javascript:") ||
      href.startsWith("/_next/") ||
      /\.(ico|png|jpg|jpeg|svg|webp|gif|css|js|map|webmanifest|xml|txt|json)$/i.test(href.split("?")[0])
    ) {
      continue;
    }

    totalLinksChecked++;

    // Durum 1: Aynı sayfa içi hash linki (örn: #iletisim)
    if (href.startsWith("#")) {
      const targetId = href.slice(1);
      if (!ids.has(targetId)) {
        totalBrokenCount++;
        if (!brokenByRoute.has(route)) brokenByRoute.set(route, []);
        brokenByRoute
          .get(route)
          .push({ href, reason: `Sayfa (${route}) içinde id="${targetId}" öğesi bulunamadı` });
      }
    }
    // Durum 2: Ana sayfaya yönlendiren hash linki (örn: /#iletisim)
    else if (href.startsWith("/#")) {
      const targetId = href.slice(2);
      const homePage = routeMap.get("/");
      if (!homePage || !homePage.ids.has(targetId)) {
        totalBrokenCount++;
        if (!brokenByRoute.has(route)) brokenByRoute.set(route, []);
        brokenByRoute
          .get(route)
          .push({ href, reason: `Ana sayfada (/) id="${targetId}" öğesi bulunamadı` });
      }
    }
    // Durum 3: Başka sayfaya giden hash linki (örn: /hizmetler#web-tasarim)
    else if (href.includes("#") && href.startsWith("/")) {
      const [targetRoute, targetHash] = href.split("#");
      const targetPage = routeMap.get(targetRoute) || routeMap.get(targetRoute + "/");
      if (!targetPage) {
        totalBrokenCount++;
        if (!brokenByRoute.has(route)) brokenByRoute.set(route, []);
        brokenByRoute.get(route).push({ href, reason: `Hedef rota (${targetRoute}) mevcut değil` });
      } else if (!targetPage.ids.has(targetHash)) {
        totalBrokenCount++;
        if (!brokenByRoute.has(route)) brokenByRoute.set(route, []);
        brokenByRoute.get(route).push({
          href,
          reason: `Hedef sayfada (${targetRoute}) id="${targetHash}" öğesi bulunamadı`,
        });
      }
    }
    // Durum 4: Düz dahili rota linki (örn: /fiyatlar)
    else if (href.startsWith("/")) {
      const cleanPath = href.split("?")[0].replace(/\/$/, "") || "/";
      if (
        !routeMap.has(cleanPath) &&
        cleanPath !== "/sitemap.xml" &&
        cleanPath !== "/robots.txt" &&
        cleanPath !== "/manifest.webmanifest"
      ) {
        totalBrokenCount++;
        if (!brokenByRoute.has(route)) brokenByRoute.set(route, []);
        brokenByRoute.get(route).push({ href, reason: `Hedef rota (${cleanPath}) mevcut değil` });
      }
    }
  }
}

console.log(`[check-links] Toplam ${totalLinksChecked} dahili link sayfa bazında denetlendi.`);

if (totalBrokenCount > 0) {
  console.error(`\n❌ [check-links] ${totalBrokenCount} ADET KIRIK DAHİLİ LİNK TESPİT EDİLDİ:`);
  for (const [route, issues] of brokenByRoute.entries()) {
    console.error(`\n📌 ROTA: ${route} (${issues.length} kırık link)`);
    for (const issue of issues) {
      console.error(`   - "${issue.href}" -> ${issue.reason}`);
    }
  }
  process.exit(1);
} else {
  console.log(
    `✅ [check-links] Tüm ${routeMap.size} rota ve ${totalLinksChecked} dahili link doğrulandı! 0 kırık link.\n`
  );
  process.exit(0);
}
