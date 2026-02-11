import { MCPServer } from "@/lib/types";

export const shopifyServer: MCPServer = {
  slug: "shopify",
  title: "Shopify Server",
  description: "Manage Shopify stores, products, orders, and customer data for e-commerce operations",
  tags: ["shopify", "ecommerce", "store", "products", "orders"],
  featured: false,
  author: {
    name: "Shopify",
    url: "https://github.com/Shopify",
  },

  installCommand: "npm install -g @shopify/mcp-server",
  config: `{
  "mcpServers": {
    "shopify": {
      "command": "npx",
      "args": ["-y", "@shopify/mcp-server"],
      "env": {
        "SHOPIFY_STORE_URL": "your-store.myshopify.com",
        "SHOPIFY_ACCESS_TOKEN": "your-access-token"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "stripe", relationship: "works-with" },
  ],
};
