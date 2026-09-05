import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryRateLimiter } from "@/lib/rate-limiter";

describe("In-Memory Rate Limiter (InMemoryRateLimiter)", () => {
  let limiter: InMemoryRateLimiter;

  beforeEach(() => {
    limiter = new InMemoryRateLimiter(60 * 1000, 5); // 1 dakika, 5 istek
  });

  it("ilk istekte izin verir ve kalan sayıyı doğru hesaplar", () => {
    const result = limiter.check("192.168.1.1");
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it("5 isteğe kadar izin verir, 6. istekte 429 engellemesi yapar", () => {
    const ip = "10.0.0.1";

    // 1-5 istekler başarılı
    for (let i = 1; i <= 5; i++) {
      const res = limiter.check(ip);
      expect(res.allowed).toBe(true);
      expect(res.remaining).toBe(5 - i);
    }

    // 6. istek engellenmeli
    const blockedRes = limiter.check(ip);
    expect(blockedRes.allowed).toBe(false);
    expect(blockedRes.remaining).toBe(0);
    expect(blockedRes.resetInMs).toBeGreaterThan(0);
  });

  it("farklı IP adresleri birbirinden bağımsız kotalara sahiptir", () => {
    const ip1 = "10.0.0.1";
    const ip2 = "10.0.0.2";

    // IP1 kotasını doldur
    for (let i = 0; i < 5; i++) {
      limiter.check(ip1);
    }
    expect(limiter.check(ip1).allowed).toBe(false);

    // IP2 hala 5 hakka sahip olmalıdır
    const resIp2 = limiter.check(ip2);
    expect(resIp2.allowed).toBe(true);
    expect(resIp2.remaining).toBe(4);
  });

  it("reset çağrıldığında kotalar sıfırlanır", () => {
    const ip = "10.0.0.1";
    for (let i = 0; i < 5; i++) {
      limiter.check(ip);
    }
    expect(limiter.check(ip).allowed).toBe(false);

    // Belirli IP'yi sıfırla
    limiter.reset(ip);
    const retryRes = limiter.check(ip);
    expect(retryRes.allowed).toBe(true);
    expect(retryRes.remaining).toBe(4);
  });
});
