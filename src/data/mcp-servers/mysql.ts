import { MCPServer } from "@/lib/types";

export const mysqlServer: MCPServer = {
  slug: "mysql",
  title: "MySQL",
  description:
    "Secure interaction with MySQL databases for queries, schema inspection, and data management",
  tags: ["database", "mysql", "sql", "community"],
  featured: false,
  dateAdded: "2026-03-22",
  author: {
    name: "designcomputer",
    url: "https://github.com/designcomputer",
  },
  repoUrl: "https://github.com/designcomputer/mysql_mcp_server",
  installCommand: "pip install mysql-mcp-server",
  config: `{
  "mcpServers": {
    "mysql": {
      "command": "uvx",
      "args": ["mysql-mcp-server"],
      "env": {
        "MYSQL_HOST": "localhost",
        "MYSQL_PORT": "3306",
        "MYSQL_USER": "your-username",
        "MYSQL_PASSWORD": "your-password",
        "MYSQL_DATABASE": "your-database"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "postgres", relationship: "works-with" },
  ],
};
