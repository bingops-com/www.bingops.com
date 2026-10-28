import { chromium } from '@playwright/test';
import { spawnSync } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const url = process.env.PORTAL_CAPTURE_URL || 'http://portal.portal.svc.cluster.local:3000/';
const ffmpeg = process.env.FFMPEG || 'ffmpeg';
const destination = fileURLToPath(new URL('../public/projects/', import.meta.url));
const scratch = await mkdtemp(join(tmpdir(), 'portfolio-portal-demo-'));
const run = (args) => {
  const result = spawnSync(ffmpeg, args, { encoding: 'utf8' });
  if (result.error || result.status !== 0) throw new Error(result.error?.message || result.stderr);
  return result.stderr;
};
run(['-version']);
const browser = await chromium.launch({
  ...(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}),
  args: ['--no-sandbox'],
});
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    recordVideo: { dir: scratch, size: { width: 1440, height: 1000 } },
  });
  await context.addInitScript(() => localStorage.setItem('portal-theme', 'light'));
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 });
  await page.locator('.widget').first().waitFor({ state: 'visible' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  await page.screenshot({ path: join(destination, 'portal-demo-poster.jpg'), type: 'jpeg', quality: 90 });
  const start = Date.now();
  await page.waitForTimeout(2200);
  await page.locator('.band nav a[href="/cluster"]').click();
  await page.waitForTimeout(2300);
  await page.evaluate(() => window.scrollBy({ top: 350, behavior: 'smooth' }));
  await page.waitForTimeout(1700);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(500);
  await page.locator('.band nav a[href="/fiabilite"]').click();
  await page.waitForTimeout(2400);
  await page.locator('.band nav a[href="/"]').click();
  await page.waitForTimeout(2200);
  const duration = (Date.now() - start) / 1000;
  const video = page.video();
  await context.close();
  const raw = await video.path();
  const tail = ['-sseof', (-duration).toFixed(3), '-i', raw];
  run(['-y', ...tail, '-an', '-vf', 'fps=24', '-c:v', 'libx264', '-preset', 'fast', '-crf', '25', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', join(destination, 'portal-demo.mp4')]);
  console.log(`Portal navigation captured: ${duration.toFixed(1)} seconds, MP4 + poster in public/projects/.`);
} finally {
  await browser.close();
  await rm(scratch, { recursive: true, force: true });
}
