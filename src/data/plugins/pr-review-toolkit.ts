import { Plugin } from "@/lib/types";

export const prReviewToolkitPlugin: Plugin = {
  slug: "pr-review-toolkit",
  title: "PR Review Toolkit",
  description: "Specialized PR review agents for comprehensive code quality analysis. Six-dimensional review covering comments, tests, errors, types, quality, and security. Multi-agent approach for thorough analysis.",
  tags: ["code-review", "pr", "quality", "agents", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-code-plugins",
  installCommand: "claude plugins add pr-review-toolkit@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "pr-review-toolkit@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/pr-review", description: "Full six-dimensional PR review" },
    { name: "/pr-comments", description: "Review PR for comment quality and documentation" },
    { name: "/pr-tests", description: "Analyze test coverage and quality in PR" },
    { name: "/pr-types", description: "Check type safety and type coverage" },
    { name: "/pr-security", description: "Security-focused PR review" },
  ],
  relatedItems: [
    { type: "plugin", slug: "code-review", relationship: "works-with" },
  ],
};
