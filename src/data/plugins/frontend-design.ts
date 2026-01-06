import { Plugin } from "@/lib/types";

export const frontendDesignPlugin: Plugin = {
  slug: "frontend-design",
  title: "Frontend Design",
  description: "Create distinctive, production-grade frontend interfaces with high design quality",
  tags: ["frontend", "design", "ui", "community"],
  featured: true,
  author: {
    name: "Claude Code Plugins",
    url: "https://github.com/anthropics/claude-code-plugins",
  },
  repoUrl: "https://github.com/anthropics/claude-code-plugins",
  installCommand: "claude plugins add frontend-design@claude-code-plugins",
  config: `{
  "enabledPlugins": {
    "frontend-design@claude-code-plugins": true
  }
}`,
};
