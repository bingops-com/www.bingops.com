import { useEffect, useState } from 'react';
import { FiPause, FiPlay } from 'react-icons/fi';

const lines = [
  { technology: 'Terraform', detail: 'infrastructure as code', tone: 'terraform' },
  { technology: 'Kubernetes', detail: 'container orchestration', tone: 'kubernetes' },
  { technology: 'Argo CD', detail: 'GitOps delivery', tone: 'argocd' },
  { technology: 'Go', detail: 'tools & APIs', tone: 'go' },
  { technology: 'Security', detail: 'test, learn, improve', tone: 'security' },
];

export default function TerminalRole() {
  const [frame, setFrame] = useState({ index: 0, count: 0, phase: 'typing' });
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const line = lines[frame.index];
  const text = `${line.technology} — ${line.detail}`;
  const visible = reducedMotion ? text : text.slice(0, frame.count);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const delay = frame.phase === 'hold' ? 1800 : frame.phase === 'deleting' ? 26 : 57;
    const timeout = window.setTimeout(() => setFrame((previous) => {
      if (previous.phase === 'hold') return { ...previous, phase: 'deleting' };
      if (previous.phase === 'deleting') return previous.count > 0 ? { ...previous, count: previous.count - 1 } : { index: (previous.index + 1) % lines.length, count: 0, phase: 'typing' };
      const count = previous.count + 1;
      return { ...previous, count, phase: count >= text.length ? 'hold' : 'typing' };
    }), delay);
    return () => window.clearTimeout(timeout);
  }, [frame, paused, reducedMotion, text.length]);

  return (
    <div className={`hero-role terminal-role${paused ? ' is-paused' : ''}`} role="group" aria-label="DevOps skills">
      <span className="sr-only">DevOps and cybersecurity: Terraform, Kubernetes, Argo CD, Go and security research.</span>
      <div className="terminal-role-line" aria-hidden="true"><span className="terminal-prompt">$</span><span className="terminal-role-text"><span className={`terminal-tech technology-${line.tone}`}>{visible.slice(0, line.technology.length)}</span><span className="terminal-detail">{visible.slice(line.technology.length)}</span><span className="typing-caret" /></span></div>
      {!reducedMotion && <button className="typing-toggle" type="button" aria-label={paused ? 'Resume typing animation' : 'Pause typing animation'} onClick={() => setPaused(!paused)}>{paused ? <FiPlay aria-hidden="true" /> : <FiPause aria-hidden="true" />}</button>}
    </div>
  );
}
