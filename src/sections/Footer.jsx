import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Thm, Htb } from "../components/icons";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current.querySelectorAll("a"),
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 15%",
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
    <footer
      ref={footerRef}
      className="flex flex-col px-4 items-center gap-6 bg-white py-20 dark:bg-gray-950"
    >
      <h3 className="w-max select-none md:text-xl lg:text-2xl rounded-md bg-gray-100 px-3 py-1 text-gray-800 dark:bg-gray-900 border-gray-200 dark:border-gray-700 border dark:text-gray-50">
        Socials
      </h3>
      <div className="flex flex-col gap-3">
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Feel free to reach out to me if you need help, have a query, or simply
          want to connect.
        </p>
        <div className="flex gap-3 justify-center">
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
      <div className="flex flex-col gap-3">
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          You can also check my HackTheBox & TryHackMe profiles.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="https://tryhackme.com/p/Bingops"
            target="_blank"
            aria-label="Check my TryHackMe profile"
          >
            <Thm />
          </a>
          <a
            href="https://app.hackthebox.com/users/189144"
            target="_blank"
            aria-label="Check my HackTheBox profile"
          >
            <Htb />
          </a>
        </div>
        <div>
          <p className="text-sm text-center text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} - BingOps - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
