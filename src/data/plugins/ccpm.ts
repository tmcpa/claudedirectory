import { Plugin } from "@/lib/types";

export const ccpmPlugin: Plugin = {
  slug: "ccpm",
  title: "Claude Code PM",
  description: "Comprehensive project management workflow with specialized agents and commands for planning, tracking, and delivering software projects",
  tags: ["project-management", "workflow", "agents", "planning"],
  featured: true,
  author: {
    name: "automazeio",
    url: "https://github.com/automazeio/ccpm",
  },
  repoUrl: "https://github.com/automazeio/ccpm",
  installCommand: "git clone https://github.com/automazeio/ccpm.git && cd ccpm && ./install.sh",
  config: `# Claude Code PM (CCPM)

A comprehensive project management workflow for Claude Code.

## Features

- **Specialized Agents** - Dedicated agents for different PM tasks
- **Task Tracking** - Built-in task management
- **Sprint Planning** - Agile workflow support
- **Progress Reports** - Automated status updates

## Workflow

1. Initialize project with \`/pm init\`
2. Create tasks with \`/pm task\`
3. Track progress with \`/pm status\`
4. Generate reports with \`/pm report\`

## Agents

- Planning Agent - Sprint and release planning
- Review Agent - Code and design review
- Documentation Agent - Auto-generate docs`,
};
