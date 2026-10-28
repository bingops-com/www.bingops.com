import { FiArrowDown, FiArrowUpRight, FiGithub, FiMapPin } from 'react-icons/fi';
import profile from '../../portfolio.json';
import BrandLogo from './BrandLogo';

export default function Hero() {
  return (
    <section className="hero-stage" aria-labelledby="hero-title">
      <div className="hero page-width">
        <div className="hero-copy">
          <p className="intro-name">Corentin Guyon / BingOps</p>
          <h1 id="hero-title">DevOps &amp;<br /><span>cybersecurity.</span></h1>
        </div>
        <div className="hero-summary">
          <p className="hero-description">I build the tools that run my lab. From infrastructure to code, I automate, experiment and share what I learn.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">Explore my projects <FiArrowUpRight aria-hidden="true" /></a>
            <a className="text-link" href={profile.github} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" /> GitHub</a>
          </div>
          <p className="hero-location"><FiMapPin aria-hidden="true" /> {profile.location}</p>
        </div>
      </div>
      <div className="hero-bottom page-width">
        <div className="hero-work">
          <div className="hero-company-logos"><BrandLogo name="SII" /><span aria-hidden="true">↗</span><BrandLogo name="Thales" /></div>
          <p className="hero-employment"><span className="employment-dot" aria-hidden="true" /><span>{profile.employment.status}</span></p>
        </div>
        <a className="hero-scroll" href="#projects">Selected work <span><FiArrowDown aria-hidden="true" /></span></a>
      </div>
    </section>
  );
}
