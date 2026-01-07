import { Plugin } from "@/lib/types";

export const serenaPlugin: Plugin = {
  slug: "serena",
  title: "Serena",
  description: "Semantic code analysis beyond syntax. Intelligent code understanding, refactoring suggestions, and codebase navigation through deep language analysis. Understands code meaning, not just structure.",
  tags: ["code-analysis", "refactoring", "semantic", "official"],
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
  commands: [
    { name: "/serena-analyze", description: "Deep semantic analysis of code" },
    { name: "/serena-refactor", description: "Get intelligent refactoring suggestions" },
    { name: "/serena-explain", description: "Explain what code does semantically" },
  ],
};
