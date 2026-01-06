import { Plugin } from "@/lib/types";

export const safetyNetPlugin: Plugin = {
  slug: "safety-net",
  title: "Safety Net",
  description: "Catches destructive git and filesystem commands before they execute to prevent accidental data loss",
  tags: ["safety", "git", "filesystem", "protection", "community"],
  featured: true,
  author: {
    name: "Community",
    url: "https://github.com/ccplugins",
  },
  repoUrl: "https://github.com/ccplugins/safety-net",
  installCommand: "npx claude-plugins install safety-net",
  config: `{
  "enabledPlugins": {
    "safety-net": true
  }
}`,
  commands: [
    { name: "/safety", description: "Check safety settings" },
    { name: "/whitelist", description: "Whitelist a command pattern" },
  ],
};
