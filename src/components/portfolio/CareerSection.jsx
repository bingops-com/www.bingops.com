import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import profile from "../../portfolio.json";
import BrandLogo from "./BrandLogo";
import useScrollReveal from "../../hooks/useScrollReveal";

export default function CareerSection() {
  const timelineRef = useRef(null);

  useScrollReveal(timelineRef, ".career-period");

  return (
    <section
      id="experience"
      className="experience-section section-space"
      aria-labelledby="experience-title"
    >
      <div className="page-width">
        <div className="section-heading">
          <div>
            <p className="section-context">Career &amp; education</p>
            <h2 id="experience-title">
              My professional
              <br />
              background.
            </h2>
          </div>
          <a
            className="text-link"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            View my LinkedIn <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <p className="career-summary">
          DevOps at Radio France, systems administration at namR, and now a
          permanent position at SII on assignment at Thales.
        </p>
        <div className="career-columns" aria-hidden="true">
          <span>Professional experience</span>
          <span>Education alongside each role</span>
        </div>
        <div className="experience-layout" ref={timelineRef}>
          {profile.experiences.map((experience) => {
            const education = profile.education.find(
              (programme) => programme.workStudyCompany === experience.company,
            );
            return (
              <div
                className={`career-period${experience.contract ? " career-period-current" : ""}`}
                key={experience.company}
                role="group"
                aria-label={
                  education
                    ? `${experience.period}: education and work-study at ${experience.company}`
                    : "Current employment"
                }
              >
                <article
                  className={`experience-entry${experience.contract ? " experience-current" : ""}`}
                  key={experience.company}
                >
                  <BrandLogo
                    name={experience.company}
                    className="experience-logo"
                  />
                  <div className="experience-content">
                    <div className="entry-heading">
                      <p className="entry-type">
                        {experience.contract
                          ? "Current"
                          : "Previous experience"}
                      </p>
                      {experience.contract && (
                        <span className="contract-badge">
                          {experience.contract}
                        </span>
                      )}
                    </div>
                    <h3>{experience.company}</h3>
                    {experience.role && (
                      <p className="entry-role">{experience.role}</p>
                    )}
                    {experience.arrangement && (
                      <p className="entry-type entry-arrangement">
                        {experience.arrangement}
                      </p>
                    )}
                    {experience.location && (
                      <p className="entry-company">{experience.location}</p>
                    )}
                    {experience.period && (
                      <p className="entry-period">{experience.period}</p>
                    )}
                    {experience.client ? (
                      <div className="client-assignment">
                        <BrandLogo name={experience.client} />
                        <div>
                          <p className="assignment-label">Client assignment</p>
                          <p className="assignment-name">{experience.client}</p>
                        </div>
                      </div>
                    ) : (
                      experience.description && (
                        <p className="entry-description">
                          {experience.description}
                        </p>
                      )
                    )}
                    {experience.highlights && (
                      <ul className="experience-highlights">
                        {experience.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                    {experience.technologies.length > 0 && (
                      <ul className="tag-list">
                        {experience.technologies.map((tech) => (
                          <li key={tech} data-technology={tech}>
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
                {education ? (
                  <article className="education-entry">
                    <BrandLogo name={education.school} />
                    <div>
                      <p className="entry-type">
                        Education · {education.qualification}
                      </p>
                      <h3
                        lang={
                          education.qualification === "Bachelor" ? "fr" : "en"
                        }
                      >
                        {education.title}
                      </h3>
                      <p>
                        {education.school} / {education.period}
                      </p>
                      <p className="education-location">{education.location}</p>
                      <p className="education-work-study">
                        Work-study at {experience.company}
                      </p>
                    </div>
                  </article>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
