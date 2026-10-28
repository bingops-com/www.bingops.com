import { useEffect, useState } from "react";
import { FiArrowUpRight, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import profile from "../../portfolio.json";

const links = [["#projects", "Projets"], ["#experience", "Parcours"], ["#stacks", "Compétences"], ["#articles", "Articles"]];

function readTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    const legacy = localStorage.getItem("darkMode");
    if (legacy === "true") return "dark";
    if (legacy === "false") return "light";
  } catch { /* Storage may be disabled by the browser. */ }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function PortfolioNav() {
  const [theme, setTheme] = useState(readTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
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
    <header className="portfolio-header">
      <div className="page-width header-inner">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)} aria-label="BingOps, accueil">bing<span>ops</span><span className="brand-dot">.</span></a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} id="main-navigation" aria-label="Navigation principale">
          {links.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a href={profile.blog} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Blog <FiArrowUpRight aria-hidden="true" /></a>
          <a className="mobile-contact" href="#contact" onClick={() => setMenuOpen(false)}>Me contacter</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button" type="button" aria-label={theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
          </button>
          <a className="button button-small header-contact" href="#contact">Discutons <FiArrowUpRight aria-hidden="true" /></a>
          <button id="mobile-menu-toggle" className="icon-button menu-toggle" type="button" aria-controls="main-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
