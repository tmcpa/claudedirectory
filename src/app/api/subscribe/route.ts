import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: unknown; source?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = typeof body.source === "string" ? body.source.slice(0, 64) : undefined;

  if (!email || !EMAIL_REGEX.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.error("Newsletter signup: missing RESEND_API_KEY or RESEND_AUDIENCE_ID");
    return NextResponse.json(
      { error: "Newsletter is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.contacts.create({
    email,
    audienceId,
    unsubscribed: false,
  });

  if (error) {
    const message = (error as { message?: string }).message ?? "";
    if (/already exists/i.test(message)) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }
    console.error("Newsletter signup failed:", error);
    return NextResponse.json(
      { error: "Could not subscribe. Please try again later." },
      { status: 502 },
    );
  }

  if (source) {
    console.log(`Newsletter signup from "${source}": ${email}`);
  }

  return NextResponse.json({ ok: true });
}
