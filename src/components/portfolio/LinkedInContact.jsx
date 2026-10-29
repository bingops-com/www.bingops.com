import { FiArrowUpRight, FiLinkedin } from "react-icons/fi";
import profile from "../../portfolio.json";

const linkedInContactURL = profile.linkedinMessage || profile.linkedin;

export default function LinkedInContact() {
  return (
    <a
      className="contact-network-link"
      href={linkedInContactURL}
      target="_blank"
      rel="noreferrer"
      aria-label="Message me on LinkedIn"
    >
      <span className="contact-network-icon">
        <FiLinkedin aria-hidden="true" />
      </span>
      <span className="contact-network-copy">
        <span>LinkedIn</span>
        <strong>{profile.name}</strong>
      </span>
      <span className="contact-network-arrow">
        <FiArrowUpRight aria-hidden="true" />
      </span>
    </a>
  );
}
