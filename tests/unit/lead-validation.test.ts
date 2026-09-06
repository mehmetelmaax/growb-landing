import { describe, it, expect } from "vitest";
import {
  normalizeTurkishPhone,
  escapeHtml,
  LeadPayloadSchema,
  normalizeUrl,
} from "@/lib/validators";

describe("Telefon Numarası Doğrulama & Normalizasyon (normalizeTurkishPhone)", () => {
  it("standart 11 haneli 05xx formatını başarıyla normalize eder", () => {
    expect(normalizeTurkishPhone("0541 484 24 26")).toBe("05414842426");
    expect(normalizeTurkishPhone("05414842426")).toBe("05414842426");
    expect(normalizeTurkishPhone("0532 111 22 33")).toBe("05321112233");
  });

  it("+90 uluslararası önekini 05xx formatına çevirir", () => {
    expect(normalizeTurkishPhone("+90 541 484 24 26")).toBe("05414842426");
    expect(normalizeTurkishPhone("+905414842426")).toBe("05414842426");
    expect(normalizeTurkishPhone("+90 (541) 484-24-26")).toBe("05414842426");
  });

  it("0090 ve 90 öneklerini başarıyla normalize eder", () => {
    expect(normalizeTurkishPhone("00905414842426")).toBe("05414842426");
    expect(normalizeTurkishPhone("905414842426")).toBe("05414842426");
  });

  it("başında 0 olmayan 10 haneli (5xx...) numaraların başına 0 ekler", () => {
    expect(normalizeTurkishPhone("5414842426")).toBe("05414842426");
    expect(normalizeTurkishPhone("541 484 24 26")).toBe("05414842426");
  });

  it("parantez, tire, nokta ve ekstra boşluk içeren numaraları temizler", () => {
    expect(normalizeTurkishPhone("(0541) 484-24-26")).toBe("05414842426");
    expect(normalizeTurkishPhone("0541.484.24.26")).toBe("05414842426");
    expect(normalizeTurkishPhone("  0541   484  24 26  ")).toBe("05414842426");
  });

  it("geçersiz ve sahte numaraları kesinlikle reddeder (null döner)", () => {
    // Kısa numaralar
    expect(normalizeTurkishPhone("1234567")).toBeNull();
    expect(normalizeTurkishPhone("054112345")).toBeNull();
    // Uzun numaralar
    expect(normalizeTurkishPhone("0541484242600")).toBeNull();
    // Sabit hat (02xx, 03xx, 04xx)
    expect(normalizeTurkishPhone("0212 123 45 67")).toBeNull();
    expect(normalizeTurkishPhone("0384 213 00 00")).toBeNull();
    // Harf içerenler
    expect(normalizeTurkishPhone("0541abcdefg")).toBeNull();
    expect(normalizeTurkishPhone("telefon:05414842426")).toBeNull();
    // Boş veya tanımsız
    expect(normalizeTurkishPhone("")).toBeNull();
    expect(normalizeTurkishPhone(null as unknown as string)).toBeNull();
  });
});

describe("HTML Enjeksiyon & XSS Koruması (escapeHtml)", () => {
  it("özel HTML karakterlerini entity karşılıklarına dönüştürür", () => {
    expect(escapeHtml("<script>alert('xss')</script>")).toBe(
      "&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;"
    );
    expect(escapeHtml('Hello "World" & <Friends>')).toBe(
      "Hello &quot;World&quot; &amp; &lt;Friends&gt;"
    );
  });

  it("boş veya tanımsız girdileri güvenle boş dize olarak döner", () => {
    expect(escapeHtml("")).toBe("");
    expect(escapeHtml(null as unknown as string)).toBe("");
  });
});

describe("Zod Lead Formu Şema Doğrulaması (LeadPayloadSchema)", () => {
  const validLead = {
    type: "PROJE_BASLAT",
    name: "Ahmet Yılmaz",
    phone: "05414842426",
    service: "Web Tasarım",
    siteUrl: "https://ornek.com",
    sector: "Nakliyat",
    source: "Web Sitesi",
    notes: "Yeni web sitesi istiyoruz.",
    kvkkConsent: true,
  };

  it("eksiksiz ve geçerli payload başarıyla onaylanır", () => {
    const result = LeadPayloadSchema.safeParse(validLead);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Ahmet Yılmaz");
      expect(result.data.kvkkConsent).toBe(true);
    }
  });

  it("KVKK onayı verilmemişse veya false ise reddedilir", () => {
    const withoutConsent = { ...validLead, kvkkConsent: false };
    const result = LeadPayloadSchema.safeParse(withoutConsent);
    expect(result.success).toBe(false);

    const missingConsent = { ...validLead };
    delete (missingConsent as Record<string, unknown>).kvkkConsent;
    const result2 = LeadPayloadSchema.safeParse(missingConsent);
    expect(result2.success).toBe(false);
  });

  it("telefon numarası zorunludur ve boş olamaz", () => {
    const withoutPhone = { ...validLead, phone: "" };
    const result = LeadPayloadSchema.safeParse(withoutPhone);
    expect(result.success).toBe(false);
  });

  it("opsiyonel alanlar boş veya eksik bırakılabilir", () => {
    const minimalLead = {
      phone: "05414842426",
      kvkkConsent: true,
    };
    const result = LeadPayloadSchema.safeParse(minimalLead);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.type).toBe("PROJE_BASLAT"); // default
      expect(result.data.source).toBe("Web Sitesi"); // default
    }
  });

  it("honeypot website alanı şemada mevcuttur", () => {
    const botLead = {
      ...validLead,
      website: "http://bot-spam.com",
    };
    const result = LeadPayloadSchema.safeParse(botLead);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.website).toBe("http://bot-spam.com");
    }
  });
});

describe("Web Sitesi URL Doğrulama & Normalizasyon (normalizeUrl)", () => {
  it("şeması olmayan domainlere https:// ekler", () => {
    expect(normalizeUrl("example.com")).toBe("https://example.com/");
    expect(normalizeUrl("sub.domain.co.uk/test")).toBe("https://sub.domain.co.uk/test");
  });

  it("http veya https ile başlayan geçerli adresleri korur", () => {
    expect(normalizeUrl("https://growbdijital.com")).toBe("https://growbdijital.com/");
    expect(normalizeUrl("http://kirsehirnakliyat.com/hizmetler")).toBe(
      "http://kirsehirnakliyat.com/hizmetler"
    );
  });

  it("nokta içermeyen veya geçersiz adresleri reddeder (null)", () => {
    expect(normalizeUrl("gecersizurl")).toBeNull();
    expect(normalizeUrl("")).toBeNull();
    expect(normalizeUrl("http://")).toBeNull();
  });
});

describe("Lead API Uç Noktası & Hata Mesajları Güvenliği (POST /api/lead)", () => {
  it("Telefon eksik olduğunda Zod Türkçe hata döner ve details sızdırmaz", async () => {
    const { POST } = await import("@/app/api/lead/route");
    const req = new Request("http://localhost:3000/api/lead", {
      method: "POST",
      body: JSON.stringify({ kvkkConsent: true }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toBe("Telefon numarası zorunludur.");
    expect(json.details).toBeUndefined(); // Şema detayları asla sızdırılmaz
  });

  it("KVKK onayı eksik olduğunda Türkçe hata döner", async () => {
    const { POST } = await import("@/app/api/lead/route");
    const req = new Request("http://localhost:3000/api/lead", {
      method: "POST",
      body: JSON.stringify({ phone: "05414842426" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toBe("KVKK Aydınlatma Metni'ni onaylamanız gerekmektedir.");
    expect(json.details).toBeUndefined();
  });

  it("Bildirim kanalları yapılandırılmamışsa HTTP 500 döner ve WhatsApp linki sunar", async () => {
    const originalToken = process.env.TELEGRAM_BOT_TOKEN;
    const originalChatId = process.env.TELEGRAM_CHAT_ID;
    const originalResend = process.env.RESEND_API_KEY;

    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;
    delete process.env.RESEND_API_KEY;

    try {
      const { POST } = await import("@/app/api/lead/route");
      const req = new Request("http://localhost:3000/api/lead", {
        method: "POST",
        body: JSON.stringify({
          phone: "05414842426",
          kvkkConsent: true,
        }),
      });
      const res = await POST(req);
      expect(res.status).toBe(500);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.error).toContain("Şu an talebinizi sistem üzerinden alamıyoruz");
      expect(json.whatsappUrl).toBeDefined();
    } finally {
      process.env.TELEGRAM_BOT_TOKEN = originalToken;
      process.env.TELEGRAM_CHAT_ID = originalChatId;
      process.env.RESEND_API_KEY = originalResend;
    }
  });

  it("Hatalı form gönderimleri (örn: 5 kez) geçerli istek kotasını (5/10dk) tüketmez", async () => {
    const { POST } = await import("@/app/api/lead/route");
    const testIp = "192.168.99.77";

    // 5 kez hatalı istek gönder (telefon eksik)
    for (let i = 0; i < 5; i++) {
      const req = new Request("http://localhost:3000/api/lead", {
        method: "POST",
        headers: { "x-forwarded-for": testIp },
        body: JSON.stringify({ kvkkConsent: true }),
      });
      const res = await POST(req);
      expect(res.status).toBe(400); // 429 DEĞİL, 400 dönmeli!
    }

    // 6. hatalı istekte de hemen 429 almamalı (hatalı istek eşiği 30'dur)
    const req6 = new Request("http://localhost:3000/api/lead", {
      method: "POST",
      headers: { "x-forwarded-for": testIp },
      body: JSON.stringify({ kvkkConsent: true }),
    });
    const res6 = await POST(req6);
    expect(res6.status).toBe(400);
  });
});
