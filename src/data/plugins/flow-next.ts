import { Plugin } from "@/lib/types";

export const flowNextPlugin: Plugin = {
  slug: "flow-next",
  title: "Flow-Next",
  description: "Plan-first development workflows with multi-model review gates, context re-anchoring to prevent drift, and receipt-based gating for reliable AI coding",
  tags: ["workflow", "planning", "review", "drift-prevention", "community"],
  featured: false,
  dateAdded: "2026-01-26",
  author: {
    name: "gmickel",
    url: "https://github.com/gmickel",
  },
  repoUrl: "https://github.com/gmickel/gmickel-claude-marketplace",
  installCommand: "/plugin marketplace add gmickel/gmickel-claude-marketplace && /plugin install flow-next@gmickel-claude-marketplace",
  config: `{
  "enabledPlugins": {
    "flow-next@gmickel-claude-marketplace": true
  }
}`,
  commands: [
    { name: "/flow", description: "Start a plan-first development workflow" },
    { name: "/anchor", description: "Re-anchor context to prevent drift" },
    { name: "/gate", description: "Create a review gate checkpoint" },
  ],
};
