import { MCPServer } from "@/lib/types";

export const salesforceServer: MCPServer = {
  slug: "salesforce",
  title: "Salesforce Server",
  description: "Query Salesforce CRM objects, run SOQL queries, and manage records for sales and customer data workflows",
  tags: ["salesforce", "crm", "soql", "enterprise", "community"],
  featured: false,
  dateAdded: "2026-03-11",
  author: {
    name: "Salesforce",
    url: "https://github.com/salesforce",
  },
  repoUrl: "https://github.com/salesforcecli/mcp",
  installCommand: "npm install -g @salesforce/mcp-server",
  config: `{
  "mcpServers": {
    "salesforce": {
      "command": "npx",
      "args": ["-y", "@salesforce/mcp-server"],
      "env": {
        "SALESFORCE_INSTANCE_URL": "https://your-org.my.salesforce.com",
        "SALESFORCE_ACCESS_TOKEN": "your-access-token"
      }
    }
  }
}`,
};
