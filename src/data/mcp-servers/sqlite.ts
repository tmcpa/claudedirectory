import { MCPServer } from "@/lib/types";

export const sqliteServer: MCPServer = {
  slug: "sqlite",
  title: "SQLite Server",
  description: "Interact with SQLite databases for queries, schema inspection, and data analysis",
  tags: ["database", "sqlite", "sql", "official"],
  featured: true,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite",
  installCommand: "npm install -g @anthropic-ai/mcp-server-sqlite",
  config: `{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-sqlite",
        "--db-path",
        "/path/to/your/database.db"
      ]
    }
  }
}`,
};
