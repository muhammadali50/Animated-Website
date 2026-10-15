# GT3 Studio Showcase

A polished Next.js App Router showcase for a track-inspired sports car. It uses the seven original images in `public/media/`; it does not invent mechanical specifications or add image-sequence assets.

## Setup

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use `npm run lint`, `npm run build`, and `npm audit` for local checks.

GSAP and ScrollTrigger are registered in `src/animations/gsap.ts` for future client-side animations. The current sections are static and stable before animation work begins. No 3D dependency is included.

## Structure

```text
src/
  animations/  Shared GSAP and ScrollTrigger registration
  app/         App Router layout, homepage and global styles
  components/  Header, editorial sections, media preview and footer
  hooks/       Reserved for shared React hooks
  lib/         Centralized media manifest
  styles/      Reserved for additional style sheets
public/media/  Original exterior, engine and interior images
```

The homepage remains a Server Component. Only `MediaPreview` is client-rendered because its view selector and missing-image fallback need local state.

## Page sections

- Hero: straight-on exterior image, editorial headline and scroll cue.
- Exterior: front and rear angle compositions plus the interactive six-view image index.
- Engineering: engine image and non-speculative detail copy.
- Interior: the two real cockpit images.
- Closing: open-door image, anchor CTA and site footer.

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

`npm audit` on the checked-in lockfile reports five high-severity package records from one underlying advisory: [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), affecting `braces@3.0.3` through this development-only chain:

```text
eslint-config-next@16.4.1 → @next/eslint-plugin-next@16.4.1 → fast-glob@3.3.1
  → micromatch@4.0.8 → braces@3.0.3
```

The issue is stack exhaustion from deeply nested brace patterns. The affected packages are used by lint tooling and are not part of the browser application bundle. Exposure is limited to development/build tooling if attacker-controlled brace patterns reach that dependency. The project does not invoke `braces` directly.

No safe compatible fix is available in the audited dependency set: GitHub currently lists no patched `braces` release. npm's suggested automatic fix downgrades `eslint-config-next` to 14.2.35, a major-version mismatch with Next.js 16, so it was not applied. `npm audit --omit=dev` reports zero advisories for production dependencies. Recheck the advisory and dependency chain when an upstream patch or compatible Next.js release is available.
