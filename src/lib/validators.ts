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
