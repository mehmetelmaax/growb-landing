export const maxDuration = 60;

import { NextResponse } from "next/server";

interface CacheEntry {
  timestamp: number;
  data: PageSpeedResponseData;
}

interface PageSpeedResponseData {
  url: string;
  performanceScore: number;
  seoScore: number;
  bestPracticesScore: number;
  lcp: string;
  cls: string;
  fcp: string;
  speedScore: number;
  criticalIssues: string[];
  cachedAt?: string;
}

const memoryCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

export async function POST(request: Request) {
  try {
    let body: { url?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Geçersiz JSON verisi." }, { status: 400 });
    }

    let rawUrl = body.url?.trim();
    if (!rawUrl) {
      return NextResponse.json(
        { success: false, error: "Lütfen taranacak bir web sitesi adresi girin." },
        { status: 400 }
      );
    }

    if (!/^https?:\/\//i.test(rawUrl)) {
      rawUrl = `https://${rawUrl}`;
    }

    let targetUrlObj: URL;
    try {
      targetUrlObj = new URL(rawUrl);
    } catch {
      return NextResponse.json(
        { success: false, error: "Geçersiz web sitesi adresi. (Örn: www.firmaniz.com)" },
        { status: 400 }
      );
    }

    const targetUrl = targetUrlObj.toString();
    const cacheKey = targetUrlObj.hostname.toLowerCase();

    const cached = memoryCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({
        success: true,
        data: {
          ...cached.data,
          cachedAt: new Date(cached.timestamp).toLocaleDateString("tr-TR"),
        },
        url: cached.data.url,
        performanceScore: cached.data.performanceScore,
        seoScore: cached.data.seoScore,
        bestPracticesScore: cached.data.bestPracticesScore,
        lcp: cached.data.lcp,
        cls: cached.data.cls,
        fcp: cached.data.fcp,
      });
    }

    const apiKey = process.env.PAGESPEED_API_KEY?.trim() || "";
    const keyParam = apiKey ? `&key=${encodeURIComponent(apiKey)}` : "";
    const apiUrl =
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}` +
      `&strategy=mobile` +
      `&category=performance&category=seo&category=best-practices` +
      keyParam;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    let psiRes: Response;
    try {
      psiRes = await fetch(apiUrl, {
        headers: { Accept: "application/json" },
        signal: controller.signal,
        next: { revalidate: 86400 },
      });
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      console.warn("[PAGESPEED API] Fetch timeout veya bağlantı hatası:", err);
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
      console.warn(`[PAGESPEED API] Google API HTTP ${psiRes.status}:`, errorText);
      const isQuota =
        psiRes.status === 429 || errorText.includes("quota") || errorText.includes("RATE_LIMIT");
      return NextResponse.json(
        {
          success: false,
          error: isQuota
            ? "Google PageSpeed analiz servisi genel kotasına ulaşıldı. Web siteniz için 15 dakikalık ücretsiz manuel analiz talep edebilirsiniz."
            : "Google analiz motoru bu alan adını tarayamadı. Web siteniz güvenlik duvarı arkasında olabilir veya adres genel erişime açık değil.",
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
    const bestPracticesCategory = lighthouse.categories["best-practices"];
    const audits = lighthouse.audits || {};

    const performanceScore = Math.round((perfCategory?.score ?? 0) * 100);
    const seoScore = Math.round((seoCategory?.score ?? 0) * 100);
    const bestPracticesScore = Math.round((bestPracticesCategory?.score ?? 0) * 100);

    const lcp = audits["largest-contentful-paint"]?.displayValue || "N/A";
    const cls = audits["cumulative-layout-shift"]?.displayValue || "0";
    const fcp = audits["first-contentful-paint"]?.displayValue || "N/A";

    const criticalIssues: string[] = [];
    const auditKeys = [
      "render-blocking-resources",
      "unused-javascript",
      "modern-image-formats",
      "offscreen-images",
      "unminified-css",
    ];
    for (const key of auditKeys) {
      const item = audits[key];
      if (item && item.score !== null && item.score < 0.9) {
        criticalIssues.push(
          item.displayValue ? `${item.title} (${item.displayValue})` : item.title
        );
      }
    }

    const responseData: PageSpeedResponseData = {
      url: targetUrl,
      performanceScore,
      seoScore,
      bestPracticesScore,
      speedScore: performanceScore,
      lcp,
      cls,
      fcp,
      criticalIssues,
      cachedAt: new Date().toLocaleDateString("tr-TR"),
    };

    memoryCache.set(cacheKey, {
      timestamp: Date.now(),
      data: responseData,
    });

    return NextResponse.json({
      success: true,
      data: responseData,
      url: targetUrl,
      performanceScore,
      seoScore,
      bestPracticesScore,
      lcp,
      cls,
      fcp,
    });
  } catch (error: unknown) {
    console.error("[PAGESPEED API] Beklenmeyen hata:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Analiz sırasında beklenmeyen bir hata meydana geldi.",
        canConsult: true,
      },
      { status: 500 }
    );
  }
}
