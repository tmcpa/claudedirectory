import { Hook } from "@/lib/types";

export const lintOnEditHook: Hook = {
  slug: "lint-on-edit",
  title: "Lint on Edit",
  description: "Automatically run ESLint on files after Claude Code edits them",
  event: "PostToolUse",
  matcher: "Edit",
  tags: ["linting", "eslint", "code-quality"],
  featured: true,
  author: {
    name: "Claude Code Community",
  },
  script: `#!/bin/bash
# Lint on Edit Hook
# Runs ESLint on files after they are edited

# Get the file path from the hook context
FILE_PATH="$CLAUDE_FILE_PATH"

# Check if file exists and is a JS/TS file
if [[ -f "$FILE_PATH" && "$FILE_PATH" =~ \\.(js|jsx|ts|tsx)$ ]]; then
  npx eslint --fix "$FILE_PATH" 2>/dev/null
fi
`,
};
