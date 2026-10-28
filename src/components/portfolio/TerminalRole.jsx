import { useEffect, useState } from 'react';

const skills = [
  { name: 'Terraform', tone: 'terraform' },
  { name: 'Kubernetes', tone: 'kubernetes' },
  { name: 'Communication', tone: 'softskill' },
  { name: 'Argo CD', tone: 'argocd' },
  { name: 'Agile', tone: 'softskill' },
  { name: 'Go', tone: 'go' },
  { name: 'Teamwork', tone: 'softskill' },
  { name: 'Python', tone: 'python' },
];

export default function TerminalRole() {
  const [frame, setFrame] = useState({ index: 0, count: 0, phase: 'typing' });
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const skill = skills[frame.index];
  const visible = reducedMotion ? skill.name : skill.name.slice(0, frame.count);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const delay = frame.phase === 'hold' ? 1800 : frame.phase === 'deleting' ? 26 : 65;
    const timeout = window.setTimeout(() => setFrame((previous) => {
      if (previous.phase === 'hold') return { ...previous, phase: 'deleting' };
      if (previous.phase === 'deleting') return previous.count > 0 ? { ...previous, count: previous.count - 1 } : { index: (previous.index + 1) % skills.length, count: 0, phase: 'typing' };
      const count = previous.count + 1;
      return { ...previous, count, phase: count >= skill.name.length ? 'hold' : 'typing' };
    }), delay);
    return () => window.clearTimeout(timeout);
  }, [frame, reducedMotion, skill.name.length]);

  return (
    <div className="hero-role terminal-role" role="group" aria-label="DevOps skills">
      <span className="sr-only">Terraform, Kubernetes, Communication, Argo CD, Agile, Go, Teamwork and Python.</span>
      <span className="terminal-role-line" aria-hidden="true"><span className={`terminal-tech technology-${skill.tone}`}>{visible}</span><span className="typing-caret" /></span>
    </div>
  );
}
