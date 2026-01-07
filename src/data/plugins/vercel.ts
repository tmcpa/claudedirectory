import { Plugin } from "@/lib/types";

export const vercelPlugin: Plugin = {
  slug: "vercel",
  title: "Vercel",
  description: "Vercel deployment automation and project management. Deploy applications, manage domains, check deployment status, and configure environments directly from Claude Code.",
  tags: ["deployment", "hosting", "serverless", "integration", "official"],
  featured: true,
  author: {
    name: "Vercel",
    url: "https://vercel.com",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/vercel",
  installCommand: "claude plugins add vercel@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "vercel@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/vercel-deploy", description: "Deploy current project to Vercel" },
    { name: "/vercel-status", description: "Check deployment status" },
    { name: "/vercel-env", description: "Manage environment variables" },
    { name: "/vercel-domains", description: "Configure custom domains" },
    { name: "/vercel-logs", description: "View deployment and function logs" },
  ],
  relatedItems: [
    { type: "mcp-server", slug: "vercel", relationship: "requires" },
  ],
};
