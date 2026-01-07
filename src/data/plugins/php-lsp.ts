import { Plugin } from "@/lib/types";

export const phpLspPlugin: Plugin = {
  slug: "php-lsp",
  title: "PHP LSP (Intelephense)",
  description: "PHP language server with Composer autoloading and namespace resolution. Intelligent code completion, diagnostics, and refactoring for PHP development.",
  tags: ["php", "lsp", "composer", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/lsp_plugins/php-lsp",
  installCommand: "claude plugins add php-lsp@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "php-lsp@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/php-check", description: "Run PHP static analysis" },
    { name: "/composer", description: "Manage Composer dependencies" },
    { name: "/phpunit", description: "Run PHPUnit tests" },
  ],
};
