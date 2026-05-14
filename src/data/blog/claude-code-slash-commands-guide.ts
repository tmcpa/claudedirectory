import { BlogPost } from "@/lib/types";

export const claudeCodeSlashCommandsGuide: BlogPost = {
  slug: "claude-code-slash-commands-guide",
  title:
    "Claude Code Slash Commands: A Complete Guide to Custom Commands (2026)",
  description:
    "Slash commands are the cheapest, fastest way to make Claude Code do exactly what your team does, the same way every time. Here is what they are, when to use them over a skill, and how to write ones people actually keep.",
  publishedDate: "2026-05-14",
  tags: [
    "claude-code",
    "slash-commands",
    "custom-commands",
    "skills",
    "configuration",
    "productivity",
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
      slug: "claude-code-cheat-sheet",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "how-to-create-claude-skills",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-hooks-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-subagents-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "best-claude-code-plugins",
      relationship: "recommends",
    },
  ],
  seoTitle:
    "Claude Code Slash Commands (2026): How to Create Custom Commands That Stick",
  seoDescription:
    "A practical guide to building custom slash commands in Claude Code. File layout, frontmatter, arguments, when to pick a command over a skill or subagent, and the patterns that survive on real teams.",
  content: `# Claude Code Slash Commands: A Complete Guide to Custom Commands

Every Claude Code user has a handful of things they type into the prompt over and over. "Look at the failing test and tell me what's wrong." "Open a PR with a summary of the diff." "Run the lint, fix what's auto-fixable, leave the rest." Each of these is a paragraph. Each of those paragraphs gets retyped, paraphrased, or copy-pasted from a Notion doc fifty times a week.

Slash commands are the fix. A slash command is a saved prompt — sometimes a couple of lines, sometimes a whole playbook — that you invoke by typing \`/name\` in a session. Claude reads the file, executes whatever it says, and the work happens the same way every time.

This guide is the version that gets past "they exist" and into "here's when to use them, how to write ones that don't rot, and where they sit relative to [skills](/blog/how-to-create-claude-skills), [subagents](/blog/claude-code-subagents-guide), and [hooks](/blog/claude-code-hooks-guide)."

---

## What a Slash Command Actually Is

Strip the marketing and a slash command is a Markdown file in a specific directory. The filename becomes the command name. The body becomes the prompt that gets injected into the session when you invoke it.

That is it. There is no DSL, no plugin manifest, no compile step. If you can write a paragraph in a text editor, you can ship a slash command.

Two locations matter:

- **Project commands** live in \`.claude/commands/\` inside the repo. They get checked into git, ride along with the project, and apply to every teammate who clones the repo.
- **Personal commands** live in \`~/.claude/commands/\` in your home directory. They follow you across every project, and only you see them.

A command in \`.claude/commands/ship-it.md\` shows up as \`/ship-it\` in any session opened in that repo. A command in \`~/.claude/commands/standup.md\` shows up as \`/standup\` everywhere.

Subdirectories become namespaces. \`.claude/commands/release/notes.md\` becomes \`/release:notes\`. This matters once you have more than ten commands and the autocomplete starts feeling crowded.

---

## A First Command, In Its Entirety

The smallest useful command is a single line. Drop this into \`.claude/commands/recap.md\`:

\`\`\`markdown
Summarize the diff against main as a 3-bullet PR description. No emojis, no marketing language.
\`\`\`

In any session, type \`/recap\` and Claude treats those instructions as a fresh user message. It runs \`git diff\`, reads the changes, and writes a PR description in your preferred style.

That's the whole shape. Everything else in this guide is variations on it.

---

## Frontmatter: The Few Knobs Worth Knowing

A slash command file can include YAML frontmatter at the top to tweak how the command behaves. The fields you'll actually use:

\`\`\`markdown
---
description: Open a PR with a summary of the current branch
argument-hint: [optional reviewer handle]
allowed-tools: Bash(git:*), Bash(gh:*)
model: claude-sonnet-4-6
---

Look at the current branch's diff against main. ...
\`\`\`

- **description** — One line shown in the slash-command picker. If you skip it, the picker shows the first line of the body, which is rarely what you want.
- **argument-hint** — Placeholder text shown in the input. Purely cosmetic, but it tells the user what shape of input the command wants.
- **allowed-tools** — A whitelist of tools the command is permitted to call without prompting. Narrow to what the command actually needs. \`Bash(git:*)\` lets it run any git subcommand; \`Bash(git status)\` only lets it run that exact command.
- **model** — Override the session's model for this command. Useful for routing cheap, mechanical commands to Haiku and reserving Opus for the heavier work.

You can ignore all of it for personal commands and most of it for project commands. The two fields that consistently earn their slot are \`description\` (so people in the team can read the picker) and \`allowed-tools\` (so the command doesn't have to prompt for permission every run).

---

## Arguments: The \`$ARGUMENTS\` Pattern

A command becomes a tool the moment it accepts input. Anything after the slash command in the prompt is available as \`$ARGUMENTS\` inside the command body:

\`\`\`markdown
---
description: Open a PR and tag a reviewer
argument-hint: <github-handle>
---

Open a PR for the current branch with a clear title and 3-bullet summary, then request review from @$ARGUMENTS.
\`\`\`

Invoking \`/pr alice\` substitutes \`alice\` into the prompt before Claude sees it. \`/pr alice bob\` substitutes \`alice bob\`. There is no positional parsing — \`$ARGUMENTS\` is the entire trailing string and you treat it as one blob.

For commands that need structure, write the prompt to expect a structured blob and let Claude parse it: "Treat \`$ARGUMENTS\` as a comma-separated list of file paths. For each one..." This is more durable than trying to invent a syntax.

---

## When a Slash Command Is the Right Tool — and When It Isn't

Slash commands sit in a narrow band. They are great for one thing and bad for several others.

**Use a slash command when:**

- The prompt is the same every time, with at most one or two slots that vary.
- The work is short enough to live in the active session — you want the context, the model's attention, and the result in front of you.
- You want it under version control alongside the code it operates on.
- A teammate could pick up the command and use it without reading documentation.

**Use a [skill](/blog/how-to-create-claude-skills) instead when:**

- The behavior should activate *automatically* based on what Claude is doing — not because the user typed something.
- It bundles non-trivial supporting files (templates, examples, scripts) that need to live next to the instructions.
- It encodes domain knowledge ("how this team writes migrations") rather than a single repeatable action.

**Use a [subagent](/blog/claude-code-subagents-guide) instead when:**

- The work needs its own context window and shouldn't pollute the main session.
- You want a specialized persona — a reviewer, an explorer, an architect — with its own tool allowlist.
- The output is a report back to the parent session, not a continuation of the conversation.

**Use a [hook](/blog/claude-code-hooks-guide) instead when:**

- The action should fire automatically on a harness event (file edit, session stop, tool call) rather than on user input.
- The trigger is mechanical — formatting, lint-on-save, blocking commits to main — and shouldn't need a model in the loop.

A useful heuristic: if you would type the same paragraph in chat to start the work, that is a slash command. If you would prefer Claude to *just know* to do the work without being asked, that is a skill or a hook. If the work needs its own brain, that is a subagent.

---

## Patterns That Survive

The commands that stick around on a real team tend to have a few things in common.

### One Command, One Outcome

The strongest commands have a single, observable artifact at the end. \`/pr\` opens a PR. \`/release-notes\` writes release notes. \`/triage\` labels an issue.

Commands that try to be utilities ("/dev — does whatever you need") drift. Nobody remembers what they're for, the prompt grows to handle every case, and eventually it's just a worse version of typing the request directly.

### The Prompt Is the Spec

Treat the body of the command as the contract for what success looks like. Spell out:

- What to read first.
- What to do.
- What to skip.
- What format the output should take.
- Where to put the result (commit, PR comment, terminal output, file path).

A command that says "review this PR" produces ten different reviews. A command that says "review this PR for security issues only, ignoring style and naming, and post inline comments where you find something exploitable" produces something close to the same review every time.

### Bind the Tools, Not Just the Words

The \`allowed-tools\` frontmatter is not just a permission convenience. It's a way of declaring intent. A \`/lint\` command that lists \`Bash(npm run lint:*)\` and nothing else can't accidentally start editing files. A \`/deploy-check\` that lists \`Bash(gh:*)\` and \`Read\` can't push.

The narrower the surface, the safer the command and the less the user has to think about whether to allow each call.

### Pin the Model When It Matters

A command that does mechanical work — formatting a commit message, generating a changelog from \`git log\`, classifying an issue — runs well on Haiku and costs a fraction of what Sonnet or Opus would. Pin it:

\`\`\`markdown
---
model: claude-haiku-4-5-20251001
---
\`\`\`

A command that does design work — proposing an architecture, untangling a tricky bug, rewriting an API — should pin to Opus so the user doesn't accidentally invoke it on a downgraded model and get a worse answer than the command was tested against.

### Namespace Once You Pass Ten

\`.claude/commands/release/notes.md\`, \`.claude/commands/release/cut.md\`, \`.claude/commands/release/verify.md\` becomes \`/release:notes\`, \`/release:cut\`, \`/release:verify\`. The picker stays clean and related commands sort together.

Common namespaces that show up across teams: \`release:\`, \`pr:\`, \`db:\`, \`docs:\`, \`triage:\`, \`test:\`.

---

## Concrete Examples

A few commands that have earned their place on real repos.

### \`/pr\` — Open a PR With the Team's House Style

\`\`\`markdown
---
description: Open a PR for the current branch with the team's PR template
argument-hint: [optional reviewer handle]
allowed-tools: Bash(git:*), Bash(gh:*)
---

You are opening a pull request for the current branch.

1. Run \`git status\` and \`git diff main...HEAD\` to understand the full change.
2. If the branch is not pushed, push it with \`-u origin\`.
3. Write a PR title under 70 characters in the imperative mood.
4. Write a body with three sections: ## Summary (1-3 bullets), ## Why (one paragraph on motivation), ## Test plan (a checklist).
5. Open the PR with \`gh pr create\`. If \`$ARGUMENTS\` is non-empty, add it as a reviewer with \`--reviewer\`.
6. Print the PR URL.

Do not commit or push to main.
\`\`\`

### \`/triage\` — Label and Route an Inbound Issue

\`\`\`markdown
---
description: Triage a GitHub issue by URL or number
argument-hint: <issue-url-or-number>
allowed-tools: Bash(gh issue:*)
model: claude-haiku-4-5-20251001
---

Triage the issue at $ARGUMENTS.

1. Fetch the issue with \`gh issue view\`.
2. Read CONTRIBUTING.md for the team's labeling conventions.
3. Apply the right area label, severity label, and "needs-info" if the report is incomplete.
4. If it's a duplicate of an open issue, post a comment linking the original and close it.
5. If it's clearly a question, route it to discussions instead.

Do not edit code.
\`\`\`

### \`/release:notes\` — Generate Release Notes From the Last Tag

\`\`\`markdown
---
description: Generate release notes for the commits since the last tag
allowed-tools: Bash(git:*)
---

Generate release notes covering the commits since the most recent tag.

1. Find the latest tag with \`git describe --tags --abbrev=0\`.
2. Read the commit log between that tag and HEAD.
3. Group commits into ## Features, ## Fixes, ## Internal.
4. Write each line as a user-facing sentence — not the raw commit subject.
5. Skip merge commits and dependency bumps.
6. Output to stdout. Do not write a file.
\`\`\`

### \`/explain\` — Explain a Function in Context

\`\`\`markdown
---
description: Explain what a function does and where it fits
argument-hint: <function-name-or-file:line>
---

Explain $ARGUMENTS.

1. Find the definition. If $ARGUMENTS is a file:line, jump there. Otherwise grep for it.
2. Read the implementation and the 3-5 most important callers.
3. Explain in plain prose: what it does, what calls it, what it depends on, and what would break if it changed.
4. Keep it under 200 words.

Do not edit anything.
\`\`\`

These are not impressive. That is the point. Each one replaces a paragraph that gets retyped a hundred times.

---

## Slash Commands and Plugins

Once you have a handful of commands you want to share beyond the repo — say, a set of release commands you use across a dozen services — bundling them as a [plugin](/blog/best-claude-code-plugins) is the next step. A plugin is a directory of commands (and skills, agents, hooks) that any Claude Code user can install with a single command, and updates flow through automatically.

You don't need to start there. The natural progression is:

1. **Personal command** in \`~/.claude/commands/\` — one user, every project.
2. **Project command** in \`.claude/commands/\` — every user on this repo.
3. **Plugin** — every project, distributed beyond your team.

Each step adds friction and durability in equal measure. Don't promote a command before it has earned it.

---

## Listing, Discovering, and Removing Commands

Inside any session, type \`/\` and the picker shows every command available — built-in, project, personal — with their descriptions. This is your sanity check that a new command is actually wired up.

\`/help\` lists the built-in slash commands (\`/clear\`, \`/compact\`, \`/model\`, \`/config\`, \`/agents\`, etc.). You cannot override the built-ins; if you create \`.claude/commands/clear.md\`, it gets shadowed.

To remove a command, delete its file. There is no uninstall step.

---

## Common Mistakes That Cost a Day

A short list of things that have eaten time on real teams.

**Storing secrets in the command body.** Anything in \`.claude/commands/\` is checked into git. Put API keys in environment variables and reference them from \`Bash\` calls inside the command, not in the prompt itself.

**Forgetting \`allowed-tools\` and getting prompted on every run.** A command that needs to run \`gh\` ten times will prompt ten times unless the tool is in the allowlist. The first time you write a useful command and run it three days in a row, you will fix this.

**Writing commands that need clarification.** A command that says "review the changes" will produce a clarifying question on every run because Claude doesn't know which changes. Either accept arguments and pass them in, or anchor on something concrete in the prompt ("the diff against main").

**Treating \`$ARGUMENTS\` as parsed.** It is one string. If you want structured input, write the prompt to expect a structured blob and let Claude do the parsing. Don't try to write commands that branch on positional arguments.

**Letting commands grow.** A command that doubles in length every quarter is a [skill](/blog/how-to-create-claude-skills) trapped in the wrong file format. When the prompt no longer fits in your head, lift it into a skill with supporting files.

**Building a command before you've done the work manually.** The best commands are extracted from sessions where you typed the prompt yourself, liked the result, and realized you'd type it again tomorrow. Building a slash command speculatively, before you've felt the pain of typing it, almost always produces a command that doesn't quite fit.

---

## What to Try This Week

Pick the single most-typed paragraph from your last week of sessions. Open \`.claude/commands/\` in your repo, create a Markdown file named after the verb you'd want to type, and paste the paragraph in. Add a one-line description. Run it once.

If it produced what you wanted, commit it. If it didn't, edit the prompt and try again. The whole loop should take under five minutes.

Repeat for the next-most-typed paragraph. After a week, look at \`.claude/commands/\` and notice how much of your day is now \`/something\` instead of typing.

The win is not that any individual command is impressive. The win is that the work that used to require you to remember and retype now requires you to press six keys.
`,
};
