import { HowTo } from "@/lib/types";

export const claudeFolderHowTo: HowTo = {
  slug: "claude-folder",
  title: "What is the .claude folder? Structure, purpose, and examples",
  description:
    "The .claude folder is where Claude Code stores settings, agents, commands, hooks, and skills. Learn its structure, what goes in each subdirectory, and see real examples.",
  seoTitle: "The .claude Directory Explained – Structure of the Claude Code Config Folder (2026)",
  seoDescription: "What the .claude directory is, what goes in each subfolder (agents, commands, hooks, skills, settings.json, CLAUDE.md), and how global vs project .claude folders layer. With examples.",
  difficulty: "beginner",
  timeToComplete: "8 min",
  tags: ["claude-folder", "configuration", "getting-started", "claude-code"],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    { type: "how-to", slug: "memory", relationship: "recommends" },
    { type: "how-to", slug: "hooks", relationship: "recommends" },
    { type: "how-to", slug: "skills", relationship: "recommends" },
    { type: "how-to", slug: "slash-commands", relationship: "recommends" },
  ],
  content: `# What is the .claude folder?

The \`.claude\` folder is the central configuration directory for Claude Code. It holds your settings, custom agents, slash commands, hooks, skills, and CLAUDE.md memory files. Claude Code reads it automatically at startup — no flags or environment variables required.

There are two scopes:

- **Global**: \`~/.claude/\` — applies to every project on your machine
- **Project**: \`.claude/\` in your repo root — applies only to that project

Project settings take precedence over global settings, and both layer on top of Claude Code's defaults.

## Structure

A fully-configured \`.claude\` folder looks like this:

\`\`\`text
.claude/
├── CLAUDE.md            # Persistent project/user memory
├── settings.json        # Shared settings (commit this to git)
├── settings.local.json  # Local-only overrides (gitignored)
├── agents/              # Custom subagent definitions
│   └── code-reviewer.md
├── commands/            # Custom slash commands
│   └── review.md
├── hooks/               # PreToolUse / PostToolUse / Stop scripts
│   └── block-secrets.sh
├── skills/              # Skills (reusable workflows)
│   └── security-review/
│       └── SKILL.md
├── plugins/             # Installed plugin manifests
└── projects/            # Session transcripts and state
\`\`\`

Not every folder needs to exist — Claude Code creates them on demand.

## What each piece does

### \`CLAUDE.md\`
Plain-text memory loaded into every session. Put project conventions, tech stack, commands, and anything Claude should know without being told. See the [memory guide](/how-to/memory) for format tips.

### \`settings.json\`
Shared configuration: permissions, model selection, environment variables, hook registrations, MCP servers. Safe to commit.

### \`settings.local.json\`
Personal overrides — API keys, machine-specific paths, experiments. Add it to \`.gitignore\`.

### \`agents/\`
Each file is a Markdown document with YAML frontmatter defining a specialized subagent (name, description, tools, model). Claude Code delegates to them via the Agent tool.

### \`commands/\`
Each file is a slash command. Filename becomes the command: \`commands/review.md\` → \`/review\`. The body is the prompt that runs when invoked.

### \`hooks/\`
Scripts executed on tool events — block dangerous commands, auto-format on write, send a notification when Claude stops. Wire them up in \`settings.json\` under the \`hooks\` key.

### \`skills/\`
Reusable multi-step workflows. Each skill is a folder containing a \`SKILL.md\` with metadata and instructions. Claude loads the index on startup and invokes skills when the user's request matches.

### \`plugins/\`
Manifests for plugins installed via \`/plugin install …\`. Usually not edited by hand.

### \`projects/\`
Per-session history and state. Safe to delete if you want a clean slate; Claude Code will rebuild it.

## Quick-start example

Minimal project \`.claude/\` for a TypeScript repo:

\`\`\`text
.claude/
├── CLAUDE.md
└── settings.json
\`\`\`

\`\`\`markdown
# CLAUDE.md

## Stack
- Next.js 15 App Router
- TypeScript strict mode
- Tailwind v4

## Commands
- \`pnpm dev\` — dev server
- \`pnpm test\` — Vitest
- \`pnpm lint\` — ESLint

## Conventions
- Named exports only
- Zod for runtime validation
\`\`\`

\`\`\`json
{
  "permissions": {
    "allow": ["Bash(pnpm *)", "Bash(git status)", "Bash(git diff *)"]
  }
}
\`\`\`

That's enough to give Claude Code durable context and let it run your build commands without prompting.

## Global vs project: what goes where

| Location | Good for |
|----------|----------|
| \`~/.claude/CLAUDE.md\` | Your personal coding style, preferred languages, universal rules |
| \`~/.claude/commands/\` | Commands you want in every project (e.g. \`/commit\`) |
| \`~/.claude/settings.json\` | Global permissions, default model, your API keys |
| \`.claude/CLAUDE.md\` | Project tech stack, conventions, current focus |
| \`.claude/settings.json\` | Project-specific permissions, hooks, MCP servers |
| \`.claude/agents/\` | Subagents that understand this codebase specifically |

## Should I commit \`.claude/\` to git?

Yes — commit the shared files so your team inherits the same setup:

- \`.claude/CLAUDE.md\`
- \`.claude/settings.json\`
- \`.claude/agents/\`
- \`.claude/commands/\`
- \`.claude/skills/\`
- \`.claude/hooks/\`

Gitignore the personal/ephemeral pieces:

\`\`\`gitignore
.claude/settings.local.json
.claude/projects/
\`\`\`

## Common gotchas

- **Files don't load:** check filename case — \`CLAUDE.md\` must be uppercase, \`settings.json\` must be lowercase.
- **Hook not firing:** make sure it's registered in \`settings.json\` *and* the script is executable (\`chmod +x\`).
- **Command not found:** slash commands use the filename (without \`.md\`) — \`commands/my-review.md\` → \`/my-review\`.
- **Settings ignored:** project \`settings.json\` overrides global; check both if something seems wrong.

## Where to go next

- [Using CLAUDE.md for project memory](/how-to/memory)
- [Writing custom slash commands](/how-to/slash-commands)
- [Claude Code hooks](/how-to/hooks)
- [Building skills](/how-to/skills)
`,
};
