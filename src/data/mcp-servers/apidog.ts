import { MCPServer } from "@/lib/types";

export const apidogServer: MCPServer = {
  slug: "apidog",
  title: "Apidog Server",
  description: "Access API documentation and specifications directly for accurate API-aware code generation",
  tags: ["apidog", "api", "documentation", "openapi", "swagger"],
  featured: true,
  dateAdded: "2026-01-06",
  author: {
    name: "Apidog",
    url: "https://github.com/Apidog",
  },
  repoUrl: "https://github.com/Apidog/apidog-mcp-server",
  installCommand: "npm install -g @anthropic-ai/mcp-server-apidog",
  config: `{
  "mcpServers": {
    "apidog": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-apidog"],
      "env": {
        "APIDOG_ACCESS_TOKEN": "your-apidog-token",
        "APIDOG_PROJECT_ID": "your-project-id"
      }
    }
  }
}`,
};
