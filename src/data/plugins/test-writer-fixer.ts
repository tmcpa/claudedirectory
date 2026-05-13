import { Plugin } from "@/lib/types";

export const testWriterFixerPlugin: Plugin = {
  slug: "test-writer-fixer",
  title: "Test Writer Fixer",
  description: "Write new tests, run existing tests, analyze failures, and fix them while maintaining test integrity",
  tags: ["testing", "unit-tests", "test-automation", "debugging", "community"],
  featured: false,
  author: {
    name: "Michael Galpert",
    url: "https://github.com/ccplugins/awesome-claude-code-plugins",
  },
  repoUrl: "https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/test-writer-fixer",
  installCommand: "/plugin marketplace add ccplugins/awesome-claude-code-plugins && /plugin install test-writer-fixer@awesome-claude-code-plugins",
};
