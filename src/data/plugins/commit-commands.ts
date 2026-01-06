import { Plugin } from "@/lib/types";

export const commitCommandsPlugin: Plugin = {
  slug: "commit-commands",
  title: "Git Commit Commands",
  description: "Git workflow automation with /commit, /commit-push-pr, and /clean_gone commands for streamlined version control",
  tags: ["git", "workflow", "automation", "vcs", "official"],
  featured: true,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  installCommand: "claude plugins add commit-commands@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "commit-commands@claude-plugins-official": true
  }
}`,
};
