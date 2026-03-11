import { MCPServer } from "@/lib/types";

export const hubspotServer: MCPServer = {
  slug: "hubspot",
  title: "HubSpot Server",
  description: "Access HubSpot CRM data including contacts, companies, deals, and marketing automation from Claude Code",
  tags: ["hubspot", "crm", "marketing", "sales", "community"],
  featured: false,
  dateAdded: "2026-03-11",
  author: {
    name: "HubSpot",
    url: "https://github.com/HubSpot",
  },
  repoUrl: "https://github.com/HubSpot/mcp-server",
  installCommand: "npm install -g @hubspot/mcp-server",
  config: `{
  "mcpServers": {
    "hubspot": {
      "command": "npx",
      "args": ["-y", "@hubspot/mcp-server"],
      "env": {
        "HUBSPOT_ACCESS_TOKEN": "your-hubspot-access-token"
      }
    }
  }
}`,
};
