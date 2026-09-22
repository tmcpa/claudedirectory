import { MCPServer } from "@/lib/types";

export const screenpipeServer: MCPServer = {
  // Keep the existing URL and override the auto-ingested entry.
  slug: "mediar-ai-screenpipe",
  title: "Screenpipe",
  description:
    "Search locally captured screen text and audio history for recall, meeting notes, and work summaries. Requires Screenpipe running on localhost:3030. Use Settings > Connections for desktop setup, or the linked docs for manual setup and your local API key. Source-available under the Screenpipe Commercial License. Configured cloud AI, transcription, sync, and integrations can transmit context off-device.",
  tags: ["memory", "local-first", "productivity", "context", "audio"],
  author: {
    name: "Screenpipe",
    url: "https://github.com/screenpipe",
  },
  repoUrl: "https://github.com/screenpipe/screenpipe",
  docsUrl:
    "https://github.com/screenpipe/screenpipe/blob/main/packages/screenpipe-mcp/README.md#installation",
  installCommand: "npx -y screenpipe-mcp@latest",
  config: `{
  "mcpServers": {
    "screenpipe": {
      "command": "npx",
      "args": ["-y", "screenpipe-mcp@latest"],
      "env": {
        "SCREENPIPE_LOCAL_API_KEY": "YOUR_SCREENPIPE_LOCAL_API_KEY"
      }
    }
  }
}`,
};
