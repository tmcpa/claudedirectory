import { Plugin } from "@/lib/types";

export const claudeBrainPlugin: Plugin = {
  slug: "claude-brain",
  title: "Claude Brain",
  description:
    "Portable memory in a single .mv2 file with no database dependencies. Rust-based core with sub-millisecond operations, git-committable and shareable",
  tags: ["memory", "portable", "rust", "context", "community"],
  featured: false,
  author: {
    name: "memvid",
    url: "https://github.com/memvid",
  },
  repoUrl: "https://github.com/memvid/claude-brain",
  installCommand: "/plugin marketplace add memvid/claude-brain && /plugin install mind@memvid",
  commands: [
    {
      name: "/brain:save",
      description: "Save current context to the .mv2 memory file",
    },
    {
      name: "/brain:load",
      description: "Load context from the .mv2 memory file",
    },
    {
      name: "/brain:search",
      description: "Search stored memories semantically",
    },
  ],
};
