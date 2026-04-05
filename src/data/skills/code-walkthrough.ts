import { Skill } from "@/lib/types";

export const codeWalkthroughSkill: Skill = {
  slug: "code-walkthrough",
  title: "Code Walkthrough",
  description:
    "Generate an interactive walkthrough of a codebase feature, tracing execution flow from entry point to output",
  tags: [
    "code-review",
    "documentation",
    "onboarding",
    "architecture",
    "explanation",
  ],
  featured: false,
  author: {
    name: "Claude Code Community",
  },
  relatedItems: [
    { type: "agent", slug: "code-explorer", relationship: "works-with" },
    {
      type: "agent",
      slug: "documentation-expert",
      relationship: "works-with",
    },
    { type: "skill", slug: "architecture-diagram", relationship: "works-with" },
  ],
  content: `# Code Walkthrough Skill

Generate a comprehensive walkthrough of a feature or code path. Trace execution from entry point through all layers, explaining what happens at each step.

## How to Use

\`/code-walkthrough [feature or file path]\`

Examples:
- \`/code-walkthrough authentication flow\`
- \`/code-walkthrough src/api/payments.ts\`
- \`/code-walkthrough "what happens when a user submits an order"\`

## What It Produces

A structured walkthrough that includes:

1. **Entry Point** — Where execution begins (route handler, event listener, CLI command)
2. **Flow Diagram** — ASCII diagram of the execution path
3. **Step-by-Step Trace** — Each function/method call in order, with:
   - What it does
   - Key data transformations
   - External calls (DB, APIs, file system)
   - Error handling paths
4. **Key Files** — List of all files involved with line numbers
5. **Data Flow** — How data changes shape as it moves through the system
6. **Side Effects** — Database writes, API calls, events emitted, logs written

## Instructions for Claude

When the user invokes this skill:

1. **Identify the entry point**: Find the route handler, event listener, or function that starts the flow
2. **Trace forward**: Follow the execution path through each layer (controller → service → repository → database)
3. **Read every file in the chain**: Don't guess what a function does — read it
4. **Note branching paths**: Where does the flow diverge based on conditions? Document both paths.
5. **Track data shape**: Show how the data object changes at each step (e.g., "Request body → validated DTO → domain model → database row → response DTO")
6. **Highlight non-obvious behavior**: Middleware, decorators, event handlers, and other implicit logic that affects the flow
7. **Format for readability**: Use headers, code blocks, and bullet points. The walkthrough should be scannable.

## Output Format

\`\`\`markdown
# Walkthrough: [Feature Name]

## Overview
[1-2 sentence summary of what this feature does]

## Entry Point
\\\`path/to/file.ts:42\\\` — [Function name and what triggers it]

## Execution Flow

### 1. [Step Name] — \\\`path/to/file.ts:42\\\`
[What happens here]
\\\`\\\`\\\`typescript
// Key code snippet (keep it short — just the important logic)
\\\`\\\`\\\`

### 2. [Step Name] — \\\`path/to/other-file.ts:15\\\`
[What happens here]

...continue for each step...

## Data Flow
\\\`\\\`\\\`
Request → [shape] → [shape] → [shape] → Response
\\\`\\\`\\\`

## Key Files
- \\\`path/to/file.ts\\\` — [Role in the flow]
- \\\`path/to/other-file.ts\\\` — [Role in the flow]

## Side Effects
- Database: [writes/reads]
- External APIs: [calls made]
- Events: [events emitted]
\`\`\`
`,
};
