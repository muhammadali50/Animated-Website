"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "@/animations/gsap";

type ExteriorStoryAnimationOptions = RefObject<HTMLDivElement | null>;

export function useExteriorStoryAnimation(storyRef: ExteriorStoryAnimationOptions) {
  useLayoutEffect(() => {
    const story = storyRef.current;
    if (!story) return;

    const stage = story.querySelector<HTMLElement>(".exterior-stage");
    const scenes = Array.from(story.querySelectorAll<HTMLElement>(".exterior-scene"));
    if (!stage || scenes.length !== 3) return;

    const mediaQuery = gsap.matchMedia();
    const context = gsap.context(() => {
      mediaQuery.add("(prefers-reduced-motion: reduce)", () => {});

      mediaQuery.add(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        () => {
          story.classList.add("is-cinematic");

          const images = scenes.map((scene) => scene.querySelector<HTMLElement>(".exterior-scene-image"));
          const copy = scenes.map((scene) => scene.querySelector<HTMLElement>(".exterior-scene-copy"));
          if (images.some((image) => !image) || copy.some((content) => !content)) {
            story.classList.remove("is-cinematic");
            return;
          }

          gsap.set(scenes, { autoAlpha: 0 });
          gsap.set(scenes[0], { autoAlpha: 1 });
          gsap.set(images, { scale: 1.035, transformOrigin: "center center" });
          gsap.set(copy, { autoAlpha: 0, y: 12 });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: stage,
                start: "top 78px",
                end: () => `+=${Math.round(window.innerHeight * 1.65)}`,
                pin: stage,
                pinSpacing: true,
                scrub: 0.7,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            })
            .to(scenes[0], { autoAlpha: 1, duration: 0.01, ease: "none" }, 0)
            .to(images[0], { scale: 1, duration: 0.3, ease: "none" }, 0)
            .to(copy[0], { autoAlpha: 1, y: 0, duration: 0.12, ease: "power2.out" }, 0.02)
            .to(copy[0], { autoAlpha: 0, y: -9, duration: 0.07, ease: "none" }, 0.25)
            .to(scenes[0], { autoAlpha: 0, duration: 0.1, ease: "none" }, 0.3)
            .to(scenes[1], { autoAlpha: 1, duration: 0.1, ease: "none" }, 0.3)
            .to(images[1], { scale: 1, duration: 0.37, ease: "none" }, 0.3)
            .to(copy[1], { autoAlpha: 1, y: 0, duration: 0.12, ease: "power2.out" }, 0.33)
            .to(copy[1], { autoAlpha: 0, y: -9, duration: 0.07, ease: "none" }, 0.59)
            .to(scenes[1], { autoAlpha: 0, duration: 0.1, ease: "none" }, 0.63)
            .to(scenes[2], { autoAlpha: 1, duration: 0.1, ease: "none" }, 0.63)
            .to(images[2], { scale: 1, duration: 0.34, ease: "none" }, 0.63)
            .to(copy[2], { autoAlpha: 1, y: 0, duration: 0.12, ease: "power2.out" }, 0.66);

          return () => story.classList.remove("is-cinematic");
        },
        story,
      );

      mediaQuery.add(
        "(min-width: 681px) and (max-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          scenes.forEach((scene) => {
            gsap.fromTo(
              scene,
              { autoAlpha: 0, y: 18 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: { trigger: scene, start: "top 88%", once: true },
              },
            );
          });
        },
        story,
      );
    }, story);

    return () => {
      mediaQuery.revert();
      context.revert();
      story.classList.remove("is-cinematic");
    };
  }, [storyRef]);
}
