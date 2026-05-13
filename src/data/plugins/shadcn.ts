import { Plugin } from "@/lib/types";

export const shadcnPlugin: Plugin = {
  slug: "shadcn",
  title: "shadcn/ui",
  description: "Scaffold and customize shadcn/ui components directly from Claude Code. Add components, inspect the registry, and generate composed UI patterns that match your design tokens — without leaving the editor.",
  tags: ["frontend", "ui", "react", "design-system", "tailwind"],
  featured: false,
  dateAdded: "2026-03-05",
  author: {
    name: "shadcn",
    url: "https://ui.shadcn.com",
  },
  repoUrl: "https://github.com/shadcn-ui/ui",
  installCommand: "/plugin install shadcn@community",
  commands: [
    { name: "/shadcn add", description: "Add a shadcn/ui component to the project" },
    { name: "/shadcn list", description: "List available components in the registry" },
    { name: "/shadcn compose", description: "Compose a pattern (e.g., data table, dashboard) from primitives" },
  ],
  relatedItems: [
    { type: "plugin", slug: "frontend-design", relationship: "works-with" },
  ],
};
