import { Plugin } from "@/lib/types";

export const skillsJanitorPlugin: Plugin = {
  slug: "skills-janitor",
  title: "Skills Janitor",
  description: "Audit, usage-track and prune installed skills — token-cost split and a swipe-to-delete TUI",
  tags: ["skills", "audit", "cleanup", "token-cost", "productivity"],
  author: {
    name: "khendzel",
    url: "https://github.com/khendzel",
  },
  repoUrl: "https://github.com/khendzel/skills-janitor",
  installCommand: "/plugin marketplace add khendzel/skills-janitor",
  commands: [
    { name: "/janitor-report", description: "Health check: inventory, duplicates, broken skills" },
    { name: "/janitor-fix", description: "Auto-fix issues; --prune removes broken symlinks and empty dirs" },
    { name: "/janitor-value", description: "Token costs (always-loaded vs on-demand) plus usage, for skills and subagents" },
    { name: "/janitor-discover", description: "Search GitHub for skills, or vet a URL before installing" },
    { name: "/janitor-swipe", description: "Interactive TUI: swipe keep/delete/skip through every installed skill" },
  ],
};
