import type { Metadata } from "next";
import { Inter, Caveat, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CS Builder & Developers — From Land to Living",
  description:
    "End-to-end home construction & architecture company. We manage land acquisition, 3D layouts, structural engineering, foundation, building materials, and interior design to handover.",
  keywords: [
    "house construction company",
    "buy land and build house",
    "architectural floor plans",
    "structural civil engineer",
    "turnkey home builder",
    "interior design",
    "building materials supply",
    "CS Builder & Developers",
    "Bangalore home builders"
  ],
  openGraph: {
    title: "CS Builder & Developers — Dream Homes Built From Scratch",
    description: "From Land to Living. Real civil engineering, verified plots, turnkey construction, and luxury interior design under one roof.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${caveat.variable} h-full`}
    >
      <body className="min-h-full antialiased font-sans selection:bg-[#DAE7C7] selection:text-[#08482D]">
        {children}
      </body>
    </html>
  );
}
