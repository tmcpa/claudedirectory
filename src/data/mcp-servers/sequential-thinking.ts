import { MCPServer } from "@/lib/types";

export const sequentialThinkingServer: MCPServer = {
  slug: "sequential-thinking",
  title: "Sequential Thinking Server",
  description: "Dynamic problem-solving through iterative thought chains with branching and revision",
  tags: ["thinking", "reasoning", "problem-solving", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking",
  installCommand: "npm install -g @anthropic-ai/mcp-server-sequential-thinking",
  config: `{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-sequential-thinking"]
    }
  }
}`,
};
