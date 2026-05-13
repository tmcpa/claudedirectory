import { BlogPost } from "@/lib/types";

export const bestClaudeCodePlugins: BlogPost = {
  slug: "best-claude-code-plugins",
  title:
    "The Best Claude Code Plugins for Every Stack (2026)",
  description:
    "Stop scrolling through plugin lists. Here are the Claude Code plugins that actually matter — organized by what you build, with install commands you can copy right now.",
  publishedDate: "2026-03-15",
  tags: [
    "claude-code",
    "plugins",
    "developer-tools",
    "productivity",
    "best-practices",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "plugin",
      slug: "feature-dev",
      relationship: "recommends",
    },
    {
      type: "plugin",
      slug: "code-review",
      relationship: "recommends",
    },
    {
      type: "plugin",
      slug: "frontend-design",
      relationship: "recommends",
    },
    {
      type: "plugin",
      slug: "playwright",
      relationship: "recommends",
    },
    {
      type: "plugin",
      slug: "supabase",
      relationship: "recommends",
    },
    {
      type: "plugin",
      slug: "vercel",
      relationship: "recommends",
    },
    {
      type: "plugin",
      slug: "linear",
      relationship: "recommends",
    },
    {
      type: "plugin",
      slug: "github",
      relationship: "recommends",
    },
    {
      type: "plugin",
      slug: "context7",
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
  ],
  content: `# The Best Claude Code Plugins for Every Stack

There are over 60 Claude Code plugins now. That's great for the ecosystem and terrible for anyone trying to figure out which ones to actually install.

Most plugin lists just dump everything alphabetically and call it a day. This isn't that. This is the opinionated guide — the plugins that have actually changed how developers work, organized by what you're building and what problems you're solving.

If you've never used a Claude Code plugin before, you'll walk away with a working setup. If you're already using a few, you'll probably find something you missed.

---

## What Are Claude Code Plugins?

Plugins extend Claude Code with new slash commands, workflows, and integrations. They're different from MCP servers (which give Claude access to external tools and data) — plugins add **structured workflows** on top of Claude Code itself. Many plugins bundle an MCP server under the hood, but the plugin layer is what gives you the opinionated commands and multi-step workflows.

Install any plugin with a single command:

\`\`\`bash
/plugin install plugin-name@marketplace
\`\`\`

Plugins live in your project's \`.claude/plugins/\` directory and can be shared across your team via version control.

---

## The "Install These First" Tier

These three plugins are useful regardless of what you're building. If you install nothing else, install these.

### 1. Feature Dev (Anthropic)

\`\`\`bash
/plugin install feature-dev@claude-plugins-official
\`\`\`

This is the single best plugin for writing new code. Instead of dumping a vague prompt and hoping for the best, \`/feature-dev\` walks you through a structured 7-phase workflow: discovery, codebase exploration, clarifying questions, architecture design, implementation, quality review, and summary.

The key insight is what happens in phases 2 and 3. Before writing a single line, Claude spins up specialized agents to explore your codebase and asks you targeted questions about edge cases. The code it produces after that process is dramatically better than a cold start.

Use it when you're adding anything non-trivial — a new API endpoint, a UI component with business logic, a data pipeline. For quick one-liners, you don't need it.

### 2. Code Review (Anthropic)

\`\`\`bash
/plugin install code-review@claude-plugins-official
\`\`\`

Multi-agent code review with confidence-based filtering. Run \`/code-review\` on your current changes or point it at a PR number. It analyzes security, performance, maintainability, and correctness — then ranks findings by confidence so you're not drowning in nitpicks.

The difference between this and just asking Claude "review my code" is the structured output and the filtering. It won't waste your time flagging a missing comment when there's an actual SQL injection two files down.

### 3. Context7 (Upstash)

\`\`\`bash
/plugin install context7@claude-plugins-official
\`\`\`

This one solves a real pain point. Claude's training data has a cutoff, which means it sometimes generates code against outdated API surfaces. Context7 pulls **current** documentation directly from source repositories.

Run \`/docs next.js\` or \`/api-ref prisma findMany\` and Claude gets the real, version-specific docs injected into its context. No more debugging code that worked in v13 but broke in v15.

---

## Frontend Stack

Building UIs? These plugins turn Claude Code into a design-aware frontend engineer.

### Frontend Design (Claude Code Plugins)

\`\`\`bash
/plugin install frontend-design@claude-plugins-official
\`\`\`

The default Claude Code experience produces functional but generic-looking UIs. This plugin fixes that. \`/frontend-design\` generates production-grade components with actual design sensibility — proper spacing, color systems, typography scales, responsive behavior.

It supports React, Vue, Svelte, and vanilla HTML/CSS. The \`/ui\` command is the quick version for single components; \`/layout\` handles full page structures.

### Figma (Figma)

\`\`\`bash
/plugin install figma@claude-plugins-official
\`\`\`

If your team has a designer, this closes the design-to-code gap. \`/figma-inspect\` extracts specs from a Figma file — colors, spacing, typography, component structure. \`/figma-code\` generates code from a Figma component. \`/figma-tokens\` exports design tokens you can feed into your theme.

Not useful if you're a solo dev designing in code. Very useful if you have Figma files you're supposed to match.

### Storybook (Storybook)

\`\`\`bash
/plugin install <plugin>@claude-plugins-official
\`\`\`

\`/story:gen\` generates Storybook stories for your components. This is one of those tasks that's tedious enough that nobody does it consistently. Having Claude auto-generate stories with sensible variants and edge cases means your component library stays documented without the overhead.

### Playwright (Microsoft)

\`\`\`bash
/plugin install playwright@claude-plugins-official
\`\`\`

E2E testing across Chromium, Firefox, and WebKit. \`/playwright-test\` runs or creates tests. \`/playwright-screenshot\` takes screenshots for visual verification. The standout is \`/playwright-codegen\` — it records browser interactions and generates test code from them.

Pairs well with the frontend-design plugin. Build the component, generate a story, write the E2E test — all in one session.

---

## Backend & Data Stack

For API developers, database engineers, and anyone who spends more time in the terminal than the browser.

### Supabase (Supabase)

\`\`\`bash
/plugin install supabase@claude-plugins-official
\`\`\`

Full backend management from Claude Code. \`/supabase-query\` runs SQL, \`/supabase-migrate\` handles schema changes, \`/supabase-auth\` manages users, \`/supabase-functions\` deploys edge functions. It's basically the Supabase dashboard in your terminal.

The migration workflow is where this really shines. Describe what you want ("add a comments table with RLS policies for authenticated users"), and Claude generates and runs the migration with proper up/down scripts.

### Firebase (Google)

\`\`\`bash
/plugin install firebase@claude-plugins-official
\`\`\`

Same idea as Supabase but for the Firebase ecosystem. Firestore queries, auth management, function deployment, and security rules — all from Claude Code. If you're on Firebase, you need this. If you're not, skip it.

### Prisma (Prisma)

\`\`\`bash
/plugin install prisma@claude-plugins-official
\`\`\`

ORM management. \`/prisma-migrate\` creates and runs migrations, \`/prisma-generate\` regenerates the client after schema changes. The real value is that Claude understands your Prisma schema as a first-class data model and can reason about relationships, indexes, and constraints when writing queries.

### Stripe (Stripe)

\`\`\`bash
/plugin install stripe@claude-plugins-official
\`\`\`

If you're integrating payments, this saves hours. \`/stripe-webhook\` sets up webhook handlers with proper signature verification. \`/stripe-test\` runs your integration against Stripe's test mode. No more context-switching between the Stripe dashboard, docs, and your editor.

---

## DevOps & Infrastructure

For the people who keep things running.

### Vercel (Vercel)

\`\`\`bash
/plugin install vercel@claude-plugins-official
\`\`\`

Deploy without leaving your terminal. \`/vercel-deploy\` ships your current project, \`/vercel-env\` manages environment variables, \`/vercel-logs\` tails function logs. Straightforward and does exactly what you'd expect.

### Docker (Docker)

\`\`\`bash
/plugin install docker@claude-plugins-official
\`\`\`

Container management. Build images, manage compose services, tail logs. The \`/docker-compose\` command is especially useful — Claude can read your \`docker-compose.yml\`, understand the service graph, and help you debug networking issues or add new services that fit the existing setup.

### Cloudflare (Cloudflare)

\`\`\`bash
/plugin install <plugin>@claude-plugins-official
\`\`\`

Edge-first development. Deploy Workers, manage KV stores, query D1 databases. \`/cf:logs\` gives you real-time tailing from Workers, which is a pain to set up through the dashboard. If you're building on Cloudflare's stack, this is essential.

### Kubernetes (Kubernetes)

\`\`\`bash
/plugin install <plugin>@claude-plugins-official
\`\`\`

Cluster inspection and debugging. \`/k8s:debug\` is the highlight — point it at a failing deployment or a CrashLoopBackOff pod and Claude diagnoses the issue using pod events, logs, and resource limits. Faster than \`kubectl describe\` → \`kubectl logs\` → squinting at YAML.

---

## Monitoring & Debugging

Because shipping code is only half the job.

### Sentry (Sentry)

\`\`\`bash
/plugin install sentry@claude-plugins-official
\`\`\`

\`/sentry-issues\` pulls recent errors. \`/sentry-trace\` shows the stack trace. \`/sentry-fix\` is the interesting one — Claude analyzes the error, reads the relevant code in your repo, and suggests a fix with full context. Error triage that used to take 20 minutes takes 2.

### Datadog (Datadog)

\`\`\`bash
/plugin install datadog@claude-plugins-official
\`\`\`

Observability from your terminal. Query metrics, search logs, view APM traces, check active alerts. Most useful during incident response — you can ask Claude to correlate a spike in error rates with recent deployments and get an answer without switching between six browser tabs.

---

## Team & Project Management

Plugins that connect Claude Code to where your team communicates and tracks work.

### GitHub (GitHub)

\`\`\`bash
/plugin install github@claude-plugins-official
\`\`\`

Issues, PRs, Actions, code search — the full GitHub API from Claude Code. \`/gh-pr\` creates pull requests with Claude-generated descriptions that actually make sense. \`/gh-actions\` lets you check why the build is failing without opening a browser. Pairs naturally with the code-review plugin.

### Linear (Linear)

\`\`\`bash
/plugin install linear@claude-plugins-official
\`\`\`

Issue tracking integration. Create issues, update statuses, search across projects. The workflow that makes this worth installing: finish a feature, run \`/code-review\`, fix the findings, create a PR with \`/gh-pr\`, then close the Linear issue with \`/linear-status\` — all without leaving the terminal.

### Slack (Slack)

\`\`\`bash
/plugin install slack@claude-plugins-official
\`\`\`

Search and read Slack messages from Claude Code. \`/slack-search\` finds relevant conversations. \`/slack-thread\` pulls full context from a discussion. Useful when you're implementing something that was discussed in a channel three weeks ago and you need to find the decision.

---

## Power User Picks

These are less mainstream but worth knowing about.

### Greptile (Greptile)

\`\`\`bash
/plugin install greptile@claude-plugins-official
\`\`\`

Natural language codebase search. \`/greptile-search\` lets you ask "where do we handle authentication?" or "find all the places we call the billing API" and get precise results. Technically Claude Code can already search your code, but Greptile uses pre-built indexes that handle large monorepos where Claude's native search would choke.

### Ralph (Community)

\`\`\`bash
/plugin marketplace add gmickel/gmickel-claude-marketplace && /plugin install ralph@gmickel-claude-marketplace
\`\`\`

Autonomous overnight coding. Start a task before bed, \`ralph\` manages context and coherence across extended sessions. It's a community plugin, so your mileage may vary, but the concept is sound — some tasks genuinely benefit from hours of uninterrupted execution.

### Hookify (Anthropic)

\`\`\`bash
/plugin install hookify@claude-plugins-official
\`\`\`

If you've read our [hooks guide](/blog/claude-code-hooks-guide), you know how powerful hooks are. Hookify makes them easier to create. \`/hookify\` walks you through setting up custom hooks without manually editing settings files. Good for teams that want guardrails without requiring everyone to understand hook internals.

### SuperClaude Framework (Community)

\`\`\`bash
git clone https://github.com/SuperClaude-Org/SuperClaude_Framework.git && cd SuperClaude_Framework && ./setup.sh
\`\`\`

A framework that adds cognitive "personas" to Claude Code — Code Architect, Test Engineer, DevOps, Security. Switch between them with \`/persona\` to change how Claude approaches problems. It's heavier than other plugins and works best if you're the kind of developer who wants a highly customized environment.

---

## Recommended Stacks

Not sure where to start? Here are curated setups for common workflows.

### The Solo Full-Stack Developer

\`\`\`bash
/plugin install feature-dev@claude-plugins-official
/plugin install code-review@claude-plugins-official
/plugin install context7@claude-plugins-official
/plugin install frontend-design@claude-plugins-official
/plugin install supabase@claude-plugins-official
/plugin install vercel@claude-plugins-official
\`\`\`

Everything you need to build, review, and ship a full-stack app. Feature Dev for structured development, Context7 for up-to-date docs, Frontend Design for polished UIs, Supabase for the backend, Vercel for deployment, and Code Review before you merge.

### The Frontend Specialist

\`\`\`bash
/plugin install frontend-design@claude-plugins-official
/plugin install figma@claude-plugins-official
/plugin install playwright@claude-plugins-official
/plugin install <plugin>@claude-plugins-official
/plugin install context7@claude-plugins-official
\`\`\`

Design-to-code with Figma, production-quality components with Frontend Design, stories with Storybook, E2E tests with Playwright, and current docs with Context7.

### The Backend / API Developer

\`\`\`bash
/plugin install feature-dev@claude-plugins-official
/plugin install code-review@claude-plugins-official
/plugin install prisma@claude-plugins-official
/plugin install docker@claude-plugins-official
/plugin install sentry@claude-plugins-official
/plugin install context7@claude-plugins-official
\`\`\`

Structured feature development, ORM management, containerized environments, error monitoring, and code review. Swap Prisma for Supabase or Firebase depending on your database layer.

### The DevOps / Platform Engineer

\`\`\`bash
/plugin install <plugin>@claude-plugins-official
/plugin install docker@claude-plugins-official
/plugin install <plugin>@claude-plugins-official
/plugin install datadog@claude-plugins-official
/plugin install github@claude-plugins-official
/plugin install hookify@claude-plugins-official
\`\`\`

Cluster management, container orchestration, edge deployment, observability, CI/CD integration, and automated guardrails with hooks.

### The Team Lead

\`\`\`bash
/plugin install code-review@claude-plugins-official
/plugin install github@claude-plugins-official
/plugin install linear@claude-plugins-official
/plugin install slack@claude-plugins-official
/plugin install feature-dev@claude-plugins-official
\`\`\`

PR management, issue tracking, team communication, and structured feature development. The workflow: triage Linear issues, develop with Feature Dev, review with Code Review, manage PRs with GitHub, and stay connected with Slack.

---

## Tips for Managing Plugins

**Don't install everything.** Each plugin adds context and commands that Claude needs to reason about. A focused set of 5-7 plugins will perform better than installing all 60+.

**Check for MCP server dependencies.** Many plugins require an MCP server running in the background. The install command usually handles this, but if a plugin's commands aren't working, check your \`.mcp.json\` for the required server configuration. See our [MCP Servers guide](/blog/mcp-servers-guide) for setup details.

**Share across your team.** Commit your \`.claude/plugins/\` directory to version control. When everyone runs the same plugin set, code reviews are consistent and workflows are standardized.

**Combine plugins with hooks.** The real power move is pairing plugins with [hooks](/blog/claude-code-hooks-guide). Run \`/code-review\` automatically after every feature branch push. Auto-deploy with the Vercel plugin when tests pass. The combinations are where things get interesting.

---

## What's Next

The Claude Code plugin ecosystem is growing fast. A year ago there were a handful of official plugins. Now there are 60+ from Anthropic, major companies, and the community — with new ones shipping every week.

The best way to stay current is to browse the [plugins directory](/plugins) and experiment. Install something, use it for a week, and keep what sticks. The plugins that save you time on day one will save you hundreds of hours over a year.

If you're building your own plugin, check out the [Plugin Dev plugin](https://claudedirectory.org/plugins/plugin-dev) — yes, there's a plugin for building plugins. That's the ecosystem we're in now, and honestly, it's great.`,
};
