import { HowTo } from "@/lib/types";

export const slashCommandsHowTo: HowTo = {
  slug: "slash-commands",
  title: "Creating Custom Slash Commands",
  description: "Build your own slash commands to create reusable workflows in Claude Code",
  difficulty: "beginner",
  timeToComplete: "20 min",
  tags: ["slash-commands", "automation", "productivity", "customization"],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  content: `# Creating Custom Slash Commands

Slash commands are user-invoked shortcuts that expand into full prompts. They're perfect for repetitive tasks.

## Command Locations

\`\`\`bash
# Global commands (available everywhere)
~/.claude/commands/

# Project-specific commands
.claude/commands/
\`\`\`

## Creating Your First Command

### 1. Create the commands directory

\`\`\`bash
mkdir -p .claude/commands
\`\`\`

### 2. Create a command file

\`\`\`bash
# .claude/commands/test.md
touch .claude/commands/test.md
\`\`\`

### 3. Add command content

\`\`\`markdown
Run the test suite for the current project.

Steps:
1. Identify the test framework being used
2. Run all tests
3. If any fail, analyze the failures and suggest fixes
4. Summarize the results
\`\`\`

### 4. Use the command

\`\`\`
/test
\`\`\`

## Command Examples

### Code Review Command
\`\`\`markdown
<!-- .claude/commands/review.md -->
Review the staged changes for:
- Code quality issues
- Potential bugs
- Security vulnerabilities
- Performance concerns

Format as a structured review with severity levels.
\`\`\`

### Documentation Command
\`\`\`markdown
<!-- .claude/commands/document.md -->
Generate documentation for $ARGUMENTS.

Include:
- Function/component purpose
- Parameters with types
- Return values
- Usage examples
\`\`\`

### Commit Command
\`\`\`markdown
<!-- .claude/commands/commit.md -->
Create a conventional commit for the staged changes.

1. Analyze what changed
2. Determine the commit type (feat/fix/docs/refactor/test)
3. Write a clear, concise message
4. Include scope if applicable
\`\`\`

## Using Arguments

Commands can accept arguments via \`$ARGUMENTS\`:

\`\`\`markdown
<!-- .claude/commands/explain.md -->
Explain $ARGUMENTS in simple terms.

Provide:
- What it does
- Why it's useful
- Example usage
\`\`\`

Usage: \`/explain the useCallback hook\`

## Referencing Files

Include specific files with curly braces:

\`\`\`markdown
<!-- .claude/commands/optimize.md -->
Analyze {src/utils/helpers.ts} for optimization opportunities.
\`\`\`

## Organization Tips

\`\`\`
.claude/commands/
├── commit.md       # Git operations
├── review.md       # Code review
├── test.md         # Testing
├── document.md     # Documentation
└── refactor.md     # Code improvements
\`\`\`

## Best Practices

1. **Single responsibility**: Each command should do one thing well
2. **Clear instructions**: Be specific about expected output format
3. **Use variables**: \`$ARGUMENTS\` for flexibility
4. **Include context**: Reference relevant files when needed
5. **Test thoroughly**: Run commands in different scenarios
`,
};
