import type { Metadata } from "next";
import { CollectionPageJsonLd } from "@/components/json-ld";
import { skills } from "@/data/skills";
import { SkillsListing } from "./_components/skills-listing";
import { BASE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Claude Code Skills - Custom Slash Commands You Can Copy Today",
  description:
    "Ready-to-use Claude Code slash commands for code reviews, commits, refactoring, and testing. Copy a skill file into .claude/commands/ and start using it instantly.",
  keywords: [
    "claude code skills",
    "claude code slash commands",
    "claude code workflows",
    "custom commands",
    "claude code automation",
  ],
  openGraph: {
    title: "Claude Code Skills - Custom Slash Commands You Can Copy Today",
    description:
      "Ready-to-use Claude Code slash commands for code reviews, commits, refactoring, and testing. Copy a skill file into .claude/commands/ and start using it instantly.",
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
      <CollectionPageJsonLd
        name="Claude Code Skills"
        description="Reusable slash commands that turn multi-step processes into a single action for Claude Code."
        url={`${BASE_URL}/skills`}
        itemCount={skills.length}
      />
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
