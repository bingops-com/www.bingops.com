import { expect, test } from "@playwright/test";

test.use({ locale: "fr-FR", reducedMotion: "reduce" });

test("English is the default and EN/FR translates content, project filters and details", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator(".language-toggle .is-active")).toHaveText("EN");
  await page.getByRole("button", { name: "Security", exact: true }).click();
  await page.getByRole("button", { name: "Passer en français", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page).toHaveTitle(/DevOps/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Découvrez LabOps/);
  await expect(page.locator(".language-toggle .is-active")).toHaveText("FR");
  await expect(page.locator(".hero-description")).toContainText("Je suis ingénieur DevOps, avec une formation en cybersécurité");
  await expect(page.locator(".career-date").first()).toHaveText("Févr. 2026Aujourd’hui");
  await expect(page.locator(".experience-highlights").first()).toContainText("Tests et déploiement d’applications avec Helm");
  await expect(page.locator(".education-entry").first()).toContainText("Cybersécurité & Cloud computing");
  await expect(page.locator(".skill-group").first()).toContainText("Construire l’infrastructure");
  await expect(page.locator(".article-card").first()).toContainText("Déployer un serveur Project Zomboid");
  await expect(page.getByRole("button", { name: "Sécurité", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("status")).toHaveText("1 projet");
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Découvrir CVE-2025-1974", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "Les choix techniques", exact: true })).toBeVisible();
  await expect(dialog).toContainText("Une requête AdmissionReview conçue pour tester le chemin d’injection.");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Découvrir CVE-2025-1974", exact: true })).toBeFocused();

  await page.getByRole("button", { name: "Switch to English", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle(/DevOps/);
  await expect(page.getByRole("button", { name: "Security", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("status")).toHaveText("1 project");
  await expect(page.locator(".hero-description")).toContainText("I’m a DevOps engineer, with training and a strong interest in cybersecurity.");
  expect(errors).toEqual([]);
});

test("language choice survives reloads and unsupported stored values fall back to English", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Passer en français", exact: true }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await page.getByRole("button", { name: "Switch to English", exact: true }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.evaluate(() => localStorage.setItem("language", "de"));
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("language switching works with storage disabled and French mobile navigation works", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Storage disabled", "SecurityError"); } });
  });
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Passer en français", exact: true })).toBeFocused();
  await page.keyboard.press("Space");
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await page.getByRole("button", { name: "Ouvrir le menu", exact: true }).click();
  await page.getByRole("navigation", { name: "Navigation principale", exact: true }).getByRole("link", { name: "Expérience", exact: true }).click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(page.getByRole("button", { name: "Ouvrir le menu", exact: true })).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: "Passer au thème sombre", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to English", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("the French header fits every layout and project media labels are translated", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Passer en français", exact: true }).click();
  for (const width of [320, 390, 768, 901, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => document.fonts.ready);
    const toggle = page.getByRole("button", { name: "Switch to English", exact: true });
    await expect(toggle).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const headerFits = await page.locator(".header-inner").evaluate((header) => [...header.children].every((child) => {
      const rect = child.getBoundingClientRect();
      return !rect.width || (rect.x >= 0 && rect.right <= innerWidth);
    }));
    expect(headerFits).toBe(true);
  }
  await expect(page.getByRole("img", { name: /^Maquette animée/ })).toBeVisible();
  await page.getByRole("button", { name: "Découvrir Portal", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("Navigation enregistrée · Interface française d’origine");
  await expect(page.getByRole("button", { name: "Lire la démo Portal", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await page.setViewportSize(testInfo.project.use.viewport);
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => { document.documentElement.dataset.theme = value; }, theme);
    await page.screenshot({ path: testInfo.outputPath(`portfolio-fr-${theme}.png`), fullPage: true });
  }
});
