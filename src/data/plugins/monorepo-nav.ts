import { Plugin } from "@/lib/types";

export const monorepoNavPlugin: Plugin = {
  slug: "monorepo-nav",
  title: "Monorepo Navigator",
  description: "Smart navigation across monorepo packages and workspaces with dependency-aware context switching",
  tags: ["monorepo", "navigation", "workspaces", "turborepo", "community"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  installCommand: "claude plugins add monorepo-nav",
  commands: [
    { name: "/mono", description: "List all packages in the monorepo" },
    { name: "/mono:focus", description: "Focus Claude's context on a specific package" },
    { name: "/mono:deps", description: "Show dependency graph between packages" },
  ],
};
