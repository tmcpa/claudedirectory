import { MCPServer } from "@/lib/types";

export const tavilyServer: MCPServer = {
  slug: "tavily",
  title: "Tavily Search",
  description: "AI-optimized search engine for agents with intelligent result extraction and summarization",
  tags: ["search", "web", "ai", "research", "community"],
  featured: false,
  author: {
    name: "Tavily",
    url: "https://github.com/tavily-ai",
  },
  repoUrl: "https://github.com/tavily-ai/tavily-mcp",
  installCommand: "npm install -g tavily-mcp",
  config: `{
  "mcpServers": {
    "tavily": {
      "command": "npx",
      "args": ["-y", "tavily-mcp"],
      "env": {
        "TAVILY_API_KEY": "your-tavily-api-key"
      }
    }
  }
}`,
};
