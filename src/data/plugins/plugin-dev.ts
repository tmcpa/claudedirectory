import { Plugin } from "@/lib/types";

export const pluginDevPlugin: Plugin = {
  slug: "plugin-dev",
  title: "Plugin Development Kit",
  description: "Comprehensive toolkit for developing Claude Code plugins with 8-phase guided workflow and 7 expert skills",
  tags: ["plugin", "development", "sdk", "tools", "official"],
  featured: true,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  installCommand: "claude plugins add plugin-dev@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "plugin-dev@claude-plugins-official": true
  }
}`,
};
