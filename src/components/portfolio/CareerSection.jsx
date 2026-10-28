import { FiArrowUpRight, FiCornerDownRight } from 'react-icons/fi';
import profile from '../../portfolio.json';
import BrandLogo from './BrandLogo';

export default function CareerSection() {
  return (
    <section id="experience" className="experience-section page-width section-space" aria-labelledby="experience-title">
      <div className="section-heading">
        <div><p className="section-context">Le parcours</p><h2 id="experience-title">La technique,<br />sur le terrain.</h2></div>
        <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">Le parcours sur LinkedIn <FiArrowUpRight aria-hidden="true" /></a>
      </div>
      <div className="experience-layout">
        <div className="experience-intro">
          <span className="career-flower" aria-hidden="true">✳</span>
          <p>Le cloud et la cybersécurité comme fil conducteur.</p>
          <span>En entreprise comme dans mon lab : comprendre les systèmes, expérimenter, et faire avancer les idées.</span>
          <a className="career-note" href="#stacks">Voir ma boîte à outils <FiCornerDownRight aria-hidden="true" /></a>
        </div>
        <div className="experience-list">
          {profile.experiences.map((experience) => (
            <article className={`experience-entry${experience.contract ? ' experience-current' : ''}`} key={experience.company + experience.role}>
              <BrandLogo name={experience.company} className="experience-logo" />
              <div className="experience-content">
                <div className="entry-heading"><p className="entry-type">{experience.contract ? 'Aujourd’hui' : 'Expérience professionnelle'}</p>{experience.contract && <span className="contract-badge">{experience.contract}</span>}</div>
                <h3>{experience.role || experience.company}</h3>
                <p className="entry-company">{experience.role ? experience.company : experience.location}</p>
                {experience.period && <p className="entry-period">{experience.period}</p>}
                {experience.client ? <div className="client-assignment"><span>En mission chez</span><BrandLogo name={experience.client} /></div> : experience.description && <p className="entry-description">{experience.description}</p>}
                {experience.technologies.length > 0 && <ul className="tag-list">{experience.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>}
              </div>
            </article>
          ))}
          {profile.education.map((education) => (
            <article className="education-entry" key={education.title}>
              <BrandLogo name={education.school} className="experience-logo" />
              <div className="experience-content"><p className="entry-type">Formation · {education.qualification}</p><h3>{education.title}</h3><p className="entry-company">{education.school}</p>{education.period && <p className="entry-period">{education.period}</p>}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
