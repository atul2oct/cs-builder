export const BRAND = {
  name: "CS Builder & Developers",
  tagline: "From Land to Living",
  phone: "+91 73074 78258",
  phoneRaw: "917307478258", // for WhatsApp link
  email: "contact@csbuilder.in", // placeholder — client to update
  whatsappMessage:
    "Hello CS Builder & Developers! I'd like to discuss my home construction project.",
  address: "Your City, India", // placeholder — client to update
} as const;

export const COLORS = {
  forest: "#1B4332",
  forestMid: "#2D6A4F",
  sand: "#C9A96E",
  surface: "#F8F6F1",
  ink: "#1A1A1A",
} as const;

export const SERVICES = [
  {
    id: "land",
    icon: "🗺️",
    title: "Land Assistance",
    desc: "We help you find, evaluate, and purchase the right plot for your dream home.",
  },
  {
    id: "design",
    icon: "📐",
    title: "Architectural Design",
    desc: "Custom floor plans, elevations, and 3D visualisations tailored to your lifestyle.",
  },
  {
    id: "approvals",
    icon: "📋",
    title: "Approvals & Permits",
    desc: "We handle all government approvals, structural drawings, and compliance paperwork.",
  },
  {
    id: "construction",
    icon: "🏗️",
    title: "Full Construction",
    desc: "Foundation to roof — quality materials, skilled labour, on-time delivery.",
  },
  {
    id: "finishing",
    icon: "🪟",
    title: "Electrical, Plumbing & Finishing",
    desc: "Complete MEP work, tiling, painting, and every finishing detail done right.",
  },
  {
    id: "interior",
    icon: "🛋️",
    title: "Interior Design",
    desc: "Furniture selection, lighting design, and décor to make your house a home.",
  },
] as const;

export const PROJECT_STAGES = [
  "Looking for land",
  "Own land",
  "Planning",
  "Under construction",
  "Interiors",
] as const;

export type ProjectStage = (typeof PROJECT_STAGES)[number];
