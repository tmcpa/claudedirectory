import { Plugin } from "@/lib/types";

export const bugDetectivePlugin: Plugin = {
  slug: "bug-detective",
  title: "Bug Detective",
  description: "Advanced bug detection and analysis with root cause identification and fix suggestions",
  tags: ["debugging", "code-quality", "analysis", "community"],
  featured: false,
  author: {
    name: "Community",
    url: "https://github.com/ccplugins",
  },
  repoUrl: "https://github.com/ccplugins/bug-detective",
  installCommand: "npx claude-plugins install bug-detective",
  config: `{
  "enabledPlugins": {
    "bug-detective": true
  }
}`,
  commands: [
    { name: "/investigate", description: "Investigate a bug or error" },
    { name: "/trace", description: "Trace the execution path of an issue" },
    { name: "/diagnose", description: "Diagnose potential issues in code" },
  ],
};
