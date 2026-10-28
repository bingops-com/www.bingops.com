import { chromium } from '@playwright/test';
import { spawnSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const url = process.env.PORTAL_CAPTURE_URL || 'http://portal.portal.svc.cluster.local:3000/';
const ffmpeg = process.env.FFMPEG || 'ffmpeg';
const destination = fileURLToPath(new URL('../public/projects/', import.meta.url));
const run = (args) => {
  const result = spawnSync(ffmpeg, args, { encoding: 'utf8' });
  if (result.error || result.status !== 0) throw new Error(result.error?.message || result.stderr);
};
run(['-version']);
const scratch = await mkdtemp(join(tmpdir(), 'portfolio-portal-demo-'));
const browser = await chromium.launch({
  ...(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}),
  args: ['--no-sandbox'],
});
let capturing = false;
let captureTask;
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, colorScheme: 'light' });
  await context.addInitScript(() => localStorage.setItem('portal-theme', 'light'));
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 });
  await page.locator('.widget').first().waitFor({ state: 'visible' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  await page.screenshot({ path: join(destination, 'portal-demo-poster.jpg'), type: 'jpeg', quality: 95 });
  const frames = [];
  const start = performance.now();
  capturing = true;
  // Preserve crisp UI text by capturing PNG frames before the single H.264 encode.
  captureTask = (async () => {
    while (capturing) {
      const timestamp = performance.now();
      const filename = `frame-${String(frames.length).padStart(4, '0')}.png`;
      await page.screenshot({ path: join(scratch, filename), type: 'png' });
      frames.push({ filename, timestamp });
      await page.waitForTimeout(Math.max(0, 85 - (performance.now() - timestamp)));
    }
  })();
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
  capturing = false;
  await captureTask;
  const end = performance.now();
  const manifest = frames.map((frame, index) => `file '${frame.filename}'\nduration ${((frames[index + 1]?.timestamp || end) - frame.timestamp) / 1000}`).join('\n') + `\nfile '${frames.at(-1).filename}'\n`;
  const manifestPath = join(scratch, 'frames.txt');
  await writeFile(manifestPath, manifest);
  run(['-y', '-f', 'concat', '-safe', '0', '-i', manifestPath, '-an', '-r', '24', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', join(destination, 'portal-demo.mp4')]);
  console.log(`Portal navigation captured: ${((end - start) / 1000).toFixed(1)} seconds, ${frames.length} PNG source frames, 1280 × 900 MP4 + poster.`);
} finally {
  capturing = false;
  await captureTask?.catch(() => {});
  await browser.close();
  await rm(scratch, { recursive: true, force: true });
}
