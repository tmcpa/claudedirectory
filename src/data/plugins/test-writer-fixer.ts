import { Plugin } from "@/lib/types";

export const testWriterFixerPlugin: Plugin = {
  slug: "test-writer-fixer",
  title: "Test Writer Fixer",
  description: "Write new tests, run existing tests, analyze failures, and fix them while maintaining test integrity",
  tags: ["testing", "unit-tests", "test-automation", "debugging", "community"],
  featured: false,
  author: {
    name: "Michael Galpert",
    url: "https://github.com/ccplugins/marketplace",
  },
  repoUrl: "https://github.com/ccplugins/marketplace/tree/main/plugins/test-writer-fixer",
  installCommand: "claude plugins:add ccplugins/marketplace/plugins/test-writer-fixer",
};
