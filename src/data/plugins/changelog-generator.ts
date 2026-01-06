import { Plugin } from "@/lib/types";

export const changelogGeneratorPlugin: Plugin = {
  slug: "changelog-generator",
  title: "Changelog Generator",
  description: "Automatically generate changelogs from git commits with conventional commit support",
  tags: ["changelog", "git", "releases", "automation", "community"],
  featured: false,
  author: {
    name: "Community",
    url: "https://github.com/ccplugins",
  },
  repoUrl: "https://github.com/ccplugins/changelog-generator",
  installCommand: "npx claude-plugins install changelog-generator",
  config: `{
  "enabledPlugins": {
    "changelog-generator": true
  }
}`,
  commands: [
    { name: "/changelog", description: "Generate changelog from recent commits" },
    { name: "/release", description: "Prepare release notes" },
  ],
};
