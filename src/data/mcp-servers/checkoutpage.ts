import { MCPServer } from "@/lib/types";

export const checkoutpageServer: MCPServer = {
  slug: "checkoutpage",
  title: "Checkout Page",
  description:
    "Build and run a Checkout Page store from Claude: create and update checkout pages, event ticketing pages and forms, then work the resulting business data (payments, invoices, subscriptions, bookings, tickets, customers, form submissions, coupons, tax rates, webhooks and file uploads). 40 tools across 12 resources, backed by the seller's own Stripe account. Hosted remote server with OAuth sign-in, no API key to manage.",
  tags: ["payments", "checkout", "ecommerce", "events", "subscriptions", "stripe", "official"],
  featured: false,
  dateAdded: "2026-09-15",
  author: {
    name: "Checkout Page",
    url: "https://checkoutpage.com",
  },
  docsUrl: "https://checkoutpage.com/docs/build/mcp",
  installCommand: "claude mcp add --transport http checkoutpage https://mcp.checkoutpage.com",
  config: `{
  "mcpServers": {
    "checkoutpage": {
      "type": "http",
      "url": "https://mcp.checkoutpage.com"
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "stripe" },
  ],
};
