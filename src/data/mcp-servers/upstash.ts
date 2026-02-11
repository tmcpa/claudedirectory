import { MCPServer } from "@/lib/types";

export const upstashServer: MCPServer = {
  slug: "upstash",
  title: "Upstash Server",
  description: "Manage Upstash serverless Redis, Kafka, and QStash for event-driven and caching workloads",
  tags: ["database", "redis", "kafka", "serverless", "upstash"],
  featured: false,
  author: {
    name: "Upstash",
    url: "https://github.com/upstash",
  },
  repoUrl: "https://github.com/upstash/mcp-server-upstash",
  installCommand: "npm install -g @upstash/mcp-server",
  config: `{
  "mcpServers": {
    "upstash": {
      "command": "npx",
      "args": ["-y", "@upstash/mcp-server"],
      "env": {
        "UPSTASH_EMAIL": "your-email",
        "UPSTASH_API_KEY": "your-upstash-api-key"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "redis", relationship: "works-with" },
  ],
};
