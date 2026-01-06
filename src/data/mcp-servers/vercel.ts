import { MCPServer } from "@/lib/types";

export const vercelServer: MCPServer = {
  slug: "vercel",
  title: "Vercel Server",
  description: "Deploy and manage Vercel projects, domains, and serverless functions through natural language",
  tags: ["cloud", "vercel", "deployment", "serverless", "community"],
  featured: false,
  author: {
    name: "Vercel Community",
    url: "https://github.com/vercel",
  },
  installCommand: "npm install -g @vercel/mcp-server",
  config: `{
  "mcpServers": {
    "vercel": {
      "command": "npx",
      "args": ["-y", "@vercel/mcp-server"],
      "env": {
        "VERCEL_TOKEN": "your-vercel-token"
      }
    }
  }
}`,
};
