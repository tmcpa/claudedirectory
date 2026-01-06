import { MCPServer } from "@/lib/types";

export const playwrightServer: MCPServer = {
  slug: "playwright",
  title: "Playwright Browser Automation",
  description: "Official Microsoft Playwright MCP server for browser automation, web scraping, testing, and accessibility snapshots",
  tags: ["browser", "automation", "testing", "scraping", "playwright", "official"],
  featured: true,
  author: {
    name: "Microsoft",
    url: "https://github.com/microsoft",
  },
  repoUrl: "https://github.com/microsoft/playwright-mcp",
  installCommand: "npm install -g @playwright/mcp",
  config: `{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    }
  }
}`,
  relatedItems: [
    { type: "plugin", slug: "playwright" },
  ],
};
