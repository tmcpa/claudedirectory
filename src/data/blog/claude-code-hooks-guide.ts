import { BlogPost } from "@/lib/types";

export const claudeCodeHooksGuide: BlogPost = {
  slug: "claude-code-hooks-guide",
  title:
    "Claude Code Hooks: The Complete Guide to Automating Your Dev Workflow in 2026",
  description:
    "Learn how to use Claude Code hooks to automate linting, testing, security scanning, and more. This step-by-step guide covers PreToolUse, PostToolUse, Notification, and Stop hooks with real examples you can copy today.",
  publishedDate: "2026-03-13",
  tags: [
    "claude-code",
    "hooks",
    "automation",
    "developer-tools",
    "tutorial",
    "PreToolUse",
    "PostToolUse",
    "productivity",
    "best-practices",
    "beginner-friendly",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    { type: "hook", slug: "lint-on-edit", relationship: "documented-by" },
    { type: "hook", slug: "format-on-save", relationship: "documented-by" },
    { type: "hook", slug: "security-scan", relationship: "documented-by" },
    { type: "hook", slug: "auto-test", relationship: "documented-by" },
    { type: "hook", slug: "tdd-guard", relationship: "documented-by" },
    { type: "hook", slug: "notify-on-complete", relationship: "documented-by" },
    { type: "hook", slug: "branch-protect", relationship: "documented-by" },
    { type: "hook", slug: "typescript-quality", relationship: "documented-by" },
    {
      type: "blog",
      slug: "claude-code-workflows-10x-productivity",
      relationship: "recommends",
    },
    { type: "blog", slug: "claude-md-guide", relationship: "recommends" },
  ],
  content: `# Claude Code Hooks: The Complete Guide to Automating Your Dev Workflow

What if Claude Code could automatically lint every file it edits, block writes that contain API keys, run your test suite after changes, and notify you when long tasks finish — without you lifting a finger?

That's exactly what **hooks** do. They're the most underused feature in Claude Code, and arguably the most powerful.

Hooks let you attach shell commands to specific events in Claude Code's lifecycle. Think of them like Git hooks, but for AI-assisted development. They run automatically, they're fully customizable, and they turn Claude Code from a reactive tool into a proactive engineering system.

This guide covers everything: what hooks are, how they work, all four hook types with real examples, and battle-tested configurations you can copy into your project today.

---

## What Are Claude Code Hooks?

Hooks are shell commands that execute automatically when Claude Code performs specific actions. They intercept Claude's tool calls — like writing files, running commands, or completing tasks — and let you inject your own logic before or after.

There are **four hook events**:

| Hook Event | When It Fires | Common Use Cases |
|---|---|---|
| \`PreToolUse\` | Before Claude executes a tool | Block dangerous operations, validate inputs, enforce policies |
| \`PostToolUse\` | After Claude executes a tool | Auto-lint, format, run tests, log changes |
| \`Notification\` | When Claude sends a notification | Desktop alerts, Slack messages, sound effects |
| \`Stop\` | When Claude finishes a task | Run final validations, generate summaries, trigger CI |

Each hook receives context about the event via environment variables and stdin, and can influence Claude's behavior based on its exit code.

---

## How Hooks Work: The Anatomy of a Hook

Hooks are configured in your \`.claude/settings.json\` (project-level) or \`~/.claude/settings.json\` (global). Here's the basic structure:

\`\`\`json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hook": {
          "type": "command",
          "command": "your-shell-command-here"
        }
      }
    ]
  }
}
\`\`\`

### Key concepts:

- **\`matcher\`** — A regex pattern that determines which tool calls trigger the hook. Use \`Write\`, \`Edit\`, \`Bash\`, \`Read\`, or combine them with \`|\` (pipe).
- **\`hook.type\`** — Always \`"command"\` (shell command execution).
- **\`hook.command\`** — The shell command to run. Has access to environment variables like \`$CLAUDE_FILE_PATH\` and receives tool input via stdin.

### Exit codes matter:

- **Exit 0** — Success. Claude continues normally.
- **Exit 1** (PreToolUse) — **Blocks the tool call.** Claude sees the hook's stderr output and adjusts.
- **Exit 1** (PostToolUse) — Reports the error to Claude as feedback.
- **Exit 2** — Silently continues (hook failure is ignored).

This exit code system is what makes hooks powerful. A \`PreToolUse\` hook can literally prevent Claude from executing an action if your validation fails.

---

## PreToolUse Hooks: Your First Line of Defense

PreToolUse hooks fire **before** Claude executes a tool. They're perfect for:

- Blocking writes to protected files
- Scanning for secrets or credentials
- Enforcing coding standards
- Preventing dangerous commands

### Example 1: Block Secrets from Being Written

This is the hook every project should have. It scans file content for hardcoded API keys, passwords, and tokens before they hit disk:

\`\`\`json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hook": {
          "type": "command",
          "command": "grep -nEi '(api[_-]?key|secret|password|token|credential)\\\\s*[:=]\\\\s*[\"\\'][^\"\\'{}\$]+[\"\\']' /dev/stdin | head -5 && echo 'BLOCKED: Potential secret detected' >&2 && exit 1 || exit 0"
        }
      }
    ]
  }
}
\`\`\`

When Claude tries to write a file containing something like \`API_KEY = "sk-abc123..."\`, the hook catches it, prints a warning, and returns exit code 1 — which blocks the write entirely. Claude sees the error and rewrites the code using environment variables instead.

> Browse our full [Security Scan hook](/hooks/security-scan) for a production-ready version with deeper scanning.

### Example 2: Protect Critical Files

Prevent Claude from modifying files that should only be changed through specific processes:

\`\`\`json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hook": {
          "type": "command",
          "command": "echo $CLAUDE_FILE_PATH | grep -qE '(package-lock\\\\.json|yarn\\\\.lock|\\\\.env|migrations/)' && echo 'BLOCKED: Protected file' >&2 && exit 1 || exit 0"
        }
      }
    ]
  }
}
\`\`\`

This blocks writes to lock files, \`.env\` files, and database migrations — files that should be modified through their proper tooling, not direct edits.

> See the [Branch Protect hook](/hooks/branch-protect) for protecting entire branches from unwanted changes.

### Example 3: Enforce Branch Naming Conventions

Block commits to the main branch directly:

\`\`\`json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hook": {
          "type": "command",
          "command": "if echo \\"$CLAUDE_TOOL_INPUT\\" | grep -q 'git commit'; then BRANCH=$(git rev-parse --abbrev-ref HEAD); if [ \\"$BRANCH\\" = 'main' ] || [ \\"$BRANCH\\" = 'master' ]; then echo 'BLOCKED: Cannot commit directly to main/master' >&2 && exit 1; fi; fi; exit 0"
        }
      }
    ]
  }
}
\`\`\`

---

## PostToolUse Hooks: Automatic Quality Enforcement

PostToolUse hooks fire **after** Claude completes a tool call. They're ideal for:

- Auto-formatting and linting
- Running tests after code changes
- Logging changes
- Triggering builds

### Example 4: Auto-Lint Every File Edit

The most popular hook in the Claude Directory. Automatically fix lint errors on every file Claude touches:

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hook": {
          "type": "command",
          "command": "npx eslint --fix \\"$CLAUDE_FILE_PATH\\" 2>/dev/null; exit 0"
        }
      }
    ]
  }
}
\`\`\`

Every file Claude writes or edits gets automatically linted and fixed. No more style violations piling up during a long coding session.

**For other languages:**

\`\`\`bash
# Python
black "$CLAUDE_FILE_PATH" 2>/dev/null; exit 0

# Rust
rustfmt "$CLAUDE_FILE_PATH" 2>/dev/null; exit 0

# Go
gofmt -w "$CLAUDE_FILE_PATH" 2>/dev/null; exit 0
\`\`\`

> Explore our [Lint on Edit](/hooks/lint-on-edit) and [Format on Save](/hooks/format-on-save) hooks for ready-to-use configurations.

### Example 5: Run Tests After Changes

Automatically run relevant tests when Claude modifies source files:

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hook": {
          "type": "command",
          "command": "if echo \\"$CLAUDE_FILE_PATH\\" | grep -qE '\\\\.(ts|tsx|js|jsx)$'; then npx jest --findRelatedTests \\"$CLAUDE_FILE_PATH\\" --passWithNoTests 2>&1 | tail -5; fi; exit 0"
        }
      }
    ]
  }
}
\`\`\`

This only runs tests for TypeScript/JavaScript files, uses Jest's \`--findRelatedTests\` flag to only run relevant tests, and shows the last 5 lines of output. Fast enough to run on every edit without slowing you down.

> Check out the [Auto Test hook](/hooks/auto-test) and [TDD Guard hook](/hooks/tdd-guard) for more sophisticated test automation.

### Example 6: TypeScript Type Checking

Run the TypeScript compiler after every change to catch type errors immediately:

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hook": {
          "type": "command",
          "command": "if echo \\"$CLAUDE_FILE_PATH\\" | grep -qE '\\\\.(ts|tsx)$'; then npx tsc --noEmit --pretty 2>&1 | head -20; fi; exit 0"
        }
      }
    ]
  }
}
\`\`\`

> Our [TypeScript Quality hook](/hooks/typescript-quality) combines type checking with stricter lint rules for comprehensive TypeScript validation.

---

## Notification Hooks: Stay in the Loop

Notification hooks fire when Claude sends any notification. They're great for long-running tasks where you've switched to another window.

### Example 7: Desktop Notification on macOS

Get a native macOS notification when Claude needs your attention:

\`\`\`json
{
  "hooks": {
    "Notification": [
      {
        "matcher": ".*",
        "hook": {
          "type": "command",
          "command": "osascript -e 'display notification \\"Claude Code needs your attention\\" with title \\"Claude Code\\" sound name \\"Glass\\"'"
        }
      }
    ]
  }
}
\`\`\`

### Example 8: Send a Slack Message

Notify your team channel when Claude finishes a major task:

\`\`\`json
{
  "hooks": {
    "Notification": [
      {
        "matcher": ".*",
        "hook": {
          "type": "command",
          "command": "curl -s -X POST -H 'Content-Type: application/json' -d '{\\"text\\":\\"Claude Code notification: task update\\"}' $SLACK_WEBHOOK_URL; exit 0"
        }
      }
    ]
  }
}
\`\`\`

> See the [Notify on Complete hook](/hooks/notify-on-complete) for a polished version with richer formatting.

---

## Stop Hooks: Final Validations

Stop hooks fire when Claude finishes its current task. Use them for final quality checks:

### Example 9: Run Full Test Suite on Completion

\`\`\`json
{
  "hooks": {
    "Stop": [
      {
        "matcher": ".*",
        "hook": {
          "type": "command",
          "command": "npm test 2>&1 | tail -20"
        }
      }
    ]
  }
}
\`\`\`

When Claude says "done," this runs your full test suite. If tests fail, Claude sees the output and can continue working to fix the issues.

### Example 10: Generate a Change Summary

\`\`\`json
{
  "hooks": {
    "Stop": [
      {
        "matcher": ".*",
        "hook": {
          "type": "command",
          "command": "echo '--- Files changed this session ---' && git diff --name-only && echo '---' && git diff --stat"
        }
      }
    ]
  }
}
\`\`\`

This gives you a quick summary of everything that changed during the Claude Code session, making it easy to review before committing.

---

## Combining Hooks: Building a Complete Pipeline

The real power comes from layering multiple hooks into a comprehensive quality pipeline. Here's a production-ready configuration that combines prevention, enforcement, and notification:

\`\`\`json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hook": {
          "type": "command",
          "command": "grep -nEi '(api[_-]?key|secret|password|token)\\\\s*[:=]\\\\s*[\"\\'][^\"\\'{}\$]+[\"\\']' /dev/stdin | head -5 && echo 'BLOCKED: Secret detected' >&2 && exit 1 || exit 0"
        }
      },
      {
        "matcher": "Write|Edit",
        "hook": {
          "type": "command",
          "command": "echo $CLAUDE_FILE_PATH | grep -qE '(\\\\.env|package-lock\\\\.json)' && echo 'BLOCKED: Protected file' >&2 && exit 1 || exit 0"
        }
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hook": {
          "type": "command",
          "command": "npx eslint --fix \\"$CLAUDE_FILE_PATH\\" 2>/dev/null; exit 0"
        }
      },
      {
        "matcher": "Write|Edit",
        "hook": {
          "type": "command",
          "command": "if echo \\"$CLAUDE_FILE_PATH\\" | grep -qE '\\\\.(ts|tsx|js|jsx)$'; then npx jest --findRelatedTests \\"$CLAUDE_FILE_PATH\\" --passWithNoTests 2>&1 | tail -5; fi; exit 0"
        }
      }
    ],
    "Notification": [
      {
        "matcher": ".*",
        "hook": {
          "type": "command",
          "command": "osascript -e 'display notification \\"Claude needs attention\\" with title \\"Claude Code\\"'"
        }
      }
    ],
    "Stop": [
      {
        "matcher": ".*",
        "hook": {
          "type": "command",
          "command": "npm test 2>&1 | tail -20"
        }
      }
    ]
  }
}
\`\`\`

With this config, every Claude Code session automatically:

1. **Prevents** secrets from being written and protects sensitive files
2. **Lints and formats** every file after it's edited
3. **Runs related tests** after each code change
4. **Notifies you** when Claude needs input
5. **Runs the full test suite** when the task completes

That's an entire CI/CD-lite pipeline running locally, on every single Claude Code interaction.

---

## Hook Best Practices

After working with hundreds of Claude Code configurations, here are the patterns that consistently work:

### Do:

- **Keep hooks fast.** Hooks run synchronously. A hook that takes 10 seconds will add 10 seconds to every tool call. Use \`--findRelatedTests\` instead of running the full suite on PostToolUse.
- **Use exit 0 as a fallback.** End commands with \`; exit 0\` for PostToolUse hooks so a hook failure doesn't block Claude's workflow unnecessarily.
- **Write to stderr for blocking messages.** PreToolUse hooks should write their block reason to stderr (\`>&2\`) so Claude understands why the action was blocked.
- **Start simple.** Begin with one or two hooks and add more as you learn what your workflow needs.
- **Test hooks independently.** Run your hook command in a terminal first to make sure it works before adding it to your config.

### Don't:

- **Don't run expensive operations on every edit.** Save full test suites and builds for Stop hooks, not PostToolUse.
- **Don't forget to handle edge cases.** Use \`grep -q\` with proper escaping and always have a fallback exit code.
- **Don't block on formatting.** PostToolUse formatting hooks should always \`exit 0\` even if the formatter fails — you don't want a formatter crash to halt your session.
- **Don't use interactive commands.** Hooks run non-interactively. Commands that expect user input will hang.

---

## Hooks vs. CLAUDE.md Instructions

A common question: when should you use a hook vs. putting instructions in CLAUDE.md?

| Use a Hook When... | Use CLAUDE.md When... |
|---|---|
| You need guaranteed enforcement | You need flexible guidance |
| The check is mechanical (lint, format, scan) | The guidance is contextual (code style, architecture) |
| You want to block bad actions | You want to influence good decisions |
| The rule is binary (pass/fail) | The rule requires judgment |
| Speed matters (automated checks) | Context matters (design patterns) |

The best setups use **both**: CLAUDE.md provides the "what" and "why" (coding standards, architecture decisions, project context), while hooks enforce the "how" (formatting, security, testing).

> Read our [Complete Guide to CLAUDE.md](/blog/claude-md-guide) to learn how to write effective project instructions.

---

## FAQ

**Can I use hooks with MCP servers?**
Yes. Hooks and MCP servers are independent features that work together. You might use MCP to give Claude access to your database, and hooks to prevent it from running DROP TABLE commands.

**Do hooks work in VS Code / JetBrains?**
Hooks work in any environment where Claude Code runs, including the CLI and IDE extensions. The \`.claude/settings.json\` file is shared across all interfaces.

**Can a hook modify Claude's output?**
Not directly. Hooks can block actions (exit 1) or let them pass (exit 0), but they can't modify the tool call itself. For post-processing, use PostToolUse hooks that modify the file after Claude writes it (like auto-formatting).

**What happens if a hook crashes?**
If a hook exits with code 2, the error is silently ignored and Claude continues. If it exits with code 1, it's treated as a block (PreToolUse) or error feedback (PostToolUse). Always use exit code 2 for non-critical hooks where you don't want crashes to interrupt the workflow.

**Are hooks project-specific or global?**
Both. Project-level hooks go in \`.claude/settings.json\` (checked into your repo). Global hooks go in \`~/.claude/settings.json\`. Project hooks override global hooks for the same matcher pattern.

---

## Start Automating Today

Hooks are the fastest way to level up your Claude Code workflow. Start with these three:

1. **[Security Scan](/hooks/security-scan)** — Prevent secrets from being written to your codebase
2. **[Lint on Edit](/hooks/lint-on-edit)** — Automatic formatting on every file change
3. **[Notify on Complete](/hooks/notify-on-complete)** — Never miss when Claude finishes a task

Browse our full collection of [hooks](/hooks) for ready-to-use configurations, or combine them with [MCP servers](/mcp-servers), [agents](/agents), and [skills](/skills) to build complete development workflows.

---

*Have a hook configuration that works great for your team? [Share it with the Claude Directory community](https://github.com/tmcpa/claudedirectory) and help other developers automate their workflows.*
`,
};
