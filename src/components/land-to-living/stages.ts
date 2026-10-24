export interface Stage {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  desc: string;
  accentColor: string;
}

export const STAGES: Stage[] = [
  {
    id: "land",
    icon: "🗺️",
    title: "Land Assistance",
    subtitle: "Finding Your Perfect Plot",
    desc: "We identify and evaluate land parcels, verify legal titles, check zoning rules and soil conditions, and guide you through a safe, informed purchase.",
    accentColor: "#2D6A4F",
  },
  {
    id: "foundation",
    icon: "🧱",
    title: "Foundation",
    subtitle: "Building on Solid Ground",
    desc: "Deep foundation work with structural drawings approved by a licensed engineer — PCC, RCC footings, and plinth beam laid to last generations.",
    accentColor: "#4A5568",
  },
  {
    id: "structure",
    icon: "🏗️",
    title: "Structure",
    subtitle: "The Skeleton Rises",
    desc: "Columns, slabs, and beams cast floor by floor. ISI-grade cement and TMT steel, quality-checked at every pour.",
    accentColor: "#744210",
  },
  {
    id: "roof",
    icon: "🏠",
    title: "Roof & Enclosure",
    subtitle: "Walls Up, Roof On",
    desc: "Brickwork, lintel beams, and the weatherproof roof slab. Your home is now enclosed, safe from rain, and ready for finishing.",
    accentColor: "#1B4332",
  },
  {
    id: "finishing",
    icon: "🪟",
    title: "Finishing",
    subtitle: "Every Detail, Perfected",
    desc: "Plastering, waterproofing, flooring, windows, doors, electrical wiring, and plumbing — all sourced from our own supply chain for consistent quality.",
    accentColor: "#744210",
  },
  {
    id: "interior",
    icon: "🛋️",
    title: "Interior Design",
    subtitle: "Making It Truly Yours",
    desc: "Our interior team designs modular kitchens, wardrobes, false ceilings, lighting, and décor — turning four walls into a home that reflects you.",
    accentColor: "#C9A96E",
  },
  {
    id: "handover",
    icon: "🔑",
    title: "Handover",
    subtitle: "Your Dream, Delivered",
    desc: "Final walkthrough, snag list cleared, all documents handed over. We don't leave until you love every corner of your new home.",
    accentColor: "#1B4332",
  },
];

/** Map scroll progress [0,1] to a stage index + within-stage progress [0,1] */
export function resolveStage(progress: number): {
  index: number;
  stageProgress: number;
} {
  const total = STAGES.length;
  const clamped = Math.max(0, Math.min(0.9999, progress));
  const raw = clamped * total;
  const index = Math.floor(raw);
  const stageProgress = raw - index;
  return { index, stageProgress };
}

/** Smooth s-curve easing */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** Get progress for a specific stage from overall [0,1] scroll progress */
export function stageRange(
  overallProgress: number,
  stageIndex: number,
  totalStages = STAGES.length
): number {
  const stageSize = 1 / totalStages;
  const start = stageIndex * stageSize;
  const end = (stageIndex + 1) * stageSize;
  return smoothstep(start, end, overallProgress);
}
