import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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

export const metadata: Metadata = {
  title: "CS Builder & Developers — Build Your Dream Home",
  description:
    "End-to-end home construction: land assistance, architectural design, structural engineering, construction, and interior design — all under one roof.",
  keywords: [
    "home construction",
    "builder",
    "architect",
    "interior design",
    "land assistance",
    "CS Builder",
  ],
  openGraph: {
    title: "CS Builder & Developers",
    description: "From Land to Living. We Build Your Dream Home.",
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
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
