import { MCPServer } from "@/lib/types";

export const neo4jServer: MCPServer = {
  slug: "neo4j",
  title: "Neo4j Graph Database",
  description: "Query and manage Neo4j graph databases with Cypher operations and schema exploration",
  tags: ["database", "neo4j", "graph", "cypher", "community"],
  featured: false,
  author: {
    name: "Neo4j Community",
    url: "https://github.com/neo4j",
  },
  installCommand: "npm install -g @neo4j/mcp-server",
  config: `{
  "mcpServers": {
    "neo4j": {
      "command": "npx",
      "args": ["-y", "@neo4j/mcp-server"],
      "env": {
        "NEO4J_URI": "bolt://localhost:7687",
        "NEO4J_USER": "neo4j",
        "NEO4J_PASSWORD": "your-password"
      }
    }
  }
}`,
};
