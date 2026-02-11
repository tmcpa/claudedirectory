import { Plugin } from "@/lib/types";

export const turboCommitPlugin: Plugin = {
  slug: "turbo-commit",
  title: "Turbo Commit",
  description: "Generate conventional commit messages with AI-powered analysis of staged changes, supporting custom scopes and types",
  tags: ["git", "commits", "conventional-commits", "automation", "community"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  installCommand: "claude plugins add turbo-commit",
  commands: [
    { name: "/tc", description: "Generate a conventional commit for staged changes" },
    { name: "/tc:amend", description: "Amend the last commit message" },
  ],
};
