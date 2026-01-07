import { Plugin } from "@/lib/types";

export const pluginDevPlugin: Plugin = {
  slug: "plugin-dev",
  title: "Plugin Development Kit",
  description: "Comprehensive toolkit for developing Claude Code plugins with 8-phase guided workflow and 7 expert skills. Includes plugin scaffolding, manifest validation, testing tools, and publishing assistance for creating production-ready plugins.",
  tags: ["plugin", "development", "sdk", "tools", "official"],
  featured: true,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-code-plugins",
  installCommand: "claude plugins add plugin-dev@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "plugin-dev@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/plugin-dev", description: "Launch 8-phase guided plugin development workflow" },
    { name: "/plugin-init", description: "Scaffold a new plugin project with boilerplate" },
    { name: "/plugin-test", description: "Run plugin tests and validation" },
    { name: "/plugin-validate", description: "Validate plugin manifest and configuration" },
    { name: "/plugin-publish", description: "Prepare plugin for marketplace publishing" },
  ],
  relatedItems: [
    { type: "how-to", slug: "plugins", relationship: "documented-by" },
  ],
};
