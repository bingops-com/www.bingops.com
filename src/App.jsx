import PortfolioNav from "./components/portfolio/PortfolioNav";
import Hero from "./components/portfolio/Hero";
import CareerSection from "./components/portfolio/CareerSection";
import ProjectShowcase from "./components/portfolio/ProjectShowcase";
import ContactForm from "./components/ContactForm";
import profile from "./portfolio.json";
import articles from "./articles.json";
import {
  FiArrowUpRight,
  FiLayers, FiGitBranch, FiActivity, FiShield,
} from "react-icons/fi";
import "./portfolio.css";

const skillIcons = [FiLayers, FiGitBranch, FiActivity, FiShield];

function App() {
  return (
    <div className="portfolio" id="top">
      <a className="skip-link" href="#main">Skip to content</a>
      <PortfolioNav />
      <main id="main">
        <Hero />

        <div className="specialties" aria-label="Areas of work">
          <div className="page-width">
            <span>Infrastructure as Code</span><span>GitOps</span><span>Observability</span><span>Security</span>
          </div>
        </div>

        <CareerSection />

        <ProjectShowcase />

        <section id="stacks" className="skills-section section-space" aria-labelledby="skills-title">
          <div className="page-width">
            <div className="section-heading"><div><p className="section-context">The toolkit</p><h2 id="skills-title">How I work.</h2></div><p>The technologies I bring together in my projects.</p></div>
            <div className="skills-grid">{profile.skills.map((group, index) => {
              const Icon = skillIcons[index];
              return <article className="skill-group" key={group.title}><Icon aria-hidden="true" /><h3>{group.title}</h3><p>{group.description}</p><ul className="tag-list">{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>;
            })}</div>
          </div>
        </section>

        <section id="articles" className="articles-section page-width section-space" aria-labelledby="articles-title">
          <div className="section-heading"><div><p className="section-context">Field notes</p><h2 id="articles-title">Things I’ve learned.</h2></div><a className="text-link" href={profile.blog} target="_blank" rel="noreferrer">Visit the blog <FiArrowUpRight aria-hidden="true" /></a></div>
          <div className="article-grid">{articles.map((article) => (
            <a className="article-card" key={article.link} href={article.link} target="_blank" rel="noreferrer">
              <div className="article-content"><p className="article-topic">{article.topic}</p><h3>{article.title}</h3><p>{article.content}</p><span className="article-read">Read article <FiArrowUpRight aria-hidden="true" /></span></div>
            </a>
          ))}</div>
        </section>

        <section id="contact" className="contact-section section-space" aria-labelledby="contact-title">
          <div className="page-width contact-layout">
            <div className="contact-copy"><p className="section-context">Get in touch</p><h2 id="contact-title">Let’s talk.</h2><p>Have a question about my work or a project to discuss? I’d be happy to hear from you.</p><p className="contact-address">{profile.email}</p></div>
            <ContactForm />
          </div>
        </section>
      </main>
      <div className="footer-navigation page-width"><nav aria-label="Page sections"><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#stacks">Skills</a><a href="#contact">Contact</a></nav><a className="text-link" href="#top">Back to top ↑</a></div>
      <footer className="portfolio-footer page-width">
        <a className="brand" href="#top" aria-label="BingOps, back to top">bing<span>ops</span><span className="brand-dot">.</span></a>
        <p className="footer-signature"><span>© {new Date().getFullYear()} {profile.name}</span></p>
        <nav aria-label="External links"><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.blog} target="_blank" rel="noreferrer">Blog</a><a href="https://app.hackthebox.com/users/189144" target="_blank" rel="noreferrer">Hack The Box</a><a href="https://tryhackme.com/p/Bingops" target="_blank" rel="noreferrer">TryHackMe</a></nav>
      </footer>
    </div>
  );
}

export default App;
