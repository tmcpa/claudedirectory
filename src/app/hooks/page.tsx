import type { Metadata } from "next";
import { CollectionPageJsonLd } from "@/components/json-ld";
import { hooks } from "@/data/hooks";
import { HooksListing } from "./_components/hooks-listing";
import { BASE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Claude Code Hooks - Auto-Format, Lint & Test on Every Edit",
  description:
    "Ready-to-use Claude Code hooks that auto-format, lint, test, and notify on every tool use. Copy the script and JSON config — automation runs without manual intervention.",
  keywords: [
    "claude code hooks",
    "claude code automation",
    "PreToolUse hooks",
    "PostToolUse hooks",
    "claude code workflow",
  ],
  openGraph: {
    title: "Claude Code Hooks Guide - Automate Your Workflow",
    description:
      "Explore Claude Code hooks to automate tasks and enforce project standards. Pre and post tool-use automation scripts for your development workflow.",
    url: `${BASE_URL}/hooks`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Claude Code Hooks Guide - Automate Your Workflow",
    description:
      "Explore Claude Code hooks to automate tasks and enforce project standards.",
  },
  alternates: {
    canonical: `${BASE_URL}/hooks`,
  },
};

export default function HooksPage() {
  return (
    <div className="container py-8">
      <CollectionPageJsonLd
        name="Claude Code Hooks"
        description="Shell scripts that run automatically before or after Claude Code uses a tool."
        url={`${BASE_URL}/hooks`}
        itemCount={hooks.length}
      />
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Hooks</h1>
        <p className="text-muted-foreground leading-relaxed">
          Shell scripts that run automatically before or after Claude Code uses a tool.
          Use hooks to auto-format code, enforce linting, block risky file edits, run
          tests, or send notifications — all without manual intervention. Supports
          PreToolUse, PostToolUse, Notification, and Stop events. Each hook below
          includes a ready-to-use script and configuration.
        </p>
      </div>

      <HooksListing />
    </div>
  );
}
