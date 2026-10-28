export default function CompassRose() {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1.2" opacity=".55" />
      <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1 4.65" opacity=".7" />
      <path d="M50 1v98M1 50h98M15 15l70 70M85 15 15 85" stroke="currentColor" strokeWidth=".7" opacity=".4" />
      <path d="m50 12 7 31 31 7-31 7-7 31-7-31-31-7 31-7Z" fill="currentColor" />
      <path d="m50 12 7 31-7 7-7-7Zm38 38-31 7-7-7 7-7ZM50 88l-7-31 7-7 7 7ZM12 50l31-7 7 7-7 7Z" fill="#1443d6" fillOpacity=".6" />
      <circle cx="50" cy="50" r="3" fill="currentColor" />
    </svg>
  );
}
