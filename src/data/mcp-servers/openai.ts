import { MCPServer } from "@/lib/types";

export const openaiServer: MCPServer = {
  slug: "openai",
  title: "OpenAI Server",
  description:
    "Access OpenAI APIs for completions, embeddings, image generation, and model management",
  tags: ["openai", "ai", "llm", "embeddings", "gpt", "community"],
  featured: false,
  author: {
    name: "OpenAI Community",
    url: "https://github.com/openai",
  },
  repoUrl: "https://github.com/openai/openai-mcp",
  installCommand: "npm install -g @openai/mcp-server",
  config: `{
  "mcpServers": {
    "openai": {
      "command": "npx",
      "args": ["-y", "@openai/mcp-server"],
      "env": {
        "OPENAI_API_KEY": "your-openai-api-key"
      }
    }
  }
}`,
};
