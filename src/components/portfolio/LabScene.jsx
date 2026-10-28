import { useState } from 'react';
import { FiBox, FiGitBranch, FiServer, FiTerminal } from 'react-icons/fi';
import projects from '../../projects.json';

const stages = [
  { id: 'git', name: 'Git', caption: 'Tout part du code', icon: FiGitBranch, command: 'git push origin master', detail: 'Décrire mon infrastructure et versionner chaque changement.' },
  { id: 'argo', name: 'Argo CD', caption: 'La réconciliation', icon: FiBox, command: 'argocd app list', detail: 'Faire converger les applications vers l’état décrit dans Git.' },
  { id: 'kube', name: 'Kubernetes', caption: 'Les applications', icon: FiServer, command: 'kubectl get pods -A', detail: 'Orchestrer les services qui font vivre mon lab.' },
];

const letters = [
  ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
];
const pixels = letters.flatMap((letter, index) => letter.flatMap((row, y) => [...row].flatMap((pixel, x) => pixel === '1' ? [{ x: index * 48 + x * 8, y: y * 8 }] : [])));

function PixelWordmark() {
  return (
    <svg className="terminal-pixels" viewBox="-2 -2 298 74" aria-hidden="true">
      <g className="pixel-shadow" transform="translate(7 7)">{pixels.map(({ x, y }) => <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" />)}</g>
      <g className="pixel-shadow" transform="translate(3.5 3.5)">{pixels.map(({ x, y }) => <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" />)}</g>
      <g className="pixel-face">{pixels.map(({ x, y }) => <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" />)}</g>
    </svg>
  );
}

export default function LabScene() {
  const [selected, setSelected] = useState(stages[0]);
  return (
    <div className="lab-scene" aria-label="Mon workflow GitOps interactif">
      <div className="scene-caption"><FiTerminal aria-hidden="true" /><span>Le workbench</span><span className="scene-caption-count">{projects.length} projets documentés</span></div>
      <div className="scene-terminal">
        <div className="terminal-scan" aria-hidden="true" />
        <div className="terminal-top"><span className="terminal-dots" aria-hidden="true"><i /><i /><i /></span><span>terminal://bingops</span><span className="terminal-shortcut" aria-hidden="true">⌘</span></div>
        <div className="terminal-art"><span className="terminal-art-label">Mon laboratoire numérique</span><PixelWordmark /><span className="terminal-art-caption">Infrastructure as Code / GitOps / Open source</span></div>
        <div className="terminal-body" aria-live="polite">
          <p className="terminal-command" key={selected.id}><span aria-hidden="true">❯</span> {selected.command}<span className="terminal-caret" aria-hidden="true" /></p>
          <p className="terminal-detail">{selected.detail}</p>
          <div className="terminal-stack"><span>Terraform</span><span>Talos</span><span>Proxmox</span></div>
        </div>
        <div className="scene-nodes" role="group" aria-label="Explorer les étapes du workflow">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return <button className={`scene-node scene-node-${stage.id}${selected.id === stage.id ? ' is-selected' : ''}`} key={stage.id} type="button" aria-pressed={selected.id === stage.id} onClick={() => setSelected(stage)}><Icon aria-hidden="true" /><span>{stage.name}</span></button>;
          })}
        </div>
      </div>
      <p className="scene-hint">Un dépôt. Un cluster. Des idées en production.<span>Clique sur une étape pour l’explorer.</span></p>
    </div>
  );
}
