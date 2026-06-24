import { BlogPost } from "@/lib/types";

export const claudeCodeSkillsVsSubagentsVsMcp: BlogPost = {
  slug: "claude-code-skills-vs-subagents-vs-mcp",
  title:
    "Skills vs Subagents vs MCP vs Hooks: Which Claude Code Extension Should You Use?",
  description:
    "Claude Code has six ways to extend it — CLAUDE.md, skills, subagents, MCP servers, hooks, and plugins — and they overlap just enough to be confusing. This decision guide explains what each one is, when to reach for it, when not to, and how to combine them.",
  publishedDate: "2026-06-24",
  tags: [
    "claude-code",
    "skills",
    "subagents",
    "mcp",
    "hooks",
    "plugins",
    "loops",
    "routines",
    "customization",
    "ai-coding",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "how-to-create-claude-skills",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-subagents-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "mcp-servers-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-hooks-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-md-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "best-claude-code-plugins",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-routines-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-loop-guide",
      relationship: "recommends",
    },
  ],
  content: `# Skills vs Subagents vs MCP vs Hooks: Which Claude Code Extension Should You Use?

If you've spent any time customizing Claude Code, you've hit the question: should this be a **skill**? A **subagent**? An **MCP server**? A **hook**? A line in **CLAUDE.md**? A **plugin**? Or should it just run on a **loop** or a scheduled **routine**?

They all "extend Claude Code," which is exactly why people get stuck. The names don't tell you which job each one is for, and they overlap just enough that two of them can usually be bent to solve the same problem — badly.

Here's the shortcut, and the rest of this guide just unpacks it: **each mechanism answers a different question.** Once you know which question you're asking, the choice is obvious.

- *What should Claude always know?* → **CLAUDE.md**
- *What repeatable task should Claude be able to do on demand?* → **Skill**
- *What big or parallel job needs its own clean context?* → **Subagent**
- *What external system does Claude need to reach?* → **MCP server**
- *What must happen automatically, every time, no matter what the model decides?* → **Hook**
- *When and how often should something run on its own?* → **a \`/loop\` or a routine** (automation is its own axis — more on that below)
- *How do I package and share all of the above?* → **Plugin**

Let's make that concrete.

---

## The 30-Second Comparison

| Mechanism | Who triggers it | What it actually is | Reach for it when… |
|-----------|-----------------|---------------------|--------------------|
| **CLAUDE.md** | Always loaded | Persistent instructions and project context | Claude keeps forgetting a convention it should always follow |
| **Skill** | Claude (auto) or you (\`/name\`) | A bundled prompt + optional scripts and files for one repeatable task | You do the same multi-step thing often and want it packaged |
| **Subagent** | Claude delegates to it | A fresh, isolated context window for a focused job | A task is big, parallelizable, or would pollute your main context |
| **MCP server** | Claude calls its tools | A bridge to an external system (DB, API, browser, SaaS) | Claude needs data or actions that live outside your repo |
| **Hook** | The harness, on lifecycle events | A deterministic shell command tied to an event | Something must run *every* time, regardless of the model's choices |
| **Plugin** | You install it | A package bundling any of the above | You want to share or reuse a whole setup in one step |

The single most useful distinction in that table: **who pulls the trigger.** Skills and subagents are *model-invoked* — Claude decides to use them. Hooks are *deterministic* — the harness fires them on events whether the model likes it or not. MCP is *connectivity* — it just makes external tools available. CLAUDE.md is *context* — it's always there. Plugins are *distribution* — they bundle the rest.

---

## CLAUDE.md: The Things Claude Should Always Know

\`CLAUDE.md\` is a Markdown file Claude Code loads into context automatically at the start of a session. It's not executable and it's not clever — it's a standing brief. Project conventions, the commands to run tests, architectural rules, "never touch this directory," your preferred libraries.

**Use it when:** you find yourself repeating the same correction. "Use pnpm, not npm." "Tests live next to the file." "Don't add comments unless asked." If you've said it twice, it belongs in CLAUDE.md.

**Don't use it when:** the instruction only matters for one specific task (that's a skill), or the knowledge is huge (a 4,000-line CLAUDE.md just burns context on every turn — keep it tight and link out instead).

The trap is bloat. CLAUDE.md is loaded *every* turn, so every line is a tax on your context window. Treat it like a cheat sheet, not a wiki.

---

## Skills: Repeatable Tasks, Packaged

A **skill** is a folder with a \`SKILL.md\` file — a name, a description, an instruction set, and optionally scripts and reference files it can pull in. Claude reads the description and invokes the skill automatically when a request matches, or you can call it explicitly as a slash command.

The key idea: a skill is *progressive disclosure*. The description sits in context cheaply; the full instructions and bundled files only load when the skill actually fires. That makes a skill the right home for a procedure that's too long for CLAUDE.md and too specific to be always-on — generating a release changelog, scaffolding a component to your house style, running your PDF-export pipeline.

**Use it when:** there's a repeatable, multi-step task with a clear procedure — especially one with its own scripts or templates.

**Don't use it when:** you just need Claude to *know* a fact (CLAUDE.md), or the work needs its own isolated context and parallelism (subagent), or it's really about reaching an external system (MCP).

Skills are also the unit most worth borrowing rather than writing. A good chunk of the [Claude Directory skills collection](/skills) is copy-paste-ready. If you do roll your own, the [guide to creating custom skills](/blog/how-to-create-claude-skills) walks through the \`SKILL.md\` format end to end.

---

## Subagents: A Clean Context for a Focused Job

A **subagent** is a separate Claude instance with its own context window, spawned by the main agent to handle one slice of work and report back. Claude Code ships with built-ins like \`Explore\` (read-only search) and \`general-purpose\`, and you can define your own in \`.claude/agents/\` with a name, description, tool allowlist, and model.

Subagents buy you two things money can't otherwise: **context isolation** and **parallelism**. A code search that would dump fifty files into your main context can run in a subagent that reads all fifty and returns a three-line conclusion. And N independent subagents can run at once — review four files in parallel, scout three subsystems simultaneously.

**Use it when:** a task is large, noisy, or embarrassingly parallel — broad searches, multi-file reviews, "go understand this whole subsystem and summarize it."

**Don't use it when:** the task is small and linear (just do it inline), or it's really a reusable procedure (skill), or you need a persistent guardrail (hook). Subagents are also one-shot delegations — they can't carry on a conversation with you, only return a result.

The deeper patterns — agent teams, fan-out, model tiering for cost — are in the [subagents guide](/blog/claude-code-subagents-guide) and the [custom agents guide](/blog/claude-code-agents-guide).

---

## MCP Servers: The Bridge to Everything Outside Your Repo

The **Model Context Protocol** is the open standard for connecting Claude to external systems. An MCP server exposes *tools* (actions Claude can call), *resources* (data it can read), and *prompts*. Connect one and Claude Code can query your Postgres database, open pull requests, drive a browser, read Sentry errors, or hit any API the server wraps.

The litmus test is simple: **does the capability live outside your codebase?** Files, code, and shell commands are already covered by Claude Code's built-in tools — you don't need MCP for those. MCP is for the things Claude *can't* reach on its own: your production database, your issue tracker, your design tool, your observability stack.

**Use it when:** Claude needs to read from or act on an external system.

**Don't use it when:** the "tool" is just a shell script or a code transformation — that's a skill or a plain Bash call, and wrapping it in an MCP server is over-engineering. (For more on when MCP is and isn't the right call, see [Is MCP Dead?](/blog/is-mcp-dead).)

Browse [MCP servers in the directory](/mcp-servers) to see what's already wrapped, and the [complete MCP guide](/blog/mcp-servers-guide) for setup and configuration.

---

## Hooks: The Things That Must Happen Automatically

A **hook** is a shell command the Claude Code harness runs on a lifecycle event — \`PreToolUse\`, \`PostToolUse\`, \`UserPromptSubmit\`, \`Stop\`, \`SessionStart\`, and more. Configured in \`settings.json\`, hooks are the *deterministic* layer: they fire regardless of what the model decides, which is exactly the point.

This is the one mechanism the model doesn't control, and that's its whole value. Auto-format every file after an edit. Block writes to \`.env\`. Run the test suite when Claude says it's done. Log every command for audit. If the rule is "this happens *every* time, no exceptions," a hook is the only tool that guarantees it — a skill or a CLAUDE.md note can be skipped by the model; a hook cannot.

**Use it when:** you need a guardrail or an automation that must run on an event, deterministically.

**Don't use it when:** the action requires judgment about *whether* to run (let the model decide via a skill), or it's a one-off (just ask).

The [hooks guide](/blog/claude-code-hooks-guide) has copy-paste configs for the common cases, and the [directory's hooks collection](/hooks) has more.

---

## Plugins: The Wrapper Around All of It

A **plugin** isn't a seventh kind of thing — it's a *bundle* of the other six. A plugin can ship skills, subagents, hooks, MCP server configs, and slash commands together, installable in one step from a marketplace.

**Use it when:** you've built a setup worth sharing, or you want to install someone else's curated stack (a security-review bundle, a framework-specific toolkit) without wiring up each piece by hand.

**Don't use it when:** you're solving a single problem for a single repo — that's just one skill or one hook, and packaging it as a plugin is premature.

See the [best Claude Code plugins](/blog/best-claude-code-plugins) roundup and the full [plugins collection](/plugins).

---

## The Decision Flow

When you're not sure, walk down this list and stop at the first "yes":

1. **Does it need to reach an external system (DB, API, browser, SaaS)?** → **MCP server.**
2. **Must it run automatically on an event, every time, no exceptions?** → **Hook.**
3. **Should it run on a timer or a schedule, rather than on demand?** → **a \`/loop\` or a routine** (see the next section).
4. **Is it a big, noisy, or parallelizable job that needs its own context?** → **Subagent.**
5. **Is it a repeatable multi-step procedure Claude should do on demand?** → **Skill.**
6. **Is it just something Claude should always know?** → **CLAUDE.md.**
7. **Do you want to share a whole setup in one install?** → **Plugin.**

The order matters: the more specific, infrastructure-y answers (external reach, deterministic events, scheduling) come first, because if one of those fits, it's almost always the right call. The general-purpose context tools (skills, CLAUDE.md) are the fallback.

---

## They Work Best Together

The real power move is combining them. A few patterns that show up constantly:

- **Skill + subagents:** a "review this PR" skill that spawns parallel subagents, one per file, then synthesizes.
- **MCP + skill:** an MCP server connects to your database; a skill wraps the exact query-and-report workflow you run against it weekly.
- **Hook + CLAUDE.md:** CLAUDE.md says "we use Prettier"; a \`PostToolUse\` hook actually runs it, so the rule can't be forgotten.
- **Plugin = all of it:** a single \`security-review\` plugin ships the skill, the subagents, the hooks, and the MCP config as one install.

You're not picking *one* mechanism for your whole workflow. You're picking the right one for each piece.

---

## Where Loops and Routines Fit

A fair objection: what about \`/loop\` and routines? They're real, they're current, and they're deliberately *not* in the table above — because they sit on a different axis.

The six mechanisms so far answer **"what can Claude do, know, or reach?"** Loops and routines answer **"when and how often does the work run?"** That's automation, not capability — and it comes in three flavors worth keeping straight:

- **Hooks** — *event-based.* Fire on a lifecycle event (a tool call, a session start, a stop). Deterministic, in-session, and free. Covered above.
- **\`/loop\`** — *interval-based, in your session.* Runs a prompt or slash command repeatedly inside your *active* session, on your machine — "re-run the failing test every 5 minutes," "keep polling this PR until it's green." It lives and dies with the session that started it.
- **Routines** — *schedule- or trigger-based, in the cloud.* A saved prompt that runs unattended on a cron schedule, a webhook, or a GitHub event — no open session required. This is the autopilot tier.

The clean mental model: **hooks react to events, \`/loop\` repeats on a timer while you're watching, and routines run on their own when you're not.** So if your question is "how do I make Claude do this automatically on a cadence," the answer isn't a skill or a subagent — it's a loop (you're around) or a routine (you're not). The [\`/loop\` guide](/blog/claude-code-loop-guide) covers the in-session side and the [routines guide](/blog/claude-code-routines-guide) covers the cloud side, end to end.

Note the natural pairing: the *what* and the *when* combine. A routine's saved prompt usually *invokes a skill*, which may *delegate to subagents* and *call MCP tools* — the automation layer decides when work runs, and the extension layer decides what that work is.

---

## Frequently Asked Questions

### What's the difference between a skill and a subagent?

A **skill** is a packaged set of instructions (plus optional scripts) that runs in your current context — it's *what* to do. A **subagent** is a separate Claude instance with its own context window — it's *where* the work runs. Use a skill for a repeatable procedure; use a subagent when that work is large or parallel enough that it shouldn't crowd your main session. They compose: a skill can delegate to subagents.

### When should I use an MCP server instead of a skill?

Use an **MCP server** when the capability lives *outside* your codebase — a database, an API, a browser, a SaaS product. Use a **skill** when the work is a procedure over things Claude can already touch (your files, code, and shell). If you catch yourself building an MCP server just to run a local script, you want a skill instead.

### Are slash commands the same as skills?

They're closely related. A **skill** can be invoked two ways: automatically, when Claude matches your request to its description, or explicitly, when you type it as a \`/slash-command\`. Slash commands are the manual entry point into a skill — same underlying mechanism, different trigger.

### Do hooks cost tokens?

No. Hooks are shell commands run by the harness, not by the model — they don't consume context or tokens the way a skill or subagent does. That's part of why they're the right tool for always-on guardrails: they're deterministic *and* free.

### Are \`/loop\` and routines extensions like skills or hooks?

Not quite — they're *automation*, a different axis. Skills, subagents, MCP, and hooks change *what Claude can do*; loops and routines change *when it runs*. \`/loop\` repeats a prompt inside your active session on an interval, on your machine; **routines** run a saved prompt unattended in the cloud on a schedule or trigger. Reach for them when the question is about cadence, not capability — and note they usually call the extension mechanisms (a routine that runs a skill, for example) rather than replace them.

### What's the simplest way to start customizing Claude Code?

Start with **CLAUDE.md** — write down the conventions you keep repeating. Then add a **skill** for the first multi-step task you do often. Reach for subagents, MCP servers, and hooks only when you hit the specific need each one solves. Don't build infrastructure you don't have a problem for yet.

---

## The Bottom Line

The six mechanisms aren't competitors — they're a toolkit, and the confusion only comes from trying to pick a favorite instead of matching the tool to the job:

- **CLAUDE.md** for what Claude should always know.
- **Skills** for repeatable tasks, packaged.
- **Subagents** for big or parallel work that needs a clean context.
- **MCP servers** to reach the world outside your repo.
- **Hooks** for what must happen automatically, every time.
- **Plugins** to bundle and share it all.

And on the automation axis, **loops and routines** decide *when* that work runs — on a timer in your session, or on a schedule in the cloud.

Learn the question each one answers, and you'll stop guessing.

---

## Further Reading

- [How to Create Custom Claude Code Skills](/blog/how-to-create-claude-skills) — the \`SKILL.md\` format, end to end
- [Claude Code Subagents Guide](/blog/claude-code-subagents-guide) — fan-out, agent teams, and cost-aware model tiering
- [The Complete Guide to MCP Servers](/blog/mcp-servers-guide) — what MCP is and how to connect your first server
- [Claude Code Hooks: The Complete Guide](/blog/claude-code-hooks-guide) — copy-paste configs for the common automations
- [The CLAUDE.md Guide](/blog/claude-md-guide) — how to write project context that pays for its place
- [Claude Code /loop](/blog/claude-code-loop-guide) — run a prompt on a repeating interval inside your session
- [Claude Code Routines: Putting Claude on Autopilot](/blog/claude-code-routines-guide) — scheduled cloud agents, and how they differ from \`/loop\`
- [Best Claude Code Plugins](/blog/best-claude-code-plugins) — curated bundles worth installing today
`,
};
