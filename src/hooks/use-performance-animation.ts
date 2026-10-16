"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "@/animations/gsap";

type PerformanceAnimationOptions = RefObject<HTMLElement | null>;

export function usePerformanceAnimation(sectionRef: PerformanceAnimationOptions) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const image = section.querySelector<HTMLElement>(".engine-artwork");
    const reveal = section.querySelector<HTMLElement>(".engine-image-reveal");
    const copy = section.querySelector<HTMLElement>(".performance-copy");
    if (!image || !reveal || !copy) return;

    const mediaQuery = gsap.matchMedia();
    const context = gsap.context(() => {
      mediaQuery.add("(prefers-reduced-motion: reduce)", () => {});

      mediaQuery.add(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(copy, { autoAlpha: 0, y: 22 });
          gsap.set(image, { autoAlpha: 0.82, scale: 1.035, transformOrigin: "center center" });
          gsap.set(reveal, { scaleX: 1, transformOrigin: "right center" });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                end: "bottom 16%",
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            })
            .to(copy, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0)
            .to(image, { autoAlpha: 1, duration: 0.18, ease: "none" }, 0)
            .to(reveal, { scaleX: 0, duration: 0.4, ease: "none" }, 0)
            .to(image, { scale: 1.075, duration: 0.56, ease: "none" }, 0.28)
            .to(copy, { autoAlpha: 0, y: -12, duration: 0.14, ease: "none" }, 0.83)
            .to(image, { autoAlpha: 0.9, scale: 1.09, duration: 0.16, ease: "none" }, 0.84);
        },
        section,
      );

      mediaQuery.add(
        "(min-width: 681px) and (max-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(reveal, { scaleX: 1, transformOrigin: "right center" });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 84%",
                end: "bottom 20%",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(copy, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.24, ease: "power2.out" }, 0)
            .to(reveal, { scaleX: 0, duration: 0.42, ease: "none" }, 0)
            .fromTo(image, { scale: 1.015 }, { scale: 1.045, duration: 0.6, ease: "none" }, 0.24);
        },
        section,
      );

      mediaQuery.add(
        "(max-width: 680px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(reveal, { transformOrigin: "right center" });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 86%",
                end: "bottom 36%",
                scrub: 0.35,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(copy, { autoAlpha: 0.15, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "none" }, 0)
            .fromTo(reveal, { scaleX: 1 }, { scaleX: 0, duration: 0.65, ease: "none" }, 0)
            .fromTo(image, { scale: 1 }, { scale: 1.025, duration: 0.75, ease: "none" }, 0.1);
        },
        section,
      );
    }, section);

    return () => {
      mediaQuery.revert();
      context.revert();
    };
  }, [sectionRef]);
}
