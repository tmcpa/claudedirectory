import { Plugin } from "@/lib/types";

export const slackPlugin: Plugin = {
  slug: "slack",
  title: "Slack",
  description: "Slack workspace integration. Search messages, access channels, read threads, and stay connected with your team's communications while coding. Get context from discussions without leaving your terminal.",
  tags: ["communication", "messaging", "team", "integration", "official"],
  featured: false,
  author: {
    name: "Slack",
    url: "https://slack.com",
  },
  installCommand: "/plugin install slack@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "slack@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/slack-search", description: "Search messages across channels and threads" },
    { name: "/slack-channel", description: "Read recent messages from a channel" },
    { name: "/slack-thread", description: "Get full context from a thread" },
    { name: "/slack-send", description: "Send a message to a channel or user" },
  ],
  relatedItems: [
    { type: "mcp-server", slug: "slack", relationship: "requires" },
  ],
};
