import { HowTo } from "@/lib/types";

export const skillsHowTo: HowTo = {
  slug: "skills",
  title: "Building Custom Skills",
  description: "Create powerful auto-invoked capabilities that Claude can use proactively",
  difficulty: "advanced",
  timeToComplete: "45 min",
  tags: ["skills", "automation", "advanced", "customization"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  content: `# Building Custom Skills

Skills are advanced automation capabilities that Claude can invoke automatically based on context.

## Skills vs Slash Commands

| Feature | Slash Commands | Skills |
|---------|----------------|--------|
| Invocation | Manual (\`/command\`) | Automatic |
| Trigger | User types command | Context-based |
| Complexity | Simple prompts | Scripts + prompts |
| Use case | Repetitive tasks | Smart automation |

## Skill Structure

\`\`\`bash
.claude/skills/
└── my-skill/
    ├── skill.json      # Skill configuration
    ├── prompt.md       # Instructions for Claude
    └── scripts/        # Optional helper scripts
        └── helper.sh
\`\`\`

## Creating a Skill

### 1. Create skill directory

\`\`\`bash
mkdir -p .claude/skills/test-runner
\`\`\`

### 2. Create skill.json

\`\`\`json
{
  "name": "test-runner",
  "description": "Automatically runs relevant tests when code changes",
  "triggers": {
    "onFileChange": ["**/*.ts", "**/*.tsx"],
    "onCommand": "/test"
  }
}
\`\`\`

### 3. Create prompt.md

\`\`\`markdown
# Test Runner Skill

When code files change, analyze the changes and run appropriate tests.

## Steps

1. Identify changed files
2. Find related test files
3. Run the test suite
4. Report results with any failures highlighted

## Context

Changed files: $CHANGED_FILES
Test framework: Detect from package.json
\`\`\`

## Skill Examples

### Smart Commit Skill

\`\`\`json
// .claude/skills/smart-commit/skill.json
{
  "name": "smart-commit",
  "description": "Creates semantic commits based on staged changes",
  "triggers": {
    "onCommand": "/commit"
  }
}
\`\`\`

\`\`\`markdown
<!-- .claude/skills/smart-commit/prompt.md -->
# Smart Commit

Analyze staged changes and create a conventional commit.

## Analysis Steps

1. Run \`git diff --staged\` to see changes
2. Categorize the change type:
   - feat: New feature
   - fix: Bug fix
   - docs: Documentation
   - refactor: Code refactoring
   - test: Adding tests
   - chore: Maintenance

3. Identify the scope from file paths
4. Write a clear commit message

## Output Format

\`\`\`
<type>(<scope>): <description>

<optional body with details>
\`\`\`
\`\`\`

### PR Review Skill

\`\`\`json
// .claude/skills/pr-review/skill.json
{
  "name": "pr-review",
  "description": "Reviews pull requests for issues",
  "triggers": {
    "onCommand": "/review"
  }
}
\`\`\`

\`\`\`markdown
<!-- .claude/skills/pr-review/prompt.md -->
# PR Review Skill

Perform a comprehensive code review.

## Review Checklist

- [ ] Code correctness
- [ ] Error handling
- [ ] Security vulnerabilities
- [ ] Performance issues
- [ ] Test coverage
- [ ] Documentation

## Output

Provide structured feedback:
- Critical issues (must fix)
- Suggestions (should consider)
- Nitpicks (optional improvements)
\`\`\`

### Documentation Skill

\`\`\`json
// .claude/skills/auto-doc/skill.json
{
  "name": "auto-doc",
  "description": "Generates documentation for code",
  "triggers": {
    "onFileChange": ["src/**/*.ts"],
    "onCommand": "/doc"
  }
}
\`\`\`

## Trigger Types

| Trigger | Description |
|---------|-------------|
| \`onFileChange\` | Files matching glob pattern change |
| \`onCommand\` | User invokes a slash command |
| \`onGitHook\` | Git operations (commit, push) |
| \`onSchedule\` | Time-based triggers |

## Variables Available

| Variable | Description |
|----------|-------------|
| \`$CHANGED_FILES\` | List of modified files |
| \`$CURRENT_FILE\` | Currently focused file |
| \`$PROJECT_ROOT\` | Project root directory |
| \`$GIT_BRANCH\` | Current git branch |

## Best Practices

1. **Clear triggers**: Define specific conditions for activation
2. **Focused scope**: Each skill should do one thing well
3. **Informative prompts**: Give Claude clear instructions
4. **Error handling**: Account for edge cases in prompts
5. **Test thoroughly**: Verify skills work across scenarios

## Debugging Skills

Enable verbose logging:

\`\`\`json
{
  "name": "my-skill",
  "debug": true,
  "description": "..."
}
\`\`\`

Check logs:
\`\`\`bash
tail -f ~/.claude/logs/skills.log
\`\`\`
`,
};
