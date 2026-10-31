import { useEffect, useMemo, useState } from "react";
import { LanguageContext } from "./LanguageContext";
import french from "./locales/fr";
import profile from "./portfolio.json";
import projects from "./projects.json";
import articles from "./articles.json";

function readLanguage() {
  try { return localStorage.getItem("language") === "fr" ? "fr" : "en"; }
  catch { return "en"; }
}

function translateContent(value, t) {
  if (typeof value === "string") return t(value);
  if (Array.isArray(value)) return value.map((item) => translateContent(item, t));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateContent(item, t)]));
  }
  return value;
}

// Retain the source metadata so repeated language changes never translate a translation.
const metadata = [
  ['meta[name="description"]', "Corentin Guyon — DevOps engineer with training and a strong interest in cybersecurity. Permanent employee at SII, on assignment at Thales. Explore LabOps, Portal and my open source projects."],
  ['meta[property="og:title"]', "Corentin Guyon — DevOps"],
  ['meta[property="og:description"]', "Permanent employee at SII, on assignment at Thales. From infrastructure to code: LabOps, Portal and my open source projects."],
];

export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(readLanguage);
  const value = useMemo(() => {
    const t = (text) => language === "fr" ? french[text] ?? text : text;
    return {
      language, setLanguage, t,
      profile: translateContent(profile, t),
      projects: translateContent(projects, t),
      articles: translateContent(articles, t),
    };
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = value.t("Corentin Guyon — DevOps | BingOps");
    metadata.forEach(([selector, text]) => document.querySelector(selector)?.setAttribute("content", value.t(text)));
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", language === "fr" ? "fr_FR" : "en_GB");
    try { localStorage.setItem("language", language); } catch { /* Switching still works without storage. */ }
  }, [language, value]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
