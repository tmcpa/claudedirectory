import { Plugin } from "@/lib/types";

export const compoundingEngineeringPlugin: Plugin = {
  slug: "compounding-engineering",
  title: "Compounding Engineering",
  description: "AI-powered development tools that get smarter with every use, featuring 24 specialized agents, 16 commands, and 11 skills",
  tags: ["ai", "agents", "workflow", "productivity", "community"],
  featured: true,
  author: {
    name: "Every Inc",
    url: "https://github.com/EveryInc",
  },
  repoUrl: "https://github.com/EveryInc/compound-engineering-plugin",
  installCommand: "npx claude-plugins install @EveryInc/compound-engineering-plugin/compounding-engineering",
  config: `{
  "enabledPlugins": {
    "@EveryInc/compound-engineering-plugin/compounding-engineering": true
  }
}`,
  commands: [
    { name: "/compound", description: "Start a compounding engineering session" },
    { name: "/learn", description: "Teach the system new patterns from your codebase" },
    { name: "/recall", description: "Recall learned patterns and apply them" },
  ],
};
