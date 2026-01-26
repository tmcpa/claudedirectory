import { Plugin } from "@/lib/types";

export const agentSdkDevPlugin: Plugin = {
  slug: "agent-sdk-dev",
  title: "Agent SDK Development",
  description: "Development kit for the Claude Agent SDK with /new-sdk-app command and validators for Python & TypeScript",
  tags: ["sdk", "agent", "development", "typescript", "python", "official"],
  featured: false,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-plugins-official",
  installCommand: "claude plugins add agent-sdk-dev@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "agent-sdk-dev@claude-plugins-official": true
  }
}`,
};
