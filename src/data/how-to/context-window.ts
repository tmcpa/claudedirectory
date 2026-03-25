import { HowTo } from "@/lib/types";

export const contextWindowHowTo: HowTo = {
  slug: "context-window",
  title: "Managing Your Context Window",
  description:
    "Learn how to manage Claude Code's context window effectively — keep sessions productive, avoid token bloat, and use subagents and memory for long-running work",
  difficulty: "intermediate",
  timeToComplete: "15 min",
  tags: ["context-window", "optimization", "efficiency", "productivity"],
  featured: true,
  dateAdded: "2026-03-25",
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    { type: "how-to", slug: "memory", relationship: "recommends" },
    { type: "how-to", slug: "advanced-features", relationship: "recommends" },
    { type: "how-to", slug: "agent-teams", relationship: "recommends" },
    { type: "skill", slug: "context-engineering", relationship: "recommends" },
  ],
  content: `# Managing Your Context Window

The context window is Claude Code's working memory — everything Claude knows about your current session lives here. Managing it well is the difference between a productive 2-hour session and one where Claude starts forgetting what you asked 10 minutes ago.

## What Is the Context Window?

Every Claude Code session has a finite context window. It holds:
- Your messages and Claude's responses
- File contents Claude has read
- Tool outputs (command results, search results)
- System instructions (CLAUDE.md, settings)

When this fills up, Claude Code automatically compresses older messages. This keeps the session running, but compressed context is lossy — details get dropped. Understanding this helps you structure your work to keep important information accessible.

## Signs Your Context Is Getting Full

Watch for these signals:
- **Claude forgets earlier instructions** — you gave a requirement 30 messages ago and it's no longer being followed
- **Repeated file reads** — Claude reads the same file it already read because the earlier read was compressed away
- **Loss of thread** — Claude loses track of the overall plan or starts contradicting earlier decisions
- **The context indicator** — Claude Code shows your context usage in the status bar

## Strategy 1: Use /clear Strategically

The \`/clear\` command resets your conversation context. Use it when:
- You're switching to a completely different task
- The context is bloated with old tool outputs you no longer need
- Claude is showing signs of context confusion

**When not to clear**: If you're mid-task and Claude has important context about your current work, clearing will lose it. Consider \`/compact\` instead.

## Strategy 2: Use /compact to Trim Without Losing

The \`/compact\` command compresses the conversation while preserving key context. It's like clearing your desk but keeping your notes.

Good times to compact:
- After a long exploration phase, before starting implementation
- After debugging a complex issue, before moving to the fix
- When you've accumulated lots of file reads and only need the conclusions

## Strategy 3: CLAUDE.md as Persistent Context

Your \`CLAUDE.md\` file survives clears and compacts — it's reloaded every session. Use it for:

\`\`\`markdown
# CLAUDE.md

## Current Sprint
Working on user notification system. Key files:
- src/notifications/ — new module
- src/api/routes/notifications.ts — API endpoints
- src/components/NotificationBell.tsx — UI component

## Decisions Made
- Using WebSockets for real-time delivery (not polling)
- Storing notifications in PostgreSQL, not Redis
- Max 100 notifications per user, auto-archive older ones
\`\`\`

This ensures Claude always has the project context, even after a clear.

## Strategy 4: Offload Work to Subagents

Subagents are the most powerful context management tool. Instead of reading 20 files in your main session (which fills context fast), spawn a subagent:

\`\`\`
"Use an Explore agent to find all files that handle authentication 
  and give me a summary of the auth architecture"
\`\`\`

The subagent reads 20 files in its own context window. Your main session only receives the summary — a few hundred tokens instead of thousands.

**Rules of thumb:**
- Use subagents for any exploration that might touch 5+ files
- Use subagents for code review (it reads the diff, you get the findings)
- Use the main session for interactive work where you need back-and-forth

## Strategy 5: Be Token-Efficient in Your Prompts

Every word in your prompt counts against the context window. Be concise:

**Bloated:**
> "Hey Claude, so I was thinking about this for a while and I think what we should probably do is maybe add some kind of rate limiting to the API endpoints because we've been having some issues with too many requests coming in and it's causing problems. Can you take a look at that?"

**Efficient:**
> "Add rate limiting to the API endpoints. 100 requests/minute per API key. Return 429 when exceeded."

The efficient version gives Claude more information in fewer tokens.

## Strategy 6: Point Claude at Specific Files

Don't make Claude search when you know where things are:

**Context-expensive:**
> "Find the user authentication code and fix the token expiry bug"

**Context-efficient:**
> "Fix the token expiry bug in src/auth/jwt.ts — tokens should expire after 24 hours, not 24 minutes"

The first version might trigger 10 file reads to find the right code. The second reads one file.

## Strategy 7: Start Fresh for New Tasks

A single long session doing many unrelated tasks will accumulate context from all of them. Instead:

1. **Task 1**: Fix the login bug → /clear
2. **Task 2**: Add the notification feature → /clear
3. **Task 3**: Update the API documentation

Each task gets a clean context with full capacity.

## Strategy 8: Use Memory for Cross-Session Persistence

Claude Code's memory system (\`~/.claude/\` memory files) persists across sessions. Use it for information that's important across conversations:

- Project architecture decisions
- User preferences and feedback
- References to external systems
- Team conventions not captured in CLAUDE.md

Memory is loaded automatically in future sessions without counting toward your conversation context the same way.

## Context Budget Planning

For a typical session, budget your context like this:

| Content | Approximate Tokens | Priority |
|---------|-------------------|----------|
| CLAUDE.md and system instructions | 500-2,000 | Always loaded |
| Your prompts | 200-500 per message | Keep concise |
| File reads | 500-5,000 per file | Use subagents for exploration |
| Command outputs | 200-2,000 per command | Trim verbose output |
| Claude's responses | 500-2,000 per response | Automatic |

**The takeaway**: File reads and command outputs are the biggest context consumers. Use subagents and specific file references to minimize them.

## Quick Reference

| Situation | Action |
|-----------|--------|
| Switching tasks | \`/clear\` and start fresh |
| Context getting bloated mid-task | \`/compact\` to trim |
| Need to explore many files | Spawn an Explore subagent |
| Important context for every session | Put it in CLAUDE.md |
| Cross-session information | Use Claude's memory system |
| Claude forgetting instructions | Check if they're in CLAUDE.md (persistent) or just conversation (lossy) |

The best context management is invisible — you structure your work so the context stays focused naturally. Use CLAUDE.md for persistence, subagents for exploration, and clear/compact for hygiene. Your sessions will be dramatically more productive.
`,
};
