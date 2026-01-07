import { Plugin } from "@/lib/types";

export const datadogPlugin: Plugin = {
  slug: "datadog",
  title: "Datadog",
  description: "Datadog observability platform integration. Query metrics, view logs, analyze traces, and monitor application performance directly from Claude Code.",
  tags: ["monitoring", "observability", "apm", "logs", "official"],
  featured: false,
  author: {
    name: "Datadog",
    url: "https://datadoghq.com",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/datadog",
  installCommand: "claude plugins add datadog@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "datadog@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/dd-metrics", description: "Query and visualize metrics" },
    { name: "/dd-logs", description: "Search and analyze logs" },
    { name: "/dd-traces", description: "View APM traces" },
    { name: "/dd-alerts", description: "Check active alerts and monitors" },
  ],
  relatedItems: [
    { type: "mcp-server", slug: "datadog", relationship: "requires" },
  ],
};
