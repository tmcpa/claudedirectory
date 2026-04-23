import { Plugin } from "@/lib/types";

export const claudeInChromePlugin: Plugin = {
  slug: "claude-in-chrome",
  title: "Claude in Chrome",
  description: "Drive a real Chrome browser from Claude Code. Navigate pages, fill forms, click elements, read console messages, inspect network requests, switch tabs, and upload files — purpose-built for automating web workflows on authenticated sites.",
  tags: ["official", "anthropic", "browser", "chrome", "automation", "mcp"],
  featured: true,
  dateAdded: "2026-02-28",
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  installCommand: "claude plugins add claude-in-chrome@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "claude-in-chrome@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/navigate", description: "Navigate the browser to a URL" },
    { name: "/find", description: "Find elements on the page by selector or text" },
    { name: "/form-input", description: "Fill and submit a form" },
    { name: "/read-console", description: "Read console messages from the current tab" },
    { name: "/read-network", description: "Inspect network requests for the current tab" },
    { name: "/switch-browser", description: "Switch between open Chrome instances" },
  ],
  relatedItems: [
    { type: "plugin", slug: "chrome-devtools", relationship: "works-with" },
    { type: "plugin", slug: "claude-preview", relationship: "works-with" },
    { type: "skill", slug: "webapp-testing", relationship: "works-with" },
  ],
};
