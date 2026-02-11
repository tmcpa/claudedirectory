import { MCPServer } from "@/lib/types";

export const resendServer: MCPServer = {
  slug: "resend",
  title: "Resend Email",
  description: "Send transactional emails, manage domains, API keys, and audiences through the Resend email platform",
  tags: ["email", "resend", "transactional", "communication", "community"],
  featured: false,
  author: {
    name: "Resend",
    url: "https://github.com/resend",
  },
  repoUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/resend",
  installCommand: "npm install -g @anthropic-ai/mcp-server-resend",
  config: `{
  "mcpServers": {
    "resend": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-resend"],
      "env": {
        "RESEND_API_KEY": "your-resend-api-key"
      }
    }
  }
}`,
};
