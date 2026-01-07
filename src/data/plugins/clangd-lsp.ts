import { Plugin } from "@/lib/types";

export const clangdLspPlugin: Plugin = {
  slug: "clangd-lsp",
  title: "C/C++ LSP (clangd)",
  description: "C and C++ language server with header resolution and memory safety hints. LLVM-based tooling with intelligent completions, diagnostics, and code navigation.",
  tags: ["c", "cpp", "lsp", "llvm", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/lsp_plugins/clangd-lsp",
  installCommand: "claude plugins add clangd-lsp@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "clangd-lsp@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/clang-check", description: "Run clang static analyzer" },
    { name: "/clang-format", description: "Format C/C++ code" },
    { name: "/cmake", description: "Generate and manage CMake builds" },
  ],
};
