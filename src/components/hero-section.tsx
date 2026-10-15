import Image from "next/image";
import { media } from "@/lib/media";

export function HeroSection() {
  const heroImage = media["exterior-front"][0];

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-media">
        <Image
          className="hero-image"
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
      </div>
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-rule" /> AUTOMOTIVE STUDY · 001</p>
        <div className="hero-intro-row">
          <h1 id="hero-title">A study in precision.</h1>
          <p className="hero-description">A closer look at the shape, craft and character<br className="desktop-break" /> of a track-inspired sports car.</p>
        </div>
      </div>
      <a className="scroll-cue" href="#exterior">
        <span className="scroll-line" aria-hidden="true" />
        <span>SCROLL TO EXPLORE</span>
      </a>
      <span className="hero-index" aria-hidden="true">01 <span>/</span> 04</span>
    </section>
  );
}
