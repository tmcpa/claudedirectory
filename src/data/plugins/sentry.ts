import { Plugin } from "@/lib/types";

export const sentryPlugin: Plugin = {
  slug: "sentry",
  title: "Sentry",
  description: "Sentry error monitoring integration. Track errors, view stack traces, analyze crash reports, and get real-time alerts for application issues.",
  tags: ["monitoring", "errors", "debugging", "observability", "official"],
  featured: false,
  author: {
    name: "Sentry",
    url: "https://sentry.io",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/sentry",
  installCommand: "claude plugins add sentry@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "sentry@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/sentry-issues", description: "View recent errors and issues" },
    { name: "/sentry-trace", description: "Analyze error stack trace" },
    { name: "/sentry-fix", description: "Get fix suggestions for an error" },
    { name: "/sentry-release", description: "Manage Sentry releases" },
  ],
  relatedItems: [
    { type: "mcp-server", slug: "sentry", relationship: "requires" },
  ],
};
