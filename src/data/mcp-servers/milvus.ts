import { MCPServer } from "@/lib/types";

export const milvusServer: MCPServer = {
  slug: "milvus",
  title: "Milvus",
  description:
    "Manage Milvus vector database collections, perform similarity searches, and handle vector embeddings for AI applications",
  tags: ["milvus", "vector-database", "embeddings", "ai", "search"],
  featured: false,
  author: {
    name: "Zilliz",
    url: "https://github.com/zilliztech",
  },
  repoUrl: "https://github.com/zilliztech/mcp-server-milvus",
  installCommand: "pip install mcp-server-milvus",
  config: `{
  "mcpServers": {
    "milvus": {
      "command": "uvx",
      "args": ["mcp-server-milvus"],
      "env": {
        "MILVUS_URI": "http://localhost:19530",
        "MILVUS_TOKEN": "your-milvus-token"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "pinecone", relationship: "works-with" },
  ],
};
