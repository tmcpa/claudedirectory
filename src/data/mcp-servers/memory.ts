import { MCPServer } from "@/lib/types";

export const memoryServer: MCPServer = {
  slug: "memory",
  title: "Memory Server",
  description: "Persistent memory storage using a knowledge graph for long-term context retention",
  tags: ["memory", "knowledge-graph", "persistence", "official"],
  featured: true,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  installCommand: "npm install -g @anthropic-ai/mcp-server-memory",
  config: `{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-memory"]
    }
  }
}`,
};
