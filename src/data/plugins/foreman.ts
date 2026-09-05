import { Plugin } from "@/lib/types";

export const foremanPlugin: Plugin = {
  slug: "foreman",
  title: "Foreman",
  description:
    "Keeps your project plan next to the code as a plain roadmap file, so the next session starts where the last one stopped: ask what's next and get the task, why it comes first, and a ready-to-run prompt checked against your real files",
  tags: ["roadmap", "planning", "prompt-engineering", "workflow", "community"],
  featured: false,
  author: {
    name: "Victor Villegas",
    url: "https://github.com/V-Songbird",
  },
  repoUrl: "https://github.com/V-Songbird/foreman",
  installCommand: "/plugin marketplace add V-Songbird/foundry && /plugin install foreman@foundry",
  commands: [
    {
      name: "/foreman:foreman",
      description: "Say what you want in plain words: add work, show status, pick the next task",
    },
    {
      name: "/foreman:init",
      description: "Set up the roadmap for a project",
    },
    {
      name: "/foreman:roadmap",
      description: "Pick the next task, add one, fix one, or check the roadmap's health",
    },
    {
      name: "/foreman:survey",
      description: "Check the next tasks against the actual codebase and repair stale ones",
    },
    {
      name: "/foreman:craft-prompt",
      description: "Build a standalone, self-contained prompt for a session",
    },
  ],
};
