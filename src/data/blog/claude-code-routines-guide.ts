import { BlogPost } from "@/lib/types";

export const claudeCodeRoutinesGuide: BlogPost = {
  slug: "claude-code-routines-guide",
  title:
    "Claude Code Routines: Putting Claude on Autopilot (2026 Guide)",
  description:
    "Routines turn a saved Claude Code prompt into an unattended cloud agent that runs on a schedule, on a webhook, or on a GitHub event. Here is what they are good at, what they are not, and how to set up your first one.",
  publishedDate: "2026-05-09",
  tags: [
    "claude-code",
    "routines",
    "automation",
    "scheduled-tasks",
    "github-actions",
    "cloud",
    "workflow",
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
      slug: "blog-claude-managed-agents",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-remote-control",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-dispatch-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-hooks-guide",
      relationship: "recommends",
    },
  ],
  seoTitle:
    "Claude Code Routines (2026): Schedule, Webhook, and GitHub-Triggered Agents",
  seoDescription:
    "A practical guide to Claude Code routines: scheduled cloud sessions, API triggers, and GitHub event automation. What they replace, where they break, and how to ship one well.",
  content: `# Claude Code Routines: Putting Claude on Autopilot

For most of Claude Code's life, the model has needed you sitting in front of it. You typed a prompt, it did some work, you reviewed, you typed again. The session lived and died with the terminal it was opened in.

Routines change that.

A routine is a saved Claude Code configuration — a prompt, one or more repositories, an environment, a set of connectors — that runs autonomously on Anthropic-managed cloud infrastructure when something tells it to. That something can be a schedule, a webhook from your monitoring tool, or a GitHub event. The session runs without you, makes commits or opens PRs as you, and posts results back through whatever channels you wired in.

This is a different shape of automation than what most engineering teams are used to. Cron jobs run scripts. CI runs scripts. Routines run a model that runs scripts, and the loop in the middle is where the leverage lives.

This guide is the practical version: what routines are actually good for, where they fall over, how to set up the first one, and the trade-offs that are not obvious from the docs.

---

## What a Routine Actually Is

Strip away the marketing and a routine is three things bound together:

1. **A saved prompt.** Self-contained, autonomous, no follow-up. The same prompt runs every time the routine fires.
2. **A cloud session context.** Repositories that get cloned at the start of each run, an environment that controls network access and secrets, and connectors that give Claude reach into Slack, Linear, Sentry, Drive, or whatever else you have wired up.
3. **One or more triggers.** A schedule, an API endpoint, a GitHub event filter — or any combination.

When a trigger fires, Anthropic spins up a fresh Claude Code session with that exact configuration. There is no permission-mode picker, no interactive approvals, no human in the loop. Claude reads the prompt, looks at the repositories, calls connectors, runs shell commands, and either commits work to a \`claude/\`-prefixed branch, opens a PR, posts a message, or calls a tool — whatever the prompt told it to do.

The result is a session that shows up in your sessions list like any other. You can open it, read the transcript, see the changes, and continue the conversation manually if you want.

The whole thing runs on Anthropic infrastructure, which means it keeps working when your laptop is closed, your Wi-Fi drops, or you are on a plane.

---

## Where This Lives in the Toolbox

Before going further, it is worth being precise about what routines replace and what they do not.

Routines are **not** [hooks](/blog/claude-code-hooks-guide). Hooks fire on harness events inside an open session — they are local, synchronous, and tightly coupled to the user typing. Routines are remote, asynchronous, and run without a user.

Routines are **not** GitHub Actions. Actions run a script. Routines run an autonomous model that calls scripts and connectors. The two can complement each other: a GitHub Action can do the cheap, deterministic work and a routine can do the part that needs reading code and reasoning about it.

Routines are **not** in-session schedulers like \`/loop\`. Those run a prompt repeatedly inside an active session, on your machine. Routines run in the cloud, on their own.

Routines are **adjacent to** [Claude Code on the web](/blog/blog-claude-managed-agents) and [remote-triggered sessions](/blog/claude-code-remote-control). Web sessions are interactive, manually started, cloud-hosted Claude Code sessions. Routines are unattended cloud sessions that fire on triggers. They share the same underlying environment model and run cap.

If you can describe the work as "every weeknight at 6, do X" or "whenever a PR opens, do Y" or "when our alerting system pages, run Z" — that is the routine shape.

---

## The Trigger Types, And When Each One Earns Its Slot

A single routine can attach any combination of triggers. In practice you tend to pick one and lean on it.

### Schedule

The simplest. The routine runs hourly, daily, on weekdays, weekly, or on a custom cron expression with a one-hour minimum interval. Times are entered in your local zone and converted automatically, so the run fires at the wall-clock time you wrote regardless of where the cloud infrastructure happens to be that day.

There is also a one-off variant: schedule a routine to fire once at a specific future timestamp, after which it auto-disables. This is the underrated one. It is the cheapest possible "remind future-me to handle this" mechanism — a cleanup PR after a flag rollout, a follow-up on an upstream library bump, a check-back after a deploy soaks for a week. One-off runs do not count against the daily routine cap, only against your subscription usage like a normal session.

A schedule is the right trigger when the work is calendar-driven rather than event-driven. Backlog grooming, weekly reports, monthly audits. Anything where "the work piles up over time and somebody needs to deal with it" is the actual problem.

### API

The routine gets a dedicated HTTP endpoint and a bearer token. POSTing to it starts a session. The body accepts an optional \`text\` field — freeform, not parsed — which gets passed alongside the saved prompt as run-specific context.

A typical call from a shell:

\`\`\`bash
curl -X POST https://api.anthropic.com/v1/claude_code/routines/trig_01ABC.../fire \\
  -H "Authorization: Bearer sk-ant-oat01-xxxxx" \\
  -H "anthropic-beta: experimental-cc-routine-2026-04-01" \\
  -H "anthropic-version: 2023-06-01" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Sentry alert SEN-4521 fired in prod. Stack trace attached."}'
\`\`\`

You get back a session ID and URL you can open in a browser to watch the run live.

The API trigger is the right shape when the routine needs to run *because something happened in another system*. Your alerting tool. Your CD pipeline. Your internal admin dashboard with a "kick off the cleanup" button. Anywhere you can make an authenticated POST.

The token is shown once and cannot be retrieved later. Treat it the way you would any production secret: store it in your alerting tool's secret store or a vault, not a checked-in config file. Rotation is one click in the routine's edit page.

The endpoint ships under a dated beta header (\`experimental-cc-routine-2026-04-01\`), which is Anthropic's polite way of saying request and response shapes may change. The two most recent dated headers continue to work, so you have time to migrate when they do.

### GitHub Event

The routine subscribes to repository events: pull requests opened, closed, synchronized, labeled; releases created, published, edited. Each matching event starts its own session — there is no event coalescing, so two PR updates produce two independent runs.

Filters narrow what counts as a match. You can filter by author, title, body, base branch, head branch, labels, draft state, or merged state, and combine them with operators like equals, contains, starts with, is one of, or matches regex.

The regex operator catches people. It tests the entire field value, not a substring. If you want to catch any title containing "hotfix", you write \`.*hotfix.*\`, not \`hotfix\`. For literal substring matching, \`contains\` is faster to read and harder to get wrong.

GitHub triggers are the right shape for code-shaped events: PR review, release notes, library port, automatic backport. The pattern is "every time *this kind of thing* happens in the repo, do *this kind of work*."

There is an installation step that is easy to miss: the Claude GitHub App must be installed on the repository for webhook delivery to work. \`/web-setup\` in the CLI grants clone access but does not install the app; the trigger setup prompts you to install it explicitly. If your routine looks correctly configured but never fires, that is the first thing to check.

During the research preview there are per-routine and per-account hourly caps on webhook events. Events beyond the cap are dropped. Your current limits show up at \`claude.ai/code/routines\`.

---

## The Use Cases That Actually Pay Off

The example library Anthropic ships is a useful starting point, but the underlying pattern across all of them is the same: **unattended, repeatable, tied to a clear outcome.** Routines are bad at exploration. They are good at the kind of work where you already know what success looks like and the only cost is somebody having to actually go do it.

A non-exhaustive list of the shapes that survive contact with reality:

**Backlog grooming.** Schedule trigger, weeknights. The routine reads issues opened since the last run via your tracker connector, applies labels, assigns owners based on the area of code referenced in the description, and posts a Slack summary so the team starts the day with a queue that already has triage applied.

**Alert triage.** API trigger from your monitoring tool. The routine pulls the stack trace, correlates it with recent commits in the affected paths, and opens a draft PR with a proposed fix and a link back to the alert. On-call reviews a PR instead of starting from a blank terminal at 3am.

**Bespoke code review.** GitHub trigger on \`pull_request.opened\`. The routine applies your team's own checklist — security, performance, style — leaves inline comments where they apply, and posts a summary so human reviewers can spend their attention on design rather than mechanical checks. The native Claude Code review action handles the generic version; a routine is what you reach for when "your team's checklist" is the actual ask.

**Deploy verification.** API trigger from your CD pipeline after each production deploy. The routine runs smoke checks against the new build, scans error logs for regressions, and posts a go or no-go to the release channel before the deploy window closes.

**Docs drift.** Schedule trigger, weekly. The routine scans merged PRs since the last run, flags documentation that references changed APIs, and opens update PRs against the docs repo for an editor to review. This is the kind of work that nobody is supposed to forget but everybody does.

**Library port.** GitHub trigger on \`pull_request.closed\` filtered to merged PRs in one SDK repo. The routine ports the change to a parallel SDK in another language and opens a matching PR. This is one of the cleanest applications: the source of truth for the change exists, the target shape is known, and the only cost is a person actually doing the typing.

**One-off scheduled cleanups.** Schedule a one-time run two weeks out: "remove the feature flag we just rolled to 100%". The routine fires once, opens the PR, auto-disables. You never had to add a calendar reminder.

The pattern across all of these is that the work is real, the prompt is bounded, and there is a clear artifact at the end — a PR, a Slack message, a labeled issue. Routines that do not produce an artifact tend to drift. If you cannot describe what success looks like, the routine is probably not where the problem is.

---

## Creating Your First Routine

Three surfaces, same backend account: web, Desktop app, and CLI. A routine you create in any of them shows up in the others immediately.

The fastest path for a first attempt is the CLI. From any session:

\`\`\`text
/schedule daily PR review at 9am
\`\`\`

Or for a one-off:

\`\`\`text
/schedule in 2 weeks, open a cleanup PR that removes the FEATURE_FLAG_X gate
\`\`\`

Claude walks through the rest of the configuration conversationally and saves the routine to your account. \`/schedule list\` shows everything you have, \`/schedule update\` edits one, \`/schedule run\` triggers it immediately.

The CLI only creates schedule triggers. To add an API or GitHub trigger, edit the routine on the web at \`claude.ai/code/routines\`.

The web form is the full surface: name, prompt, repositories, environment, connectors, permissions, triggers. The two parts that get rushed and shouldn't are the **prompt** and the **environment**.

The prompt has to be self-contained. The routine runs autonomously, with no follow-up and no clarifying questions, so anything ambiguous in the prompt becomes a coin flip on every run. Spell out what to do, what success looks like, what edge cases to skip, and where to send the result. A prompt that works as a one-shot will likely work as a routine; a prompt that depends on you saying "actually, also..." will not.

The environment controls what the cloud session can reach over the network. The default environment uses the **Trusted** access level, which allows package registries, cloud provider APIs, container registries, and common dev domains, and blocks everything else. If your routine needs to hit your own internal service or a domain not on the default allowlist, edit the environment's allowed domains *before* the first run, or you will spend the first debugging cycle staring at \`403\` responses with \`x-deny-reason: host_not_allowed\`.

MCP connector traffic is routed through Anthropic's servers, so connectors work without their hosts being added to allowed domains. That is convenient and also a reminder to remove connectors the routine does not need: each included connector is a tool Claude can call without asking, including writes.

---

## Repositories, Branches, and the Default-Safe Behavior

Every repository you add to a routine is cloned on each run, starting from the default branch. By default, Claude can only push to branches prefixed with \`claude/\`. This is not a limitation, it is a feature: it prevents an autonomous routine from accidentally writing to \`main\` or a long-lived release branch.

For the rare routine that genuinely needs to push to existing branches — a backport routine, say, that lands changes on a release branch — there is an **Allow unrestricted branch pushes** toggle per repository in the routine's permissions. Turn it on with intent. Once a routine can push to anything, you are trusting the prompt and the model to never make a mistake on a protected branch, and that trust is heavier than it looks.

The simpler pattern most teams settle on: routines open PRs from \`claude/\`-prefixed branches, and a human or a separate review routine merges them. The cost is one extra click; the safety margin is large.

---

## Usage, Limits, and What "Green" Actually Means

Routines draw from your subscription usage the same way interactive sessions do. There is also a separate daily cap on how many routine runs can start per account. You can see both numbers at \`claude.ai/code/routines\` or in your account usage settings. When you hit the cap, organizations with extra usage enabled keep running on metered overage; without it, additional runs are rejected until the window resets.

One-off scheduled runs are exempt from the daily routine cap. They still consume regular subscription usage like any other session.

The thing that catches people is the run status indicator. **Green does not mean the task succeeded.** Green means the session started and exited without an infrastructure error. Whether Claude actually did the right thing is a question only the transcript can answer. Blocked network requests, missing connector tools, ambiguous prompts, and task-level failures all surface inside the session, not in the green dot.

The discipline this implies: when you set up a new routine, watch the first three or four runs end-to-end. Open the session, read what Claude did, confirm it matches what you wanted. After that you can trust the green dot more, but only because you have evidence.

---

## Plans and Admin Controls

Routines are available on Pro, Max, Team, and Enterprise plans with Claude Code on the web enabled. They belong to your individual claude.ai account — they are not shared across teammates, and anything a routine does through your connected GitHub identity or connectors appears as you. Commits are your commits. Slack messages are from your account. Linear issues are filed by you.

Team and Enterprise admins have a Routines toggle in admin settings. When disabled, existing routines stop running and members cannot create new ones. If a routine that was working suddenly fails with "Routines are disabled by your organization's policy", that toggle is the first place to look — it cannot be overridden from local settings.

---

## What This Replaces

A short, partial list of the work that quietly disappears once a few routines are running:

- The "I should write a script for this" cron job that nobody writes because writing scripts that do *judgment* work is hard.
- The Monday-morning catchup ritual that exists because nothing automatically read the weekend's events for you.
- The 3am "what did this alert mean" page where on-call has to start from a blank terminal.
- The recurring backport task that falls off somebody's plate every quarter.
- The two-weeks-from-now cleanup that you swore you would remember.

None of these are dramatic individually. They are the kind of thing that gets normalized into "engineering operations" and slowly burns hours that nobody is counting. Routines do not replace any of them perfectly. They do replace the *worst* version of each.

---

## What to Try This Week

If you have never set up a routine before, the lowest-risk thing to do is the most boring one: pick a recurring task you genuinely have, and schedule it.

Backlog summary at 8am. Weekly docs-drift check on Friday. PR review on \`pull_request.opened\` for one specific repo. Pick the smallest version of the smallest task, write the prompt as if you were briefing a contractor who has never seen the codebase, and let it run for a week.

Watch the first runs. Open the sessions. Read what Claude did. Adjust the prompt. Add the next routine.

The point is not to automate everything. The point is to find the seam between work that wants a human in the loop and work that does not, and to stop spending attention on the second category.
`,
};
