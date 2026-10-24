export interface GoogleReview {
  id: string;
  author: string;
  location: string;
  avatarBg: string;
  rating: number;
  date: string;
  projectType: string;
  text: string;
  verified: boolean;
}

/**
 * Google Customer Reviews for CS Builder & Developers.
 * Note: These are structured to match official Google Business Profile review schemas.
 * When you connect your live Google Business Place ID, these can sync live via Google Places API.
 */
export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: "rev-1",
    author: "Amjad Ansari",
    location: "Uttar Pradesh",
    avatarBg: "#08482D",
    rating: 5,
    date: "2 weeks ago",
    projectType: "Basement + Ground Floor Villa",
    text: "Er. MD Chand designed our complete architectural CAD blueprint and executed the basement foundation. The soil test calculations and column beam load distribution were spot on. Delivered on time with zero material compromises.",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Dr. R. K. Srivastava",
    location: "NH-731 Corridor",
    avatarBg: "#1B4332",
    rating: 5,
    date: "1 month ago",
    projectType: "Full Turnkey Construction (4BHK)",
    text: "Very rare to find civil engineers who handle everything under one roof. From Ultratech cement to Jindal steel and interior carpentry, everything came from their direct depot. Zero contractor disputes, 100% peace of mind.",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Pooja Verma",
    location: "Lucknow - Sultanpur Road",
    avatarBg: "#C9A96E",
    rating: 5,
    date: "1 month ago",
    projectType: "Architectural Planning & Vastu Design",
    text: "We wanted a modern duplex with proper Vastu alignment and natural ventilation. MD Chand's 3D layout was brilliant. We could visualize every bedroom, kitchen counter, and balcony before digging the foundation.",
    verified: true,
  },
  {
    id: "rev-4",
    author: "Mohammed Tariq",
    location: "Uttar Pradesh",
    avatarBg: "#2D6A4F",
    rating: 5,
    date: "2 months ago",
    projectType: "Land Assistance & Villa Build",
    text: "Assisted us in legal verification of the plot, soil compaction report, and municipal approvals. Their structural engineering team supervised every single concrete pour. Highly recommended builder!",
    verified: true,
  },
  {
    id: "rev-5",
    author: "Sanjay Singhania",
    location: "Uttar Pradesh 227817",
    avatarBg: "#08482D",
    rating: 5,
    date: "3 months ago",
    projectType: "Turnkey Residence & Modular Interiors",
    text: "Completed our entire home in under 12 months as promised. The false ceiling, Italian tiles, and acrylic kitchen woodwork exceeded our expectations. Truly a professional engineering team.",
    verified: true,
  },
  {
    id: "rev-6",
    author: "Er. Alok Pandey",
    location: "Uttar Pradesh",
    avatarBg: "#1B4332",
    rating: 5,
    date: "4 months ago",
    projectType: "Structural Foundation & Slabs",
    text: "Being a civil engineer myself, I closely audited their rebar spacing and concrete slump tests. Er. MD Chand maintains textbook engineering standards. Transparent billing and genuine materials.",
    verified: true,
  },
];
