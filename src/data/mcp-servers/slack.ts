import { MCPServer } from "@/lib/types";

export const slackServer: MCPServer = {
  slug: "slack",
  title: "Slack Server",
  description: "Send messages, manage channels, and interact with Slack workspaces",
  tags: ["slack", "messaging", "communication", "official"],
  featured: true,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/slack",
  installCommand: "npm install -g @anthropic-ai/mcp-server-slack",
  config: `{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-bot-token",
        "SLACK_TEAM_ID": "T0123456789"
      }
    }
  }
}`,
  relatedItems: [
    { type: "plugin", slug: "slack" },
  ],
};
