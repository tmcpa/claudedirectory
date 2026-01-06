import { Plugin } from "@/lib/types";

export const hookifyPlugin: Plugin = {
  slug: "hookify",
  title: "Hookify",
  description: "Create custom hooks to prevent unwanted behaviors with /hookify, /hookify:list, and /hookify:configure commands",
  tags: ["hooks", "automation", "customization", "workflow", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-code-plugins",
  installCommand: "claude plugins add hookify@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "hookify@claude-plugins-official": true
  }
}`,
};
