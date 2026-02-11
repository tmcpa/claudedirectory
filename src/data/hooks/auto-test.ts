import { Hook } from "@/lib/types";

export const autoTestHook: Hook = {
  slug: "auto-test",
  title: "Auto Test Runner",
  description: "Automatically runs relevant tests after code edits to catch regressions immediately",
  event: "PostToolUse",
  matcher: "Edit|Write",
  tags: ["testing", "automation", "ci", "quality"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  script: `#!/bin/bash
# Auto Test Runner Hook
# Runs related tests after file edits

FILE_PATH="$1"

# Skip if the edit is to a config or non-code file
if [[ "$FILE_PATH" == *.json ]] || [[ "$FILE_PATH" == *.md ]] || [[ "$FILE_PATH" == *.yml ]]; then
  exit 0
fi

# Skip if already editing a test file
if [[ "$FILE_PATH" == *"test"* ]] || [[ "$FILE_PATH" == *"spec"* ]]; then
  exit 0
fi

# Determine test runner
if [ -f "package.json" ]; then
  # Node.js project - find related test
  BASE_NAME=$(basename "$FILE_PATH" | sed 's/\\.[^.]*$//')
  RELATED_TEST=$(find . -name "\${BASE_NAME}.test.*" -o -name "\${BASE_NAME}.spec.*" 2>/dev/null | head -1)
  if [ -n "$RELATED_TEST" ]; then
    echo "Running related test: $RELATED_TEST"
    npx jest "$RELATED_TEST" --no-coverage 2>&1 | tail -5
  fi
elif [ -f "pytest.ini" ] || [ -f "pyproject.toml" ]; then
  # Python project
  BASE_NAME=$(basename "$FILE_PATH" .py)
  RELATED_TEST=$(find . -name "test_\${BASE_NAME}.py" 2>/dev/null | head -1)
  if [ -n "$RELATED_TEST" ]; then
    echo "Running related test: $RELATED_TEST"
    python -m pytest "$RELATED_TEST" -x -q 2>&1 | tail -5
  fi
fi

exit 0
`,
};
