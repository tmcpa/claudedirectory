import { Skill } from "@/lib/types";

export const contextEngineeringSkill: Skill = {
  slug: "context-engineering",
  title: "Context Engineering Kit",
  description: "Advanced context engineering techniques and patterns with minimal token footprint for efficient Claude Code sessions",
  tags: ["context", "optimization", "efficiency", "tokens"],
  featured: true,
  author: {
    name: "NeoLabHQ",
    url: "https://github.com/NeoLabHQ/context-engineering-kit",
  },
  content: `# Context Engineering Kit

A hand-crafted collection of advanced context engineering techniques and patterns designed for minimal token footprint.

## Overview

Context Engineering Kit helps you optimize how information is provided to Claude Code, ensuring efficient use of the context window while maintaining high-quality outputs.

## Installation

\`\`\`bash
git clone https://github.com/NeoLabHQ/context-engineering-kit.git
cp -r context-engineering-kit/.claude ~/
\`\`\`

## Key Techniques

### Token Optimization
- Compress context without losing essential information
- Use structured formats for dense information packing
- Prioritize relevant context over comprehensive context

### Context Priming
- Pre-load Claude with project-specific knowledge
- Establish consistent terminology and patterns
- Set up efficient communication protocols

### Memory Management
- Strategies for long-running sessions
- Context window rotation techniques
- Important information persistence

## Best Practices

1. **Be Concise** - Remove redundant information
2. **Structure Data** - Use consistent formatting
3. **Prioritize** - Most relevant context first
4. **Refresh** - Update stale context regularly

## Repository

[github.com/NeoLabHQ/context-engineering-kit](https://github.com/NeoLabHQ/context-engineering-kit)
`,
};
