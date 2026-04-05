import { Hook } from "@/lib/types";

export const envLeakDetectorHook: Hook = {
  slug: "env-leak-detector",
  title: "Environment Variable Leak Detector",
  description:
    "Scans files after edits for hardcoded secrets, API keys, and tokens that should be in environment variables",
  event: "PostToolUse",
  matcher: "Edit|Write",
  tags: [
    "security",
    "secrets",
    "environment-variables",
    "api-keys",
    "best-practices",
  ],
  featured: false,
  author: {
    name: "Claude Code Community",
  },
  relatedItems: [
    { type: "hook", slug: "security-scan", relationship: "works-with" },
    {
      type: "hook",
      slug: "prompt-injection-defense",
      relationship: "works-with",
    },
  ],
  script: `#!/bin/bash
# Environment Variable Leak Detector
# Scans edited/written files for hardcoded secrets and API keys

FILE_PATH="$CLAUDE_FILE_PATH"

if [[ ! -f "$FILE_PATH" ]]; then
  exit 0
fi

# Skip binary files, lock files, and test fixtures
case "$FILE_PATH" in
  *.lock|*.png|*.jpg|*.gif|*.ico|*.woff*|*.ttf|*.eot|*.svg)
    exit 0
    ;;
  *test*fixture*|*mock*|*__snapshots__*)
    exit 0
    ;;
esac

# Patterns that suggest hardcoded secrets
PATTERNS=(
  'sk-[a-zA-Z0-9]{20,}'                    # OpenAI/Stripe-style secret keys
  'sk-ant-[a-zA-Z0-9]{20,}'                # Anthropic API keys
  'ghp_[a-zA-Z0-9]{36}'                    # GitHub personal access tokens
  'gho_[a-zA-Z0-9]{36}'                    # GitHub OAuth tokens
  'github_pat_[a-zA-Z0-9_]{80,}'           # GitHub fine-grained PATs
  'xoxb-[0-9]{10,}-[a-zA-Z0-9]+'          # Slack bot tokens
  'xoxp-[0-9]{10,}-[a-zA-Z0-9]+'          # Slack user tokens
  'AKIA[0-9A-Z]{16}'                       # AWS access key IDs
  'eyJ[a-zA-Z0-9_-]{50,}\\.[a-zA-Z0-9_-]+' # JWT tokens
  'AIza[0-9A-Za-z_-]{35}'                  # Google API keys
  'postgres://[^\\s]+:[^\\s]+@'             # Database connection strings with passwords
  'mysql://[^\\s]+:[^\\s]+@'               # MySQL connection strings with passwords
  'mongodb(\\+srv)?://[^\\s]+:[^\\s]+@'    # MongoDB connection strings with passwords
  'redis://:[^\\s]+@'                      # Redis connection strings with passwords
)

FOUND_ISSUES=()

for pattern in "\${PATTERNS[@]}"; do
  matches=$(grep -nE "$pattern" "$FILE_PATH" 2>/dev/null | head -5)
  if [[ -n "$matches" ]]; then
    FOUND_ISSUES+=("$matches")
  fi
done

if [[ \${#FOUND_ISSUES[@]} -gt 0 ]]; then
  echo "⚠️  POTENTIAL SECRET DETECTED in $FILE_PATH"
  echo ""
  echo "The following lines may contain hardcoded secrets:"
  for issue in "\${FOUND_ISSUES[@]}"; do
    echo "  $issue"
  done
  echo ""
  echo "Consider using environment variables instead."
  echo "Store secrets in .env and reference via process.env or equivalent."
  exit 1
fi

exit 0`,
};
