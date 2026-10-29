import { FiArrowUpRight, FiLinkedin } from "react-icons/fi";
import profile from "../../portfolio.json";

const linkedInContactURL = profile.linkedinMessage || profile.linkedin;

export default function LinkedInContact() {
  return (
    <div className="contact-form contact-fallback contact-linkedin">
      <h3>Connect on LinkedIn.</h3>
      <p>
        Tell me about your project, your questions or what you have been
        experimenting with.
      </p>
      <a
        className="button button-primary"
        href={linkedInContactURL}
        target="_blank"
        rel="noreferrer"
      >
        <FiLinkedin aria-hidden="true" /> Message me on LinkedIn{" "}
        <FiArrowUpRight aria-hidden="true" />
      </a>
    </div>
  );
}
