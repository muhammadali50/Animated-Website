"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "@/animations/gsap";

type HeroAnimationOptions = RefObject<HTMLElement | null>;

export function useHeroAnimation(heroRef: HeroAnimationOptions) {
  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const media = hero.querySelector<HTMLElement>(".hero-media");
    const image = hero.querySelector<HTMLElement>(".hero-image");
    const copy = hero.querySelector<HTMLElement>(".hero-copy");
    const cue = hero.querySelector<HTMLElement>(".scroll-cue");
    if (!media || !image || !copy || !cue) return;

    const mediaQuery = gsap.matchMedia();
    const context = gsap.context(() => {
      const animateIntro = () => {
        gsap
          .timeline({ defaults: { ease: "power2.out" } })
          .fromTo(
            image,
            { autoAlpha: 0, scale: 0.93 },
            { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power2.out" },
            0,
          )
          .from(".eyebrow", { autoAlpha: 0, y: 9, duration: 0.55 }, 0.12)
          .from("#hero-title", { autoAlpha: 0, y: 22, duration: 0.75 }, 0.22)
          .from(".hero-description", { autoAlpha: 0, y: 12, duration: 0.6 }, 0.42)
          .from(cue, { autoAlpha: 0, y: 7, duration: 0.5 }, 0.62);
      };

      mediaQuery.add("(prefers-reduced-motion: reduce)", () => {});

      mediaQuery.add(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        () => {
          animateIntro();
          gsap
            .timeline({
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: () => `+=${Math.round(window.innerHeight * 1.35)}`,
                pin: true,
                pinSpacing: true,
                scrub: 0.75,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            })
            .to(copy, { autoAlpha: 0, y: -24, duration: 0.3, ease: "none" }, 0)
            .to(cue, { autoAlpha: 0, y: -8, duration: 0.24, ease: "none" }, 0.04)
            .to(media, { scale: 1.1, duration: 0.64, ease: "none" }, 0.14)
            .to(
              media,
              { scale: 1.14, autoAlpha: 0.88, duration: 0.22, ease: "none" },
              0.78,
            );
        },
        hero,
      );

      mediaQuery.add(
        "(min-width: 681px) and (max-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          animateIntro();
          gsap
            .timeline({
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: () => `+=${Math.round(window.innerHeight * 0.8)}`,
                scrub: 0.55,
                invalidateOnRefresh: true,
              },
            })
            .to(copy, { autoAlpha: 0, y: -18, duration: 0.3, ease: "none" }, 0)
            .to(cue, { autoAlpha: 0, duration: 0.2, ease: "none" }, 0.04)
            .to(media, { scale: 1.055, duration: 0.78, ease: "none" }, 0.12);
        },
        hero,
      );

      mediaQuery.add(
        "(max-width: 680px) and (prefers-reduced-motion: no-preference)",
        animateIntro,
        hero,
      );
    }, hero);

    return () => {
      mediaQuery.revert();
      context.revert();
    };
  }, [heroRef]);
}
