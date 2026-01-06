import { MCPServer } from "@/lib/types";

export const notionServer: MCPServer = {
  slug: "notion",
  title: "Notion Server",
  description: "Search, read, and manage Notion pages, databases, and comments",
  tags: ["notion", "productivity", "notes", "community"],
  featured: true,
  author: {
    name: "Notion Labs",
    url: "https://github.com/makenotion",
  },
  installCommand: "npm install -g @notionhq/mcp-server-notion",
  config: `{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/mcp-server-notion"],
      "env": {
        "NOTION_API_KEY": "ntn_your_integration_token"
      }
    }
  }
}`,
};
