import { MCPServer } from "@/lib/types";

export const grafanaServer: MCPServer = {
  slug: "grafana",
  title: "Grafana Server",
  description: "Query Grafana dashboards, alerts, and datasources for observability and monitoring workflows",
  seoTitle: "Add Grafana MCP to Claude Code – Dashboards, Alerts & Datasources (2026)",
  seoDescription: "Step-by-step guide to add the Grafana MCP server to Claude Code. Query dashboards, alerts, and datasources from the terminal — copy-paste JSON config included.",
  tags: ["monitoring", "grafana", "observability", "dashboards", "community"],
  featured: false,
  author: {
    name: "Grafana Labs",
    url: "https://github.com/grafana",
  },
  repoUrl: "https://github.com/grafana/mcp-grafana",
  installCommand: "npm install -g @grafana/mcp-server",
  config: `{
  "mcpServers": {
    "grafana": {
      "command": "npx",
      "args": ["-y", "@grafana/mcp-server"],
      "env": {
        "GRAFANA_URL": "http://localhost:3000",
        "GRAFANA_API_KEY": "your-grafana-api-key"
      }
    }
  }
}`,
};
