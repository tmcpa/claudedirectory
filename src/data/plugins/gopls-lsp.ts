import { Plugin } from "@/lib/types";

export const goplsLspPlugin: Plugin = {
  slug: "gopls-lsp",
  title: "Go LSP (gopls)",
  description: "Go language server with module resolution and interface checks. Real-time diagnostics, code navigation, and refactoring support for Go development.",
  tags: ["go", "golang", "lsp", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/lsp_plugins/gopls-lsp",
  installCommand: "claude plugins add gopls-lsp@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "gopls-lsp@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/go-check", description: "Run go vet and staticcheck" },
    { name: "/go-mod", description: "Manage Go modules and dependencies" },
    { name: "/go-test", description: "Run Go tests with coverage" },
  ],
};
