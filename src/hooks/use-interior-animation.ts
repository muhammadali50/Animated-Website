"use client";

import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "@/animations/gsap";

type InteriorAnimationOptions = RefObject<HTMLDivElement | null>;

export function useInteriorAnimation(storyRef: InteriorAnimationOptions) {
  useLayoutEffect(() => {
    const story = storyRef.current;
    if (!story) return;

    const stage = story.querySelector<HTMLElement>(".interior-stage");
    const scenes = Array.from(story.querySelectorAll<HTMLElement>(".interior-scene"));
    const photos = scenes.map((scene) => scene.querySelector<HTMLElement>(".interior-photo"));
    const sceneIndexes = scenes
      .map((scene) => scene.querySelector<HTMLElement>(".interior-scene-index"))
      .filter((index): index is HTMLElement => index !== null);
    const images = scenes.map((scene) => scene.querySelector<HTMLElement>(".interior-photo-image"));
    const sceneImages = images.filter((image): image is HTMLElement => image !== null);
    const copy = Array.from(story.querySelectorAll<HTMLElement>(".interior-copy"));
    const scenePhotos = photos.filter((photo): photo is HTMLElement => photo !== null);
    if (
      !stage ||
      scenes.length !== 3 ||
      scenePhotos.length !== 3 ||
      sceneIndexes.length !== 3 ||
      sceneImages.length !== 3 ||
      copy.length !== 4
    ) return;

    const mediaQuery = gsap.matchMedia();
    const context = gsap.context(() => {
      mediaQuery.add("(prefers-reduced-motion: reduce)", () => {});

      mediaQuery.add(
        "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
        () => {
          story.classList.add("is-cinematic");

          gsap.set(scenes, { autoAlpha: 0 });
          gsap.set(scenes[0], { autoAlpha: 1 });
          gsap.set(scenePhotos, { clipPath: "inset(0 100% 0 0)" });
          gsap.set(scenePhotos[0], { clipPath: "inset(0 0% 0 0)" });
          gsap.set(sceneImages, {
            scale: 1.025,
            transformOrigin: "center center",
          });
          gsap.set(copy, { autoAlpha: 0, y: 14 });
          gsap.set(copy[0], { autoAlpha: 1, y: 0 });
          gsap.set(sceneIndexes, { autoAlpha: 0 });
          gsap.set(sceneIndexes[0], { autoAlpha: 1 });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: stage,
                start: "top 78px",
                end: () => `+=${Math.round(window.innerHeight * 1.95)}`,
                pin: stage,
                pinSpacing: true,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            })
            .to(sceneImages[0], { scale: 1.075, duration: 0.29, ease: "none" }, 0)
            .to(copy[0], { autoAlpha: 0, y: -8, duration: 0.08, ease: "none" }, 0.17)
            .set(scenes[1], { autoAlpha: 1 }, 0.25)
            .to(scenePhotos[1], { clipPath: "inset(0 0% 0 0)", duration: 0.12, ease: "none" }, 0.25)
            .to(sceneIndexes[0], { autoAlpha: 0, duration: 0.06, ease: "none" }, 0.24)
            .to(sceneIndexes[1], { autoAlpha: 1, duration: 0.06, ease: "none" }, 0.29)
            .to(scenes[0], { autoAlpha: 0, duration: 0.01, ease: "none" }, 0.38)
            .to(sceneImages[1], { scale: 1.075, duration: 0.5, ease: "none" }, 0.24)
            .to(copy[1], { autoAlpha: 1, y: 0, duration: 0.1, ease: "power2.out" }, 0.23)
            .to(copy[1], { autoAlpha: 0, y: -8, duration: 0.07, ease: "none" }, 0.43)
            .to(copy[2], { autoAlpha: 1, y: 0, duration: 0.1, ease: "power2.out" }, 0.47)
            .to(copy[2], { autoAlpha: 0, y: -8, duration: 0.07, ease: "none" }, 0.68)
            .set(scenes[2], { autoAlpha: 1 }, 0.75)
            .to(scenePhotos[2], { clipPath: "inset(0 0% 0 0)", duration: 0.12, ease: "none" }, 0.75)
            .to(sceneIndexes[1], { autoAlpha: 0, duration: 0.06, ease: "none" }, 0.74)
            .to(sceneIndexes[2], { autoAlpha: 1, duration: 0.06, ease: "none" }, 0.79)
            .to(scenes[1], { autoAlpha: 0, duration: 0.01, ease: "none" }, 0.88)
            .to(sceneImages[2], { scale: 1.075, duration: 0.24, ease: "none" }, 0.75)
            .to(copy[3], { autoAlpha: 1, y: 0, duration: 0.1, ease: "power2.out" }, 0.72)
            .to(copy[3], { autoAlpha: 0, y: -8, duration: 0.08, ease: "none" }, 0.92)
            .to(sceneImages[2], { autoAlpha: 0.92, scale: 1.085, duration: 0.12, ease: "none" }, 0.92);

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
              { autoAlpha: 0.9, y: 12 },
              {
                autoAlpha: 1,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: scene,
                  start: "top 92%",
                  end: "top 62%",
                  scrub: 0.3,
                  invalidateOnRefresh: true,
                },
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
