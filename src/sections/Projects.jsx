import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Project from "../components/Project";
import projectsData from "../projects.json";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { autoAlpha: 0, x: i % 2 === 0 ? -80 : 80 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1,
          delay: 0.1 * i,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 bg-white dark:bg-gray-950 md:py-20"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="flex flex-col items-center gap-2">
            <h3 className="w-max select-none md:text-xl lg:text-2xl rounded-md bg-gray-100 px-3 py-1 text-gray-800 dark:bg-gray-900 border-gray-200 dark:border-gray-700 border dark:text-gray-50">
              Projects
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              An overview of my projects
            </p>
          </div>
        </div>
        <div className="relative space-y-8">
          <div
            ref={timelineRef}
            className="absolute left-1/2 top-0 h-full w-1 bg-gray-200 rounded-full dark:bg-gray-700 hidden md:block"
            style={{ transform: "scaleY(1)", transition: "transform 0.3s" }}
          />
          {projectsData.map((project, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`relative md:w-1/2 ${index % 2 === 0 ? "md:ml-0 md:pr-8" : "md:ml-auto md:pl-8"}`}
            >
              <Project project={project} isEven={index % 2 === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
