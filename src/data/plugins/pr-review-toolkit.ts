import { Plugin } from "@/lib/types";

export const prReviewToolkitPlugin: Plugin = {
  slug: "pr-review-toolkit",
  title: "PR Review Toolkit",
  description: "Specialized PR review agents for comprehensive code quality analysis covering comments, tests, errors, types, and quality",
  tags: ["code-review", "pr", "quality", "agents", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  installCommand: "claude plugins add pr-review-toolkit@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "pr-review-toolkit@claude-plugins-official": true
  }
}`,
};
