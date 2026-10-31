import { useLanguage } from "../../LanguageContext";
import { useRef } from "react";
import BrandLogo from "./BrandLogo";
import ExperienceContributions from "./ExperienceContributions";
import useScrollReveal from "../../hooks/useScrollReveal";

export default function CareerSection() {
  const { t, profile, language } = useLanguage();
  const timelineRef = useRef(null);

  useScrollReveal(timelineRef, ".career-period", language);

  return (
    <section
      id="experience"
      className="experience-section section-space"
      aria-labelledby="experience-title"
    >
      <div className="page-width">
        <div className="section-heading">
          <div>
            <p className="section-context">{t("Career & education")}</p>
            <h2 id="experience-title">
              {t("My professional")}
              <br />
              {t("background.")}
            </h2>
          </div>
        </div>
        <p className="career-summary">
          {t("DevOps at Radio France, systems administration at namR, and now a permanent position at SII on assignment at Thales.")}
        </p>
        <div className="career-columns" aria-hidden="true">
          <span>{t('Professional experience')}</span>
          <span>{t('Education alongside each role')}</span>
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
                    ? `${experience.period}: ${t("education and work-study at")} ${experience.company}`
                    : t("Current employment")
                }
              >
                {experience.period && (
                  <p className="career-date" aria-label={experience.period}>
                    {experience.period.split(" – ").map((date) => (
                      <span key={date}>{date}</span>
                    ))}
                  </p>
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
                        {t(experience.contract
                          ? "Current"
                          : "Previous experience")}
                      </p>
                    </div>
                    <h3>{experience.company}</h3>
                    {experience.role && (
                      <p className="entry-role">
                        {experience.role}
                        {experience.arrangement && (
                          <span className="entry-arrangement">
                            {" "}
                            · {experience.arrangement}
                          </span>
                        )}
                      </p>
                    )}
                    {experience.location && (
                      <p className="entry-company">{experience.location}</p>
                    )}
                    {experience.client ? (
                      <div className="client-assignment">
                        <BrandLogo name={experience.client} />
                        <div>
                          <p className="assignment-label">{t('Client assignment')}</p>
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
                      <ExperienceContributions
                        company={experience.company}
                        highlights={experience.highlights}
                        technologies={experience.technologies}
                      />
                    )}
                  </div>
                </article>
                {education ? (
                  <article className="education-entry">
                    <BrandLogo name={education.school} />
                    <div>
                      <p className="entry-type">
                        {t("Education")} · {education.qualification}
                      </p>
                      <h3
                        lang={
                          education.qualification === "Bachelor" ? "fr" : language
                        }
                      >
                        {education.title}
                      </h3>
                      <p>{education.school}</p>
                      <p className="education-location">{education.location}</p>
                      <p className="education-work-study">
                        {t("Work-study at")} {experience.company}
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
