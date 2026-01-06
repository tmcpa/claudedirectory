import { MCPServer } from "@/lib/types";

export const stripeServer: MCPServer = {
  slug: "stripe",
  title: "Stripe Server",
  description: "Manage Stripe payments, customers, subscriptions, and financial operations through natural language",
  tags: ["payments", "stripe", "finance", "e-commerce", "community"],
  featured: false,
  author: {
    name: "Stripe Community",
    url: "https://github.com/stripe",
  },
  repoUrl: "https://github.com/stripe/agent-toolkit",
  installCommand: "npm install -g @stripe/mcp-server",
  config: `{
  "mcpServers": {
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/mcp-server"],
      "env": {
        "STRIPE_SECRET_KEY": "your-stripe-secret-key"
      }
    }
  }
}`,
  relatedItems: [
    { type: "plugin", slug: "stripe" },
  ],
};
