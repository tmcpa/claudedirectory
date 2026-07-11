import { MCPServer } from "@/lib/types";

export const trackmysharesServer: MCPServer = {
  slug: "trackmyshares",
  title: "TrackMyShares",
  description:
    "Query your own investment portfolio from Claude. 13 tools covering holdings and consolidated views across portfolios, transactions, portfolio performance with benchmark comparison, rebalancing status and trade recommendations, projected dividend calendar, and Australian tax reporting (capital gains, franking credits, AMIT/AMMA statements, tax loss harvesting). Also looks up stock quotes and searches symbols. Covers ASX, US, crypto and precious metals. Hosted HTTP server - requires a TrackMyShares Pro plan. Generate your API key under Settings > MCP integration in the dashboard; setup docs: https://trackmyshares.com/help/mcp-integration",
  tags: ["finance", "investing", "portfolio", "stocks", "tax", "australia"],
  featured: false,
  author: {
    name: "TrackMyShares",
    url: "https://trackmyshares.com",
  },
  installCommand:
    'claude mcp add trackmyshares https://trackmyshares.com/api/mcp --transport http --header "Authorization: Bearer YOUR_API_KEY"',
  config: `{
  "mcpServers": {
    "trackmyshares": {
      "url": "https://trackmyshares.com/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}`,
};
