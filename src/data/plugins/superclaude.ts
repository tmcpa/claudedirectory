import { Plugin } from "@/lib/types";

export const superclaudePlugin: Plugin = {
  slug: "superclaude",
  title: "SuperClaude Framework",
  description: "Versatile configuration framework enhancing Claude Code with commands, cognitive personas, and advanced development workflows. Includes 4 specialized personas and extensible command system.",
  tags: ["framework", "personas", "commands", "workflow", "community"],
  featured: false,
  author: {
    name: "SuperClaude-Org",
    url: "https://github.com/SuperClaude-Org/SuperClaude_Framework",
  },
  repoUrl: "https://github.com/SuperClaude-Org/SuperClaude_Framework",
  installCommand: "git clone https://github.com/SuperClaude-Org/SuperClaude_Framework.git && cd SuperClaude_Framework && ./setup.sh",
  config: `# SuperClaude Framework Configuration

SuperClaude enhances Claude Code with:
- Custom commands for common workflows
- Cognitive personas for different tasks
- Advanced development patterns

## Installation

1. Clone the repository
2. Run the setup script
3. Restart Claude Code

## Personas

SuperClaude includes personas for:
- Code Architect - System design focus
- Test Engineer - Testing and QA focus
- DevOps - Infrastructure and deployment
- Security - Security review and hardening`,
  commands: [
    { name: "/persona", description: "Switch between cognitive personas (architect, tester, devops, security)" },
    { name: "/architect", description: "Activate Code Architect persona for system design" },
    { name: "/tester", description: "Activate Test Engineer persona for QA focus" },
    { name: "/devops", description: "Activate DevOps persona for infrastructure" },
  ],
};
