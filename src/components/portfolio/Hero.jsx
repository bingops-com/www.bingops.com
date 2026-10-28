import { FiArrowDown, FiArrowUpRight, FiGithub, FiMapPin } from 'react-icons/fi';
import profile from '../../portfolio.json';
import BrandLogo from './BrandLogo';
import LabScene from './LabScene';

export default function Hero() {
  return (
    <section className="hero-stage" aria-labelledby="hero-title">
      <div className="hero page-width">
        <div className="hero-copy">
          <p className="intro-name"><span className="intro-spark" aria-hidden="true">✳</span> Bonjour, moi c’est Corentin.</p>
          <h1 id="hero-title">DevOps &amp;<br />cybersécurité.</h1>
          <p className="hero-description">Je construis les outils qui font tourner mon lab. De l’infrastructure au code, j’aime automatiser, comprendre et partager.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">Explorer mes projets <FiArrowUpRight aria-hidden="true" /></a>
            <a className="text-link" href={profile.github} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" /> Mon GitHub</a>
          </div>
          <p className="hero-location"><FiMapPin aria-hidden="true" /> {profile.location}</p>
        </div>
        <LabScene />
      </div>
      <div className="hero-bottom page-width">
        <div className="hero-work">
          <div className="hero-company-logos"><BrandLogo name="SII" /><span aria-hidden="true">↗</span><BrandLogo name="Thales" /></div>
          <p className="hero-employment"><span className="employment-dot" aria-hidden="true" /><span>{profile.employment.status}</span></p>
        </div>
        <a className="hero-scroll" href="#projects">La suite, juste ici <span><FiArrowDown aria-hidden="true" /></span></a>
      </div>
    </section>
  );
}
