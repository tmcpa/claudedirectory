import { MCPServer } from "@/lib/types";

export const qdrantServer: MCPServer = {
  slug: "qdrant",
  title: "Qdrant",
  description:
    "Vector search engine acting as a semantic memory layer for storing and retrieving information using natural language",
  tags: ["vector-database", "qdrant", "embeddings", "search", "ai"],
  featured: false,
  dateAdded: "2026-03-22",
  author: {
    name: "Qdrant",
    url: "https://github.com/qdrant",
  },
  repoUrl: "https://github.com/qdrant/mcp-server-qdrant",
  installCommand: "pip install mcp-server-qdrant",
  config: `{
  "mcpServers": {
    "qdrant": {
      "command": "uvx",
      "args": ["mcp-server-qdrant"],
      "env": {
        "QDRANT_URL": "http://localhost:6333",
        "QDRANT_API_KEY": "your-qdrant-api-key",
        "COLLECTION_NAME": "claude-memory"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "pinecone", relationship: "works-with" },
    { type: "mcp-server", slug: "chromadb", relationship: "works-with" },
  ],
};
