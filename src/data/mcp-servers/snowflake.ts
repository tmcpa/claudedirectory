import { MCPServer } from "@/lib/types";

export const snowflakeServer: MCPServer = {
  slug: "snowflake",
  title: "Snowflake Server",
  description: "Query and interact with Snowflake data warehouse for analytics and data engineering workflows",
  tags: ["snowflake", "database", "data-warehouse", "analytics", "sql"],
  featured: false,
  author: {
    name: "Snowflake",
    url: "https://github.com/snowflakedb",
  },
  repoUrl: "https://github.com/snowflakedb/snowflake-mcp-server",
  installCommand: "pip install snowflake-mcp-server",
  config: `{
  "mcpServers": {
    "snowflake": {
      "command": "python",
      "args": ["-m", "snowflake_mcp_server"],
      "env": {
        "SNOWFLAKE_ACCOUNT": "your-account",
        "SNOWFLAKE_USER": "your-username",
        "SNOWFLAKE_PASSWORD": "your-password",
        "SNOWFLAKE_WAREHOUSE": "your-warehouse",
        "SNOWFLAKE_DATABASE": "your-database"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "postgres", relationship: "works-with" },
  ],
};
