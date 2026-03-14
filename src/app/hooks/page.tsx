import type { Metadata } from "next";
import { HooksListing } from "./_components/hooks-listing";

const BASE_URL = "https://claudedirectory.org";

export const metadata: Metadata = {
  title: "Claude Code Hooks Guide - Automate Your Workflow",
  description:
    "Explore Claude Code hooks to automate tasks and enforce project standards. Pre and post tool-use automation scripts for formatting, linting, testing, notifications, and more.",
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
