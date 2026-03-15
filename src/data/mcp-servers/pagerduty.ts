import { MCPServer } from "@/lib/types";

export const pagerdutyServer: MCPServer = {
  slug: "pagerduty",
  title: "PagerDuty Server",
  description:
    "Manage incidents, on-call schedules, and alerts through PagerDuty's incident management platform",
  tags: ["pagerduty", "incidents", "on-call", "alerting", "monitoring", "community"],
  featured: false,
  author: {
    name: "PagerDuty Community",
    url: "https://github.com/PagerDuty",
  },
  repoUrl: "https://github.com/PagerDuty/pagerduty-mcp-server",
  installCommand: "npm install -g @pagerduty/mcp-server",
  config: `{
  "mcpServers": {
    "pagerduty": {
      "command": "npx",
      "args": ["-y", "@pagerduty/mcp-server"],
      "env": {
        "PAGERDUTY_API_KEY": "your-pagerduty-api-key"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "datadog", relationship: "works-with" },
  ],
};
