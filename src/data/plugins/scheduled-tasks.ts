import { Plugin } from "@/lib/types";

export const scheduledTasksPlugin: Plugin = {
  slug: "scheduled-tasks",
  title: "Scheduled Tasks",
  description: "Create, list, update, and run scheduled Claude Code agents on a cron schedule. Useful for nightly PR triage, weekly dependency audits, periodic health checks, and recurring automation workflows.",
  tags: ["official", "anthropic", "automation", "cron", "scheduling", "workflow"],
  featured: true,
  dateAdded: "2026-03-12",
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  installCommand: "claude plugins add scheduled-tasks@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "scheduled-tasks@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/schedule create", description: "Create a new scheduled task with a cron expression" },
    { name: "/schedule list", description: "List all scheduled tasks for the current project" },
    { name: "/schedule update", description: "Update the schedule or prompt of an existing task" },
    { name: "/schedule run", description: "Run a scheduled task on demand" },
  ],
  relatedItems: [
    { type: "plugin", slug: "github", relationship: "works-with" },
  ],
};
