import { Hook } from "@/lib/types";

export const tddGuardHook: Hook = {
  slug: "tdd-guard",
  title: "TDD Guard",
  description: "Hooks-driven system that monitors file operations and blocks changes that violate TDD principles",
  event: "PreToolUse",
  matcher: "Edit|Write",
  tags: ["tdd", "testing", "quality", "enforcement"],
  featured: true,
  author: {
    name: "nizos",
    url: "https://github.com/nizos/tdd-guard",
  },
  script: `#!/bin/bash
# TDD Guard Hook
# Enforces test-driven development by checking for tests before allowing code changes

FILE_PATH="$1"
TOOL_NAME="$2"

# Skip if editing test files
if [[ "$FILE_PATH" == *"test"* ]] || [[ "$FILE_PATH" == *"spec"* ]]; then
  exit 0
fi

# Check if corresponding test file exists
BASE_NAME=$(basename "$FILE_PATH" | sed 's/\.[^.]*$//')
DIR_NAME=$(dirname "$FILE_PATH")

# Look for test files
TEST_FILE=""
for pattern in "\${DIR_NAME}/\${BASE_NAME}.test.*" "\${DIR_NAME}/\${BASE_NAME}.spec.*" "\${DIR_NAME}/__tests__/\${BASE_NAME}.*"; do
  if ls $pattern 1> /dev/null 2>&1; then
    TEST_FILE=$(ls $pattern 2>/dev/null | head -1)
    break
  fi
done

if [ -z "$TEST_FILE" ]; then
  echo "TDD Guard: No test file found for $FILE_PATH"
  echo "Please create tests before modifying implementation code."
  exit 1
fi

exit 0
`,
};
