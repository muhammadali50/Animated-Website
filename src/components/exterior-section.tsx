import Image from "next/image";
import { MediaPreview } from "@/components/media-preview";
import { media } from "@/lib/media";

export function ExteriorSection() {
  const frontAngle = media["front-angle"][0];
  const rearAngle = media.rear[0];

  return (
    <section className="section exterior-section" id="exterior" aria-labelledby="exterior-title">
      <div className="section-heading exterior-heading">
        <p className="eyebrow"><span className="eyebrow-rule" /> 01 — EXTERIOR</p>
        <div className="section-heading-row">
          <h2 id="exterior-title">Sculpted with<br /><span>intention.</span></h2>
          <p>From its low front stance to the rear wing, each angle adds to the car’s unmistakable presence.</p>
        </div>
      </div>

      <div className="exterior-gallery">
        <figure className="editorial-image exterior-front-angle">
          <Image src={frontAngle.src} alt={frontAngle.alt} fill sizes="(max-width: 760px) 100vw, 62vw" />
          <figcaption><span>01</span> FRONT THREE-QUARTER</figcaption>
        </figure>
        <figure className="editorial-image exterior-rear-angle">
          <Image src={rearAngle.src} alt={rearAngle.alt} fill sizes="(max-width: 760px) 100vw, 42vw" />
          <figcaption><span>02</span> REAR THREE-QUARTER</figcaption>
        </figure>
      </div>

      <MediaPreview />
    </section>
  );
}
