import { Plugin } from "@/lib/types";

export const codexSettingsPlugin: Plugin = {
  slug: "codex-settings",
  title: "Claude Codex Settings",
  description: "Well-organized plugins covering core developer activities with cloud platforms like GitHub, Azure, MongoDB, and services like Tavily and Playwright",
  tags: ["cloud", "github", "azure", "mongodb", "playwright"],
  featured: false,
  author: {
    name: "fcakyon",
    url: "https://github.com/fcakyon/claude-codex-settings",
  },
  repoUrl: "https://github.com/fcakyon/claude-codex-settings",
  installCommand: "git clone https://github.com/fcakyon/claude-codex-settings.git ~/.claude-codex-settings && cp -r ~/.claude-codex-settings/.claude ~/",
  config: `# Claude Codex Settings

Pre-configured settings for working with popular cloud platforms and services.

## Included Integrations

### Cloud Platforms
- **GitHub** - Repository management and CI/CD
- **Azure** - Azure services integration
- **MongoDB** - Database operations

### Services
- **Tavily** - AI-powered search
- **Playwright** - Browser automation and testing

## Usage

After installation, the settings are automatically applied to your Claude Code configuration.`,
};
