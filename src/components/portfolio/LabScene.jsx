import { useState } from 'react';
import { FiArrowUpRight, FiBox, FiGitBranch, FiServer, FiTerminal } from 'react-icons/fi';

const stages = [
  { id: 'git', name: 'Git', caption: 'Tout part du code', icon: FiGitBranch, command: 'git push origin master', detail: 'Décrire mon infrastructure et versionner chaque changement.' },
  { id: 'argo', name: 'Argo CD', caption: 'La réconciliation', icon: FiBox, command: 'argocd app list', detail: 'Faire converger les applications vers l’état décrit dans Git.' },
  { id: 'kube', name: 'Kubernetes', caption: 'Les applications', icon: FiServer, command: 'kubectl get pods -A', detail: 'Orchestrer les services qui font vivre mon lab.' },
];

export default function LabScene() {
  const [selected, setSelected] = useState(stages[0]);
  return (
    <div className="lab-scene" aria-label="Mon workflow GitOps interactif">
      <div className="scene-orbit scene-orbit-outer" aria-hidden="true" />
      <div className="scene-orbit scene-orbit-inner" aria-hidden="true" />
      <svg className="scene-wires" viewBox="0 0 600 520" fill="none" aria-hidden="true">
        <path className="wire-track" d="M120 125 C260 125 245 74 440 74 M495 120 C580 170 555 365 470 405" />
        <path className="wire-flow" d="M120 125 C260 125 245 74 440 74 M495 120 C580 170 555 365 470 405" />
        <circle cx="120" cy="125" r="4" /><circle cx="470" cy="405" r="4" />
      </svg>
      <div className="scene-nodes" role="group" aria-label="Explorer les étapes du workflow">
        {stages.map((stage) => {
          const Icon = stage.icon;
          return (
            <button className={`scene-node scene-node-${stage.id}${selected.id === stage.id ? ' is-selected' : ''}`} key={stage.id} type="button" aria-pressed={selected.id === stage.id} onClick={() => setSelected(stage)}>
              <span className="scene-node-icon"><Icon aria-hidden="true" /></span>
              <span><strong>{stage.name}</strong><small>{stage.caption}</small></span>
              <FiArrowUpRight className="scene-node-arrow" aria-hidden="true" />
            </button>
          );
        })}
      </div>
      <div className="scene-sticker" aria-hidden="true"><svg viewBox="0 0 100 100"><path d="M45 0h10l4 29L82 9l9 9-20 23 29 4v10l-29 4 20 23-9 9-23-20-4 29H45l-4-29-23 20-9-9 20-23L0 55V45l29-4L9 18l9-9 23 20Z" /></svg></div>
      <div className="scene-terminal">
        <div className="terminal-top"><span className="terminal-dots" aria-hidden="true"><i /><i /><i /></span><span><FiTerminal aria-hidden="true" /> ~/labops</span><span className="terminal-shortcut">⌘</span></div>
        <div className="terminal-body" aria-live="polite">
          <p className="terminal-command" key={selected.id}><span aria-hidden="true">❯</span> {selected.command}<span className="terminal-caret" aria-hidden="true" /></p>
          <p className="terminal-detail">{selected.detail}</p>
          <div className="terminal-stack"><span>Terraform</span><span>Talos</span><span>Proxmox</span></div>
        </div>
      </div>
      <p className="scene-hint">Un dépôt. Un cluster. Des idées en production.<span>Clique sur une étape pour l’explorer.</span></p>
    </div>
  );
}
