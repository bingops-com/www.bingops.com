import { expect, test } from "@playwright/test";

test("the introduction ends with the specialties at the bottom of the first screen", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  for (const language of ["en", "fr"]) {
    if (language === "fr") await page.getByRole("button", { name: "Passer en français", exact: true }).click();
    for (const [width, height] of [[1440, 900], [1366, 768], [1920, 1080], [768, 1024], [390, 844], [320, 740]]) {
      await page.setViewportSize({ width, height });
      await page.evaluate(() => window.scrollTo(0, 0));
      await expect.poll(() => page.locator(".specialties").evaluate((el) => Math.abs(el.getBoundingClientRect().bottom - innerHeight))).toBeLessThan(1);
      const positions = await page.evaluate(() => ({
        name: document.querySelector("h1").getBoundingClientRect().top,
        nameBottom: document.querySelector("h1").getBoundingClientRect().bottom,
        dynamicText: document.querySelector(".terminal-role").getBoundingClientRect().top,
        header: document.querySelector(".portfolio-header").getBoundingClientRect().bottom,
        description: document.querySelector(".hero-description").getBoundingClientRect().bottom,
        actionsTop: document.querySelector(".hero-actions").getBoundingClientRect().top,
        actions: document.querySelector(".hero-actions").getBoundingClientRect().bottom,
        socialsTop: document.querySelector(".hero-socials").getBoundingClientRect().top,
        career: document.querySelector("#experience").getBoundingClientRect().top,
        socials: document.querySelector(".hero-socials").getBoundingClientRect().bottom,
        banner: document.querySelector(".specialties").getBoundingClientRect().top,
        overflows: document.documentElement.scrollWidth > innerWidth,
      }));
      expect(positions.career).toBeGreaterThanOrEqual(height - 1);
      expect(positions.name - positions.header).toBeGreaterThanOrEqual(36);
      expect(Math.abs(positions.dynamicText - positions.nameBottom - 22)).toBeLessThan(1);
      expect(positions.actionsTop - positions.description).toBeLessThanOrEqual(width <= 620 ? 33 : 21);
      expect(positions.socialsTop - positions.actions).toBeGreaterThanOrEqual(width <= 620 ? 48 : 32);
      expect(positions.socialsTop - positions.actions).toBeLessThanOrEqual(width <= 620 ? 49 : 37);
      expect(positions.socials).toBeLessThanOrEqual(positions.banner);
      if (width <= 620) expect(positions.banner - positions.socials).toBeLessThanOrEqual(25);
      expect(positions.overflows).toBe(false);
    }
    await page.setViewportSize(testInfo.project.use.viewport);
    await page.screenshot({ path: testInfo.outputPath(`first-screen-${language}.png`) });
  }
});

test("internal sections follow content height and short screens preserve the complete content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const [width, height] of [[1440, 900], [390, 844], [320, 568], [844, 390]]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => document.fonts.ready);
    for (const id of ["experience", "projects", "stacks", "articles", "contact"]) {
      const section = page.locator(`#${id}`);
      expect(await section.evaluate((el) => getComputedStyle(el).minBlockSize)).toBe("0px");
      await section.evaluate((el) => el.scrollIntoView({ block: "start" }));
      await expect(section.getByRole("heading", { level: 2 })).toBeInViewport();
      const lastContent = await section.evaluate((el) => {
        const parent = el.getBoundingClientRect();
        const nodes = [...el.querySelectorAll("p, a, li, h2, h3")].filter((node) => !node.closest("dialog"));
        return nodes.every((node) => node.getBoundingClientRect().bottom <= parent.bottom + 1);
      });
      expect(lastContent).toBe(true);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    const opening = await page.locator(".opening-view").boundingBox();
    const header = await page.locator(".portfolio-header").boundingBox();
    expect(opening.height + header.height).toBeGreaterThanOrEqual(height - 1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
