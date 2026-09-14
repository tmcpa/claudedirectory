import { MCPServer } from "@/lib/types";

export const mysqlLegacyMcpServer: MCPServer = {
  slug: "mysql-legacy-mcp",
  title: "MySQL Legacy MCP",
  description:
    "Schema inspection and SELECT for MySQL 5.0–5.6, with opt-in INSERT/UPDATE/DELETE/DDL. Live-verified against MySQL 5.0–8.0.",
  tags: ["database", "mysql", "sql", "legacy", "community"],
  featured: false,
  dateAdded: "2026-09-14",
  author: {
    name: "Rufflet",
    url: "https://github.com/Rufflet",
  },
  repoUrl: "https://github.com/Rufflet/mysql-legacy-mcp",
  docsUrl: "https://github.com/Rufflet/mysql-legacy-mcp/blob/main/docs/INSTALLATION.md",
  installCommand: "npx -y mysql-legacy-mcp",
  config: `{
  "mcpServers": {
    "mysql-legacy": {
      "command": "npx",
      "args": ["-y", "mysql-legacy-mcp"],
      "env": {
        "MYSQL_LEGACY_HOST": "127.0.0.1",
        "MYSQL_LEGACY_USER": "legacy_reader",
        "MYSQL_LEGACY_PASSWORD": "replace-with-a-secret",
        "MYSQL_LEGACY_DATABASE": "legacy_app"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "mysql", relationship: "works-with" },
    { type: "mcp-server", slug: "postgres", relationship: "works-with" },
  ],
};
