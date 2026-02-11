import { MCPServer } from "@/lib/types";

export const tursoServer: MCPServer = {
  slug: "turso",
  title: "Turso Database",
  description: "Interact with Turso/LibSQL edge databases for low-latency, globally distributed SQLite-compatible storage",
  tags: ["database", "turso", "libsql", "sqlite", "edge"],
  featured: false,
  author: {
    name: "Turso",
    url: "https://github.com/tursodatabase",
  },
  repoUrl: "https://github.com/tursodatabase/turso-mcp",
  installCommand: "npm install -g @tursodatabase/mcp-server",
  config: `{
  "mcpServers": {
    "turso": {
      "command": "npx",
      "args": ["-y", "@tursodatabase/mcp-server"],
      "env": {
        "TURSO_API_TOKEN": "your-turso-api-token"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "sqlite", relationship: "works-with" },
  ],
};
