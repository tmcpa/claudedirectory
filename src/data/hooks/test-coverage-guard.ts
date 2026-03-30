import { Hook } from "@/lib/types";

export const testCoverageGuardHook: Hook = {
  slug: "test-coverage-guard",
  title: "Test Coverage Guard",
  description:
    "Checks test coverage after edits and warns if coverage drops below the configured threshold",
  event: "PostToolUse",
  matcher: "Edit|Write",
  tags: ["testing", "coverage", "quality", "guard"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  script: `#!/bin/bash
# Test Coverage Guard Hook
# Warns if test coverage drops below threshold after file edits

FILE_PATH="$1"
COVERAGE_THRESHOLD=\${COVERAGE_THRESHOLD:-80}

# Skip non-source files
if [[ "$FILE_PATH" == *.json ]] || [[ "$FILE_PATH" == *.md ]] || [[ "$FILE_PATH" == *.yml ]] || [[ "$FILE_PATH" == *.css ]]; then
  exit 0
fi

# Skip test files themselves
if [[ "$FILE_PATH" == *"test"* ]] || [[ "$FILE_PATH" == *"spec"* ]] || [[ "$FILE_PATH" == *"__tests__"* ]]; then
  exit 0
fi

# Node.js projects with Jest
if [ -f "package.json" ] && grep -q "jest" package.json 2>/dev/null; then
  COVERAGE_OUTPUT=$(npx jest --coverage --coverageReporters=text-summary --silent 2>/dev/null | grep "Statements")
  if [ -n "$COVERAGE_OUTPUT" ]; then
    COVERAGE=$(echo "$COVERAGE_OUTPUT" | grep -o '[0-9]*\\.[0-9]*' | head -1 | cut -d. -f1)
    if [ -n "$COVERAGE" ] && [ "$COVERAGE" -lt "$COVERAGE_THRESHOLD" ]; then
      echo "⚠️  Test coverage is $COVERAGE% (threshold: $COVERAGE_THRESHOLD%)"
      echo "Consider adding tests for the changed code."
      exit 1
    fi
  fi
fi

# Python projects with pytest-cov
if [ -f "pyproject.toml" ] || [ -f "setup.py" ]; then
  if python -m pytest --co -q 2>/dev/null | grep -q "test"; then
    COVERAGE_OUTPUT=$(python -m pytest --cov --cov-report=term-missing -q 2>/dev/null | grep "TOTAL")
    if [ -n "$COVERAGE_OUTPUT" ]; then
      COVERAGE=$(echo "$COVERAGE_OUTPUT" | grep -o '[0-9]*%' | tr -d '%')
      if [ -n "$COVERAGE" ] && [ "$COVERAGE" -lt "$COVERAGE_THRESHOLD" ]; then
        echo "⚠️  Test coverage is $COVERAGE% (threshold: $COVERAGE_THRESHOLD%)"
        echo "Consider adding tests for the changed code."
        exit 1
      fi
    fi
  fi
fi

exit 0
`,
};
