import { MCPServer } from "@/lib/types";

export const exaServer: MCPServer = {
  slug: "exa",
  title: "Exa Search",
  description: "Neural search engine designed for AI that understands meaning and finds precisely relevant content",
  tags: ["search", "web", "ai", "semantic", "community"],
  featured: false,
  author: {
    name: "Exa",
    url: "https://github.com/exa-labs",
  },
  installCommand: "npm install -g exa-mcp-server",
  config: `{
  "mcpServers": {
    "exa": {
      "command": "npx",
      "args": ["-y", "exa-mcp-server"],
      "env": {
        "EXA_API_KEY": "your-exa-api-key"
      }
    }
  }
}`,
};
