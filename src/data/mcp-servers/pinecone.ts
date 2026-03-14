import { MCPServer } from "@/lib/types";

export const pineconeServer: MCPServer = {
  slug: "pinecone",
  title: "Pinecone Server",
  description:
    "Manage vector databases, upsert embeddings, and perform similarity searches with Pinecone",
  tags: ["pinecone", "vector-database", "embeddings", "ai", "search", "community"],
  featured: false,
  author: {
    name: "Pinecone Community",
    url: "https://github.com/pinecone-io",
  },
  repoUrl: "https://github.com/pinecone-io/pinecone-mcp",
  installCommand: "npm install -g @pinecone-database/mcp-server",
  config: `{
  "mcpServers": {
    "pinecone": {
      "command": "npx",
      "args": ["-y", "@pinecone-database/mcp-server"],
      "env": {
        "PINECONE_API_KEY": "your-pinecone-api-key"
      }
    }
  }
}`,
};
