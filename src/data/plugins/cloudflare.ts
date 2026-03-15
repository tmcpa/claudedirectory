import { Plugin } from "@/lib/types";

export const cloudflarePlugin: Plugin = {
  slug: "cloudflare",
  title: "Cloudflare",
  description: "Deploy and manage Cloudflare Workers, Pages, KV stores, and D1 databases with Claude Code integration for edge-first development",
  tags: ["infrastructure", "cloudflare", "edge", "workers", "external"],
  featured: false,
  author: {
    name: "Cloudflare",
    url: "https://github.com/cloudflare",
  },
  installCommand: "claude plugins add @cloudflare/claude-plugin",
  commands: [
    { name: "/cf:deploy", description: "Deploy a Worker or Pages project" },
    { name: "/cf:logs", description: "Tail real-time logs from Workers" },
    { name: "/cf:kv", description: "Browse and manage KV namespace entries" },
    { name: "/cf:d1", description: "Query and manage D1 databases" },
  ],
};
