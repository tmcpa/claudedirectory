import { BlogPost } from "@/lib/types";

export const vibeCodingClaudeCode: BlogPost = {
  slug: "vibe-coding-claude-code",
  title:
    "Vibe Coding with Claude Code: How to Build Apps by Describing What You Want",
  description:
    "Vibe coding is the fastest-growing trend in software development. Learn how to use Claude Code to build full applications by describing your intent in natural language — no line-by-line coding required.",
  publishedDate: "2026-03-25",
  tags: [
    "vibe-coding",
    "claude-code",
    "ai-development",
    "tutorial",
    "productivity",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    { type: "agent", slug: "vibe-coder", relationship: "documented-by" },
    { type: "skill", slug: "vibe-code", relationship: "documented-by" },
    {
      type: "blog",
      slug: "claude-code-workflows-10x-productivity",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-agents-guide",
      relationship: "recommends",
    },
  ],
  content: `# Vibe Coding with Claude Code: Build Apps by Describing What You Want

Andrej Karpathy coined the term and developers ran with it: **vibe coding** is writing software by describing what you want in natural language and letting AI handle the implementation. No more wrestling with syntax. No more Stack Overflow tab-switching. You describe the vibe, the AI writes the code.

Claude Code is arguably the best tool for vibe coding today. Unlike browser-based AI editors, it operates directly in your terminal with full access to your filesystem, git, package managers, and shell. It reads your entire codebase, understands your conventions, and writes code that fits. This guide covers how to vibe code effectively — from quick prototypes to production applications.

---

## What Is Vibe Coding?

Vibe coding is a development approach where you:

1. **Describe what you want** in plain English (or any language)
2. **Let AI generate the implementation** — files, functions, tests, configs
3. **Review and iterate** on the output with follow-up instructions
4. **Stay in the flow** rather than context-switching between docs and editors

It's not "no-code." You still understand code, you still review code, and you still own the architecture. The difference is that you're directing at a higher level of abstraction. Instead of typing \`const router = express.Router()\`, you say "add a REST API for user management with CRUD endpoints."

### Why It Works Now

Three things changed to make vibe coding practical:

- **Large context windows** — Claude can hold your entire codebase in memory, so it understands existing patterns
- **Tool use** — Claude Code can read files, write files, run commands, and iterate on errors without you copy-pasting
- **Agent architecture** — Claude Code doesn't just generate text; it plans, executes, tests, and self-corrects

---

## Getting Started: Your First Vibe Coding Session

### The Basic Loop

\`\`\`
You: "Build a React dashboard that shows real-time server metrics"
Claude: [reads your project, creates components, sets up data fetching, styles it]
You: "Make the charts animated and add a dark mode toggle"
Claude: [modifies the existing code, adds animations, implements theme switching]
You: "The latency chart should use a logarithmic scale"
Claude: [updates just that chart's configuration]
\`\`\`

Each prompt refines the previous output. You're sculpting the application through conversation.

### Setting Up for Success

Before you start vibe coding, set up your project with a good \`CLAUDE.md\`:

\`\`\`markdown
# CLAUDE.md

## Project Overview
This is a [type of app] built with [tech stack].

## Commands
- \\\`npm run dev\\\` — start dev server
- \\\`npm run test\\\` — run tests
- \\\`npm run lint\\\` — check code style

## Conventions
- Use TypeScript strict mode
- Components go in src/components/
- API routes go in src/app/api/
- Use Tailwind for styling
- Write tests for business logic
\`\`\`

This context file is the difference between "AI that generates generic code" and "AI that generates code that fits your project." Read the [complete CLAUDE.md guide](/blog/claude-md-guide) for more patterns.

---

## Vibe Coding Patterns That Work

### Pattern 1: The Greenfield Sprint

Start a new project from zero and build the entire thing through conversation.

\`\`\`bash
claude "Initialize a Next.js 15 app with TypeScript, Tailwind, and shadcn/ui. \\
  Set up the project structure with src/app router, components directory, \\
  and a lib directory for utilities. Add a basic layout with a sidebar \\
  navigation and a main content area."
\`\`\`

Then iterate:

\`\`\`
"Add a dashboard page with cards showing key metrics"
"Add a settings page with a form for user preferences"
"Add authentication with NextAuth and a login page"
"Add a data table component that supports sorting and filtering"
\`\`\`

Each prompt builds on the last. Claude reads what it already created and extends it consistently.

### Pattern 2: The Feature Drop

You have an existing codebase and you want to add a complete feature.

\`\`\`bash
claude "Add a notification system to this app. I need: \\
  1. A notifications data model with types (info, warning, error) \\
  2. An API endpoint to create and fetch notifications \\
  3. A notification bell component in the header with unread count \\
  4. A dropdown panel showing recent notifications \\
  5. Mark-as-read functionality \\
  6. Tests for the API endpoints"
\`\`\`

Claude explores your existing code, matches your patterns, and implements the full feature across multiple files. One prompt, dozens of files touched, all consistent with your codebase.

### Pattern 3: The Redesign

Take an existing UI and transform it through description.

\`\`\`
"Redesign the landing page. Make it modern and minimal — \\
  large hero section with a gradient background, \\
  a single call-to-action button, three feature cards below, \\
  and a footer with social links. Use the existing color palette \\
  but make it feel more premium."
\`\`\`

### Pattern 4: The Refactor by Intent

Instead of specifying exact code changes, describe the outcome you want.

\`\`\`
"This API is getting slow. Refactor the user search endpoint to use \\
  database-level pagination instead of fetching all records. Add an \\
  index on the email column. Cache the results for 60 seconds."
\`\`\`

Claude figures out what needs to change, where, and how — then makes it happen.

### Pattern 5: The Prototype-to-Production Pipeline

Start rough, then tighten iteratively:

\`\`\`
Round 1: "Build a basic chat interface — messages list, input box, send button"
Round 2: "Add WebSocket support for real-time messages"
Round 3: "Add message persistence with a database"
Round 4: "Add proper error handling and loading states"
Round 5: "Add comprehensive tests and fix any edge cases"
Round 6: "Optimize performance — virtualize the message list, debounce input"
\`\`\`

Each round increases the quality bar. You go from prototype to production through progressive refinement.

---

## Advanced Vibe Coding Techniques

### Use Subagents for Complex Features

For large features, let Claude orchestrate multiple specialists:

\`\`\`bash
claude "I need a complete e-commerce checkout flow. \\
  Use the code-explorer agent to understand the current cart system, \\
  the code-architect agent to design the checkout flow, \\
  then implement it with payment integration, address validation, \\
  and order confirmation. Write tests for the happy path and \\
  common error cases."
\`\`\`

Claude spawns specialized subagents — an explorer to map the code, an architect to design the solution, then implements and tests. This is vibe coding at scale.

### Combine with MCP Servers

MCP servers extend what Claude can do. Common combinations for vibe coding:

- **Figma MCP** — "Build this component to match the Figma design"
- **Database MCP** — "Create an API for the users table" (Claude reads the actual schema)
- **Browser MCP** — "The signup form has a bug, look at it in the browser and fix it"

### Use Hooks for Quality Gates

Set up hooks so your vibe-coded output automatically meets quality standards:

\`\`\`json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit",
      "command": "npx eslint --fix $FILE_PATH"
    }]
  }
}
\`\`\`

Every file Claude writes gets auto-linted. Add type checking, test running, or security scanning as additional hooks. Your vibe coding session produces production-quality code by default.

---

## When Vibe Coding Works Best

| Scenario | Effectiveness |
|----------|--------------|
| Greenfield prototypes | Excellent — fastest path from idea to working code |
| CRUD features | Excellent — Claude knows these patterns cold |
| UI/UX work | Great — describe layouts, Claude builds them |
| Refactoring | Great — describe the goal, Claude figures out the changes |
| Bug fixes | Good — describe the symptom, Claude traces and fixes |
| Performance optimization | Good — describe the bottleneck, Claude optimizes |
| Complex algorithms | Moderate — you may need to be more specific |
| Infrastructure/DevOps | Moderate — works well with good CLAUDE.md context |

### When to Drop Out of Vibe Mode

Vibe coding isn't always the right tool:

- **Security-critical code** — Review every line yourself. Use Claude for the initial implementation, but audit manually.
- **Complex business logic** — When the rules are nuanced, be explicit rather than vibing.
- **Performance-sensitive hot paths** — Claude writes correct code, but hand-tuned code may be faster for critical paths.
- **When you need to learn** — If you're trying to understand a concept, writing it yourself teaches more than watching Claude write it.

---

## Tips for Better Vibe Coding

### 1. Be Specific About the "What," Vague About the "How"

Good: "Add a user search feature with autocomplete that searches by name and email"
Bad: "Add a feature" (too vague)
Also bad: "Create a div with className='search-container' and an input with onChange..." (too specific — that's just dictation)

### 2. Front-Load Context

Start sessions with context about what you're building and why:

\`\`\`
"I'm building an internal tool for the support team. They need to \\
  search customer accounts quickly and see recent tickets. \\
  The data comes from our REST API at /api/v2/customers."
\`\`\`

### 3. Iterate in Small Bites

Don't try to describe an entire application in one prompt. Build incrementally:
- Start with structure
- Add features one at a time
- Refine after each addition
- Test as you go

### 4. Use Existing Code as Context

Point Claude at reference code: "Build a new API endpoint for orders, following the same pattern as the users endpoint in src/api/users.ts"

### 5. Review the Output

Vibe coding is not autopilot. Review what Claude generates. Run the tests. Click through the UI. The best vibe coders are fast reviewers, not blind acceptors.

---

## The Future of Vibe Coding

Vibe coding is moving from novelty to default workflow. As context windows grow, models improve, and tooling matures, the abstraction level keeps rising. Today you describe features in sentences. Tomorrow you'll describe products in paragraphs.

The developers who thrive won't be the ones who memorize the most APIs or type the fastest. They'll be the ones who can clearly articulate what they want, evaluate whether they got it, and iterate quickly toward the right solution.

Claude Code is built for this workflow. It's not a code completion tool bolted onto an editor — it's an autonomous coding agent that reads your project, plans its approach, executes across files, runs tests, and self-corrects. That's the infrastructure vibe coding needs.

Start with a small project. Describe what you want. See what happens. Refine. Repeat. You'll be surprised how far you get.

---

*Ready to try it? Set up your project with a [CLAUDE.md template](/prompts), install [helpful MCP servers](/mcp-servers), or explore the [vibe coding skill](/skills/vibe-code) for pre-built workflows.*
`,
};
