import { NextResponse } from "next/server";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { normalizeTurkishPhone, escapeHtml } from "@/lib/validators";

// =========================================================================
// 1. IN-MEMORY RATE LIMIT FALLBACK (Local Dev / Upstash Yoksa)
// =========================================================================
interface RateLimitEntry {
  count: number;
  resetAt: number;
}
const inMemoryRateLimit = new Map<string, RateLimitEntry>();

function checkInMemoryRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 dakika
  const maxRequests = 5;

  const entry = inMemoryRateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    inMemoryRateLimit.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: maxRequests - entry.count };
}

// =========================================================================
// 2. UPSTASH REDIS SERVERLESS RATE LIMITER (Vercel Multi-Instance)
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
// 3. ZOD GIRIS DOGRULAMA SEMASI
// =========================================================================
const LeadPayloadSchema = z.object({
  type: z
    .enum(["PROJE_BASLAT", "DETAY_AL", "ANALIZ", "HIZ_SKORU", "HIZMET_TEKLIF"])
    .default("PROJE_BASLAT"),
  name: z
    .string()
    .trim()
    .max(80, "Isim en fazla 80 karakter olabilir.")
    .optional()
    .nullable(),
  phone: z.string().min(1, "Telefon numarasi zorunludur."),
  service: z.string().trim().max(100).optional().nullable(),
  siteUrl: z.string().trim().max(250).optional().nullable(),
  sector: z.string().trim().max(80).optional().nullable(),
  source: z.string().trim().max(120).default("Web Sitesi"),
  notes: z.string().trim().max(1000).optional().nullable(),
  // Honeypot Alani (Bot yakalama)
  website: z.string().optional().nullable(),
  // KVKK Acik Riza Onayi
  kvkkConsent: z.boolean().optional(),
});

// =========================================================================
// 4. ANA POST HANDLER (App Router sadece HTTP handler export etmeli)
// =========================================================================
export async function POST(request: Request) {
  try {
    // Client IP Tespiti
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";

    // -----------------------------------------------------------------------
    // A. RATE LIMITING KONTROLU (5 istek / 10 dakika)
    // -----------------------------------------------------------------------
    if (upstashRatelimit) {
      const { success, remaining, reset } = await upstashRatelimit.limit(clientIp);
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
      const { allowed } = checkInMemoryRateLimit(clientIp);
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
      return NextResponse.json(
        { success: false, error: "Gecersiz JSON verisi." },
        { status: 400 }
      );
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
      console.warn(`[HONEYPOT BLOCKED] Bot tespit edildi! IP: ${clientIp}, Payload: ${data.website}`);
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
          error: "Lutfen gecerli bir Turkiye cep telefonu numarasi giriniz (Orn: 0541 484 24 26).",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------------------------------------
    // E. ENV KONTROLU — ASLA HARDCODED FALLBACK YOK!
    // -----------------------------------------------------------------------
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("[CRITICAL SECURITY] TELEGRAM_BOT_TOKEN veya TELEGRAM_CHAT_ID cevre degiskeni eksik!");
      return NextResponse.json(
        { success: false, error: "Sunucu yapilandirma hatasi. Lutfen dogrudan iletisime geciniz." },
        { status: 500 }
      );
    }

    // -----------------------------------------------------------------------
    // F. TELEGRAM MESAJ METNI OLUSTURMA
    // -----------------------------------------------------------------------
    let headerTitle = "🚨 <b>YENI GROWB LEAD TALEBI!</b>";
    if (data.type === "PROJE_BASLAT") {
      headerTitle = "🚀 <b>YENI PROJE BASLAT TALEBI!</b>";
    } else if (data.type === "DETAY_AL" || data.type === "ANALIZ") {
      headerTitle = "📊 <b>YENI DETAY VE ANALIZ TALEBI!</b>";
    } else if (data.type === "HIZ_SKORU") {
      headerTitle = "⚡ <b>YENI HIZ & SEO SKORU TESTI!</b>";
    } else if (data.type === "HIZMET_TEKLIF") {
      headerTitle = "🐝 <b>YENI HIZMET DETAY TALEBI!</b>";
    }

    const nowStr = new Date().toLocaleString("tr-TR", {
      timeZone: "Europe/Istanbul",
    });

    let messageText = `${headerTitle}\n━━━━━━━━━━━━━━━━━━━━\n`;
    if (data.name) messageText += `👤 <b>Isim / Yetkili:</b> ${escapeHtml(data.name)}\n`;
    messageText += `📱 <b>Telefon:</b> <code>${escapeHtml(normalizedPhone)}</code>\n`;
    if (data.siteUrl) messageText += `🌐 <b>Web Sitesi:</b> ${escapeHtml(data.siteUrl)}\n`;
    if (data.sector) messageText += `🏢 <b>Sektor:</b> ${escapeHtml(data.sector)}\n`;
    if (data.service) messageText += `🛠️ <b>Hizmet:</b> ${escapeHtml(data.service)}\n`;
    if (data.notes) messageText += `💬 <b>Not:</b> ${escapeHtml(data.notes)}\n`;
    messageText += `📍 <b>Kaynak:</b> ${escapeHtml(data.source)}\n`;
    messageText += `🛡️ <b>IP:</b> <code>${escapeHtml(clientIp)}</code>\n`;
    messageText += `📅 <b>Tarih:</b> ${nowStr}`;

    // -----------------------------------------------------------------------
    // G. TELEGRAM CAGRISI (8 saniye timeout ile)
    // -----------------------------------------------------------------------
    let tgSuccess = false;
    try {
      const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: "HTML",
        }),
        signal: AbortSignal.timeout(8000),
      });

      const tgData = await tgRes.json();
      if (tgRes.ok && tgData.ok) {
        tgSuccess = true;
      } else {
        console.error("[TELEGRAM API ERROR]", tgData);
      }
    } catch (err: unknown) {
      console.error("[TELEGRAM FETCH TIMEOUT/NETWORK ERROR]", err);
    }

    // -----------------------------------------------------------------------
    // H. RESEND YEDEK E-POSTA BILDIRIMI (Fail-Safe)
    // -----------------------------------------------------------------------
    let emailSent = false;
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const recipientEmail = process.env.LEAD_NOTIFICATION_EMAIL || "info@growbdijital.com";
        await resend.emails.send({
          from: "GrowB Dijital <onboarding@resend.dev>",
          to: [recipientEmail],
          subject: `Yeni Lead Talebi: ${normalizedPhone} (${data.type})`,
          html: `
            <h2>Yeni GrowB Lead Bildirimi</h2>
            <p><strong>Talep Turu:</strong> ${escapeHtml(data.type)}</p>
            <p><strong>Telefon:</strong> ${escapeHtml(normalizedPhone)}</p>
            ${data.name ? `<p><strong>Yetkili:</strong> ${escapeHtml(data.name)}</p>` : ""}
            ${data.siteUrl ? `<p><strong>Web Sitesi:</strong> ${escapeHtml(data.siteUrl)}</p>` : ""}
            ${data.sector ? `<p><strong>Sektor:</strong> ${escapeHtml(data.sector)}</p>` : ""}
            ${data.service ? `<p><strong>Hizmet:</strong> ${escapeHtml(data.service)}</p>` : ""}
            ${data.notes ? `<p><strong>Not:</strong> ${escapeHtml(data.notes)}</p>` : ""}
            <p><strong>Kaynak:</strong> ${escapeHtml(data.source)}</p>
            <p><strong>IP:</strong> ${escapeHtml(clientIp)}</p>
            <p><strong>Tarih:</strong> ${nowStr}</p>
          `,
        });
        emailSent = true;
      } catch (emailErr) {
        console.error("[RESEND EMAIL BACKUP ERROR]", emailErr);
      }
    }

    // Bildirim sonuc kontrolu: En az biri basarili olmali
    if (!tgSuccess && !emailSent) {
      return NextResponse.json(
        {
          success: false,
          error: "Bildirim iletiminde bir aksaklik olustu. Lutfen dogrudan WhatsApp uzerinden bize ulasin.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Talebiniz ekibimize ulasti. En kisa surede sizinle iletisime gececegiz.",
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
