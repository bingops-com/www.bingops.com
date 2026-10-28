import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiBookOpen, FiGithub, FiX } from "react-icons/fi";
import projects from "../../projects.json";
import profile from "../../portfolio.json";
import InfrastructureMap from "./InfrastructureMap";
import PortalPreview from "./PortalPreview";

const categories = ["Tous", ...new Set(projects.map((project) => project.category))];

function ProjectVisual({ project, detail = false }) {
  if (project.kind === "labops" && !detail) return <InfrastructureMap compact />;
  if (project.kind === "portal" && !project.imageURL) return <PortalPreview />;
  return <img className="project-image" src={project.imageURL} alt={project.imageAlt} loading="lazy" width="960" height="600" />;
}

export default function ProjectShowcase() {
  const [category, setCategory] = useState("Tous");
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);
  const visible = projects.filter((project) => category === "Tous" || project.category === category);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selected) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  return (
    <section id="projects" className="projects-section page-width section-space" aria-labelledby="projects-title">
      <div className="section-heading"><div><p className="section-context">Le workbench</p><h2 id="projects-title">Ce que je construis.</h2></div><a className="text-link" href={profile.organization} target="_blank" rel="noreferrer">Les dépôts BingOps <FiGithub aria-hidden="true" /></a></div>
      <div className="project-toolbar">
        <div className="project-filters" role="group" aria-label="Filtrer les projets">{categories.map((item) => <button type="button" key={item} className={category === item ? "filter-button is-active" : "filter-button"} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <p className="project-count" role="status">{visible.length} projet{visible.length > 1 ? "s" : ""}</p>
      </div>
      <div className="project-grid">{visible.map((project) => (
        <article className={"project-card project-" + project.kind} key={project.title}>
          <div className="project-visual"><ProjectVisual project={project} /></div>
          <div className="project-card-copy"><p className="project-category">{project.category}</p><h3>{project.title}</h3><p>{project.content}</p><ul className="tag-list">{project.stacks.map((stack) => <li key={stack}>{stack}</li>)}</ul><div className="project-actions"><button type="button" className="text-link" onClick={() => setSelected(project)} aria-label={"Découvrir " + project.title}>Découvrir le projet <FiArrowUpRight aria-hidden="true" /></button><a className="icon-button" href={project.link} target="_blank" rel="noreferrer" aria-label={"Code source de " + project.title + " sur GitHub"}><FiGithub aria-hidden="true" /></a></div></div>
        </article>
      ))}</div>
      <dialog className="project-dialog" ref={dialogRef} aria-labelledby="project-dialog-title" onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
        <div className="project-dialog-content">
          <button autoFocus className="icon-button dialog-close" type="button" aria-label="Fermer la fiche projet" onClick={() => dialogRef.current.close()}><FiX aria-hidden="true" /></button>
          {selected && <><p className="project-category">{selected.category}</p><h2 id="project-dialog-title">{selected.title}</h2><p className="dialog-description">{selected.content}</p><div className="project-dialog-visual"><ProjectVisual project={selected} detail /></div><h3>Dans le projet</h3><ul className="project-features">{selected.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><ul className="tag-list">{selected.stacks.map((stack) => <li key={stack}>{stack}</li>)}</ul><div className="dialog-actions"><a className="button button-primary" href={selected.link} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" /> Voir le code</a>{selected.documentation && <a className="text-link" href={selected.documentation} target="_blank" rel="noreferrer"><FiBookOpen aria-hidden="true" /> Documentation</a>}</div></>}
        </div>
      </dialog>
    </section>
  );
}
