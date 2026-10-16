# GT3 Studio Showcase

A polished Next.js App Router showcase for a track-inspired sports car. It uses the seven original images in `public/media/`; it does not invent mechanical specifications or add image-sequence assets.

## Setup

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use `npm run lint`, `npm run build`, and `npm audit` for local checks.

GSAP and ScrollTrigger are registered once in `src/animations/gsap.ts`. The hero, exterior story and interior story use desktop pinned, scrubbed timelines; tablet and mobile use lighter or static layouts, and reduced-motion mode disables the timelines. The performance reveal is unpinned and responsive. Each animation hook scopes its selectors and cleans up its timelines and triggers when the component unmounts or its media query changes. No 3D dependency is included.

## Structure

```text
src/
  animations/  Shared GSAP and ScrollTrigger registration
  app/         App Router layout, homepage and global styles
  components/  Header, editorial sections, media preview and footer
  hooks/       Section-owned GSAP animation hooks
  lib/         Centralized media manifest
  styles/      Reserved for additional style sheets
public/media/  Original exterior, engine and interior images
```

The route, layout, header, footer and static section wrappers remain Server Components. Client components are limited to sections that own animation hooks and the interactive `MediaPreview` selector.

## Page sections

- Hero: straight-on exterior image, editorial headline and scroll cue.
- Exterior: front and rear angle compositions plus the interactive six-view image index.
- Engineering: engine image and non-speculative detail copy.
- Interior: the two real cockpit images.
- Closing: open-door image, anchor CTA and site footer.

On desktop, the hero, exterior story and interior story pin in sequence; the performance section animates without pinning. Responsive media queries remove pinning at tablet and mobile widths, and reduced-motion mode leaves all scene content visible in its static layout. Section navigation uses document landmarks so return-to-top links do not target a hero while it is inside its pinned timeline.

## Media inventory

| View | Original file |
| --- | --- |
| Exterior front | `Silver Track Coupe stright Front View.png` |
| Front angle | `car-front-angle.png` |
| Rear | `car-rear-angle.png` |
| Engine | `engine-open.png` |
| Interior | `interior-main.png`, `interior-detail.png` |
| Open door | `door-open.png` |

All seven original PNGs are referenced in `src/lib/media.ts`. There are no missing media categories. The interactive preview falls back gracefully if an image request fails.

## Dependency audit

The latest audit attempt on 2026-10-15 could not retrieve current advisory data: both `npm audit` and `npm audit --omit=dev` failed while requesting npm's bulk advisory endpoint. The results below are the last successfully recorded audit and have not been live-verified in this run.

`npm audit` on the checked-in lockfile reports five high-severity package records from one underlying advisory: [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), affecting `braces@3.0.3` through this development-only chain:

```text
eslint-config-next@16.4.1 → @next/eslint-plugin-next@16.4.1 → fast-glob@3.3.1
  → micromatch@4.0.8 → braces@3.0.3
```

The issue is stack exhaustion from deeply nested brace patterns. The affected packages are used by lint tooling and are not part of the browser application bundle. Exposure is limited to development/build tooling if attacker-controlled brace patterns reach that dependency. The project does not invoke `braces` directly.

No safe compatible fix is available in the audited dependency set: GitHub currently lists no patched `braces` release. npm's suggested automatic fix downgrades `eslint-config-next` to 14.2.35, a major-version mismatch with Next.js 16, so it was not applied. `npm audit --omit=dev` reports zero advisories for production dependencies. Recheck the advisory and dependency chain when an upstream patch or compatible Next.js release is available.
