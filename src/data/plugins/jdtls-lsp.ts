import { Plugin } from "@/lib/types";

export const jdtlsLspPlugin: Plugin = {
  slug: "jdtls-lsp",
  title: "Java LSP (jdtls)",
  description: "Java language server with Maven and Gradle dependency resolution. Eclipse JDT-based tooling with intelligent code completion, refactoring, and project management.",
  tags: ["java", "lsp", "maven", "gradle", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/lsp_plugins/jdtls-lsp",
  installCommand: "claude plugins add jdtls-lsp@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "jdtls-lsp@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/java-build", description: "Build Java project with Maven or Gradle" },
    { name: "/java-test", description: "Run JUnit tests" },
    { name: "/java-deps", description: "Manage project dependencies" },
  ],
};
