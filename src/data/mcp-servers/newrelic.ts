import { MCPServer } from "@/lib/types";

export const newrelicServer: MCPServer = {
  slug: "newrelic",
  title: "New Relic",
  description:
    "Query telemetry data, investigate alerts, analyze application performance, and manage dashboards in New Relic",
  tags: ["monitoring", "newrelic", "apm", "observability", "community"],
  featured: false,
  dateAdded: "2026-03-22",
  author: {
    name: "New Relic",
    url: "https://github.com/newrelic",
  },
  repoUrl: "https://github.com/newrelic/mcp-server",
  installCommand: "npx @newrelic/mcp-server",
  config: `{
  "mcpServers": {
    "newrelic": {
      "command": "npx",
      "args": ["-y", "@newrelic/mcp-server"],
      "env": {
        "NEW_RELIC_API_KEY": "your-new-relic-api-key",
        "NEW_RELIC_ACCOUNT_ID": "your-account-id"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "datadog", relationship: "works-with" },
    { type: "mcp-server", slug: "grafana", relationship: "works-with" },
  ],
};
