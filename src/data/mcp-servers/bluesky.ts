import { MCPServer } from "@/lib/types";

export const blueskyServer: MCPServer = {
  slug: "bluesky",
  title: "Bluesky Server",
  description: "Interact with Bluesky social network for posting, reading feeds, and managing social presence",
  tags: ["bluesky", "social", "atproto", "community"],
  featured: false,
  author: {
    name: "Community",
    url: "https://github.com/bluesky-social",
  },
  repoUrl: "https://github.com/keturiosakys/bluesky-context-server",
  installCommand: "npm install -g bluesky-mcp-server",
  config: `{
  "mcpServers": {
    "bluesky": {
      "command": "npx",
      "args": ["-y", "bluesky-mcp-server"],
      "env": {
        "BLUESKY_HANDLE": "your-handle.bsky.social",
        "BLUESKY_APP_PASSWORD": "your-app-password"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "slack", relationship: "works-with" },
  ],
};
