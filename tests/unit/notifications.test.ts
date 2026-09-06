import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { sendLeadNotifications } from "@/lib/notifications";
import type { LeadPayload } from "@/lib/validators";

describe("Bildirim Servisi & Hata Teşhisi (sendLeadNotifications)", () => {
  const originalToken = process.env.TELEGRAM_BOT_TOKEN;
  const originalChatId = process.env.TELEGRAM_CHAT_ID;
  const originalResend = process.env.RESEND_API_KEY;
  const originalFetch = global.fetch;

  const mockPayload: LeadPayload = {
    phone: "05414842426",
    type: "PROJE_BASLAT",
    source: "Web Sitesi",
    kvkkConsent: true,
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    delete process.env.RESEND_API_KEY;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    if (originalToken !== undefined) process.env.TELEGRAM_BOT_TOKEN = originalToken;
    else delete process.env.TELEGRAM_BOT_TOKEN;

    if (originalChatId !== undefined) process.env.TELEGRAM_CHAT_ID = originalChatId;
    else delete process.env.TELEGRAM_CHAT_ID;

    if (originalResend !== undefined) process.env.RESEND_API_KEY = originalResend;
    else delete process.env.RESEND_API_KEY;
  });

  it("TELEGRAM_BOT_TOKEN tanımlı değilse Telegram'a istek atmaz ve tgConfigMissing döner", async () => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    process.env.TELEGRAM_CHAT_ID = "123456";
    const fetchSpy = vi.fn();
    global.fetch = fetchSpy;

    const result = await sendLeadNotifications({
      data: mockPayload,
      normalizedPhone: "05414842426",
      clientIp: "127.0.0.1",
    });

    expect(result.tgSuccess).toBe(false);
    expect(result.tgConfigMissing).toBe(true);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("TELEGRAM_CHAT_ID tanımlı değilse tgConfigMissing döner ve istek atmaz", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "mock-bot-token";
    delete process.env.TELEGRAM_CHAT_ID;
    const fetchSpy = vi.fn();
    global.fetch = fetchSpy;

    const result = await sendLeadNotifications({
      data: mockPayload,
      normalizedPhone: "05414842426",
      clientIp: "127.0.0.1",
    });

    expect(result.tgSuccess).toBe(false);
    expect(result.tgConfigMissing).toBe(true);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("Telegram API hata döndüğünde (örn. 401 Unauthorized) tgError döner ve tgConfigMissing false olur", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "invalid-token";
    process.env.TELEGRAM_CHAT_ID = "123456";

    global.fetch = vi.fn().mockImplementation(async () => ({
      ok: false,
      status: 401,
      json: async () => ({ ok: false, error_code: 401, description: "Unauthorized" }),
    })) as unknown as typeof fetch;

    const result = await sendLeadNotifications({
      data: mockPayload,
      normalizedPhone: "05414842426",
      clientIp: "127.0.0.1",
    });

    expect(result.tgSuccess).toBe(false);
    expect(result.tgConfigMissing).toBe(false);
    expect(result.tgError).toBe("Unauthorized");
    expect(result.tgStatusCode).toBe(401);
  });

  it("Telegram API başarılı olduğunda tgSuccess true döner", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "valid-token";
    process.env.TELEGRAM_CHAT_ID = "123456";

    global.fetch = vi.fn().mockImplementation(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ ok: true, result: { message_id: 999 } }),
    })) as unknown as typeof fetch;

    const result = await sendLeadNotifications({
      data: mockPayload,
      normalizedPhone: "05414842426",
      clientIp: "127.0.0.1",
    });

    expect(result.tgSuccess).toBe(true);
    expect(result.tgConfigMissing).toBe(false);
  });
});
