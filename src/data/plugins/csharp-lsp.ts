import { Plugin } from "@/lib/types";

export const csharpLspPlugin: Plugin = {
  slug: "csharp-lsp",
  title: "C# LSP (OmniSharp)",
  description: "C# language server with NuGet package awareness and .NET targeting. Full IntelliSense, refactoring, and debugging support for .NET development.",
  tags: ["csharp", "dotnet", "lsp", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/lsp_plugins/csharp-lsp",
  installCommand: "claude plugins add csharp-lsp@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "csharp-lsp@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/dotnet-build", description: "Build .NET solution or project" },
    { name: "/dotnet-test", description: "Run .NET tests" },
    { name: "/nuget", description: "Manage NuGet packages" },
  ],
};
