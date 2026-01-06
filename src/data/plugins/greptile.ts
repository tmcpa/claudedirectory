import { Plugin } from "@/lib/types";

export const greptilePlugin: Plugin = {
  slug: "greptile",
  title: "Greptile",
  description: "AI code review agent for GitHub and GitLab. View and resolve Greptile's PR review comments directly from Claude Code with intelligent code analysis and suggestions.",
  tags: ["code-review", "ai", "github", "gitlab", "official"],
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
};
