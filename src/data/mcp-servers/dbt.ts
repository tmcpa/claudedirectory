import { MCPServer } from "@/lib/types";

export const dbtServer: MCPServer = {
  slug: "dbt",
  title: "dbt",
  description:
    "Interact with dbt Core and dbt Cloud for data transformations, model execution, test runs, and documentation generation",
  tags: ["dbt", "data-engineering", "sql", "analytics", "transformations"],
  featured: false,
  author: {
    name: "dbt Labs",
    url: "https://github.com/dbt-labs",
  },
  repoUrl: "https://github.com/dbt-labs/dbt-mcp",
  installCommand: "pip install dbt-mcp",
  config: `{
  "mcpServers": {
    "dbt": {
      "command": "uvx",
      "args": ["dbt-mcp"],
      "env": {
        "DBT_PROJECT_DIR": "/path/to/dbt/project",
        "DBT_PROFILES_DIR": "~/.dbt"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "bigquery", relationship: "works-with" },
    { type: "mcp-server", slug: "snowflake", relationship: "works-with" },
    { type: "mcp-server", slug: "postgres", relationship: "works-with" },
  ],
};
