export const maxDuration = 60;

import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { normalizeUrl } from "@/lib/validators";
import { pagespeedInMemoryRateLimiter } from "@/lib/rate-limiter";

interface PageSpeedData {
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

let redisClient: Redis | null = null;
let upstashRatelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    upstashRatelimit = new Ratelimit({
      redis: redisClient,
      limiter: Ratelimit.slidingWindow(3, "10 m"),
      analytics: true,
      prefix: "growb:pagespeed:ratelimit",
    });
  } catch (err) {
    console.error("[PAGESPEED] Upstash init error:", err);
  }
}

const memoryCache = new Map<string, { timestamp: number; data: PageSpeedData }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const clientIp =
      forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "127.0.0.1";

    if (upstashRatelimit) {
      const { success, reset } = await upstashRatelimit.limit(clientIp);
      if (!success) {
        return NextResponse.json(
          {
            success: false,
            error: "Çok fazla analiz isteği gönderdiniz. Lütfen 10 dakika sonra tekrar deneyin.",
          },
          {
            status: 429,
            headers: { "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString() },
          }
        );
      }
    } else {
      const { allowed } = pagespeedInMemoryRateLimiter.check(clientIp);
      if (!allowed) {
        return NextResponse.json(
          {
            success: false,
            error: "Çok fazla analiz isteği gönderdiniz. Lütfen 10 dakika sonra tekrar deneyin.",
          },
          { status: 429, headers: { "Retry-After": "600" } }
        );
      }
    }

    let body: { url?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Geçersiz JSON verisi." }, { status: 400 });
    }

    const rawUrl = body.url?.trim();
    if (!rawUrl) {
      return NextResponse.json(
        { success: false, error: "Lütfen taranacak bir web sitesi adresi girin." },
        { status: 400 }
      );
    }

    if (/localhost|127\.0\.0\.1|0\.0\.0\.0|::1|\.local\b|\.test\b|\.internal\b/i.test(rawUrl)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google PageSpeed bulut servisi yerel (localhost / 127.0.0.1) adresleri tarayamaz. Lütfen internete açık gerçek bir web sitesi adresi giriniz (Örn: growbdijital.com).",
          canConsult: true,
        },
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

    if (redisClient) {
      try {
        const cachedRaw = await redisClient.get<PageSpeedData | string>(
          `growb:pagespeed:cache:${cacheKey}`
        );
        if (cachedRaw) {
          const cachedData: PageSpeedData =
            typeof cachedRaw === "string" ? JSON.parse(cachedRaw) : cachedRaw;
          return NextResponse.json({ success: true, data: cachedData, ...cachedData });
        }
      } catch (err) {
        console.warn("[PAGESPEED] Redis get cache error:", err);
      }
    }

    const cached = memoryCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({
        success: true,
        data: { ...cached.data, cachedAt: new Date(cached.timestamp).toLocaleDateString("tr-TR") },
        ...cached.data,
      });
    }

    const apiKey = process.env.PAGESPEED_API_KEY?.trim() || "";
    const keyParam = apiKey ? `&key=${encodeURIComponent(apiKey)}` : "";
    const apiUrl =
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}` +
      `&strategy=mobile&category=performance&category=seo&category=best-practices${keyParam}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    let psiRes: Response;
    try {
      psiRes = await fetch(apiUrl, {
        headers: { Accept: "application/json" },
        signal: controller.signal,
        next: { revalidate: 86400 },
      });
    } catch (err) {
      clearTimeout(timeoutId);
      return NextResponse.json(
        {
          success: false,
          error:
            "Google PageSpeed sunucularına bağlanılamadı. Web siteniz güvenlik duvarı arkasında olabilir.",
          canConsult: true,
        },
        { status: 504 }
      );
    }
    clearTimeout(timeoutId);

    if (!psiRes.ok) {
      const errorText = await psiRes.text();
      const isQuota =
        psiRes.status === 429 || errorText.includes("quota") || errorText.includes("RATE_LIMIT");
      return NextResponse.json(
        {
          success: false,
          error: isQuota
            ? "Google PageSpeed analiz servisi genel kotasına ulaşıldı. 15 dakikalık ücretsiz manuel analiz talep edebilirsiniz."
            : "Google analiz motoru bu alan adını tarayamadı. Adres genel erişime açık olmayabilir.",
          canConsult: true,
        },
        { status: psiRes.status === 429 ? 429 : 502 }
      );
    }

    const psiData = await psiRes.json();
    const lighthouse = psiData.lighthouseResult;
    if (!lighthouse?.categories) {
      return NextResponse.json(
        { success: false, error: "Google Lighthouse sonuçları ayrıştırılamadı.", canConsult: true },
        { status: 500 }
      );
    }

    const perfCat = lighthouse.categories.performance;
    const seoCat = lighthouse.categories.seo;
    const bpCat = lighthouse.categories["best-practices"];
    const audits = lighthouse.audits || {};

    const performanceScore = Math.round((perfCat?.score ?? 0) * 100);
    const seoScore = Math.round((seoCat?.score ?? 0) * 100);
    const bestPracticesScore = Math.round((bpCat?.score ?? 0) * 100);

    const lcp = audits["largest-contentful-paint"]?.displayValue || "N/A";
    const cls = audits["cumulative-layout-shift"]?.displayValue || "0";
    const fcp = audits["first-contentful-paint"]?.displayValue || "N/A";

    const auditKeys = [
      "render-blocking-resources",
      "unused-javascript",
      "modern-image-formats",
      "offscreen-images",
      "unminified-css",
    ];
    const criticalIssues = auditKeys
      .map((k) => audits[k])
      .filter((item) => item && item.score !== null && item.score < 0.9)
      .map((item) => (item.displayValue ? `${item.title} (${item.displayValue})` : item.title));

    const responseData: PageSpeedData = {
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

    memoryCache.set(cacheKey, { timestamp: Date.now(), data: responseData });
    if (redisClient) {
      redisClient
        .set(`growb:pagespeed:cache:${cacheKey}`, JSON.stringify(responseData), { ex: 86400 })
        .catch(() => {});
    }

    return NextResponse.json({ success: true, data: responseData, ...responseData });
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
