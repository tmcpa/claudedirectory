import type { Metadata } from "next";
import { SkillsListing } from "./_components/skills-listing";

const BASE_URL = "https://claudedirectory.org";

export const metadata: Metadata = {
  title: "Claude Code Skills & Custom Slash Commands",
  description:
    "Browse custom Claude Code skills and slash commands for code reviews, commit workflows, refactoring, test generation, and more. Add specialized workflows to your development environment.",
  keywords: [
    "claude code skills",
    "claude code slash commands",
    "claude code workflows",
    "custom commands",
    "claude code automation",
  ],
  openGraph: {
    title: "Claude Code Skills & Custom Slash Commands",
    description:
      "Browse custom Claude Code skills and slash commands for code reviews, commit workflows, refactoring, and more.",
    url: `${BASE_URL}/skills`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Claude Code Skills & Custom Slash Commands",
    description:
      "Browse custom Claude Code skills and slash commands for code reviews, commit workflows, and more.",
  },
  alternates: {
    canonical: `${BASE_URL}/skills`,
  },
};

export default function SkillsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Skills</h1>
        <p className="text-muted-foreground leading-relaxed">
          Reusable slash commands that turn multi-step processes into a single action.
          Add a skill file to .claude/commands/ and get instant access to custom workflows
          for code reviews, commits, refactoring, test generation, and more. Each skill
          below includes the prompt content ready to copy into your project or personal
          commands folder.
        </p>
      </div>

      <SkillsListing />
    </div>
  );
}
