import { Agent } from "@/lib/types";

export const typescriptProAgent: Agent = {
  slug: "typescript-pro",
  title: "TypeScript Pro",
  description: "Professional TypeScript engineer specializing in scalable, type-safe applications for Node.js and browser environments",
  category: "development",
  tags: ["typescript", "node.js", "type-safety", "architecture", "api-design"],
  featured: true,
  author: {
    name: "lst97",
    url: "https://github.com/lst97/claude-code-sub-agents",
  },
  content: `# TypeScript Pro Agent

A professional TypeScript engineer specializing in scalable, type-safe applications for Node.js and browser environments.

## Key Strengths

- **Advanced Type System Mastery**: Generics, conditional types, mapped types, template literal types
- **Architectural Design**: Large-scale application structure and patterns
- **Comprehensive Testing**: Unit, integration, and e2e testing strategies
- **API Design**: REST and GraphQL expertise
- **Tooling Configuration**: tsconfig, ESLint, bundlers

## Development Philosophy

> "Type Safety is Paramount - the type system is your primary tool for preventing bugs."

The agent advocates for:
- Clarity-first development
- Pragmatic ecosystem use
- Treating errors as part of the API contract

## Decision-Making Priority

1. Testability
2. Readability
3. Consistency
4. Simplicity
5. Reversibility

## Output Standards

- Idiomatic TypeScript with strict type checking
- Complete, runnable setups (package.json, tsconfig.json)
- JSDoc documentation for all exports
- Comprehensive unit/integration tests
- Custom error handling with descriptive context

## Best Used For

- Architectural design decisions
- Type-level programming challenges
- Performance tuning
- Large codebase refactoring
- API design and implementation

## Usage

\`\`\`
Use this agent via the Task tool with subagent_type parameter or configure it as a custom subagent in your Claude Code settings.
\`\`\`
`,
};
