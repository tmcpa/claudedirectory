import { MCPServer } from "@/lib/types";

export const netlifyServer: MCPServer = {
  slug: "netlify",
  title: "Netlify",
  description:
    "Deploy sites, manage builds, configure DNS, and control serverless functions on the Netlify platform",
  tags: ["netlify", "deployment", "hosting", "serverless", "jamstack", "official"],
  featured: false,
  author: {
    name: "Netlify",
    url: "https://github.com/netlify",
  },
  repoUrl: "https://github.com/netlify/netlify-mcp",
  installCommand: "npm install -g @netlify/mcp-server",
  config: `{
  "mcpServers": {
    "netlify": {
      "command": "npx",
      "args": ["-y", "@netlify/mcp-server"],
      "env": {
        "NETLIFY_AUTH_TOKEN": "your-netlify-token"
      }
    }
  }
}`,
  relatedItems: [
    { type: "mcp-server", slug: "vercel", relationship: "works-with" },
  ],
};
