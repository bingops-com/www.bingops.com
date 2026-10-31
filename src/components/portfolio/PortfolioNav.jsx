import { useLanguage } from "../../LanguageContext";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

const links = [["#experience", "Experience"], ["#projects", "Projects"], ["#stacks", "Skills"], ["#articles", "Articles"]];

function readTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    const legacy = localStorage.getItem("darkMode");
    if (legacy === "true") return "dark";
    if (legacy === "false") return "light";
  } catch { /* Storage may be disabled by the browser. */ }
  return "light";
}

export default function PortfolioNav() {
  const { t, profile, language, setLanguage } = useLanguage();
  const [theme, setTheme] = useState(readTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    const portfolio = header.closest(".portfolio");
    const measure = () => portfolio.style.setProperty("--portfolio-header-height", `${header.getBoundingClientRect().height}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    return () => {
      observer.disconnect();
      portfolio.style.removeProperty("--portfolio-header-height");
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#18191b" : "#f2f3f1");
    document.documentElement.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem("theme", theme); } catch { /* The theme still works without storage. */ }
  }, [theme]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("mobile-menu-toggle")?.focus();
      }
    };
    if (menuOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  return (
    <header className="portfolio-header" ref={headerRef}>
      <div className="page-width header-inner">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)} aria-label={t('BingOps, home')}>bing<span>ops</span><span className="brand-dot">.</span></a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} id="main-navigation" aria-label={t('Main navigation')}>
          {links.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{t(label)}</a>)}
          <a href={profile.blog} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Blog <FiArrowUpRight aria-hidden="true" /></a>
          <a className="mobile-contact" href={profile.linkedinMessage || profile.linkedin} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>{t("Let’s connect")}</a>
        </nav>
        <div className="header-actions">
          <button className="language-toggle" type="button" data-language={language} aria-pressed={language === "fr"} aria-label={language === "en" ? "Passer en français" : "Switch to English"} title={language === "en" ? "Passer en français" : "Switch to English"} onClick={() => setLanguage(language === "en" ? "fr" : "en")}>
            <span className="language-thumb" aria-hidden="true" />
            <span lang="en" className={language === "en" ? "is-active" : ""}>EN</span><span lang="fr" className={language === "fr" ? "is-active" : ""}>FR</span>
          </button>
          <button className="icon-button" type="button" aria-label={t(theme === "dark" ? "Switch to light theme" : "Switch to dark theme")} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
          </button>
          <a className="button button-small header-contact" href={profile.linkedinMessage || profile.linkedin} target="_blank" rel="noreferrer">{t("Let’s connect")} <FiArrowUpRight aria-hidden="true" /></a>
          <button id="mobile-menu-toggle" className="icon-button menu-toggle" type="button" aria-controls="main-navigation" aria-expanded={menuOpen} aria-label={t(menuOpen ? "Close menu" : "Open menu")} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
