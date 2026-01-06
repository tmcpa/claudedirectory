import { Hook } from "@/lib/types";

export const formatOnSaveHook: Hook = {
  slug: "format-on-save",
  title: "Format on Save",
  description: "Run Prettier to format files after Claude Code writes or edits them",
  event: "PostToolUse",
  matcher: "Write|Edit",
  tags: ["formatting", "prettier", "code-quality"],
  featured: true,
  author: {
    name: "Claude Code Community",
  },
  script: `#!/bin/bash
# Format on Save Hook
# Runs Prettier on files after they are written or edited

FILE_PATH="$CLAUDE_FILE_PATH"

# Check if file exists
if [[ -f "$FILE_PATH" ]]; then
  # Check if Prettier is available
  if command -v prettier &> /dev/null || [ -f "./node_modules/.bin/prettier" ]; then
    npx prettier --write "$FILE_PATH" 2>/dev/null
  fi
fi
`,
};
