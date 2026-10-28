import { FiActivity, FiCommand, FiGrid, FiLayers, FiShield } from "react-icons/fi";

export default function PortalPreview() {
  return (
    <figure className="portal-preview" aria-label="Schéma fonctionnel du projet Portal">
      <div className="portal-preview-bar"><FiGrid aria-hidden="true" /><strong>Portal</strong><span>Le lab, en un coup d’œil</span><FiCommand aria-hidden="true" /></div>
      <div className="portal-preview-body">
        <div className="portal-preview-sources"><span><FiLayers aria-hidden="true" /> Kubernetes</span><span><FiActivity aria-hidden="true" /> Prometheus</span><span><FiShield aria-hidden="true" /> Argo CD &amp; Gatus</span></div>
        <div className="portal-preview-destination"><FiGrid aria-hidden="true" /><strong>Mes widgets.<br />Mon espace.</strong><span>Supervision, activité et veille</span></div>
      </div>
      <figcaption>Schéma fonctionnel · Go + React</figcaption>
    </figure>
  );
}
