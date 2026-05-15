import { BlogPost } from "@/lib/types";

export const claudeCodePermissionsGuide: BlogPost = {
  slug: "claude-code-permissions-guide",
  title:
    "Claude Code Permissions: A Complete Guide to Allow Lists, Sandboxing, and Tool Approval (2026)",
  description:
    "How Claude Code decides whether to run a tool — the allow/deny rules in settings.json, the four permission modes, sandboxing on macOS, and the patterns that stop you from clicking Approve a hundred times a day.",
  publishedDate: "2026-05-15",
  tags: [
    "claude-code",
    "permissions",
    "settings",
    "security",
    "configuration",
    "allowed-tools",
    "sandboxing",
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
      slug: "claude-code-slash-commands-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-hooks-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-cheat-sheet",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-md-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-subagents-guide",
      relationship: "recommends",
    },
  ],
  seoTitle:
    "Claude Code Permissions (2026): Allow Lists, Deny Rules, and Sandboxing Explained",
  seoDescription:
    "The practical guide to Claude Code permissions. How allow/deny rules work, the four permission modes, sandboxed Bash, MCP tool approval, and the configurations real teams ship.",
  content: `# Claude Code Permissions: A Complete Guide to Allow Lists, Sandboxing, and Tool Approval

Every Claude Code session is a negotiation. Claude wants to read a file, run a command, edit your code. The harness has to decide: do I just let it, do I ask the user, or do I block? The thing that makes that decision is the permission system — and if you do not configure it, you will spend half your day clicking *Approve* on \`git status\`.

This guide is the version that gets past "approve the prompt" and into how the rules actually work, where they live, what the four permission modes do, how sandboxing fits in, and the configurations that stop the prompts without giving the model the keys to the kingdom.

---

## Why Permissions Exist At All

Claude Code is an agent that can read files, write files, run shell commands, hit the network through MCP, and chain those into multi-step work without asking between steps. That is the whole value proposition. It is also exactly the surface area you would worry about if you handed a junior engineer your laptop unattended.

Permissions are the harness's way of giving you a dial. On one end: prompt for everything, slow but safe. On the other end: run anything in a sealed sandbox without asking, fast but with rules about what the sandbox can touch. Most real configurations sit between those two ends and tilt one way or the other depending on the repo.

The pieces that combine to produce a permission decision:

- **Permission rules** — allow / deny / ask lists in \`settings.json\`, written as tool patterns.
- **Permission mode** — the session-wide posture (default, accept-edits, plan, bypass).
- **Sandbox** — on macOS, an OS-level box around \`Bash\` that limits what the shell can touch.
- **Slash command \`allowed-tools\`** — per-command grants that override the session policy.
- **Hooks** — programmable gates that can approve or block a tool call on the fly.

Get the layering right and the model rarely interrupts you. Get it wrong and you either drown in approval prompts or wake up to find Claude has \`rm -rf\`'d a directory.

---

## Where Permissions Live

Permissions are configured in \`settings.json\`. There are four layers, evaluated in order:

1. **Enterprise** — \`/Library/Application Support/ClaudeCode/managed-settings.json\` on macOS. Locked-down policies pushed by IT.
2. **User** — \`~/.claude/settings.json\`. Your personal defaults across every project.
3. **Project shared** — \`.claude/settings.json\` inside the repo. Checked into git, applies to everyone on the team.
4. **Project local** — \`.claude/settings.local.json\` inside the repo. Gitignored by default, your personal overrides for this project.

Later layers override earlier ones for the same rule, but allow/deny lists *merge* — a deny in user settings still applies even if a project file allows it. That is by design. A user-level deny on \`Bash(rm:*)\` is a safety net that no individual project can disable.

The structure inside \`settings.json\` looks like this:

\`\`\`json
{
  "permissions": {
    "defaultMode": "default",
    "allow": [
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(npm run lint:*)",
      "Read(./**)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(curl:*)",
      "Read(./.env)",
      "Read(./.env.*)"
    ],
    "ask": [
      "Bash(git push:*)",
      "Bash(gh pr merge:*)"
    ]
  }
}
\`\`\`

Three lists, one mode field, and a syntax for tool patterns. That is the whole shape.

---

## The Tool Pattern Syntax

Every entry in \`allow\`, \`deny\`, and \`ask\` is a tool pattern. The pattern has two parts: the **tool name** and an optional **matcher** in parentheses.

\`\`\`text
ToolName(matcher)
\`\`\`

For \`Bash\`, the matcher is the command. For file tools (\`Read\`, \`Edit\`, \`Write\`), it is a file path glob. For MCP tools, it is the tool name on the server.

Examples that come up constantly:

- \`Bash(git status)\` — exactly \`git status\`, no arguments allowed.
- \`Bash(git status:*)\` — \`git status\` with any arguments after it.
- \`Bash(git:*)\` — any \`git\` subcommand. Big, broad, useful.
- \`Bash(npm run test:*)\` — any \`npm run test\`-prefixed invocation.
- \`Read(./src/**)\` — read any file under \`./src\`.
- \`Read(//etc/**)\` — note the leading \`//\` for absolute paths.
- \`Edit(./src/**/*.ts)\` — edit any TypeScript file under \`./src\`.
- \`mcp__github__create_issue\` — exactly that one MCP tool.
- \`mcp__github__*\` — every tool on the GitHub MCP server.

The \`:*\` suffix on Bash patterns is the most common gotcha. \`Bash(git diff)\` allows *only* the bare command — \`git diff main\` would still prompt. \`Bash(git diff:*)\` is what you almost always want.

Two more rules worth knowing:

- **Specificity wins.** \`Bash(rm:*)\` in deny will block \`rm -rf node_modules\` even if \`Bash(rm:*)\` is also in allow somewhere — deny is checked first.
- **Patterns are matched against the literal command string**, not the parsed semantics. \`Bash(git:*)\` will not match \`/usr/bin/git status\` because the prefix is different.

---

## The Four Permission Modes

The permission *mode* sets the session-wide posture. Allow/deny rules apply on top of it, but the mode decides what happens when no rule matches.

### \`default\`

Asks before any tool that could modify the system or hit the network. Reads are usually free. This is the safe starting point and what every new install gives you. You will see a lot of approval prompts until you build up an allow list.

### \`acceptEdits\`

Auto-approves \`Edit\` and \`Write\` calls. Reads and Bash still follow the rules. This is the mode you want when you trust Claude to make the changes you have agreed on and just want it to *get on with it* — typically once you have already discussed the plan.

### \`plan\`

The model can read, search, and reason but cannot edit, write, or run anything that mutates state. Use this for design discussions, code reviews, exploration of unfamiliar codebases, and any session where you want a recommendation, not a commit.

### \`bypassPermissions\`

Everything is auto-approved except entries in your \`deny\` list. Fast, dangerous, and the right choice for tight loops where you have already convinced yourself the work is bounded. This is the mode that makes long autonomous runs possible — and the mode that makes a missing \`Bash(rm:*)\` deny entry expensive.

You set the default mode in \`settings.json\`:

\`\`\`json
{
  "permissions": {
    "defaultMode": "acceptEdits"
  }
}
\`\`\`

You change it mid-session with \`/permissions\`, or by hitting Shift+Tab to cycle through. The CLI flag \`--permission-mode plan\` (or whichever) sets it for a single invocation.

---

## Sandboxed Bash on macOS

macOS sessions have a second layer underneath the rules: an OS sandbox around the \`Bash\` tool. When sandboxing is enabled, every shell command the model runs is launched inside a sandbox profile that limits filesystem and network access, regardless of what the rules say.

The point of the sandbox is to make \`Bash\` safe enough to auto-approve broadly. Inside the sandbox, the shell can read most files but cannot write outside the working tree, cannot make outbound network requests, and cannot touch \`~/.ssh\`, \`~/.aws\`, or other sensitive directories. So you can put \`Bash(*)\` in your allow list without the cost of an unsandboxed shell.

When a command genuinely needs unsandboxed privileges — pushing to git, installing global packages, hitting an internal API — the harness escapes the sandbox and prompts. The pattern that emerges:

- Sandboxed mode handles the 95% of commands that are \`ls\`, \`cat\`, \`grep\`, \`find\`, test runs, lint runs, type checks.
- The 5% that touch the network or write outside the workspace get a single approval prompt.

Linux and Windows do not have the sandbox today. There the answer is to be tighter on the allow list and rely on \`deny\` for the dangerous-but-easy-to-spell commands (\`rm -rf\`, \`curl\`, \`sudo\`, \`chmod\`).

---

## Per-Command Permissions: \`allowed-tools\` in Slash Commands

Slash commands and subagents can declare their own narrow tool grants in frontmatter. That grant overrides the session policy *for that invocation only*:

\`\`\`markdown
---
description: Open a PR for the current branch
allowed-tools: Bash(git:*), Bash(gh:*)
---

Look at the diff, write a PR description, push the branch, open the PR.
\`\`\`

The command can run \`git\` and \`gh\` without prompting, even if the session is in \`default\` mode and has nothing in its allow list. It cannot run anything else without prompting, even if the session is in \`bypassPermissions\` mode.

This matters more than it sounds. A \`/lint\` command with \`allowed-tools: Bash(npm run lint:*)\` cannot accidentally start editing files. A \`/release-notes\` command with \`allowed-tools: Bash(git:*)\` cannot push. The grants are an intent declaration as much as a permission convenience.

For more on the slash-command side, the [slash commands guide](/blog/claude-code-slash-commands-guide) walks through frontmatter and the patterns that survive on real teams.

---

## Hooks: Programmable Permission Gates

Sometimes a static rule is not enough. You want to allow \`gh pr merge\` — but only on the staging repo, never on the production repo. You want to deny \`Bash(curl:*)\` — except for one specific internal endpoint. You want to log every \`Write\` call to an audit trail.

That is what \`PreToolUse\` hooks are for. A hook is a shell command the harness runs before a tool call, with the tool name and arguments as input. The exit code decides what happens:

- \`0\` — allow the call.
- \`2\` — block the call. Anything you print to stderr is shown to Claude.
- Anything else — fall back to the normal permission flow.

A minimal "block production merges" hook in \`.claude/settings.json\`:

\`\`\`json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/block-prod-merge.sh"
          }
        ]
      }
    ]
  }
}
\`\`\`

Where \`.claude/hooks/block-prod-merge.sh\` reads the command from stdin and exits 2 if the command is a \`gh pr merge\` against \`main\` on \`prod-repo\`.

Hooks are the right tool when the rule is conditional, dynamic, or needs context the static patterns cannot express. The [hooks guide](/blog/claude-code-hooks-guide) covers the full event model and patterns.

---

## A Settings File That Stops the Prompts Without Losing the Net

Most people start by accepting every prompt, get tired of it, then flip to \`bypassPermissions\` and panic. The middle path is a thoughtful allow list paired with an aggressive deny list. Here is the kind of \`.claude/settings.json\` that ships on a real codebase:

\`\`\`json
{
  "permissions": {
    "defaultMode": "default",
    "allow": [
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git show:*)",
      "Bash(git branch:*)",
      "Bash(git stash:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git restore:*)",
      "Bash(git checkout:*)",
      "Bash(npm run:*)",
      "Bash(npm test:*)",
      "Bash(npx tsc:*)",
      "Bash(npx eslint:*)",
      "Bash(npx prettier:*)",
      "Bash(ls:*)",
      "Bash(cat:*)",
      "Bash(rg:*)",
      "Bash(fd:*)",
      "Bash(jq:*)",
      "Read(./**)",
      "Edit(./src/**)",
      "Edit(./tests/**)",
      "Write(./src/**)",
      "Write(./tests/**)",
      "mcp__github__*",
      "mcp__linear__*"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)",
      "Bash(curl:*)",
      "Bash(wget:*)",
      "Bash(git push:*)",
      "Bash(git push --force:*)",
      "Bash(npm publish:*)",
      "Bash(gh pr merge:*)",
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./**/*.pem)",
      "Read(./**/*credentials*)",
      "Edit(./.env)",
      "Edit(./.env.*)",
      "Write(./.env)",
      "Write(./.env.*)"
    ],
    "ask": [
      "Bash(git rebase:*)",
      "Bash(git reset --hard:*)",
      "Bash(git clean:*)"
    ]
  }
}
\`\`\`

What is happening here:

- Every read tool is allowed inside the repo, except secret files.
- Every common dev command — git read-only, npm scripts, lint, type check, search — runs without prompting.
- Edits are allowed in \`./src\` and \`./tests\` but not in config or the \`.claude/\` directory itself.
- The deny list catches the small set of commands that would be unrecoverable: destructive \`rm\`, force pushes, publishes, merges, secret reads.
- Rebase and hard reset prompt explicitly so the user is in the loop on history rewrites.

Tune to your repo. The shape rarely changes; the specific commands do.

---

## MCP Permissions Are Their Own Thing

MCP tools follow the same allow/deny syntax but with the \`mcp__<server>__<tool>\` naming convention. There are two patterns that earn their slot:

**Allow a whole server you trust.** If your team uses Linear for everything, \`mcp__linear__*\` in the allow list lets the model file, label, search, and update issues without prompting.

**Allow a single tool from a server you do not.** If you have an MCP server with twenty tools and you only want the model to use the search one, \`mcp__bigserver__search\` is precise and the rest still prompt.

The dangerous version is allowing a write-capable MCP tool on a destructive server (databases, payments, infrastructure) without a deny on the irreversible operations. \`mcp__postgres__query\` is fine for read-only queries; combined with a database account that can \`DROP TABLE\`, it is a foot-gun. Either route to a read-only role at the connection layer or write a hook that inspects the SQL.

---

## Common Mistakes That Cost a Day

A short list of permission missteps that come up over and over.

**Forgetting the \`:*\` on Bash patterns.** \`Bash(git status)\` allows the bare command and prompts on \`git status -sb\`. Almost every Bash entry should end in \`:*\`.

**Putting allow rules in \`settings.local.json\` and being surprised when the team still gets prompted.** \`.local.json\` is gitignored. Anything you want the team to inherit goes in \`.claude/settings.json\`.

**Allowing \`Bash(*)\` "just for this session" and forgetting it is there.** A session-wide allow on every shell command bypasses every rule below it. Either use \`bypassPermissions\` mode (which still respects deny) or stay precise.

**Setting \`defaultMode: bypassPermissions\` without a deny list.** This is the configuration that produces the \`rm -rf\` story. If you want bypass-style speed, write the deny list first, then enable bypass.

**Allowing \`Read(/**)\` on a personal machine.** This grants the model read access to every file the user can see — \`~/.ssh\`, \`~/.aws\`, browser cookies, the lot. Scope reads to the workspace.

**Allowing edits to your dotfiles directory.** The model can be very enthusiastic about "improving" \`~/.zshrc\`. Either keep dotfiles out of any allowed edit scope, or scope edits to specific subdirectories explicitly.

**Forgetting that hooks override the rules.** A \`PreToolUse\` hook that exits 0 will allow a command even if the rules say to deny. If you write a hook, make sure it falls back to the permission flow (exit code other than 0 or 2) for cases it does not have an opinion on.

---

## Inspecting and Debugging the Current Policy

Inside any session, \`/permissions\` opens an interactive view of the active rules — what is allowed, what is denied, what mode you are in, and which file each rule came from. This is the fastest way to figure out *why* a tool prompted that should not have, or *did not* prompt that should have.

The other useful trick is to flip into \`plan\` mode (\`/permissions\` → mode → plan, or Shift+Tab) when you want a session that is structurally incapable of making changes. Use it for code review, design discussions, and any time you do not want to find out at the end of the conversation that Claude has been editing files behind you.

---

## Permissions and Trust Over Time

Most teams' \`settings.json\` grows organically. The first version is empty. The second version has \`Bash(git status)\` and \`Bash(npm test:*)\` because those are the two most-prompted commands. The fifth version has fifty entries and starts looking like a permission policy.

The healthy version of that growth is to add an entry the *second* time a prompt annoys you, not the first. The first time is a signal; the second time is a pattern. Adding rules speculatively produces an allow list that includes commands you have never run and probably do not want to run.

The other thing worth doing every quarter or so: read your own \`settings.json\` cold, the way a new teammate would. Ask whether each entry still earns its slot, whether the deny list still catches the things you would not want the model to do, and whether anything in there is a leftover from a project you are not running anymore.

Permissions are not a "set it once and forget it" config. They are how you tell Claude what is normal in this repo, and "normal" changes as the codebase does.

---

## What to Try This Week

Open \`.claude/settings.json\` in the repo you spend the most time in. If it does not exist, create it. Add the five Bash commands you got prompted on most often last week to the allow list, with \`:*\` suffixes. Add \`Bash(rm -rf:*)\`, \`Bash(curl:*)\`, and reads on \`./.env*\` to the deny list. Set \`defaultMode\` to \`acceptEdits\` if you trust the model to make the edits you have agreed on.

Run a normal session for a day. Notice what still prompts and what does not. Add the next batch of entries. Within a week the permission system disappears into the background — which is the entire point. The work happens, the dangerous things do not, and you stop reaching for the Approve button.
`,
};
