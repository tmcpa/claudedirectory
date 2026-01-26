import { Plugin } from "@/lib/types";

export const swiftLspPlugin: Plugin = {
  slug: "swift-lsp",
  title: "Swift LSP",
  description: "Language Server Protocol support for Swift development. Real-time type checking, Xcode integration, SwiftUI previews, and intelligent code completion for iOS, macOS, watchOS, and tvOS development.",
  tags: ["swift", "lsp", "ios", "macos", "official", "xcode"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official",
  installCommand: "claude plugins add swift-lsp@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "swift-lsp@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/swift-check", description: "Type check Swift files and show errors" },
    { name: "/swift-format", description: "Format Swift code with swift-format" },
    { name: "/swift-build", description: "Build Swift package or Xcode project" },
  ],
};
