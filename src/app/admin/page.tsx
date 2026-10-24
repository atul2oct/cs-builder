import type { Metadata } from "next";
import AdminShell from "./AdminShell";

export const metadata: Metadata = {
  title: "Admin — CS Builder & Developers",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminShell />;
}
