import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainImg from "/main-img.webp";
import { Github, Linkedin, Location } from "../components/icons";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { autoAlpha: 0, x: -80 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { autoAlpha: 0, x: 80 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex w-full flex-col items-center gap-20 py-10 pt-20 md:flex-row-reverse md:py-24"
    >
      <div ref={imgRef} className="flex items-center justify-center md:w-1/3">
        <div className="w-3/6 md:h-2/5 md:w-3/5">
          <img
            id="main-img"
            src={MainImg}
            alt="Main image illustrating the homepage (pinguin using a computer)"
            className="hidden border-8 border-transparent shadow-mlight dark:shadow-mdark md:block"
          />
          <img
            id="main-img"
            src={MainImg}
            alt="Main image illustrating the homepage (pinguin using a computer)"
            className="border-8 border-transparent shadow-mlightphone dark:shadow-mdarkphone md:hidden"
          />
        </div>
      </div>
      <div
        ref={textRef}
        className="flex flex-col gap-12 px-10 md:w-2/3 md:pl-24"
      >
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold dark:text-gray-50 md:text-6xl">
            Hi, I&apos;m Corentin
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 md:text-base">
            I am a 22-year-old Junior DevOps at Radio France, currently pursuing
            a master&apos;s degree in Cybersecurity & Cloud Computing. <br />
            With 7 years of experience in computer science, my passion lies in
            cybersecurity and pentesting.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-200">
          <div className="flex gap-2">
            <Location />
            <p>Paris, France</p>
          </div>
          <div className="flex gap-2 items-center">
            <span className="relative flex h-3 w-3 mx-1">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-700 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-700"></span>
            </span>
            <p>
              Currently working at{" "}
              <a
                href="https://www.radiofrance.fr"
                aria-label="Check the website of my employer, RadioFrance"
                className="font-semibold dark:text-gray-100 underline dark:hover:text-gray-300 hover:text-gray-800"
              >
                Radio France
              </a>
            </p>
          </div>
        </div>
        <div className="flex gap-6">
          <a
            href="https://github.com/0xBingo"
            target="_blank"
            aria-label="Check my Github profile"
          >
            <Github />
          </a>
          <a
            href="https://www.linkedin.com/in/corentin-guyon/"
            target="_blank"
            aria-label="Check my Linkedin profile"
          >
            <Linkedin />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
