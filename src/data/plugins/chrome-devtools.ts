import { Plugin } from "@/lib/types";

export const chromeDevtoolsPlugin: Plugin = {
  slug: "chrome-devtools",
  title: "Chrome DevTools",
  description: "Chrome browser testing and performance analysis using Chrome DevTools Protocol (CDP). 27 professional-grade tools for web testing, performance measurement, accessibility validation, and browser automation.",
  tags: ["testing", "browser", "performance", "accessibility", "official"],
  featured: true,
  dateAdded: "2026-01-07",
  author: {
    name: "Google",
    url: "https://developer.chrome.com/docs/devtools",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/chrome-devtools",
  installCommand: "claude plugins add chrome-devtools@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "chrome-devtools@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/lighthouse", description: "Run Lighthouse performance audit" },
    { name: "/a11y", description: "Run accessibility audit on page" },
    { name: "/perf", description: "Capture and analyze performance trace" },
    { name: "/network", description: "Analyze network requests and waterfall" },
    { name: "/console", description: "Capture and analyze console output" },
  ],
  relatedItems: [
    { type: "plugin", slug: "playwright", relationship: "works-with" },
  ],
};
