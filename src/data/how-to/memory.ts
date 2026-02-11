import { HowTo } from "@/lib/types";

export const memoryHowTo: HowTo = {
  slug: "memory",
  title: "Using CLAUDE.md for Project Memory",
  description: "Learn how to use CLAUDE.md files to give Claude Code persistent context about your project",
  difficulty: "beginner",
  timeToComplete: "15 min",
  tags: ["memory", "context", "CLAUDE.md", "getting-started"],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  content: `# Using CLAUDE.md for Project Memory

CLAUDE.md files provide persistent context to Claude Code across sessions. They're automatically loaded when Claude Code starts in a directory.

## File Locations

Claude Code reads CLAUDE.md files from multiple locations:

| Location | Scope | Use Case |
|----------|-------|----------|
| \`~/.claude/CLAUDE.md\` | Global | Personal preferences, coding style |
| \`./CLAUDE.md\` | Project | Project-specific context, conventions |
| \`./folder/CLAUDE.md\` | Directory | Module or feature-specific context |

## Creating Your First CLAUDE.md

\`\`\`bash
# Create a project-level memory file
touch CLAUDE.md
\`\`\`

## What to Include

### Project Overview
\`\`\`markdown
# Project: My App

A web application built with Next.js and TypeScript.

## Tech Stack
- Next.js 14 with App Router
- TypeScript strict mode
- Tailwind CSS for styling
- PostgreSQL database
\`\`\`

### Coding Conventions
\`\`\`markdown
## Coding Standards

- Use functional components with hooks
- Prefer named exports over default exports
- Write tests for all utility functions
- Use conventional commits (feat:, fix:, docs:)
\`\`\`

### Project Structure
\`\`\`markdown
## Directory Structure

- \`src/app\` - Next.js routes and pages
- \`src/components\` - Reusable UI components
- \`src/lib\` - Utility functions and types
- \`src/data\` - Data fetching and state
\`\`\`

## Best Practices

1. **Keep it concise**: Claude reads this every session, so avoid verbose content
2. **Update regularly**: Reflect changes in architecture or conventions
3. **Be specific**: Include actual commands, paths, and patterns
4. **Use hierarchies**: Leverage global → project → folder specificity

## Example: Full CLAUDE.md

\`\`\`markdown
# My E-commerce Platform

## Overview
React + Node.js e-commerce app with Stripe payments.

## Commands
- \`npm run dev\` - Start development server
- \`npm run test\` - Run Jest tests
- \`npm run lint\` - ESLint check

## Conventions
- Components in PascalCase
- API routes in kebab-case
- Zod for runtime validation
- Prisma for database queries

## Current Focus
Working on checkout flow optimization (Issue #234)
\`\`\`

## Pro Tips

- Add a "Current Focus" section to guide Claude's context
- Include common commands you run frequently
- Reference key files Claude should read for context
- Document any non-obvious architectural decisions
`,
};
