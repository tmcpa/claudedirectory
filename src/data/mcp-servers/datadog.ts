import { MCPServer } from "@/lib/types";

export const datadogServer: MCPServer = {
  slug: "datadog",
  title: "Datadog Server",
  description: "Query metrics, logs, and traces from Datadog for observability and monitoring insights",
  tags: ["datadog", "monitoring", "observability", "logs", "metrics", "apm"],
  featured: false,
  author: {
    name: "Datadog",
    url: "https://github.com/DataDog",
  },
  repoUrl: "https://github.com/DataDog/datadog-mcp-server",
  installCommand: "pip install datadog-mcp-server",
  config: `{
  "mcpServers": {
    "datadog": {
      "command": "python",
      "args": ["-m", "datadog_mcp_server"],
      "env": {
        "DD_API_KEY": "your-datadog-api-key",
        "DD_APP_KEY": "your-datadog-app-key"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "grafana", relationship: "works-with" },
  ],
};
