import type { Metadata } from "next";
import { PromptsListing } from "./_components/prompts-listing";

const BASE_URL = "https://claudedirectory.org";

export const metadata: Metadata = {
  title: "Best Claude Code Prompts & CLAUDE.md Templates",
  description:
    "Find the best Claude Code prompts and CLAUDE.md templates for TypeScript, Python, React, Go, Rust, and more. Community-curated configurations to customize Claude Code for your projects.",
  keywords: [
    "claude code prompts",
    "CLAUDE.md templates",
    "best claude code prompts",
    "claude code configuration",
    "ai coding prompts",
  ],
  openGraph: {
    title: "Best Claude Code Prompts & CLAUDE.md Templates",
    description:
      "Find the best Claude Code prompts and CLAUDE.md templates for TypeScript, Python, React, Go, Rust, and more.",
    url: `${BASE_URL}/prompts`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Best Claude Code Prompts & CLAUDE.md Templates",
    description:
      "Find the best Claude Code prompts and CLAUDE.md templates for TypeScript, Python, React, Go, Rust, and more.",
  },
  alternates: {
    canonical: `${BASE_URL}/prompts`,
  },
};

export default function PromptsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Prompts</h1>
        <p className="text-muted-foreground leading-relaxed">
          Community-curated CLAUDE.md templates that give Claude Code deep understanding
          of your tech stack. Drop one into your project root and Claude Code automatically
          picks up your preferences for frameworks, linting, testing, and coding conventions.
          Browse by language — TypeScript, Python, React, Go, Rust, and more — then
          customize for your project.
        </p>
      </div>

      <PromptsListing />
    </div>
  );
}
