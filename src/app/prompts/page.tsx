import type { Metadata } from "next";
import { CollectionPageJsonLd } from "@/components/json-ld";
import { prompts } from "@/data/prompts";
import { PromptsListing } from "./_components/prompts-listing";
import { BASE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Best CLAUDE.md Templates & Prompts for Every Tech Stack",
  description:
    "Copy-paste CLAUDE.md templates for TypeScript, Python, React, Go, Rust, and more. Give Claude Code deep understanding of your project's frameworks, linting, and conventions in seconds.",
  keywords: [
    "claude code prompts",
    "CLAUDE.md templates",
    "best claude code prompts",
    "claude code configuration",
    "ai coding prompts",
  ],
  openGraph: {
    title: "Best CLAUDE.md Templates & Prompts for Every Tech Stack",
    description:
      "Copy-paste CLAUDE.md templates for TypeScript, Python, React, Go, Rust, and more. Give Claude Code deep understanding of your project's frameworks, linting, and conventions in seconds.",
    url: `${BASE_URL}/prompts`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Best CLAUDE.md Templates & Prompts for Every Tech Stack",
    description:
      "Copy-paste CLAUDE.md templates for TypeScript, Python, React, Go, Rust, and more. Give Claude Code deep understanding of your project's frameworks, linting, and conventions in seconds.",
  },
  alternates: {
    canonical: `${BASE_URL}/prompts`,
  },
};

export default function PromptsPage() {
  return (
    <div className="container py-8">
      <CollectionPageJsonLd
        name="CLAUDE.md Templates & Prompts"
        description="Community-curated CLAUDE.md templates that give Claude Code deep understanding of your tech stack."
        url={`${BASE_URL}/prompts`}
        itemCount={prompts.length}
      />
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
