import { BlogPost } from "@/lib/types";

export const howToCreateClaudeSkills: BlogPost = {
  slug: "how-to-create-claude-skills",
  title:
    "How to Create Custom Claude Code Skills: A Complete Guide",
  description:
    "Learn how to build custom skills for Claude Code — reusable slash commands that automate your most common workflows. Step-by-step tutorial with real examples.",
  publishedDate: "2026-03-18",
  tags: [
    "claude-code",
    "skills",
    "tutorial",
    "automation",
    "customization",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "skill",
      slug: "commit",
      relationship: "documented-by",
    },
    {
      type: "skill",
      slug: "refactor",
      relationship: "documented-by",
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
  ],
  content: `# How to Create Custom Claude Code Skills: A Complete Guide

Skills are one of Claude Code's most powerful features — and one of the least understood. They let you define reusable slash commands that encode your exact workflow into a single invocation. Instead of typing the same multi-step instructions every time, you type \`/your-skill\` and Claude executes the full workflow automatically.

This guide walks you through everything: what skills are, how they work under the hood, how to create them, and real-world examples you can adapt for your own projects.

---

## What Are Claude Code Skills?

A skill is a markdown file that acts as a prompt template. When you invoke a skill with a slash command (e.g., \`/commit\`, \`/review\`, \`/deploy\`), Claude Code reads the markdown file and uses its contents as instructions for how to handle the task.

Think of skills as **programmable behaviors**. Hooks automate tool-level actions. CLAUDE.md sets global context. Skills sit in between — they're on-demand workflows you trigger when you need them.

### Why Skills Matter

- **Consistency**: Every team member runs the same workflow the same way
- **Speed**: Complex multi-step processes become a single command
- **Knowledge capture**: Encode your team's best practices into executable instructions
- **Composability**: Skills can reference other tools, MCP servers, and patterns

---

## How Skills Work

Skills are stored as markdown files (\`.md\`) in specific directories. Claude Code discovers them automatically based on their location.

### Skill File Locations

Skills can live in three places, each with a different scope:

| Location | Scope | Use Case |
|---|---|---|
| \`~/.claude/skills/\` | Global (all projects) | Personal workflows you use everywhere |
| \`.claude/skills/\` | Project (shared via git) | Team workflows committed to the repo |
| \`.claude/skills/\` in any parent directory | Inherited | Organization-wide skills in a monorepo root |

Claude Code automatically scans these directories and registers any \`.md\` files it finds as available skills.

### Anatomy of a Skill File

A skill file is just markdown with an optional frontmatter block. Here's the structure:

\`\`\`markdown
---
description: One-line description shown in skill picker
\`\`\`

The rest of the file is your prompt — the instructions Claude will follow when the skill is invoked.

The filename becomes the slash command. A file named \`deploy.md\` becomes \`/deploy\`. A file in a subdirectory like \`git/commit.md\` becomes \`/git:commit\`.

---

## Creating Your First Skill

Let's build a skill from scratch. We'll create a \`/review\` skill that performs a thorough code review on staged changes.

### Step 1: Create the Skills Directory

\`\`\`bash
mkdir -p .claude/skills
\`\`\`

Use \`.claude/skills/\` for project-level skills (shared with your team) or \`~/.claude/skills/\` for personal skills.

### Step 2: Create the Skill File

Create \`.claude/skills/review.md\`:

\`\`\`markdown
---
description: Review staged changes for bugs, style issues, and best practices
---

Review my staged git changes. Follow these steps:

1. Run \\\`git diff --staged\\\` to see all staged changes
2. For each changed file, analyze:
   - Logic errors or potential bugs
   - Security vulnerabilities (injection, auth issues, data exposure)
   - Performance concerns (N+1 queries, unnecessary re-renders, missing indexes)
   - Style consistency with the rest of the codebase
   - Missing error handling or edge cases
   - Test coverage gaps

3. Organize findings by severity:
   - **Critical**: Must fix before merging
   - **Warning**: Should fix, but not a blocker
   - **Suggestion**: Nice-to-have improvements

4. For each finding, include:
   - The file and line number
   - What the issue is
   - A suggested fix with code

5. End with an overall assessment: is this ready to merge?
\`\`\`

### Step 3: Use the Skill

Now in Claude Code, just type:

\`\`\`
/review
\`\`\`

Claude reads your skill file and executes the full review workflow. Every time, the same thorough process, the same severity categories, the same output format.

---

## Skill Design Patterns

The best skills share a few characteristics. Here are patterns that work well.

### Pattern 1: Step-by-Step Instructions

Structure your skill as a numbered sequence of actions. This gives Claude a clear execution path and makes the output predictable.

\`\`\`markdown
---
description: Generate a changelog from recent commits
---

Generate a changelog entry for the latest release:

1. Run \\\`git log --oneline $(git describe --tags --abbrev=0)..HEAD\\\` to get commits since last tag
2. Group commits by type (feat, fix, docs, refactor, etc.)
3. Write a user-facing changelog entry in Keep a Changelog format
4. Include the date and next version number (bump based on commit types)
5. Prepend to CHANGELOG.md
\`\`\`

### Pattern 2: Conditional Logic

Skills can include branching instructions. Claude will evaluate conditions and follow the appropriate path.

\`\`\`markdown
---
description: Smart test runner that picks the right strategy
---

Run tests for the changes I've made:

1. Identify which files have changed using \\\`git diff --name-only\\\`
2. Determine the test strategy:
   - If only test files changed: run just those tests
   - If source files changed: find and run their corresponding test files
   - If config files changed (package.json, tsconfig, etc.): run the full test suite
3. Run the appropriate test command for this project
4. If any tests fail, analyze the failure and suggest a fix
\`\`\`

### Pattern 3: Template Output

When you need consistent output formatting, include the template directly in the skill.

\`\`\`markdown
---
description: Create a pull request with a standardized description
---

Create a pull request for the current branch:

1. Analyze all commits on this branch vs main
2. Create the PR with this format:

Title: A concise description under 70 characters

Body:
## What
[1-2 sentence summary of the change]

## Why
[The motivation — what problem does this solve?]

## How
[Brief technical approach]

## Testing
[How to verify this works]

## Checklist
- [ ] Tests pass
- [ ] No new warnings
- [ ] Documentation updated (if needed)

3. Use \\\`gh pr create\\\` to create the PR
\`\`\`

### Pattern 4: Skills with Arguments

Skills can accept arguments. Everything after the slash command is passed to the skill as context.

\`\`\`markdown
---
description: Explain a file or function in detail
---

Explain the code that the user specified. Provide:

1. **Purpose**: What does this code do at a high level?
2. **How it works**: Walk through the key logic step by step
3. **Dependencies**: What does it import or depend on?
4. **Side effects**: Does it modify state, make API calls, or write to disk?
5. **Edge cases**: What inputs or conditions could cause problems?

Keep the explanation appropriate for a mid-level developer who is new to this codebase.
\`\`\`

Usage: \`/explain src/utils/parser.ts\` or \`/explain the authentication middleware\`

---

## Real-World Skill Examples

Here are production-ready skills you can drop into your project today.

### Database Migration Skill

\`\`\`markdown
---
description: Create and run a database migration
---

Create a database migration for the requested change:

1. Determine the ORM/migration tool used in this project
2. Generate the migration file using the project's conventions
3. Write both the up and down migrations
4. Run the migration against the development database
5. Verify the migration succeeded by checking the schema
6. If there's a seed file pattern, ask if seed data needs updating
\`\`\`

### Security Audit Skill

\`\`\`markdown
---
description: Run a security audit on the codebase
---

Perform a security audit:

1. Check dependencies for known vulnerabilities (\\\`npm audit\\\` or equivalent)
2. Scan for hardcoded secrets, API keys, or credentials
3. Review authentication and authorization patterns
4. Check for common vulnerabilities:
   - SQL injection
   - XSS (cross-site scripting)
   - CSRF (cross-site request forgery)
   - Insecure deserialization
   - Exposed debug endpoints
5. Check environment variable handling (.env files in .gitignore, no defaults in code)
6. Report findings with severity ratings and remediation steps
\`\`\`

### Component Generator Skill

\`\`\`markdown
---
description: Generate a new React component following project conventions
---

Create a new React component:

1. Look at 2-3 existing components to learn the project's patterns:
   - File naming convention (PascalCase, kebab-case, etc.)
   - Component structure (function vs arrow, export style)
   - Styling approach (CSS modules, Tailwind, styled-components)
   - Test file location and patterns
   - Whether there's a barrel export (index.ts)

2. Generate the component file matching these exact conventions
3. Generate a test file if the project has component tests
4. Add the export to the barrel file if one exists
5. Show the user what was created
\`\`\`

---

## Advanced Techniques

### Combining Skills with Hooks

Skills and hooks are complementary. A skill defines *what* to do; a hook automates *when* to do it. You can reference patterns from your skills in hook configurations.

For example, you might have a \`/pre-commit\` skill that runs your review checklist, and a PreToolUse hook that reminds Claude to run it before committing.

### Combining Skills with MCP Servers

Skills can reference MCP server tools. If you have a database MCP server connected, your migration skill can directly query the schema. If you have a Slack MCP server, your deploy skill can post notifications.

\`\`\`markdown
---
description: Deploy and notify the team
---

Deploy the current branch and notify the team:

1. Run the deployment pipeline
2. Wait for the deployment to complete
3. Use the Slack MCP server to post to #deployments:
   - What was deployed (branch, commit hash)
   - Who deployed it
   - Link to the PR
4. If deployment fails, post the error to #deployments and suggest a fix
\`\`\`

### Skill Organization in Teams

For larger teams, organize skills by category using subdirectories:

\`\`\`
.claude/skills/
├── git/
│   ├── commit.md      → /git:commit
│   ├── pr.md          → /git:pr
│   └── release.md     → /git:release
├── test/
│   ├── unit.md        → /test:unit
│   ├── e2e.md         → /test:e2e
│   └── coverage.md    → /test:coverage
├── review/
│   ├── code.md        → /review:code
│   ├── security.md    → /review:security
│   └── performance.md → /review:performance
└── deploy.md          → /deploy
\`\`\`

This keeps skills discoverable and prevents naming collisions as your collection grows.

---

## Tips for Writing Effective Skills

**Be specific about output format.** If you want a table, show the table structure. If you want bullet points, say so. Claude follows formatting instructions precisely.

**Include error handling.** Tell Claude what to do when something goes wrong. "If the tests fail, analyze the failure and suggest a fix" is better than hoping it figures that out.

**Reference project conventions.** "Look at existing components to match the project's patterns" is more robust than hardcoding a specific style that might drift.

**Keep skills focused.** A skill that does one thing well is better than a skill that tries to do everything. If your skill file is longer than 50 lines, consider splitting it into multiple skills.

**Test your skills.** Run them a few times and refine the instructions based on the output. Small wording changes can significantly improve consistency.

**Version control project skills.** Put \`.claude/skills/\` in your repo so the whole team benefits. Code review skill changes the same way you'd review any other process change.

---

## Getting Started

1. **Create the directory**: \`mkdir -p .claude/skills\` (or \`~/.claude/skills\` for global skills)
2. **Start with one skill**: Pick your most repetitive workflow and encode it as a skill
3. **Iterate**: Run it a few times, adjust the instructions, and refine
4. **Share**: Commit project skills to your repo and tell your team about them
5. **Browse existing skills**: Check out our [skills collection](/skills) for ready-to-use examples you can customize

Skills are the simplest way to make Claude Code work exactly the way you want. No API configuration, no complex setup — just markdown files that turn your workflows into commands.`,
};
