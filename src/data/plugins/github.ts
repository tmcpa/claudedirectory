import { Plugin } from "@/lib/types";

export const githubPlugin: Plugin = {
  slug: "github",
  title: "GitHub",
  description: "GitHub repository management. Create issues, manage pull requests, review code, search repositories, and interact with GitHub's full API directly from Claude Code. Includes workflow automation and Actions integration.",
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
  commands: [
    { name: "/gh-issue", description: "Create, view, or update GitHub issues" },
    { name: "/gh-pr", description: "Create, review, or merge pull requests" },
    { name: "/gh-actions", description: "View and manage GitHub Actions workflows" },
    { name: "/gh-search", description: "Search repositories, code, and issues" },
  ],
  relatedItems: [
    { type: "mcp-server", slug: "github", relationship: "requires" },
    { type: "plugin", slug: "commit-commands", relationship: "works-with" },
  ],
};
