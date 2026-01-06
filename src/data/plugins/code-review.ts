import { Plugin } from "@/lib/types";

export const codeReviewPlugin: Plugin = {
  slug: "code-review",
  title: "Code Review",
  description: "Automated code review for pull requests with detailed feedback and suggestions",
  tags: ["code-review", "pr", "quality", "official"],
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
};
