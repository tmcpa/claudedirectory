import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { email, website } = body as { email?: unknown; website?: unknown };

    // Honeypot: if the hidden "website" field is filled, silently accept.
    if (typeof website === "string" && website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    if (typeof email !== "string" || !EMAIL_REGEX.test(email) || email.length > 254) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      console.error("Newsletter subscribe: RESEND_API_KEY or RESEND_AUDIENCE_ID missing.");
      return NextResponse.json(
        { error: "Newsletter is not configured yet. Try again soon." },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.contacts.create({
      email: email.toLowerCase().trim(),
      audienceId,
      unsubscribed: false,
    });

    if (error) {
      const message = error.message?.toLowerCase() ?? "";
      // Resend returns an error when the contact already exists — treat as success.
      if (message.includes("already exists") || message.includes("duplicate")) {
        return NextResponse.json({ ok: true, alreadySubscribed: true });
      }
      console.error("Resend contacts.create error:", error);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter subscribe unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
