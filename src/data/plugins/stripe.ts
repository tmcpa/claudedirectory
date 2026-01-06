import { Plugin } from "@/lib/types";

export const stripePlugin: Plugin = {
  slug: "stripe",
  title: "Stripe",
  description: "Stripe development plugin. Manage payments, webhooks, and integrate Stripe's API functionality including subscriptions, invoices, and security features directly from Claude Code.",
  tags: ["payments", "fintech", "api", "integration", "official"],
  featured: false,
  author: {
    name: "Stripe",
    url: "https://stripe.com",
  },
  installCommand: "claude plugins add stripe@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "stripe@claude-plugins-official": true
  }
}`,
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/stripe",
  relatedItems: [
    { type: "mcp-server", slug: "stripe" },
  ],
};
