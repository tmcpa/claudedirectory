import { MCPServer } from "@/lib/types";

export const rnwy: MCPServer = {
  slug: "rnwy",
  title: "RNWY Trust Intelligence",
  description: "Check if an AI agent is trustworthy before you hire it. Sybil detection, signed attestations, and reviewer wallet analysis across 150,000+ agents. Free, no key.",
  tags: ["trust", "security", "ai-agents", "blockchain", "sybil-detection"],
  author: { name: "RNWY", url: "https://rnwy.com" },
  repoUrl: "https://github.com/rnwy/mcp",
  config: `{
  "mcpServers": {
    "rnwy": {
      "type": "http",
      "url": "https://rnwy.com/api/mcp"
    }
  }
}`,
};
