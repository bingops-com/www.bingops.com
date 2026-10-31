import { useLanguage } from "../../LanguageContext";
import { FiArrowUpRight, FiLinkedin } from "react-icons/fi";

export default function LinkedInContact() {
  const { t, profile } = useLanguage();
  const linkedInContactURL = profile.linkedinMessage || profile.linkedin;
  return (
    <a
      className="contact-network-link"
      href={linkedInContactURL}
      target="_blank"
      rel="noreferrer"
      aria-label={t('Message me on LinkedIn')}
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
