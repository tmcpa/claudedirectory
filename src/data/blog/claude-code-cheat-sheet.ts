import { BlogPost } from "@/lib/types";

export const claudeCodeCheatSheet: BlogPost = {
  slug: "claude-code-cheat-sheet",
  title:
    "Claude Code Cheat Sheet: Every Command, Shortcut, and Slash Command (2026)",
  description:
    "The complete Claude Code cheat sheet for 2026. Every slash command, keyboard shortcut, CLI flag, hook event, and MCP setup step in one page — copy-paste ready, updated for Opus 4.7 and the 1M token context window.",
  publishedDate: "2026-04-22",
  tags: [
    "claude-code",
    "cheat-sheet",
    "commands",
    "keyboard-shortcuts",
    "slash-commands",
    "cli",
    "tutorial",
    "beginner-guide",
    "claude-opus-4-7",
    "seo",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "claude-opus-4-7-deep-reasoning",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-md-guide",
      relationship: "recommends",
    },
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
    {
      type: "blog",
      slug: "best-claude-code-plugins",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-workflows-10x-productivity",
      relationship: "recommends",
    },
  ],
  content: `# Claude Code Cheat Sheet: Every Command, Shortcut, and Slash Command (2026)

This is the complete Claude Code reference. Every slash command, every keyboard shortcut, every CLI flag, every hook event, every settings key — on one page, copy-paste ready, current for Opus 4.7 and the 1M token context window.

Bookmark it. Search it with Ctrl/Cmd+F. Use it as the single page you open when you forget how to do the thing.

---

## Quick Start: Install Claude Code in 30 Seconds

\`\`\`bash
# macOS / Linux / WSL
curl -fsSL https://claude.ai/install.sh | sh

# Or via npm (any OS)
npm install -g @anthropic-ai/claude-code

# Verify
claude --version

# Start a session in your repo
cd your-project
claude
\`\`\`

First run will prompt you to log in with your Claude account. No API key required if you're on Pro, Max, Team, or Enterprise.

---

## The CLI: Every Flag Worth Knowing

\`\`\`bash
claude                    # Start interactive session in current dir
claude "fix the login bug" # One-shot: run a task and exit
claude -c                 # Continue the last session
claude -r <session-id>    # Resume a specific session
claude --model opus       # Pick a model (opus | sonnet | haiku)
claude --print "<task>"   # Non-interactive, prints result to stdout
claude --verbose          # Show tool calls as they happen
claude --no-confirm       # Skip permission prompts (dangerous, use in CI)
claude --permission-mode plan  # Read-only planning mode
claude --add-dir ../sibling    # Allow access to sibling directory
claude --allowed-tools Bash,Read,Edit  # Restrict the tool set
\`\`\`

**Piping works both ways:**

\`\`\`bash
cat error.log | claude "what's wrong here?"
claude --print "generate a PR description" | gh pr create --body-file -
\`\`\`

---

## Slash Commands: The Complete List

Slash commands run inside an interactive Claude Code session. Type \`/\` to see the full list.

### Session Management
| Command | Description |
|---------|-------------|
| \`/help\` | Show available commands |
| \`/clear\` | Clear the screen and conversation |
| \`/compact\` | Compress the conversation to save tokens |
| \`/exit\` or \`/quit\` | End the session |
| \`/resume\` | Resume a previous session |
| \`/cost\` | Show token usage and cost for this session |
| \`/logout\` | Sign out |
| \`/login\` | Sign back in |

### Configuration
| Command | Description |
|---------|-------------|
| \`/config\` | Open the settings UI |
| \`/model\` | Switch the active model (Opus, Sonnet, Haiku) |
| \`/permissions\` | Manage which tools Claude can run without asking |
| \`/mcp\` | List, add, or remove MCP servers |
| \`/hooks\` | Inspect and manage hook configuration |
| \`/theme\` | Switch color theme |
| \`/fast\` | Toggle Fast mode (Opus 4.6 with faster output) |
| \`/status\` | Show account, model, and environment info |

### Memory & Context
| Command | Description |
|---------|-------------|
| \`/init\` | Generate a \`CLAUDE.md\` for this repo |
| \`/memory\` | Edit your global and project memory files |
| \`#<text>\` | Add a fact to memory on the fly |
| \`/add-dir <path>\` | Grant access to an additional directory |

### Work & Workflows
| Command | Description |
|---------|-------------|
| \`/review\` | Run a code review on the current branch |
| \`/security-review\` | Run a security audit on pending changes |
| \`/pr\` | Generate a pull request from current work |
| \`/commit\` | Stage and commit with an auto-generated message |
| \`/todos\` | Show the current todo list the agent is tracking |
| \`/bug\` | File a bug report to Anthropic with session context |

Plugins and skills add more slash commands — see \`/mcp\` and \`/plugins\` to see what your install exposes.

---

## Keyboard Shortcuts (Terminal)

| Shortcut | Action |
|----------|--------|
| \`Enter\` | Submit the current prompt |
| \`Shift+Enter\` | Insert a newline in the prompt |
| \`Ctrl+C\` | Interrupt Claude (stop the current turn) |
| \`Ctrl+C\` (twice) | Exit Claude Code |
| \`Ctrl+D\` | Exit when prompt is empty |
| \`Ctrl+L\` | Clear screen (keep history) |
| \`Ctrl+R\` | Reverse-search previous prompts |
| \`Up / Down\` | Cycle through prompt history |
| \`Tab\` | Autocomplete slash commands, file paths, @-mentions |
| \`Esc\` | Cancel current input / close modal |
| \`Esc Esc\` | Open prompt history picker |
| \`@\` | Mention a file (autocompletes paths) |
| \`!\` | Run a one-off bash command inline |
| \`?\` | Toggle help overlay |

**In IDE extensions (VS Code / JetBrains):** the default submit binding is \`Cmd+Enter\` (macOS) / \`Ctrl+Enter\` (Windows/Linux). Remap via \`~/.claude/keybindings.json\`.

---

## @-Mentions: Pulling Things Into Context

\`\`\`
@README.md              # Include a file
@src/components/        # Include an entire directory
@https://example.com    # Fetch a URL (read-only)
\`\`\`

Use @-mentions instead of pasting. Claude handles tokenization better when files are loaded through the tool, and paths show up in the audit log.

---

## \`CLAUDE.md\`: The File That Controls Everything

\`\`\`markdown
# Project rules

## Stack
- Next.js 16, React 19, Tailwind 4
- Postgres via Prisma
- Deploys on Vercel

## Conventions
- Server components by default; client only when needed
- No inline styles; use Tailwind utility classes
- Tests live next to the file: \`foo.ts\` + \`foo.test.ts\`

## Commands
- \`npm run dev\` — local dev server
- \`npm run test\` — run tests
- \`npm run build\` — production build (must pass before merging)

## Don't
- Don't add new dependencies without asking
- Don't touch \`src/legacy/\` — it's frozen
\`\`\`

**Locations Claude reads in priority order:**

1. \`./CLAUDE.md\` (repo root)
2. \`./.claude/CLAUDE.md\`
3. Parent directories (walks up until git root)
4. \`~/.claude/CLAUDE.md\` (global defaults)

Shorter is better. A 30-line \`CLAUDE.md\` beats a 300-line one that nobody reads.

---

## MCP Servers: Every Command

\`\`\`bash
# Install an MCP server
claude mcp add <name> <command> [args...]

# Install from a JSON config
claude mcp add-json <name> '{"command": "npx", "args": ["-y", "@server/pkg"]}'

# List installed servers
claude mcp list

# Remove a server
claude mcp remove <name>

# Test a server without installing
claude mcp run <name>
\`\`\`

**Popular MCP servers to install today:**

- \`filesystem\` — read/write files outside the project root
- \`github\` — issues, PRs, reviews, CI
- \`postgres\` — query your database directly
- \`playwright\` — browser automation and screenshots
- \`context7\` — always-current docs for your libraries
- \`sequential-thinking\` — structured multi-step reasoning

Full list: [MCP Servers Directory](/mcp-servers).

---

## Hooks: The Event Table

Hooks are shell commands Claude Code runs automatically on lifecycle events. Configured in \`.claude/settings.json\`.

| Event | Fires When | Typical Use |
|-------|-----------|-------------|
| \`PreToolUse\` | Before a tool runs | Block risky commands, require approval |
| \`PostToolUse\` | After a tool runs | Lint, format, run tests, log output |
| \`Notification\` | When Claude surfaces a notification | Push to Slack, play a sound |
| \`Stop\` | When a turn ends | Auto-commit, run CI check, summarize |
| \`SessionStart\` | When a session begins | Seed context, warm up test runners |

**Example: format on save**

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "npx prettier --write $CLAUDE_FILE_PATH" }
        ]
      }
    ]
  }
}
\`\`\`

Environment variables hooks receive: \`CLAUDE_FILE_PATH\`, \`CLAUDE_TOOL_NAME\`, \`CLAUDE_TOOL_INPUT\`, \`CLAUDE_SESSION_ID\`, \`CLAUDE_PROJECT_DIR\`.

More patterns: [Claude Code Hooks Guide](/blog/claude-code-hooks-guide).

---

## Settings: \`~/.claude/settings.json\`

\`\`\`json
{
  "model": "claude-opus-4-7",
  "env": {
    "CLAUDE_CODE_MAX_OUTPUT_TOKENS": "32000",
    "DISABLE_TELEMETRY": "0"
  },
  "permissions": {
    "allow": ["Bash(git status:*)", "Bash(npm test:*)", "Read", "Edit"],
    "deny": ["Bash(rm -rf *:*)"]
  },
  "hooks": { /* ... */ },
  "mcpServers": { /* ... */ }
}
\`\`\`

**Project-specific overrides** live in \`.claude/settings.json\`. Project settings merge with user settings; project keys win on conflict.

**Common env vars:**

| Variable | Purpose |
|----------|---------|
| \`ANTHROPIC_API_KEY\` | Use an API key instead of subscription auth |
| \`ANTHROPIC_BASE_URL\` | Point at a proxy or self-hosted gateway |
| \`CLAUDE_CODE_MAX_OUTPUT_TOKENS\` | Raise the per-turn output cap |
| \`DISABLE_AUTOUPDATER\` | Pin the CLI version |
| \`DISABLE_TELEMETRY\` | Turn off usage telemetry |

---

## Permission Modes

| Mode | Behavior |
|------|----------|
| \`default\` | Ask before running risky tools |
| \`acceptEdits\` | Auto-approve file edits; ask for shell commands |
| \`plan\` | Read-only — Claude can look but not change anything |
| \`bypassPermissions\` | Skip all prompts (use only in sandboxed CI) |

Switch mid-session with \`/permissions\` or start with \`--permission-mode <mode>\`.

---

## Models: Which to Pick

As of April 2026:

| Model | ID | When to Use |
|-------|-----|-------------|
| **Opus 4.7** | \`claude-opus-4-7\` | Hard reasoning, long context, agentic workflows |
| **Opus 4.6** | \`claude-opus-4-6\` | Fast mode — interactive coding, faster token output |
| **Sonnet 4.6** | \`claude-sonnet-4-6\` | Cheaper everyday coding, mid-complexity tasks |
| **Haiku 4.5** | \`claude-haiku-4-5-20251001\` | Fast, cheap — lint-loop, classification, quick rewrites |

Opus 4.7 now ships with a 1M token context window. See [Claude Opus 4.7: What's Actually New](/blog/claude-opus-4-7-deep-reasoning) for the details that actually matter day-to-day.

Switch at any time with \`/model\` or \`--model\`.

---

## The 10 Commands You'll Actually Use Every Day

1. \`claude\` — start a session
2. \`claude -c\` — pick up where you left off
3. \`/init\` — scaffold a \`CLAUDE.md\` in a new repo
4. \`/compact\` — free up context mid-session
5. \`/review\` — code review on the current branch
6. \`/commit\` — commit with a good message you didn't have to write
7. \`@path/to/file\` — pull a file into context
8. \`#\` — jot a fact into memory
9. \`Ctrl+C\` — stop Claude, don't wait out a bad turn
10. \`Esc Esc\` — prompt history picker

---

## Troubleshooting Quick Reference

| Symptom | Fix |
|---------|-----|
| "Permission denied" on every tool | Check \`/permissions\` or run \`/permissions reset\` |
| Context runs out fast | \`/compact\` or upgrade to Opus 4.7 for 1M window |
| MCP server not showing up | \`claude mcp list\` then restart the session |
| Hook not firing | Check \`matcher\` regex; run \`/hooks\` to see resolved config |
| "Command not found: claude" | Add npm global bin to \`PATH\` or reinstall via install.sh |
| Slow responses | Try \`/fast\` (Opus 4.6) or switch to Sonnet for routine work |
| Credits exhausted | \`/cost\` to see usage; upgrade plan or switch model |

---

## Copy-Paste Starter Configs

**\`.claude/settings.json\` for a Next.js project:**

\`\`\`json
{
  "permissions": {
    "allow": [
      "Read", "Edit", "Write",
      "Bash(npm run *:*)",
      "Bash(git status:*)",
      "Bash(git diff:*)",
      "Bash(git log:*)"
    ]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "npx prettier --write $CLAUDE_FILE_PATH || true" }
        ]
      }
    ]
  }
}
\`\`\`

**Minimal \`CLAUDE.md\` that actually helps:**

\`\`\`markdown
# Project

Short description of what this codebase does.

## Stack
- <language/framework versions>

## Commands
- \`<start dev>\`
- \`<run tests>\`
- \`<build>\`

## Conventions
- <one or two non-obvious things>

## Don't
- <anything that looks inviting but is a trap>
\`\`\`

---

## Where to Go Next

- [Claude Directory home](/) — browse 100+ community-curated configs
- [Prompts](/prompts) — copy-paste \`CLAUDE.md\` templates by stack
- [MCP Servers](/mcp-servers) — extend Claude Code's capabilities
- [Hooks](/hooks) — automate on tool events
- [Skills](/skills) — custom slash commands
- [Plugins](/plugins) — official and community plugins
- [Agents](/agents) — specialized subagents

### Related reading

- [Claude Opus 4.7: What's Actually New](/blog/claude-opus-4-7-deep-reasoning)
- [The Complete CLAUDE.md Guide](/blog/claude-md-guide)
- [Claude Code Hooks: Every Event Explained](/blog/claude-code-hooks-guide)
- [MCP Servers Guide](/blog/mcp-servers-guide)
- [10x Productivity Workflows with Claude Code](/blog/claude-code-workflows-10x-productivity)
- [Best Claude Code Plugins](/blog/best-claude-code-plugins)

---

*Last updated: April 22, 2026. Claude Code ships weekly — if you find something out of date, open an issue on the [GitHub repo](https://github.com/tmcpa/claudedirectory).*
`,
};
