import { Skill } from "@/lib/types";

export const monorepoManagerSkill: Skill = {
  slug: "monorepo-manager",
  title: "Monorepo Manager",
  description:
    "Manage monorepo operations including dependency graphs, affected package detection, build ordering, and workspace coordination",
  tags: ["monorepo", "workspace", "dependencies", "build"],
  featured: false,
  dateAdded: "2026-03-25",
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  content: `# Monorepo Manager

A skill for navigating and managing monorepo workspaces — dependency analysis, affected package detection, build ordering, and cross-package operations.

## When to Use

Invoke this skill when you need to:
- Understand the dependency graph between packages
- Determine which packages are affected by a change
- Plan a build or release order
- Add, remove, or update dependencies across workspaces
- Create a new package that follows existing conventions

## Workflow

### Step 1: Detect Monorepo Structure

Identify the monorepo tool in use:
- Look for \`pnpm-workspace.yaml\`, \`lerna.json\`, \`nx.json\`, \`turbo.json\`, or \`workspaces\` in \`package.json\`
- Map all packages/workspaces and their locations
- Identify the root configuration and shared tooling

### Step 2: Build Dependency Graph

For each package:
- Parse \`package.json\` for \`dependencies\`, \`devDependencies\`, and \`peerDependencies\`
- Identify internal (workspace) vs external dependencies
- Detect circular dependencies and flag them
- Output a topologically sorted build order

### Step 3: Analyze Affected Packages

When changes are made:
- Use \`git diff\` to identify changed files
- Map changed files to their owning package
- Walk the dependency graph to find all downstream consumers
- Report direct and transitive impacts

### Step 4: Execute Operation

Based on the user's request:

**For dependency updates:**
- Update the target package(s)
- Check for version conflicts across workspaces
- Run install to update lockfile
- Verify builds still pass

**For new packages:**
- Scaffold from existing package conventions
- Configure build, test, and lint scripts
- Register in workspace configuration
- Set up inter-package dependencies

**For build/release:**
- Determine correct build order from dependency graph
- Identify packages with changes since last release
- Generate changelogs per package if needed

## Output Format

\\\`\\\`\\\`
## Monorepo Analysis

### Workspace Structure
- packages/core — shared utilities (0 internal deps)
- packages/ui — component library (depends on: core)
- packages/api — API client (depends on: core)
- apps/web — web application (depends on: core, ui, api)
- apps/mobile — mobile app (depends on: core, api)

### Build Order
1. packages/core
2. packages/ui, packages/api (parallel)
3. apps/web, apps/mobile (parallel)

### Affected by Current Changes
- packages/core (directly changed)
- packages/ui (depends on core)
- packages/api (depends on core)
- apps/web (transitive)
- apps/mobile (transitive)
\\\`\\\`\\\`
`,
};
