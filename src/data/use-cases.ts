export interface UseCase {
  slug: string;
  title: string;
  headline: string;
  description: string;
  keywords: string[];
  tags: string[];
  primaryTopic: string;
}

export const useCases: UseCase[] = [
  {
    slug: "code-review",
    title: "Code Review",
    headline: "Claude Code setups for code review",
    description:
      "Automate pull request reviews, catch bugs before they ship, and enforce quality standards. Curated skills, agents, plugins, and hooks that plug Claude Code into your review workflow.",
    keywords: [
      "claude code code review",
      "automated pr review",
      "pull request review ai",
      "code quality claude code",
    ],
    tags: ["code-review", "review", "quality", "audit", "pr"],
    primaryTopic: "code-review",
  },
  {
    slug: "testing",
    title: "Testing",
    headline: "Claude Code setups for testing",
    description:
      "Generate tests, run them on save, and keep coverage honest. Skills, agents, MCP servers, and hooks that help Claude Code write, run, and monitor tests across your stack.",
    keywords: [
      "claude code testing",
      "test generation ai",
      "tdd claude code",
      "e2e testing claude",
    ],
    tags: ["testing", "tdd", "e2e", "coverage", "qa"],
    primaryTopic: "testing",
  },
  {
    slug: "security",
    title: "Security",
    headline: "Claude Code setups for security",
    description:
      "Scan for vulnerabilities, block leaked secrets, guard against prompt injection, and audit dependencies. Defensive configurations for Claude Code across skills, hooks, and agents.",
    keywords: [
      "claude code security",
      "security audit ai",
      "secret scanning claude",
      "prompt injection defense",
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
  },
  {
    slug: "git-workflows",
    title: "Git Workflows",
    headline: "Claude Code setups for Git and GitHub",
    description:
      "Commit messages, branch hygiene, PR authoring, and GitHub automation. Skills, agents, hooks, and MCP servers that make Claude Code a first-class citizen in your Git workflow.",
    keywords: [
      "claude code git",
      "git automation claude",
      "commit message ai",
      "github claude code",
    ],
    tags: ["git", "github", "commit", "branch", "conventional-commits"],
    primaryTopic: "git",
  },
  {
    slug: "documentation",
    title: "Documentation",
    headline: "Claude Code setups for documentation",
    description:
      "Write and maintain docs without the drag. Generate API references, changelogs, walkthroughs, and READMEs with skills, agents, and plugins that keep documentation in sync with code.",
    keywords: [
      "claude code documentation",
      "api docs ai",
      "changelog generator claude",
      "readme claude code",
    ],
    tags: ["documentation", "changelog", "api-docs"],
    primaryTopic: "documentation",
  },
  {
    slug: "debugging",
    title: "Debugging",
    headline: "Claude Code setups for debugging",
    description:
      "Bisect, trace, and triage faster. Skills, agents, MCP servers, and how-tos that help Claude Code find the root cause instead of patching symptoms.",
    keywords: [
      "claude code debugging",
      "debug with claude",
      "git bisect claude",
      "error triage ai",
    ],
    tags: ["debugging", "troubleshooting", "errors"],
    primaryTopic: "debugging",
  },
  {
    slug: "performance",
    title: "Performance",
    headline: "Claude Code setups for performance",
    description:
      "Profile, benchmark, and optimize with Claude Code. Skills, agents, and plugins that surface bottlenecks and guide real improvements — not guesswork.",
    keywords: [
      "claude code performance",
      "performance optimization ai",
      "benchmarking claude code",
      "profiling ai",
    ],
    tags: ["performance", "optimization", "benchmarking", "profiling"],
    primaryTopic: "performance",
  },
  {
    slug: "deployment",
    title: "Deployment & CI/CD",
    headline: "Claude Code setups for deployment and CI/CD",
    description:
      "Ship safely. Docker, Kubernetes, release automation, and pipeline integrations — skills, agents, plugins, and MCP servers that make Claude Code part of your deployment loop.",
    keywords: [
      "claude code deployment",
      "ci/cd claude code",
      "docker claude code",
      "kubernetes ai",
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
  },
  {
    slug: "databases",
    title: "Databases",
    headline: "Claude Code setups for databases",
    description:
      "Query, migrate, and optimize across SQL and NoSQL. MCP servers, skills, and agents for Postgres, MySQL, Redis, and more — wired into Claude Code.",
    keywords: [
      "claude code database",
      "sql claude code",
      "postgres claude",
      "database migration ai",
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
  },
  {
    slug: "api-development",
    title: "API Development",
    headline: "Claude Code setups for API development",
    description:
      "REST, GraphQL, OpenAPI, SDK generation. Skills, agents, plugins, and MCP servers that help Claude Code design, document, and implement APIs end-to-end.",
    keywords: [
      "claude code api",
      "rest api claude code",
      "graphql ai",
      "openapi claude code",
    ],
    tags: ["api", "rest", "graphql", "openapi", "swagger", "sdk"],
    primaryTopic: "api",
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
  },
];

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return useCases.find((u) => u.slug === slug);
}

export function getAllUseCaseSlugs(): string[] {
  return useCases.map((u) => u.slug);
}
