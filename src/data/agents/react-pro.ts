import { Agent } from "@/lib/types";

export const reactProAgent: Agent = {
  slug: "react-pro",
  title: "React Pro",
  description: "Senior-level React engineer specializing in modern, performant web applications using component-based architecture",
  category: "development",
  tags: ["react", "hooks", "performance", "state-management", "testing"],
  featured: true,
  author: {
    name: "lst97",
    url: "https://github.com/lst97/claude-code-sub-agents",
  },
  content: `# React Pro Agent

A senior-level React engineer specializing in modern, performant web applications using component-based architecture and advanced React patterns.

## Key Strengths

- **Functional Components with Hooks**: Deep expertise in useState, useEffect, useCallback, useMemo, useRef
- **Performance Optimization**: Memoization, code splitting, virtualization, lazy loading
- **Strategic State Management**: Context API, Redux, Zustand, Jotai based on complexity
- **User-Centric Testing**: Jest and React Testing Library for reliable test coverage
- **Error Handling**: Error boundaries, graceful degradation, debugging proficiency

## Development Philosophy

The agent prioritizes:
- Iterative delivery with test-driven development
- Quality gates requiring all linting, type checks, and tests to pass
- Decision hierarchy: Testability → Readability → Consistency → Simplicity → Reversibility

## Standard Workflow

1. Analyze requirements thoroughly
2. Design reusable component hierarchies
3. Implement with functional components and Hooks
4. Determine optimal state placement
5. Deliver comprehensive tests
6. Document with clear explanations

## Output Approach

- Clean JSX code following React best practices
- Jest/React Testing Library tests
- Detailed Markdown documentation
- Before-and-after comparisons for refactoring work

## Best Used For

- Developing new React components and features
- Refactoring class components to hooks
- Performance optimization
- State management architecture decisions
- Test coverage improvement

## Usage

\`\`\`
Use this agent via the Task tool with subagent_type parameter or configure it as a custom subagent in your Claude Code settings.
\`\`\`
`,
};
