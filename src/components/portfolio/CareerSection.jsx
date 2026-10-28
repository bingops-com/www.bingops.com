import { useEffect, useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import profile from "../../portfolio.json";
import BrandLogo from "./BrandLogo";

export default function CareerSection() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const periods = timelineRef.current.querySelectorAll(".career-period");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    const reveal = (period) => period.classList.add("is-revealed");
    const observe = () => {
      observer?.disconnect();
      if (motion.matches || !("IntersectionObserver" in window)) {
        periods.forEach(reveal);
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
      );
      periods.forEach((period) => {
        if (!period.classList.contains("is-revealed")) observer.observe(period);
      });
    };
    observe();
    motion.addEventListener("change", observe);
    return () => {
      observer?.disconnect();
      motion.removeEventListener("change", observe);
    };
  }, []);

  return (
    <section
      id="experience"
      className="experience-section section-space"
      aria-labelledby="experience-title"
    >
      <div className="page-width">
        <div className="section-heading">
          <div>
            <p className="section-context">Professional experience</p>
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
                ) : (
                  <div className="experience-intro">
                    <p>From data and public media to engineering services.</p>
                    <span>
                      My professional experience includes namR, Radio France and
                      SII, with a current assignment at Thales.
                    </span>
                    <a className="text-link" href="#stacks">
                      Explore my skills <FiArrowUpRight aria-hidden="true" />
                    </a>
                  </div>
                )}
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
