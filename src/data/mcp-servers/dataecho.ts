import { MCPServer } from "@/lib/types";

export const dataechoServer: MCPServer = {
  slug: "dataecho",
  title: "DataEcho",
  description: "Deploy files, static sites, and Dockerfile apps to live URLs + private cloud Drives for agent memory — 26 tools, anonymous publish supported",
  tags: ["deploy", "hosting", "storage", "memory"],
  featured: false,
  dateAdded: "2026-07-04",
  repoUrl: "https://github.com/mohocp/dataecho",
  author: {
    name: "mohocp",
    url: "https://github.com/mohocp",
  },
  installCommand: "npx -y @dataecho/mcp",
  config: `{
  "mcpServers": {
    "dataecho": {
      "type": "http",
      "url": "https://dataecho.ai/mcp"
    }
  }
}`,
};
