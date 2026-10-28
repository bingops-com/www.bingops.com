import { FiArrowDown, FiArrowUpRight, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi';
import profile from '../../portfolio.json';
import BrandLogo from './BrandLogo';

export default function Hero() {
  return (
    <section className="hero-stage" aria-labelledby="hero-title">
      <div className="hero page-width">
        <div className="hero-copy">
          <p className="intro-name">Hi, I’m</p>
          <h1 id="hero-title">Corentin<br />Guyon</h1>
          <p className="hero-role">DevOps &amp; cybersecurity</p>
          <p className="hero-description">I bring infrastructure, development and security together. I automate deployments, build practical tools and share what I learn.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#experience">My experience <FiArrowDown aria-hidden="true" /></a>
            <a className="text-link" href="#projects">Explore my work <FiArrowUpRight aria-hidden="true" /></a>
          </div>
          <nav className="hero-socials" aria-label="Corentin’s profiles"><a href={profile.linkedin} target="_blank" rel="noreferrer"><FiLinkedin aria-hidden="true" /> LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" /> GitHub</a></nav>
        </div>
        <figure className="hero-portrait">
          <div className="portrait-frame"><img src="/profile/corentin-guyon.jpg" alt="Corentin Guyon" width="400" height="400" fetchPriority="high" /></div>
          <figcaption><span>Infrastructure. Development. Security.</span><span><FiMapPin aria-hidden="true" /> {profile.location}</span></figcaption>
        </figure>
      </div>
      <div className="hero-bottom page-width">
        <div className="hero-company-logos"><BrandLogo name="SII" /><span aria-hidden="true">↗</span><BrandLogo name="Thales" /></div>
        <p className="hero-employment">{profile.employment.status}</p>
        <a className="hero-scroll" href="#experience">Get to know my background <FiArrowDown aria-hidden="true" /></a>
      </div>
    </section>
  );
}
