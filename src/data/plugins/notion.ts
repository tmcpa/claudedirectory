import { Plugin } from "@/lib/types";

export const notionPlugin: Plugin = {
  slug: "notion",
  title: "Notion",
  description: "Notion workspace integration. Search pages, create and update content, manage databases, and sync documentation with your development workflow.",
  tags: ["documentation", "notes", "wiki", "integration", "official"],
  featured: false,
  author: {
    name: "Notion",
    url: "https://notion.so",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/notion",
  installCommand: "claude plugins add notion@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "notion@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/notion-search", description: "Search across Notion workspace" },
    { name: "/notion-create", description: "Create new page or database entry" },
    { name: "/notion-update", description: "Update existing page content" },
    { name: "/notion-sync", description: "Sync documentation with codebase" },
  ],
  relatedItems: [
    { type: "mcp-server", slug: "notion", relationship: "requires" },
  ],
};
