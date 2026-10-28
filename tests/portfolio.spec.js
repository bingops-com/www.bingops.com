import { expect, test } from "@playwright/test";

test("projects, articles and content work on every screen", async ({ page }, testInfo) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("CorentinGuyon");
  await expect(page.locator(".hero-role")).toHaveText("DevOps & cybersecurity");
  const portrait = page.getByRole("img", { name: "Corentin Guyon", exact: true });
  await expect.poll(() => portrait.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator(".hero-stage video")).toHaveCount(0);
  await expect(page.locator(".project-card")).toHaveCount(3);
  await expect(page.locator(".project-card h3")).toContainText(["LabOps", "Portal"]);
  await expect(page.locator(".article-card")).toHaveCount(3);
  await expect(page.getByRole("heading", { name: "SII", exact: true })).toBeVisible();
  await expect(page.locator(".education-entry")).toContainText("IPSSI");
  for (const company of ["Radio France", "namR"]) await expect(page.getByRole("heading", { name: company, exact: true })).toBeVisible();
  await expect(page.locator("main")).not.toContainText("Upgrade Dental");
  await expect(page.getByRole("link", { name: "Download GIF" })).toHaveCount(0);
  await expect(page.locator(".hero-employment")).toHaveText("Permanent employee at SII, currently on assignment at Thales.");
  await expect(page.locator('a[href="https://github.com/bingops-com/portal"]').first()).toBeVisible();
  await expect(page.locator("main")).not.toContainText("22-year-old");
  await page.evaluate(() => document.fonts.ready);
  await page.locator("img").evaluateAll((images) => Promise.all(images.map((image) => { image.loading = "eager"; return image.decode().catch(() => {}); })));
  await expect(page.locator(".project-portal video")).toHaveAttribute("poster", "/projects/portal-demo-poster.jpg");
  await expect(page.getByRole("heading", { name: "Monitoring provisioning", exact: true })).toHaveCount(0);
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => {
      document.documentElement.dataset.theme = value;
      document.documentElement.classList.toggle("dark", value === "dark");
    }, theme);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath("portfolio-" + theme + ".png"), fullPage: true });
  }
  expect(errors).toEqual([]);
});

test("project filters and accessible details restore focus on Escape", async ({ page }) => {
  await page.goto("/#projects");
  await page.getByRole("button", { name: "Applications", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.getByRole("button", { name: "Applications", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Explore Portal", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "Portal", exact: true })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "View source" })).toHaveAttribute("href", "https://github.com/bingops-com/portal");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Explore Portal", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
});

test("theme persists and tolerates an invalid legacy preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const backgrounds = () => page.evaluate(() => ["body", ".portfolio-header", ".hero-stage", ".contact-section"].map((selector) => getComputedStyle(document.querySelector(selector)).backgroundColor));
  const lightBackgrounds = await backgrounds();
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const darkBackgrounds = await backgrounds();
  for (let index = 0; index < lightBackgrounds.length; index += 1) expect(darkBackgrounds[index]).not.toBe(lightBackgrounds[index]);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.evaluate(() => {
    localStorage.removeItem("theme");
    localStorage.setItem("darkMode", "invalid-json");
  });
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("mobile navigation closes and links to the real blog", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  await expect(navigation.getByRole("link", { name: "Blog", exact: true })).toHaveAttribute("href", "https://blog.bingops.com");
  await navigation.getByRole("link", { name: "Experience", exact: true }).click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
  await expect(navigation).not.toBeVisible();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});

test("contact form preserves failed messages and confirms successful delivery", async ({ page }) => {
  await page.goto("/#contact");
  const submit = page.getByRole("button", { name: "Send message" });
  if (await submit.count() === 0) {
    await expect(page.locator(".contact-fallback")).toBeVisible();
    await expect(page.locator(".contact-fallback a")).toHaveAttribute("href", "https://www.linkedin.com/in/corentin-guyon/");
    return;
  }
  const message = "Hi Corentin, let’s talk about Kubernetes and your Portal project.";
  let requests = 0;
  await page.route("https://api.emailjs.com/**", async (route) => {
    requests += 1;
    const body = route.request().postData();
    expect(body).toContain("Alex Martin");
    expect(body).toContain("alex@example.com");
    expect(body).toContain(message);
    await route.fulfill({ status: requests === 1 ? 500 : 200, contentType: "text/plain", body: requests === 1 ? "Unavailable" : "OK" });
  });
  await page.getByLabel("Your name", { exact: true }).fill("Alex Martin");
  await page.getByLabel("Email address").fill("alex@example.com");
  await page.getByLabel("Your message", { exact: true }).fill(message);
  await submit.click();
  await expect(page.getByRole("alert")).toContainText("Sending failed");
  await expect(page.getByLabel("Your message", { exact: true })).toHaveValue(message);
  await submit.click();
  await expect(page.getByRole("status").filter({ hasText: "Message sent" })).toBeVisible();
  await expect(page.getByLabel("Your message", { exact: true })).toHaveValue("");
  expect(requests).toBe(2);
});

test("accessibility preferences and blocked storage preserve content access", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Storage disabled", "SecurityError"); } });
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
});


test("normal-flow header leaves the viewport and footer navigation returns to the top", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("CorentinGuyon");
  await page.locator("#experience").scrollIntoViewIfNeeded();
  expect(await page.locator(".portfolio-header").evaluate((header) => header.getBoundingClientRect().bottom)).toBeLessThan(0);
  await page.getByRole("link", { name: "Back to top ↑", exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.getByRole("link", { name: "BingOps, home", exact: true })).toBeInViewport();
  for (const name of ["SII", "Thales", "Radio France", "IPSSI"]) {
    const logo = page.getByRole("img", { name: name + " logo", exact: true }).first();
    await expect.poll(() => logo.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
  }
});


test("Portal demo respects reduced motion and supports manual play and pause", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const demo = page.locator(".project-portal");
  const video = demo.locator("video");
  await video.scrollIntoViewIfNeeded();
  await expect(video).not.toHaveAttribute("src");
  expect(await video.evaluate((el) => el.paused)).toBe(true);
  await demo.getByRole("button", { name: "Play Portal demo" }).click();
  await expect.poll(() => video.evaluate((el) => el.currentTime)).toBeGreaterThan(0.1);
  await demo.getByRole("button", { name: "Pause Portal demo" }).click();
  await expect.poll(() => video.evaluate((el) => el.paused)).toBe(true);
});

test("Portal navigation plays when visible and pauses outside the viewport", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const video = page.locator(".project-portal video");
  await expect(video).not.toHaveAttribute("src");
  await video.scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((el) => el.currentTime)).toBeGreaterThan(0.1);
  await page.locator("#experience").scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((el) => el.paused)).toBe(true);
  await video.scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((el) => el.paused)).toBe(false);
  await page.locator(".project-portal").getByRole("button", { name: "Pause Portal demo" }).click();
  await expect.poll(() => video.evaluate((el) => el.paused)).toBe(true);
});

test("an unavailable video leaves the Portal poster accessible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/portal-demo.mp4", (route) => route.abort());
  await page.goto("/");
  const demo = page.locator(".project-portal");
  await demo.getByRole("button", { name: "Play Portal demo" }).click();
  await expect(demo.locator(".demo-poster")).toBeVisible();
  await expect(demo).toContainText("Video unavailable");
  await expect(page.getByRole("link", { name: "Download GIF" })).toHaveCount(0);
});

test("LabOps and Portal align their media and headings", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => { document.documentElement.dataset.theme = value; }, theme);
    const geometry = await page.locator(".project-labops, .project-portal").evaluateAll((cards) => cards.map((card) => ({
      mediaHeight: card.querySelector(".project-visual").getBoundingClientRect().height,
      headingOffset: card.querySelector("h3").getBoundingClientRect().top - card.getBoundingClientRect().top,
    })));
    expect(Math.abs(geometry[0].mediaHeight - geometry[1].mediaHeight)).toBeLessThanOrEqual(1);
    expect(Math.abs(geometry[0].headingOffset - geometry[1].headingOffset)).toBeLessThanOrEqual(1);
  }
});
