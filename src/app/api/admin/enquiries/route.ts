import { NextRequest, NextResponse } from "next/server";

// Placeholder admin auth middleware
// In production: use NextAuth.js, Clerk, or Auth0 with a proper admin role check
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!ADMIN_PASSWORD || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // TODO: Return list of enquiries from your database
  return NextResponse.json({ enquiries: [] });
}
