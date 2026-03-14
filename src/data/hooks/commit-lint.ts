import { Hook } from "@/lib/types";

export const commitLintHook: Hook = {
  slug: "commit-lint",
  title: "Commit Message Linter",
  description:
    "Validates that commit messages follow conventional commit format before allowing commits",
  event: "PreToolUse",
  matcher: "Bash",
  tags: ["git", "commit", "linting", "conventional-commits"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  script: `#!/bin/bash
# Commit Message Linter Hook
# Validates conventional commit format on git commit commands

COMMAND="$1"

# Only check git commit commands
if ! echo "$COMMAND" | grep -q "git commit"; then
  exit 0
fi

# Extract the commit message from -m flag
MSG=$(echo "$COMMAND" | grep -oP '(?<=-m\\s["\\''])[^"\\'']+')

if [ -z "$MSG" ]; then
  exit 0
fi

# Validate conventional commit format: type(scope): description
PATTERN="^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)(\\(.+\\))?!?:\\s.+"

if ! echo "$MSG" | grep -qE "$PATTERN"; then
  echo "INVALID COMMIT MESSAGE FORMAT"
  echo ""
  echo "Expected: <type>(<scope>): <description>"
  echo "Types: feat, fix, docs, style, refactor, test, chore, perf, ci, build, revert"
  echo ""
  echo "Examples:"
  echo "  feat(auth): add password reset flow"
  echo "  fix: resolve null pointer in parser"
  echo "  docs(readme): update installation steps"
  exit 1
fi

exit 0
`,
  relatedItems: [
    { type: "skill", slug: "commit", relationship: "works-with" },
  ],
};
