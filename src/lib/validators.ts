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
 * SSRF & Guvensiz IP/Host Filtresi
 * Loopback, private subnet'ler ve cloud metadata adreslerini engeller.
 */
function isPrivateIpOrHost(hostname: string): boolean {
  const host = hostname
    .toLowerCase()
    .trim()
    .replace(/^\[|\]$/g, "");

  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host.endsWith(".lan") ||
    host === "metadata.google.internal"
  ) {
    return true;
  }

  // IPv6 loopback / private
  if (
    host === "::1" ||
    host === "::" ||
    host.startsWith("fe80:") ||
    host.startsWith("fc") ||
    host.startsWith("fd")
  ) {
    return true;
  }

  // IPv4 denetimi
  const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = host.match(ipv4Regex);
  if (match) {
    const octets = match.slice(1).map(Number);
    if (octets.some((o) => o > 255)) return true; // Gecersiz IP
    const a = octets[0];
    const b = octets[1];
    if (a === undefined || b === undefined) return true;
    if (a === 127) return true; // 127.0.0.0/8 Loopback
    if (a === 10) return true; // 10.0.0.0/8 Private
    if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12 Private
    if (a === 192 && b === 168) return true; // 192.168.0.0/16 Private
    if (a === 169 && b === 254) return true; // 169.254.0.0/16 Link-Local / Metadata
    if (a === 0) return true; // 0.0.0.0/8
  }

  return false;
}

/**
 * Web Sitesi URL Normalizasyonu & SSRF Korumasi
 * http/https ekler, gecerli hostname kontrol eder, intranet/metadata IP'lerini eler.
 */
export function normalizeUrl(input: string): string | null {
  if (!input) return null;
  let target = input.trim();
  if (!/^https?:\/\//i.test(target)) {
    target = "https://" + target;
  }
  try {
    const parsed = new URL(target);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }
    const hostname = parsed.hostname;
    if (!hostname || !hostname.includes(".")) {
      return null;
    }
    if (isPrivateIpOrHost(hostname)) {
      return null;
    }
    const parts = hostname.split(".");
    const tld = parts[parts.length - 1];
    if (!tld || (!/^\d+$/.test(tld) && !/^[a-z]{2,}$/i.test(tld))) {
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
    .enum(["PROJE_BASLAT", "DETAY_AL", "ANALIZ", "HIZ_SKORU", "HIZMET_TEKLIF"], {
      message: "Geçersiz talep türü.",
    })
    .default("PROJE_BASLAT"),
  name: z
    .string({ message: "İsim geçerli bir metin olmalıdır." })
    .trim()
    .max(80, "İsim en fazla 80 karakter olabilir.")
    .optional()
    .nullable(),
  phone: z
    .string({ message: "Telefon numarası zorunludur." })
    .trim()
    .min(1, "Telefon numarası zorunludur."),
  service: z
    .string({ message: "Hizmet alanı geçerli bir metin olmalıdır." })
    .trim()
    .max(100, "Hizmet alanı en fazla 100 karakter olabilir.")
    .optional()
    .nullable(),
  siteUrl: z
    .string({ message: "Web sitesi adresi geçerli bir metin olmalıdır." })
    .trim()
    .max(250, "Web sitesi adresi en fazla 250 karakter olabilir.")
    .optional()
    .nullable(),
  sector: z
    .string({ message: "Sektör bilgisi geçerli bir metin olmalıdır." })
    .trim()
    .max(80, "Sektör bilgisi en fazla 80 karakter olabilir.")
    .optional()
    .nullable(),
  source: z
    .string({ message: "Kaynak bilgisi geçerli bir metin olmalıdır." })
    .trim()
    .max(120, "Kaynak bilgisi en fazla 120 karakter olabilir.")
    .default("Web Sitesi"),
  notes: z
    .string({ message: "Not alanı geçerli bir metin olmalıdır." })
    .trim()
    .max(1000, "Not alanı en fazla 1000 karakter olabilir.")
    .optional()
    .nullable(),
  // Honeypot Alani (Bot yakalama - Bos olmali)
  website: z.string({ message: "Geçersiz form verisi." }).optional().nullable(),
  // KVKK Acik Riza Onayi (Zorunlu)
  kvkkConsent: z
    .boolean({ message: "KVKK Aydınlatma Metni'ni onaylamanız gerekmektedir." })
    .refine((val) => val === true, {
      message: "KVKK Aydınlatma Metni'ni onaylamanız gerekmektedir.",
    }),
  // Cift submit engelleme (Idempotency Key)
  idempotencyKey: z
    .string({ message: "Geçersiz istek anahtarı." })
    .trim()
    .max(100)
    .optional()
    .nullable(),
});

export type LeadPayload = z.infer<typeof LeadPayloadSchema>;
