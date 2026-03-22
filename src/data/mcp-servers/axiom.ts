import { MCPServer } from "@/lib/types";

export const axiomServer: MCPServer = {
  slug: "axiom",
  title: "Axiom",
  description:
    "Query and analyze Axiom logs, traces, and event data using natural language with APL (Axiom Processing Language)",
  tags: ["observability", "axiom", "logs", "monitoring", "community"],
  featured: false,
  dateAdded: "2026-03-22",
  author: {
    name: "Axiom",
    url: "https://github.com/axiomhq",
  },
  repoUrl: "https://github.com/axiomhq/mcp-server-axiom",
  installCommand: "npx @axiomhq/mcp-server",
  config: `{
  "mcpServers": {
    "axiom": {
      "command": "npx",
      "args": ["-y", "@axiomhq/mcp-server"],
      "env": {
        "AXIOM_TOKEN": "your-axiom-api-token",
        "AXIOM_ORG_ID": "your-org-id"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "datadog", relationship: "works-with" },
    { type: "mcp-server", slug: "grafana", relationship: "works-with" },
  ],
};
