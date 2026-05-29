import { Plugin } from "@/lib/types";

export const frontendDesignPlugin: Plugin = {
  slug: "frontend-design",
  title: "Frontend Design",
  description: "Create distinctive, production-grade frontend interfaces with high design quality. UI/UX specialist plugin that generates polished, creative code avoiding generic AI aesthetics. Supports React, Vue, Svelte, and vanilla HTML/CSS with modern design patterns.",
  seoTitle: "Frontend Design Plugin for Claude Code: Production-Grade UI in One Command (2026)",
  seoDescription: "Generate polished React, Vue, and Svelte components with Anthropic's official frontend-design plugin. One install command, modern design patterns, no generic AI aesthetics — setup in under a minute.",
  tags: ["frontend", "design", "ui", "ux", "react", "official"],
  featured: true,
  author: {
    name: "Claude Code Plugins",
    url: "https://github.com/anthropics/claude-plugins-official",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official",
  installCommand: "/plugin install frontend-design@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "frontend-design@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/frontend-design", description: "Launch guided frontend design workflow for components and pages" },
    { name: "/design", description: "Quick design mode for UI components" },
    { name: "/ui", description: "Generate UI component with design system awareness" },
    { name: "/layout", description: "Create responsive layouts and page structures" },
  ],
  relatedItems: [
    { type: "how-to", slug: "plugins", relationship: "documented-by" },
  ],
};
