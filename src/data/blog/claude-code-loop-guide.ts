import { BlogPost } from "@/lib/types";

export const claudeCodeLoopGuide: BlogPost = {
  slug: "claude-code-loop-guide",
  title: "Claude Code /loop: Run a Prompt on a Schedule Without Leaving Your Session",
  description:
    "The /loop command runs a prompt or slash command on a repeating interval inside your active Claude Code session — polling a deploy, babysitting tests, iterating until something passes. Here's how it works, when to use it, and how it differs from routines.",
  publishedDate: "2026-06-24",
  tags: [
    "claude-code",
    "loops",
    "automation",
    "slash-commands",
    "routines",
    "ai-coding",
    "productivity",
  ],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "claude-code-routines-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-skills-vs-subagents-vs-mcp",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-slash-commands-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-hooks-guide",
      relationship: "recommends",
    },
  ],
  content: `# Claude Code /loop: Run a Prompt on a Schedule Without Leaving Your Session

Some work isn't one-and-done. You want Claude to *keep* doing something — check the deploy every few minutes until it's green, re-run the failing test after each fix, poll a long migration, watch a queue. You could babysit it yourself, hitting enter every time. Or you could hand the repetition to \`/loop\`.

\`/loop\` runs a prompt or a slash command **repeatedly, on an interval, inside your current session**. It's the simplest automation primitive in Claude Code: no config files, no cloud setup, no cron syntax to memorize. You type one line and Claude keeps going until you stop it or the goal is met.

This guide covers what \`/loop\` is, the two ways to run it, the jobs it's genuinely good at, the ones it isn't, and exactly how it differs from [routines](/blog/claude-code-routines-guide) — the cloud-based cousin people constantly confuse it with.

---

## What /loop Actually Does

\`/loop\` takes a task and re-runs it on a cadence in your live session. Each iteration is a real Claude turn: it reads the current state, does the work, and reports back, then waits for the next tick.

The basic form takes an interval and a task:

\`\`\`
/loop 5m check the deploy status and tell me if it's live yet
\`\`\`

You can loop a **slash command** just as easily — handy for re-running a skill or a saved workflow:

\`\`\`
/loop 10m /babysit-prs
\`\`\`

Intervals are short and human: \`30s\`, \`5m\`, \`1h\`. Every tick, Claude runs the task fresh, so it always sees the *current* state — the latest CI result, the newest queue depth, the file as it is now.

Two things make this different from just asking Claude to "keep checking":

- **It's deterministic about cadence.** The loop fires on schedule, not whenever the conversation happens to wander back to it.
- **It's hands-off.** You start it once and walk away. The session does the repeating, not you.

---

## The Two Modes: Fixed Interval vs. Self-Paced

\`/loop\` runs in one of two modes, and picking the right one matters.

**Fixed interval — you set the clock.** Give it an interval and it fires on that schedule, full stop. This is what you want when the *thing you're watching* changes on its own timeline and you just need to check in:

\`\`\`
/loop 2m poll the build at https://ci.example.com/job/42 and ping me the moment it finishes
\`\`\`

**Self-paced — Claude sets the clock.** Omit the interval and you hand pacing to the model. It decides how long to wait before the next iteration based on what's happening — checking more often when things are moving, backing off when they're idle:

\`\`\`
/loop keep refining the failing test until the suite passes, then stop
\`\`\`

The rule of thumb: **use a fixed interval when an external clock drives the work** (a deploy that takes ~8 minutes, a queue you check every 30 seconds), and **let it self-pace when the work itself drives the rhythm** (iterate, evaluate, decide whether to go again). Self-pacing also avoids a classic waste — hammering a check every 60 seconds when the thing you're waiting on only changes every 10 minutes.

---

## When /loop Is the Right Tool

\`/loop\` shines on **short-horizon, in-session repetition** — work you'd otherwise sit and babysit:

- **Polling external state.** "Watch the deploy / the CI run / the queue and tell me when it changes." The canonical use case.
- **Iterate-until-green.** "Run the tests, fix what fails, repeat until they pass." The loop carries the goal across attempts so you don't re-prompt each round.
- **Monitoring during a work session.** Keep an eye on error rates, a long-running job's progress, or a metric while you do something else in the same terminal.
- **Periodic housekeeping while you work.** Re-run a lint pass or a status summary every N minutes during a long session.

The common thread: you're **present**, the horizon is **minutes to hours**, and the value is in *not* having to manually re-trigger the same step.

---

## When /loop Is the Wrong Tool

\`/loop\` is in-session and model-driven, which makes it the wrong choice for a few things:

- **It stops when your session does.** Close the terminal, lose the connection, or shut the laptop and the loop ends. For anything that must run unattended — overnight, while you're away, on a real schedule — you want a **routine**, not a loop.
- **It costs tokens every tick.** Each iteration is a full Claude turn. A tight interval on a long-running watch can burn through tokens fast. Match the interval to how often the state actually changes, and prefer self-pacing for idle waits.
- **It's not for one-off work.** If you just need something done once, ask once. \`/loop\` is for repetition.
- **It's not an event trigger.** "Do X *when a file changes*" or "block commits to main" is a [hook](/blog/claude-code-hooks-guide), which fires deterministically on a harness event — not a loop polling for the event.

---

## /loop vs. Routines: The Distinction That Trips Everyone Up

These two get conflated constantly because both "run Claude on a schedule." The difference is **where they run and whether you need to be there.**

| | \`/loop\` | Routines |
|---|----------|----------|
| **Where it runs** | Your active session, on your machine | The cloud, on Anthropic's infra |
| **Needs you present?** | Yes — dies with the session | No — runs unattended |
| **Trigger** | Interval (or self-paced) | Cron schedule, webhook, or GitHub event |
| **Setup** | One line, zero config | A saved prompt + configuration |
| **Best horizon** | Minutes to hours | Days, weeks, ongoing |
| **Typical job** | Babysitting a deploy while you work | The nightly dependency-bump PR |

The one-sentence version: **\`/loop\` repeats on a timer while you're watching; a routine runs on its own when you're not.** If you'd close the laptop and expect the work to continue, that's a routine — start with the [routines guide](/blog/claude-code-routines-guide). If you're at the keyboard and just don't want to keep hitting enter, that's \`/loop\`.

---

## Practical Tips

A few things that make \`/loop\` behave:

- **Give it a stop condition.** "...until the suite passes, then stop" or "...until the deploy is live" lets the loop end itself. Without one, it runs until *you* stop it — fine for open-ended monitoring, wasteful otherwise.
- **Match the interval to reality.** If the deploy takes eight minutes, don't poll every 30 seconds — you'll pay for fifteen checks that all say "still building." Poll every two minutes, or self-pace.
- **Loop a slash command for anything non-trivial.** Inline prompts are great for quick checks; for a real procedure, wrap it in a [slash command or skill](/blog/claude-code-slash-commands-guide) and loop *that*. The loop stays readable and the logic is reusable.
- **Watch the token cost on long watches.** A loop that runs for hours is a lot of turns. Self-pacing and a sensible interval are your main levers.
- **Stop it when you're done.** Interrupt the session to end the loop. It won't outlive the session, but it also won't stop on its own unless you gave it a condition.

---

## Where /loop Fits in the Bigger Picture

\`/loop\` is one piece of Claude Code's automation story, and it helps to see the whole shape:

- **Hooks** react to *events* — deterministic, on a file edit or session stop.
- **\`/loop\`** repeats on a *timer*, in your session, while you're there.
- **Routines** run on a *schedule or trigger*, in the cloud, while you're not.

All three are about *when* work runs — a different axis from *what* Claude can do, which is the job of skills, subagents, and MCP servers. For the full map of how these fit together, see [Skills vs Subagents vs MCP vs Hooks](/blog/claude-code-skills-vs-subagents-vs-mcp).

\`/loop\` is the one you reach for most casually: no setup, no commitment, just "keep doing this until I say stop." For everything that needs to outlive your session, graduate to a routine.

---

## Further Reading

- [Claude Code Routines: Putting Claude on Autopilot](/blog/claude-code-routines-guide) — the unattended, cloud-based counterpart to \`/loop\`
- [Skills vs Subagents vs MCP vs Hooks](/blog/claude-code-skills-vs-subagents-vs-mcp) — how every extension and automation mechanism fits together
- [The Complete Guide to Claude Code Slash Commands](/blog/claude-code-slash-commands-guide) — build the reusable commands worth looping
- [Claude Code Hooks: The Complete Guide](/blog/claude-code-hooks-guide) — event-based automation, the third kind
`,
};
