import { MCPServer } from "@/lib/types";

export const youtubeTranscriptServer: MCPServer = {
  slug: "youtube-transcript",
  title: "YouTube Transcript + Search",
  description: "Fetch YouTube video transcripts, search videos/channels, browse channels, and extract playlists via getyoutubetranscript.com - free tier, no card required",
  tags: ["youtube", "transcripts", "video-search", "channels", "playlists", "community"],
  featured: false,
  author: {
    name: "TubeAgentKit",
    url: "https://github.com/tubeagentkit",
  },
  repoUrl: "https://github.com/tubeagentkit/youtube-mcp",
  docsUrl: "https://getyoutubetranscript.com/docs",
  config: `{
  "mcpServers": {
    "youtube-transcript": {
      "url": "https://getyoutubetranscript.com/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}`,
};
