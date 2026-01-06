import { Plugin } from "@/lib/types";

export const testWriterPlugin: Plugin = {
  slug: "test-writer",
  title: "Test Writer",
  description: "Automatically generate comprehensive tests for your code with coverage analysis",
  tags: ["testing", "unit-tests", "coverage", "automation", "community"],
  featured: false,
  author: {
    name: "Community",
    url: "https://github.com/ccplugins",
  },
  repoUrl: "https://github.com/ccplugins/test-writer",
  installCommand: "npx claude-plugins install test-writer",
  config: `{
  "enabledPlugins": {
    "test-writer": true
  }
}`,
  commands: [
    { name: "/test", description: "Generate tests for selected code" },
    { name: "/coverage", description: "Analyze test coverage and suggest improvements" },
    { name: "/mock", description: "Generate mocks and fixtures" },
  ],
  relatedItems: [
    { type: "agent", slug: "test-automator", relationship: "works-with" },
  ],
};
