import { NextResponse } from "next/server";

const DEFAULT_BOT_TOKEN = "8829340417:AAEh0D0MIZFpASzWxY3Sb81q59Lwlozirg8";
const DEFAULT_CHAT_ID = "8782197742";

function escapeHtml(text: string): string {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      type = "PROJE_BASLAT",
      name,
      phone,
      service,
      siteUrl,
      sector,
      source = "Web Sitesi",
      notes,
    } = body;

    if (!phone && !siteUrl) {
      return NextResponse.json(
        { error: "Telefon numarası veya web sitesi zorunludur." },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN || DEFAULT_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID || DEFAULT_CHAT_ID;

    // Başlık ve Emoji Seçimi
    let headerTitle = "🚨 <b>YENİ GROWB LEAD TALEBİ!</b>";
    if (type === "PROJE_BASLAT") {
      headerTitle = "🚀 <b>YENİ PROJE BAŞLAT TALEBİ!</b>";
    } else if (type === "DETAY_AL" || type === "ANALIZ") {
      headerTitle = "📊 <b>YENİ DETAY VE ANALİZ TALEBİ!</b>";
    } else if (type === "HIZ_SKORU") {
      headerTitle = "⚡ <b>YENİ HIZ & SEO SKORU TESTİ!</b>";
    } else if (type === "HIZMET_TEKLIF") {
      headerTitle = "🐝 <b>YENİ HİZMET DETAY TALEBİ!</b>";
    }

    const nowStr = new Date().toLocaleString("tr-TR", {
      timeZone: "Europe/Istanbul",
    });

    // Telegram HTML Formatında Mesaj Metni
    let messageText = `${headerTitle}\n━━━━━━━━━━━━━━━━━━━━\n`;

    if (name) {
      messageText += `👤 <b>İsim / Yetkili:</b> ${escapeHtml(name)}\n`;
    }
    if (phone) {
      messageText += `📱 <b>Telefon:</b> <code>${escapeHtml(phone)}</code>\n`;
    }
    if (siteUrl) {
      messageText += `🌐 <b>Web Sitesi / İşletme:</b> ${escapeHtml(siteUrl)}\n`;
    }
    if (sector) {
      messageText += `🏢 <b>Sektör:</b> ${escapeHtml(sector)}\n`;
    }
    if (service) {
      messageText += `🛠️ <b>İlgilenilen Hizmet:</b> ${escapeHtml(service)}\n`;
    }
    if (notes) {
      messageText += `💬 <b>Not / Mesaj:</b> ${escapeHtml(notes)}\n`;
    }

    messageText += `📍 <b>Form Kaynağı:</b> ${escapeHtml(source)}\n`;
    messageText += `📅 <b>Tarih:</b> ${nowStr}`;

    // Telegram sendMessage API Çağrısı
    const tgRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: "HTML",
        }),
      }
    );

    const tgData = await tgRes.json();

    if (!tgRes.ok || !tgData.ok) {
      console.error("[TELEGRAM ERROR]", tgData);
      return NextResponse.json(
        { success: false, error: tgData.description || "Telegram API hatası" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, messageId: tgData.result?.message_id });
  } catch (error: any) {
    console.error("[LEAD API ERROR]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Bilinmeyen sunucu hatası" },
      { status: 500 }
    );
  }
}
