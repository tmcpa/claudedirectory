import { BlogPost } from "@/lib/types";

export const claudeMdGuide: BlogPost = {
  slug: "claude-md-guide",
  title: "The Complete Guide to CLAUDE.md: How to Configure Claude Code for Any Project",
  description:
    "Learn how to write an effective CLAUDE.md file to supercharge Claude Code in your projects. Covers structure, best practices, advanced patterns, and real-world examples for every tech stack.",
  publishedDate: "2026-02-10",
  tags: [
    "claude-code",
    "claude-md",
    "configuration",
    "best-practices",
    "tutorial",
    "developer-tools",
    "productivity",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudescodes",
  },
  relatedItems: [
    {
      type: "prompt",
      slug: "nextjs",
      relationship: "works-with",
    },
  ],
  content: `# The Complete Guide to CLAUDE.md: How to Configure Claude Code for Any Project

If you're using Claude Code — Anthropic's agentic coding tool for the terminal — you've probably noticed it works pretty well out of the box. But there's a single file that can transform it from a generic assistant into a context-aware team member that knows your codebase inside and out: **CLAUDE.md**.

This guide covers everything you need to know about writing effective CLAUDE.md files, from basic structure to advanced patterns used by teams shipping production code with Claude Code every day.

## What Is CLAUDE.md?

CLAUDE.md is a Markdown file you place in the root of your project (or in specific subdirectories) that gives Claude Code persistent instructions about your codebase. Think of it like a \`.editorconfig\` or \`.prettierrc\` — but instead of configuring a formatter, you're configuring an AI assistant.

When Claude Code starts a session, it automatically reads CLAUDE.md files and incorporates their contents into its system prompt. This means every interaction Claude has with your code is informed by the context you've defined.

### Where CLAUDE.md Files Live

Claude Code reads instructions from multiple locations, in order of priority:

1. **\`~/.claude/CLAUDE.md\`** — Your personal, global preferences (applied to all projects)
2. **\`./CLAUDE.md\`** — Project-level instructions (checked into your repo)
3. **\`./src/CLAUDE.md\`** — Directory-level overrides (for monorepos or large projects)
4. **\`.claude/settings.json\`** — Structured settings for permissions and tool configuration

The project-level CLAUDE.md is the most important one. It's what this guide focuses on.

## The Anatomy of a Great CLAUDE.md

After analyzing hundreds of CLAUDE.md files across open-source projects and production codebases, a clear pattern emerges. The best ones share five sections:

### 1. Project Overview

Start with a one-paragraph summary of what the project is and what tech stack it uses. Claude Code can infer a lot from your file structure, but explicitly stating the stack eliminates guesswork.

\`\`\`markdown
# CLAUDE.md

This is a Next.js 16 SaaS application using TypeScript, Tailwind CSS 4,
Drizzle ORM with PostgreSQL, and NextAuth for authentication. The app
provides real-time collaboration features via WebSockets.
\`\`\`

### 2. Common Commands

List the commands Claude Code will need most. This prevents it from guessing or running the wrong scripts.

\`\`\`markdown
## Commands

- \\\`npm run dev\\\` — Start dev server on port 3000
- \\\`npm run build\\\` — Production build
- \\\`npm run test\\\` — Run all tests with Vitest
- \\\`npm run test:unit -- path/to/file\\\` — Run a single test file
- \\\`npm run lint\\\` — ESLint check
- \\\`npm run db:migrate\\\` — Run database migrations
- \\\`npm run db:seed\\\` — Seed development data
\`\`\`

### 3. Architecture and Conventions

This is where the real value lives. Describe how your code is organized, naming conventions, and patterns that Claude should follow.

\`\`\`markdown
## Architecture

- \\\`src/app/\\\` — Next.js App Router pages and layouts
- \\\`src/components/ui/\\\` — Shared UI primitives (shadcn/ui)
- \\\`src/components/features/\\\` — Feature-specific components
- \\\`src/lib/\\\` — Utilities, types, and shared logic
- \\\`src/server/\\\` — Server-only code (API routes, DB queries)

## Conventions

- Use named exports, not default exports
- Components use PascalCase filenames (\\\`UserCard.tsx\\\`)
- Utilities use camelCase filenames (\\\`formatDate.ts\\\`)
- All database queries go through \\\`src/server/db/\\\`
- Use \\\`cn()\\\` from \\\`@/lib/utils\\\` for conditional classNames
\`\`\`

### 4. Important Rules and Constraints

Guard rails matter. Tell Claude what **not** to do, especially if there are patterns you've been burned by before.

\`\`\`markdown
## Rules

- NEVER modify migration files after they've been committed
- Always use server actions instead of API routes for mutations
- Do not add new dependencies without asking first
- Keep components under 200 lines — extract sub-components early
- All user-facing strings must use the i18n system (\\\`t()\\\` function)
\`\`\`

### 5. Key Types and Patterns

If your project has core types or domain-specific patterns, include them directly. This is especially valuable for complex domain models.

\`\`\`markdown
## Key Types

The core domain types are in \\\`src/lib/types.ts\\\`:
- \\\`Workspace\\\` — Top-level organization unit
- \\\`Project\\\` — Contains documents and members
- \\\`Document\\\` — The primary content entity with versioning
\`\`\`

## Advanced Patterns

### Monorepo CLAUDE.md Files

In a monorepo, use a root-level CLAUDE.md for shared context and package-level files for specifics:

\`\`\`
my-monorepo/
├── CLAUDE.md              # Shared: monorepo tooling, CI, deployment
├── packages/
│   ├── api/
│   │   └── CLAUDE.md      # API-specific: routes, middleware, DB
│   ├── web/
│   │   └── CLAUDE.md      # Frontend-specific: components, state
│   └── shared/
│       └── CLAUDE.md      # Shared library conventions
\`\`\`

Claude Code merges these automatically — the deeper file takes priority when instructions conflict.

### Environment-Specific Instructions

Include environment setup instructions so Claude can help debug configuration issues:

\`\`\`markdown
## Environment

Required env vars (see \\\`.env.example\\\`):
- \\\`DATABASE_URL\\\` — PostgreSQL connection string
- \\\`NEXTAUTH_SECRET\\\` — Auth encryption key
- \\\`STRIPE_SECRET_KEY\\\` — Payment processing (test mode in dev)

Do NOT read or output the contents of \\\`.env\\\` files.
\`\`\`

### Test Patterns

Describe your testing approach so Claude writes tests that match your existing suite:

\`\`\`markdown
## Testing

- Unit tests: Vitest + React Testing Library
- E2E tests: Playwright in \\\`tests/e2e/\\\`
- Test files live next to source: \\\`Component.test.tsx\\\`
- Use \\\`vi.mock()\\\` for module mocking, not manual stubs
- Always test error states and loading states
- Run single test: \\\`npm run test:unit -- src/components/UserCard.test.tsx\\\`
\`\`\`

## Real-World Examples by Tech Stack

### Python / FastAPI

\`\`\`markdown
# CLAUDE.md

Python 3.12 FastAPI application with SQLAlchemy 2.0 and Alembic migrations.

## Commands
- \\\`uv run fastapi dev\\\` — Start dev server
- \\\`uv run pytest\\\` — Run tests
- \\\`uv run alembic upgrade head\\\` — Apply migrations

## Conventions
- Use Pydantic v2 models for all request/response schemas
- Dependency injection via FastAPI \\\`Depends()\\\`
- Async endpoints by default (\\\`async def\\\`)
- All SQL queries use SQLAlchemy async session
\`\`\`

### Rust / Cargo

\`\`\`markdown
# CLAUDE.md

Rust workspace with a CLI binary and two library crates.

## Commands
- \\\`cargo build\\\` — Build all crates
- \\\`cargo test\\\` — Run all tests
- \\\`cargo clippy\\\` — Lint check
- \\\`cargo run -p cli -- <args>\\\` — Run the CLI

## Conventions
- Use \\\`thiserror\\\` for library errors, \\\`anyhow\\\` for CLI errors
- Prefer \\\`impl Into<T>\\\` over concrete types in function args
- All public APIs must have doc comments
- No unwrap() in library code — propagate errors with ?
\`\`\`

### Go / Standard Library

\`\`\`markdown
# CLAUDE.md

Go 1.23 microservice using standard library net/http and sqlc for database queries.

## Commands
- \\\`go run ./cmd/server\\\` — Start the server
- \\\`go test ./...\\\` — Run all tests
- \\\`sqlc generate\\\` — Regenerate DB query code

## Conventions
- Follow standard Go project layout
- Use context.Context as first param on all functions
- Table-driven tests with t.Run subtests
- Errors are values — wrap with fmt.Errorf("%w", err)
\`\`\`

## Common Mistakes to Avoid

### Being Too Vague

Bad:
\`\`\`markdown
This is a web app. Use best practices.
\`\`\`

Better:
\`\`\`markdown
This is a Next.js 16 app with App Router. Use server components by default.
Client components only when interactivity is needed. Style with Tailwind utility
classes — no CSS modules or styled-components.
\`\`\`

### Being Too Long

Your CLAUDE.md should be a concise reference, not a novel. If it exceeds 200 lines, you're probably including information that belongs in documentation or code comments. Claude Code reads this file on every session — keep it focused on what it needs to know to write correct code.

### Forgetting to Update It

A stale CLAUDE.md is worse than no CLAUDE.md. If you migrate from Jest to Vitest, or restructure your directory layout, update the file. Treat it like you would any other configuration file in your repo.

### Not Committing It

Your CLAUDE.md should be checked into version control. It benefits every developer on the team who uses Claude Code, and it ensures consistency across environments.

## Measuring Impact

How do you know your CLAUDE.md is working? Look for these signals:

- **Fewer corrections** — Claude follows your patterns on the first try
- **Correct commands** — It runs the right test runner, build tool, and scripts
- **Consistent style** — Generated code matches your existing codebase
- **Less context-setting** — You spend less time explaining "how we do things here"

## Getting Started

If you don't have a CLAUDE.md yet, start small:

1. Create a \`CLAUDE.md\` in your project root
2. Add your tech stack summary (2-3 sentences)
3. List your most-used commands
4. Add one or two conventions you find yourself repeating to Claude
5. Commit it and iterate

You can also browse the **[Claude Directory prompt library](/prompts)** for pre-built CLAUDE.md templates for popular frameworks — Next.js, FastAPI, Rails, Go, Rust, and more. Each template follows the patterns outlined in this guide and can be customized for your specific project.

## The Bottom Line

CLAUDE.md is the highest-leverage file you can add to a project that uses Claude Code. Five minutes of writing context saves hours of repeated corrections. It turns Claude from a general-purpose assistant into a team member who understands your architecture, follows your conventions, and runs the right commands every time.

Start with the basics, iterate as you work, and watch how much smoother your Claude Code sessions become.
`,
};
