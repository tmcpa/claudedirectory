import { MCPServer } from "@/lib/types";

export const obsidianServer: MCPServer = {
  slug: "obsidian",
  title: "Obsidian Server",
  description: "Access and interact with your Obsidian vault for personal knowledge management and note-taking",
  tags: ["obsidian", "notes", "knowledge-base", "markdown", "community"],
  featured: false,
  author: {
    name: "Community",
    url: "https://github.com/obsidianmd",
  },
  repoUrl: "https://github.com/MarkusPfworr/obsidian-mcp",
  installCommand: "npm install -g obsidian-mcp",
  config: `{
  "mcpServers": {
    "obsidian": {
      "command": "npx",
      "args": ["-y", "obsidian-mcp"],
      "env": {
        "OBSIDIAN_VAULT_PATH": "/path/to/your/vault"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "memory", relationship: "works-with" },
  ],
};
