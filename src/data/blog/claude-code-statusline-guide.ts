import { BlogPost } from "@/lib/types";

export const claudeCodeStatuslineGuide: BlogPost = {
  slug: "claude-code-statusline-guide",
  title:
    "Claude Code Statusline: A Practical Guide to a Better Terminal Workflow (2026)",
  description:
    "The statusline is the most-glanced-at piece of UI in Claude Code, and the one most users never customize. Here's what it shows, what you can put in it, and the configurations that actually save time.",
  publishedDate: "2026-05-09",
  tags: [
    "claude-code",
    "statusline",
    "settings",
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
      slug: "claude-code-worktrees-guide",
      relationship: "recommends",
    },
  ],
  seoTitle:
    "Claude Code Statusline Guide (2026): Customize the Bar That Tells You Everything",
  seoDescription:
    "How to configure the Claude Code statusline: what fields are available, how to render git, model, and cost info, and the small tweaks that pay off every session.",
  content: `# Claude Code Statusline: A Practical Guide to a Better Terminal Workflow

There is a thin strip of text at the bottom of your Claude Code session that you look at more than anything else in the harness. It tells you which model is loaded, which directory you are in, which branch you are on, and — if you have configured it — how much you have spent this session, how many tokens are left in your context, and a dozen other things that would otherwise live in your head.

It is the statusline. Most users never touch it. The default is fine. The default is also leaving value on the table.

This guide is the short version of what to put in your statusline, why each field earns its slot, and the configurations that actually change how a session feels. If you are still figuring out the basics of the harness, the [cheat sheet](/blog/claude-code-cheat-sheet) is a better starting point.

---

## What the Statusline Is For

The statusline is a small render-on-each-turn area below the input box. Claude Code passes it a JSON blob describing the current session — model, working directory, git state, token usage, cost — and you decide what to display.

It exists for one reason: to answer questions you would otherwise have to ask out loud. *Which model am I on right now?* *Am I still on the feature branch?* *How close am I to the context limit?* The good news is that those questions get answered before you even ask them. The bad news is that if your statusline does not show the answer, you will keep asking.

Three properties matter:

1. **It is glanceable.** You read it without thinking. Anything you bury there gets noticed; anything important not on it gets forgotten.
2. **It is per-project.** Project settings can override user settings, so a long-running engagement can have a different statusline than a quick scratch session.
3. **It is a script, not a template.** The statusline is configured to point at an executable. That executable receives the session JSON on stdin and prints the line to stdout. You can do anything Bash, Python, or Node can do.

---

## The Default, And Why People Outgrow It

Out of the box the statusline shows the current working directory and the active model. That is the minimum useful display. It tells you which agent is going to do the work and where it is going to do it.

It stops being enough the first time you:

- Switch branches mid-session and forget which one you are on.
- Hit a context-window cliff with no warning.
- Wonder how much a long session has cost you.
- Run two agents in parallel worktrees and lose track of which terminal is which.

Each of those is a half-second decision that, repeated all day, adds up to a real productivity tax. The statusline is where you pay it down.

---

## The Configuration

The statusline lives in \`settings.json\` (or \`settings.local.json\` for personal overrides). The shape is simple:

\`\`\`json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 0
  }
}
\`\`\`

The \`command\` field is a path to any executable. It receives a JSON object on stdin describing the session, and whatever it prints to stdout becomes the statusline. ANSI color codes are honored.

The session JSON includes the current model, working directory, transcript path, output style, and token-usage metadata. The exact fields evolve, so the safest pattern is to read the blob with a real JSON parser instead of trying to grep it.

---

## What to Put on the Bar

The fields that earn their slot, in rough order of value:

**1. The current model.** Non-negotiable. Knowing whether you are on Opus, Sonnet, or Haiku changes how aggressive you should be with a request. If you cannot see this at a glance, you are routinely asking Sonnet questions you meant to ask Opus.

**2. The git branch and dirty state.** Worktrees and parallel agents make this critical. A small \`✱\` or \`*\` next to the branch name when uncommitted changes exist is the cheapest possible safety mechanism against the "wait, which branch did that go on" problem.

**3. The remaining context budget.** Either as a percentage or as a colored bar. The point is not the precise number; it is the slope. When the bar starts moving fast, you know to compact, summarize, or split the session.

**4. Session cost.** Especially useful on Opus, where a long, exploratory session can quietly cost more than a small one. Seeing the dollar figure tick up next to the prompt is a soft, ambient cost discipline.

**5. The current directory or worktree name.** Less important than the branch in most workflows, but invaluable when running parallel worktrees with similar branches. A short worktree name is the fastest way to tell which terminal is which.

Anything beyond those five is decoration. Decoration has its place — but each extra field costs visual budget, and the statusline is small.

---

## A Reasonable Starter Script

Here is the kind of statusline most working engineers end up with. It is not the cleverest possible version. It is the one that survives a year of use without being rewritten.

\`\`\`bash
#!/usr/bin/env bash
set -euo pipefail

input=$(cat)
model=$(echo "$input" | jq -r '.model.display_name // "?"')
cwd=$(echo "$input" | jq -r '.cwd // .workspace.current_dir // ""')

# Git state — silent if we are not in a repo
branch=""
dirty=""
if git -C "$cwd" rev-parse --git-dir >/dev/null 2>&1; then
  branch=$(git -C "$cwd" branch --show-current 2>/dev/null || echo "")
  if ! git -C "$cwd" diff --quiet 2>/dev/null || ! git -C "$cwd" diff --cached --quiet 2>/dev/null; then
    dirty="*"
  fi
fi

dir=$(basename "$cwd")

printf "\\033[36m%s\\033[0m │ \\033[33m%s\\033[0m │ \\033[35m%s%s\\033[0m" \\
  "$model" "$dir" "$branch" "$dirty"
\`\`\`

Three fields, color-coded, separated by box-drawing characters. Cyan for the model, yellow for the directory, magenta for the branch. The dirty marker is a single \`*\` so it is impossible to miss but takes up almost no space.

You can layer the context budget and cost on top once you know what JSON keys are available in your version of the harness — print the raw stdin to a file once and inspect it.

---

## The Common Mistakes

**Putting too much on the line.** The statusline is not a dashboard. Every field competes for the same handful of characters. Five well-chosen fields beat ten cluttered ones.

**Using slow commands.** The script runs on every render. If your branch detection shells out to GitHub or your token counter calls a network endpoint, every keystroke now stutters. Keep it local. Cache when you can.

**Hard-coding paths.** \`/Users/yourname/scripts/statusline.sh\` is fine on your laptop and broken on every other machine. Use \`~\` or a relative path that works for anyone who clones your dotfiles.

**Forgetting the no-repo case.** Half the directories you sit in are not git repos. If the script fails when \`git rev-parse\` fails, the whole statusline disappears. Wrap git calls in conditionals and make the no-repo path render cleanly.

**Skipping color discipline.** Color is information. Use one color per field type and stay consistent across machines. A statusline where every field is a different shade of every color is a statusline you stop reading.

---

## Per-Project Overrides

The most underused property of the statusline is that it can be different per project. A monorepo with strict branch hygiene benefits from a louder dirty-state warning. A research repo where you mostly read benefits from a smaller, quieter bar. A worktree-heavy project benefits from putting the worktree name in front of the branch.

The mechanism is the same as for any other Claude Code setting: a \`.claude/settings.json\` at the repo root overrides the user-level config for that project. Commit it. Your future self, and anyone else cloning the repo, gets the right statusline for the work.

---

## When to Use the Statusline-Setup Skill

Anthropic ships a small \`statusline-setup\` skill that handles the boilerplate of writing the script and wiring it into \`settings.json\`. It is the right starting point if you have never customized one before — it produces something working in a single prompt — and a poor fit if you already have a script you like, since it will overwrite without asking.

Use it the first time. Edit by hand from then on. The skill is not where you should be tuning the bar long-term; the bar is small and personal enough that hand-editing pays off.

---

## What This Replaces

A surprising amount of "manual checking" disappears once the statusline is configured well:

- \`git status\` to remember which branch you are on.
- Asking Claude "which model are you running" because the session has been long.
- The mental "I should compact soon" alarm that you forget to set.
- The end-of-day "what did this session cost" surprise.

None of those are dramatic individually. Together they are most of why a configured terminal feels different from an unconfigured one. The statusline is a small piece of UI doing a disproportionate amount of cognitive work.

---

## What to Try This Week

If your statusline is still the default, spend twenty minutes on it. Add the model, branch, and dirty marker. Live with that for a few days. Add the context-remaining percentage if you find yourself surprised by compaction. Add the cost field if you are working on Opus. Stop there.

The point is not to build the perfect statusline. The point is to stop having a UI that you ignore. A bar you actually read is worth ten lines of clever rendering nobody looks at.
`,
};
