import PortfolioNav from "./components/portfolio/PortfolioNav";
import InfrastructureMap from "./components/portfolio/InfrastructureMap";
import ProjectShowcase from "./components/portfolio/ProjectShowcase";
import ContactForm from "./components/ContactForm";
import profile from "./portfolio.json";
import articles from "./articles.json";
import {
  FiArrowDown, FiArrowUpRight, FiGithub, FiLinkedin, FiMapPin,
  FiLayers, FiGitBranch, FiActivity, FiShield,
} from "react-icons/fi";
import "./portfolio.css";

const skillIcons = [FiLayers, FiGitBranch, FiActivity, FiShield];

function App() {
  return (
    <div className="portfolio" id="top">
      <a className="skip-link" href="#main">Aller au contenu</a>
      <PortfolioNav />
      <main id="main">
        <section className="hero page-width" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="intro-name">Bonjour, moi c’est Corentin.</p>
            <h1 id="hero-title">DevOps &amp;<br />cybersécurité.</h1>
            <p className="hero-description">
              Je construis les outils qui font tourner mon lab.
              De l’infrastructure au code, j’aime automatiser,
              comprendre et partager.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explorer mes projets <FiArrowDown aria-hidden="true" /></a>
              <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">Mon GitHub <FiGithub aria-hidden="true" /></a>
            </div>
            <p className="hero-location"><FiMapPin aria-hidden="true" /> {profile.location}</p>
          </div>
          <InfrastructureMap />
        </section>

        <div className="specialties" aria-label="Mes domaines de travail">
          <div className="page-width">
            <span>Infrastructure as Code</span><span>GitOps</span><span>Observabilité</span><span>Sécurité</span>
          </div>
        </div>

        <ProjectShowcase />

        <section id="experience" className="experience-section page-width section-space" aria-labelledby="experience-title">
          <div className="section-heading">
            <div><p className="section-context">Le parcours</p><h2 id="experience-title">La technique, sur le terrain.</h2></div>
            <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">Parcours complet sur LinkedIn <FiArrowUpRight aria-hidden="true" /></a>
          </div>
          <div className="experience-layout">
            <div className="experience-intro">
              <p>Le cloud et la cybersécurité comme fil conducteur.</p>
              <span>Mes projets open source prolongent cette envie d’expérimenter et de comprendre les systèmes.</span>
            </div>
            <div className="experience-list">
              {profile.experiences.map((experience) => (
                <article className="experience-entry" key={experience.company + experience.role}>
                  <span className="experience-mark" aria-hidden="true">{experience.company.split(/\s+/).map((word) => word[0]).join("").slice(0, 2).toLowerCase()}.</span>
                  <div><p className="entry-type">Expérience professionnelle</p><h3>{experience.role || experience.company}</h3><p className="entry-company">{experience.role ? experience.company : experience.location}</p>
                    {experience.period && <p className="entry-period">{experience.period}</p>}
                    {experience.description && <p className="entry-description">{experience.description}</p>}
                    {experience.technologies.length > 0 && <ul className="tag-list">{experience.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>}
                  </div>
                </article>
              ))}
              {profile.education.map((education) => (
                <article className="education-entry" key={education.title}>
                  <FiShield aria-hidden="true" /><div><p className="entry-type">Formation · {education.qualification}</p><h3>{education.title}</h3>{education.school && <p className="entry-company">{education.school}</p>}{education.period && <p className="entry-period">{education.period}</p>}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

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
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <nav aria-label="Liens externes"><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.blog} target="_blank" rel="noreferrer">Blog</a><a href="https://app.hackthebox.com/users/189144" target="_blank" rel="noreferrer">Hack The Box</a><a href="https://tryhackme.com/p/Bingops" target="_blank" rel="noreferrer">TryHackMe</a></nav>
      </footer>
    </div>
  );
}

export default App;
