import { MCPServer } from "@/lib/types";

export const trelloServer: MCPServer = {
  slug: "trello",
  title: "Trello",
  description:
    "Interact with Trello boards, lists, and cards for project management and task tracking",
  tags: ["trello", "project-management", "kanban", "community"],
  featured: false,
  dateAdded: "2026-03-22",
  author: {
    name: "delorenj",
    url: "https://github.com/delorenj",
  },
  repoUrl: "https://github.com/delorenj/mcp-server-trello",
  installCommand: "npx mcp-server-trello",
  config: `{
  "mcpServers": {
    "trello": {
      "command": "npx",
      "args": ["-y", "mcp-server-trello"],
      "env": {
        "TRELLO_API_KEY": "your-trello-api-key",
        "TRELLO_TOKEN": "your-trello-token"
      }
    }
  }
}`,
};
