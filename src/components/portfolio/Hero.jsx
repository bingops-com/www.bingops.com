import { FiArrowDown, FiArrowUpRight, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi';
import profile from '../../portfolio.json';
import TerminalRole from './TerminalRole';

export default function Hero() {
  return (
    <section className="hero-stage" aria-labelledby="hero-title">
      <div className="hero page-width">
        <div className="hero-copy">
          <h1 id="hero-title">Corentin<br />Guyon</h1>
          <TerminalRole />
          <p className="hero-description">{profile.introduction}</p>
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
        <dl className="hero-employment" aria-label="Current employment">
          <div><dt>Employer</dt><dd><strong className="employment-employer">{profile.employment.employer}</strong><span>Permanent employment</span></dd></div>
          <div><dt>Client assignment</dt><dd><strong className="employment-client">{profile.employment.client}</strong><span>Current assignment</span></dd></div>
        </dl>
        <a className="hero-scroll" href="#experience">Get to know my background <FiArrowDown aria-hidden="true" /></a>
      </div>
    </section>
  );
}
