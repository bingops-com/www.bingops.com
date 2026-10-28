import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiBookOpen, FiGithub, FiX } from "react-icons/fi";
import projects from "../../projects.json";
import profile from "../../portfolio.json";
import ProjectDemo from "./ProjectDemo";
import PortalWireframe from "./PortalWireframe";
import useScrollReveal from "../../hooks/useScrollReveal";

const categories = ["All", ...new Set(projects.map((project) => project.category))];

function ProjectVisual({ project, expanded = false }) {
  if (project.videoURL) return expanded ? <ProjectDemo project={project} expanded /> : <PortalWireframe />;
  return <img className="project-image" src={project.imageURL} alt={project.imageAlt} loading="lazy" width="960" height="600" />;
}

export default function ProjectShowcase() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);
  const projectsRef = useRef(null);
  useScrollReveal(projectsRef, ".project-card", category);
  const visible = projects.filter((project) => category === "All" || project.category === category);

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
    <section ref={projectsRef} id="projects" className="projects-section page-width section-space" aria-labelledby="projects-title">
      <div className="section-heading" data-reveal><div><p className="section-context">Personal projects</p><h2 id="projects-title">A few things I’ve built.</h2></div><a className="text-link" href={profile.organization} target="_blank" rel="noreferrer">BingOps repositories <FiGithub aria-hidden="true" /></a></div>
      <div className="project-toolbar">
        <div className="project-filters" role="group" aria-label="Filter projects">{categories.map((item) => <button type="button" key={item} className={category === item ? "filter-button is-active" : "filter-button"} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <p className="project-count" role="status">{visible.length} project{visible.length > 1 ? "s" : ""}</p>
      </div>
      <div className="project-grid">{visible.map((project) => (
        <article className={"project-card project-" + project.kind} key={project.title}>
          {project.imageURL && <div className={`project-visual${project.imageType === "illustration" ? " project-illustration" : ""}`}><ProjectVisual project={project} /></div>}
          <div className="project-card-copy"><p className="project-category">{project.category}</p><h3>{project.title}</h3><p>{project.content}</p><ul className="tag-list">{project.stacks.map((stack) => <li key={stack} data-technology={stack}>{stack}</li>)}</ul><div className="project-actions"><button type="button" className="text-link" onClick={() => setSelected(project)} aria-label={"Explore " + project.title}>Explore project <FiArrowUpRight aria-hidden="true" /></button><a className="icon-button" href={project.link} target="_blank" rel="noreferrer" aria-label={"Source code for " + project.title + " on GitHub"}><FiGithub aria-hidden="true" /></a></div></div>
        </article>
      ))}</div>
      <dialog className={`project-dialog${selected?.kind === "portal" ? " project-dialog-portal" : ""}`} ref={dialogRef} aria-labelledby="project-dialog-title" onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
        <div className="project-dialog-content">
          <button autoFocus className="icon-button dialog-close" type="button" aria-label="Close project details" onClick={() => dialogRef.current.close()}><FiX aria-hidden="true" /></button>
          {selected && <><p className="project-category">{selected.category}</p><h2 id="project-dialog-title">{selected.title}</h2><p className="dialog-description">{selected.content}</p>{selected.imageURL && <div className={`project-dialog-visual${selected.imageType === "illustration" ? " project-illustration" : ""}`}><ProjectVisual project={selected} expanded /></div>}<div className="project-case-study">
            <section aria-labelledby="project-problem"><h3 id="project-problem">The problem</h3><p>{selected.caseStudy.problem}</p></section>
            <section aria-labelledby="project-choices"><h3 id="project-choices">Engineering choices</h3><ul className="project-features">{selected.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>
            <section aria-labelledby="project-result"><h3 id="project-result">What it delivers</h3><p>{selected.caseStudy.result}</p></section>
          </div><ul className="tag-list">{selected.stacks.map((stack) => <li key={stack} data-technology={stack}>{stack}</li>)}</ul><div className="dialog-actions"><a className="button button-primary" href={selected.link} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" /> View source</a>{selected.documentation && <a className="text-link" href={selected.documentation} target="_blank" rel="noreferrer"><FiBookOpen aria-hidden="true" /> Documentation</a>}</div></>}
        </div>
      </dialog>
    </section>
  );
}
