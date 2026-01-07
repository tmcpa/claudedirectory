import { Plugin } from "@/lib/types";

export const codeReviewPlugin: Plugin = {
  slug: "code-review",
  title: "Code Review",
  description: "Multi-agent code review system with confidence-based filtering. Provides comprehensive PR analysis across security, performance, maintainability, and correctness dimensions with intelligent prioritization of high-impact issues.",
  tags: ["code-review", "pr", "quality", "official", "agents"],
  featured: true,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-code-plugins",
  installCommand: "claude plugins add code-review@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "code-review@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/code-review", description: "Launch comprehensive code review on current changes or specified PR" },
    { name: "/review", description: "Quick review of staged changes with confidence scoring" },
    { name: "/review-file", description: "Deep review of a specific file" },
  ],
  relatedItems: [
    { type: "plugin", slug: "pr-review-toolkit", relationship: "works-with" },
    { type: "how-to", slug: "plugins", relationship: "documented-by" },
  ],
};
