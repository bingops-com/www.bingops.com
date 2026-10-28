import { FiArrowDown, FiArrowUpRight, FiGithub, FiMapPin, FiTerminal } from 'react-icons/fi';
import profile from '../../portfolio.json';
import projects from '../../projects.json';
import BrandLogo from './BrandLogo';
import ProjectDemo from './ProjectDemo';

const portal = projects.find((project) => project.kind === 'portal');

export default function Hero() {
  return (
    <section className="hero-stage" aria-labelledby="hero-title">
      <div className="hero page-width">
        <div className="hero-copy">
          <p className="intro-name"><span className="hero-prompt" aria-hidden="true">~/bingops</span> Hi, I’m Corentin.</p>
          <h1 id="hero-title">DevOps in practice.<br /><span className="hero-type-line">Built in my lab.</span></h1>
          <p className="hero-description">I build infrastructure, ship applications and document what I learn. My workshop for Kubernetes, GitOps and cybersecurity.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">Explore the lab <FiArrowUpRight aria-hidden="true" /></a>
            <a className="text-link" href={profile.github} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" /> GitHub</a>
          </div>
          <p className="hero-location"><FiMapPin aria-hidden="true" /> {profile.location}</p>
        </div>
        <div className="hero-workbench">
          <div className="workbench-heading"><span><FiTerminal aria-hidden="true" /> Inside the lab</span><a href={portal.link} target="_blank" rel="noreferrer">Portal on GitHub <FiArrowUpRight aria-hidden="true" /></a></div>
          <div className="workbench-window">
            <div className="workbench-bar"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>portal / lab workspace</span><span className="recording-label">Recorded demo</span></div>
            <ProjectDemo project={portal} />
          </div>
          <div className="workbench-projects"><a href={projects[0].link} target="_blank" rel="noreferrer"><span>LabOps</span> Infrastructure as Code <FiArrowUpRight aria-hidden="true" /></a><a href={portal.link} target="_blank" rel="noreferrer"><span>Portal</span> Applications &amp; observability <FiArrowUpRight aria-hidden="true" /></a></div>
        </div>
      </div>
      <div className="hero-bottom page-width">
        <div className="hero-work">
          <div className="hero-company-logos"><BrandLogo name="SII" /><span aria-hidden="true">↗</span><BrandLogo name="Thales" /></div>
          <p className="hero-employment"><span className="employment-dot" aria-hidden="true" /><span>{profile.employment.status}</span></p>
        </div>
        <a className="hero-scroll" href="#projects">Explore the projects <FiArrowDown aria-hidden="true" /></a>
      </div>
    </section>
  );
}
