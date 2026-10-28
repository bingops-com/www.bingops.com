import { useEffect } from "react";

// Content stays accessible; entering the viewport reveals it once.
export default function useScrollReveal(
  rootRef,
  selector = "[data-reveal]",
  resetKey = "",
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = [...root.querySelectorAll(selector)];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    const show = (element) => {
      element.dataset.revealState = "shown";
      element.classList.add("is-revealed");
      observer?.unobserve(element);
    };
    const observe = () => {
      observer?.disconnect();
      if (motion.matches || !("IntersectionObserver" in window)) {
        targets.forEach(show);
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) show(entry.target);
          });
        },
        { threshold: 0, rootMargin: "0px 0px -48px 0px" },
      );
      targets.forEach((element) => {
        element.classList.add("scroll-reveal");
        if (element.dataset.revealState !== "shown") {
          element.dataset.revealState = "pending";
          observer.observe(element);
        }
      });
    };
    const onFocus = (event) => {
      const element = event.target.closest(selector);
      if (element && root.contains(element)) show(element);
    };
    observe();
    motion.addEventListener("change", observe);
    root.addEventListener("focusin", onFocus);
    return () => {
      observer?.disconnect();
      motion.removeEventListener("change", observe);
      root.removeEventListener("focusin", onFocus);
      targets.forEach(show);
    };
  }, [rootRef, selector, resetKey]);
}
