import { Plugin } from "@/lib/types";

export const serenaPlugin: Plugin = {
  slug: "serena",
  title: "Serena",
  description: "Semantic code analysis MCP server. Intelligent code understanding, refactoring suggestions, and codebase navigation through language server protocol integration.",
  tags: ["code-analysis", "refactoring", "lsp", "official"],
  featured: false,
  author: {
    name: "Oraios",
    url: "https://github.com/oraios",
  },
  installCommand: "claude plugins add serena@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "serena@claude-plugins-official": true
  }
}`,
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/serena",
};
