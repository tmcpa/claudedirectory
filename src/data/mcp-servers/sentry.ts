import { MCPServer } from "@/lib/types";

export const sentryServer: MCPServer = {
  slug: "sentry",
  title: "Sentry Server",
  description: "Retrieve and analyze issues, errors, and stacktraces from Sentry",
  tags: ["sentry", "errors", "monitoring", "debugging", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  installCommand: "npm install -g @anthropic-ai/mcp-server-sentry",
  config: `{
  "mcpServers": {
    "sentry": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-sentry"],
      "env": {
        "SENTRY_AUTH_TOKEN": "your-sentry-auth-token",
        "SENTRY_ORG": "your-organization-slug"
      }
    }
  }
}`,
};
