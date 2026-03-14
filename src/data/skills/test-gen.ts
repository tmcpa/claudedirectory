import { Skill } from "@/lib/types";

export const testGenSkill: Skill = {
  slug: "test-gen",
  title: "Test Generator",
  description:
    "Generate comprehensive test suites with unit, integration, and edge case coverage",
  tags: ["testing", "test-generation", "coverage", "tdd"],
  featured: false,
  author: {
    name: "Claude Code Community",
  },
  content: `# Test Generator Skill

Generate comprehensive test suites by analyzing source code and producing well-structured tests.

## Usage
\`\`\`
/test-gen [file or function path]
\`\`\`

## Behavior
1. Read the target source code and understand its behavior
2. Identify the testing framework already in use (Jest, Vitest, pytest, etc.)
3. Generate tests covering happy paths, edge cases, and error scenarios
4. Follow existing test patterns and conventions in the project

## Test Categories

### Unit Tests
- Individual function behavior
- Input validation and error handling
- Boundary conditions and edge cases
- Return value verification

### Integration Tests
- Component interactions
- API endpoint testing
- Database query validation
- Service layer workflows

### Edge Cases
- Empty inputs, null values, undefined
- Maximum/minimum values
- Concurrent access scenarios
- Malformed data handling

## Output Format
- Tests follow the project's existing file naming convention
- Uses describe/it blocks (or equivalent) for clear organization
- Includes setup and teardown where appropriate
- Adds inline comments explaining non-obvious test rationale

## Example
\`\`\`
/test-gen src/services/auth.ts
\`\`\`
Generates a comprehensive test file for the auth service covering login, registration, token refresh, and error scenarios.
`,
};
