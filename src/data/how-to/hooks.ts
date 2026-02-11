import { HowTo } from "@/lib/types";

export const hooksHowTo: HowTo = {
  slug: "hooks",
  title: "Automating with Hooks",
  description: "Set up hooks to run scripts before and after Claude Code tool executions",
  difficulty: "intermediate",
  timeToComplete: "25 min",
  tags: ["hooks", "automation", "events", "scripts"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  content: `# Automating with Hooks

Hooks let you run scripts in response to Claude Code events, enabling powerful automation workflows.

## Hook Events

| Event | Trigger | Use Case |
|-------|---------|----------|
| \`PreToolUse\` | Before a tool runs | Validation, logging |
| \`PostToolUse\` | After a tool completes | Formatting, notifications |
| \`Notification\` | Claude sends a notification | Alerts, logging |
| \`Stop\` | Session ends | Cleanup, reports |

## Configuration Location

\`\`\`bash
# Project-specific hooks
.claude/settings.json

# Global hooks
~/.claude/settings.json
\`\`\`

## Creating Your First Hook

### 1. Create settings file

\`\`\`bash
mkdir -p .claude
touch .claude/settings.json
\`\`\`

### 2. Add hook configuration

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write $CLAUDE_FILE_PATH"
          }
        ]
      }
    ]
  }
}
\`\`\`

## Hook Examples

### Auto-format on Edit

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write $CLAUDE_FILE_PATH"
          }
        ]
      }
    ]
  }
}
\`\`\`

### Lint on File Changes

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx eslint --fix $CLAUDE_FILE_PATH"
          }
        ]
      }
    ]
  }
}
\`\`\`

### Desktop Notification on Complete

\`\`\`json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \\"Claude Code session ended\\" with title \\"Claude Code\\"'"
          }
        ]
      }
    ]
  }
}
\`\`\`

### Log All Tool Usage

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo \\"$(date): $CLAUDE_TOOL_NAME\\" >> ~/.claude/tool-log.txt"
          }
        ]
      }
    ]
  }
}
\`\`\`

## Environment Variables

Hooks have access to these variables:

| Variable | Description | Available In |
|----------|-------------|--------------|
| \`$CLAUDE_TOOL_NAME\` | Name of the tool | All events |
| \`$CLAUDE_FILE_PATH\` | File being modified | Edit, Write |
| \`$CLAUDE_TOOL_INPUT\` | Tool input (JSON) | All events |
| \`$CLAUDE_TOOL_OUTPUT\` | Tool output | PostToolUse |

## Matchers

Use regex patterns to filter which tools trigger hooks:

\`\`\`json
{
  "matcher": "Edit|Write",         // Multiple tools
  "matcher": "Bash",               // Single tool
  "matcher": ".*",                 // All tools
  "matcher": "Read|Glob|Grep"      // Read operations
}
\`\`\`

## Combining Multiple Hooks

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write $CLAUDE_FILE_PATH"
          },
          {
            "type": "command",
            "command": "npx eslint --fix $CLAUDE_FILE_PATH"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "say 'Claude Code finished'"
          }
        ]
      }
    ]
  }
}
\`\`\`

## Best Practices

1. **Keep hooks fast**: Slow hooks delay Claude's workflow
2. **Handle errors gracefully**: Don't break on hook failures
3. **Use matchers**: Only run hooks when needed
4. **Test thoroughly**: Hooks run automatically, so test in isolation first
5. **Log for debugging**: Add logging while developing hooks
`,
};
