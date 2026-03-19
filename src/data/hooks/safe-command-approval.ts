import { Hook } from "@/lib/types";

export const safeCommandApprovalHook: Hook = {
  slug: "safe-command-approval",
  title: "Safe Command Auto-Approval",
  description:
    "Auto-approves safe bash commands like ls and git status while blocking destructive operations like rm -rf and git push --force",
  event: "PreToolUse",
  matcher: "Bash",
  tags: ["safety", "permissions", "automation", "bash"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  script: `#!/bin/bash
# Safe Command Auto-Approval Hook
# Auto-approves known-safe commands, blocks destructive ones

COMMAND="$1"

# Destructive patterns - always block
DENY_PATTERNS=(
  "rm -rf /"
  "rm -rf ~"
  "rm -rf \\."
  "git push.*--force"
  "git reset --hard"
  "git clean -fd"
  "DROP TABLE"
  "DROP DATABASE"
  "truncate"
  "> /dev/sd"
  "mkfs\\."
  "dd if="
  "chmod -R 777"
)

for pattern in "\${DENY_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qiE "$pattern"; then
    echo "BLOCKED: Destructive command detected: $pattern"
    echo "This command requires explicit user approval."
    exit 1
  fi
done

# Safe patterns - auto-approve
SAFE_PATTERNS=(
  "^ls "
  "^cat "
  "^git status"
  "^git log"
  "^git diff"
  "^git branch"
  "^npm test"
  "^npm run lint"
  "^npm run build"
  "^npx "
  "^node "
  "^python.*-c "
  "^echo "
  "^pwd$"
  "^which "
  "^type "
)

for pattern in "\${SAFE_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qE "$pattern"; then
    exit 0
  fi
done

# Unknown commands - let user decide
exit 0
`,
};
