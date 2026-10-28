const logos = {
  SII: { src: '/brands/sii.png', className: 'sii', width: 109, height: 73 },
  Thales: { src: '/brands/thales.svg', className: 'thales', width: 484, height: 57 },
  'Radio France': { src: '/brands/radio-france.svg', className: 'radio-france', width: 126, height: 24 },
  IPSSI: { src: '/brands/ipssi.png', className: 'ipssi', width: 510, height: 210 },
};

export default function BrandLogo({ name, className = '' }) {
  const logo = logos[name];
  if (!logo) return <span className={className}>{name}</span>;
  return (
    <span className={`brand-logo brand-logo-${logo.className} ${className}`}>
      <img src={logo.src} alt={`${name} logo`} width={logo.width} height={logo.height} />
    </span>
  );
}
