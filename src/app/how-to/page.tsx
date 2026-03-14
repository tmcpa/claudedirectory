import type { Metadata } from "next";
import { HowToListing } from "./_components/how-to-listing";

const BASE_URL = "https://claudedirectory.org";

export const metadata: Metadata = {
  title: "Claude Code Tutorials & How-To Guides",
  description:
    "Learn how to use Claude Code with step-by-step tutorials. From setup and configuration to advanced workflows, automation patterns, and multi-agent orchestration. Guides for every skill level.",
  keywords: [
    "claude code tutorials",
    "how to use claude code",
    "claude code guides",
    "claude code setup",
    "claude code workflow",
  ],
  openGraph: {
    title: "Claude Code Tutorials & How-To Guides",
    description:
      "Learn how to use Claude Code with step-by-step tutorials. Guides for every skill level from beginner to advanced.",
    url: `${BASE_URL}/how-to`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Claude Code Tutorials & How-To Guides",
    description:
      "Learn how to use Claude Code with step-by-step tutorials. Guides for every skill level.",
  },
  alternates: {
    canonical: `${BASE_URL}/how-to`,
  },
};

export default function HowToPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">How To Guides</h1>
        <p className="text-muted-foreground leading-relaxed">
          Step-by-step tutorials covering everything from initial setup to advanced
          workflows and multi-agent orchestration. Organized by difficulty — beginner,
          intermediate, and advanced — with estimated completion times. Each guide walks
          through real-world scenarios with clear instructions and examples.
        </p>
      </div>

      <HowToListing />
    </div>
  );
}
