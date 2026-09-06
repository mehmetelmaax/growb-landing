import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/health/route";

describe("Sağlık Denetimi Uç Noktası (GET /api/health)", () => {
  it("HTTP 200 döner ve 'ok' durumu ile geçerli timestamp içerir", async () => {
    const res = await GET();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.status).toBe("ok");
    expect(json.service).toBe("growb-landing");
    expect(json.version).toBe("1.0.0");
    expect(typeof json.uptime).toBe("number");
    expect(typeof json.timestamp).toBe("string");
    expect(new Date(json.timestamp).getTime()).not.toBeNaN();
  });

  it("Önbellek engelleme (no-store, no-cache) başlıkları döner", async () => {
    const res = await GET();
    const cacheControl = res.headers.get("Cache-Control");
    expect(cacheControl).toContain("no-store");
  });
});
