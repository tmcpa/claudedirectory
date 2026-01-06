import { Plugin } from "@/lib/types";

export const claudeOpusMigrationPlugin: Plugin = {
  slug: "claude-opus-migration",
  title: "Claude Opus 4.5 Migration",
  description: "Migrate code from Sonnet 4.x and Opus 4.1 to Opus 4.5 with automated model string and prompt adjustments",
  tags: ["migration", "upgrade", "opus", "models", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  installCommand: "claude plugins add claude-opus-4-5-migration@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "claude-opus-4-5-migration@claude-plugins-official": true
  }
}`,
};
