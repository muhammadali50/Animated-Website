"use client";

import Image from "next/image";
import { useRef } from "react";
import { usePerformanceAnimation } from "@/hooks/use-performance-animation";
import { media } from "@/lib/media";

export function PerformanceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const engine = media.engine[0];

  usePerformanceAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="section performance-section"
      id="performance"
      aria-labelledby="performance-title"
    >
      <div className="performance-copy">
        <p className="eyebrow eyebrow-light"><span className="eyebrow-rule" /> 02 — ENGINEERING</p>
        <h2 id="performance-title">ENGINEERED<br />TO THRILL</h2>
        <p className="performance-description">
          A close study in form, material and mechanical detail.
        </p>
        <p className="performance-note">
          The open-bay image is concept artwork. The 911 GT3 is rear-engined; this view does not depict its mechanical layout.
        </p>
        <div className="technical-note">
          <span className="technical-note-line" aria-hidden="true" />
          <span>CONCEPT POWERTRAIN<br />VISUAL STUDY</span>
        </div>
      </div>
      <figure className="editorial-image engine-image">
        <Image
          className="engine-artwork"
          src={engine.src}
          alt="Concept artwork showing a silver sports car with an open front engine bay"
          fill
          sizes="(max-width: 680px) 100vw, (max-width: 900px) 58vw, 60vw"
        />
        <span className="engine-image-reveal" aria-hidden="true" />
        <figcaption><span>03</span> CONCEPT IMAGE · POWERTRAIN DETAIL</figcaption>
      </figure>
    </section>
  );
}
