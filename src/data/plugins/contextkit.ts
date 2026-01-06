import { Plugin } from "@/lib/types";

export const contextkitPlugin: Plugin = {
  slug: "contextkit",
  title: "ContextKit",
  description: "Systematic development framework transforming Claude Code into a proactive development partner with structured context management",
  tags: ["context", "framework", "development", "productivity"],
  featured: false,
  author: {
    name: "FlineDev",
    url: "https://github.com/FlineDev/ContextKit",
  },
  repoUrl: "https://github.com/FlineDev/ContextKit",
  installCommand: "git clone https://github.com/FlineDev/ContextKit.git && cd ContextKit && ./install.sh",
  config: `# ContextKit

A systematic development framework for Claude Code.

## Overview

ContextKit transforms Claude Code into a proactive development partner by:
- Managing project context automatically
- Providing structured development workflows
- Maintaining consistent coding patterns

## Features

- **Auto Context** - Automatically gathers relevant context
- **Project Memory** - Remembers project-specific patterns
- **Smart Suggestions** - Proactive development assistance

## Installation

1. Clone the repository
2. Run the install script
3. Initialize in your project with \`/contextkit init\``,
};
