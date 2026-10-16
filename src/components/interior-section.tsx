import { InteriorStory } from "@/components/interior-story";

export function InteriorSection() {
  return (
    <section className="section interior-section" id="interior" aria-labelledby="interior-title">
      <div className="section-heading interior-heading">
        <p className="eyebrow"><span className="eyebrow-rule" /> 03 — INTERIOR</p>
        <div className="section-heading-row">
          <h2 id="interior-title">A place to<br /><span>focus.</span></h2>
          <p>From the open door to the driver’s seat, explore a cockpit shaped around the drive.</p>
        </div>
      </div>
      <InteriorStory />
    </section>
  );
}
