import { BlogPost } from "@/lib/types";

export const claudeCodeAutoMemoryGuide: BlogPost = {
  slug: "claude-code-auto-memory-guide",
  title:
    "Claude Code's Auto-Memory: Building Persistent Context Across Sessions",
  description:
    "Claude Code now ships with a persistent, file-based memory system that remembers user preferences, project decisions, and feedback across sessions. Here's how it works and how to get the most out of it.",
  publishedDate: "2026-04-15",
  tags: [
    "claude-code",
    "auto-memory",
    "context-engineering",
    "productivity",
    "persistent-context",
    "claude-4",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "context-engineering-claude-code",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-opus-4-million-token-era",
      relationship: "recommends",
    },
    {
      type: "how-to",
      slug: "memory",
      relationship: "documented-by",
    },
  ],
  content: `# Claude Code's Auto-Memory: Building Persistent Context Across Sessions

Every AI coding tool has the same dirty secret: on Monday, it doesn't remember anything you told it on Friday. You explained your testing conventions, your deployment pipeline, the reason you can't use a particular library — and then next week, the conversation starts from zero.

Claude Code's auto-memory system fixes this. Not with a vector database, not with a black-box RAG layer — but with a simple, legible, file-based memory store that Claude reads and writes itself. Here's what it is, how it works, and how to make it compound over time.

---

## What Auto-Memory Is (and Isn't)

Auto-memory is a directory of Markdown files Claude owns and maintains. When you start a session, it loads an index (\`MEMORY.md\`) that points to topic-specific memory files. Claude reads the ones that are relevant, acts on them, and writes new ones as it learns more.

**What it is:**

- **File-based** — Stored as plain Markdown under \`~/.claude/projects/<project>/memory/\`. You can read them, edit them, delete them, commit them, grep them.
- **Semantic, not chronological** — Organized by topic, not by when it was saved. One file per fact or rule.
- **Categorized** — Every memory has a type: \`user\`, \`feedback\`, \`project\`, or \`reference\`.
- **Self-maintaining** — Claude writes entries as it works, updates them when things change, removes them when they're wrong.

**What it isn't:**

- Not a conversation log — it doesn't store your chat history
- Not a code cache — it doesn't try to mirror your repo
- Not hidden — everything is in a directory you can inspect
- Not per-conversation state — that's what tasks and plans are for

The design is deliberately boring. No embeddings, no similarity search, no magic. Just files with names that describe what they contain.

---

## The Four Memory Types

Every memory falls into one of four categories, and each one answers a different question:

### User Memories — *"Who am I talking to?"*

Facts about you: your role, your expertise, your goals, your mental model. These shape how Claude explains things and what shortcuts it can take.

\`\`\`markdown
---
name: user_role
description: User's primary role and expertise level
type: user
---

User is a senior backend engineer with 8 years of Go experience.
Currently learning React and this project's frontend. Frame
frontend explanations in terms of backend analogues when possible.
\`\`\`

The payoff is that Claude stops explaining what a \`func\` is and starts comparing JSX to Go templates.

### Feedback Memories — *"What should I repeat or avoid?"*

Rules derived from corrections *and* confirmations. When you say "don't do X" or "yes, that approach was right," Claude writes it down so it doesn't drift back.

\`\`\`markdown
---
name: feedback_testing_approach
description: User prefers integration tests over mocks for database code
type: feedback
---

Integration tests must hit a real database, not mocks.

**Why:** Prior incident where mock/prod divergence masked a
broken migration.

**How to apply:** Any test that touches database code should
use the test database container, not a mocked ORM.
\`\`\`

Notice the structure: the rule, then the *why*, then *how to apply*. The why is what lets Claude handle edge cases instead of blindly following the rule.

### Project Memories — *"What's happening in this project right now?"*

In-flight work, deadlines, architectural decisions, ongoing initiatives. These decay fast, so Claude updates them as it learns more.

\`\`\`markdown
---
name: project_auth_rewrite
description: Ongoing auth middleware rewrite driven by compliance
type: project
---

Auth middleware is being rewritten between 2026-04-01 and 2026-05-15.

**Why:** Legal flagged old middleware for storing session tokens
in a way that doesn't meet new compliance requirements.

**How to apply:** Scope decisions should favor compliance over
ergonomics. Don't suggest clever optimizations that touch token
storage.
\`\`\`

### Reference Memories — *"Where do I look for X?"*

Pointers to external systems — Linear projects, Slack channels, dashboards, wikis. Claude uses these to know where to direct you (or itself) for up-to-date info.

\`\`\`markdown
---
name: ref_oncall_dashboard
description: Grafana dashboard for API latency, watched by oncall
type: reference
---

grafana.internal/d/api-latency is the oncall latency dashboard.
Check it when editing request-path code — this is what will
page someone if it regresses.
\`\`\`

---

## Why Files Beat a Vector Database

The file-based design might look primitive compared to embedding-based memory systems. It's actually the opposite: it's the result of watching vector-based approaches fail at this problem.

**You can read it.** When something goes wrong — Claude applies a stale rule, or misses an obvious fact — you can \`cat\` the memory files and see exactly what it knows. No "what did the embeddings retrieve this time?" mystery.

**You can edit it.** If Claude learned something wrong, you open the file and fix it. You can't edit an embedding.

**It's version-controllable.** Memory files live in a directory. You can commit them, share them across a team, diff them over time. Teams can build up shared project memories that new members inherit instantly.

**Names are the retrieval.** Instead of hoping a similarity search finds the right chunk, every file has a descriptive name and a one-line description. Claude reads the index and picks by topic, not by vector distance.

**The index fits in context.** \`MEMORY.md\` is one line per memory, ~150 characters. Even hundreds of memories fit in a few hundred tokens of context — the load cost is negligible.

---

## How Claude Decides What to Save

Not everything is worth remembering. The hard part of a memory system isn't storing things — it's knowing what deserves storage. Claude's heuristics:

**Save:**

- Facts about the user that will be true next week (role, preferences, constraints)
- Rules derived from corrections ("don't do X" with the *why*)
- Rules derived from confirmations ("yes, that call was right" — these are quieter but just as important)
- Project state that isn't visible in the code (deadlines, stakeholder asks, ongoing migrations)
- Pointers to external systems

**Don't save:**

- Anything derivable from reading the current code (patterns, file paths, architecture)
- Git history (\`git log\` is authoritative)
- Debugging solutions (the fix is in the code)
- Already-documented content (CLAUDE.md, README)
- Ephemeral task state (use tasks or plans instead)

The second list matters more than the first. A memory system that stores *everything* becomes noise. The whole point is that what's in memory is deliberately narrow and high-signal.

---

## The Confirmation Trap

Here's the most important thing about using auto-memory well: **you have to say when things went right, not just when they went wrong.**

Every AI system is easy to correct and hard to affirm. When Claude does something wrong, you push back, and it writes a "don't do X" rule. But when it does something *right* — especially something non-obvious — you just move on. The session ends, nothing is saved, and next week Claude is equally likely to make either choice.

That's the confirmation trap: memory ends up with 10 "avoid X" rules and zero "prefer Y" rules. Claude learns to be cautious, but not to be right.

The fix is simple but unnatural: when Claude makes a good call on a judgment-heavy question, tell it so. Something like *"yeah, bundling this into one PR was right here — splitting would've just been churn."* Claude writes that down as a feedback memory, with the *why*. Next time the same judgment call comes up, it has evidence for both directions.

---

## Memory Compounds Over Time

The single biggest thing about auto-memory is that it's not a feature you use — it's a relationship that builds up.

After one session, Claude knows a few things about you. After ten sessions, it knows your testing philosophy, your deployment pipeline, the three teammates you pair with, the legacy system you can't touch, the migration that's blocking everything. After fifty sessions, a new conversation starts with a level of context that would take a human team member a month to acquire.

This compound-interest effect is why the file-based design matters. You can *see* the context building up. You can prune it, edit it, export it, share it. It's not a black box of state you have to trust — it's a working document of what your AI pair programmer knows about you and your project.

---

## Getting Started

If you're already using Claude Code, auto-memory is already running. The first time you tell Claude something that fits one of the four types, it'll save a file. After a few sessions, browse the memory directory and see what's there.

A few practices that make it work well:

1. **Inspect your memory directory after a few sessions.** Make sure the entries make sense. Delete things that are wrong, edit things that are vague.
2. **Confirm good calls, not just bad ones.** Say "yes, that's right" when Claude makes a non-obvious judgment you agree with.
3. **Explain the *why* when you correct.** "Don't use mocks in DB tests — we had an incident last quarter where mocks passed but prod failed" is a better memory than just "don't use mocks."
4. **Commit project memories with your repo.** If a memory is about the project and not about you personally, check it in so your teammates inherit it.
5. **Treat stale memories as staleness, not errors.** Project memories decay fast. If Claude cites an old memory, it's not lying — it just saved a snapshot. Update it and move on.

---

## The Bigger Picture

Auto-memory is a small feature with outsized implications. It turns Claude Code from a session-scoped assistant into a continuous collaborator. Every conversation starts farther along than the last one, and the knowledge compounds.

The interesting part is that this works without any machine learning breakthroughs. No fine-tuning, no custom embeddings, no clever retrieval — just plain text files in a directory that Claude owns. The reason it works is that most of what you want an AI coding assistant to remember is small, structured, and explicit. A vector database is overkill. A directory of Markdown files is just right.

The million-token context window gave Claude Code the ability to see an entire codebase at once. Auto-memory gives it the ability to remember why that codebase looks the way it does.

---

## Further Reading

- [Context Engineering for Claude Code](/blog/context-engineering-claude-code) — How to structure project context for best results
- [Claude Opus 4.6 and the Million-Token Context Window](/blog/claude-opus-4-million-token-era) — Why context size matters
- [Managing Memory in Claude Code](/how-to/memory) — Practical memory management guide
`,
};
