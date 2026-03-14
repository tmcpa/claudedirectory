import { MCPServer } from "@/lib/types";

export const prismaServer: MCPServer = {
  slug: "prisma",
  title: "Prisma Server",
  description:
    "Interact with Prisma ORM to manage database schemas, run migrations, and query data",
  tags: ["prisma", "orm", "database", "schema", "migrations", "community"],
  featured: false,
  author: {
    name: "Prisma Community",
    url: "https://github.com/prisma",
  },
  repoUrl: "https://github.com/prisma/prisma-mcp",
  installCommand: "npm install -g @prisma/mcp-server",
  config: `{
  "mcpServers": {
    "prisma": {
      "command": "npx",
      "args": ["-y", "@prisma/mcp-server"],
      "env": {
        "DATABASE_URL": "your-database-connection-string"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "postgres", relationship: "works-with" },
  ],
};
