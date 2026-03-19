import { MCPServer } from "@/lib/types";

export const digitaloceanServer: MCPServer = {
  slug: "digitalocean",
  title: "DigitalOcean",
  description:
    "Manage Droplets, App Platform deployments, databases, Kubernetes clusters, and storage on DigitalOcean",
  tags: ["digitalocean", "cloud", "deployment", "infrastructure", "hosting"],
  featured: false,
  author: {
    name: "DigitalOcean",
    url: "https://github.com/digitalocean",
  },
  repoUrl: "https://github.com/digitalocean/digitalocean-mcp",
  installCommand: "npm install -g @digitalocean/mcp-server",
  config: `{
  "mcpServers": {
    "digitalocean": {
      "command": "npx",
      "args": ["-y", "@digitalocean/mcp-server"],
      "env": {
        "DIGITALOCEAN_TOKEN": "your-digitalocean-api-token"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "kubernetes", relationship: "works-with" },
  ],
};
