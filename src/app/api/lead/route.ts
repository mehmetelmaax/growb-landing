import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { normalizeTurkishPhone, LeadPayloadSchema } from "@/lib/validators";
import { globalInMemoryRateLimiter } from "@/lib/rate-limiter";
import { sendLeadNotifications } from "@/lib/notifications";
import { SITE_CONFIG } from "@/lib/site-config";

// =========================================================================
// UPSTASH REDIS SERVERLESS RATE LIMITER (Vercel Multi-Instance)
// =========================================================================
let upstashRatelimit: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    upstashRatelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"), // IP basina 10 dakikada 5 istek
      analytics: true,
      prefix: "growb:lead:ratelimit",
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

// =========================================================================
// ANA POST HANDLER
// =========================================================================
export async function POST(request: Request) {
  try {
    // Client IP Tespiti
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0]?.trim() || "127.0.0.1"
      : realIp || "127.0.0.1";

    // -----------------------------------------------------------------------
    // A. RATE LIMITING KONTROLU (5 istek / 10 dakika)
    // -----------------------------------------------------------------------
    if (upstashRatelimit) {
      const { success, reset } = await upstashRatelimit.limit(clientIp);
      if (!success) {
        console.warn(`[SECURITY 429] Upstash Rate limit asildi! IP: ${clientIp}`);
        return NextResponse.json(
          {
            success: false,
            error: "Cok fazla istek gonderdiniz. Lutfen 10 dakika sonra tekrar deneyin.",
          },
          {
            status: 429,
            headers: {
              "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
            },
          }
        );
      }
    } else {
      const { allowed } = globalInMemoryRateLimiter.check(clientIp);
      if (!allowed) {
        console.warn(`[SECURITY 429] In-Memory Rate limit asildi! IP: ${clientIp}`);
        return NextResponse.json(
          {
            success: false,
            error: "Cok fazla istek gonderdiniz. Lutfen 10 dakika sonra tekrar deneyin.",
          },
          {
            status: 429,
            headers: { "Retry-After": "600" },
          }
        );
      }
    }

    // -----------------------------------------------------------------------
    // B. JSON PAYLOAD AYRISTIRMA & ZOD DOGRULAMA
    // -----------------------------------------------------------------------
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Gecersiz JSON verisi." }, { status: 400 });
    }

    const parseResult = LeadPayloadSchema.safeParse(rawBody);
    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Gecersiz form verisi.";
      return NextResponse.json(
        { success: false, error: firstError, details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // -----------------------------------------------------------------------
    // C. HONEYPOT BOT KONTROLU (Gizli Website input'u doluysa sessizce 200 don)
    // -----------------------------------------------------------------------
    if (data.website && data.website.trim().length > 0) {
      console.warn(
        `[HONEYPOT BLOCKED] Bot tespit edildi! IP: ${clientIp}, Payload: ${data.website}`
      );
      return NextResponse.json(
        { success: true, message: "Talebiniz basariyla alindi." },
        { status: 200 }
      );
    }

    // -----------------------------------------------------------------------
    // D. TELEFON NUMARASI NORMALIZASYONU & KATI FORMAT DENETIMI
    // -----------------------------------------------------------------------
    const normalizedPhone = normalizeTurkishPhone(data.phone);
    if (!normalizedPhone) {
      return NextResponse.json(
        {
          success: false,
          error: `Lutfen gecerli bir Turkiye cep telefonu numarasi giriniz (Orn: ${SITE_CONFIG.phone}).`,
        },
        { status: 400 }
      );
    }

    // -----------------------------------------------------------------------
    // E. ÇİFT SUBMIT / IDEMPOTENCY DEDUP KONTROLÜ
    // -----------------------------------------------------------------------
    const dedupKey = data.idempotencyKey || `${clientIp}:${normalizedPhone}:${data.type}`;
    if (isDuplicateSubmission(dedupKey)) {
      console.warn(`[IDEMPOTENCY DEDUP] Çift gönderim engellendi: ${dedupKey}`);
      return NextResponse.json(
        {
          success: true,
          message: "Talebiniz ekibimize ulaştı. En kısa sürede sizinle iletişime geçeceğiz.",
          deduplicated: true,
        },
        { status: 200 }
      );
    }

    // -----------------------------------------------------------------------
    // E. BILDIRIM GÖNDERIMI (Telegram + Resend Yedek + Güvenli Konsol Kaydı)
    // -----------------------------------------------------------------------
    console.info(`[LEAD RECEIVED - ${data.type}]`, {
      name: data.name,
      phone: normalizedPhone,
      sector: data.sector,
      service: data.service,
      source: data.source,
      ip: clientIp,
    });

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      await sendLeadNotifications({
        data,
        normalizedPhone,
        clientIp,
      }).catch((err) => {
        console.error("[NOTIFICATION DISPATCH ERROR]", err);
      });
    } else {
      console.warn(
        "[LEAD SAVED] TELEGRAM_BOT_TOKEN veya TELEGRAM_CHAT_ID henüz tanımlı değil. Talep başarıyla kaydedildi."
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
      { success: false, error: "Beklenmeyen bir sunucu hatasi meydana geldi." },
      { status: 500 }
    );
  }
}
