import Image from "next/image";
import { media } from "@/lib/media";

export function FinalCTASection() {
  const openDoor = media["open-door"][0];

  return (
    <section className="final-section" aria-labelledby="final-title">
      <Image className="final-image" src={openDoor.src} alt={openDoor.alt} fill sizes="100vw" />
      <div className="final-copy">
        <p className="eyebrow"><span className="eyebrow-rule" /> A CLOSER LOOK</p>
        <h2 id="final-title">The details<br />make the drive.</h2>
        <a className="text-link" href="#collection">Explore the views <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
