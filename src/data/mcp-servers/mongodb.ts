import { MCPServer } from "@/lib/types";

export const mongodbServer: MCPServer = {
  slug: "mongodb",
  title: "MongoDB Server",
  description: "Query, aggregate, and manage MongoDB databases with schema inspection and natural language operations",
  tags: ["database", "mongodb", "nosql", "community"],
  featured: true,
  author: {
    name: "MongoDB",
    url: "https://github.com/mongodb",
  },
  installCommand: "npm install -g @mongodb-js/mcp-server-mongodb",
  config: `{
  "mcpServers": {
    "mongodb": {
      "command": "npx",
      "args": ["-y", "@mongodb-js/mcp-server-mongodb"],
      "env": {
        "MONGODB_URI": "mongodb://localhost:27017/your-database"
      }
    }
  }
}`,
};
