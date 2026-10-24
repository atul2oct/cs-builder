import { NextRequest, NextResponse } from "next/server";

interface EnquiryPayload {
  name: string;
  phone: string;
  location: string;
  stage: string;
  budget?: string;
  requirements?: string;
}

// Simple honeypot / rate-limit: In production, add proper rate limiting
// (e.g. Upstash Redis + @upstash/ratelimit) and a CAPTCHA.
const RECENT_SUBMISSIONS = new Map<string, number>();

function simpleRateLimit(ip: string): boolean {
  const now = Date.now();
  const last = RECENT_SUBMISSIONS.get(ip);
  if (last && now - last < 60_000) return false; // 1 per minute per IP
  RECENT_SUBMISSIONS.set(ip, now);
  // Clean old entries
  if (RECENT_SUBMISSIONS.size > 1000) {
    const cutoff = now - 60_000;
    for (const [key, val] of RECENT_SUBMISSIONS) {
      if (val < cutoff) RECENT_SUBMISSIONS.delete(key);
    }
  }
  return true;
}

function validatePayload(body: unknown): body is EnquiryPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" && b.name.trim().length > 0 &&
    typeof b.phone === "string" && /^[6-9]\d{9}$/.test(b.phone.replace(/\s/g, "")) &&
    typeof b.location === "string" && b.location.trim().length > 0 &&
    typeof b.stage === "string" && b.stage.trim().length > 0
  );
}

export async function POST(req: NextRequest) {
  // Basic rate limit
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!simpleRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!validatePayload(body)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 422 });
  }

  const { name, phone, location, stage, budget, requirements } = body;

  // ── Email delivery ───────────────────────────────────────────────────────
  // TODO: Replace with your email service (Resend, SendGrid, Nodemailer, etc.)
  // Example with Resend (npm install resend):
  //
  // import { Resend } from 'resend';
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'enquiries@csbuilder.in',
  //   to: 'your@email.com',
  //   subject: `New Enquiry from ${name}`,
  //   text: `Name: ${name}\nPhone: ${phone}\nLocation: ${location}\nStage: ${stage}\nBudget: ${budget}\nRequirements: ${requirements}`,
  // });

  // For now: log to console (Vercel will capture this in Function logs)
  console.log("[ENQUIRY]", {
    timestamp: new Date().toISOString(),
    name,
    phone,
    location,
    stage,
    budget: budget || "—",
    requirements: requirements || "—",
    ip,
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
