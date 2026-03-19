import { MCPServer } from "@/lib/types";

export const chromadbServer: MCPServer = {
  slug: "chromadb",
  title: "ChromaDB",
  description:
    "Interact with ChromaDB for semantic document search, metadata filtering, and persistent vector storage in RAG pipelines",
  tags: ["chromadb", "vector-database", "embeddings", "ai", "search", "rag"],
  featured: false,
  author: {
    name: "ChromaDB Community",
    url: "https://github.com/chroma-core",
  },
  repoUrl: "https://github.com/chroma-core/chroma-mcp",
  installCommand: "pip install chroma-mcp-server",
  config: `{
  "mcpServers": {
    "chromadb": {
      "command": "uvx",
      "args": ["chroma-mcp-server"],
      "env": {
        "CHROMA_HOST": "localhost",
        "CHROMA_PORT": "8000"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "pinecone", relationship: "works-with" },
  ],
};
