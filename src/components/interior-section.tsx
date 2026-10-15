import Image from "next/image";
import { media } from "@/lib/media";

export function InteriorSection() {
  const driverView = media.interior[0];
  const cockpitView = media.interior[1];

  return (
    <section className="section interior-section" id="interior" aria-labelledby="interior-title">
      <div className="section-heading interior-heading">
        <p className="eyebrow"><span className="eyebrow-rule" /> 03 — INTERIOR</p>
        <div className="section-heading-row">
          <h2 id="interior-title">A place to<br /><span>focus.</span></h2>
          <p>Dark materials meet burgundy upholstery and considered details in a cockpit made for the drive.</p>
        </div>
      </div>
      <div className="interior-gallery">
        <figure className="editorial-image interior-driver-view">
          <Image src={driverView.src} alt={driverView.alt} fill sizes="(max-width: 760px) 100vw, 52vw" />
          <figcaption><span>04</span> DRIVER’S VIEW</figcaption>
        </figure>
        <figure className="editorial-image interior-cockpit-view">
          <Image src={cockpitView.src} alt={cockpitView.alt} fill sizes="(max-width: 760px) 100vw, 52vw" />
          <figcaption><span>05</span> MATERIAL &amp; CONTROL</figcaption>
        </figure>
      </div>
    </section>
  );
}
