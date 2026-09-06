import { Resend } from "resend";
import { escapeHtml, LeadPayload } from "@/lib/validators";

export interface SendNotificationsParams {
  data: LeadPayload;
  normalizedPhone: string;
  clientIp: string;
}

export interface NotificationResult {
  tgSuccess: boolean;
  emailSent: boolean;
  tgConfigMissing?: boolean;
  tgError?: string;
  tgStatusCode?: number;
}

/**
 * Telegram HTML bildirim metni formatlayıcı
 */
function buildTelegramMessage(
  data: LeadPayload,
  normalizedPhone: string,
  clientIp: string,
  nowStr: string
): string {
  let headerTitle = "🚨 <b>YENI GROWB LEAD TALEBI!</b>";
  if (data.type === "RANDEVU" || data.type === "GORUSME_PLANLA") {
    headerTitle = "📅 <b>YENİ BÜYÜME GÖRÜŞMESİ & RANDEVU TALEBİ!</b>";
  } else if (data.type === "PROJE_BASLAT") {
    headerTitle = "🚀 <b>YENI PROJE BASLAT TALEBI!</b>";
  } else if (data.type === "DETAY_AL" || data.type === "ANALIZ") {
    headerTitle = "📊 <b>YENI DETAY VE ANALIZ TALEBI!</b>";
  } else if (data.type === "HIZ_SKORU") {
    headerTitle = "⚡ <b>YENI HIZ & SEO SKORU TESTI!</b>";
  } else if (data.type === "HIZMET_TEKLIF") {
    headerTitle = "🐝 <b>YENI HIZMET DETAY TALEBI!</b>";
  }

  let text = `${headerTitle}\n━━━━━━━━━━━━━━━━━━━━\n`;
  if (data.name) text += `👤 <b>İsim / Yetkili:</b> ${escapeHtml(data.name)}\n`;
  text += `📱 <b>Telefon:</b> <code>${escapeHtml(normalizedPhone)}</code>\n`;
  if (data.appointmentDate)
    text += `🗓️ <b>Randevu Tarihi:</b> ${escapeHtml(data.appointmentDate)}\n`;
  if (data.appointmentTime) text += `⏰ <b>Saat Aralığı:</b> ${escapeHtml(data.appointmentTime)}\n`;
  if (data.meetingType) text += `📞 <b>Görüşme Kanalı:</b> ${escapeHtml(data.meetingType)}\n`;
  if (data.siteUrl) text += `🌐 <b>Web Sitesi:</b> ${escapeHtml(data.siteUrl)}\n`;
  if (data.sector) text += `🏢 <b>Sektör:</b> ${escapeHtml(data.sector)}\n`;
  if (data.service) text += `🛠️ <b>Hizmet:</b> ${escapeHtml(data.service)}\n`;
  if (data.notes) text += `💬 <b>Not:</b> ${escapeHtml(data.notes)}\n`;
  text += `📍 <b>Kaynak:</b> ${escapeHtml(data.source)}\n`;
  text += `📜 <b>KVKK Onayı:</b> Onaylandı (${nowStr})\n`;
  text += `🛡️ <b>IP:</b> <code>${escapeHtml(clientIp)}</code>\n`;
  text += `📅 <b>Tarih:</b> ${nowStr}\n`;
  text += `━━━━━━━━━━━━━━━━━━━━\n`;
  const cleanPhone = normalizedPhone.replace(/^0/, "90");
  text += `👉 <a href="https://wa.me/${cleanPhone}">Müşteriye WhatsApp'tan Yanıt Ver</a>`;
  return text;
}

/**
 * Lead Bildirimlerini Gönder (Telegram Öncelikli, Resend E-posta Yedekli)
 */
export async function sendLeadNotifications({
  data,
  normalizedPhone,
  clientIp,
}: SendNotificationsParams): Promise<NotificationResult> {
  const nowStr = new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });
  let tgSuccess = false;
  let emailSent = false;
  let tgConfigMissing = false;
  let tgError: string | undefined;
  let tgStatusCode: number | undefined;

  // 1. Telegram Bildirimi
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!botToken) {
    tgConfigMissing = true;
    console.warn("[TELEGRAM CONFIG] TELEGRAM_BOT_TOKEN tanımlı değil!");
  } else if (!chatId) {
    tgConfigMissing = true;
    console.warn("[TELEGRAM CONFIG] TELEGRAM_CHAT_ID tanımlı değil!");
  } else {
    try {
      const messageText = buildTelegramMessage(data, normalizedPhone, clientIp, nowStr);
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

      tgStatusCode = tgRes.status;
      const tgData = await tgRes.json().catch(() => ({}));
      if (tgRes.ok && tgData.ok) {
        tgSuccess = true;
      } else {
        tgError = tgData.description || `HTTP ${tgRes.status}`;
        console.error(`[TELEGRAM API ERROR] Telegram API hata döndü (${tgRes.status}):`, tgData);
      }
    } catch (err) {
      tgError = err instanceof Error ? err.message : String(err);
      console.error("[TELEGRAM NETWORK ERROR] Telegram API bağlantı hatası:", err);
    }
  }

  // 2. Resend Yedek E-posta Bildirimi
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
          ${data.appointmentDate ? `<p><strong>Randevu Tarihi:</strong> ${escapeHtml(data.appointmentDate)}</p>` : ""}
          ${data.appointmentTime ? `<p><strong>Saat Aralığı:</strong> ${escapeHtml(data.appointmentTime)}</p>` : ""}
          ${data.meetingType ? `<p><strong>Görüşme Kanalı:</strong> ${escapeHtml(data.meetingType)}</p>` : ""}
          ${data.name ? `<p><strong>Yetkili:</strong> ${escapeHtml(data.name)}</p>` : ""}
          ${data.siteUrl ? `<p><strong>Web Sitesi:</strong> ${escapeHtml(data.siteUrl)}</p>` : ""}
          ${data.sector ? `<p><strong>Sektör:</strong> ${escapeHtml(data.sector)}</p>` : ""}
          ${data.service ? `<p><strong>Hizmet:</strong> ${escapeHtml(data.service)}</p>` : ""}
          ${data.notes ? `<p><strong>Not:</strong> ${escapeHtml(data.notes)}</p>` : ""}
          <ul>
            <li><b>Kaynak:</b> ${escapeHtml(data.source)}</li>
            <li><b>KVKK Onayı:</b> Onaylandı (${nowStr})</li>
            <li><b>IP:</b> ${escapeHtml(clientIp)}</li>
          </ul>
          <p><strong>Tarih:</strong> ${nowStr}</p>
        `,
      });
      emailSent = true;
    } catch (emailErr) {
      console.error("[RESEND EMAIL BACKUP ERROR]", emailErr);
    }
  }

  return { tgSuccess, emailSent, tgConfigMissing, tgError, tgStatusCode };
}
