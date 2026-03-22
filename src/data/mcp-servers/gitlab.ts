import { MCPServer } from "@/lib/types";

export const gitlabServer: MCPServer = {
  slug: "gitlab",
  title: "GitLab",
  description:
    "Access GitLab project data, manage issues, merge requests, and CI/CD pipelines",
  tags: ["gitlab", "git", "vcs", "cicd", "community"],
  featured: false,
  dateAdded: "2026-03-22",
  author: {
    name: "zereight",
    url: "https://github.com/zereight",
  },
  repoUrl: "https://github.com/zereight/gitlab-mcp",
  installCommand: "npx gitlab-mcp",
  config: `{
  "mcpServers": {
    "gitlab": {
      "command": "npx",
      "args": ["-y", "gitlab-mcp"],
      "env": {
        "GITLAB_TOKEN": "your-gitlab-token",
        "GITLAB_URL": "https://gitlab.com"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "github", relationship: "works-with" },
    { type: "plugin", slug: "gitlab", relationship: "works-with" },
  ],
};
