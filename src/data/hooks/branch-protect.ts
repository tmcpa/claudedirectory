import { Hook } from "@/lib/types";

export const branchProtectHook: Hook = {
  slug: "branch-protect",
  title: "Branch Protection",
  description: "Prevents direct file edits when on protected branches like main or production",
  event: "PreToolUse",
  matcher: "Edit|Write",
  tags: ["git", "branch", "protection", "safety"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  script: `#!/bin/bash
# Branch Protection Hook
# Blocks direct edits on protected branches

PROTECTED_BRANCHES=("main" "master" "production" "staging")

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

if [ -z "$CURRENT_BRANCH" ]; then
  exit 0
fi

for branch in "\${PROTECTED_BRANCHES[@]}"; do
  if [ "$CURRENT_BRANCH" = "$branch" ]; then
    echo "BLOCKED: You are on protected branch '$branch'."
    echo "Please create a feature branch before making changes:"
    echo "  git checkout -b feature/your-change"
    exit 1
  fi
done

exit 0
`,
};
