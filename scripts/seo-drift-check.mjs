import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseSeoElements } from "./seo-drift-baseline.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const baselineFile = path.join(dataDir, "seo-baseline.json");

function stringSimilarity(s1, s2) {
  if (!s1 || !s2) return 0;
  if (s1 === s2) return 1;
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  if (longer.length === 0) return 1.0;
  // Basit overlap oranı
  let common = 0;
  for (let i = 0; i < shorter.length; i++) {
    if (longer.includes(shorter[i])) common++;
  }
  return common / longer.length;
}

async function getHtmlForRoute(route) {
  try {
    const res = await fetch(`http://localhost:3001${route}`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      return { html: await res.text(), status: res.status };
    }
    return { html: "", status: res.status };
  } catch {
    // Sunucu kapalıysa yerel .next derleme çıktılarına başvur
  }

  const cleanRoute = route === "/" ? "index" : route.replace(/^\//, "");
  const filePath1 = path.join(rootDir, ".next", "server", "app", `${cleanRoute}.html`);
  const filePath2 = path.join(rootDir, ".next", "server", "app", cleanRoute, "index.html");

  if (fs.existsSync(filePath1)) {
    return { html: fs.readFileSync(filePath1, "utf-8"), status: 200 };
  }
  if (fs.existsSync(filePath2)) {
    return { html: fs.readFileSync(filePath2, "utf-8"), status: 200 };
  }

  return { html: "", status: 404 };
}

async function checkDrift() {
  console.log("🔍 [SEO DRIFT CHECK] SEO Regresyon & Drift Analizi Başlatılıyor...\n");

  if (!fs.existsSync(baselineFile)) {
    console.error(`❌ [HATA] Baseline dosyası bulunamadı: ${baselineFile}`);
    console.error("Lütfen önce 'npm run seo:baseline' komutunu çalıştırın.");
    process.exit(1);
  }

  const baseline = JSON.parse(fs.readFileSync(baselineFile, "utf-8"));
  const criticalFindings = [];
  const warningFindings = [];
  const infoFindings = [];

  const routes = Object.keys(baseline.routes);

  for (const route of routes) {
    const base = baseline.routes[route];
    const { html, status } = await getHtmlForRoute(route);

    // Rule 8: HTTP Status Code Changed to Error
    if (status >= 400) {
      criticalFindings.push({
        route,
        rule: "Rule 8: HTTP Status Error",
        msg: `Sayfa HTTP ${status} döndürdü (Baseline: 200 OK).`,
        severity: "CRITICAL",
      });
      continue;
    }

    const current = parseSeoElements(html);

    // Rule 1: Schema/JSON-LD Completely Removed
    if (base.schema && base.schema.length > 0 && current.schema.length === 0) {
      criticalFindings.push({
        route,
        rule: "Rule 1: Schema Removed",
        msg: `Baseline'da ${base.schema.length} adet Schema varken mevcut sayfada 0 adet bulundu.`,
        severity: "CRITICAL",
      });
    }

    // Rule 2: Canonical URL Changed
    if (base.canonical && current.canonical && base.canonical !== current.canonical) {
      criticalFindings.push({
        route,
        rule: "Rule 2: Canonical Changed",
        msg: `Canonical URL değişti: '${base.canonical}' -> '${current.canonical}'`,
        severity: "CRITICAL",
      });
    }

    // Rule 3: Canonical URL Removed
    if (base.canonical && !current.canonical) {
      criticalFindings.push({
        route,
        rule: "Rule 3: Canonical Removed",
        msg: `Önceki canonical URL (${base.canonical}) kaldırılmış.`,
        severity: "CRITICAL",
      });
    }

    // Rule 4: Noindex Directive Added
    const baseHasNoindex = base.meta_robots?.toLowerCase().includes("noindex");
    const currHasNoindex = current.meta_robots?.toLowerCase().includes("noindex");
    if (!baseHasNoindex && currHasNoindex) {
      criticalFindings.push({
        route,
        rule: "Rule 4: Noindex Added",
        msg: "Sayfaya arama motoru dizininden çıkaran 'noindex' direktifi eklendi!",
        severity: "CRITICAL",
      });
    }

    // Rule 5: H1 Tag Removed Entirely
    if (base.h1 && base.h1.length > 0 && current.h1.length === 0) {
      criticalFindings.push({
        route,
        rule: "Rule 5: H1 Tag Removed",
        msg: "Ana başlık (H1) etiketi tamamen kaldırılmış.",
        severity: "CRITICAL",
      });
    }

    // Rule 6: H1 Text Changed Significantly
    if (base.h1?.[0] && current.h1?.[0]) {
      const sim = stringSimilarity(base.h1[0], current.h1[0]);
      if (sim < 0.5) {
        criticalFindings.push({
          route,
          rule: "Rule 6: H1 Text Changed Significantly",
          msg: `H1 benzerliği %${Math.round(sim * 100)} seviyesine düştü: '${base.h1[0]}' -> '${current.h1[0]}'`,
          severity: "CRITICAL",
        });
      }
    }

    // Rule 7: Title Tag Removed Entirely
    if (base.title && !current.title) {
      criticalFindings.push({
        route,
        rule: "Rule 7: Title Tag Removed",
        msg: "Title etiketi kaldırılmış veya boş.",
        severity: "CRITICAL",
      });
    }

    // Rule 9: Title Text Changed (WARNING)
    if (base.title && current.title && base.title !== current.title) {
      warningFindings.push({
        route,
        rule: "Rule 9: Title Text Changed",
        msg: `Title değişti:\n    Önceki: "${base.title}"\n    Şimdiki: "${current.title}"`,
        severity: "WARNING",
      });
    }

    // Rule 10: Meta Description Changed (WARNING)
    if (base.meta_description && current.meta_description && base.meta_description !== current.meta_description) {
      warningFindings.push({
        route,
        rule: "Rule 10: Meta Description Changed",
        msg: `Meta description değişti.`,
        severity: "WARNING",
      });
    }

    // Rule 13: OG Tags Removed (WARNING)
    const baseOgKeys = Object.keys(base.open_graph || {});
    const currOgKeys = Object.keys(current.open_graph || {});
    if (baseOgKeys.length > 0 && currOgKeys.length === 0) {
      warningFindings.push({
        route,
        rule: "Rule 13: OG Tags Removed",
        msg: "Open Graph sosyal medya etiketleri kaldırılmış.",
        severity: "WARNING",
      });
    }

    // Rule 14: Schema Content Modified (WARNING)
    if (base.schema_hash && current.schema_hash && base.schema_hash !== current.schema_hash && current.schema.length > 0) {
      infoFindings.push({
        route,
        rule: "Rule 14: Schema Modified",
        msg: "Schema JSON-LD içeriğinde güncelleme tespit edildi.",
        severity: "INFO",
      });
    }
  }

  // RAPOR
  console.log("════════════════════════════════════════════════════════════════");
  console.log(`📊 [SEO DRIFT SONUÇLARI] Toplam Taranan Rota: ${routes.length}`);
  console.log(`   🚨 Kritik Bulgular (CRITICAL): ${criticalFindings.length}`);
  console.log(`   ⚠️ Uyarılar (WARNING):        ${warningFindings.length}`);
  console.log(`   ℹ️ Bilgilendirmeler (INFO):   ${infoFindings.length}`);
  console.log("════════════════════════════════════════════════════════════════\n");

  if (criticalFindings.length > 0) {
    console.error("🚨 [KRİTİK REGRESYONLAR TESPİT EDİLDİ - DERLEME DURDURULUYOR]:");
    for (const f of criticalFindings) {
      console.error(`  [${f.severity}] ${f.route} -> ${f.rule}: ${f.msg}`);
    }
    process.exit(1);
  }

  if (warningFindings.length > 0) {
    console.warn("⚠️ [DİKKAT - SEO UYARILARI]:");
    for (const f of warningFindings) {
      console.warn(`  [${f.severity}] ${f.route} -> ${f.rule}: ${f.msg}`);
    }
  }

  console.log("✅ [MÜKEMMEL] Hiçbir kritik SEO drift veya regresyon tespit edilmedi! Tüm rotalar baseline ile uyumlu.");
}

checkDrift().catch((err) => {
  console.error("Drift check hatası:", err);
  process.exit(1);
});
