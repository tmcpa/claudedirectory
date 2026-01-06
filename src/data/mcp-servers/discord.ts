import { MCPServer } from "@/lib/types";

export const discordServer: MCPServer = {
  slug: "discord",
  title: "Discord Server",
  description: "Interact with Discord servers, channels, and messages for community management and automation",
  tags: ["discord", "chat", "community", "messaging"],
  featured: false,
  author: {
    name: "Community",
    url: "https://github.com/discord",
  },
  repoUrl: "https://github.com/v-3/discordmcp",
  installCommand: "npm install -g discord-mcp-server",
  config: `{
  "mcpServers": {
    "discord": {
      "command": "npx",
      "args": ["-y", "discord-mcp-server"],
      "env": {
        "DISCORD_BOT_TOKEN": "your-discord-bot-token"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "slack", relationship: "works-with" },
  ],
};
