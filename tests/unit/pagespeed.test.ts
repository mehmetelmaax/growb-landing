import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "@/app/api/pagespeed/route";
import { pagespeedInMemoryRateLimiter } from "@/lib/rate-limiter";

describe("PageSpeed API Uç Noktası (POST /api/pagespeed)", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
    pagespeedInMemoryRateLimiter.reset();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("Gövdede URL eksikse HTTP 400 ve açıklayıcı hata mesajı döner", async () => {
    const req = new Request("http://localhost:3000/api/pagespeed", {
      method: "POST",
      body: JSON.stringify({}),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toContain("Lütfen taranacak bir web sitesi adresi girin");
  });

  it("Geçersiz JSON gönderildiğinde HTTP 400 döner", async () => {
    const req = new Request("http://localhost:3000/api/pagespeed", {
      method: "POST",
      body: "not-json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toContain("Geçersiz JSON verisi");
  });

  it("Yerel adresler (localhost / 127.0.0.1) girildiğinde açıklayıcı 400 döner", async () => {
    const req = new Request("http://localhost:3000/api/pagespeed", {
      method: "POST",
      body: JSON.stringify({ url: "http://localhost:3000" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toContain("yerel (localhost / 127.0.0.1) adresleri tarayamaz");
  });

  it("Protokolsüz URL'ye otomatik https:// ekler ve PageSpeed skorlarını döndürür", async () => {
    let requestedUrl = "";
    global.fetch = vi.fn().mockImplementation(async (url: string) => {
      requestedUrl = url;
      return {
        ok: true,
        status: 200,
        json: async () => ({
          lighthouseResult: {
            categories: {
              performance: { score: 0.88 },
              seo: { score: 0.95 },
              "best-practices": { score: 0.92 },
            },
            audits: {
              "largest-contentful-paint": { displayValue: "2.3 s" },
              "cumulative-layout-shift": { displayValue: "0.01" },
              "first-contentful-paint": { displayValue: "1.2 s" },
            },
          },
        }),
      };
    }) as unknown as typeof fetch;

    const req = new Request("http://localhost:3000/api/pagespeed", {
      method: "POST",
      body: JSON.stringify({ url: "test-growb-domain.com" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();

    expect(requestedUrl).toContain(encodeURIComponent("https://test-growb-domain.com/"));
    expect(requestedUrl).toContain("strategy=mobile");
    expect(requestedUrl).toContain("category=performance");
    expect(requestedUrl).toContain("category=seo");
    expect(requestedUrl).toContain("category=best-practices");

    expect(json.success).toBe(true);
    expect(json.performanceScore).toBe(88);
    expect(json.seoScore).toBe(95);
    expect(json.bestPracticesScore).toBe(92);
    expect(json.lcp).toBe("2.3 s");
    expect(json.cls).toBe("0.01");
    expect(json.fcp).toBe("1.2 s");
  });

  it("Aynı adres 2. kez sorgulandığında önbellekten hızlı döner ve Google fetch tekrar çağrılmaz", async () => {
    let callCount = 0;
    global.fetch = vi.fn().mockImplementation(async () => {
      callCount++;
      return {
        ok: true,
        status: 200,
        json: async () => ({
          lighthouseResult: {
            categories: {
              performance: { score: 0.74 },
              seo: { score: 0.85 },
              "best-practices": { score: 0.9 },
            },
            audits: {
              "largest-contentful-paint": { displayValue: "3.1 s" },
              "cumulative-layout-shift": { displayValue: "0.05" },
              "first-contentful-paint": { displayValue: "1.9 s" },
            },
          },
        }),
      };
    }) as unknown as typeof fetch;

    const req1 = new Request("http://localhost:3000/api/pagespeed", {
      method: "POST",
      body: JSON.stringify({ url: "https://cache-test-domain.com" }),
    });
    const res1 = await POST(req1);
    expect(res1.status).toBe(200);
    expect(callCount).toBe(1);

    const req2 = new Request("http://localhost:3000/api/pagespeed", {
      method: "POST",
      body: JSON.stringify({ url: "https://cache-test-domain.com" }),
    });
    const res2 = await POST(req2);
    expect(res2.status).toBe(200);
    const json2 = await res2.json();
    expect(json2.success).toBe(true);
    expect(json2.performanceScore).toBe(74);
    expect(callCount).toBe(1);
  });

  it("Aynı IP'den 10 dakikada 3'ten fazla istek geldiğinde 4. istekte HTTP 429 döner", async () => {
    global.fetch = vi.fn().mockImplementation(async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        lighthouseResult: {
          categories: {
            performance: { score: 0.8 },
            seo: { score: 0.8 },
            "best-practices": { score: 0.8 },
          },
          audits: {},
        },
      }),
    })) as unknown as typeof fetch;

    const testIp = "192.168.10.99";
    for (let i = 1; i <= 3; i++) {
      const req = new Request("http://localhost:3000/api/pagespeed", {
        method: "POST",
        headers: { "x-forwarded-for": testIp },
        body: JSON.stringify({ url: `https://rate-limit-test-${i}.com` }),
      });
      const res = await POST(req);
      expect(res.status).toBe(200);
    }

    const req4 = new Request("http://localhost:3000/api/pagespeed", {
      method: "POST",
      headers: { "x-forwarded-for": testIp },
      body: JSON.stringify({ url: "https://rate-limit-test-4.com" }),
    });
    const res4 = await POST(req4);
    expect(res4.status).toBe(429);
    const json4 = await res4.json();
    expect(json4.success).toBe(false);
    expect(json4.error).toContain("Çok fazla analiz isteği gönderdiniz");
  });
});
