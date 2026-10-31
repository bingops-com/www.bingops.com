import { useLanguage } from "./LanguageContext";
import { useRef } from "react";
import useScrollReveal from "./hooks/useScrollReveal";
import PortfolioNav from "./components/portfolio/PortfolioNav";
import Hero from "./components/portfolio/Hero";
import CareerSection from "./components/portfolio/CareerSection";
import ProjectShowcase from "./components/portfolio/ProjectShowcase";
import LinkedInContact from "./components/portfolio/LinkedInContact";
import {
  FiArrowUpRight,
  FiLayers, FiGitBranch, FiActivity, FiShield, FiCode,
} from "react-icons/fi";
import "./portfolio.css";

const skillIcons = [FiLayers, FiGitBranch, FiActivity, FiCode];

function App() {
  const { language, t, profile, articles } = useLanguage();
  const pageRef = useRef(null);
  useScrollReveal(pageRef, "[data-reveal]", language);
  return (
    <div className="portfolio" id="top" ref={pageRef}>
      <a className="skip-link" href="#main">{t('Skip to content')}</a>
      <PortfolioNav />
      <main id="main">
        <div className="opening-view">
          <Hero />

          <div className="specialties" aria-label={t('Areas of work')}>
            <div className="page-width">
              <span><FiLayers aria-hidden="true" /> {t('Infrastructure as Code')}</span><span><FiGitBranch aria-hidden="true" /> GitOps</span><span><FiActivity aria-hidden="true" /> {t('Observability')}</span><span><FiShield aria-hidden="true" /> {t('Security')}</span>
            </div>
          </div>
        </div>

        <CareerSection />

        <ProjectShowcase />

        <section id="stacks" className="skills-section section-space" aria-labelledby="skills-title">
          <div className="page-width">
            <div className="section-heading" data-reveal><div><p className="section-context">{t('The toolkit')}</p><h2 id="skills-title">{t('How I work.')}</h2></div><p>{t('The technologies I bring together in my projects.')}</p></div>
            <div className="skills-grid">{profile.skills.map((group, index) => {
              const Icon = skillIcons[index];
              return <article className="skill-group" key={group.title} data-reveal><Icon aria-hidden="true" /><h3>{group.title}</h3><p>{group.description}</p><ul className="tag-list">{group.items.map((item) => <li key={item} data-technology={item}>{item}</li>)}</ul></article>;
            })}</div>
          </div>
        </section>

        <section id="articles" className="articles-section page-width section-space" aria-labelledby="articles-title">
          <div className="section-heading" data-reveal><div><p className="section-context">{t('Field notes')}</p><h2 id="articles-title">{t('Things I’ve learned.')}</h2></div><a className="text-link" href={profile.blog} target="_blank" rel="noreferrer">{t("Visit the blog")} <FiArrowUpRight aria-hidden="true" /></a></div>
          <div className="article-grid">{articles.map((article) => (
            <a className="article-card" key={article.link} data-reveal href={article.link} target="_blank" rel="noreferrer">
              <div className="article-content"><p className="article-topic">{article.topic}</p><h3>{article.title}</h3><p>{article.content}</p><span className="article-read">{t("Read article")} <FiArrowUpRight aria-hidden="true" /></span></div>
            </a>
          ))}</div>
        </section>

        <section id="contact" className="contact-section section-space" aria-labelledby="contact-title">
          <div className="page-width contact-layout" data-reveal>
            <div className="contact-copy"><h2 id="contact-title">{t('Let’s connect.')}</h2><p>{t('Have a question about my work or a project to discuss? I’d be happy to hear from you.')}</p><p className="contact-address">{profile.email}</p></div>
            <LinkedInContact />
          </div>
        </section>
      </main>
      <div className="footer-navigation page-width"><nav aria-label={t('Page sections')}><a href="#experience">{t('Experience')}</a><a href="#projects">{t('Projects')}</a><a href="#stacks">{t('Skills')}</a><a href="#contact">{t('Contact')}</a></nav><a className="text-link" href="#top">{t('Back to top ↑')}</a></div>
      <footer className="portfolio-footer page-width">
        <a className="brand" href="#top" aria-label={t('BingOps, back to top')}>bing<span>ops</span><span className="brand-dot">.</span></a>
        <p className="footer-signature"><span>© {new Date().getFullYear()} {profile.name}</span></p>
        <nav aria-label={t('External links')}><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.blog} target="_blank" rel="noreferrer">Blog</a><a href="https://app.hackthebox.com/users/189144" target="_blank" rel="noreferrer">Hack The Box</a><a href="https://tryhackme.com/p/Bingops" target="_blank" rel="noreferrer">TryHackMe</a></nav>
      </footer>
    </div>
  );
}

export default App;
