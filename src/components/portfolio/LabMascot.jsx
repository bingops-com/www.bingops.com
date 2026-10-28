import { useId } from 'react';

// Shared LabOps identity: the cat looking through a porthole, from Portal.
export default function LabMascot() {
  const porthole = useId();
  return (
    <svg className="lab-mascot" viewBox="0 0 64 64" aria-hidden="true">
      <defs><clipPath id={porthole}><circle cx="32" cy="32" r="27" /></clipPath></defs>
      <circle cx="32" cy="32" r="27" className="mascot-sea" />
      <g clipPath={`url(#${porthole})`}>
        <g transform="translate(-7.6 10) scale(0.66)">
          <path d="M32 110C27 82 40 56 60 56s33 26 28 54z" className="mascot-fur" />
          <path d="M40 31 42 8l15 13z" className="mascot-fur" />
          <path d="M80 31 78 8 63 21z" className="mascot-fur mascot-ear" />
          <ellipse cx="60" cy="40" rx="25" ry="21" className="mascot-fur" />
          <ellipse cx="50" cy="40" rx="3.4" ry="4.6" className="mascot-ink mascot-eye" />
          <path d="M39.5 27.5 84.5 44" className="mascot-strap" />
          <path d="M63 34.5h14v6a7 7 0 0 1-14 0z" className="mascot-ink mascot-patch" />
          <path d="M57.5 47h5L60 50z" className="mascot-ink" />
          <path d="M43 57q17 9 34 0" className="mascot-collar" />
        </g>
      </g>
      <circle cx="32" cy="32" r="28.5" className="mascot-rim" />
    </svg>
  );
}
