import { HowTo } from "@/lib/types";

export const removeCoAuthoredByHowTo: HowTo = {
  slug: "remove-co-authored-by",
  title: "Remove Co-Authored-By from Commits",
  description: "Stop Claude Code from adding the Co-Authored-By trailer to your git commits",
  difficulty: "beginner",
  timeToComplete: "5 min",
  tags: ["git", "commits", "customization", "hooks"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    { type: "how-to", slug: "hooks", relationship: "recommends" },
  ],
  content: `# Remove Co-Authored-By from Commits

By default, Claude Code appends a \`Co-Authored-By\` trailer to every commit it creates:

\`\`\`
Co-Authored-By: Claude <noreply@anthropic.com>
\`\`\`

Here are four ways to remove it, from simplest to most automated.

---

## Option 1: Claude Code Setting (Recommended)

Claude Code has a built-in setting to disable the trailer. Add this to your settings file:

\`\`\`json
{
  "includeCoAuthoredBy": false
}
\`\`\`

**Where to add it:**
- **Global** (all projects): \`~/.claude/settings.json\`
- **Project** (shared with team): \`.claude/settings.json\`
- **Local only** (not committed): \`.claude/settings.local.json\`

This is the cleanest solution — no hooks, no prompt instructions, just a single setting.

---

## Option 2: Add a CLAUDE.md Instruction

Add this line to your project's \`CLAUDE.md\`:

\`\`\`markdown
Do not include a Co-Authored-By line in commit messages.
\`\`\`

Claude Code reads \`CLAUDE.md\` before every task and will follow this instruction when creating commits.

**Scope options:**
- **Per-project**: Add to \`CLAUDE.md\` in your repo root
- **Global**: Add to \`~/.claude/CLAUDE.md\` to apply across all projects

---

## Option 3: Git commit-msg Hook

Use a native git hook to strip the trailer automatically — works regardless of who or what creates the commit.

### Create the hook

\`\`\`bash
cat > .git/hooks/commit-msg << 'EOF'
#!/bin/sh
# Remove Co-Authored-By lines from commit messages
sed -i.bak '/^Co-Authored-By:/d' "$1"
rm -f "$1.bak"
EOF
chmod +x .git/hooks/commit-msg
\`\`\`

This runs after every commit message is finalized and strips any \`Co-Authored-By:\` line.

### Make it portable with a global git hook

To apply across all repos:

\`\`\`bash
# Set a global hooks directory
mkdir -p ~/.git-hooks
git config --global core.hooksPath ~/.git-hooks

# Create the global commit-msg hook
cat > ~/.git-hooks/commit-msg << 'EOF'
#!/bin/sh
sed -i.bak '/^Co-Authored-By:/d' "$1"
rm -f "$1.bak"
EOF
chmod +x ~/.git-hooks/commit-msg
\`\`\`

---

## Option 4: Claude Code Hook

Use a Claude Code \`PostToolUse\` hook to amend the most recent commit and strip the trailer after Claude runs a \`Bash\` command containing \`git commit\`.

Add to \`.claude/settings.json\` or \`~/.claude/settings.json\`:

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "if echo \\"$CLAUDE_TOOL_INPUT\\" | grep -q 'git commit'; then git log -1 --format='%B' | sed '/^Co-Authored-By:/d' | git commit --amend -F -; fi"
          }
        ]
      }
    ]
  }
}
\`\`\`

This watches for \`git commit\` commands and immediately amends the commit to remove the trailer.

---

## Removing from Existing Commits

### Last commit only

\`\`\`bash
git log -1 --format='%B' | sed '/^Co-Authored-By:/d' | git commit --amend -F -
\`\`\`

### Multiple recent commits

Use interactive rebase to reword commits:

\`\`\`bash
# Rebase last N commits (e.g., last 5)
git rebase -i HEAD~5
\`\`\`

Mark commits as \`reword\`, then remove the \`Co-Authored-By\` line from each message.

### Bulk removal with filter-branch

> **Warning**: This rewrites history. Only use on branches that haven't been shared.

\`\`\`bash
git filter-branch --msg-filter 'sed "/^Co-Authored-By:/d"' HEAD~10..HEAD
\`\`\`

---

## Which Option Should You Use?

| Approach | Pros | Cons |
|----------|------|------|
| **Setting** | One line, built-in, reliable | None |
| **CLAUDE.md** | Simple, no tooling needed | Claude could occasionally forget |
| **Git hook** | Foolproof, works with any tool | Requires setup per machine (or global config) |
| **Claude Code hook** | Integrated into Claude workflow | Only applies to Claude Code sessions |

**Recommendation**: Use the **\`includeCoAuthoredBy\` setting** — it's the official, built-in way. Add a **git commit-msg hook** as a belt-and-suspenders safety net if desired.
`,
};
