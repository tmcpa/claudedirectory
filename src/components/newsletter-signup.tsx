"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

interface NewsletterSignupProps {
  source?: string;
  className?: string;
  variant?: "inline" | "stacked";
  buttonLabel?: string;
  placeholder?: string;
  successMessage?: string;
}

export function NewsletterSignup({
  source = "unknown",
  className,
  variant = "inline",
  buttonLabel = "Subscribe",
  placeholder = "you@example.com",
  successMessage = "You're in. Check your inbox to confirm.",
}: NewsletterSignupProps) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [message, setMessage] = React.useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        alreadySubscribed?: boolean;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(
        data.alreadySubscribed
          ? "You're already subscribed — thanks for sticking with us."
          : successMessage,
      );
      setEmail("");

      if (typeof window !== "undefined") {
        const w = window as unknown as { gtag?: (...args: unknown[]) => void };
        w.gtag?.("event", "newsletter_signup", { source });
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300",
          className,
        )}
        role="status"
      >
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        variant === "inline"
          ? "flex w-full flex-col gap-2 sm:flex-row"
          : "flex w-full flex-col gap-2",
        className,
      )}
      noValidate
    >
      <label htmlFor={`newsletter-email-${source}`} className="sr-only">
        Email address
      </label>
      <Input
        id={`newsletter-email-${source}`}
        type="email"
        name="email"
        autoComplete="email"
        inputMode="email"
        required
        placeholder={placeholder}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") {
            setStatus("idle");
            setMessage(null);
          }
        }}
        disabled={status === "loading"}
        aria-invalid={status === "error" || undefined}
        className="flex-1"
      />
      <Button
        type="submit"
        disabled={status === "loading" || email.length === 0}
        className={variant === "inline" ? "sm:w-auto" : "w-full"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Subscribing
          </>
        ) : (
          <>
            <Mail className="h-4 w-4" />
            {buttonLabel}
          </>
        )}
      </Button>
      {status === "error" && message && (
        <p
          className="basis-full text-xs text-destructive sm:order-3"
          role="alert"
        >
          {message}
        </p>
      )}
    </form>
  );
}
