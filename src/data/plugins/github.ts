import { Plugin } from "@/lib/types";

export const githubPlugin: Plugin = {
  slug: "github",
  title: "GitHub",
  description: "GitHub repository management. Create issues, manage pull requests, review code, search repositories, and interact with GitHub's full API directly from Claude Code.",
  tags: ["git", "version-control", "integration", "official"],
  featured: true,
  author: {
    name: "GitHub",
    url: "https://github.com",
  },
  installCommand: "claude plugins add github@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "github@claude-plugins-official": true
  }
}`,
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/github",
  relatedItems: [
    { type: "mcp-server", slug: "github" },
  ],
};
