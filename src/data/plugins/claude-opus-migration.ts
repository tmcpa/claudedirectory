import { Plugin } from "@/lib/types";

export const claudeOpusMigrationPlugin: Plugin = {
  slug: "claude-opus-migration",
  title: "Claude Opus 4.6 Migration",
  description: "Migrate code from earlier Opus/Sonnet versions to Opus 4.6 with automated model string and prompt adjustments",
  tags: ["migration", "upgrade", "opus", "models", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official",
  installCommand: "/plugin install claude-opus-4-6-migration@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "claude-opus-4-6-migration@claude-plugins-official": true
  }
}`,
};
