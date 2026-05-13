import { Plugin } from "@/lib/types";

export const anthropicSkillsPlugin: Plugin = {
  slug: "anthropic-skills",
  title: "Anthropic Skills",
  description: "Official collection of Anthropic-built skills for Claude Code. Bundles document skills (pdf, pptx, xlsx, docx), memory maintenance (consolidate-memory), skill authoring (skill-creator), and scheduling — everything you need for day-to-day productivity.",
  tags: ["official", "anthropic", "skills", "documents", "productivity"],
  featured: true,
  dateAdded: "2026-04-10",
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics/skills",
  },
  repoUrl: "https://github.com/anthropics/skills",
  installCommand: "/plugin marketplace add anthropics/skills && /plugin install document-skills@anthropic-agent-skills",
  config: `{
  "enabledPlugins": {
    "document-skills@anthropic-agent-skills": true
  }
}`,
  commands: [
    { name: "/skill-creator", description: "Create, edit, and optimize Claude Code skills" },
    { name: "/consolidate-memory", description: "Merge duplicate memory files and prune the index" },
    { name: "/schedule", description: "Create scheduled remote agents on a cron schedule" },
    { name: "/setup-cowork", description: "Guided Cowork setup" },
  ],
  relatedItems: [
    { type: "skill", slug: "skill-creator", relationship: "contains" },
    { type: "skill", slug: "pdf", relationship: "contains" },
    { type: "skill", slug: "pptx", relationship: "contains" },
    { type: "skill", slug: "xlsx", relationship: "contains" },
    { type: "skill", slug: "docx", relationship: "contains" },
    { type: "skill", slug: "consolidate-memory", relationship: "contains" },
  ],
};
