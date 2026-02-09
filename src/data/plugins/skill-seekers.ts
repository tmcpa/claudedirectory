import { Plugin } from "@/lib/types";

export const skillSeekersPlugin: Plugin = {
  slug: "skill-seekers",
  title: "Skill Seekers",
  description: "Convert documentation websites into Claude Skills automatically. Transform any docs site into an installable skill for Claude Code",
  tags: ["skills", "documentation", "converter", "automation", "community"],
  featured: false,
  dateAdded: "2026-01-26",
  author: {
    name: "yusufkaraaslan",
    url: "https://github.com/yusufkaraaslan",
  },
  repoUrl: "https://github.com/yusufkaraaslan/skill-seekers",
  installCommand: "git clone https://github.com/yusufkaraaslan/skill-seekers.git && cd skill-seekers && npm install",
  config: `{
  "enabledPlugins": {
    "skill-seekers": true
  }
}`,
  commands: [
    { name: "/seek", description: "Convert a documentation URL into a Claude Skill" },
    { name: "/skill-from-docs", description: "Generate skill from documentation website" },
  ],
};
