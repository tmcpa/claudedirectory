import { Plugin } from "@/lib/types";

export const pyrightLspPlugin: Plugin = {
  slug: "pyright-lsp",
  title: "Pyright LSP",
  description: "Python type inference and environment awareness via Pyright. Static type checking, intelligent completions, and type stub support for Python development.",
  tags: ["python", "lsp", "typing", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/lsp_plugins/pyright-lsp",
  installCommand: "claude plugins add pyright-lsp@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "pyright-lsp@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/py-check", description: "Run Pyright type checker on Python files" },
    { name: "/py-types", description: "Show type information for symbol" },
    { name: "/py-stub", description: "Generate type stubs for module" },
  ],
};
