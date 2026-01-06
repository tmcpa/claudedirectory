import { MCPServer } from "@/lib/types";

export const braveSearchServer: MCPServer = {
  slug: "brave-search",
  title: "Brave Search Server",
  description: "Web and local search capabilities using the Brave Search API",
  tags: ["search", "web", "brave", "official"],
  featured: true,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search",
  installCommand: "npm install -g @anthropic-ai/mcp-server-brave-search",
  config: `{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-brave-api-key"
      }
    }
  }
}`,
};
