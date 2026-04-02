import { BlogPost } from "@/lib/types";

export const contextEngineeringClaudeCode: BlogPost = {
  slug: "context-engineering-claude-code",
  title:
    "Context Engineering for Claude Code: How to Get Dramatically Better Results",
  description:
    "Context engineering is the most important skill for working with AI coding agents. Learn proven techniques to structure your project context, CLAUDE.md files, and prompts so Claude Code produces better code on the first try.",
  publishedDate: "2026-04-02",
  tags: [
    "context-engineering",
    "claude-code",
    "claude-md",
    "best-practices",
    "productivity",
    "tutorial",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "skill",
      slug: "context-engineering",
      relationship: "documented-by",
    },
    { type: "blog", slug: "claude-md-guide", relationship: "recommends" },
    {
      type: "blog",
      slug: "vibe-coding-claude-code",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-workflows-10x-productivity",
      relationship: "recommends",
    },
    { type: "agent", slug: "prompt-engineer", relationship: "recommends" },
    { type: "agent", slug: "code-architect", relationship: "recommends" },
  ],
  content: `# Context Engineering for Claude Code: How to Get Dramatically Better Results

The difference between developers who get mediocre output from Claude Code and those who get production-ready code on the first try almost always comes down to one thing: **context engineering**.

Context engineering is the practice of deliberately structuring the information you give an AI so it can do its best work. It's not prompt engineering — it goes much deeper. Where prompt engineering focuses on how you phrase a single request, context engineering is about the entire information environment: your project files, your CLAUDE.md, your directory structure, your commit history, and the way you frame tasks over time.

This guide covers the techniques that consistently produce the best results with Claude Code.

---

## Why Context Engineering Matters More Than Prompt Engineering

When you ask Claude Code to "add a payment flow," the quality of what you get depends on questions Claude answers internally:

- What framework is this project using?
- What patterns does the existing code follow?
- Where do API routes live? What about components?
- How does this project handle errors? Authentication? State?
- What testing conventions are in place?
- What has been tried and rejected before?

If Claude has to guess the answers, you get generic code. If the answers are embedded in your project context, you get code that fits like it was written by someone on your team.

**Prompt engineering** is asking a better question. **Context engineering** is giving Claude the knowledge to answer it well.

---

## Layer 1: The CLAUDE.md Foundation

Your \`CLAUDE.md\` file is the single highest-leverage piece of context you can provide. It's loaded automatically at the start of every session and shapes everything Claude does.

### What Most CLAUDE.md Files Get Wrong

Most developers write their CLAUDE.md like a README — a static description of what the project is. That's useful but misses the point. Claude already knows what your project is after reading a few files. What it needs is information it *can't* derive from reading code:

- **Why** decisions were made, not just what they are
- **Constraints** that aren't obvious from the code
- **Patterns to follow** and patterns to avoid
- **Commands** for building, testing, linting, and deploying

### A High-Signal CLAUDE.md Template

\`\`\`markdown
# CLAUDE.md

## Commands
\\\`npm run dev\\\` — Start development server on port 3000
\\\`npm run test\\\` — Run Jest tests (run after making changes)
\\\`npm run test:e2e\\\` — Run Playwright E2E tests
\\\`npm run lint\\\` — ESLint + Prettier check
\\\`npm run typecheck\\\` — TypeScript strict mode check

## Architecture Decisions
- **State management**: Zustand, not Redux. We migrated in Q1. Don't introduce Redux.
- **API layer**: tRPC for internal APIs, REST for external integrations.
- **Database**: Drizzle ORM with PostgreSQL. Migrations in /drizzle/.
- **Auth**: NextAuth v5 with the credentials provider. Session strategy is JWT.

## Code Conventions
- All new components must be React Server Components unless they need interactivity.
- Use \\\`cn()\\\` from lib/utils for conditional classNames (never ternary strings).
- Error boundaries wrap each route segment, not individual components.
- API error responses follow the shape: \\\`{ error: string, code: string, details?: unknown }\\\`

## Things to Avoid
- Do NOT use \\\`any\\\` type. Use \\\`unknown\\\` and narrow.
- Do NOT add barrel exports (index.ts re-exports). Import directly from the source file.
- Do NOT use default exports except for pages and layouts.
- Do NOT install new dependencies without confirming with the user first.

## Testing
- Unit tests go next to the file they test: \\\`foo.ts\\\` → \\\`foo.test.ts\\\`
- Use \\\`vi.mock()\\\` for module mocking, never jest.mock (we use Vitest)
- Test behavior, not implementation. Prefer integration tests over unit tests for API routes.
\`\`\`

Notice the pattern: every section answers a question Claude would otherwise guess at. The "Things to Avoid" section is especially powerful — it prevents Claude from falling into common patterns that don't fit your project.

### CLAUDE.md Hierarchy: Project, User, and Directory

Claude Code loads multiple CLAUDE.md files in a hierarchy:

1. **\`~/.claude/CLAUDE.md\`** — Your personal preferences (applies to all projects)
2. **\`./CLAUDE.md\`** — Project root (applies to this repo)
3. **\`./src/CLAUDE.md\`** — Directory-specific (applies when working in that directory)

Use this hierarchy strategically:

- **Personal CLAUDE.md**: Your coding style, preferred libraries, response format preferences
- **Project CLAUDE.md**: Architecture, conventions, commands, constraints
- **Directory CLAUDE.md**: Module-specific patterns, local conventions

\`\`\`markdown
# src/components/CLAUDE.md

## Component Patterns
- Every component gets its own directory: ComponentName/index.tsx + ComponentName.test.tsx
- Props interfaces are defined in the same file, not imported
- Use forwardRef for all components that render DOM elements
- Storybook stories are optional but encouraged for complex components
\`\`\`

This means Claude follows different conventions when working in your components directory versus your API directory. The context adapts to the code.

---

## Layer 2: Project Structure as Context

Your file organization is implicit context. Claude reads your directory tree to understand where things belong. A well-organized project makes Claude dramatically better because the structure itself answers questions.

### Structure Patterns That Help Claude

\`\`\`
src/
  app/              # Next.js routes — Claude knows to put pages here
    api/            # API routes — Claude follows REST conventions
    (auth)/         # Route groups — Claude understands grouping
  components/
    ui/             # Primitives (Button, Input, Card)
    features/       # Feature-specific compositions
    layouts/        # Layout components
  lib/
    db/             # Database client, schema, migrations
    auth/           # Auth configuration
    utils/          # Shared utilities
  hooks/            # Custom React hooks
  types/            # Shared TypeScript types
\`\`\`

When your project follows conventional structure, Claude needs less instruction. It infers that a new API route goes in \`src/app/api/\`, a new hook goes in \`src/hooks/\`, and a new utility goes in \`src/lib/utils/\`.

### Anti-Patterns That Confuse Claude

- **Flat directories with hundreds of files** — Claude can't infer grouping
- **Inconsistent naming** — mixing camelCase and kebab-case file names signals inconsistency
- **Dead code and unused files** — Claude may reference or extend abandoned patterns
- **Multiple competing patterns** — two different ways to do the same thing makes Claude flip between them

If your project has structural issues, a single line in CLAUDE.md can override them: "New components go in src/components/features/. Ignore the legacy patterns in src/old-components/."

---

## Layer 3: Task Framing

How you frame a task determines how Claude approaches it. The best task descriptions share three properties: they state the **goal**, provide **constraints**, and define **done**.

### The Goal-Constraint-Done Framework

**Weak prompt:**
\`\`\`
Add email notifications
\`\`\`

**Strong prompt:**
\`\`\`
Add email notifications for order status changes.

Goal: When an order moves to "shipped" or "delivered," send an email to the customer.

Constraints:
- Use Resend (already in package.json) with the existing email template in src/lib/email/
- Queue emails through our Bull job queue, don't send inline
- Only send if the user has email notifications enabled in their preferences

Done when:
- Orders transitioning to shipped/delivered trigger an email job
- Email uses the existing branded template
- Tests cover the happy path and the "notifications disabled" case
- No emails are sent for other status transitions
\`\`\`

The strong prompt takes 30 seconds longer to write and saves 15 minutes of back-and-forth iteration.

### Use References, Not Repetition

Instead of describing a pattern in your prompt, point Claude at an example:

\`\`\`
Add a PATCH endpoint for orders, following the same pattern as
src/app/api/users/[id]/route.ts — same validation approach,
same error handling, same response format.
\`\`\`

Claude reads the referenced file and replicates the pattern precisely. This is more reliable than describing the pattern in words.

### Progressive Disclosure for Complex Tasks

For large features, don't dump everything into one prompt. Layer your context:

\`\`\`
Prompt 1: "Let's build a real-time collaboration feature.
  Before writing any code, read through the existing WebSocket
  setup in src/lib/ws/ and the document model in src/lib/db/schema.ts.
  Tell me what approach you'd take."

Prompt 2: "Good plan. Start with the server-side event handling —
  document changes and cursor positions. Don't worry about the
  UI yet."

Prompt 3: "Now add the React hooks and components for the
  collaboration UI. Use the cursor data from the previous step."
\`\`\`

Each prompt builds Claude's context incrementally. By the time you reach the UI, Claude has deep understanding of the data layer it built.

---

## Layer 4: Memory and Continuity

Claude Code's memory system lets you persist context across sessions. Used well, it prevents you from re-explaining the same things every time you start a new conversation.

### What to Put in Memory

Memory is for things that are **true across sessions** and **not derivable from code**:

- Your role and expertise level ("I'm a senior backend engineer, new to this frontend codebase")
- Preferences Claude got wrong and you corrected ("Always use named exports, never default")
- Project context that isn't in the code ("We're migrating from REST to tRPC, so new endpoints should use tRPC")
- External system references ("Bug tracker is in Linear project PLATFORM")

### What NOT to Put in Memory

- Code patterns (they're in the code)
- File paths (they change)
- Current task state (use tasks instead)
- Anything already in CLAUDE.md

Think of memory as the things a new team member would need to know that aren't written down anywhere.

---

## Layer 5: Git History as Context

Your commit history is context Claude reads. Clean commits make Claude smarter about your project's evolution.

### How Claude Uses Git

When Claude explores your codebase, it can read:
- Recent commit messages (to understand what changed and why)
- Diff history (to see how code evolved)
- Branch names (to understand what you're working on)

This means your commit messages are literally training data for Claude's understanding of your project:

\`\`\`bash
# Bad — Claude learns nothing
git commit -m "fix stuff"
git commit -m "updates"

# Good — Claude learns intent and context
git commit -m "fix: prevent duplicate emails when order status webhook fires twice"
git commit -m "feat: add rate limiting to public API endpoints (100 req/min per key)"
\`\`\`

### Branch Context

Working on a feature branch with a descriptive name gives Claude immediate context about your current focus:

\`\`\`bash
git checkout -b feat/real-time-collaboration
# Claude now knows you're working on real-time collaboration
# and can make relevant suggestions
\`\`\`

---

## Layer 6: Runtime Context with MCP Servers

MCP (Model Context Protocol) servers give Claude access to live data from external systems. This is context engineering at the infrastructure level.

| MCP Server | Context It Provides |
|------------|-------------------|
| **Database MCP** | Real schema, sample data, relationships |
| **Figma MCP** | Actual design specs, not verbal descriptions |
| **GitHub MCP** | Issues, PRs, review comments |
| **Sentry MCP** | Real error traces, stack traces, frequency data |
| **Browser MCP** | What the page actually looks like, console errors |

Each server eliminates a category of guesswork. Without a database MCP, you describe your schema in words. With one, Claude reads the actual schema and writes queries that work against real data.

\`\`\`json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://localhost:5432/mydb"
      }
    }
  }
}
\`\`\`

---

## Putting It All Together: A Context Engineering Checklist

Before starting a significant coding session, run through this checklist:

### Project Foundation
- [ ] \`CLAUDE.md\` exists with commands, architecture decisions, and conventions
- [ ] Directory structure follows consistent, conventional patterns
- [ ] Dead code and abandoned patterns are removed or documented
- [ ] Git history has descriptive commit messages

### Session Setup
- [ ] Relevant MCP servers are configured for external data sources
- [ ] Memory contains persistent preferences and project context
- [ ] Current branch name describes the work you're doing

### Task Framing
- [ ] Goal is clearly stated (what, not how)
- [ ] Constraints are explicit (libraries, patterns, boundaries)
- [ ] Definition of done is specific (tests, behavior, scope)
- [ ] Reference files are pointed out for pattern matching

### Iteration
- [ ] Complex tasks are broken into progressive prompts
- [ ] Corrections include "why" so Claude learns the principle
- [ ] Good outputs are confirmed so Claude knows what worked

---

## The Compound Effect

Context engineering is not a one-time setup. It compounds over time:

1. **Week 1**: You write a basic CLAUDE.md and start structuring your prompts better. Claude's output improves noticeably.
2. **Month 1**: Your CLAUDE.md is refined from real sessions. Memory captures your preferences. Claude feels like it knows your project.
3. **Month 3**: Directory-level CLAUDE.md files guide behavior in different parts of the codebase. MCP servers provide live data. Claude produces code that passes your review on the first try most of the time.

The developers getting the most from Claude Code aren't writing better prompts. They're building better context environments. The investment is front-loaded, and the returns accelerate.

Start with your CLAUDE.md. That single file will change more about your Claude Code experience than any other technique in this guide.

---

*Get started with the [Context Engineering Kit](/skills/context-engineering) for ready-made patterns, explore [CLAUDE.md templates](/prompts) for your stack, or read the [complete CLAUDE.md guide](/blog/claude-md-guide) for more depth.*
`,
};
