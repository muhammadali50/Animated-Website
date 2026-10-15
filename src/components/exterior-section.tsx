import { ExteriorStory } from "@/components/exterior-story";
import { MediaPreview } from "@/components/media-preview";

export function ExteriorSection() {
  return (
    <section className="section exterior-section" id="exterior" aria-labelledby="exterior-title">
      <div className="section-heading exterior-heading">
        <p className="eyebrow"><span className="eyebrow-rule" /> 01 — EXTERIOR</p>
        <div className="section-heading-row">
          <h2 id="exterior-title">Sculpted with<br /><span>intention.</span></h2>
          <p>From its low front stance to the rear wing, each angle adds to the car’s unmistakable presence.</p>
        </div>
      </div>

      <ExteriorStory />
      <MediaPreview />
    </section>
  );
}
