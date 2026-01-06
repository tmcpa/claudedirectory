import { Plugin } from "@/lib/types";

export const featureDevPlugin: Plugin = {
  slug: "feature-dev",
  title: "Feature Development",
  description: "Guided feature development with codebase understanding and architecture focus. A comprehensive 7-phase workflow for building features systematically with specialized agents for exploration, architecture, and review.",
  tags: ["feature", "development", "architecture", "official", "workflow"],
  featured: true,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  installCommand: "claude plugins add feature-dev@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "feature-dev@claude-plugins-official": true
  }
}`,
  commands: [
    {
      name: "/feature-dev",
      description: "Launch the 7-phase guided feature development workflow: Discovery, Codebase Exploration, Clarifying Questions, Architecture Design, Implementation, Quality Review, and Summary",
    },
  ],
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/plugins/feature-dev",
  relatedItems: [
    { type: "agent", slug: "code-explorer", relationship: "contains" },
    { type: "agent", slug: "code-architect", relationship: "contains" },
    { type: "agent", slug: "fd-code-reviewer", relationship: "contains" },
    { type: "how-to", slug: "plugins", relationship: "documented-by" },
  ],
};
