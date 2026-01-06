import { Hook } from "@/lib/types";

export const typescriptQualityHook: Hook = {
  slug: "typescript-quality",
  title: "TypeScript Quality Check",
  description: "Quality check hook for TypeScript projects that runs compilation, linting, and formatting validation",
  event: "PostToolUse",
  matcher: "Edit|Write",
  tags: ["typescript", "quality", "lint", "format"],
  featured: true,
  author: {
    name: "bartolli",
    url: "https://github.com/bartolli/claude-code-typescript-hooks",
  },
  script: `#!/bin/bash
# TypeScript Quality Check Hook
# Runs compilation, linting, and formatting checks after file changes

FILE_PATH="$1"

# Only process TypeScript files
if [[ ! "$FILE_PATH" =~ \.(ts|tsx)$ ]]; then
  exit 0
fi

PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
cd "$PROJECT_ROOT"

# Check if package.json exists
if [ ! -f "package.json" ]; then
  exit 0
fi

ERRORS=""

# Run TypeScript compilation check
if [ -f "tsconfig.json" ]; then
  echo "Running TypeScript check..."
  npx tsc --noEmit 2>&1 | head -20
  if [ \${PIPESTATUS[0]} -ne 0 ]; then
    ERRORS="$ERRORS\n- TypeScript compilation errors"
  fi
fi

# Run ESLint if available
if [ -f ".eslintrc.js" ] || [ -f ".eslintrc.json" ] || [ -f "eslint.config.js" ]; then
  echo "Running ESLint..."
  npx eslint "$FILE_PATH" --max-warnings 0 2>&1 | head -20
  if [ \${PIPESTATUS[0]} -ne 0 ]; then
    ERRORS="$ERRORS\n- ESLint warnings/errors"
  fi
fi

# Run Prettier check if available
if [ -f ".prettierrc" ] || [ -f ".prettierrc.json" ] || [ -f "prettier.config.js" ]; then
  echo "Running Prettier check..."
  npx prettier --check "$FILE_PATH" 2>&1
  if [ \$? -ne 0 ]; then
    ERRORS="$ERRORS\n- Formatting issues (run prettier --write)"
  fi
fi

if [ -n "$ERRORS" ]; then
  echo -e "\\nQuality issues found:$ERRORS"
  exit 1
fi

echo "All quality checks passed!"
exit 0
`,
};
