import { MCPServer } from "@/lib/types";

export const agentQaServer: MCPServer = {
  slug: "agent-qa",
  title: "Agent QA",
  description:
    "Test web and mobile applications with natural-language actions and assertions, retained execution evidence, and memory from earlier runs",
  tags: ["testing", "qa", "automation", "web", "mobile", "ai"],
  featured: false,
  author: {
    name: "Vostride",
    url: "https://github.com/vostride",
  },
  repoUrl: "https://github.com/vostride/agent-qa",
  installCommand: "npm install -D agent-qa",
  config: `{
  "mcpServers": {
    "agent-qa": {
      "command": "npx",
      "args": ["-y", "agent-qa", "mcp"]
    }
  }
}`,
};
