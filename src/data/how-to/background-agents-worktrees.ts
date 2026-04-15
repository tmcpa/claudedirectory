import { HowTo } from "@/lib/types";

export const backgroundAgentsWorktreesHowTo: HowTo = {
  slug: "background-agents-worktrees",
  title: "Running Background Agents in Isolated Worktrees",
  description:
    "Use Claude Code's background agents and git worktree isolation to parallelize work, experiment safely, and delegate independent tasks without disrupting your current session",
  difficulty: "intermediate",
  timeToComplete: "20 min",
  tags: [
    "agents",
    "subagents",
    "worktrees",
    "parallel",
    "background",
    "git",
    "productivity",
  ],
  featured: true,
  dateAdded: "2026-04-15",
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    { type: "how-to", slug: "agent-teams", relationship: "works-with" },
    {
      type: "blog",
      slug: "claude-opus-4-million-token-era",
      relationship: "documented-by",
    },
    {
      type: "blog",
      slug: "claude-code-subagents-guide",
      relationship: "recommends",
    },
  ],
  content: `# Running Background Agents in Isolated Worktrees

Claude Code can spawn agents that run in the background on isolated copies of your repository via git worktrees. This turns a linear pair-programming session into a parallel workflow where you can delegate independent tasks and keep working while they run.

This guide walks through when to use background worktree agents, how to launch them, and the patterns that make parallel agent work actually pay off.

---

## Why Worktree Isolation Matters

Git worktrees let you check out multiple branches of the same repository into different directories simultaneously. They share the same \`.git\` directory but have independent working copies.

When Claude Code launches an agent with \`isolation: "worktree"\`, it:

1. Creates a new branch based on your current HEAD
2. Checks that branch out into a temporary worktree directory
3. Runs the agent inside that directory
4. On completion, reports the worktree path and branch name back to you
5. If the agent made no changes, the worktree is cleaned up automatically

The effect: the agent works on a real copy of your repo, can run tests and builds, can modify files freely — and none of it touches your working directory.

---

## When to Use Worktree Agents

Worktree agents are the right tool when:

- **The task is independent.** You don't need to see every intermediate step — you just want the final result.
- **You want to keep working.** Your current session stays productive while the agent runs in parallel.
- **The task is risky or exploratory.** You don't want it modifying files you're currently editing.
- **You're running multiple variants.** Try three different approaches to the same refactor and compare.

They're the wrong tool when:

- You need to collaborate turn-by-turn with the agent
- The task requires context from your current in-flight work
- You're debugging something that needs live interaction

---

## Step 1: Identify an Independent Task

The first skill is recognizing which parts of your work are actually independent. Good candidates:

- **Codebase exploration** — "Go find every place that touches authentication and summarize the patterns"
- **Test generation** — "Write integration tests for this module"
- **Parallel refactors** — "Migrate all uses of the old logger to the new one"
- **Dependency upgrades** — "Upgrade React from 18 to 19 and fix breaking changes"
- **Documentation** — "Write API docs for every exported function in services/"
- **Experiments** — "Try rewriting this module in a functional style and let me compare"

Bad candidates:

- Tasks that depend on decisions you haven't made
- Tasks where you want to review each step
- Anything that touches files you're actively editing

---

## Step 2: Launch a Background Worktree Agent

In Claude Code, you can launch agents with both \`run_in_background: true\` and \`isolation: "worktree"\`. Example:

\`\`\`
Launch an agent with:
- subagent_type: general-purpose
- description: "Migrate logger calls"
- prompt: "Find every use of the old logger in src/ and migrate it to the new structured logger. Run the tests to verify. Commit when done."
- isolation: "worktree"
- run_in_background: true
\`\`\`

You'll get back an agent ID. The agent starts running in its own worktree, and you can continue working in your main session. When it finishes, you're notified automatically — no polling needed.

---

## Step 3: Work in Parallel

While the agent runs, keep going in your main session. The rule of thumb: don't sit and wait. If you find yourself wondering how the agent is doing, you picked the wrong task (or the wrong delegation boundary).

You can launch multiple background agents at once. For independent tasks, batch them in a single message so they start in parallel:

\`\`\`
Launch three agents in parallel:
1. Explore the authentication module (worktree isolation, background)
2. Write tests for the payments module (worktree isolation, background)
3. Document the public API (worktree isolation, background)
\`\`\`

This is where the workflow starts to feel fundamentally different from traditional pair programming. You're not the bottleneck anymore.

---

## Step 4: Review and Merge

When an agent completes, Claude Code tells you:

- The worktree path (e.g., \`~/.claude/worktrees/abc123/\`)
- The branch name it committed to
- A summary of what was done

Your review workflow:

1. **Inspect the changes.** \`git diff\` against your current branch, or check out the branch in your main directory.
2. **Run the tests.** Even if the agent ran them, run them again in your main environment.
3. **Decide: merge, iterate, or discard.**
   - Merge: \`git merge\` the branch into your current work
   - Iterate: resume the agent with feedback to refine
   - Discard: delete the branch and worktree

If the agent made zero changes, the worktree was cleaned up automatically — no action needed.

---

## Patterns That Work

### The Explorer/Planner Pipeline

Launch an **Explore** agent to map a feature area, then pass its findings to a **Plan** agent to design the implementation. Both run in background worktrees, both return structured reports. You then review the plan and either merge it into your session or launch a final implementation agent.

### The A/B Experiment

Launch two agents with slightly different prompts on the same task. Compare the results side-by-side, pick the better one, merge. This is how you test "should this be functional or class-based?" or "should this use middleware or a decorator?"

### The Long-Running Migration

For a big refactor, launch a background agent to handle the mechanical parts while you work on the parts that need judgment. The agent works for hours on the boilerplate; you focus on the interesting decisions.

### The Review Agent

After you commit a feature, launch a background \`code-reviewer\` agent on the diff. It runs while you move on to the next task. When it finishes, you get a structured review you can apply asynchronously.

---

## Common Pitfalls

**Launching too many agents.** Every background agent competes for attention when it finishes. If you have 10 completing in five minutes, you've just overwhelmed yourself. Batch size matters.

**Delegating tasks that need context.** An agent in a worktree doesn't know about your in-flight work in the main directory. If the task requires that context, explain it in the prompt or don't delegate.

**Forgetting to review.** The whole point is that you can keep working — but the finished agents still need your review. Build a habit of draining the review queue at the end of each hour.

**Trusting without verifying.** An agent's summary describes what it *intended* to do. Always look at the actual diff before merging.

**Long-running agents on critical paths.** If your whole day depends on an agent's output, don't make it a background task — run it in the foreground and pay attention.

---

## Worktree Cleanup

Worktrees that did work and made changes stay on disk until you clean them up. Periodically:

\`\`\`bash
# List all worktrees
git worktree list

# Remove a worktree you've already merged
git worktree remove /path/to/worktree

# Prune worktrees that were deleted from disk but still referenced
git worktree prune
\`\`\`

Claude Code's worktree directory is configurable; by default it's under \`~/.claude/worktrees/\`. If you accumulate too many, consider lowering the default retention or cleaning up on a schedule.

---

## Next Steps

- Launch your first background agent with an independent task you've been putting off
- Try running two agents in parallel on the same task with different approaches
- Use the \`code-reviewer\` agent in the background after every commit for free async review
- Read the [Claude Code Subagents Guide](/blog/claude-code-subagents-guide) for deeper patterns
- Pair this with the [Multi-Platform Setup](/how-to/multi-platform-setup) so you can monitor background agents from any device

Worktree isolation is what makes background agents safe. Background execution is what makes them transformative. Together, they're the difference between AI-assisted coding and AI-augmented development.
`,
};
