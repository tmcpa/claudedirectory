"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

interface NewsletterFormProps {
  variant?: "card" | "inline" | "footer";
  source?: string;
  title?: string;
  description?: string;
  className?: string;
}

const DEFAULT_TITLE = "The Claude Code weekly";
const DEFAULT_DESCRIPTION =
  "New prompts, MCP servers, agents, and plugins — plus the best posts of the week. One email on Sundays. Unsubscribe anytime.";

export function NewsletterForm({
  variant = "card",
  source,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  className,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, source }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(
        data?.alreadySubscribed
          ? "You're already on the list — thanks!"
          : "You're in. Check your inbox for a welcome email."
      );
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  const isBusy = status === "loading";
  const isDone = status === "success";

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className={cn("space-y-2", className)} noValidate>
        <label htmlFor="newsletter-email-footer" className="sr-only">
          Email address
        </label>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
          aria-hidden="true"
        />
        <div className="flex gap-2">
          <Input
            id="newsletter-email-footer"
            type="email"
            required
            autoComplete="email"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isBusy || isDone}
            className="h-9 text-sm"
          />
          <Button
            type="submit"
            size="sm"
            disabled={isBusy || isDone}
            aria-label="Subscribe to newsletter"
          >
            {isBusy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isDone ? (
              <Check className="h-4 w-4" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </div>
        {message && (
          <p
            className={cn(
              "text-xs",
              status === "error" ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {message}
          </p>
        )}
      </form>
    );
  }

  const wrapperClass =
    variant === "card"
      ? "rounded-lg border bg-card p-6 md:p-8"
      : "rounded-lg border-l-4 border-primary bg-accent/30 p-5";

  return (
    <div className={cn(wrapperClass, className)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3 md:max-w-xl">
          <div className="hidden md:flex p-2 rounded-md bg-background border shrink-0">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-base md:text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-2 md:w-auto md:min-w-[360px]"
          noValidate
        >
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor={`newsletter-email-${variant}`} className="sr-only">
              Email address
            </label>
            <Input
              id={`newsletter-email-${variant}`}
              type="email"
              required
              autoComplete="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isBusy || isDone}
              className="h-10"
            />
            <Button
              type="submit"
              disabled={isBusy || isDone}
              className="h-10"
            >
              {isBusy ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subscribing
                </>
              ) : isDone ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Subscribed
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </div>
          {message && (
            <p
              className={cn(
                "text-xs",
                status === "error" ? "text-destructive" : "text-muted-foreground"
              )}
              role={status === "error" ? "alert" : "status"}
            >
              {message}
            </p>
          )}
          {!message && (
            <p className="text-xs text-muted-foreground">
              No spam. Unsubscribe in one click.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
