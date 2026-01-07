import { Plugin } from "@/lib/types";

export const gitlabPlugin: Plugin = {
  slug: "gitlab",
  title: "GitLab",
  description: "GitLab DevOps platform integration. Manage repositories, merge requests, CI/CD pipelines, issues, and wikis with comprehensive access to GitLab's full lifecycle toolset.",
  tags: ["git", "devops", "ci-cd", "integration", "official"],
  featured: false,
  author: {
    name: "GitLab",
    url: "https://gitlab.com",
  },
  installCommand: "claude plugins add gitlab@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "gitlab@claude-plugins-official": true
  }
}`,
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/gitlab",
  commands: [
    { name: "/gl-mr", description: "Create, review, or merge GitLab merge requests" },
    { name: "/gl-pipeline", description: "View and manage CI/CD pipelines" },
    { name: "/gl-issue", description: "Create and manage GitLab issues" },
    { name: "/gl-search", description: "Search across projects and code" },
  ],
  relatedItems: [
    { type: "mcp-server", slug: "gitlab", relationship: "requires" },
  ],
};
