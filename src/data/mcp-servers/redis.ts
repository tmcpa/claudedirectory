import { MCPServer } from "@/lib/types";

export const redisServer: MCPServer = {
  slug: "redis",
  title: "Redis Server",
  description: "Official Redis MCP server for data storage, caching, and search operations through natural language",
  tags: ["database", "redis", "cache", "search", "official"],
  featured: false,
  author: {
    name: "Redis",
    url: "https://github.com/redis",
  },
  repoUrl: "https://github.com/redis/mcp-redis",
  installCommand: "npm install -g @redis/mcp-server",
  config: `{
  "mcpServers": {
    "redis": {
      "command": "npx",
      "args": ["-y", "@redis/mcp-server"],
      "env": {
        "REDIS_URL": "redis://localhost:6379"
      }
    }
  }
}`,
};
