import { MCPServer } from "@/lib/types";

export const firecrawlServer: MCPServer = {
  slug: "firecrawl",
  title: "Firecrawl Server",
  description: "Web scraping and data extraction with intelligent crawling, structured data output, and site mapping",
  tags: ["scraping", "web", "data-extraction", "crawling", "community"],
  featured: false,
  author: {
    name: "Firecrawl",
    url: "https://github.com/mendableai",
  },
  repoUrl: "https://github.com/mendableai/firecrawl-mcp-server",
  installCommand: "npm install -g firecrawl-mcp",
  config: `{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "your-firecrawl-api-key"
      }
    }
  }
}`,
};
