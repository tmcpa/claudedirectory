import { BlogPost } from "@/lib/types";

export const clawdbotOpenclawGuide: BlogPost = {
  slug: "clawdbot-openclaw-guide",
  title: "What Is Clawdbot (OpenClaw)? The AI Personal Assistant That Took Over GitHub",
  description:
    "A deep dive into OpenClaw (formerly Clawdbot), the open-source AI personal assistant with 147K+ GitHub stars — what it does, how it works, and how it compares to Claude Code.",
  publishedDate: "2026-02-09",
  tags: [
    "openclaw",
    "clawdbot",
    "ai-assistant",
    "personal-agent",
    "open-source",
    "claude",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "agent",
      slug: "openclaw",
      relationship: "works-with",
    },
  ],
  repoUrl: "https://github.com/openclaw/openclaw",
  content: `# What Is Clawdbot (OpenClaw)? The AI Personal Assistant That Took Over GitHub

If you've been anywhere near the AI development community in early 2026, you've probably heard of **Clawdbot** — now officially called **OpenClaw**. With over 147,000 GitHub stars and 2 million visitors in a single week, it's become one of the fastest-growing open-source projects in history. But what exactly is it, and how does it relate to Claude Code?

## The Story Behind OpenClaw

OpenClaw was created by **Peter Steinberger**, the Austrian developer best known as the founder of PSPDFKit. He launched it in November 2025 under the name **Clawdbot** — a playful nod to the Claude AI models it was originally built around.

### The Name That Broke the Internet

The project's naming history is almost as dramatic as its feature set:

1. **Clawdbot** (November 2025) — The original name
2. **Moltbot** (January 27, 2026) — Renamed after Anthropic sent a trademark notice, arguing "Clawdbot" was too close to "Claude"
3. **OpenClaw** (January 30, 2026) — The final name after a chaotic 72 hours

During the GitHub repository rename from Clawdbot to Moltbot, Steinberger left a roughly 10-second gap between releasing the old repository name and securing the new one. Crypto scammers instantly seized the abandoned GitHub namespace and launched a fraudulent token called $CLAWD on the Solana blockchain. The token's market cap briefly surged to $16 million before a classic rugpull crash.

The incident became a cautionary tale about namespace squatting and the speed of crypto scammers — and ironically drove even more attention to the legitimate project.

## What Does OpenClaw Actually Do?

While Claude Code lives in your terminal as a coding assistant, **OpenClaw is a personal AI assistant that lives in your messaging apps**. Think of it as giving Claude (or any LLM) hands, eyes, memory, and the ability to reach you wherever you are.

### Key Capabilities

- **Persistent Memory** — Conversations carry context across sessions. OpenClaw remembers your preferences, ongoing projects, and past interactions using local Markdown files
- **13+ Messaging Platforms** — WhatsApp, Telegram, Discord, Slack, Signal, iMessage, Microsoft Teams, Matrix, Google Chat, Twitch, and more
- **Browser Automation** — Can fill out web forms, research products, and navigate websites autonomously
- **File and Email Management** — Read, organize, and respond to emails; manage local files
- **Terminal Access** — Execute shell commands on your machine
- **Smart Home Control** — Interact with IoT devices and home automation systems
- **Proactive Notifications** — Schedule reminders, monitor events, and alert you without being asked
- **Voice Integration** — ElevenLabs integration for voice interactions

### The Lobster Workflow Engine

One of OpenClaw's standout features is **Lobster**, its native workflow orchestration system. Lobster is a typed, local-first macro engine that enables multi-step automation pipelines in single LLM calls. Key features include:

- Deterministic execution that reduces token consumption
- Structured data flow using JSON/YAML objects instead of text parsing
- Approval gates for side effects (sending emails, making purchases, posting content)
- Resume tokens for pausing and continuing workflows
- Fully local execution — no cloud dependency

### Model Agnostic

Despite its origins with Claude, OpenClaw now supports multiple LLM providers:

- **Anthropic Claude** (all versions — Opus 4.5 recommended for security)
- **OpenAI GPT** models
- **KIMI K2.5**
- **Local models** via Ollama (zero API cost)

## Claude Code vs. OpenClaw: Complementary, Not Competing

One of the biggest misconceptions is that you need to choose between Claude Code and OpenClaw. They serve fundamentally different purposes:

| Feature | Claude Code | OpenClaw |
|---|---|---|
| **Lives in** | Your terminal | Your messaging apps |
| **Purpose** | Agentic coding assistant | Personal AI assistant |
| **Strengths** | Code understanding, file editing, test running, git workflows | Cross-platform messaging, automation, persistent memory |
| **Session model** | Per-project, terminal-based | Always-on daemon with long-term memory |
| **Best for** | Development tasks | Life and work automation |

**Claude Code** reads your codebase, writes code, runs tests, and handles git workflows directly in your development environment.

**OpenClaw** manages workflows spanning multiple sessions — monitoring your inbox, following up on emails, coordinating across messaging platforms, automating purchases, and handling tasks that require persistence beyond a single terminal session.

Many developers use both: Claude Code for coding, OpenClaw for everything else.

## Getting Started

OpenClaw requires Node.js v22+ and runs on macOS/Linux (Windows needs WSL2):

\`\`\`bash
npm install -g openclaw@latest
openclaw onboard --install-daemon
\`\`\`

The setup wizard walks you through configuring your gateway, authentication, and messaging channels.

## Cost Considerations

The software itself is free and open-source (MIT license). Your main costs come from LLM API usage:

- **Light use** (10-20 messages/day): ~$5-15/month with Claude Sonnet
- **Heavy automation**: $50-200+/month depending on model and usage
- **Local models** via Ollama: Electricity only

**Tip:** Use prompt caching (60-95% savings), the \`/compact\` command, and model cascading (Opus for complex tasks, Haiku for quick queries) to manage costs.

## Security: Proceed With Caution

OpenClaw requires root-level system access and runs as a daemon. The project documentation itself states it's "not meant for non-technical users." Key security considerations:

- Over 21,000 unsecured instances have been found exposing API keys and chat histories
- Prompt injection attacks are possible via malicious web content or emails
- The official documentation admits "there is no completely secure configuration"

If you deploy OpenClaw, follow the hardening guide: enable DM pairing, run non-owner sessions in Docker sandboxes, set API spending limits, and never expose the gateway beyond localhost without a VPN or SSH tunnel.

## Community and Ecosystem

OpenClaw's growth stats speak for themselves:

- **147,000+** GitHub stars
- **20,000+** forks
- **130+** contributors
- **~60,000** Discord members
- **ClawdHub**: 100+ community-built skills and integrations

The project has been covered by TechCrunch, Fortune, and numerous tech publications. It's spawned Moltbook, an AI agent-exclusive social network where agents communicate independently.

## The Bottom Line

OpenClaw represents the 2026 shift from "AI writes code" to "AI runs work." While Claude Code is your coding partner in the terminal, OpenClaw extends AI assistance into every corner of your digital life. Together, they represent the emerging stack of AI-native development — one for building software, one for automating everything else.

Whether you're already using Claude Code and want to extend AI into your daily workflows, or you're exploring the personal AI assistant space, OpenClaw is worth understanding. Just make sure you read the security documentation before deploying it.
`,
};
