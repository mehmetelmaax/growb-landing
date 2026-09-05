import { NextResponse } from "next/server";
import { normalizeUrl } from "@/lib/validators";

interface CacheEntry {
  timestamp: number;
  data: AuditResult;
}

interface AuditResult {
  url: string;
  speedScore: number;
  seoScore: number;
  speedSeconds: string;
  fcp: string;
  lcp: string;
  cls: string;
  tbt: string;
  criticalIssues: string[];
  isRealData: boolean;
  cachedAt?: string;
}

const auditCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 Saat

export async function POST(request: Request) {
  try {
    let body: { url?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Geçersiz JSON verisi." }, { status: 400 });
    }

    const rawUrl = body.url;
    if (!rawUrl || typeof rawUrl !== "string") {
      return NextResponse.json(
        { success: false, error: "Lütfen taranacak bir web sitesi adresi girin." },
        { status: 400 }
      );
    }

    const targetUrl = normalizeUrl(rawUrl);
    if (!targetUrl) {
      return NextResponse.json(
        { success: false, error: "Geçersiz web sitesi adresi. (Örn: www.firmaniz.com)" },
        { status: 400 }
      );
    }

    const cacheKey = new URL(targetUrl).hostname.toLowerCase();

    // 1. Önbellek Denetimi (24 saat)
    const cached = auditCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({
        success: true,
        data: {
          ...cached.data,
          cachedAt: new Date(cached.timestamp).toLocaleDateString("tr-TR"),
        },
      });
    }

    // 2. Google PageSpeed Insights v5 API Çağrısı (Mobil Stratejisi)
    const apiKey = process.env.PAGESPEED_API_KEY || "";
    const keyParam = apiKey ? "&key=" + encodeURIComponent(apiKey) : "";
    const apiEndpoint =
      "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=" +
      encodeURIComponent(targetUrl) +
      "&strategy=mobile&category=performance&category=seo" +
      keyParam;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 18000); // 18s timeout

    let psiRes: Response;
    try {
      psiRes = await fetch(apiEndpoint, {
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      console.warn("[AUDIT API] PageSpeed fetch timeout veya bağlantı hatası:", err);
      return NextResponse.json(
        {
          success: false,
          error:
            "Google PageSpeed sunucularına bağlanılamadı. Web siteniz güvenlik duvarı (Cloudflare vb.) arkasında olabilir veya adres genel erişime açık değil.",
          canConsult: true,
        },
        { status: 504 }
      );
    }
    clearTimeout(timeoutId);

    if (!psiRes.ok) {
      const errorText = await psiRes.text();
      console.warn("[AUDIT API] Google PageSpeed API HTTP " + psiRes.status + ":", errorText);
      const isQuota =
        psiRes.status === 429 || errorText.includes("quota") || errorText.includes("RATE_LIMIT");
      return NextResponse.json(
        {
          success: false,
          error: isQuota
            ? "Google PageSpeed analiz servisi genel kotasına ulaşıldı. Web siteniz için 15 dakikalık ücretsiz manuel büyüme analizi talep edebilirsiniz."
            : "Google analiz motoru bu alan adını tarayamadı. Web siteniz güvenlik duvarı (Cloudflare vb.) arkasında olabilir veya adres genel erişime açık değil.",
          canConsult: true,
        },
        { status: psiRes.status === 429 ? 429 : 502 }
      );
    }

    const psiData = await psiRes.json();
    const lighthouse = psiData.lighthouseResult;

    if (!lighthouse || !lighthouse.categories) {
      return NextResponse.json(
        {
          success: false,
          error: "Google Lighthouse sonuçları ayrıştırılamadı.",
          canConsult: true,
        },
        { status: 500 }
      );
    }

    const perfCategory = lighthouse.categories.performance;
    const seoCategory = lighthouse.categories.seo;
    const audits = lighthouse.audits || {};

    const speedScore = Math.round((perfCategory?.score || 0) * 100);
    const seoScore = Math.round((seoCategory?.score || 0) * 100);

    const fcp = audits["first-contentful-paint"]?.displayValue || "N/A";
    const lcp = audits["largest-contentful-paint"]?.displayValue || "N/A";
    const cls = audits["cumulative-layout-shift"]?.displayValue || "0";
    const tbt = audits["total-blocking-time"]?.displayValue || "0 ms";
    const speedSeconds = lcp !== "N/A" ? lcp : fcp;

    // Gerçek Lighthouse Tespitlerini Topla
    const issues: string[] = [];
    const checkAudit = (key: string, customPrefix?: string) => {
      const audit = audits[key];
      if (audit && (audit.score === null || audit.score < 0.9)) {
        const title = customPrefix ? customPrefix + ": " + audit.title : audit.title;
        if (audit.displayValue) {
          issues.push(title + " (" + audit.displayValue + ")");
        } else {
          issues.push(title);
        }
      }
    };

    checkAudit("render-blocking-resources", "Oluşturmayı Engelleyen Kaynaklar");
    checkAudit("unused-javascript", "Kullanılmayan JavaScript");
    checkAudit("modern-image-formats", "Eski Görsel Formatları");
    checkAudit("offscreen-images", "Ekran Dışı Görseller");
    checkAudit("unminified-javascript", "Küçültülmemiş Kod");
    checkAudit("uses-optimized-images", "Optimize Edilmemiş Görseller");

    if (issues.length === 0) {
      if (speedScore < 60) {
        issues.push("Mobil cihazlarda yüksek sayfa ağırlığı ve render gecikmesi tespit edildi.");
      }
      issues.push("Tek tıkla doğrudan arama ve WhatsApp satış yönlendirmeleri yetersiz.");
    }

    const result: AuditResult = {
      url: targetUrl,
      speedScore,
      seoScore,
      speedSeconds,
      fcp,
      lcp,
      cls,
      tbt,
      criticalIssues: issues.slice(0, 5),
      isRealData: true,
    };

    // 24 saat önbelleğe al
    auditCache.set(cacheKey, { timestamp: Date.now(), data: result });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: unknown) {
    console.error("[AUDIT API CRITICAL ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        error: "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin veya doğrudan bize ulaşın.",
        canConsult: true,
      },
      { status: 500 }
    );
  }
}
