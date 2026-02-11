import { HowTo } from "@/lib/types";

export const gettingStartedHowTo: HowTo = {
  slug: "getting-started",
  title: "Getting Started with Claude Code",
  description: "A comprehensive guide to installing and configuring Claude Code for your development workflow",
  difficulty: "beginner",
  timeToComplete: "10 min",
  tags: ["getting-started", "installation", "setup", "beginner"],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  content: `# Getting Started with Claude Code

Claude Code is an agentic coding tool that lives in your terminal. This guide will get you up and running quickly.

## Prerequisites

- Node.js 18 or higher
- A terminal (macOS Terminal, iTerm2, Windows Terminal, etc.)
- An Anthropic API key or Claude Pro/Team subscription

## Installation

### Using npm (Recommended)

\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

### Verify Installation

\`\`\`bash
claude --version
\`\`\`

## Authentication

### Option 1: API Key

\`\`\`bash
export ANTHROPIC_API_KEY=sk-ant-xxxxx
\`\`\`

### Option 2: Browser Login

\`\`\`bash
claude login
\`\`\`

## First Session

### Start Claude Code

\`\`\`bash
# In any project directory
cd my-project
claude
\`\`\`

### Basic Commands

| Command | Description |
|---------|-------------|
| Just type | Ask Claude anything |
| \`/help\` | Show available commands |
| \`/clear\` | Clear conversation history |
| \`/exit\` | Exit Claude Code |

## Quick Examples

### Ask about your code
\`\`\`
What does the main function in app.js do?
\`\`\`

### Make changes
\`\`\`
Add error handling to the API endpoint in routes/users.js
\`\`\`

### Run commands
\`\`\`
Run the test suite and fix any failures
\`\`\`

### Explore codebase
\`\`\`
How is authentication implemented in this project?
\`\`\`

## Project Setup

### Create CLAUDE.md

Add context about your project:

\`\`\`bash
echo "# My Project

Built with React and Node.js.

## Commands
- npm run dev - Start dev server
- npm test - Run tests

## Conventions
- Use TypeScript
- Follow ESLint rules" > CLAUDE.md
\`\`\`

## Key Features

### Tool Permissions

Claude will ask before:
- Writing or editing files
- Running shell commands
- Accessing external services

### Context Awareness

Claude Code automatically:
- Reads relevant files
- Understands project structure
- Maintains conversation history

### Multi-File Operations

Claude can:
- Edit multiple files atomically
- Create new files and directories
- Refactor across the codebase

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| \`Ctrl+C\` | Cancel current operation |
| \`Ctrl+D\` | Exit Claude Code |
| \`Up Arrow\` | Previous message |
| \`Tab\` | Auto-complete file paths |

## Next Steps

1. **Add memory**: Create a CLAUDE.md file for your project
2. **Try slash commands**: Use \`/help\` to see available commands
3. **Set up MCP**: Connect external tools and services
4. **Create hooks**: Automate repetitive tasks

## Resources

- [Official Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [GitHub Repository](https://github.com/anthropics/claude-code)
- [Community Discord](https://discord.gg/anthropic)
`,
};
