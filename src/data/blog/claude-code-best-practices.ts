import { BlogPost } from "@/lib/types";

export const claudeCodeBestPractices: BlogPost = {
  slug: "claude-code-best-practices",
  title: "Claude Code Best Practices: 12 Habits of Effective Users",
  description:
    "The difference between fighting Claude Code and flying with it isn't the model — it's how you set up the work. Twelve practical habits, from writing a real CLAUDE.md to planning before you build, that separate power users from people who quit after a week.",
  publishedDate: "2026-06-16",
  tags: [
    "claude-code",
    "best-practices",
    "productivity",
    "workflow",
    "tutorial",
    "agentic-workflows",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "claude-md-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "context-engineering-claude-code",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-plan-mode-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-subagents-guide",
      relationship: "recommends",
    },
  ],
  content: `# Claude Code Best Practices: 12 Habits of Effective Users

Most people who bounce off Claude Code don't bounce off the model. They bounce off the setup. They open a terminal in a messy repo, type a vague one-liner, watch Claude make a confident wrong guess, and conclude the tool isn't ready. Meanwhile someone on the next desk is shipping three PRs before lunch with the same model.

The gap is almost entirely process. Claude Code rewards a small set of habits and punishes their absence, and once you internalize them the tool stops feeling like a slot machine and starts feeling like a fast, literal-minded senior engineer who has never seen your codebase before.

Here are the twelve habits that matter most, roughly in the order they pay off.

---

## 1. Give It a Real CLAUDE.md

The single highest-leverage thing you can do is write a good \`CLAUDE.md\`. It's the file Claude reads automatically at the start of every session — your project's standing brief — and a thoughtful one quietly fixes half the mistakes you'd otherwise correct by hand.

A weak \`CLAUDE.md\` lists technologies. A strong one encodes the things a new senior hire would need a week to learn:

- The commands that actually matter: how to run tests, lint, typecheck, and build — and which one to run before claiming a task is done.
- Conventions that aren't obvious from a single file: how errors are handled, how modules are structured, what "done" looks like.
- The traps. The directory that looks editable but is generated. The test that's flaky. The pattern the team has explicitly moved away from.

Keep it tight — a wall of text gets skimmed by humans and diluted for the model. Treat it as living documentation: when Claude makes a mistake that a line in \`CLAUDE.md\` would have prevented, add the line. Over a few weeks it becomes the most accurate onboarding doc in your repo.

---

## 2. Plan Before You Build

The biggest single-session improvement most people can make is to stop letting Claude write code on the first turn of anything non-trivial. Use **plan mode** — Claude explores and proposes an approach without touching files until you approve it.

This matters because the expensive failure isn't a bad line of code, it's a wrong *direction*: Claude confidently building the wrong thing across fifteen files because it misread the goal. Planning surfaces that misunderstanding while it's still a paragraph you can correct, not a diff you have to revert.

The rhythm that works: ask for a plan, read it skeptically, push back on the part that's wrong, *then* let it build. Five minutes of planning routinely saves an hour of cleanup on real features.

---

## 3. Front-Load the Brief

Claude does its best work when the full task lands in one well-specified opening message. Vague prompts don't fail loudly — they fail by guessing, and a confident guess in the wrong direction is the most expensive thing that happens in a session.

Before you hit enter, give it the three things it can't infer:

- **The goal** — what should be true when this is done, in plain language.
- **The constraints** — what it must not break, which patterns to follow, what's out of scope.
- **The definition of done** — tests passing, a specific behavior working, a checklist satisfied.

"Fix the login bug" is a coin flip. "Users with expired sessions get a 401 instead of a 500; reproduce it with the auth test, fix it, and make sure the existing session tests still pass" is a task. The second one isn't longer because you're being verbose — it's longer because you're removing the guesses.

---

## 4. Treat Context as a Budget

Everything in the conversation competes for the model's attention. A session that started clean but is now 80% stale file dumps and abandoned tangents will produce worse work than a fresh one — not because the model got dumber, but because the signal is buried.

Practical context hygiene:

- **Start fresh for unrelated tasks.** Don't debug a CSS issue in the same session where you just did a database migration. Clear it.
- **Don't paste what Claude can read.** Point it at files instead of dumping their contents; it retrieves what it needs and keeps the rest out of the window.
- **Compact long sessions** rather than letting them sprawl. A focused summary beats a rambling history.

Thinking about context as a finite budget you spend deliberately — rather than an infinite log — is the mental model that most changes output quality on long tasks.

---

## 5. Let It Read Before It Writes

A surprising number of bad outputs trace back to Claude acting before it has looked. When you ask for a change, the good first move is almost always exploration: which files are involved, how the existing pattern works, where the edges are.

You can encourage this explicitly — "explore how X works before changing anything" — and for larger questions, lean on **subagents** to fan out across the codebase in parallel and report back conclusions instead of dumping every file into your main context. The parent stays focused; the searching happens elsewhere.

The tell that you skipped this step: Claude reinvents a helper that already exists three directories over. A few seconds of "read first" prevents most of it.

---

## 6. Keep Changes Small and Reviewable

Claude can generate a thousand-line diff. That doesn't mean you should let it. Large, sprawling changes are hard to review, hard to test, and hard to revert when one part is wrong — and "one part is wrong" is the normal case, not the exception.

Prefer a sequence of small, verifiable steps: make one coherent change, confirm it works, commit, move on. This isn't a constraint on Claude so much as a constraint on *risk*. A small diff that's 95% right is a quick fix. A huge diff that's 95% right is a debugging session where you can't tell which 5% is the problem.

---

## 7. Make It Prove the Work

Claude will tell you a task is done. Your job is to make "done" mean something verifiable, not a claim. The strongest habit here is to insist on evidence: the test output, the command that ran, the behavior observed in the actual app.

Wire this into the loop. Tell Claude to run the tests and show you the result. Ask it to reproduce the bug before fixing it, so you both know the fix addresses the real thing. For UI changes, have it run the app and confirm the behavior rather than reasoning about it. The pattern is simple — *don't accept "it should work," accept "here's it working"* — and it catches the confident-but-wrong failures that pure code review misses.

---

## 8. Automate the Guardrails with Hooks

Anything you find yourself telling Claude every session is a candidate for a **hook** — a script the harness runs automatically at specific points, like before a tool call or after an edit. Hooks turn "please remember to format the code" from a hope into a guarantee.

The highest-value uses are the boring ones: auto-format on every file write, run the linter after edits, block commands you never want run, validate that tests pass before a change is considered complete. Because hooks are enforced by the harness rather than requested of the model, they don't drift, don't get forgotten in a long session, and don't cost you a reminder every time. Set them up once and the guardrail is just always there.

---

## 9. Scope Permissions Deliberately

The default permission prompts exist for a reason, but answering "yes" to the same safe command forty times a day trains you to click through everything — which is exactly when a genuinely risky action slips past. The fix is to set up your **permissions** on purpose: allow the read-only and routine commands you trust, and reserve the prompts for actions that actually deserve a beat of thought.

Done well, this is both safer and faster. You stop rubber-stamping \`git status\` and \`npm test\`, which means the prompts that *do* appear carry signal again. A few minutes curating an allowlist pays for itself the same day.

---

## 10. Use Worktrees for Parallel Work

When you want Claude working on more than one thing at once — or working on a risky change while you keep using main — **git worktrees** let each task live in its own checked-out copy of the repo. No branch-switching, no stashing, no two agents stepping on each other's files.

This is the unlock for genuinely parallel agentic work: kick off a refactor in one worktree, a bug fix in another, review them independently, merge what's good. It keeps experiments isolated so a half-finished idea never contaminates your working tree, and it scales cleanly as you hand more autonomous work to the agent.

---

## 11. Build Your Own Slash Commands

The first time you type the same multi-step instruction by hand, write it down. **Custom slash commands** let you save a prompt or workflow as \`/your-command\` and invoke it instantly — your code-review checklist, your release steps, your "write tests the way this project writes tests" brief.

The value compounds. Each command you save is a decision you don't have to re-make and a standard you don't have to re-explain. Teams that share a \`.claude\` directory effectively ship their conventions as tooling — a new contributor gets the team's accumulated workflow on day one instead of reverse-engineering it from code review.

---

## 12. Match the Model to the Job

Claude's lineup is tiered for a reason, and the most cost-effective users route work to the right rung instead of defaulting everything to the top. Reserve the most capable models for the genuinely hard, high-stakes, long-horizon work — the migration you only want to do once, the bug three attempts have already missed — and let the workhorse tiers handle the high-volume interactive coding and the subagent fan-out.

The honest metric isn't cost per token, it's cost per *completed* task: tokens spent divided by results you actually kept. A stronger model that finishes in one pass what a cheaper one needed three attempts at is the cheaper choice for that job. Measure it that way and the routing decisions make themselves.

---

## The Pattern Behind the Practices

Read back over the list and one idea runs through all of it: **reduce the number of things Claude has to guess.** A real \`CLAUDE.md\` removes guesses about your project. A plan removes guesses about direction. A front-loaded brief removes guesses about intent. Hooks and permissions remove guesses about what's allowed. Verification removes guesses about whether it worked.

The model is the same whether you do these things or not. What changes is how much of its capability actually reaches your problem instead of getting spent on inferring what you meant. Power users aren't using a different Claude Code. They've just built an environment where the right answer is the path of least resistance — and that environment is something you assemble one habit at a time.

Start with the first two. A good \`CLAUDE.md\` and the discipline to plan before building will move your results more than the other ten combined. Add the rest as the friction they remove starts to bother you.

---

## Further Reading

- [The Complete Guide to CLAUDE.md](/blog/claude-md-guide) — How to write the standing brief that fixes half your mistakes for free
- [Context Engineering for Claude Code](/blog/context-engineering-claude-code) — Treating the context window as a budget you spend deliberately
- [Claude Code Plan Mode: A Practical Guide](/blog/claude-code-plan-mode-guide) — Catching wrong directions while they're still a paragraph
- [The Complete Guide to Claude Code Subagents](/blog/claude-code-subagents-guide) — Fanning out work without flooding your main context
- [Claude Code Hooks: Automate Your Guardrails](/blog/claude-code-hooks-guide) — Turning reminders into enforced behavior
- [Claude Code Permissions, Explained](/blog/claude-code-permissions-guide) — Scoping access so the prompts that appear actually carry signal
- [Claude Code Worktrees Guide](/blog/claude-code-worktrees-guide) — Running parallel agentic work without collisions
- [Claude Code Slash Commands Guide](/blog/claude-code-slash-commands-guide) — Saving your workflows as reusable commands
`,
};
