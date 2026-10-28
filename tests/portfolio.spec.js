import { expect, test } from "@playwright/test";

test("les projets, les articles et la page restent utilisables sur chaque écran", async ({ page }, testInfo) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("DevOps");
  await expect(page.locator(".project-card")).toHaveCount(4);
  await expect(page.locator(".project-card h3")).toContainText(["LabOps", "Portal"]);
  await expect(page.locator(".article-card")).toHaveCount(3);
  await expect(page.getByRole("heading", { name: "SII", exact: true })).toBeVisible();
  await expect(page.getByText("IPSSI", { exact: true })).toBeVisible();
  await expect(page.locator(".hero-employment")).toHaveText("En CDI chez SII, actuellement en mission chez Thales.");
  await expect(page.locator('a[href="https://github.com/bingops-com/portal"]').first()).toBeVisible();
  await expect(page.locator("main")).not.toContainText("22-year-old");
  await page.evaluate(() => document.fonts.ready);
  await page.locator("img").evaluateAll((images) => Promise.all(images.map((image) => { image.loading = "eager"; return image.decode().catch(() => {}); })));
  const portalImage = page.locator(".project-portal img");
  await expect(portalImage).toHaveAttribute("src", "/projects/portal.jpg");
  await expect.poll(() => portalImage.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
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

test("le filtre ouvre une fiche projet accessible et Échap la referme", async ({ page }) => {
  await page.goto("/#projects");
  await page.getByRole("button", { name: "Applications", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.getByRole("button", { name: "Applications", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Découvrir Portal", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "Portal", exact: true })).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Voir le code" })).toHaveAttribute("href", "https://github.com/bingops-com/portal");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Découvrir Portal", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "Tous", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(4);
});

test("le thème se mémorise et une ancienne préférence invalide ne bloque pas la page", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.getByRole("button", { name: "Activer le thème sombre" }).click();
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

test("la navigation mobile se ferme et le blog pointe vers le vrai blog", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  const navigation = page.getByRole("navigation", { name: "Navigation principale" });
  await expect(navigation.getByRole("link", { name: "Blog", exact: true })).toHaveAttribute("href", "https://blog.bingops.com");
  await navigation.getByRole("link", { name: "Parcours", exact: true }).click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(page.getByRole("button", { name: "Ouvrir le menu" })).toHaveAttribute("aria-expanded", "false");
  await expect(navigation).not.toBeVisible();
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Ouvrir le menu" })).toBeFocused();
});

test("le formulaire conserve le message après un échec et confirme l’envoi réussi", async ({ page }) => {
  await page.goto("/#contact");
  const submit = page.getByRole("button", { name: "Envoyer mon message" });
  if (await submit.count() === 0) {
    await expect(page.locator(".contact-fallback")).toBeVisible();
    await expect(page.locator(".contact-fallback a")).toHaveAttribute("href", "https://www.linkedin.com/in/corentin-guyon/");
    return;
  }
  const message = "Bonjour Corentin, discutons de Kubernetes et de ton projet Portal.";
  let requests = 0;
  await page.route("https://api.emailjs.com/**", async (route) => {
    requests += 1;
    const body = route.request().postData();
    expect(body).toContain("Alex Martin");
    expect(body).toContain("alex@example.com");
    expect(body).toContain(message);
    await route.fulfill({ status: requests === 1 ? 500 : 200, contentType: "text/plain", body: requests === 1 ? "Unavailable" : "OK" });
  });
  await page.getByLabel("Ton nom", { exact: true }).fill("Alex Martin");
  await page.getByLabel("Ton adresse e-mail").fill("alex@example.com");
  await page.getByLabel("Ton message", { exact: true }).fill(message);
  await submit.click();
  await expect(page.getByRole("alert")).toContainText("L’envoi a échoué");
  await expect(page.getByLabel("Ton message", { exact: true })).toHaveValue(message);
  await submit.click();
  await expect(page.getByRole("status").filter({ hasText: "Message envoyé" })).toBeVisible();
  await expect(page.getByLabel("Ton message", { exact: true })).toHaveValue("");
  expect(requests).toBe(2);
});

test("les préférences d’accessibilité et un stockage bloqué laissent le contenu accessible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Storage disabled", "SecurityError"); } });
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Aller au contenu" })).toBeFocused();
  await page.getByRole("button", { name: "Activer le thème sombre" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
});


test("le workflow est interactif et les logos du parcours sont chargés", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const workflow = page.getByRole("group", { name: "Explorer les étapes du workflow" });
  const argo = workflow.getByRole("button", { name: /Argo CD/ });
  await argo.click();
  await expect(argo).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".terminal-command")).toContainText("argocd app list");
  await expect(page.locator(".terminal-detail")).toContainText("converger");
  const kubernetes = workflow.getByRole("button", { name: /Kubernetes/ });
  await kubernetes.focus();
  await page.keyboard.press("Enter");
  await expect(kubernetes).toHaveAttribute("aria-pressed", "true");
  await expect(argo).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator(".terminal-command")).toContainText("kubectl get pods -A");
  for (const name of ["SII", "Thales", "Radio France", "IPSSI"]) {
    const logo = page.getByRole("img", { name: "Logo " + name, exact: true }).first();
    await expect(logo).toBeVisible();
    await expect.poll(() => logo.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
  }
  expect(await page.locator(".terminal-scan").evaluate((element) => getComputedStyle(element).animationName)).toBe("terminal-scan");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await page.locator(".terminal-scan").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  expect(await page.locator(".scene-terminal").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
});
