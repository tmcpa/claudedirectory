import { MCPServer } from "@/lib/types";

export const elasticsearchServer: MCPServer = {
  slug: "elasticsearch",
  title: "Elasticsearch Server",
  description: "Search, index, and analyze data in Elasticsearch clusters with natural language queries",
  seoTitle: "Elastic (Elasticsearch) MCP Server for Claude Code – Setup Guide (2026)",
  seoDescription: "Connect Elastic / Elasticsearch to Claude Code via MCP. Query indexes, analyze logs, and run searches from the terminal — copy-paste JSON config and API key setup included.",
  tags: ["search", "elasticsearch", "analytics", "logging", "community"],
  featured: false,
  author: {
    name: "Elastic Community",
    url: "https://github.com/elastic",
  },
  repoUrl: "https://github.com/elastic/mcp-server-elasticsearch",
  installCommand: "npm install -g @elastic/mcp-server",
  config: `{
  "mcpServers": {
    "elasticsearch": {
      "command": "npx",
      "args": ["-y", "@elastic/mcp-server"],
      "env": {
        "ELASTICSEARCH_URL": "http://localhost:9200",
        "ELASTICSEARCH_API_KEY": "your-elasticsearch-api-key"
      }
    }
  }
}`,
};
