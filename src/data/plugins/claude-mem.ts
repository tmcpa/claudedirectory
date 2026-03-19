import { Plugin } from "@/lib/types";

export const claudeMemPlugin: Plugin = {
  slug: "claude-mem",
  title: "Claude Mem",
  description:
    "Persistent memory system that captures coding session context, compresses observations with AI, and injects relevant history into future sessions with SQLite storage",
  tags: ["memory", "context", "persistence", "sqlite", "community"],
  featured: false,
  author: {
    name: "thedotmack",
    url: "https://github.com/thedotmack",
  },
  repoUrl: "https://github.com/thedotmack/claude-mem",
  installCommand: "claude plugins add claude-mem",
  commands: [
    {
      name: "/mem:search",
      description:
        "Search stored memories by keyword or semantic similarity",
    },
    {
      name: "/mem:recall",
      description: "Load relevant context from previous sessions",
    },
    {
      name: "/mem:forget",
      description: "Remove specific memories from storage",
    },
    {
      name: "/mem:stats",
      description: "Show memory usage statistics and storage info",
    },
  ],
};
