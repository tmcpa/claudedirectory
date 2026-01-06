import { MCPServer } from "@/lib/types";

export const jiraServer: MCPServer = {
  slug: "jira",
  title: "Jira Server",
  description: "Manage Jira issues, projects, sprints, and workflows for agile project management",
  tags: ["project-management", "jira", "agile", "issues", "atlassian", "community"],
  featured: false,
  author: {
    name: "Atlassian Community",
    url: "https://github.com/atlassian",
  },
  installCommand: "npm install -g @mcp/jira-server",
  config: `{
  "mcpServers": {
    "jira": {
      "command": "npx",
      "args": ["-y", "@mcp/jira-server"],
      "env": {
        "JIRA_HOST": "your-domain.atlassian.net",
        "JIRA_EMAIL": "your-email@example.com",
        "JIRA_API_TOKEN": "your-jira-api-token"
      }
    }
  }
}`,
};
