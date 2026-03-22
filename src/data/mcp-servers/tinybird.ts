import { MCPServer } from "@/lib/types";

export const tinybirdServer: MCPServer = {
  slug: "tinybird",
  title: "Tinybird",
  description:
    "Connect to Tinybird for real-time analytics, query data sources, create API endpoints, and manage your analytics workspace",
  tags: ["analytics", "tinybird", "real-time", "data", "community"],
  featured: false,
  dateAdded: "2026-03-22",
  author: {
    name: "Tinybird",
    url: "https://github.com/tinybirdco",
  },
  repoUrl: "https://github.com/tinybirdco/mcp-tinybird",
  installCommand: "npx @tinybirdco/mcp-tinybird",
  config: `{
  "mcpServers": {
    "tinybird": {
      "command": "npx",
      "args": ["-y", "@tinybirdco/mcp-tinybird"],
      "env": {
        "TINYBIRD_TOKEN": "your-tinybird-admin-token"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "bigquery", relationship: "works-with" },
  ],
};
