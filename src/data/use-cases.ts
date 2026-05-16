export interface UseCaseExample {
  title: string;
  prompt: string;
}

export interface UseCase {
  slug: string;
  title: string;
  headline: string;
  description: string;
  keywords: string[];
  tags: string[];
  primaryTopic: string;
  examples: UseCaseExample[];
}

export const useCases: UseCase[] = [
  {
    slug: "code-review",
    title: "Code Review",
    headline: "Claude Code setups for code review",
    description:
      "Automate pull request reviews, catch bugs before they ship, and enforce quality standards. Curated skills, agents, plugins, and hooks that wire Claude Code into your review workflow — from local pre-push checks to multi-agent cloud reviews on every PR.",
    keywords: [
      "claude code code review",
      "automated pr review",
      "pull request review ai",
      "code quality claude code",
      "ultrareview",
    ],
    tags: ["code-review", "review", "quality", "audit", "pr"],
    primaryTopic: "code-review",
    examples: [
      {
        title: "Review the current branch before opening a PR",
        prompt: "/review",
      },
      {
        title: "Run a multi-agent cloud review on a GitHub PR",
        prompt: "/ultrareview 1234",
      },
      {
        title: "Audit a diff for security issues",
        prompt:
          "Use the security-audit skill on the staged diff and flag anything that needs a human reviewer.",
      },
      {
        title: "Block merges when coverage drops",
        prompt:
          "Add the test-coverage-guard hook so PRs that drop branch coverage below 80% fail locally.",
      },
    ],
  },
  {
    slug: "testing",
    title: "Testing",
    headline: "Claude Code setups for testing",
    description:
      "Generate tests, run them on save, and keep coverage honest. Skills, agents, MCP servers, and hooks that help Claude Code write, run, and monitor tests across unit, integration, and end-to-end layers.",
    keywords: [
      "claude code testing",
      "test generation ai",
      "tdd claude code",
      "e2e testing claude",
      "playwright claude code",
    ],
    tags: ["testing", "tdd", "e2e", "coverage", "qa"],
    primaryTopic: "testing",
    examples: [
      {
        title: "Generate tests for an untested module",
        prompt:
          "Use the test-gen skill to write Vitest tests for src/lib/billing.ts and target 90% branch coverage.",
      },
      {
        title: "Enforce TDD with a hook",
        prompt:
          "Enable the tdd-guard hook, then implement POST /api/invoices — tests must exist before the implementation file is edited.",
      },
      {
        title: "End-to-end test a checkout flow",
        prompt:
          "Use the Playwright MCP server to walk through /checkout and assert the confirmation page renders with the right order ID.",
      },
      {
        title: "Re-run failing tests automatically on save",
        prompt:
          "Add the auto-test hook so the last failing spec re-runs whenever I edit the file under test.",
      },
    ],
  },
  {
    slug: "security",
    title: "Security",
    headline: "Claude Code setups for security",
    description:
      "Scan for vulnerabilities, block leaked secrets, guard against prompt injection, and audit dependencies. Defensive configurations across skills, hooks, agents, and the permission system — including the built-in /security-review slash command.",
    keywords: [
      "claude code security",
      "security audit ai",
      "secret scanning claude",
      "prompt injection defense",
      "claude code permissions",
    ],
    tags: [
      "security",
      "audit",
      "owasp",
      "vulnerability",
      "secrets",
      "prompt-injection",
      "scanning",
    ],
    primaryTopic: "security",
    examples: [
      {
        title: "Audit the current branch for vulnerabilities",
        prompt: "/security-review",
      },
      {
        title: "Block accidental secret commits",
        prompt:
          "Enable the env-leak-detector and prompt-injection-defense hooks so .env values and untrusted instructions are blocked at the tool layer.",
      },
      {
        title: "Lock down which shell commands Claude can run",
        prompt:
          "Add a deny rule for `rm -rf`, `curl | sh`, and any psql against prod in .claude/settings.json.",
      },
      {
        title: "Triage a CVE in a dependency",
        prompt:
          "Use the deps-audit skill to evaluate the latest GHSA advisory against package.json and write a remediation plan.",
      },
    ],
  },
  {
    slug: "git-workflows",
    title: "Git Workflows",
    headline: "Claude Code setups for Git and GitHub",
    description:
      "Commit messages, branch hygiene, PR authoring, and GitHub automation. Skills, agents, hooks, and MCP servers that make Claude Code a first-class citizen in your Git workflow — including the built-in /commit and /pr slash commands.",
    keywords: [
      "claude code git",
      "git automation claude",
      "commit message ai",
      "github claude code",
      "conventional commits ai",
    ],
    tags: ["git", "github", "commit", "branch", "conventional-commits"],
    primaryTopic: "git",
    examples: [
      {
        title: "Write a Conventional Commit from staged changes",
        prompt: "/commit",
      },
      {
        title: "Open a PR with a generated title and body",
        prompt: "/pr",
      },
      {
        title: "Drop the Co-Authored-By: Claude trailer",
        prompt:
          "Apply the remove-co-authored-by how-to so commits land under my name only.",
      },
      {
        title: "Auto-update CHANGELOG.md on every release tag",
        prompt:
          "Wire the auto-changelog hook to regenerate CHANGELOG.md from merged PRs whenever a vX.Y.Z tag is pushed.",
      },
    ],
  },
  {
    slug: "documentation",
    title: "Documentation",
    headline: "Claude Code setups for documentation",
    description:
      "Write and maintain docs without the drag. Generate API references, changelogs, walkthroughs, and READMEs with skills, agents, and plugins that keep documentation in sync with code — and bootstrap a CLAUDE.md for any repo with /init.",
    keywords: [
      "claude code documentation",
      "api docs ai",
      "changelog generator claude",
      "readme claude code",
      "claude.md generator",
    ],
    tags: ["documentation", "changelog", "api-docs"],
    primaryTopic: "documentation",
    examples: [
      {
        title: "Bootstrap a CLAUDE.md for a fresh repo",
        prompt: "/init",
      },
      {
        title: "Generate an OpenAPI spec from existing routes",
        prompt:
          "Use the api-docs skill to produce openapi.yaml from src/api with example responses inferred from tests.",
      },
      {
        title: "Write a walkthrough of a new feature",
        prompt:
          "Use the code-walkthrough skill to explain the auth flow as if onboarding a junior engineer.",
      },
      {
        title: "Keep the README in sync after a refactor",
        prompt:
          "Re-read README.md against the current code, flag what's drifted, and patch it.",
      },
    ],
  },
  {
    slug: "debugging",
    title: "Debugging",
    headline: "Claude Code setups for debugging",
    description:
      "Bisect, trace, and triage faster. Skills, agents, MCP servers, and how-tos that help Claude Code find the root cause instead of patching symptoms — wire in Sentry, Datadog, or your own logs and let Claude reproduce locally.",
    keywords: [
      "claude code debugging",
      "debug with claude",
      "git bisect claude",
      "error triage ai",
      "sentry claude code",
    ],
    tags: ["debugging", "troubleshooting", "errors"],
    primaryTopic: "debugging",
    examples: [
      {
        title: "Find the commit that broke a test",
        prompt:
          "Use the git-bisect skill to find the commit that caused 'creates user' in user.spec.ts to fail.",
      },
      {
        title: "Triage a production error from Sentry",
        prompt:
          "Connect the Sentry MCP server, pull the top unresolved issue, reproduce locally, and write a regression test.",
      },
      {
        title: "Debug a flaky test",
        prompt:
          "Use the debugger agent to find the race condition in checkout.spec.ts — it fails ~1 in 20 runs.",
      },
      {
        title: "Stream logs from a running dev server",
        prompt:
          "Use the Monitor tool to watch `npm run dev` and surface the stack trace when /api/orders 500s.",
      },
    ],
  },
  {
    slug: "performance",
    title: "Performance",
    headline: "Claude Code setups for performance",
    description:
      "Profile, benchmark, and optimize with Claude Code. Skills, agents, and plugins that surface bottlenecks and guide real improvements — not guesswork. Includes hooks that guard against bundle-size and query-time regressions on every commit.",
    keywords: [
      "claude code performance",
      "performance optimization ai",
      "benchmarking claude code",
      "profiling ai",
      "bundle size guard",
    ],
    tags: ["performance", "optimization", "benchmarking", "profiling"],
    primaryTopic: "performance",
    examples: [
      {
        title: "Benchmark before refactoring a hot path",
        prompt:
          "Use the perf-benchmark skill to measure src/lib/render.ts and save baseline numbers to bench/baseline.json.",
      },
      {
        title: "Profile a slow Postgres query",
        prompt:
          "Use the sql-optimizer skill with the Postgres MCP server to EXPLAIN ANALYZE the orders dashboard query and propose an index.",
      },
      {
        title: "Guard against bundle-size regressions",
        prompt:
          "Enable the bundle-size-check hook with a 5% budget on the main entry chunk.",
      },
      {
        title: "Eliminate unnecessary React re-renders",
        prompt:
          "Use the performance-optimizer agent to find re-renders in src/components/Dashboard and propose memoization.",
      },
    ],
  },
  {
    slug: "deployment",
    title: "Deployment & CI/CD",
    headline: "Claude Code setups for deployment and CI/CD",
    description:
      "Ship safely. Docker, Kubernetes, release automation, and pipeline integrations — skills, agents, plugins, and MCP servers that make Claude Code part of your deployment loop. Run Claude in CI for review, in routines for scheduled tasks, and in managed agents for hands-off jobs.",
    keywords: [
      "claude code deployment",
      "ci/cd claude code",
      "docker claude code",
      "kubernetes ai",
      "claude code github actions",
    ],
    tags: [
      "deployment",
      "ci-cd",
      "docker",
      "kubernetes",
      "release",
      "containers",
    ],
    primaryTopic: "deployment",
    examples: [
      {
        title: "Containerize an existing service",
        prompt:
          "Use the docker-compose skill to add a Dockerfile and compose.yaml for this Node app, with multi-stage build.",
      },
      {
        title: "Add Claude review to your CI pipeline",
        prompt:
          "Add a GitHub Action that runs lint, test, and `claude code review` on every PR, posting inline comments.",
      },
      {
        title: "Plan a zero-downtime database migration",
        prompt:
          "Use the deployment-engineer agent to plan the rollout of migrations/0042_add_users_email.sql on a 50M-row table.",
      },
      {
        title: "Schedule a nightly dependency-update routine",
        prompt:
          "Use /schedule to run `npm outdated` and open a PR with safe minor bumps every weekday at 03:00 UTC.",
      },
    ],
  },
  {
    slug: "databases",
    title: "Databases",
    headline: "Claude Code setups for databases",
    description:
      "Query, migrate, and optimize across SQL and NoSQL. MCP servers, skills, and agents for Postgres, MySQL, Redis, MongoDB, BigQuery, and more — wired into Claude Code so you can ask the database questions in natural language.",
    keywords: [
      "claude code database",
      "sql claude code",
      "postgres claude",
      "database migration ai",
      "bigquery claude code",
    ],
    tags: [
      "database",
      "postgres",
      "sql",
      "migrations",
      "mysql",
      "redis",
      "nosql",
    ],
    primaryTopic: "database",
    examples: [
      {
        title: "Query Postgres without leaving the editor",
        prompt:
          "Connect the Postgres MCP server, then ask: 'show me the slowest queries from the last hour and their plans.'",
      },
      {
        title: "Write a safe migration",
        prompt:
          "Use the migrate-db skill to add a NOT NULL column to a 50M-row users table without holding a long lock.",
      },
      {
        title: "Optimize a slow query",
        prompt:
          "Use the sql-optimizer skill on the orders dashboard query and explain the plan in plain English.",
      },
      {
        title: "Introspect a live DB into Prisma",
        prompt:
          "Use the Prisma MCP server to introspect the staging DB and generate schema.prisma.",
      },
    ],
  },
  {
    slug: "api-development",
    title: "API Development",
    headline: "Claude Code setups for API development",
    description:
      "REST, GraphQL, OpenAPI, SDK generation. Skills, agents, plugins, and MCP servers that help Claude Code design, document, and implement APIs end-to-end — from spec to typed client to webhook receiver.",
    keywords: [
      "claude code api",
      "rest api claude code",
      "graphql ai",
      "openapi claude code",
      "sdk generator ai",
    ],
    tags: ["api", "rest", "graphql", "openapi", "swagger", "sdk"],
    primaryTopic: "api",
    examples: [
      {
        title: "Scaffold a REST API from an OpenAPI spec",
        prompt:
          "Use the api-developer agent to scaffold endpoints, types, and tests from openapi.yaml.",
      },
      {
        title: "Generate a typed TypeScript SDK",
        prompt:
          "Use the api-docs skill output to generate a typed client with zod schemas and request retries.",
      },
      {
        title: "Stub a Stripe webhook receiver",
        prompt:
          "Add POST /webhooks/stripe with signature verification, idempotency, and tests for the payment_intent.succeeded event.",
      },
      {
        title: "Migrate from REST to GraphQL",
        prompt:
          "Use the graphql-specialist agent to migrate /api/v1 endpoints to a single /graphql resolver, keeping behavior identical.",
      },
    ],
  },
  {
    slug: "refactoring",
    title: "Refactoring",
    headline: "Claude Code setups for refactoring and modernization",
    description:
      "Cut technical debt without breaking what works. Skills, agents, plugins, and how-tos that help Claude Code untangle legacy code, extract modules, and migrate across framework versions with tests in the loop.",
    keywords: [
      "claude code refactoring",
      "legacy code refactor ai",
      "code modernization claude",
      "technical debt ai",
      "framework migration ai",
    ],
    tags: [
      "refactoring",
      "migration",
      "migrations",
      "code-quality",
      "optimization",
      "monorepo",
      "architecture",
    ],
    primaryTopic: "refactoring",
    examples: [
      {
        title: "Extract a tangled module into smaller files",
        prompt:
          "Use the refactor skill on src/lib/orders.ts and propose a split — keep behavior identical and update imports.",
      },
      {
        title: "Migrate from React 18 to 19",
        prompt:
          "Use the migration-specialist agent to plan the upgrade, surface breaking changes, and stage PRs by package.",
      },
      {
        title: "Find and dedupe code across a monorepo",
        prompt:
          "Use the monorepo-manager skill to find duplicated utils across apps/ and extract them to packages/shared.",
      },
      {
        title: "Modernize a callback-heavy module to async/await",
        prompt:
          "Refactor src/lib/jobs.ts from callbacks to async/await, keeping behavior identical, and update the tests.",
      },
    ],
  },
  {
    slug: "frontend",
    title: "Frontend Development",
    headline: "Claude Code setups for frontend and UI development",
    description:
      "Build React, Vue, and Svelte interfaces with Claude Code in the loop. Skills, agents, plugins, and MCP servers for components, design systems, accessibility, and visual testing — including Claude Preview and Claude in Chrome for clicking through what you just built.",
    keywords: [
      "claude code frontend",
      "claude code react",
      "claude code ui",
      "claude code design system",
      "claude in chrome",
    ],
    tags: [
      "frontend",
      "ui",
      "design",
      "design-system",
      "components",
      "react",
      "accessibility",
    ],
    primaryTopic: "frontend",
    examples: [
      {
        title: "Spin up a polished landing page",
        prompt:
          "Use the frontend-design skill to scaffold a hero, features grid, and pricing section with shadcn/ui.",
      },
      {
        title: "Audit a form for accessibility",
        prompt:
          "Use the accessibility-expert agent to review and fix the signup form for WCAG 2.2 AA.",
      },
      {
        title: "Click through your own UI changes",
        prompt:
          "Use the Claude Preview MCP to open the new component, walk through its states, and screenshot each one.",
      },
      {
        title: "Add a design system from scratch",
        prompt:
          "Use the design-system-engineer agent to set up tokens, primitives, and a Storybook for the public site.",
      },
    ],
  },
  {
    slug: "codebase-onboarding",
    title: "Codebase Onboarding",
    headline: "Claude Code setups for learning a new codebase",
    description:
      "Land in an unfamiliar repo and ship in a week. Agents, skills, MCP servers, and how-tos that help Claude Code map architecture, surface conventions, and build the mental model you need to be useful fast — and persist what you learn to memory for the next session.",
    keywords: [
      "claude code onboarding",
      "learn codebase ai",
      "codebase exploration claude",
      "code archaeology ai",
      "claude.md generator",
    ],
    tags: [
      "onboarding",
      "exploration",
      "architecture",
      "claude-md",
      "memory",
      "context",
      "search",
    ],
    primaryTopic: "onboarding",
    examples: [
      {
        title: "Generate a CLAUDE.md for a repo you've never seen",
        prompt: "/init",
      },
      {
        title: "Map the top-level architecture",
        prompt:
          "Use the code-explorer agent to produce an architecture diagram and identify the top 5 modules by churn.",
      },
      {
        title: "Find where a feature is implemented",
        prompt:
          "Use the Explore subagent: 'where does auth happen and which files reference the session cookie?'",
      },
      {
        title: "Persist what you learn across sessions",
        prompt:
          "Save memories about ownership, conventions, and gotchas as you explore — they'll load on the next session.",
      },
    ],
  },
  {
    slug: "ai-agent-development",
    title: "AI & Agent Development",
    headline: "Claude Code setups for building AI agents and Claude apps",
    description:
      "Build with the Claude API, the Agent SDK, and the MCP ecosystem. Skills, agents, and plugins that help you scaffold Claude apps with prompt caching, author custom MCP servers, design multi-agent pipelines, and tune prompts for production.",
    keywords: [
      "claude api claude code",
      "agent sdk claude code",
      "mcp server builder",
      "prompt engineering ai",
      "multi agent system claude",
    ],
    tags: [
      "ai",
      "llm",
      "agent-sdk",
      "mcp",
      "prompt-engineering",
      "agents",
      "rag",
      "embeddings",
    ],
    primaryTopic: "ai",
    examples: [
      {
        title: "Build a Claude API app with prompt caching",
        prompt:
          "Use the claude-api skill to scaffold a chat app with prompt caching, streaming, and tool use against claude-opus-4-7.",
      },
      {
        title: "Author a custom MCP server",
        prompt:
          "Use the mcp-builder skill to expose our internal billing API as MCP tools with proper auth and rate limits.",
      },
      {
        title: "Design a multi-agent system",
        prompt:
          "Use the ai-engineer agent to plan a researcher → writer → reviewer pipeline using the Agent SDK.",
      },
      {
        title: "Tune a prompt for production",
        prompt:
          "Use the prompt-engineer agent to A/B test two system prompts against a 50-case eval and report variance.",
      },
    ],
  },
  {
    slug: "mobile",
    title: "Mobile Development",
    headline: "Claude Code setups for iOS, Android, and cross-platform mobile",
    description:
      "Ship mobile features faster. Agents and skills for SwiftUI, Jetpack Compose, Flutter, and React Native — plus an iOS simulator skill so Claude Code can drive the app and tail logs without leaving the terminal.",
    keywords: [
      "claude code mobile",
      "claude code ios",
      "claude code flutter",
      "claude code react native",
      "swiftui claude code",
    ],
    tags: [
      "mobile",
      "ios",
      "android",
      "flutter",
      "react-native",
      "swift",
      "kotlin",
    ],
    primaryTopic: "mobile",
    examples: [
      {
        title: "Build a SwiftUI screen end-to-end",
        prompt:
          "Use the ios-developer agent to implement the onboarding flow in SwiftUI, wired to the existing API client.",
      },
      {
        title: "Add a Flutter feature with hot reload",
        prompt:
          "Use the flutter-mobile agent to add a profile screen and wire it to the existing GraphQL endpoint.",
      },
      {
        title: "Debug on the iOS simulator without leaving the terminal",
        prompt:
          "Use the ios-simulator skill to launch the app, tail logs, and tap through the signup flow.",
      },
      {
        title: "Migrate React Native to the new architecture",
        prompt:
          "Use the migration-specialist agent to plan the Fabric/TurboModules upgrade for our RN 0.74 app.",
      },
    ],
  },
  {
    slug: "observability",
    title: "Observability & Monitoring",
    headline: "Claude Code setups for observability and incident response",
    description:
      "Pull logs, metrics, and traces directly into Claude Code. MCP servers for Sentry, Datadog, Grafana, New Relic, Axiom, and PagerDuty — plus agents that triage production incidents and propose fixes with the data already in context.",
    keywords: [
      "claude code observability",
      "claude code sentry",
      "claude code datadog",
      "claude code grafana",
      "incident response ai",
    ],
    tags: [
      "observability",
      "monitoring",
      "logging",
      "metrics",
      "tracing",
      "sentry",
      "datadog",
      "grafana",
      "newrelic",
      "axiom",
      "pagerduty",
    ],
    primaryTopic: "observability",
    examples: [
      {
        title: "Triage the top 5 unresolved Sentry issues",
        prompt:
          "Connect the Sentry MCP server and walk through the top 5 unresolved production issues, grouping by likely root cause.",
      },
      {
        title: "Investigate a latency spike on Grafana",
        prompt:
          "Use the Grafana MCP server with the observability-engineer agent to find what changed at 14:03 UTC on the checkout dashboard.",
      },
      {
        title: "Add structured logging to a Node service",
        prompt:
          "Use the observability-engineer agent to wire pino with request IDs and OTEL trace correlation across the API.",
      },
      {
        title: "Wire Claude into your on-call rotation",
        prompt:
          "Connect the PagerDuty MCP, fetch the active incident, and have Claude propose the next runbook step.",
      },
    ],
  },
  {
    slug: "refactoring",
    title: "Refactoring",
    headline: "Claude Code setups for refactoring and modernization",
    description:
      "Cut technical debt without breaking what works. Skills, agents, plugins, and how-tos that help Claude Code untangle legacy code, extract modules, and migrate across framework versions with tests in the loop.",
    keywords: [
      "claude code refactoring",
      "legacy code refactor ai",
      "code modernization claude",
      "technical debt ai",
    ],
    tags: [
      "refactoring",
      "migration",
      "migrations",
      "code-quality",
      "optimization",
      "monorepo",
      "architecture",
    ],
    primaryTopic: "refactoring",
    examples: [
      {
        title: "Extract a tangled module behind a clean interface",
        prompt:
          "Identify the public surface of src/billing, propose a smaller interface, and refactor callers to use it without changing behavior. Keep tests green at every step.",
      },
      {
        title: "Migrate to a new framework version with tests in the loop",
        prompt:
          "Migrate this app from Next.js 14 to Next.js 15. Work in small commits, run tests after each, and pause on any breaking change in the changelog.",
      },
    ],
  },
  {
    slug: "frontend",
    title: "Frontend Development",
    headline: "Claude Code setups for frontend and UI development",
    description:
      "Build React, Vue, and Svelte interfaces with Claude Code in the loop. Skills, agents, plugins, and MCP servers for components, design systems, accessibility, and the browser side of the stack.",
    keywords: [
      "claude code frontend",
      "claude code react",
      "claude code ui",
      "claude code design system",
    ],
    tags: [
      "frontend",
      "ui",
      "design",
      "design-system",
      "components",
      "react",
      "accessibility",
    ],
    primaryTopic: "frontend",
    examples: [
      {
        title: "Build a polished component from a Figma spec",
        prompt:
          "Use the design-system-engineer agent and the frontend-design skill to scaffold a pricing table that matches the linked Figma frame, with our Tailwind tokens and accessible markup.",
      },
      {
        title: "Audit a page for accessibility regressions",
        prompt:
          "Run the accessibility-expert agent across app/dashboard, list WCAG AA issues with line numbers, and propose minimal fixes that keep the visual design intact.",
      },
    ],
  },
  {
    slug: "codebase-onboarding",
    title: "Codebase Onboarding",
    headline: "Claude Code setups for learning a new codebase",
    description:
      "Land in an unfamiliar repo and ship in a week. Agents, skills, MCP servers, and how-tos that help Claude Code map architecture, surface conventions, and build the mental model you need to be useful fast.",
    keywords: [
      "claude code onboarding",
      "learn codebase ai",
      "codebase exploration claude",
      "code archaeology ai",
    ],
    tags: [
      "onboarding",
      "exploration",
      "architecture",
      "claude-md",
      "memory",
      "context",
      "search",
    ],
    primaryTopic: "onboarding",
    examples: [
      {
        title: "Map the architecture of an unfamiliar repo",
        prompt:
          "Walk the repo and produce a short architecture overview: top-level modules, how requests flow from API to DB, and which boundaries are stable vs. in flux. Save it as ARCHITECTURE.md.",
      },
      {
        title: "Seed CLAUDE.md with the conventions that actually matter",
        prompt:
          "Read 20 recent PRs and the most-touched files, then draft a CLAUDE.md that captures the team's real conventions — naming, testing, error handling — not generic best practices.",
      },
    ],
  },
];

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return useCases.find((u) => u.slug === slug);
}

export function getAllUseCaseSlugs(): string[] {
  return useCases.map((u) => u.slug);
}
