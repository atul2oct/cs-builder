export const BRAND = {
  name: "CS Builder & Developers",
  tagline: "From Land to Living",
  phone: "+91 73074 78258",
  phoneRaw: "917307478258", // for WhatsApp link
  email: "contact@csbuilder.in",
  whatsappMessage:
    "Hello CS Builder & Developers! I'd like to discuss my home construction project.",
  // ── Central Location & Address Settings ─────────────────────────────────────
  // You can change your company address anytime right here:
  address: "Cs Builders And Developers, Near Ipka Diagnostic Nh-731, Uttar Pradesh 227817",
  locationShort: "NH-731, Uttar Pradesh 227817",
  // Google Map embed URL (works automatically with your address above):
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Cs+Builders+And+Developers,+Near+Ipka+Diagnostic+Nh-731,+Uttar+Pradesh+227817&t=&z=15&ie=UTF8&iwloc=&output=embed",
  // Direct Google Maps directions link:
  mapDirectionsUrl:
    "https://www.google.com/maps/search/?api=1&query=Cs+Builders+And+Developers,+Near+Ipka+Diagnostic+Nh-731,+Uttar+Pradesh+227817",
} as const;

export const COLORS = {
  forest: "#08482D",
  forestMid: "#1B4332",
  forestLight: "#2D6A4F",
  mintBadge: "#DAE7C7",
  sand: "#C9A96E",
  surface: "#F5F8EF",
  ink: "#101410",
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
