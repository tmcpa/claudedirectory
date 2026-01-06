import { MCPServer } from "@/lib/types";

export const atlassianServer: MCPServer = {
  slug: "atlassian",
  title: "Atlassian Server",
  description: "Unified access to Atlassian products including Confluence, Jira, and Bitbucket",
  tags: ["atlassian", "confluence", "jira", "bitbucket", "documentation", "project-management"],
  featured: false,
  author: {
    name: "Atlassian",
    url: "https://github.com/atlassian",
  },
  repoUrl: "https://github.com/atlassian/mcp-server-atlassian",
  installCommand: "pip install mcp-server-atlassian",
  config: `{
  "mcpServers": {
    "atlassian": {
      "command": "uvx",
      "args": ["mcp-server-atlassian"],
      "env": {
        "ATLASSIAN_SITE_URL": "https://your-domain.atlassian.net",
        "ATLASSIAN_USER_EMAIL": "your-email@example.com",
        "ATLASSIAN_API_TOKEN": "your-api-token"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "jira", relationship: "contains" },
  ],
};
