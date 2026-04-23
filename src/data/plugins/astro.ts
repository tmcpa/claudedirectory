import { Plugin } from "@/lib/types";

export const astroPlugin: Plugin = {
  slug: "astro",
  title: "Astro",
  description: "Astro framework helper for Claude Code. Scaffold content collections, create islands, add integrations, and work with MDX and Markdown — with framework-aware code completion for .astro files.",
  tags: ["frontend", "framework", "astro", "ssg", "content"],
  featured: false,
  dateAdded: "2026-03-25",
  author: {
    name: "Astro",
    url: "https://astro.build",
  },
  repoUrl: "https://github.com/withastro/astro",
  installCommand: "claude plugins add astro@community",
  commands: [
    { name: "/astro add", description: "Add an official Astro integration to the project" },
    { name: "/astro collection", description: "Scaffold a new content collection with schema" },
    { name: "/astro island", description: "Create a new interactive island component" },
  ],
};
