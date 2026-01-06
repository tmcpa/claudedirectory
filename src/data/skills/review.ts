import { Skill } from "@/lib/types";

export const reviewSkill: Skill = {
  slug: "review",
  title: "Code Review",
  description: "Perform thorough code reviews with actionable feedback",
  tags: ["review", "code-quality", "workflow"],
  author: {
    name: "Claude Code Community",
  },
  content: `# Code Review Skill

Perform comprehensive code reviews with structured feedback.

## Usage
\`\`\`
/review [file or PR]
\`\`\`

## Behavior
1. Analyze code changes
2. Check for:
   - Logic errors and bugs
   - Security vulnerabilities
   - Performance issues
   - Code style violations
   - Missing tests
3. Provide actionable feedback

## Review Categories

### Critical
Issues that must be fixed:
- Security vulnerabilities
- Data loss risks
- Breaking changes

### Important
Issues that should be addressed:
- Performance problems
- Logic errors
- Missing error handling

### Suggestions
Nice-to-have improvements:
- Code style
- Better naming
- Refactoring opportunities

## Output Format
\`\`\`
## Code Review Summary

### Critical Issues
- [file:line] Description

### Important Issues
- [file:line] Description

### Suggestions
- [file:line] Description

### What's Good
- Positive feedback
\`\`\`
`,
};
