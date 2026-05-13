import { Plugin } from "@/lib/types";

export const claudePreviewPlugin: Plugin = {
  slug: "claude-preview",
  title: "Claude Preview",
  description: "Preview and inspect web UIs that Claude builds — start, stop, click, fill forms, read console logs, capture screenshots, and monitor network requests, all inside Claude Code.",
  tags: ["official", "anthropic", "browser", "preview", "frontend", "testing"],
  featured: true,
  dateAdded: "2026-03-20",
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  installCommand: "/plugin install claude-preview@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "claude-preview@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/preview start", description: "Start the local preview server for your web app" },
    { name: "/preview screenshot", description: "Capture a screenshot of the current page" },
    { name: "/preview click", description: "Click a selector in the preview" },
    { name: "/preview console", description: "Stream console logs from the running preview" },
    { name: "/preview network", description: "Inspect network requests made by the page" },
  ],
  relatedItems: [
    { type: "skill", slug: "webapp-testing", relationship: "works-with" },
    { type: "plugin", slug: "playwright", relationship: "works-with" },
  ],
};
