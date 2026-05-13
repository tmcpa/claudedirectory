import { Plugin } from "@/lib/types";

export const changelogGeneratorPlugin: Plugin = {
  slug: "changelog-generator",
  title: "Changelog Generator",
  description: "Changelog Generator subagent for automatically generating changelogs",
  tags: ["changelog", "git", "releases", "automation", "community"],
  featured: false,
  author: {
    name: "Joe Heitzeberg",
    url: "https://github.com/ccplugins/awesome-claude-code-plugins",
  },
  repoUrl: "https://github.com/ccplugins/awesome-claude-code-plugins/tree/main/plugins/changelog-generator",
  installCommand: "/plugin marketplace add ccplugins/awesome-claude-code-plugins && /plugin install changelog-generator@awesome-claude-code-plugins",
};
