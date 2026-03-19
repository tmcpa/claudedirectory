import { MCPServer } from "@/lib/types";

export const weaviateServer: MCPServer = {
  slug: "weaviate",
  title: "Weaviate",
  description:
    "Connect to Weaviate vector database for semantic search, knowledge base management, and RAG workflows with vector embeddings",
  tags: ["weaviate", "vector-database", "embeddings", "ai", "search", "rag"],
  featured: false,
  author: {
    name: "Weaviate",
    url: "https://github.com/weaviate",
  },
  repoUrl: "https://github.com/weaviate/mcp-server-weaviate",
  installCommand: "npm install -g @weaviate/mcp-server",
  config: `{
  "mcpServers": {
    "weaviate": {
      "command": "npx",
      "args": ["-y", "@weaviate/mcp-server"],
      "env": {
        "WEAVIATE_URL": "http://localhost:8080",
        "WEAVIATE_API_KEY": "your-weaviate-api-key"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "pinecone", relationship: "works-with" },
  ],
};
