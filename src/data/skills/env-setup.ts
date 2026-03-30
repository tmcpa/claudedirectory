import { Skill } from "@/lib/types";

export const envSetupSkill: Skill = {
  slug: "env-setup",
  title: "Project Environment Setup",
  description:
    "Detect project stack and automatically configure the local development environment with dependencies, tools, and services",
  tags: ["setup", "environment", "devtools", "onboarding", "automation"],
  featured: false,
  author: {
    name: "Claude Code Community",
  },
  content: `# Project Environment Setup Skill

Analyze a project and set up the complete local development environment — dependencies, tools, services, and configuration.

## Usage
\`\`\`
/env-setup
\`\`\`

## Behavior
1. Scan the project for stack markers (package.json, Cargo.toml, pyproject.toml, go.mod, etc.)
2. Check which required tools are installed and which are missing
3. Install missing dependencies and configure tool versions
4. Set up local services (databases, caches, queues) if defined in docker-compose
5. Verify the environment by running the project's build or test command

## Features

### Stack Detection
- Node.js (npm, yarn, pnpm, bun)
- Python (pip, poetry, uv, conda)
- Rust (cargo)
- Go (go mod)
- Ruby (bundler)
- Java/Kotlin (gradle, maven)
- .NET (dotnet)

### Tool Verification
- Check runtime versions against .node-version, .python-version, .tool-versions
- Verify required CLI tools (docker, git, terraform, kubectl, etc.)
- Suggest installations via Homebrew, apt, or the appropriate package manager

### Service Setup
- Start Docker Compose services if docker-compose.yml exists
- Run database migrations if detected
- Seed development data if seed scripts are present
- Create .env from .env.example with placeholder values

### Verification
- Run the project's build command to confirm compilation
- Run the test suite to confirm environment is functional
- Report any remaining issues with suggested fixes

## Example
\`\`\`
/env-setup
\`\`\`
Detects a Next.js + Postgres project, installs Node 22 via nvm, runs npm install, starts the database via Docker Compose, runs migrations, and confirms the dev server starts.
`,
};
