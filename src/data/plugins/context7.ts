import { Plugin } from "@/lib/types";

export const context7Plugin: Plugin = {
  slug: "context7",
  title: "Context7",
  description: "Upstash Context7 MCP server for up-to-date documentation lookup. Pull version-specific documentation and code examples directly from source repositories into your LLM context.",
  tags: ["documentation", "context", "upstash", "official"],
  featured: false,
  author: {
    name: "Upstash",
    url: "https://upstash.com",
  },
  installCommand: "claude plugins add context7@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "context7@claude-plugins-official": true
  }
}`,
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/context7",
};
