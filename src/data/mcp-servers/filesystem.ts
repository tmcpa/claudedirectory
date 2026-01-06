import { MCPServer } from "@/lib/types";

export const filesystemServer: MCPServer = {
  slug: "filesystem",
  title: "Filesystem Server",
  description: "Access and manage files on your local filesystem with read, write, and directory operations",
  tags: ["filesystem", "files", "official"],
  featured: true,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  installCommand: "npm install -g @anthropic-ai/mcp-server-filesystem",
  config: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-filesystem",
        "/path/to/allowed/directory"
      ]
    }
  }
}`,
};
