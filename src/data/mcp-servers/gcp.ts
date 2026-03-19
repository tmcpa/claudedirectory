import { MCPServer } from "@/lib/types";

export const gcpServer: MCPServer = {
  slug: "gcp",
  title: "Google Cloud Platform",
  description:
    "Interact with Google Cloud services including Compute Engine, Cloud Storage, BigQuery, Cloud Run, and more through the gcloud CLI",
  tags: ["gcp", "google-cloud", "cloud", "infrastructure", "official"],
  featured: false,
  author: {
    name: "Google",
    url: "https://github.com/googleapis",
  },
  repoUrl: "https://github.com/googleapis/gcloud-mcp",
  installCommand: "npm install -g @anthropic/gcloud-mcp-server",
  config: `{
  "mcpServers": {
    "gcp": {
      "command": "npx",
      "args": ["-y", "@anthropic/gcloud-mcp-server"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/service-account.json"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "bigquery", relationship: "works-with" },
    { type: "mcp-server", slug: "google-drive", relationship: "works-with" },
  ],
};
