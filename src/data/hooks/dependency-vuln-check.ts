import { Hook } from "@/lib/types";

export const dependencyVulnCheckHook: Hook = {
  slug: "dependency-vuln-check",
  title: "Dependency Vulnerability Check",
  description:
    "Runs npm audit / pip-audit / cargo audit when dependency manifests change, blocking edits that introduce known vulnerabilities",
  event: "PostToolUse",
  matcher: "Edit|Write",
  tags: [
    "security",
    "dependencies",
    "vulnerability",
    "audit",
    "supply-chain",
  ],
  featured: false,
  dateAdded: "2026-04-15",
  author: {
    name: "Claude Code Community",
  },
  relatedItems: [
    { type: "hook", slug: "security-scan", relationship: "works-with" },
    { type: "hook", slug: "env-leak-detector", relationship: "works-with" },
    { type: "agent", slug: "security-auditor", relationship: "works-with" },
  ],
  script: `#!/bin/bash
# Dependency Vulnerability Check
# Runs the relevant audit tool when a dependency manifest is edited
# and blocks the change if high/critical vulnerabilities are introduced.

FILE_PATH="$CLAUDE_FILE_PATH"

case "$(basename "$FILE_PATH")" in
  package.json|package-lock.json|pnpm-lock.yaml|yarn.lock)
    TOOL="npm"
    ;;
  requirements.txt|pyproject.toml|poetry.lock|uv.lock)
    TOOL="pip"
    ;;
  Cargo.toml|Cargo.lock)
    TOOL="cargo"
    ;;
  go.mod|go.sum)
    TOOL="go"
    ;;
  *)
    # Not a dependency manifest — skip silently
    exit 0
    ;;
esac

PROJECT_DIR="$(dirname "$FILE_PATH")"
# Walk up to the nearest directory with a lockfile-ish marker
while [[ "$PROJECT_DIR" != "/" && ! -f "$PROJECT_DIR/package.json" && ! -f "$PROJECT_DIR/Cargo.toml" && ! -f "$PROJECT_DIR/go.mod" && ! -f "$PROJECT_DIR/pyproject.toml" ]]; do
  PROJECT_DIR="$(dirname "$PROJECT_DIR")"
done

cd "$PROJECT_DIR" || exit 0

REPORT=""
EXIT_CODE=0

case "$TOOL" in
  npm)
    if command -v npm >/dev/null 2>&1; then
      REPORT=$(npm audit --audit-level=high --json 2>/dev/null)
      COUNT=$(echo "$REPORT" | grep -oE '"high":[0-9]+|"critical":[0-9]+' | grep -oE '[0-9]+' | awk '{s+=$1} END {print s+0}')
      if [[ "$COUNT" -gt 0 ]]; then
        EXIT_CODE=1
      fi
    fi
    ;;
  pip)
    if command -v pip-audit >/dev/null 2>&1; then
      REPORT=$(pip-audit 2>&1)
      if echo "$REPORT" | grep -qi "vulnerab"; then
        EXIT_CODE=1
      fi
    fi
    ;;
  cargo)
    if command -v cargo-audit >/dev/null 2>&1; then
      REPORT=$(cargo audit 2>&1)
      if echo "$REPORT" | grep -qiE "error:|warning:.*vulnerability"; then
        EXIT_CODE=1
      fi
    fi
    ;;
  go)
    if command -v govulncheck >/dev/null 2>&1; then
      REPORT=$(govulncheck ./... 2>&1)
      if echo "$REPORT" | grep -qi "vulnerability"; then
        EXIT_CODE=1
      fi
    fi
    ;;
esac

if [[ "$EXIT_CODE" -ne 0 ]]; then
  echo "⚠️  Dependency vulnerability detected after editing $FILE_PATH"
  echo ""
  echo "$REPORT" | head -40
  echo ""
  echo "Resolve the issue before committing:"
  echo "  - Upgrade the vulnerable dependency to a patched version"
  echo "  - Or document a justified ignore in your security policy"
  exit 1
fi

exit 0`,
};
