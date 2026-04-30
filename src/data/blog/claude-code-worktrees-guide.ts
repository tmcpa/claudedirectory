import { BlogPost } from "@/lib/types";

export const claudeCodeWorktreesGuide: BlogPost = {
  slug: "claude-code-worktrees-guide",
  title:
    "Claude Code Worktrees: The Complete Guide to Parallel Agents in 2026",
  description:
    "Worktrees are the single biggest unlock for running multiple Claude Code agents at once without conflicts. Here's how they work, when to use them, and the failure modes that take down most teams the first week.",
  publishedDate: "2026-04-30",
  tags: [
    "claude-code",
    "worktrees",
    "git",
    "parallel-agents",
    "productivity",
    "workflow",
    "advanced",
    "subagents",
    "ci",
    "2026",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "claude-code-cheat-sheet",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-subagents-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-workflows-10x-productivity",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-dispatch-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-remote-control",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-md-guide",
      relationship: "recommends",
    },
  ],
  seoTitle:
    "Claude Code Worktrees Guide (2026): Parallel Agents Without Conflicts",
  seoDescription:
    "How to use Claude Code worktrees to run multiple agents in parallel: setup, isolation modes, common failure modes, and the team workflows that actually scale.",
  content: `# Claude Code Worktrees: The Complete Guide to Parallel Agents in 2026

If you've watched a Claude Code session for more than a few hours, you've felt the pinch. You want a long-running refactor in one branch, a quick bug fix in another, and a third agent investigating a flaky test — but they're all fighting over the same checkout. One agent stages files the other didn't write. Another rewrites a config the first one was about to commit. You end up running a single agent at a time, and most of the parallelism Claude Code is supposed to give you evaporates.

**Worktrees fix this.** They're the single biggest unlock for getting real parallelism out of Claude Code, and they're the feature most users either don't know about or wire up wrong.

This guide covers everything you actually need: how Claude Code worktrees work under the hood, when to use them (and when not to), the configuration that prevents 90% of the pain, and the team-level workflows that scale to a dozen concurrent agents without anyone tripping over anyone else.

If you're new to Claude Code more broadly, the [cheat sheet](/blog/claude-code-cheat-sheet) is a good starting point. This post assumes you've already shipped at least a few PRs with the tool.

---

## What Is A Claude Code Worktree?

A Claude Code worktree is a git worktree managed for you by the Claude Code harness — a separate working directory pointing at the same repository, on its own branch, with its own files on disk. Multiple worktrees can exist for the same repo at the same time. Each one is a fully independent checkout, but they share the same \`.git\` object database, so creating a new worktree is essentially free in terms of disk and instant in terms of time.

Plain git has had worktrees for years (\`git worktree add\`). What Claude Code adds:

- **Automatic creation and teardown.** When you (or an agent) opt into worktree isolation, Claude spins up a fresh worktree, names it, runs the work there, and cleans up afterward if no changes were made.
- **Per-worktree state.** Plan mode, memory, hooks, permissions, and the conversation transcript all attach to the worktree, not the original repo. Two agents can each have their own plan and not see each other's edits.
- **Branch-aware naming.** The worktree's branch is created from the parent branch automatically, with a generated suffix so two agents don't collide on the same branch name.
- **Integration with subagent isolation.** When you launch a subagent with \`isolation: "worktree"\`, Claude routes that agent into its own worktree without you having to manage the git plumbing.

The mental model: **a worktree is a sandbox that looks and behaves exactly like your repo, but the agent inside it can't accidentally touch what's happening in another window.**

---

## Why Worktrees Matter Now (And Didn't As Much A Year Ago)

Three things changed between 2025 and now:

1. **Subagents stopped being experimental.** The [subagents guide](/blog/claude-code-subagents-guide) covers this in depth — Claude Code now spawns specialized agents (Explore, Plan, code-reviewer, feature-dev, and so on) routinely, often several in a single turn. Without isolation, those agents fight over the working directory.
2. **Long-running background tasks landed.** [Remote control](/blog/claude-code-remote-control) and the \`run_in_background\` flag mean a single conversation can have a build, a test suite, and an agent all running concurrently. Each of those wants a stable view of the filesystem.
3. **People started running multiple chats per repo.** A user might have one Claude Code window doing a feature, another doing code review, and a third writing docs. Without worktrees, every save in one window invalidates the other two.

In other words: worktrees stopped being a power-user trick and became table stakes for anything beyond a single sequential agent. If you're still using one checkout and one branch for everything, you've probably hit at least one of the failure modes below already.

---

## The Five Failure Modes Worktrees Solve

Before getting into setup, here are the specific problems worktrees fix. If you recognize any of these, this is the post for you.

### 1. The "two agents, one checkout" race

You launch a long Explore subagent and immediately start an Edit on the same files in the main session. The subagent's reads now see partial state from your in-progress edit. It hallucinates code that no longer exists. It cites line numbers that have shifted. Its report is subtly wrong.

### 2. The accidentally-merged branch

You're refactoring \`auth/\` in branch \`feat/refactor-auth\`. You ask Claude to "fix the typo in the login button." Claude — being efficient — applies the typo fix on top of your refactor and commits it to the same branch. Now your refactor PR carries a typo fix that has nothing to do with it, and the typo fix can't ship until the refactor does.

### 3. The dirty-checkout build

CI passes locally. You push. CI fails. You check the diff: it includes \`node_modules/.cache/\` because your build process touched it while another agent was simultaneously running tests. The dirty checkout ate you alive.

### 4. The lockfile war

Two agents both decide a dependency is missing. Both run \`npm install\`. Both regenerate \`package-lock.json\`. The first one's changes get clobbered. The second one's lockfile points at packages neither agent has actually validated. Nobody noticed until prod.

### 5. The "wait, why is plan mode confused?" moment

Plan mode has a snapshot of the file. You hand-edit the file in another window. Plan mode is now reasoning about a version of the code that no longer exists. The plan is internally consistent but factually wrong, and you don't notice until it's halfway implemented.

All five of these go away the moment each agent has its own worktree.

---

## How To Use Worktrees In Claude Code

There are three levels of worktree usage. Pick the one that matches how much parallelism you actually need.

### Level 1: Isolated subagents (the easy win)

If you delegate to a subagent with the Agent tool, pass \`isolation: "worktree"\`. The harness creates a worktree for that agent, runs it there, and either cleans up (if no changes) or returns the path and branch to you.

This is the lowest-effort way to get value out of worktrees: any time you're spawning a subagent that might touch files — \`feature-dev\`, \`code-reviewer\`, \`code-simplifier\` — turn isolation on. The cost is zero. The upside is that the subagent's work is automatically scoped to its own branch, so you can review the diff before pulling it back into the main line.

When this matters most: any subagent that you expect to *write* code. Read-only research agents (Explore, general-purpose lookups) usually don't need isolation, since they're not modifying state. The exception is when a read-only agent might run scripts, install packages, or otherwise perturb the working directory — in those cases, isolate.

### Level 2: Manual worktrees for parallel chats

Run \`git worktree add ../myrepo-feat-x feat/x\` and open a fresh Claude Code session pointed at that directory. You now have two completely independent sessions that share git history but nothing else.

This is the move for any scenario where *you* — not Claude — want to be working on two things at once. Bug fix in one window, feature in another, doc update in a third. None of them step on each other. Each has its own \`CLAUDE.md\` view, its own plan, its own conversation. Switching between them is just switching windows.

The recipe:

\`\`\`bash
# from inside your main checkout
git worktree add ../myrepo-fix-login fix/login-button
git worktree add ../myrepo-feat-billing feat/billing-rewrite

# now open Claude Code in each:
cd ../myrepo-fix-login && claude
# (in another terminal)
cd ../myrepo-feat-billing && claude
\`\`\`

When you're done with a worktree, \`git worktree remove ../myrepo-fix-login\` and the directory disappears. The branch sticks around (use \`git branch -d fix/login-button\` to remove it) but the checkout is gone.

### Level 3: Worktree-per-task with automation

The teams getting the most out of Claude Code have wired worktrees into their daily flow. Every new task starts with a worktree. The naming convention encodes who owns it and what it's for. Cleanup is automated. Stale worktrees are reaped on a schedule.

A typical setup:

- A shell function or script (\`new-task <name>\`) that runs \`git worktree add\`, branches off the current main, and \`cd\`s into the new directory.
- A hook that warns if you try to start a Claude Code session in a worktree that's been idle for more than a week.
- A CI job that lists open worktrees per developer and pings Slack for cleanup if the count gets above a threshold.
- A team \`CLAUDE.md\` rule: "never run \`claude\` in the main checkout — always in a worktree." This prevents the accidental "I just opened it in the wrong place" mistake that breaks the isolation discipline.

If your org is past the early-adopter phase and a dozen people are using Claude Code daily, this level pays for itself in a week.

---

## Configuration: The Settings That Actually Matter

A few settings make worktrees work better. None are strictly required, but skipping them is most of the reason teams report "worktrees feel clunky."

### \`worktreeBaseDir\`

By default, worktrees live next to your main checkout (e.g., \`../myrepo-feat-x\`). Set \`worktreeBaseDir\` in your global settings to something like \`~/code/worktrees/\` so all worktrees across all repos collect in one place. This makes them easy to list, easy to clean up, and keeps your project parents tidy.

### Hooks for cleanup

Worktrees accumulate. Even with auto-cleanup-on-no-change, every worktree where you actually shipped code leaves the directory behind. Wire a hook that, on Claude Code session end, prompts you: *"Worktree X has changes that are now merged on main. Remove?"* If you skip this, you'll discover three months in that you have eighty stale worktrees and don't remember what half of them were for.

### Permissions per worktree

Permissions in Claude Code are scoped, and scoping them at the worktree level is what makes per-task tightening practical. A worktree dedicated to a refactor in \`auth/\` shouldn't have permission to touch \`infra/\`. Per-worktree permissions are how you get that without making the global config unusable.

The pattern: a project-level \`.claude/settings.json\` that's checked in as the baseline, plus a \`.claude/settings.local.json\` per worktree for the agent's lane on this particular task.

### \`CLAUDE.md\` placement

The repo's main \`CLAUDE.md\` is shared across all worktrees because it's checked into git. But you can drop a worktree-only \`CLAUDE.md\` in the worktree directory (uncommitted, gitignored) that gives the agent extra context for *this specific task*: "we're refactoring \`auth/\` in this worktree; do not touch \`api/\`." This is one of the highest-leverage uses of [\`CLAUDE.md\`](/blog/claude-md-guide) and almost no one does it.

---

## When Not To Use Worktrees

Worktrees aren't free. They use disk space (each one is a full checkout, even if the \`.git\` directory is shared). They make IDE state more complicated — your editor needs to know which worktree it's pointing at. And they create a small but real cognitive tax: more directories to track.

Skip worktrees when:

- **You're doing a single, sequential task.** One agent, one branch, one window. Just work.
- **The task is read-only.** No writes, no need to isolate.
- **Your environment doesn't support them well.** Some IDE/editor setups handle multiple checkouts of the same repo poorly. Fix the IDE before fighting the worktree.
- **The repo is enormous and worktrees are too expensive.** For monorepos with multi-GB checkouts, consider sparse-checkout worktrees instead — \`git worktree add\` plus \`git sparse-checkout\` keeps the on-disk footprint manageable.

The default rule of thumb: **isolate when you're writing code in parallel; don't bother when you aren't.**

---

## Worktrees And Subagents: The Combination That Actually Scales

The most powerful pattern, and the one most teams underuse, is combining worktrees with subagent delegation.

A typical flow:

1. You're in the main session, scoping a feature with [feature-dev](/blog/claude-code-subagents-guide).
2. Feature-dev produces a build sequence — five concrete steps.
3. You launch each step as a subagent with \`isolation: "worktree"\`. Each subagent gets its own worktree, its own branch, its own context window.
4. The subagents run in parallel (some in background) without stepping on each other.
5. As each finishes, you review the diff in its worktree, merge the branch back, and remove the worktree.

This is the closest thing to "multiple engineers on the same feature" that AI coding has produced. The reason it works is the worktree isolation — without it, the subagents would be fighting over a shared filesystem and you'd be back to running them one at a time.

The ceiling: as of mid-2026, teams are running 4–8 concurrent worktrees per developer reliably. Above that, you're usually bottlenecked on review, not on Claude. See the [10x productivity workflows](/blog/claude-code-workflows-10x-productivity) post for the daily patterns this enables.

---

## CI And Worktrees: A Note On Pitfalls

A few CI-flavored gotchas worth knowing about:

### CI runners don't share \`.git\`

Locally, your worktrees share the parent repo's \`.git\` directory. On a CI runner, every checkout is fresh. So a workflow that "works locally because of the shared object database" won't necessarily port to CI. Test your worktree-aware scripts in a clean clone before depending on them in CI.

### Hooks can fire across worktrees

A pre-commit hook checked into the repo runs in *every* worktree. If your hook assumes a single working directory (e.g., it touches files in \`./tmp\` and assumes that's the project's tmp), it can collide between worktrees. Make hooks worktree-relative — use \`git rev-parse --git-common-dir\` instead of \`--git-dir\` when you mean "the shared metadata."

### Branch protections still apply

Worktree branches are real branches. If your CI requires PRs to come from non-protected branches, your worktree-named branches must follow the same rules. This is rarely an issue in practice but trips up the occasional team.

---

## A Concrete Walkthrough: One Feature, Three Worktrees

Let's make this real. Suppose you're shipping a new pricing page that needs:

- **Backend changes** to expose a new pricing API.
- **Frontend changes** to render the new tiers.
- **Marketing copy updates** on the landing page.

Without worktrees, you'd do these one at a time, or you'd shove them all into one branch and watch the PR balloon. With worktrees:

\`\`\`bash
git worktree add ~/code/worktrees/pricing-api  feat/pricing-api  main
git worktree add ~/code/worktrees/pricing-ui   feat/pricing-ui   main
git worktree add ~/code/worktrees/pricing-copy feat/pricing-copy main
\`\`\`

Three worktrees, three branches, three Claude Code sessions. The backend agent works in its lane. The frontend agent works in its lane. The marketing copy lives entirely in its own world.

Each branch becomes its own PR, scoped tightly. Reviewers can look at the API changes without wading through CSS. The copy PR can ship in fifteen minutes without waiting on the API. Three small, mergeable PRs instead of one fragile big one.

This pattern — *one feature, multiple thin PRs in parallel worktrees* — is how senior engineers using Claude Code currently ship the fastest. It's also the easiest pattern to explain to skeptical engineering leads, because it improves PR review quality at the same time it improves developer velocity.

---

## Frequently Asked Questions

### Are Claude Code worktrees the same as git worktrees?

They're built on git worktrees, yes. The Claude Code harness adds automation around creation, naming, cleanup, and integration with subagent isolation. If you're comfortable with \`git worktree add\` directly, you can use Claude Code worktrees with no extra learning.

### Do worktrees work on Windows?

Yes. Git worktrees have worked on Windows for years. The Claude Code harness handles the path differences. The only friction tends to be IDEs that handle multi-checkout setups poorly on Windows — VS Code is fine, some others can be flaky.

### Can I run multiple Claude Code sessions in the same worktree?

You can, but you usually shouldn't. The point of worktrees is one session per directory. Two sessions in the same worktree gives you back the original "two agents, one checkout" race condition.

### How many worktrees is too many?

Practically, 6–10 active worktrees per developer is the upper end before you spend more time managing them than working. If you're past that, look at why — usually it means PRs aren't merging, which is a bigger problem than the worktree count.

### Do worktrees affect Claude Code memory?

Memory in Claude Code is associated with the session and the project. Worktrees of the same project share the project-level memory. Per-worktree state (the conversation, the plan, recent tool output) is separate. See the [auto memory guide](/blog/claude-code-auto-memory-guide) for the full picture.

### Should I commit \`.claude/\` directories from inside a worktree?

The repo-level \`.claude/\` directory should be checked in (settings, hooks, project memory). Worktree-local settings (\`.claude/settings.local.json\`) should be gitignored, just like in the main checkout. The structure is the same; only the contents differ per worktree.

---

## The TL;DR

If you take three things away from this post:

1. **Use \`isolation: "worktree"\` on every code-writing subagent by default.** The cost is nothing; the upside is that parallel agents stop colliding.
2. **Use one worktree per concurrent task you're personally driving.** A bug fix and a feature are two worktrees, not one branch you're switching back and forth on.
3. **Wire cleanup into your daily flow.** Stale worktrees are the single biggest reason teams give up on the pattern. A weekly \`git worktree prune\` plus a hook to nag about idle directories solves it.

Worktrees are the boring, mechanical foundation that makes the more exciting Claude Code workflows actually work in practice. They're the thing that turns "I run one agent at a time, sequentially" into "I run four agents at once, on four branches, and ship four PRs by lunch." The setup takes about thirty minutes. The payoff lasts as long as you're using Claude Code.

---

## Related Reading

- [Claude Code Cheat Sheet](/blog/claude-code-cheat-sheet) — quick reference for the commands and flags you'll actually use, worktree commands included.
- [Claude Code Subagents Guide](/blog/claude-code-subagents-guide) — the agents you'll most often want to isolate into worktrees, and when each one earns its keep.
- [10x Productivity Workflows](/blog/claude-code-workflows-10x-productivity) — daily patterns that build on top of worktree isolation.
- [Claude Dispatch Guide](/blog/claude-dispatch-guide) — when worktrees aren't enough and you need full remote-agent dispatch.
- [Claude Code Remote Control](/blog/claude-code-remote-control) — long-running and background work, which works best inside worktrees.
- [Complete \`CLAUDE.md\` Guide](/blog/claude-md-guide) — including per-worktree \`CLAUDE.md\` for task-scoped agent context.

---

*Last updated: April 30, 2026. Worktrees are evolving alongside subagent and remote-execution features in Claude Code; check the [Claude Directory repo](https://github.com/tmcpa/claudedirectory) for updates if anything here drifts from the latest harness behavior.*
`,
};
