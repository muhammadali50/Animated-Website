export type MediaCategory =
  | "exterior-front"
  | "front-angle"
  | "rear"
  | "engine"
  | "interior"
  | "open-door";

export type MediaAsset = {
  src: string;
  filename: string;
  alt: string;
};

function asset(filename: string, alt: string): MediaAsset {
  return { src: `/media/${encodeURIComponent(filename)}`, filename, alt };
}

/** Inventory of original files present in public/media at setup time. */
export const media = {
  "exterior-front": [
    asset("Silver Track Coupe stright Front View.png", "Silver GT3-inspired coupe, straight-on front view"),
  ],
  "front-angle": [
    asset("car-front-angle.png", "Silver GT3-inspired coupe, front three-quarter view"),
  ],
  rear: [
    asset("car-rear-angle.png", "Silver GT3-inspired coupe, rear three-quarter view"),
  ],
  engine: [
    asset("engine-open.png", "Performance engine beneath the open front hood"),
  ],
  interior: [
    asset("interior-main.png", "Driver-focused cabin with burgundy leather details"),
    asset("interior-detail.png", "Wide view across the GT3-inspired cabin"),
  ],
  "open-door": [
    asset("door-open.png", "Open coupe door revealing the burgundy cabin"),
  ],
} satisfies Record<MediaCategory, MediaAsset[]>;

export const mediaCategories: { id: MediaCategory; label: string }[] = [
  { id: "exterior-front", label: "Front" },
  { id: "front-angle", label: "Front angle" },
  { id: "rear", label: "Rear" },
  { id: "engine", label: "Engine" },
  { id: "interior", label: "Interior" },
  { id: "open-door", label: "Open door" },
];

