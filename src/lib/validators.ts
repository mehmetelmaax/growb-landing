import { z } from "zod";

/**
 * Turkiye GSM Telefon Numarasi Normalizasyonu & Kati Regex Denetimi
 * Bosluk, parantez, tire, nokta ve kontrol karakterlerini temizler.
 * +90, 0090 veya 90 oneklerini 0'a normalize eder.
 * 10 haneli (5xx...) numaralarin basina 0 ekler.
 * ^05\\d{9}$ regex'i ile dogrular (tam 11 hane).
 */
export function normalizeTurkishPhone(input: string): string | null {
  if (!input) return null;

  // Bosluk, tire, parantez, nokta ve kontrol karakterlerini temizle
  let cleaned = String(input).replace(/[\s\-\(\)\.]/g, "");

  // Uluslararasi onekleri 0 ile standardize et
  if (cleaned.startsWith("+90")) {
    cleaned = "0" + cleaned.slice(3);
  } else if (cleaned.startsWith("0090")) {
    cleaned = "0" + cleaned.slice(4);
  } else if (cleaned.startsWith("90") && cleaned.length === 12) {
    cleaned = "0" + cleaned.slice(2);
  } else if (!cleaned.startsWith("0") && cleaned.startsWith("5") && cleaned.length === 10) {
    cleaned = "0" + cleaned;
  }

  // Kesin kural: Tam 11 hane ve 05 ile baslamali (^05\d{9}$)
  const trGsmRegex = /^05\d{9}$/;
  if (trGsmRegex.test(cleaned)) {
    return cleaned;
  }

  return null;
}

/**
 * XSS & HTML Enjeksiyon Korumasi
 */
export function escapeHtml(text: string): string {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Web Sitesi URL Normalizasyonu
 * http/https ekler, gecerli hostname kontrol eder.
 */
export function normalizeUrl(input: string): string | null {
  if (!input) return null;
  let target = input.trim();
  if (!/^https?:\/\//i.test(target)) {
    target = "https://" + target;
  }
  try {
    const parsed = new URL(target);
    if (!parsed.hostname.includes(".")) {
      return null;
    }
    return parsed.href;
  } catch {
    return null;
  }
}

/**
 * Zod Lead Formu Giris Dogrulama Semasi
 */
export const LeadPayloadSchema = z.object({
  type: z
    .enum(["PROJE_BASLAT", "DETAY_AL", "ANALIZ", "HIZ_SKORU", "HIZMET_TEKLIF"])
    .default("PROJE_BASLAT"),
  name: z.string().trim().max(80, "Isim en fazla 80 karakter olabilir.").optional().nullable(),
  phone: z.string().min(1, "Telefon numarasi zorunludur."),
  service: z.string().trim().max(100).optional().nullable(),
  siteUrl: z.string().trim().max(250).optional().nullable(),
  sector: z.string().trim().max(80).optional().nullable(),
  source: z.string().trim().max(120).default("Web Sitesi"),
  notes: z.string().trim().max(1000).optional().nullable(),
  // Honeypot Alani (Bot yakalama - Bos olmali)
  website: z.string().optional().nullable(),
  // KVKK Acik Riza Onayi (Zorunlu)
  kvkkConsent: z.boolean().refine((val) => val === true, {
    message: "KVKK Aydınlatma Metni'ni onaylamanız gerekmektedir.",
  }),
});

export type LeadPayload = z.infer<typeof LeadPayloadSchema>;
