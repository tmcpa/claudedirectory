import { MCPServer } from "@/lib/types";

export const linearServer: MCPServer = {
  slug: "linear",
  title: "Linear Server",
  description: "Manage Linear issues, projects, and workflows for seamless project management integration",
  tags: ["project-management", "linear", "issues", "workflow", "community"],
  featured: true,
  author: {
    name: "Linear",
    url: "https://github.com/linear",
  },
  installCommand: "npm install -g @linear/mcp-server",
  config: `{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"],
      "env": {
        "LINEAR_API_KEY": "your-linear-api-key"
      }
    }
  }
}`,
};
