import colours from "../../technologyColors.json";

// Brand hues have separate text shades for readable light and dark surfaces.
export default function TechnologyTag({ name }) {
  const palette = colours[name];
  const style = palette
    ? {
        "--technology-brand": palette.brand,
        "--technology-light": palette.light,
        "--technology-dark": palette.dark,
      }
    : undefined;
  return (
    <li className="technology-tag" data-technology={name} style={style}>
      {name}
    </li>
  );
}
