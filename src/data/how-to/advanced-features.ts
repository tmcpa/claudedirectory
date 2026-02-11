import { HowTo } from "@/lib/types";

export const advancedFeaturesHowTo: HowTo = {
  slug: "advanced-features",
  title: "Advanced Claude Code Features",
  description: "Master planning mode, extended thinking, background tasks, and other power-user features",
  difficulty: "advanced",
  timeToComplete: "40 min",
  tags: ["advanced", "planning", "thinking", "background-tasks"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  content: `# Advanced Claude Code Features

Unlock Claude Code's full potential with these advanced features.

## Planning Mode

Planning mode lets Claude design an implementation approach before writing code.

### Entering Plan Mode

\`\`\`
Plan how to implement user authentication with JWT tokens
\`\`\`

Or explicitly:

\`\`\`
/plan Add a caching layer to the API
\`\`\`

### What Happens in Planning Mode

1. Claude explores the codebase
2. Identifies relevant files and patterns
3. Designs an implementation approach
4. Presents the plan for your approval
5. Only proceeds after confirmation

### When to Use Planning

- Complex multi-file changes
- Architectural decisions
- New feature implementations
- Unclear requirements

## Extended Thinking

Extended thinking allows Claude to reason more deeply about complex problems.

### Enabling Extended Thinking

\`\`\`json
// ~/.claude/settings.json
{
  "model": {
    "enableExtendedThinking": true,
    "thinkingBudget": 10000
  }
}
\`\`\`

### Best Use Cases

- Complex debugging
- Architecture decisions
- Security analysis
- Performance optimization

## Background Tasks

Run long-running operations without blocking your session.

### Starting a Background Task

\`\`\`
Run the full test suite in the background
\`\`\`

### Checking Task Status

\`\`\`
What's the status of my background tasks?
\`\`\`

### Use Cases

- Long test suites
- Build processes
- Data migrations
- Large refactoring operations

## Subagents

Claude can spawn specialized agents for specific tasks.

### How Subagents Work

\`\`\`
Claude (main) → spawns → Explorer Agent (codebase analysis)
                      → spawns → Planner Agent (architecture)
                      → spawns → Reviewer Agent (code review)
\`\`\`

### Subagent Types

| Agent | Purpose |
|-------|---------|
| Explore | Codebase analysis and search |
| Plan | Architecture and implementation design |
| Code Review | Quality and security analysis |
| Feature Dev | Guided feature development |

### Triggering Subagents

Most subagents activate automatically based on context, but you can request them:

\`\`\`
Explore how error handling works in this codebase
\`\`\`

## Checkpoints and Undo

### Creating Checkpoints

Claude automatically creates checkpoints before significant changes.

### Reverting Changes

\`\`\`
Undo the last set of changes
\`\`\`

### Viewing History

\`\`\`
Show me the recent changes you've made
\`\`\`

## Context Management

### Summarization

For long sessions, Claude automatically summarizes older context to maintain focus.

### Manual Context Control

\`\`\`
/clear          # Clear conversation history
/compact        # Summarize current context
\`\`\`

### Adding Context

Reference specific files:

\`\`\`
Read src/auth/middleware.ts and explain the authentication flow
\`\`\`

## Performance Optimization

### Model Selection

\`\`\`json
{
  "model": {
    "default": "claude-sonnet-4-20250514",
    "planning": "claude-opus-4-20250514",
    "quickTasks": "claude-haiku-3-5-20241022"
  }
}
\`\`\`

### Token Management

\`\`\`json
{
  "limits": {
    "maxTokensPerTurn": 4096,
    "maxContextTokens": 100000
  }
}
\`\`\`

## CLI Flags

### Useful Flags

\`\`\`bash
# Start with specific model
claude --model claude-opus-4-20250514

# Start in a specific directory
claude --cwd /path/to/project

# Resume last session
claude --resume

# Start with a task
claude "Fix the failing tests"
\`\`\`

## Environment Variables

| Variable | Description |
|----------|-------------|
| \`ANTHROPIC_API_KEY\` | API authentication |
| \`CLAUDE_CODE_DEBUG\` | Enable debug logging |
| \`CLAUDE_CODE_MODEL\` | Default model override |

## Debugging

### Enable Debug Mode

\`\`\`bash
CLAUDE_CODE_DEBUG=1 claude
\`\`\`

### View Logs

\`\`\`bash
tail -f ~/.claude/logs/claude-code.log
\`\`\`

### Common Issues

| Issue | Solution |
|-------|----------|
| Slow responses | Check model selection, reduce context |
| Tool failures | Check permissions, verify paths |
| Memory issues | Use \`/compact\` or \`/clear\` |

## Best Practices

1. **Use planning for complex tasks**: Better results with upfront design
2. **Leverage background tasks**: Don't wait for long operations
3. **Manage context actively**: Clear/compact when sessions get long
4. **Choose the right model**: Balance speed and capability
5. **Enable extended thinking**: For truly complex problems
`,
};
