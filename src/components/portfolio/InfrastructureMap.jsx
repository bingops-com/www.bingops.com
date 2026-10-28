import { FiActivity, FiBox, FiGitBranch, FiServer } from "react-icons/fi";

export default function InfrastructureMap({ compact = false }) {
  return (
    <figure className={compact ? "infra-map infra-map-compact" : "infra-map"}>
      <div className="infra-map-heading"><span className="map-symbol" aria-hidden="true">⌘</span><span>De Git au cluster</span><span className="map-caption">LabOps</span></div>
      <div className="infra-route">
        <div className="infra-node"><FiGitBranch aria-hidden="true" /><span>Git</span><small>État souhaité</small></div>
        <span className="infra-connector" aria-hidden="true" />
        <div className="infra-node"><FiBox aria-hidden="true" /><span>Argo CD</span><small>Réconciliation</small></div>
        <span className="infra-connector" aria-hidden="true" />
        <div className="infra-node infra-node-core"><FiServer aria-hidden="true" /><span>Kubernetes</span><small>Applications</small></div>
      </div>
      <div className="infra-foundation"><span>Proxmox</span><span>Terraform</span><span>Talos</span><span>Cluster API</span></div>
      <figcaption><FiActivity aria-hidden="true" /> Observer avec Prometheus et Grafana</figcaption>
    </figure>
  );
}
