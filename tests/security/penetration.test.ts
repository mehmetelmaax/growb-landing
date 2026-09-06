import { describe, it, expect, beforeEach } from "vitest";
import {
  normalizeTurkishPhone,
  escapeHtml,
  normalizeUrl,
  LeadPayloadSchema,
} from "@/lib/validators";
import { InMemoryRateLimiter } from "@/lib/rate-limiter";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextConfig = require("../../next.config.js");

describe("Penetrasyon & Siber Güvenlik Test Paketi", () => {
  describe("1. SQL Injection (SQLi) & NoSQL Injection Savunması", () => {
    const sqliPayloads = [
      "' OR '1'='1",
      "1; DROP TABLE leads; --",
      "' UNION SELECT null, username, password FROM users --",
      "admin' --",
      "1' OR 1=1 #",
      "' OR 'x'='x",
    ];

    it("SQLi payload'ları 'type' enum alanına enjekte edildiğinde Zod tarafından kesinlikle reddedilir", () => {
      for (const payload of sqliPayloads) {
        const result = LeadPayloadSchema.safeParse({
          type: payload,
          phone: "05414842426",
          kvkkConsent: true,
        });
        expect(result.success).toBe(false);
      }
    });

    it("Metin alanlarındaki SQLi payload'ları güvenle string olarak saklanır ve HTML escape edilir", () => {
      for (const payload of sqliPayloads) {
        const escaped = escapeHtml(payload);
        expect(escaped).not.toContain("'");
        if (payload.includes("'")) {
          expect(escaped).toContain("&#39;");
        }
      }
    });

    it("NoSQL Injection anahtar nesneleri veri şeması tarafından reddedilir", () => {
      const nosqlPayloads = [{ $gt: "" }, { $ne: null }, { $where: "this.id != null" }];
      for (const payload of nosqlPayloads) {
        const result = LeadPayloadSchema.safeParse({
          phone: payload as unknown as string,
          kvkkConsent: true,
        });
        expect(result.success).toBe(false);
      }
    });
  });

  describe("2. Cross-Site Scripting (XSS) & Content Injection Savunması", () => {
    const xssPayloads = [
      "<script>alert('XSS')</script>",
      "<img src=x onerror=\"alert('XSS')\">",
      "<svg onload=alert(1)>",
      "<iframe src=\"javascript:alert('XSS')\"></iframe>",
      "javascript:alert(1)",
      "'\"><script>alert(document.cookie)</script>",
    ];

    it("escapeHtml fonksiyonu tüm tehlikeli HTML etiketlerini ve karakterleri nötralize eder", () => {
      for (const payload of xssPayloads) {
        const clean = escapeHtml(payload);
        expect(clean).not.toContain("<script>");
        expect(clean).not.toContain("</script>");
        expect(clean).not.toContain("<img");
        expect(clean).not.toContain("<svg");
        expect(clean).not.toContain("<iframe");
        expect(clean).not.toContain("<");
        expect(clean).not.toContain(">");
      }
    });

    it("XSS barındıran isim veya not alanları doğrulanırken karakter sınırları (DoS önleme) korunur", () => {
      const longPayload = "<script>" + "A".repeat(2000) + "</script>";
      const result = LeadPayloadSchema.safeParse({
        name: longPayload,
        phone: "05414842426",
        kvkkConsent: true,
      });
      // İsim en fazla 80 karakter kuralı saldırganın buffer/bellek şişirme payload'unu engeller
      expect(result.success).toBe(false);
    });
  });

  describe("3. Server-Side Request Forgery (SSRF) Savunması (/api/pagespeed & normalizeUrl)", () => {
    const dangerousSsrfTargets = [
      "http://127.0.0.1:3000",
      "http://127.0.0.1/admin",
      "http://localhost",
      "http://localhost:8080",
      "http://169.254.169.254/latest/meta-data/",
      "http://metadata.google.internal/computeMetadata/v1/",
      "http://10.0.0.1/internal-dashboard",
      "http://192.168.1.1/router-login",
      "http://172.16.0.5/secret",
      "http://[::1]/",
      "file:///etc/passwd",
      "ftp://internal.server/keys.txt",
      "gopher://127.0.0.1:25/",
    ];

    it("normalizeUrl tüm intranet, loopback, private ve cloud metadata adreslerini engeller", () => {
      for (const target of dangerousSsrfTargets) {
        const normalized = normalizeUrl(target);
        expect(normalized).toBeNull();
      }
    });

    it("normalizeUrl yalnızca meşru kamuya açık alan adlarına izin verir", () => {
      expect(normalizeUrl("growbdijital.com")).toBe("https://growbdijital.com/");
      expect(normalizeUrl("https://aybarnakliyat.com.tr")).toBe("https://aybarnakliyat.com.tr/");
      expect(normalizeUrl("www.google.com")).toBe("https://www.google.com/");
    });
  });

  describe("4. Honeypot Bot Tuzağı & Spam Savunması", () => {
    it("Gizli 'website' alanı doldurulduğunda bot olarak işaretlenir", () => {
      const botPayload = {
        name: "Spam Bot",
        phone: "05414842426",
        website: "https://spam-poker-casino.com",
        kvkkConsent: true,
      };

      const parseResult = LeadPayloadSchema.safeParse(botPayload);
      expect(parseResult.success).toBe(true);
      if (parseResult.success) {
        const isBot = Boolean(
          parseResult.data.website && parseResult.data.website.trim().length > 0
        );
        expect(isBot).toBe(true);
      }
    });

    it("Meşru kullanıcıda 'website' boş olduğunda bot denetimini geçer", () => {
      const humanPayload = {
        name: "Ahmet Yılmaz",
        phone: "05414842426",
        website: "",
        kvkkConsent: true,
      };

      const parseResult = LeadPayloadSchema.safeParse(humanPayload);
      expect(parseResult.success).toBe(true);
      if (parseResult.success) {
        const isBot = Boolean(
          parseResult.data.website && parseResult.data.website.trim().length > 0
        );
        expect(isBot).toBe(false);
      }
    });
  });

  describe("5. Telefon Numarası Format Manipülasyon Savunması", () => {
    const maliciousPhones = [
      "05414842426; rm -rf /",
      "05414842426' OR 1=1",
      "05414842426<script>",
      "+90 541 484 24 26 0000000000",
      "0541 484 24", // Eksik hane
      "0384 213 00 00", // Sabit hat, GSM değil
      "0".repeat(50),
    ];

    it("Tüm manipüle edilmiş ve sahte telefon numaraları kesinlikle reddedilir", () => {
      for (const phone of maliciousPhones) {
        const normalized = normalizeTurkishPhone(phone);
        expect(normalized).toBeNull();
      }
    });
  });

  describe("6. Rate Limiting Sel Saldırısı (Flood) Önleme", () => {
    let limiter: InMemoryRateLimiter;

    beforeEach(() => {
      // 10 dakika (600.000 ms), 5 istek sınırı
      limiter = new InMemoryRateLimiter(600000, 5);
    });

    it("Aynı IP'den gelen ardışık 5 isteğe izin verir, 6. isteği kesinlikle bloke eder", () => {
      const testIp = "203.0.113.195";

      for (let i = 1; i <= 5; i++) {
        const check = limiter.check(testIp);
        expect(check.allowed).toBe(true);
        expect(check.remaining).toBe(5 - i);
      }

      // 6. İstek bloke edilmelidir
      const blocked = limiter.check(testIp);
      expect(blocked.allowed).toBe(false);
      expect(blocked.remaining).toBe(0);
      expect(blocked.resetInMs).toBeGreaterThan(0);
    });

    it("Farklı IP adresleri birbirinin kotasını etkilemez", () => {
      const ipA = "198.51.100.1";
      const ipB = "198.51.100.2";

      for (let i = 0; i < 5; i++) {
        limiter.check(ipA);
      }
      expect(limiter.check(ipA).allowed).toBe(false);
      expect(limiter.check(ipB).allowed).toBe(true);
    });
  });

  describe("7. HTTP Güvenlik Başlıkları Yapılandırma Denetimi", () => {
    it("next.config.js tüm kritik güvenlik başlıklarını eksiksiz sağlar", async () => {
      const headersConfig = await nextConfig.headers();
      const globalRule = headersConfig.find((rule: { source: string }) => rule.source === "/(.*)");

      expect(globalRule).toBeDefined();
      const headersMap = new Map(
        globalRule.headers.map((h: { key: string; value: string }) => [h.key, h.value])
      );

      // CSP
      expect(headersMap.has("Content-Security-Policy")).toBe(true);
      expect(headersMap.get("Content-Security-Policy")).toContain("default-src 'self'");
      expect(headersMap.get("Content-Security-Policy")).toContain("object-src 'none'");

      // HSTS
      expect(headersMap.get("Strict-Transport-Security")).toContain("max-age=63072000");

      // X-Content-Type-Options
      expect(headersMap.get("X-Content-Type-Options")).toBe("nosniff");

      // X-Frame-Options (Clickjacking önleme)
      expect(headersMap.get("X-Frame-Options")).toBe("SAMEORIGIN");

      // X-XSS-Protection
      expect(headersMap.get("X-XSS-Protection")).toBe("1; mode=block");

      // Referrer-Policy
      expect(headersMap.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");

      // Permissions-Policy
      expect(headersMap.get("Permissions-Policy")).toContain("camera=()");

      // COOP & CORP
      expect(headersMap.get("Cross-Origin-Opener-Policy")).toBe("same-origin");
      expect(headersMap.get("Cross-Origin-Resource-Policy")).toBe("same-origin");
    });
  });
});
