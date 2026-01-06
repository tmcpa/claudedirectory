import { Plugin } from "@/lib/types";

export const linearPlugin: Plugin = {
  slug: "linear",
  title: "Linear",
  description: "Linear issue tracking integration. Create issues, manage projects, update statuses, search across workspaces, and streamline your development workflow with Linear's modern issue tracking system.",
  tags: ["issue-tracking", "project-management", "integration", "official"],
  featured: true,
  author: {
    name: "Linear",
    url: "https://linear.app",
  },
  installCommand: "claude plugins add linear@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "linear@claude-plugins-official": true
  }
}`,
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/linear",
  relatedItems: [
    { type: "mcp-server", slug: "linear" },
  ],
};
