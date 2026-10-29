import { expect, test } from "@playwright/test";

test("projects, articles and content work on every screen", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("CorentinGuyon");
  await expect(page.getByRole("group", { name: "DevOps skills" })).toBeVisible();
  await expect(page.locator(".hero-stage")).not.toContainText("Hi, I’m");
  const portrait = page.getByRole("img", { name: "Corentin Guyon", exact: true });
  await expect.poll(() => portrait.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator(".hero-stage video")).toHaveCount(0);
  await expect(page.locator(".project-card")).toHaveCount(3);
  await expect(page.locator(".project-card h3")).toContainText(["LabOps", "Portal"]);
  await expect(page.locator(".article-card")).toHaveCount(3);
  await expect(page.getByRole("heading", { name: "SII", exact: true })).toBeVisible();
  await expect(page.locator(".education-entry")).toHaveCount(2);
  await expect(page.locator(".education-entry")).toContainText(["IPSSI", "IPSSI"]);
  await expect(page.getByRole("heading", { name: "Cybersecurity & Cloud computing", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Administration Système & Sécurité Réseaux / secOps", exact: true })).toBeVisible();
  const radio = page.locator(".experience-entry").filter({ has: page.getByRole("heading", { name: "Radio France", exact: true }) });
  await expect(radio).toContainText("DevOps Engineer");
  await expect(page.locator(".career-period").filter({ has: radio }).locator(".career-date")).toHaveAttribute("aria-label", "Oct 2023 – Sep 2025");
  await expect(radio).toContainText("Kubernetes clusters using Helm");
  const namr = page.locator(".experience-entry").filter({ has: page.getByRole("heading", { name: "namR", exact: true }) });
  await expect(namr).toContainText("Systems Administrator");
  await expect(page.locator(".career-period").filter({ has: namr }).locator(".career-date")).toHaveAttribute("aria-label", "Sep 2022 – Sep 2023");
  await expect(namr).toContainText("Greenbone");
  for (const company of ["Radio France", "namR"]) await expect(page.getByRole("heading", { name: company, exact: true })).toBeVisible();
  await expect(page.locator("main")).not.toContainText("Upgrade Dental");
  await expect(page.getByRole("link", { name: "Download GIF" })).toHaveCount(0);
  await expect(page.locator(".hero-employment")).toHaveCount(0);
  await expect(page.locator(".career-period-current .career-date")).toHaveAttribute("aria-label", "Feb 2026 – Today");
  await expect(page.locator(".experience-current .client-assignment")).toContainText("Client assignment");
  await expect(page.locator(".experience-current .client-assignment")).toContainText("Thales");
  const cveImage = page.locator(".project-security .project-image");
  await expect(cveImage).toBeVisible();
  await expect(page.locator('a[href="https://github.com/bingops-com/portal"]').first()).toBeVisible();
  await expect(page.locator("main")).not.toContainText("22-year-old");
  await page.evaluate(() => document.fonts.ready);
  for (const [company, programme] of [
    ["Radio France", "Cybersecurity & Cloud computing"],
    ["namR", "Administration Système & Sécurité Réseaux / secOps"],
  ]) {
    const period = page.getByRole("group", { name: new RegExp(`education and work-study at ${company}$`) });
    await expect(period.getByRole("heading", { name: company, exact: true })).toBeVisible();
    await expect(period.getByRole("heading", { name: programme, exact: true })).toBeVisible();
    await expect(period).toContainText(`Work-study at ${company}`);
    const education = await period.locator(".education-entry").boundingBox();
    const experience = await period.locator(".experience-entry").boundingBox();
    if (page.viewportSize().width > 620) {
      expect(Math.abs(education.y - experience.y)).toBeLessThan(1);
      expect(experience.x + experience.width).toBeLessThan(education.x);
      const row = await period.boundingBox();
      const middle = row.x + row.width / 2;
      expect(experience.x + experience.width).toBeLessThan(middle);
      expect(education.x).toBeGreaterThan(middle);
    } else {
      expect(experience.y + experience.height).toBeLessThanOrEqual(education.y);
    }
  }

  await page.locator("img").evaluateAll((images) => Promise.all(images.map((image) => { image.loading = "eager"; return image.decode().catch(() => {}); })));
  await expect.poll(() => cveImage.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator(".project-portal video")).toHaveCount(0);
  await expect(page.getByRole("img", { name: /Animated wireframe of Portal/ })).toBeVisible();
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
  for (const heading of ["The problem", "Engineering choices", "What it delivers"]) {
    await expect(dialog.getByRole("heading", { name: heading, exact: true })).toBeVisible();
  }
  await expect(dialog.getByRole("link", { name: "View source" })).toHaveAttribute("href", "https://github.com/bingops-com/portal");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Explore Portal", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(3);
});

test("light is the default despite a dark system preference and saved themes persist", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
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

test("contact actions open LinkedIn from the open contact section", async ({ page, context }) => {
  await page.goto("/#contact");
  await expect(page.getByRole("heading", { name: "Let’s connect.", exact: true })).toBeVisible();
  await expect(page.locator(".contact-copy .contact-address")).toHaveText("travail.corentinguyon@gmail.com");
  const button = page.getByRole("link", { name: "Message me on LinkedIn", exact: true });
  await expect(button).toHaveAttribute("href", "https://www.linkedin.com/in/corentin-guyon/");
  await expect(button).toHaveAttribute("target", "_blank");
  await expect(page.locator(".header-contact")).toHaveAttribute("href", "https://www.linkedin.com/in/corentin-guyon/");
  await expect(page.locator(".header-contact")).toContainText("Let’s connect");
  await context.route("https://www.linkedin.com/**", route => route.fulfill({ contentType: "text/html", body: "<title>LinkedIn destination</title>" }));
  const popupPromise = page.waitForEvent("popup");
  await button.click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL("https://www.linkedin.com/in/corentin-guyon/");
  await popup.close();
});

test("experience contributions stay visible in one continuous list", async ({ page }) => {
  await page.goto("/#experience");
  const period = page.getByRole("group", { name: /education and work-study at Radio France$/ });
  await period.scrollIntoViewIfNeeded();
  const contributions = period.getByRole("list", { name: "Responsibilities at Radio France" });
  await expect(contributions.getByRole("listitem")).toHaveCount(4);
  for (const contribution of await contributions.getByRole("listitem").all()) await expect(contribution).toBeVisible();
  await expect(period.getByRole("button", { name: /details/i })).toHaveCount(0);
  if (page.viewportSize().width <= 620) {
    const logo = await period.locator(".experience-logo").boundingBox();
    const company = await period.getByRole("heading", { name: "Radio France", exact: true }).boundingBox();
    expect(company.x).toBeGreaterThan(logo.x + logo.width);
    expect(company.y).toBeLessThan(logo.y + logo.height + 8);
    for (const selector of [".hero-socials a", ".footer-navigation a", ".portfolio-footer nav a"]) {
      for (const link of await page.locator(selector).all()) expect((await link.boundingBox()).height).toBeGreaterThanOrEqual(44);
    }
  }
});

test("accessibility preferences and blocked storage preserve content access", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Storage disabled", "SecurityError"); } });
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
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
  await page.getByRole("button", { name: "Explore Portal", exact: true }).click();
  const demo = page.getByRole("dialog");
  const video = demo.locator("video");
  await video.scrollIntoViewIfNeeded();
  await expect(video).not.toHaveAttribute("src");
  expect(await video.evaluate((el) => el.paused)).toBe(true);
  await demo.getByRole("button", { name: "Play Portal demo" }).click();
  await expect.poll(() => video.evaluate((el) => el.currentTime)).toBeGreaterThan(0.1);
  await demo.getByRole("button", { name: "Pause Portal demo" }).click();
  await expect.poll(() => video.evaluate((el) => el.paused)).toBe(true);
});

test("Portal playback is scoped to project details and stops on close", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("video")).toHaveCount(0);
  await page.getByRole("button", { name: "Explore Portal", exact: true }).click();
  const video = page.getByRole("dialog").locator("video");
  await video.scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((el) => el.currentTime)).toBeGreaterThan(0.1);
  const media = await video.elementHandle();
  await page.keyboard.press("Escape");
  await expect(page.locator("video")).toHaveCount(0);
  await expect.poll(() => media.evaluate((el) => el.paused)).toBe(true);
});

test("an unavailable video leaves the Portal poster accessible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/portal-demo.mp4", (route) => route.abort());
  await page.goto("/");
  await page.getByRole("button", { name: "Explore Portal", exact: true }).click();
  const demo = page.getByRole("dialog");
  await demo.getByRole("button", { name: "Play Portal demo" }).click();
  await expect(demo.locator(".demo-poster")).toBeVisible();
  await expect(demo).toContainText("Video unavailable");
  await expect(page.getByRole("link", { name: "Download GIF" })).toHaveCount(0);
});

test("Portal wireframe opens project details with the recorded demo", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const preview = page.getByRole("img", { name: /Animated wireframe of Portal/ });
  await preview.scrollIntoViewIfNeeded();
  const initialWidth = await preview.evaluate((el) => el.getBoundingClientRect().width);
  if (testInfo.project.name === "desktop") expect(initialWidth).toBeLessThan(650);
  const explore = page.getByRole("button", { name: "Explore Portal", exact: true });
  await explore.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const video = dialog.locator("video");
  expect(await video.evaluate((el) => el.controls)).toBe(true);
  if (testInfo.project.name === "desktop") expect(await video.evaluate((el) => el.getBoundingClientRect().width)).toBeGreaterThan(initialWidth * 1.3);
  await dialog.getByRole("button", { name: "Play Portal demo" }).click();
  await expect.poll(() => video.evaluate((el) => el.currentTime)).toBeGreaterThan(0.1);
  expect(await video.evaluate((el) => el.videoWidth)).toBe(1280);
  await video.evaluate((el) => el.pause());
  await expect(dialog.getByRole("button", { name: "Play Portal demo" })).toBeVisible();
  await dialog.getByRole("button", { name: "Play Portal demo" }).click();
  await expect.poll(() => video.evaluate((el) => el.paused)).toBe(false);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(explore).toBeFocused();
});

test("the inline heading types coloured tools and soft skills", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const terminal = page.getByRole("group", { name: "DevOps skills" });
  const technology = terminal.locator(".terminal-tech");
  await expect(technology).toHaveText("Terraform", { timeout: 4000 });
  await expect(terminal.locator(".terminal-role-line")).toHaveText("Terraform");
  const terraformColour = await technology.evaluate((el) => getComputedStyle(el).color);
  await expect(technology).toHaveText("Kubernetes", { timeout: 10000 });
  const kubernetesColour = await technology.evaluate((el) => getComputedStyle(el).color);
  if (page.viewportSize().width <= 620) {
    const word = await terminal.locator(".typing-caret").boundingBox();
    const photo = await page.locator(".portrait-frame").boundingBox();
    expect(word.x + word.width).toBeLessThan(photo.x);
  }
  await expect(terminal.locator(".sr-only")).toContainText("Ansible, Cloud, Audits");
  await expect(terminal).not.toContainText("Communication");
  expect(terraformColour).not.toBe(kubernetesColour);
  await expect(technology).toHaveText("Ansible", { timeout: 10000 });
  await expect(terminal.getByRole("button")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(terminal.locator(".terminal-role-line")).toHaveText("Ansible");
  await page.waitForTimeout(200);
  await expect(terminal.locator(".terminal-role-line")).toHaveText("Ansible");
  expect(await terminal.locator(".typing-caret").evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
});

test("Portal wireframe animates in view and respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const wireframe = page.locator(".portal-wireframe");
  await wireframe.scrollIntoViewIfNeeded();
  await expect.poll(() => wireframe.locator(".pw-overview").evaluate((el) => Number(getComputedStyle(el).opacity))).toBeGreaterThan(0.9);
  await expect.poll(() => wireframe.locator(".pw-cluster").evaluate((el) => Number(getComputedStyle(el).opacity)), { timeout: 7000 }).toBeGreaterThan(0.9);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => wireframe.locator(".pw-overview").evaluate((el) => Number(getComputedStyle(el).opacity))).toBe(1);
  expect(await wireframe.locator(".pw-cluster").evaluate((el) => Number(getComputedStyle(el).opacity))).toBe(0);
});


test("the mobile portrait spans the name and short dynamic skills", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const portrait = await page.locator(".portrait-frame").boundingBox();
    const name = await page.getByRole("heading", { level: 1 }).boundingBox();
    const role = await page.locator(".terminal-role").boundingBox();
    const caret = await page.locator(".typing-caret").boundingBox();
    expect(Math.abs(portrait.y - name.y)).toBeLessThan(1);
    expect(Math.abs(portrait.y + portrait.height - role.y - role.height)).toBeLessThan(1);
    expect(role.x + role.width).toBeLessThan(portrait.x);
    expect(caret.x + caret.width).toBeLessThan(portrait.x);
    expect(portrait.width).toBeLessThanOrEqual(120);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});


test("scroll reveals career periods and important sections progressively", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const radio = page.getByRole("group", { name: /education and work-study at Radio France$/ });
  const namr = page.getByRole("group", { name: /education and work-study at namR$/ });
  const project = page.locator(".project-labops");
  const skill = page.locator(".skill-group").first();
  const article = page.locator(".article-card").first();
  const contact = page.locator(".contact-layout");
  await expect(namr).toHaveAttribute("data-reveal-state", "pending");
  await expect(namr).toHaveCSS("opacity", "0");
  await expect(project).toHaveCSS("opacity", "0");
  for (const target of [radio, namr, project, skill, article, contact]) {
    await target.scrollIntoViewIfNeeded();
    await expect(target).toHaveAttribute("data-reveal-state", "shown");
    await expect(target).toHaveCSS("opacity", "1");
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  for (const target of [radio, namr, project, skill, article, contact]) {
    await expect(target).toHaveAttribute("data-reveal-state", "shown");
    await expect(target).toHaveCSS("opacity", "1");
    await expect(target).toHaveCSS("transition-duration", "0s");
  }
});
