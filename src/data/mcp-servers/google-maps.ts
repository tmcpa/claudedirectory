import { MCPServer } from "@/lib/types";

export const googleMapsServer: MCPServer = {
  slug: "google-maps",
  title: "Google Maps Server",
  description: "Access Google Maps for geocoding, directions, places search, and location-based services",
  tags: ["google-maps", "maps", "location", "geocoding", "directions"],
  featured: false,
  author: {
    name: "Google",
    url: "https://github.com/googleapis",
  },
  repoUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/google-maps",
  installCommand: "npm install -g @anthropic-ai/mcp-server-google-maps",
  config: `{
  "mcpServers": {
    "google-maps": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-google-maps"],
      "env": {
        "GOOGLE_MAPS_API_KEY": "your-google-maps-api-key"
      }
    }
  }
}`,
};
