export default function ExperienceContributions({
  company,
  highlights,
  technologies,
}) {
  return (
    <div className="experience-contributions">
      <ul
        className="experience-highlights"
        aria-label={`Responsibilities at ${company}`}
      >
        {highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <ul className="tag-list">
        {technologies.map((tech) => (
          <li key={tech} data-technology={tech}>
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}
