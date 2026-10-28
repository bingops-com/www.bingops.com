import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';

const url = process.env.PORTAL_CAPTURE_URL || 'http://portal.portal.svc.cluster.local:3000/';
const destination = fileURLToPath(new URL('../public/projects/portal.jpg', import.meta.url));
const browser = await chromium.launch({
  ...(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}),
  args: ['--no-sandbox'],
});

try {
  const page = await browser.newPage({
    viewport: { width: 1600, height: 1150 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    reducedMotion: 'reduce',
  });
  await page.addInitScript(() => localStorage.setItem('portal-theme', 'light'));
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 });
  await page.locator('.widget').first().waitFor({ state: 'visible' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: destination, type: 'jpeg', quality: 90, fullPage: false });
  console.log('Capture de Portal enregistrée : public/projects/portal.jpg (1600 × 1150).');
} finally {
  await browser.close();
}
