import { MCPServer } from "@/lib/types";

export const findMcpServer: MCPServer = {
  slug: "find-mcp",
  title: "Find MCP",
  description:
    "Search 17,000+ MCP servers from the official MCP registry - remote Streamable HTTP (catalog.agentage.io/mcp, no auth for search) or stdio (npx @agentage/find-mcp)",
  tags: ["search", "discovery", "registry", "developer-tools"],
  author: {
    name: "agentage",
  },
  repoUrl: "https://github.com/agentage/find-mcp",
  installCommand: "npx -y @agentage/find-mcp",
  config: `{
  "mcpServers": {
    "find-mcp": {
      "command": "npx",
      "args": ["-y", "@agentage/find-mcp"]
    }
  }
}`,
};
