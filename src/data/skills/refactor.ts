import { Skill } from "@/lib/types";

export const refactorSkill: Skill = {
  slug: "refactor",
  title: "Code Refactor",
  description:
    "Systematically refactor code for improved readability, maintainability, and performance",
  tags: ["refactoring", "code-quality", "cleanup", "patterns"],
  featured: false,
  author: {
    name: "Claude Code Community",
  },
  content: `# Code Refactor Skill

Systematically analyze and refactor code to improve quality without changing behavior.

## Usage
\`\`\`
/refactor [file or directory path]
\`\`\`

## Behavior
1. Analyze the target code for refactoring opportunities
2. Identify code smells, duplication, and complexity issues
3. Propose specific refactoring steps with rationale
4. Apply refactorings incrementally, verifying tests pass after each step

## Refactoring Categories

### Structure
- Extract function/method for repeated logic
- Extract component for reusable UI patterns
- Move code closer to where it's used
- Split large files by responsibility

### Simplification
- Replace complex conditionals with guard clauses
- Simplify nested callbacks with async/await
- Replace magic numbers with named constants
- Remove dead code and unused imports

### Patterns
- Replace inheritance with composition
- Apply strategy pattern for variant behavior
- Use builder pattern for complex object construction
- Introduce early returns to reduce nesting

## Safety Guarantees
- Never changes external behavior
- Runs existing tests after each refactoring step
- Creates atomic commits for each logical change
- Preserves all public API signatures unless explicitly requested

## Example
\`\`\`
/refactor src/utils/parser.ts
\`\`\`
Analyzes parser.ts and applies targeted refactorings with test verification at each step.
`,
};
