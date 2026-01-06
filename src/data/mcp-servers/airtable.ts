import { MCPServer } from "@/lib/types";

export const airtableServer: MCPServer = {
  slug: "airtable",
  title: "Airtable Server",
  description: "Query and manage Airtable bases, tables, and records for low-code database operations",
  tags: ["airtable", "database", "spreadsheet", "no-code", "community"],
  featured: false,
  author: {
    name: "Community",
    url: "https://github.com/airtable",
  },
  repoUrl: "https://github.com/domdomegg/airtable-mcp-server",
  installCommand: "npm install -g airtable-mcp-server",
  config: `{
  "mcpServers": {
    "airtable": {
      "command": "npx",
      "args": ["-y", "airtable-mcp-server"],
      "env": {
        "AIRTABLE_API_KEY": "your-airtable-api-key"
      }
    }
  }
}`,
};
