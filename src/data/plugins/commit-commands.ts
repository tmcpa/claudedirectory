import { Plugin } from "@/lib/types";

export const commitCommandsPlugin: Plugin = {
  slug: "commit-commands",
  title: "Git Commit Commands",
  description: "Git workflow automation with intelligent commit message generation, branch management, and PR creation. Follows conventional commits and analyzes changes to generate meaningful commit messages automatically.",
  tags: ["git", "workflow", "automation", "vcs", "official"],
  featured: true,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-code-plugins",
  installCommand: "claude plugins add commit-commands@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "commit-commands@claude-plugins-official": true
  }
}`,
  commands: [
    { name: "/commit", description: "Stage changes and create commit with AI-generated message" },
    { name: "/commit-push-pr", description: "Commit, push, and create a pull request in one command" },
    { name: "/clean_gone", description: "Clean up local branches that no longer exist on remote" },
    { name: "/amend", description: "Amend the last commit with new changes" },
    { name: "/stash", description: "Intelligently stash changes with descriptive names" },
  ],
  relatedItems: [
    { type: "plugin", slug: "github", relationship: "works-with" },
    { type: "how-to", slug: "plugins", relationship: "documented-by" },
  ],
};
