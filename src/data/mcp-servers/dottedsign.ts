import { MCPServer } from "@/lib/types";

export const dottedsignServer: MCPServer = {
  slug: "dottedsign",
  title: "DottedSign",
  description: "An MCP server to automate eSignature workflows and signing tasks for AI agents through natural language",
  tags: ["esignature", "documents", "signing", "productivity", "community"],
  author: {
    name: "DottedSign",
    url: "https://github.com/DottedSign-Official",
  },
  repoUrl: "https://github.com/DottedSign-Official/dottedsign-mcp",
  installCommand: "claude mcp add --transport http dottedsign https://mcp.dottedsign.com/dottedsign-api/mcp",
  config: `{
  "mcpServers": {
    "dottedsign": {
      "type": "http",
      "url": "https://mcp.dottedsign.com/dottedsign-api/mcp"
    }
  }
}`,
};
