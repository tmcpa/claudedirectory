import { Plugin } from "@/lib/types";

export const cursorRulesPlugin: Plugin = {
  slug: "cursor-rules",
  title: "Cursor Rules Converter",
  description: "Import and convert .cursorrules files to CLAUDE.md format for seamless migration from Cursor to Claude Code",
  tags: ["migration", "cursor", "claude-md", "conversion", "community"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  installCommand: "claude plugins add cursor-rules",
  commands: [
    { name: "/cursor-import", description: "Convert .cursorrules to CLAUDE.md format" },
    { name: "/cursor-diff", description: "Show differences between .cursorrules and CLAUDE.md" },
  ],
};
