import { MCPServer } from "@/lib/types";

export const raygunServer: MCPServer = {
  slug: "raygun",
  title: "Raygun Server",
  description: "Access crash reporting and real user monitoring data for debugging and performance analysis",
  tags: ["raygun", "monitoring", "crash-reporting", "apm", "debugging"],
  featured: false,
  author: {
    name: "Raygun",
    url: "https://github.com/MindscapeHQ",
  },
  repoUrl: "https://github.com/MindscapeHQ/raygun-mcp-server",
  installCommand: "npm install -g @anthropic-ai/mcp-server-raygun",
  config: `{
  "mcpServers": {
    "raygun": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-raygun"],
      "env": {
        "RAYGUN_API_KEY": "your-raygun-api-key"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "sentry", relationship: "works-with" },
  ],
};
