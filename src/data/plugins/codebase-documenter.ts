import { Plugin } from "@/lib/types";

export const codebaseDocumenterPlugin: Plugin = {
  slug: "codebase-documenter",
  title: "Codebase Documenter",
  description: "Automatically generate and maintain documentation for your codebase including READMEs, API docs, and architecture diagrams",
  tags: ["documentation", "readme", "api-docs", "automation", "community"],
  featured: false,
  author: {
    name: "Community",
    url: "https://github.com/ccplugins",
  },
  repoUrl: "https://github.com/ccplugins/codebase-documenter",
  installCommand: "npx claude-plugins install codebase-documenter",
  config: `{
  "enabledPlugins": {
    "codebase-documenter": true
  }
}`,
  commands: [
    { name: "/document", description: "Generate documentation for selected code" },
    { name: "/readme", description: "Generate or update README files" },
    { name: "/api-docs", description: "Generate API documentation" },
    { name: "/architecture", description: "Generate architecture documentation" },
  ],
  relatedItems: [
    { type: "agent", slug: "documentation-expert", relationship: "works-with" },
  ],
};
