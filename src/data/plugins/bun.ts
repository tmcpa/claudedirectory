import { Plugin } from "@/lib/types";

export const bunPlugin: Plugin = {
  slug: "bun",
  title: "Bun",
  description: "Bun runtime helper for Claude Code. Run scripts, manage dependencies with bun install, execute tests with bun test, and migrate Node.js projects to Bun with guided codemods.",
  tags: ["javascript", "typescript", "runtime", "bun", "tooling"],
  featured: false,
  dateAdded: "2026-03-22",
  author: {
    name: "Oven",
    url: "https://bun.sh",
  },
  repoUrl: "https://github.com/oven-sh/bun",
  installCommand: "/plugin install bun@community",
  commands: [
    { name: "/bun run", description: "Run a Bun script or package.json command" },
    { name: "/bun test", description: "Run the Bun test suite" },
    { name: "/bun install", description: "Install dependencies with bun install" },
    { name: "/bun migrate", description: "Migrate a Node.js project to Bun" },
  ],
};
