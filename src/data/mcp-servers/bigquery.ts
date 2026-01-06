import { MCPServer } from "@/lib/types";

export const bigqueryServer: MCPServer = {
  slug: "bigquery",
  title: "BigQuery Server",
  description: "Query and analyze data in Google BigQuery for large-scale data analytics and machine learning",
  tags: ["bigquery", "google", "database", "data-warehouse", "analytics", "sql"],
  featured: false,
  author: {
    name: "Google",
    url: "https://github.com/googleapis",
  },
  repoUrl: "https://github.com/googleapis/bigquery-mcp-server",
  installCommand: "pip install bigquery-mcp-server",
  config: `{
  "mcpServers": {
    "bigquery": {
      "command": "python",
      "args": ["-m", "bigquery_mcp_server"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/service-account.json",
        "BIGQUERY_PROJECT_ID": "your-project-id"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "snowflake", relationship: "works-with" },
  ],
};
