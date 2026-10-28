import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function usePortfolioMotion(rootRef) {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });
        entrance.from('.intro-name', { y: 16, opacity: 0, duration: 0.55 })
          .from('#hero-title', { y: 65, opacity: 0, rotate: 2, duration: 0.9 }, '-=0.25')
          .from('.hero-description, .hero-actions, .hero-location', { y: 20, opacity: 0, duration: 0.6, stagger: 0.09 }, '-=0.55')
          .from('.lab-scene', { y: 30, scale: 0.94, opacity: 0, rotate: -3, duration: 1.1 }, 0.2)
          .from('.hero-bottom', { y: 12, opacity: 0, duration: 0.6 }, '-=0.5');
        gsap.to('.reading-progress', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.2 },
        });
      }, rootRef);
      return () => context.revert();
    });
    return () => media.revert();
  }, [rootRef]);
}
