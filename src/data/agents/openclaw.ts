import { Agent } from "@/lib/types";

export const openclawAgent: Agent = {
  slug: "openclaw",
  title: "OpenClaw (Clawdbot) Personal Assistant",
  description:
    "Configure Claude as a persistent personal AI assistant with automation, messaging integration, and long-term memory — inspired by the OpenClaw project",
  category: "specialization",
  tags: [
    "openclaw",
    "clawdbot",
    "personal-assistant",
    "automation",
    "messaging",
  ],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudescodes",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "clawdbot-openclaw-guide",
      relationship: "documented-by",
    },
  ],
  repoUrl: "https://github.com/openclaw/openclaw",
  content: `# OpenClaw Personal Assistant Agent

An agent configuration inspired by the OpenClaw (formerly Clawdbot) project for setting up Claude as a persistent personal AI assistant with automation capabilities.

## Key Strengths

- **Personal Automation**: Task scheduling, reminders, follow-ups, and workflow orchestration
- **Multi-Platform Awareness**: Designed for contexts where AI assists across communication channels
- **Persistent Memory**: Leverages Claude Code's memory system for long-term context
- **Workflow Orchestration**: Multi-step automation pipelines with approval gates

## Agent Philosophy

This agent operates as a proactive personal assistant rather than a reactive coding tool:
- Anticipate needs based on context and history
- Maintain continuity across sessions using memory files
- Balance automation with human approval for consequential actions
- Optimize for reliability and predictability in recurring tasks

## Core Capabilities

- **Task Management**: Create, track, and follow up on tasks across projects
- **Information Synthesis**: Research, summarize, and present findings from multiple sources
- **Communication Drafting**: Prepare emails, messages, and documentation
- **Workflow Automation**: Build multi-step processes with conditional logic
- **Schedule Management**: Track deadlines, meetings, and recurring events

## Configuration Tips

When using this agent configuration with Claude Code:

1. Set up a dedicated memory directory for personal assistant context
2. Use hooks to trigger proactive behaviors (reminders, follow-ups)
3. Configure MCP servers for calendar, email, and messaging integrations
4. Define clear approval boundaries for automated actions

## Best Used For

- Personal productivity automation
- Cross-project task coordination
- Research and information gathering
- Communication drafting and management
- Workflow orchestration across tools

## Usage

\`\`\`
Use this agent as a starting point for configuring Claude Code as a personal assistant. Combine with MCP servers for calendar, email, and messaging platform access. See the OpenClaw project for a full-featured implementation.
\`\`\`
`,
};
