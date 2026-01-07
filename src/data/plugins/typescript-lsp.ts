import { Plugin } from "@/lib/types";

export const typescriptLspPlugin: Plugin = {
  slug: "typescript-lsp",
  title: "TypeScript LSP",
  description: "TypeScript and JavaScript language server integration. Real-time type checking, auto-imports, intelligent refactoring, and code navigation for TypeScript and JavaScript projects.",
  tags: ["typescript", "javascript", "lsp", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/lsp_plugins/typescript-lsp",
  installCommand: "claude plugins add typescript-lsp@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "typescript-lsp@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/ts-check", description: "Run TypeScript type checker on project" },
    { name: "/ts-errors", description: "Show all TypeScript errors in workspace" },
    { name: "/ts-refactor", description: "Intelligent TypeScript refactoring" },
  ],
};
