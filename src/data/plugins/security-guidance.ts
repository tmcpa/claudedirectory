import { Plugin } from "@/lib/types";

export const securityGuidancePlugin: Plugin = {
  slug: "security-guidance",
  title: "Security Guidance",
  description: "Automatic security issue detection during file editing with monitoring for 9 common vulnerability patterns",
  tags: ["security", "vulnerability", "analysis", "hooks", "official"],
  featured: true,
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics",
  },
  repoUrl: "https://github.com/anthropics/claude-code-plugins",
  installCommand: "claude plugins add security-guidance@claude-plugins-official",
  config: `{
  "enabledPlugins": {
    "security-guidance@claude-plugins-official": true
  }
}`,
};
