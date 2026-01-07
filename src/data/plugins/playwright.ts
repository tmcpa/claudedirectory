import { Plugin } from "@/lib/types";

export const playwrightPlugin: Plugin = {
  slug: "playwright",
  title: "Playwright",
  description: "Browser automation and end-to-end testing by Microsoft. Enables Claude to interact with web pages, take screenshots, fill forms, click elements, and perform automated browser testing workflows across Chromium, Firefox, and WebKit.",
  tags: ["testing", "automation", "browser", "e2e", "official"],
  featured: true,
  author: {
    name: "Microsoft",
    url: "https://playwright.dev",
  },
  installCommand: "claude plugins add playwright@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "playwright@claude-plugins-official": true
  }
}`,
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/playwright",
  commands: [
    { name: "/playwright-test", description: "Run Playwright tests or create new test files" },
    { name: "/playwright-screenshot", description: "Take screenshots of web pages" },
    { name: "/playwright-trace", description: "Record and analyze test traces" },
    { name: "/playwright-codegen", description: "Generate test code from browser interactions" },
  ],
  relatedItems: [
    { type: "mcp-server", slug: "playwright", relationship: "requires" },
    { type: "plugin", slug: "test-writer", relationship: "works-with" },
  ],
};
