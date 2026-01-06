import { MCPServer } from "@/lib/types";

export const elasticsearchServer: MCPServer = {
  slug: "elasticsearch",
  title: "Elasticsearch Server",
  description: "Search, index, and analyze data in Elasticsearch clusters with natural language queries",
  tags: ["search", "elasticsearch", "analytics", "logging", "community"],
  featured: false,
  author: {
    name: "Elastic Community",
    url: "https://github.com/elastic",
  },
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
