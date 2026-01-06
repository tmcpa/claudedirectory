import { Skill } from "@/lib/types";

export const superpowersSkill: Skill = {
  slug: "superpowers",
  title: "Superpowers",
  description: "Core software engineering competencies covering planning, reviewing, testing, and debugging across the SDLC",
  tags: ["sdlc", "planning", "testing", "debugging", "code-review"],
  featured: true,
  author: {
    name: "obra",
    url: "https://github.com/obra/superpowers",
  },
  content: `# Superpowers

A comprehensive bundle of core software engineering competencies for Claude Code.

## Overview

Superpowers provides Claude Code with enhanced capabilities across the entire software development lifecycle:

- **Planning** - Structured approach to breaking down complex tasks
- **Code Review** - Thorough analysis and feedback on code changes
- **Testing** - Comprehensive test generation and validation
- **Debugging** - Systematic debugging workflows

## Installation

Clone the repository and copy the skills to your Claude Code configuration:

\`\`\`bash
git clone https://github.com/obra/superpowers.git
cp -r superpowers/.claude ~/
\`\`\`

## Features

### Planning Mode
- Break down complex tasks into manageable steps
- Generate implementation plans with dependencies
- Identify potential risks and edge cases

### Review Capabilities
- Analyze code for bugs, security issues, and best practices
- Suggest improvements and refactoring opportunities
- Check for consistent coding style

### Testing Support
- Generate unit tests for new code
- Create integration test scenarios
- Identify missing test coverage

### Debugging Workflow
- Systematic approach to isolating issues
- Root cause analysis techniques
- Fix verification strategies

## Repository

[github.com/obra/superpowers](https://github.com/obra/superpowers)
`,
};
