import { Hook } from "@/lib/types";

export const securityScanHook: Hook = {
  slug: "security-scan",
  title: "Secret Scanner",
  description: "Scans files for accidentally committed secrets, API keys, and credentials before they are written",
  event: "PreToolUse",
  matcher: "Write|Edit",
  tags: ["security", "secrets", "scanning", "prevention"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  script: `#!/bin/bash
# Secret Scanner Hook
# Blocks writes that contain potential secrets or credentials

FILE_PATH="$1"
CONTENT="$2"

# Patterns that indicate secrets
PATTERNS=(
  "AKIA[0-9A-Z]{16}"
  "sk-[a-zA-Z0-9]{48}"
  "sk_live_[a-zA-Z0-9]+"
  "ghp_[a-zA-Z0-9]{36}"
  "-----BEGIN (RSA|EC|DSA) PRIVATE KEY-----"
  "password\\s*=\\s*['\"][^'\"]+['\"]"
)

for pattern in "\${PATTERNS[@]}"; do
  if echo "$CONTENT" | grep -qE "$pattern"; then
    echo "SECRET DETECTED: Content matches pattern for potential secrets."
    echo "Please remove credentials before committing."
    echo "Pattern matched: $pattern"
    exit 1
  fi
done

exit 0
`,
};
