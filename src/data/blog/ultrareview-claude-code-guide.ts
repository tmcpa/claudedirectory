import { BlogPost } from "@/lib/types";

export const ultrareviewClaudeCodeGuide: BlogPost = {
  slug: "ultrareview-claude-code-guide",
  title:
    "Ultrareview for Claude Code: Multi-Agent Cloud Code Review in One Slash Command",
  description:
    "Ultrareview (/ultrareview) runs a multi-agent cloud review of your current branch or a GitHub PR — parallel specialists reviewing security, architecture, correctness, and style. Here's what it is, how to run it, and when to reach for it.",
  publishedDate: "2026-04-22",
  tags: [
    "claude-code",
    "ultrareview",
    "code-review",
    "cloud-review",
    "multi-agent",
    "pull-request",
    "subagents",
    "workflow",
    "claude-opus-4-7",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "claude-code-subagents-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-agents-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-cheat-sheet",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-opus-4-7-deep-reasoning",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-workflows-10x-productivity",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "blog-claude-managed-agents",
      relationship: "recommends",
    },
  ],
  content: `# Ultrareview for Claude Code: Multi-Agent Cloud Code Review in One Slash Command

Local \`/review\` is fast, free, and runs inside your editor. It catches obvious things — the typo, the off-by-one, the missing null check. But it's one agent, looking at one diff, inside the same context window you've been working in all morning.

\`/ultrareview\` is the other mode. It hands the branch off to a cloud-hosted swarm of specialist agents, each looking at the change from a different angle — security, correctness, architecture, style, tests — and merges their findings into a single report. It's the mode you run before you merge something that would be painful to roll back.

This is what it is, how to invoke it, and when it's worth reaching for.

---

## What \`/ultrareview\` Actually Does

\`/ultrareview\` is a slash command in Claude Code that launches a **multi-agent cloud review** of your current work. The short version:

- **Multi-agent** — several specialized reviewers run in parallel, each with a focused remit (security, correctness, architecture, performance, tests, style). Each one reads the diff independently and writes its findings.
- **Cloud-hosted** — the review runs on Anthropic's infrastructure, not inside your local Claude Code session. Your terminal stays free. Your context window isn't consumed.
- **User-triggered** — it only runs when you type the command. It's not a hook, not a CI step, not something Claude kicks off on its own. You ask for it, you get it.
- **Billed separately** — cloud-hosted multi-agent runs aren't free the way local \`/review\` is. Each invocation spins up real compute on real models, so it's metered against your plan.
- **Branch or PR** — you can point it at your local branch (no GitHub remote required) or at a specific GitHub pull request by number.

The output is a consolidated review: prioritized issues, by severity, with file and line references, plus the kind of architectural commentary that only shows up when a model has actually read your whole change instead of skimming a diff.

---

## The Two Invocations

There are two forms, and the difference matters.

### Review the local branch

\`\`\`bash
/ultrareview
\`\`\`

No arguments. Claude Code bundles your **current local branch** — commits, uncommitted staged changes if relevant, and the diff against your main branch — and ships that to the cloud reviewer. No GitHub remote required. No PR needed. If you're working on a private branch that hasn't been pushed, this still works.

This is the form you use **before** opening a PR. It's the "is this ready to share with humans?" check.

### Review a specific pull request

\`\`\`bash
/ultrareview 1234
\`\`\`

With a PR number. Claude Code pulls the PR from GitHub, reviews the diff, and optionally posts findings back as PR comments (depending on your repo's configuration).

This is the form you use **on** a PR — either your own, to catch things before a human reviewer does, or on a teammate's, to get a second opinion before you merge.

### What it won't run on

- **Not in a git repo.** If you run \`/ultrareview\` in a directory that isn't a git repository, Claude Code will ask if you want to run \`git init\` first. Without git, there's no branch to bundle.
- **No new commits or changes.** If your current branch has no diff against main, there's nothing to review. You'll get back: *"It doesn't look like you have any new commits or changes to review against your main branch. Stage or commit them first?"* — fix that, then rerun.

---

## How It Differs From Local \`/review\`

You have \`/review\` already. Why also \`/ultrareview\`?

| | \`/review\` (local) | \`/ultrareview\` (cloud) |
|---|---|---|
| Where it runs | Your terminal | Anthropic's cloud |
| How many agents | One | Multiple specialists in parallel |
| Uses your context window | Yes | No — runs out-of-band |
| Needs GitHub remote | No | No for branch form; yes for PR form |
| Billing | Subscription | Metered per run |
| Typical runtime | Seconds | Tens of seconds to a minute-plus |
| Best for | Quick pre-commit sanity check | Final pre-merge gate on meaningful changes |

Think of it this way: \`/review\` is the junior pass — useful, fast, cheap, catches the low-hanging fruit. \`/ultrareview\` is the staff-engineer pass — slower, pricier, but it brings specialists who notice things a single generalist misses. Things like "this schema migration will lock writes for 90 seconds on a 50M-row table" or "your auth cookie is httpOnly but missing SameSite, which breaks the intended CSRF protection."

You don't need the staff pass on a README typo. You do want it on the migration.

---

## When To Reach For It

Running \`/ultrareview\` on every commit is both overkill and expensive. Save it for changes where a missed issue is actually costly to fix later:

**Good candidates:**
- **Security-sensitive changes** — auth, session handling, input validation, anything touching secrets or permissions.
- **Database migrations and schema changes** — especially on large tables, with locking, or involving backfills.
- **Refactors that touch many files** — where architectural consistency matters and a single-agent review might miss cross-file drift.
- **Public API changes** — SDKs, library interfaces, webhook contracts. The review catches breaking-change patterns before consumers hit them.
- **Performance-critical paths** — anything in a hot loop, background job, or request handler where the failure mode is latency, not an error.
- **Pre-merge on large PRs** — a final gate before hitting the Merge button on a 40-file change.

**Poor candidates:**
- Typos, copy changes, content edits
- Dependency version bumps
- Renaming-only refactors
- Drafts you're still iterating on

The heuristic: if the cost of a missed bug is more than the cost of the review, run it. Otherwise, \`/review\` is fine.

---

## What The Review Actually Looks At

The exact set of specialist agents can evolve, but the axes a multi-agent review covers are consistent. Expect to see commentary on:

- **Correctness** — logic errors, edge cases, off-by-ones, null/undefined handling, race conditions.
- **Security** — injection vectors, auth/authz gaps, secret handling, deserialization risks, unsafe defaults.
- **Architecture** — violations of the patterns already in the codebase, places where a new abstraction is being introduced that already exists elsewhere, dependency direction issues.
- **Tests** — missing coverage for the happy path, missing coverage for the obvious failure modes, tests that don't actually test what their name claims.
- **Performance** — N+1 queries, unnecessary loops inside loops, blocking calls where async would apply, missing pagination on unbounded reads.
- **Style and conventions** — deviations from your \`CLAUDE.md\` rules, project-specific patterns, naming conventions.

Because each concern has its own agent, you get more thorough coverage on each axis than you would from one generalist. A security specialist isn't also trying to track architectural coherence; that's another agent's job.

---

## A Real Workflow

Here's the pattern a lot of teams converge on after a few weeks with \`/ultrareview\`:

### 1. Work locally with \`/review\` in the loop

While you're coding, run \`/review\` after each meaningful chunk. Fix what it flags. Commit. Keep moving. No cloud cost. No waiting.

### 2. Pause before the PR

Before you push and open a PR, type:

\`\`\`bash
/ultrareview
\`\`\`

The cloud review runs against your local branch. You get a prioritized list of issues. Triage them:

- **Must-fix** — security, correctness, broken tests. Go fix them.
- **Should-fix** — architectural or style concerns that are cheap to address. Fix the obvious ones.
- **Won't-fix-now** — nits, or concerns that don't apply given context the reviewer didn't have. Note why and move on.

### 3. Push, open the PR

Your PR is now in better shape than if you'd opened it cold. Human reviewers spend their time on the things that actually need a human — product decisions, taste calls, deeper architectural debate — instead of catching typos and missing null checks.

### 4. Optional: run it again on the PR itself

\`\`\`bash
/ultrareview 1234
\`\`\`

Useful if the PR grew significantly during review, or if you want the review posted as comments back on the PR for the team to see.

---

## Tips For Getting More Out Of It

**Keep your \`CLAUDE.md\` tight.** The reviewers read it. If your project has non-obvious rules — "don't use the new auth helper, it's deprecated" — putting them in \`CLAUDE.md\` means the review catches violations instead of the human reviewer. See the [Complete \`CLAUDE.md\` Guide](/blog/claude-md-guide).

**Commit before you run it.** The review bundles what git sees. If you have in-progress changes you haven't staged, they may or may not make it into the bundle. For predictability: commit (or at least stage) everything you want reviewed before typing the command.

**Don't re-run on every small fix.** Each run is a real cost. Batch your fixes, then re-run once at the end to confirm the important issues are resolved, rather than running after every individual line change.

**Pair it with \`/security-review\`.** For the subset of changes that are genuinely security-sensitive, \`/security-review\` is a focused deep-dive just on that axis. \`/ultrareview\` covers security as one of many axes; \`/security-review\` is the scalpel. Using both on a sensitive change is not redundant — they look for different things at different depths.

**Read the output, don't just skim severities.** The architectural commentary is often the most valuable part, and it's rarely tagged "critical." A reviewer flagging *"this introduces a second source of truth for user permissions"* is not a drive-by nit — it's a problem that compounds.

---

## What You Can't Do With It

Worth being clear about limitations:

- **You can't launch it from inside an agent.** \`/ultrareview\` is a user-triggered command. Another Claude Code session — even a subagent or a scheduled run — can't kick one off on your behalf. It needs an intentional human to type the command.
- **You can't run it on nothing.** No diff, no review. Commit first.
- **It's not a replacement for CI.** Your test suite, your type checker, your linters — those still run where they always ran. \`/ultrareview\` adds a semantic layer on top; it doesn't replace the mechanical one.
- **It's not a replacement for human review.** The multi-agent pass catches a lot, but it doesn't know your product, your users, your roadmap, or why you're making a specific tradeoff. Human reviewers still matter. \`/ultrareview\` just makes their time more valuable by handling the things a machine can handle first.

---

## Where It Fits In The Bigger Picture

Claude Code has been moving steadily toward a model where short, cheap operations run locally and deeper, more expensive operations run in the cloud. Local \`/review\` is one pole of that. \`/ultrareview\` — along with [Managed Agents](/blog/blog-claude-managed-agents) and scheduled remote agents — is the other.

The pattern that's emerging: use local agents for the tight inner loop (write, review, commit, repeat), and use cloud agents for the wider gates (pre-merge review, overnight refactors, long-running analysis). The local loop stays fast; the cloud loop handles work that wouldn't fit in your terminal or your afternoon.

If you're already comfortable with [subagents](/blog/claude-code-subagents-guide) inside Claude Code, \`/ultrareview\` is the same idea lifted into the cloud. Specialist agents, running in parallel, their outputs merged by an orchestrator. The difference is where the electrons flow and who pays the bill.

---

## Copy-Paste Quick Reference

\`\`\`bash
# Review your current local branch (no PR required)
/ultrareview

# Review a specific GitHub pull request
/ultrareview 1234

# Prereqs
# - Must be in a git repository (offer git init if not)
# - Branch form: must have a diff against main
# - PR form: GitHub remote must be configured
\`\`\`

**Typical session:**

\`\`\`bash
# You've been working on a feature branch
git add -A
git commit -m "wip: add audit log"

# Run the cloud multi-agent review
/ultrareview

# Read the findings, fix what matters, recommit
git add -A
git commit -m "address ultrareview findings: sanitize log input, fix race in flush"

# Push and open the PR — it's already been reviewed
git push -u origin audit-log
gh pr create
\`\`\`

---

## Related Reading

- [Claude Code Subagents: How to Build AI Developer Teams](/blog/claude-code-subagents-guide) — the local equivalent of what \`/ultrareview\` does in the cloud.
- [Claude Code Agents Guide](/blog/claude-code-agents-guide) — how specialist agents get defined and composed.
- [Claude Code Cheat Sheet](/blog/claude-code-cheat-sheet) — every slash command, shortcut, and flag on one page.
- [Claude Opus 4.7: What's Actually New](/blog/claude-opus-4-7-deep-reasoning) — the model powering the smarter cloud agents.
- [Managed Agents](/blog/blog-claude-managed-agents) — the broader story of cloud-hosted Claude work.
- [10x Productivity Workflows with Claude Code](/blog/claude-code-workflows-10x-productivity) — how \`/ultrareview\` fits a full-stack daily loop.

---

*Last updated: April 22, 2026. \`/ultrareview\` is evolving; if a flag or behavior in this post is out of date, open an issue on the [Claude Directory repo](https://github.com/tmcpa/claudedirectory).*
`,
};
