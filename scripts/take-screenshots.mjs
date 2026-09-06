import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('./tests/e2e/screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function capture() {
  const browser = await chromium.launch({ headless: true });
  
  // 1. Desktop Screenshot (1440x900)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://127.0.0.1:3001/', { waitUntil: 'networkidle' });
  // Wait a moment for preloader to fade
  await desktopPage.waitForTimeout(2700);
  const desktopPath = path.join(outDir, 'desktop-home.png');
  await desktopPage.screenshot({ path: desktopPath, fullPage: false });
  console.log('Saved desktop screenshot:', desktopPath);

  // 2. Skip link focus capture
  await desktopPage.keyboard.press('Tab');
  await desktopPage.waitForTimeout(300);
  const skipLinkPath = path.join(outDir, 'desktop-skip-link.png');
  await desktopPage.screenshot({ path: skipLinkPath, fullPage: false });
  console.log('Saved skip link screenshot:', skipLinkPath);

  // 3. Mobile Screenshot (390x844 - iPhone 14)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://127.0.0.1:3001/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2700);
  const mobilePath = path.join(outDir, 'mobile-home.png');
  await mobilePage.screenshot({ path: mobilePath, fullPage: false });
  console.log('Saved mobile screenshot:', mobilePath);

  // 4. Hizmetler Desktop Screenshot
  const servicesPage = await desktopContext.newPage();
  await servicesPage.goto('http://127.0.0.1:3001/hizmetler', { waitUntil: 'networkidle' });
  await servicesPage.waitForTimeout(1000);
  const servicesPath = path.join(outDir, 'desktop-hizmetler.png');
  await servicesPage.screenshot({ path: servicesPath, fullPage: false });
  console.log('Saved services screenshot:', servicesPath);

  await browser.close();
}

capture().catch(err => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
