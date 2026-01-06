import { Plugin } from "@/lib/types";

export const claudekitPlugin: Plugin = {
  slug: "claudekit",
  title: "ClaudeKit",
  description: "CLI toolkit with auto-save checkpointing, code quality hooks, and 20+ specialized subagents for enhanced development workflows",
  tags: ["toolkit", "checkpointing", "subagents", "productivity"],
  featured: true,
  author: {
    name: "carlrannaberg",
    url: "https://github.com/carlrannaberg/claudekit",
  },
  repoUrl: "https://github.com/carlrannaberg/claudekit",
  installCommand: "git clone https://github.com/carlrannaberg/claudekit.git && cd claudekit && ./install.sh",
  config: `# ClaudeKit Configuration

ClaudeKit provides:
- Auto-save checkpointing for session recovery
- Code quality hooks for consistent output
- 20+ specialized subagents for different tasks

## Setup

After installation, ClaudeKit integrates with your Claude Code configuration automatically.

## Features

- **Checkpointing**: Automatically saves session state
- **Quality Hooks**: Enforces code standards
- **Subagents**: Specialized agents for testing, docs, refactoring, and more`,
};
