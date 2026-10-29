import { useId, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function ExperienceContributions({
  company,
  highlights,
  technologies,
}) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  return (
    <div className="experience-contributions">
      <ul className="experience-highlights" id={listId}>
        {(expanded ? highlights : highlights.slice(0, 2)).map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      {expanded && (
        <ul className="tag-list">
          {technologies.map((tech) => (
            <li key={tech} data-technology={tech}>
              {tech}
            </li>
          ))}
        </ul>
      )}
      <button
        className="experience-details-toggle text-link"
        type="button"
        aria-expanded={expanded}
        aria-controls={listId}
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? "Hide details" : "View details"}
        <span className="sr-only"> about {company}</span>
        <FiChevronDown aria-hidden="true" />
      </button>
    </div>
  );
}
