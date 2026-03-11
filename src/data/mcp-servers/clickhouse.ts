import { MCPServer } from "@/lib/types";

export const clickhouseServer: MCPServer = {
  slug: "clickhouse",
  title: "ClickHouse Server",
  description: "Query and manage ClickHouse analytical databases for real-time analytics and large-scale data processing",
  tags: ["clickhouse", "database", "analytics", "olap", "data"],
  featured: false,
  dateAdded: "2026-03-11",
  author: {
    name: "ClickHouse",
    url: "https://github.com/ClickHouse",
  },
  repoUrl: "https://github.com/ClickHouse/mcp-clickhouse",
  installCommand: "pip install mcp-clickhouse",
  config: `{
  "mcpServers": {
    "clickhouse": {
      "command": "uvx",
      "args": ["mcp-clickhouse"],
      "env": {
        "CLICKHOUSE_HOST": "localhost",
        "CLICKHOUSE_PORT": "8123",
        "CLICKHOUSE_USER": "default",
        "CLICKHOUSE_PASSWORD": "your-password"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "postgres", relationship: "works-with" },
  ],
};
