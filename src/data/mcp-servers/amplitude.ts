import { MCPServer } from "@/lib/types";

export const amplitudeServer: MCPServer = {
  slug: "amplitude",
  title: "Amplitude",
  description:
    "Query behavioral analytics, user cohorts, event data, and product metrics from Amplitude",
  tags: ["amplitude", "analytics", "product-analytics", "events", "data"],
  featured: false,
  author: {
    name: "Amplitude",
    url: "https://amplitude.com",
  },
  repoUrl: "https://amplitude.com/docs/apis",
  installCommand: "npm install -g @amplitude/mcp-server",
  config: `{
  "mcpServers": {
    "amplitude": {
      "command": "npx",
      "args": ["-y", "@amplitude/mcp-server"],
      "env": {
        "AMPLITUDE_API_KEY": "your-amplitude-api-key",
        "AMPLITUDE_SECRET_KEY": "your-amplitude-secret-key"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "bigquery", relationship: "works-with" },
  ],
};
