import { MCPServer } from "@/lib/types";

export const draxlrServer: MCPServer = {
  slug: "draxlr",
  title: "Draxlr",
  description: "Work with your Draxlr databases and dashboards — list databases, inspect schemas, run read-only SQL, save and run queries, export results, and build dashboards. Connects to your data via OAuth.",
  tags: ["analytics", "database", "sql", "dashboards", "business-intelligence"],
  author: {
    name: "Draxlr",
    url: "https://draxlr.com",
  },
  docsUrl: "https://docs.draxlr.com/docs/mcp-server",
  installCommand: "claude mcp add --transport http draxlr https://api.draxlr.com/mcp",
  config: `{
  "mcpServers": {
    "draxlr": {
      "type": "http",
      "url": "https://api.draxlr.com/mcp"
    }
  }
}`,
};
