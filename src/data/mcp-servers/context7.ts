import { MCPServer } from "@/lib/types";

export const context7Server: MCPServer = {
  slug: "context7",
  title: "Context7 Server",
  description: "Provide up-to-date, version-specific library documentation directly in your prompts instead of outdated training data",
  tags: ["documentation", "context", "libraries", "community"],
  featured: false,
  author: {
    name: "Upstash",
    url: "https://github.com/upstash",
  },
  repoUrl: "https://github.com/upstash/context7",
  installCommand: "npm install -g @upstash/context7-mcp",
  config: `{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}`,
  relatedItems: [
    { type: "plugin", slug: "context7" },
  ],
};
