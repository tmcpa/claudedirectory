import { MCPServer } from "@/lib/types";

export const apifyServer: MCPServer = {
  slug: "apify",
  title: "Apify",
  description:
    "Extract data from websites, social media, search engines, maps, and e-commerce using thousands of ready-made scrapers and actors",
  tags: ["scraping", "apify", "automation", "data-extraction", "community"],
  featured: false,
  dateAdded: "2026-03-22",
  author: {
    name: "Apify",
    url: "https://github.com/apify",
  },
  repoUrl: "https://github.com/apify/apify-mcp-server",
  installCommand: "npx @apify/mcp-server",
  config: `{
  "mcpServers": {
    "apify": {
      "command": "npx",
      "args": ["-y", "@apify/mcp-server"],
      "env": {
        "APIFY_TOKEN": "your-apify-api-token"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "firecrawl", relationship: "works-with" },
  ],
};
