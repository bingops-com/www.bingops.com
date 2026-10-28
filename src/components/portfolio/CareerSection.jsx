import { FiArrowUpRight } from 'react-icons/fi';
import profile from '../../portfolio.json';
import BrandLogo from './BrandLogo';

export default function CareerSection() {
  return (
    <section id="experience" className="experience-section section-space" aria-labelledby="experience-title">
      <div className="page-width">
        <div className="section-heading"><div><p className="section-context">Professional experience</p><h2 id="experience-title">My professional<br />background.</h2></div><a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">View my LinkedIn <FiArrowUpRight aria-hidden="true" /></a></div>
        <div className="experience-layout">
          <div className="experience-intro"><p>From data and public media to engineering services.</p><span>My professional experience includes namR, Radio France and SII, with a current assignment at Thales.</span><a className="text-link" href="#stacks">Explore my skills <FiArrowUpRight aria-hidden="true" /></a></div>
          <div className="experience-list">{profile.experiences.map((experience) => (
            <article className={`experience-entry${experience.contract ? ' experience-current' : ''}`} key={experience.company}>
              <BrandLogo name={experience.company} className="experience-logo" />
              <div className="experience-content">
                <div className="entry-heading"><p className="entry-type">{experience.contract ? 'Current' : 'Previous experience'}</p>{experience.contract && <span className="contract-badge">{experience.contract}</span>}</div>
                <h3>{experience.company}</h3>
                {experience.role && <p className="entry-role">{experience.role}</p>}
                {experience.location && <p className="entry-company">{experience.location}</p>}
                {experience.period && <p className="entry-period">{experience.period}</p>}
                {experience.client ? <div className="client-assignment"><span>On assignment at</span><BrandLogo name={experience.client} /></div> : experience.description && <p className="entry-description">{experience.description}</p>}
                {experience.technologies.length > 0 && <ul className="tag-list">{experience.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>}
              </div>
            </article>
          ))}</div>
        </div>
        <div className="education-list">{profile.education.map((education) => (
          <article className="education-entry" key={education.title}><BrandLogo name={education.school} /><div><p className="entry-type">Education · {education.qualification}</p><h3>{education.title}</h3><p>{education.school}{education.period && ` / ${education.period}`}</p></div></article>
        ))}</div>
      </div>
    </section>
  );
}
