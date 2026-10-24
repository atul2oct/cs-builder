import { NextRequest, NextResponse } from "next/server";
import { addEnquiry } from "@/lib/projectStore";

const RECENT_SUBMISSIONS = new Map<string, number>();

function simpleRateLimit(ip: string): boolean {
  const now = Date.now();
  const last = RECENT_SUBMISSIONS.get(ip);
  if (last && now - last < 30_000) return false;
  RECENT_SUBMISSIONS.set(ip, now);
  if (RECENT_SUBMISSIONS.size > 1000) {
    const cutoff = now - 60_000;
    for (const [key, val] of RECENT_SUBMISSIONS) {
      if (val < cutoff) RECENT_SUBMISSIONS.delete(key);
    }
  }
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!simpleRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name || !body.phone || !body.location || !body.stage) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 422 });
  }

  const saved = addEnquiry({
    name: body.name.trim(),
    phone: body.phone.trim(),
    location: body.location.trim(),
    stage: body.stage,
    budget: body.budget?.trim() || "Not specified",
    requirements: body.requirements?.trim() || "None specified",
  });

  console.log("[NEW ENQUIRY SAVED]", saved);

  return NextResponse.json({ success: true, enquiry: saved }, { status: 200 });
}
