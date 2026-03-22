import { Plugin } from "@/lib/types";

export const netlifyPlugin: Plugin = {
  slug: "netlify",
  title: "Netlify",
  description:
    "Deploy, manage, and configure Netlify sites, builds, and serverless functions directly from Claude Code",
  tags: ["netlify", "deployment", "hosting", "serverless", "jamstack"],
  featured: false,
  author: {
    name: "Netlify",
    url: "https://github.com/netlify",
  },
  repoUrl: "https://github.com/netlify/netlify-mcp",
  installCommand: "claude plugins add netlify",
  commands: [
    {
      name: "/netlify:deploy",
      description: "Deploy current project to Netlify",
    },
    {
      name: "/netlify:status",
      description: "Check deployment status and build logs",
    },
    {
      name: "/netlify:env",
      description: "Manage environment variables for the site",
    },
    {
      name: "/netlify:functions",
      description: "List and manage serverless functions",
    },
  ],
};
