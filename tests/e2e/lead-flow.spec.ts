import { test, expect } from "@playwright/test";

test.describe("GrowB Landing — E2E Test Suite", () => {
  test.beforeEach(async ({ context, baseURL }) => {
    // Deterministik test koşusu için varsayılan olarak "control" varyant çerezini sabitle
    await context.addCookies([
      {
        name: "growb_ab_hero_headline_v1",
        value: "control",
        url: baseURL || "http://localhost:3001",
      },
    ]);
  });

  test("Ana sayfa sorunsuz yüklenmeli ve Hero bölümü görüntülenmeli", async ({ page }) => {
    await page.goto("/");

    // Başlık ve Temel Marka Öğeleri
    await expect(page).toHaveTitle(/GrowB Dijital/);
    const heroHeading = page.getByTestId("hero-headline");
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).not.toBeEmpty();

    // Hero CTA Butonu Görünür ve Aktif Olmalı
    const ctaButton = page.getByTestId("hero-cta-primary");
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toBeEnabled();
  });

  test("A/B Testi: Control ve Conversion varyant metinleri çerez bazlı deterministik yüklenmeli", async ({
    page,
    context,
    baseURL,
  }) => {
    // 1. Control varyantı metin doğrulaması
    await page.goto("/");
    const heroHeading = page.getByTestId("hero-headline");
    const ctaButton = page.getByTestId("hero-cta-primary");

    await expect(heroHeading).toContainText("DİJİTALDEKİ TÜM İŞLERİNİZİ YÖNETEN BÜYÜME ORTAĞINIZ");
    await expect(ctaButton).toContainText("Ücretsiz Büyüme Analizi Al");

    // 2. Conversion varyantına açıkça geçiş
    await context.addCookies([
      {
        name: "growb_ab_hero_headline_v1",
        value: "conversion",
        url: baseURL || "http://localhost:3001",
      },
    ]);
    await page.goto("/");

    await expect(heroHeading).toContainText(
      "CİRONUZU VE MÜŞTERİLERİNİZİ KATLAYAN DİJİTAL BÜYÜME EKİBİ"
    );
    await expect(ctaButton).toContainText("Hemen Teklif & Yol Haritası Al");
  });

  test("İletişim lead formunda KVKK onayı olmadan form gönderimi engellenmeli", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Hero kovan kilidini açarak sayfa akışını serbest bırak (WCAG 2.1.1 klavye / buton)
    const unlockBtn = page.getByTestId("hero-unlock-hive");
    if (await unlockBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await unlockBtn.click();
    } else {
      await page.keyboard.press("PageDown");
    }

    // Hizmetler tekerlek kilidini klavye navigasyonuyla serbest bırak
    await page.keyboard.press("PageDown");
    await page.waitForTimeout(100);

    const section = page.locator("#iletisim");
    await section.scrollIntoViewIfNeeded();

    const form = section.locator("form");
    const submitBtn = form.locator('button[type="submit"]');
    const kvkkLabel = form.locator('label[for="kvkk-consent-final"]');

    // Başlangıçta KVKK seçilmediği için disabled olmalı
    await expect(submitBtn).toBeDisabled();

    // KVKK etiketine tıkla (kullanıcı aksiyonu)
    await kvkkLabel.click();
    await expect(submitBtn).toBeEnabled();

    // KVKK onayını geri al (uncheck)
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
