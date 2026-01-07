import { Plugin } from "@/lib/types";

export const asanaPlugin: Plugin = {
  slug: "asana",
  title: "Asana",
  description: "Asana project management integration. Create and manage tasks, search projects, update assignments, track progress, and integrate your development workflow with Asana's work management platform.",
  tags: ["project-management", "tasks", "integration", "official"],
  featured: false,
  author: {
    name: "Asana",
    url: "https://asana.com",
  },
  installCommand: "claude plugins add asana@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "asana@claude-plugins-official": true
  }
}`,
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/asana",
  commands: [
    { name: "/asana-task", description: "Create, view, or update Asana tasks" },
    { name: "/asana-project", description: "Manage projects and sections" },
    { name: "/asana-search", description: "Search tasks across workspaces" },
    { name: "/asana-assign", description: "Assign tasks and set due dates" },
  ],
  relatedItems: [
    { type: "mcp-server", slug: "asana", relationship: "requires" },
  ],
};
