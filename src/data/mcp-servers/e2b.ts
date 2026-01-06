import { MCPServer } from "@/lib/types";

export const e2bServer: MCPServer = {
  slug: "e2b",
  title: "E2B Code Sandbox",
  description: "Secure cloud sandbox for executing code in isolated environments with full system access",
  tags: ["sandbox", "code-execution", "security", "cloud", "community"],
  featured: true,
  author: {
    name: "E2B",
    url: "https://github.com/e2b-dev",
  },
  installCommand: "npm install -g @e2b/mcp-server",
  config: `{
  "mcpServers": {
    "e2b": {
      "command": "npx",
      "args": ["-y", "@e2b/mcp-server"],
      "env": {
        "E2B_API_KEY": "your-e2b-api-key"
      }
    }
  }
}`,
};
