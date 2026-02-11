import { MCPServer } from "@/lib/types";

export const neonServer: MCPServer = {
  slug: "neon",
  title: "Neon Postgres",
  description: "Manage Neon serverless Postgres databases, branches, and SQL queries for modern cloud-native applications",
  tags: ["database", "postgres", "serverless", "neon", "sql"],
  featured: false,
  author: {
    name: "Neon",
    url: "https://github.com/neondatabase",
  },
  repoUrl: "https://github.com/neondatabase/mcp-server-neon",
  installCommand: "npm install -g @neondatabase/mcp-server-neon",
  config: `{
  "mcpServers": {
    "neon": {
      "command": "npx",
      "args": ["-y", "@neondatabase/mcp-server-neon"],
      "env": {
        "NEON_API_KEY": "your-neon-api-key"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "postgres", relationship: "works-with" },
  ],
};
