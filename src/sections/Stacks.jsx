import Stack from "../components/Stack";
import stackData from "../stacks.json";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Stacks() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardRefs.current,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 15%",
          toggleActions: "play none none none",
        },
      }
    );
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 flex items-center justify-center bg-gray-50 dark:bg-gray-900 md:py-20"
    >
      <div className="flex flex-col items-center gap-8">
        <h3 className="w-max select-none md:text-xl lg:text-2xl rounded-md bg-white px-3 py-1 text-gray-800 dark:bg-gray-800 border-gray-300 dark:border-gray-600 border dark:text-gray-50">
          Stacks
        </h3>
        <div className="flex w-4/5 flex-wrap justify-center gap-8">
          {stackData.map((stack, index) => (
            <div key={index} ref={(el) => (cardRefs.current[index] = el)}>
              <Stack project={stack} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stacks;
