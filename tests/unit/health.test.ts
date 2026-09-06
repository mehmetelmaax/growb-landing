import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/health/route";

describe("Sağlık Denetimi Uç Noktası (GET /api/health)", () => {
  it("HTTP 200 döner ve sadece status: 'ok' içerir (sürüm ve uptime sızdırmaz)", async () => {
    const res = await GET();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json).toEqual({ status: "ok" });
    expect(json.version).toBeUndefined();
    expect(json.uptime).toBeUndefined();
  });

  it("Önbellek engelleme (no-store, no-cache) başlıkları döner", async () => {
    const res = await GET();
    const cacheControl = res.headers.get("Cache-Control");
    expect(cacheControl).toContain("no-store");
  });
});
