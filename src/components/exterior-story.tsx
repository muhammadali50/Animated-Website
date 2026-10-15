"use client";

import Image from "next/image";
import { useRef } from "react";
import { useExteriorStoryAnimation } from "@/hooks/use-exterior-story-animation";
import { media } from "@/lib/media";

const exteriorShots = [
  {
    id: "front",
    image: media["exterior-front"][0],
    title: "Sculpted for performance.",
    description: "A direct front view puts the car’s low stance and precise proportions first.",
  },
  {
    id: "quarter",
    image: media["front-angle"][0],
    title: "Every line in balance.",
    description: "From the front quarter, the roofline and sculpted side come into view.",
  },
  {
    id: "rear",
    image: media.rear[0],
    title: "Aero in its element.",
    description: "A broad rear wing and resolved tail give the silhouette a purposeful finish.",
  },
] as const;

export function ExteriorStory() {
  const storyRef = useRef<HTMLDivElement>(null);

  useExteriorStoryAnimation(storyRef);

  return (
    <div ref={storyRef} className="exterior-story" role="region" aria-label="Exterior perspectives">
      <div className="exterior-stage">
        {exteriorShots.map((shot, index) => (
          <article
            key={shot.id}
            className={`exterior-scene exterior-scene-${shot.id}`}
            aria-labelledby={`exterior-scene-title-${shot.id}`}
          >
            <Image
              className="exterior-scene-image"
              src={shot.image.src}
              alt={shot.image.alt}
              fill
              sizes="(max-width: 680px) 92vw, (max-width: 900px) 46vw, 86vw"
              loading="lazy"
            />
            <div className="exterior-scene-copy">
              <p className="exterior-scene-label">EXTERIOR STUDY · 0{index + 1}</p>
              <h3 id={`exterior-scene-title-${shot.id}`}>{shot.title}</h3>
              <p className="exterior-scene-description">{shot.description}</p>
            </div>
            <span className="exterior-scene-index" aria-hidden="true">
              0{index + 1} <span>/</span> 03
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
