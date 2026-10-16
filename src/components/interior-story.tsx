"use client";

import Image from "next/image";
import { useRef } from "react";
import { useInteriorAnimation } from "@/hooks/use-interior-animation";
import { media } from "@/lib/media";

const interiorScenes = [
  {
    id: "door",
    image: media["open-door"][0],
    index: "01",
    frame: "01 / 03",
    copy: [
      {
        id: "step-inside",
        index: "01",
        title: "Step inside excellence.",
        description: "An open driver-side door frames a considered cockpit in silver, charcoal and burgundy.",
      },
    ],
  },
  {
    id: "cabin",
    image: media.interior[0],
    index: "02",
    frame: "02 / 03",
    copy: [
      {
        id: "enter-cockpit",
        index: "02",
        title: "Enter the cockpit.",
        description: "The steering wheel, instruments and center console come together in the driver’s view.",
      },
      {
        id: "materials",
        index: "03",
        title: "Crafted around the drive.",
        description: "Burgundy upholstery and dark trim bring warmth and texture to the sculpted seats.",
      },
    ],
  },
  {
    id: "driver",
    image: media.interior[1],
    index: "03",
    frame: "03 / 03",
    copy: [
      {
        id: "controls",
        index: "04",
        title: "Every control in focus.",
        description: "A clear view across the wheel, instrument cluster and console closes the journey at the driver’s seat.",
      },
    ],
  },
] as const;

export function InteriorStory() {
  const storyRef = useRef<HTMLDivElement>(null);

  useInteriorAnimation(storyRef);

  return (
    <div ref={storyRef} className="interior-story" role="region" aria-label="Inside the cockpit">
      <div className="interior-stage">
        {interiorScenes.map((scene) => (
          <article
            key={scene.id}
            className={`interior-scene interior-scene-${scene.id}`}
            aria-labelledby={`interior-beat-title-${scene.copy[0].id}`}
          >
            <figure className={`interior-photo interior-photo-${scene.id}`}>
              <Image
                className="interior-photo-image"
                src={scene.image.src}
                alt={scene.image.alt}
                fill
                sizes="(max-width: 680px) 92vw, (max-width: 900px) 88vw, 64vw"
                loading="lazy"
              />
              <figcaption className="interior-photo-caption">
                <span>{scene.index}</span> INTERIOR STUDY
              </figcaption>
            </figure>
            <div className="interior-copy-rail">
              {scene.copy.map((beat) => (
                <div className={`interior-copy interior-copy-${beat.id}`} key={beat.id}>
                  <p className="interior-copy-label">INTERIOR STUDY · {beat.index}</p>
                  <h3 id={`interior-beat-title-${beat.id}`}>{beat.title}</h3>
                  <p className="interior-copy-description">{beat.description}</p>
                </div>
              ))}
              <span className="interior-scene-index" aria-hidden="true">{scene.frame}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
