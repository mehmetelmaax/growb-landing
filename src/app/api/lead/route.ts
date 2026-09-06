import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { normalizeTurkishPhone, LeadPayloadSchema } from "@/lib/validators";
import { globalInMemoryRateLimiter, invalidRequestsRateLimiter } from "@/lib/rate-limiter";
import { sendLeadNotifications } from "@/lib/notifications";
import { SITE_CONFIG } from "@/lib/site-config";

// =========================================================================
// UPSTASH REDIS SERVERLESS RATE LIMITER (Vercel Multi-Instance)
// =========================================================================
let upstashRatelimit: Ratelimit | null = null;
let upstashInvalidRatelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    upstashRatelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"), // IP başına 10 dakikada 5 geçerli lead
      analytics: true,
      prefix: "growb:lead:ratelimit",
    });
    upstashInvalidRatelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, "10 m"), // IP başına 10 dakikada 30 hatalı istek
      prefix: "growb:lead:invalid:ratelimit",
    });
  } catch (err) {
    console.error("[SECURITY] Upstash Redis baslatilamadi, in-memory fallback devrede:", err);
  }
}

// =========================================================================
// IDEMPOTENCY / ÇİFT SUBMIT ENGELLEME CACHE (60 saniye)
// =========================================================================
const idempotencyCache = new Map<string, number>();

function isDuplicateSubmission(key: string): boolean {
  const now = Date.now();
  for (const [k, timestamp] of idempotencyCache.entries()) {
    if (now - timestamp > 60_000) {
      idempotencyCache.delete(k);
    }
  }
  if (idempotencyCache.has(key)) {
    return true;
  }
  idempotencyCache.set(key, now);
  return false;
}

async function checkInvalidRateLimit(ip: string): Promise<NextResponse | null> {
  if (upstashInvalidRatelimit) {
    const { success, reset } = await upstashInvalidRatelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: "Çok fazla hatalı istek gönderdiniz. Lütfen 10 dakika sonra tekrar deneyin.",
        },
        {
          status: 429,
          headers: { "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString() },
        }
      );
    }
  } else {
    const { allowed } = invalidRequestsRateLimiter.check(ip);
    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Çok fazla hatalı istek gönderdiniz. Lütfen 10 dakika sonra tekrar deneyin.",
        },
        { status: 429, headers: { "Retry-After": "600" } }
      );
    }
  }
  return null;
}

// =========================================================================
// ANA POST HANDLER
// =========================================================================
export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0]?.trim() || "127.0.0.1"
      : realIp || "127.0.0.1";

    // 1. JSON Parse
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      const rl = await checkInvalidRateLimit(clientIp);
      if (rl) return rl;
      return NextResponse.json({ success: false, error: "Geçersiz JSON verisi." }, { status: 400 });
    }

    // 2. Zod Şema Doğrulaması (Details olmadan sadece tek satır Türkçe mesaj)
    const parseResult = LeadPayloadSchema.safeParse(rawBody);
    if (!parseResult.success) {
      const rl = await checkInvalidRateLimit(clientIp);
      if (rl) return rl;
      const firstError = parseResult.error.issues[0]?.message || "Geçersiz form verisi.";
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }

    const data = parseResult.data;

    // 3. Honeypot Bot Yakalama (Gizli Website alanı)
    if (data.website && data.website.trim().length > 0) {
      console.warn(`[HONEYPOT BLOCKED] Bot tespit edildi! IP: ${clientIp}`);
      return NextResponse.json(
        { success: true, message: "Talebiniz başarıyla alındı." },
        { status: 200 }
      );
    }

    // 4. Telefon Normalizasyonu & Format Denetimi
    const normalizedPhone = normalizeTurkishPhone(data.phone);
    if (!normalizedPhone) {
      const rl = await checkInvalidRateLimit(clientIp);
      if (rl) return rl;
      return NextResponse.json(
        {
          success: false,
          error: `Lütfen geçerli bir Türkiye cep telefonu numarası giriniz (Örn: ${SITE_CONFIG.phone}).`,
        },
        { status: 400 }
      );
    }

    // 5. GEÇERLİ İSTEK RATE LIMITING (Sadece doğrulamadan geçen istekler sayılır: 5/10dk)
    if (upstashRatelimit) {
      const { success, reset } = await upstashRatelimit.limit(clientIp);
      if (!success) {
        return NextResponse.json(
          {
            success: false,
            error: "Çok fazla istek gönderdiniz. Lütfen 10 dakika sonra tekrar deneyin.",
          },
          {
            status: 429,
            headers: { "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString() },
          }
        );
      }
    } else {
      const { allowed } = globalInMemoryRateLimiter.check(clientIp);
      if (!allowed) {
        return NextResponse.json(
          {
            success: false,
            error: "Çok fazla istek gönderdiniz. Lütfen 10 dakika sonra tekrar deneyin.",
          },
          { status: 429, headers: { "Retry-After": "600" } }
        );
      }
    }

    // 6. Çift Submit / Idempotency Dedup
    const dedupKey = data.idempotencyKey || `${clientIp}:${normalizedPhone}:${data.type}`;
    if (isDuplicateSubmission(dedupKey)) {
      return NextResponse.json(
        {
          success: true,
          message: "Talebiniz ekibimize ulaştı. En kısa sürede sizinle iletişime geçeceğiz.",
          deduplicated: true,
        },
        { status: 200 }
      );
    }

    // 7. Bildirim Doğrulama (Telegram ve/veya Resend Zorunlu Kontrolü)
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const resendApiKey = process.env.RESEND_API_KEY;
    const waFallbackUrl = SITE_CONFIG.getWhatsappUrl(
      "Merhaba GrowB Dijital, web sitesi üzerinden randevu/teklif talebinde bulunmak istiyorum."
    );

    if ((!botToken || !chatId) && !resendApiKey) {
      console.error("[SECURITY 500] Hiçbir bildirim kanalı (Telegram / Resend) yapılandırılmamış!");
      return NextResponse.json(
        {
          success: false,
          error:
            "Şu an talebinizi sistem üzerinden alamıyoruz, lütfen doğrudan WhatsApp üzerinden bize ulaşın.",
          whatsappUrl: waFallbackUrl,
        },
        { status: 500 }
      );
    }

    const { tgSuccess, emailSent } = await sendLeadNotifications({
      data,
      normalizedPhone,
      clientIp,
    });

    if (!tgSuccess && !emailSent) {
      console.error("[SECURITY 500] Hem Telegram hem Resend bildirim kanalı başarısız oldu!");
      return NextResponse.json(
        {
          success: false,
          error:
            "Bildirim kanallarında geçici bir aksaklık oluştu, lütfen doğrudan WhatsApp üzerinden bize ulaşın.",
          whatsappUrl: waFallbackUrl,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Talebiniz ekibimize ulaştı. En kısa sürede sizinle iletişime geçeceğiz.",
      },
      { status: 200 }
    );
  } catch (globalErr: unknown) {
    console.error("[LEAD API FATAL ERROR]", globalErr);
    return NextResponse.json(
      { success: false, error: "Beklenmeyen bir sunucu hatası meydana geldi." },
      { status: 500 }
    );
  }
}
