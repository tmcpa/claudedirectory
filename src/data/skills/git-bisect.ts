import { Skill } from "@/lib/types";

export const gitBisectSkill: Skill = {
  slug: "git-bisect",
  title: "Git Bisect Helper",
  description:
    "Automated git bisect to find the exact commit that introduced a bug, with smart test command generation",
  tags: ["git", "debugging", "bisect", "regression"],
  featured: false,
  author: {
    name: "Claude Code Community",
  },
  content: `# Git Bisect Helper Skill

Automate git bisect to quickly identify the commit that introduced a regression or bug.

## Usage
\`\`\`
/git-bisect <description of the bug>
\`\`\`

## Behavior
1. Understand the bug description and determine a test condition
2. Identify a known good commit (last working state)
3. Set up git bisect with appropriate good/bad boundaries
4. Generate or use an existing test to verify each commit
5. Run the bisect automatically and report the culprit commit

## Features

### Smart Test Generation
- Creates a minimal test script to detect the bug
- Supports test commands, grep patterns, or build checks
- Handles compilation failures gracefully

### Commit Analysis
- Shows the diff of the identified commit
- Explains what changed and why it likely caused the issue
- Suggests a fix based on the regression

### Safety
- Works on a detached HEAD, never modifies branches
- Cleans up bisect state on completion or error
- Stashes uncommitted changes before starting

## Output
- The exact commit that introduced the bug
- Diff of the offending commit
- Explanation of the regression cause
- Suggested fix or revert command

## Example
\`\`\`
/git-bisect "API returns 500 on /users endpoint"
\`\`\`
Finds the commit that broke the users endpoint.
`,
};
