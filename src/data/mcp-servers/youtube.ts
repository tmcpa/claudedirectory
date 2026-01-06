import { MCPServer } from "@/lib/types";

export const youtubeServer: MCPServer = {
  slug: "youtube",
  title: "YouTube Server",
  description: "Fetch and analyze YouTube video transcripts, metadata, and channel information",
  tags: ["youtube", "video", "transcripts", "media", "community"],
  featured: false,
  author: {
    name: "Community",
    url: "https://github.com/modelcontextprotocol",
  },
  repoUrl: "https://github.com/Significant-Gravitas/youtube-mcp-server",
  installCommand: "npm install -g youtube-mcp-server",
  config: `{
  "mcpServers": {
    "youtube": {
      "command": "npx",
      "args": ["-y", "youtube-mcp-server"],
      "env": {
        "YOUTUBE_API_KEY": "your-youtube-api-key"
      }
    }
  }
}`,
};
