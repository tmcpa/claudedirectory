import { MCPServer } from "@/lib/types";

export const timeServer: MCPServer = {
  slug: "time",
  title: "Time Server",
  description: "Time and timezone conversion capabilities for scheduling and temporal data operations",
  tags: ["time", "timezone", "utility", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  installCommand: "npm install -g @modelcontextprotocol/server-time",
  config: `{
  "mcpServers": {
    "time": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-time"]
    }
  }
}`,
};
