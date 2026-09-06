import { test, expect } from "@playwright/test";

test.describe("GrowB Landing — CSP & Security Headers", () => {
  test("Sayfa yüklenirken ve çerez onayı verildiğinde sıfır CSP ihlali olmalı", async ({
    page,
  }) => {
    const cspViolations: string[] = [];

    page.on("console", (msg) => {
      const text = msg.text();
      if (
        msg.type() === "error" &&
        (text.toLowerCase().includes("content security policy") ||
          text.toLowerCase().includes("csp") ||
          text.toLowerCase().includes("violates the following"))
      ) {
        cspViolations.push(text);
      }
    });

    // 1. Ana sayfayı yükle
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    // Hero görünene kadar bekle (Preloader tamamlanmış olur)
    await expect(page.getByTestId("hero-headline")).toBeVisible();

    // 2. Güvenlik başlıklarını doğrula
    const headers = response?.headers() || {};
    expect(headers["content-security-policy"]).toBeDefined();
    expect(headers["x-powered-by"]).toBeUndefined();

    // 3. Çerez onay banner'ını kabul et
    const acceptBtn = page.getByRole("button", { name: /Kabul Et|Tümünü Kabul Et/i });
    if (await acceptBtn.isVisible()) {
      await acceptBtn.click();
      await page.waitForTimeout(1000);
    }

    // 4. CSP ihlali olmamalı
    expect(cspViolations).toEqual([]);

    // Preloader'ın kaybolması için bekle (2.6s)
    await page.waitForTimeout(2800);

    // 5. Doğrulama ekran görüntüsü kaydet
    await page.screenshot({
      path: "tests/e2e/screenshots/csp-verified.png",
      fullPage: false,
    });
  });
});
