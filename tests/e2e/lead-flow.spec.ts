import { test, expect } from "@playwright/test";

test.describe("GrowB Landing — E2E Test Suite", () => {
  test("Ana sayfa sorunsuz yüklenmeli ve Hero bölümü görüntülenmeli", async ({ page }) => {
    await page.goto("/");

    // Başlık ve Temel Marka Öğeleri
    await expect(page).toHaveTitle(/GrowB Dijital/);
    const heroHeading = page.locator("h1");
    await expect(heroHeading).toContainText("Markanızı dijitalde");

    // Hero CTA Butonu Görünür Olmalı
    const ctaButton = page.locator("button", { hasText: "Ücretsiz Analiz İsteyin" }).first();
    await expect(ctaButton).toBeVisible();
  });

  test("İletişim lead formunda KVKK onayı olmadan form gönderimi engellenmeli", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Hero kovan kilidini force click ile açarak sayfa akışını serbest bırak
    const unlockBtn = page.locator("button", { hasText: "Kovanı Doldur" });
    if (await unlockBtn.isVisible()) {
      await unlockBtn.click({ force: true });
      await page.waitForTimeout(500);
    }

    const section = page.locator("#iletisim");
    await section.scrollIntoViewIfNeeded();

    const form = section.locator("form");
    const submitBtn = form.locator('button[type="submit"]');
    const kvkkLabel = form.locator("label").filter({ hasText: "KVKK Aydınlatma Metni" });

    // Başlangıçta KVKK seçilmediği için disabled olmalı
    await expect(submitBtn).toBeDisabled();

    // KVKK etiketine tıkla
    await kvkkLabel.click();
    await expect(submitBtn).toBeEnabled();

    // Tekrar tıkla (uncheck)
    await kvkkLabel.click();
    await expect(submitBtn).toBeDisabled();
  });

  test("Kırşehir İl Sayfası (/kirsehir-dijital-pazarlama-ajansi) Kırşehir Aybar Nakliyat vakasıyla yüklenmeli", async ({
    page,
  }) => {
    await page.goto("/kirsehir-dijital-pazarlama-ajansi");

    // Sayfa Başlığı ve Meta
    await expect(page).toHaveTitle(/Kırşehir.*GrowB/);

    // Ana Başlık
    const heading = page.locator("h1");
    await expect(heading).toContainText("Kırşehir");

    // Aybar Nakliyat Canlı Başarı Vakası
    const caseLogo = page.locator('img[alt*="Kırşehir Aybar Nakliyat"]');
    await expect(caseLogo).toBeVisible();
  });
});
