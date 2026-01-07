import { Plugin } from "@/lib/types";

export const greptilePlugin: Plugin = {
  slug: "greptile",
  title: "Greptile",
  description: "AI code review agent for GitHub and GitLab. View and resolve Greptile's PR review comments directly from Claude Code. Natural language codebase search and intelligent code analysis.",
  tags: ["code-review", "ai", "github", "gitlab", "official", "search"],
  featured: false,
  author: {
    name: "Greptile",
    url: "https://greptile.com",
  },
  installCommand: "claude plugins add greptile@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "greptile@claude-plugins-official": true
  }
}`,
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/greptile",
  commands: [
    { name: "/greptile-search", description: "Natural language search across your codebase" },
    { name: "/greptile-review", description: "Get AI review of current changes" },
    { name: "/greptile-ask", description: "Ask questions about your codebase" },
  ],
  relatedItems: [
    { type: "plugin", slug: "code-review", relationship: "works-with" },
  ],
};
