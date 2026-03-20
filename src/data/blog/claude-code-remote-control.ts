import { BlogPost } from "@/lib/types";

export const claudeCodeRemoteControl: BlogPost = {
  slug: "claude-code-remote-control",
  title:
    "Claude Code Remote Control: Run Local Sessions From Any Device in 2026",
  description:
    "Learn how to use Claude Code Remote Control to access your local terminal sessions from your phone, tablet, or any browser. This guide covers setup, security architecture, CLI flags, MCP integration, and real-world workflows.",
  publishedDate: "2026-03-19",
  tags: [
    "claude-code",
    "remote-control",
    "developer-tools",
    "tutorial",
    "productivity",
    "mobile",
    "MCP",
    "best-practices",
    "beginner-friendly",
    "workflows",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "claude-code-workflows-10x-productivity",
      relationship: "recommends",
    },
    { type: "blog", slug: "claude-md-guide", relationship: "recommends" },
    {
      type: "blog",
      slug: "claude-code-hooks-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "mcp-servers-guide",
      relationship: "recommends",
    },
  ],
  content: `# Claude Code Remote Control: Run Local Sessions From Any Device

What if you could start a Claude Code session on your desktop, walk away, and pick it right back up from your phone? No VPN, no SSH tunnel, no exposed ports, and your code never leaves your machine.

That's exactly what **Remote Control** does. Announced in February 2026, it's one of the most significant additions to Claude Code yet -- turning your local terminal into a remotely accessible development environment that works from any device with a browser.

This guide covers everything: what Remote Control is, how its security model works, all three ways to start a session, MCP integration, and practical workflows you can set up today.

---

## What Is Claude Code Remote Control?

Remote Control lets you access a Claude Code terminal session running on your local machine from any remote device -- your phone, tablet, a different computer, or any browser. The critical distinction: **execution always stays local**. Your remote device is just a window into the session running on your machine.

Everything you'd have in a normal Claude Code session remains available:

- Full local filesystem access
- All connected MCP servers
- Project configuration (CLAUDE.md, hooks, skills, plugins)
- Your entire tool environment

Think of it like screen-sharing for your terminal, except the interface is Claude's native chat UI and it works over a secure, pull-based connection through Anthropic's API.

---

## How It Works: The Security Architecture

The first question everyone asks is: "Doesn't this expose my machine to the internet?" No -- and here's why.

Remote Control uses **outbound-only HTTPS polling**, not inbound connections:

1. Your local Claude Code process initiates outbound HTTPS connections to Anthropic's API
2. The process continuously polls the API for instructions from your remote device
3. **No inbound ports are opened** on your machine
4. All traffic travels over TLS (Transport Layer Security)
5. Credentials are short-lived, single-purpose, and expire independently

This is fundamentally different from traditional remote access tools like VNC or SSH. It's **pull-based**, not push-based, which eliminates the attack surface of exposed ports entirely.

### What about permissions?

Remote Control does **not** support \`--dangerously-skip-permissions\`. Every action that requires approval in a normal session still requires approval when accessed remotely. You'll get the same permission prompts on your phone that you'd see in your terminal.

---

## Three Ways to Start a Remote Control Session

### Option 1: Dedicated Server Mode

The most powerful option. Starts a dedicated Remote Control server that can handle multiple concurrent sessions:

\`\`\`bash
claude remote-control
\`\`\`

This mode is ideal when you want your machine to serve as a persistent development server. Available flags:

| Flag | Purpose |
|------|---------|
| \`--name "My Project"\` | Custom session title visible in your session list |
| \`--spawn <mode>\` | How concurrent sessions are created: \`same-dir\` (default) or \`worktree\` (separate git worktree per session) |
| \`--capacity <N>\` | Maximum concurrent sessions (default: 32) |
| \`--verbose\` | Show detailed connection and session logs |
| \`--sandbox\` / \`--no-sandbox\` | Enable or disable filesystem sandboxing |

Example with all flags:

\`\`\`bash
claude remote-control --name "Backend API" --spawn worktree --capacity 8 --verbose
\`\`\`

This starts a server named "Backend API" that creates isolated git worktrees for each new session, allows up to 8 concurrent sessions, and logs everything.

### Option 2: Interactive Session with Remote Access

Already working in a Claude Code session and want to make it remotely accessible? Add the \`--remote-control\` flag:

\`\`\`bash
claude --remote-control
# or with a custom name:
claude --remote-control "Debugging auth flow"
\`\`\`

This gives you a full interactive terminal session that's also accessible from your remote devices. You get the best of both worlds -- local terminal control plus remote access.

### Option 3: Enable Mid-Conversation

Already deep into a conversation and realize you need to step away? Enable Remote Control without losing your context:

\`\`\`
/remote-control
# or with a custom name:
/remote-control "Session Name"
\`\`\`

Your entire conversation history is preserved, and the session immediately becomes accessible from your other devices.

---

## Connecting From Another Device

Once Remote Control is active, you have three ways to connect:

### 1. Direct URL
Open the session URL displayed in your terminal at **claude.ai/code**. All active Remote Control sessions appear in the session list with a green status indicator.

### 2. QR Code
In server mode, press **spacebar** to display a QR code. Scan it with the Claude app on your phone for instant access -- no typing URLs on a tiny screen.

### 3. Session Browser
Browse all your sessions at **claude.ai/code** or in the Claude mobile app. Remote Control sessions show a green dot indicating they're online and ready.

---

## MCP Integration: Your Tools Travel With You

One of the biggest advantages of Remote Control over cloud-based alternatives is that **all your MCP servers stay available**. Since execution remains local, every MCP connection you've configured continues to work.

This means you can access from your phone:

- **Database servers** (Postgres, MongoDB, Redis) running on localhost
- **Git operations** through the Git MCP server
- **File system browsing** through the Filesystem MCP server
- **Docker management** through the Docker MCP server
- **Cloud provider tools** (AWS, Vercel, Cloudflare) configured locally

### How MCP Flows Through Remote Control

When you issue a command from your remote device, the flow is:

1. Remote device sends message through Anthropic's API
2. Local Claude Code process receives the message
3. Claude decides to use an MCP tool (e.g., query a database)
4. MCP call executes **locally** against your running MCP server
5. Result flows back through the API to your remote device

The MCP transport layer supports three protocols:

| Transport | Use Case |
|-----------|----------|
| **STDIO** | Default for local servers. Server runs as child process, communicates via stdin/stdout using JSON-RPC 2.0 |
| **HTTP** | Recommended for remote/shared MCP servers. Bidirectional HTTP communication |
| **SSE** | Legacy. Being phased out in favor of HTTP streamable |

All MCP communication uses **JSON-RPC 2.0** regardless of transport, ensuring standardized request/response format and error handling.

---

## Real-World Workflows

### On-Call Debugging From Your Phone

You get paged at 2 AM. Instead of dragging your laptop out:

\`\`\`bash
# Already running on your work machine:
claude remote-control --name "Incident Response"
\`\`\`

Open the Claude app on your phone, connect to the session, and start investigating. You have full access to logs, databases, and your codebase -- all executing on your work machine where everything is already set up.

### Multi-Device Development

Start a feature at your desk, continue on the couch with your tablet:

\`\`\`bash
claude --remote-control "Feature: user dashboard"
\`\`\`

The session persists across device switches. If your laptop sleeps or the network drops briefly, the session **auto-reconnects** when connectivity returns (up to ~10 minutes of outage).

### Team Pair Programming

Share a live session with a teammate for real-time collaboration:

\`\`\`bash
claude remote-control --name "Pair: auth refactor" --spawn same-dir
\`\`\`

Your teammate connects to the same session through their browser. They see the full conversation history and can contribute prompts while execution stays on your machine.

### Concurrent Task Management

Run multiple independent tasks from your phone while away from your desk:

\`\`\`bash
claude remote-control --name "Multi-tasker" --spawn worktree --capacity 4
\`\`\`

The \`worktree\` spawn mode creates isolated git worktrees for each session, so parallel tasks don't interfere with each other. Kick off a refactor in one session, a bug fix in another, and a code review in a third -- all running locally, all controlled from your phone.

---

## Configuration & Prerequisites

### Requirements

- **Claude Code v2.1.51** or later
- **Pro, Max, Team, or Enterprise** plan
- **OAuth authentication** via claude.ai (API keys are not supported)
- **Workspace trust** established in your project directory

### Enabling Remote Control

**For a single session:** Use the CLI flags described above.

**For all sessions globally:**

\`\`\`bash
claude
# Then in the session:
/config
\`\`\`

Navigate to "Enable Remote Control for all sessions" and toggle it on. Every future session will automatically be remotely accessible.

### Important: OAuth Required

Remote Control requires OAuth authentication. If you're using an \`ANTHROPIC_API_KEY\` environment variable, Remote Control will fail. Make sure you're authenticated with:

\`\`\`bash
/login
\`\`\`

If you're on a Team or Enterprise plan, your admin must also enable Remote Control in the organization settings at **claude.ai/admin-settings/claude-code**.

---

## Remote Control vs. Claude Code on the Web

Anthropic now offers two ways to use Claude Code remotely. Here's how they compare:

| Aspect | Remote Control | Claude Code on the Web |
|--------|----------------|------------------------|
| **Execution** | Your local machine | Anthropic's cloud infrastructure |
| **Filesystem** | Full local access | Cloud-based filesystem |
| **MCP servers** | All local servers available | Limited cloud MCP access |
| **Setup** | Already on your machine | No local setup required |
| **Best for** | Continuing local work remotely | Starting new tasks without setup |
| **Uptime** | Machine must stay on | Always available |
| **Privacy** | Code stays on your machine | Code runs in Anthropic's cloud |

**Use Remote Control** when you have an existing local environment with MCP servers, databases, and project configuration you need access to. **Use Claude Code on the Web** when you want to start fresh without any local setup.

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| "Remote Control is not yet enabled" | Environment variables blocking eligibility | Unset \`CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC\` and \`DISABLE_TELEMETRY\`, then \`/logout\` and \`/login\` |
| "Remote Control is disabled by organization" | API key auth or admin restriction | Use \`/login\` for OAuth, or ask your admin to enable it at claude.ai/admin-settings/claude-code |
| "Remote credentials fetch failed" | Network or auth issue | Run with \`--verbose\`, ensure you're signed in, check that port 443 outbound is open |
| Session shows offline | Network outage exceeded ~10 minutes | Restart the session; long outages cause automatic termination |

---

## Limitations to Know

- **One remote session per interactive process.** Use server mode (\`claude remote-control\`) with \`--spawn\` for multiple concurrent sessions.
- **Terminal must stay open.** Closing your terminal ends the session. Consider running in \`tmux\` or \`screen\` for persistence.
- **~10-minute reconnection window.** If your machine loses connectivity for longer than ~10 minutes, the session terminates.
- **Permission prompts still require approval.** You can't bypass permissions remotely -- this is a deliberate security decision.
- **No \`--dangerously-skip-permissions\` support.** Every action must be explicitly approved.

### Pro Tip: Use tmux for Persistent Sessions

To keep Remote Control running even when you close your laptop lid:

\`\`\`bash
tmux new-session -s claude
claude remote-control --name "Always On"
# Detach with Ctrl+B then D
\`\`\`

Your session survives terminal closures, laptop sleep, and SSH disconnections.

---

## Getting Started Today

Remote Control is the fastest way to unlock mobile and multi-device development with Claude Code. Here's your quickstart:

1. **Update Claude Code** to v2.1.51 or later
2. **Authenticate with OAuth**: Run \`/login\` in a Claude Code session
3. **Start a session**: \`claude --remote-control "My first remote session"\`
4. **Connect from your phone**: Open claude.ai/code or the Claude app and look for the green dot
5. **Start coding**: Everything works exactly as it does locally

Combine Remote Control with [hooks](/blog/claude-code-hooks-guide) for automated quality checks, [MCP servers](/blog/mcp-servers-guide) for expanded tool access, and [CLAUDE.md](/blog/claude-md-guide) project instructions for a development environment that travels with you everywhere.

---

*Using Remote Control in a creative way? [Share your workflow with the Claude Directory community](https://github.com/tmcpa/claudedirectory) and help other developers work from anywhere.*
`,
};
