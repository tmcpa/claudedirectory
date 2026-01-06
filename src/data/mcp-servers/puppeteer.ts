import { MCPServer } from "@/lib/types";

export const puppeteerServer: MCPServer = {
  slug: "puppeteer",
  title: "Puppeteer Browser",
  description: "Automate browser interactions for web scraping and testing",
  tags: ["browser", "puppeteer", "automation", "scraping"],
  author: {
    name: "MCP Community",
  },
  installCommand: "npm install -g @anthropic-ai/mcp-server-puppeteer",
  config: `{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-puppeteer"]
    }
  }
}`,
};
