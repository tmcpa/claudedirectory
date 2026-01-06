import { MCPServer } from "@/lib/types";

export const googleDriveServer: MCPServer = {
  slug: "google-drive",
  title: "Google Drive Server",
  description: "Search, read, and manage files in Google Drive with OAuth authentication",
  tags: ["google", "drive", "storage", "files", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive",
  installCommand: "npm install -g @anthropic-ai/mcp-server-gdrive",
  config: `{
  "mcpServers": {
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-gdrive"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}`,
};
