import { Plugin } from "@/lib/types";

export const rustAnalyzerLspPlugin: Plugin = {
  slug: "rust-analyzer-lsp",
  title: "Rust Analyzer LSP",
  description: "Rust language server with borrow checker feedback and lifetime analysis. Real-time error detection, macro expansion, and intelligent code completion for Rust development.",
  tags: ["rust", "lsp", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/lsp_plugins/rust-analyzer-lsp",
  installCommand: "claude plugins add rust-analyzer-lsp@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "rust-analyzer-lsp@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/rust-check", description: "Run cargo check with enhanced diagnostics" },
    { name: "/rust-expand", description: "Expand Rust macros" },
    { name: "/rust-clippy", description: "Run Clippy lints" },
  ],
};
