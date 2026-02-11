import { MCPServer } from "@/lib/types";

export const browserbaseServer: MCPServer = {
  slug: "browserbase",
  title: "Browserbase Server",
  description: "Automate cloud browsers for web scraping, testing, and interaction through headless browser infrastructure",
  tags: ["browser", "scraping", "testing", "automation", "community"],
  featured: false,
  author: {
    name: "Browserbase",
    url: "https://github.com/browserbase",
  },
  repoUrl: "https://github.com/browserbase/mcp-server-browserbase",
  installCommand: "npm install -g @browserbasehq/mcp-server",
  config: `{
  "mcpServers": {
    "browserbase": {
      "command": "npx",
      "args": ["-y", "@browserbasehq/mcp-server"],
      "env": {
        "BROWSERBASE_API_KEY": "your-browserbase-api-key",
        "BROWSERBASE_PROJECT_ID": "your-project-id"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "playwright", relationship: "works-with" },
  ],
};
