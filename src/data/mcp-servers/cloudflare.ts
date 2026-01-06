import { MCPServer } from "@/lib/types";

export const cloudflareServer: MCPServer = {
  slug: "cloudflare",
  title: "Cloudflare Server",
  description: "Manage Cloudflare Workers, KV, R2, and D1 resources through natural language commands",
  tags: ["cloud", "cloudflare", "workers", "serverless", "community"],
  featured: true,
  author: {
    name: "Cloudflare",
    url: "https://github.com/cloudflare",
  },
  installCommand: "npm install -g @cloudflare/mcp-server-cloudflare",
  config: `{
  "mcpServers": {
    "cloudflare": {
      "command": "npx",
      "args": ["-y", "@cloudflare/mcp-server-cloudflare"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "your-cloudflare-api-token",
        "CLOUDFLARE_ACCOUNT_ID": "your-account-id"
      }
    }
  }
}`,
};
