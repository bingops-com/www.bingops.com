import { useLanguage } from "../../LanguageContext";
import TechnologyTag from "./TechnologyTag";

export default function ExperienceContributions({
  company,
  highlights,
  technologies,
}) {
  const { t } = useLanguage();
  return (
    <div className="experience-contributions">
      <ul
        className="experience-highlights"
        aria-label={`${t("Responsibilities at")} ${company}`}
      >
        {highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <ul className="tag-list">
        {technologies.map((tech) => (
          <TechnologyTag key={tech} name={tech} />
        ))}
      </ul>
    </div>
  );
}
