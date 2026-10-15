import Image from "next/image";
import { media } from "@/lib/media";

export function PerformanceSection() {
  const engine = media.engine[0];

  return (
    <section className="section performance-section" id="performance" aria-labelledby="performance-title">
      <div className="performance-copy">
        <p className="eyebrow eyebrow-light"><span className="eyebrow-rule" /> 02 — ENGINEERING</p>
        <h2 id="performance-title">Purpose,<br />made visible.</h2>
        <p className="performance-description">An open view of the powertrain brings materials, forms and careful assembly into focus.</p>
        <div className="technical-note">
          <span className="technical-note-line" aria-hidden="true" />
          <span>ENGINE STUDY<br />DETAIL 01</span>
        </div>
      </div>
      <figure className="editorial-image engine-image">
        <Image src={engine.src} alt={engine.alt} fill sizes="(max-width: 760px) 100vw, 55vw" />
        <figcaption><span>03</span> POWERTRAIN DETAIL</figcaption>
      </figure>
    </section>
  );
}
