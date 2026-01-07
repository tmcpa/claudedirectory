import { Plugin } from "@/lib/types";

export const jiraPlugin: Plugin = {
  slug: "jira",
  title: "Jira",
  description: "Atlassian Jira integration for issue tracking and project management. Create issues, update tickets, search across projects, and link commits to Jira tickets.",
  tags: ["issue-tracking", "project-management", "atlassian", "official"],
  featured: false,
  author: {
    name: "Atlassian",
    url: "https://www.atlassian.com/software/jira",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/jira",
  installCommand: "claude plugins add jira@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "jira@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/jira-issue", description: "Create, view, or update Jira issues" },
    { name: "/jira-search", description: "Search issues with JQL" },
    { name: "/jira-sprint", description: "View sprint progress and backlog" },
    { name: "/jira-link", description: "Link commits and PRs to issues" },
  ],
  relatedItems: [
    { type: "mcp-server", slug: "jira", relationship: "requires" },
  ],
};
