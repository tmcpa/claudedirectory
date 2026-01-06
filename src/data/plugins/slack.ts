import { Plugin } from "@/lib/types";

export const slackPlugin: Plugin = {
  slug: "slack",
  title: "Slack",
  description: "Slack workspace integration. Search messages, access channels, read threads, and stay connected with your team's communications while coding.",
  tags: ["communication", "messaging", "team", "integration", "official"],
  featured: false,
  author: {
    name: "Slack",
    url: "https://slack.com",
  },
  installCommand: "claude plugins add slack@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "slack@claude-plugins-official": true
  }
}`,
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/slack",
  relatedItems: [
    { type: "mcp-server", slug: "slack" },
  ],
};
