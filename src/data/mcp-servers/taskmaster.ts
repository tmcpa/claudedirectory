import { MCPServer } from "@/lib/types";

export const taskmasterServer: MCPServer = {
  slug: "taskmaster",
  title: "Task Master Server",
  description: "Convert PRDs into structured, prioritized, implementation-ready task lists that AI agents can read and update",
  tags: ["taskmaster", "project-management", "prd", "tasks", "planning", "community"],
  featured: true,
  author: {
    name: "Eye of Eris",
    url: "https://github.com/eyeoferis",
  },
  repoUrl: "https://github.com/eyeoferis/taskmaster-ai",
  installCommand: "npm install -g taskmaster-ai",
  config: `{
  "mcpServers": {
    "taskmaster": {
      "command": "npx",
      "args": ["-y", "taskmaster-ai"],
      "env": {
        "ANTHROPIC_API_KEY": "your-anthropic-api-key"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "linear", relationship: "works-with" },
    { type: "agent", slug: "product-manager", relationship: "works-with" },
  ],
};
