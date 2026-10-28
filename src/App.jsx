import PortfolioNav from "./components/portfolio/PortfolioNav";
import { useRef } from "react";
import Hero from "./components/portfolio/Hero";
import CareerSection from "./components/portfolio/CareerSection";
import usePortfolioMotion from "./components/portfolio/usePortfolioMotion";
import ProjectShowcase from "./components/portfolio/ProjectShowcase";
import ContactForm from "./components/ContactForm";
import profile from "./portfolio.json";
import articles from "./articles.json";
import {
  FiArrowUpRight, FiLinkedin,
  FiLayers, FiGitBranch, FiActivity, FiShield,
} from "react-icons/fi";
import LabMascot from "./components/portfolio/LabMascot";
import "./portfolio.css";

const skillIcons = [FiLayers, FiGitBranch, FiActivity, FiShield];

function App() {
  const rootRef = useRef(null);
  usePortfolioMotion(rootRef);
  return (
    <div className="portfolio" id="top" ref={rootRef}>
      <div className="reading-progress" aria-hidden="true" />
      <a className="skip-link" href="#main">Aller au contenu</a>
      <PortfolioNav />
      <main id="main">
        <Hero />

        <div className="specialties" aria-label="Mes domaines de travail">
          <div className="page-width">
            <span>Infrastructure as Code</span><span>GitOps</span><span>Observabilité</span><span>Sécurité</span>
          </div>
        </div>

        <ProjectShowcase />

        <CareerSection />

        <section id="stacks" className="skills-section section-space" aria-labelledby="skills-title">
          <div className="page-width">
            <div className="section-heading"><div><p className="section-context">La boîte à outils</p><h2 id="skills-title">De la machine au service.</h2></div><p>Les technologies que je réunis dans mes projets.</p></div>
            <div className="skills-grid">{profile.skills.map((group, index) => {
              const Icon = skillIcons[index];
              return <article className="skill-group" key={group.title}><Icon aria-hidden="true" /><h3>{group.title}</h3><p>{group.description}</p><ul className="tag-list">{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>;
            })}</div>
          </div>
        </section>

        <section id="articles" className="articles-section page-width section-space" aria-labelledby="articles-title">
          <div className="section-heading"><div><p className="section-context">Les notes de terrain</p><h2 id="articles-title">Expérimenter. Documenter. Partager.</h2></div><a className="text-link" href={profile.blog} target="_blank" rel="noreferrer">Tout le blog <FiArrowUpRight aria-hidden="true" /></a></div>
          <div className="article-grid">{articles.map((article) => (
            <a className="article-card" key={article.link} href={article.link} target="_blank" rel="noreferrer">
              <div className="article-image"><img src={article.imageURL} alt="" loading="lazy" width="600" height="360" /></div>
              <div className="article-content"><p className="article-topic">{article.topic}</p><h3>{article.title}</h3><p>{article.content}</p><span className="article-read">Lire l’article <FiArrowUpRight aria-hidden="true" /></span></div>
            </a>
          ))}</div>
        </section>

        <section id="contact" className="contact-section section-space" aria-labelledby="contact-title">
          <div className="page-width contact-layout">
            <div className="contact-copy"><p className="section-context">On en parle ?</p><h2 id="contact-title">Une idée.<br />Un projet.<br />Une conversation.</h2><p>Infrastructure, open source ou cybersécurité : je suis toujours partant pour échanger.</p><a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer"><FiLinkedin aria-hidden="true" /> Me retrouver sur LinkedIn <FiArrowUpRight aria-hidden="true" /></a></div>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="portfolio-footer page-width">
        <a className="brand" href="#top" aria-label="BingOps, retour en haut">bing<span>ops</span><span className="brand-dot">.</span></a>
        <p className="footer-signature"><LabMascot /><span>© {new Date().getFullYear()} {profile.name}</span></p>
        <nav aria-label="Liens externes"><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.blog} target="_blank" rel="noreferrer">Blog</a><a href="https://app.hackthebox.com/users/189144" target="_blank" rel="noreferrer">Hack The Box</a><a href="https://tryhackme.com/p/Bingops" target="_blank" rel="noreferrer">TryHackMe</a></nav>
      </footer>
    </div>
  );
}

export default App;
