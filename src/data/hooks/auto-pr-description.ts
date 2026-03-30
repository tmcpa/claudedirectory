import { Hook } from "@/lib/types";

export const autoPrDescriptionHook: Hook = {
  slug: "auto-pr-description",
  title: "Auto PR Description",
  description:
    "Automatically generates a pull request description from commit messages and changed files when creating a PR",
  event: "PreToolUse",
  matcher: "Bash",
  tags: ["git", "pr", "automation", "github"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  script: `#!/bin/bash
# Auto PR Description Hook
# Generates a PR description template when 'gh pr create' is detected

COMMAND="$1"

# Only act on gh pr create commands
if ! echo "$COMMAND" | grep -q "gh pr create"; then
  exit 0
fi

# Skip if --body is already provided
if echo "$COMMAND" | grep -q -- "--body"; then
  exit 0
fi

# Get the base branch
BASE_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@')
BASE_BRANCH=\${BASE_BRANCH:-main}

# Gather commit messages since diverging from base
COMMITS=$(git log --oneline "$BASE_BRANCH"..HEAD 2>/dev/null)
if [ -z "$COMMITS" ]; then
  exit 0
fi

# Gather changed files summary
CHANGED_FILES=$(git diff --stat "$BASE_BRANCH"..HEAD 2>/dev/null | tail -1)

# Build description
DESCRIPTION="## Summary\\n\\n"
DESCRIPTION+="### Changes\\n"
while IFS= read -r line; do
  DESCRIPTION+="- $line\\n"
done <<< "$COMMITS"
DESCRIPTION+="\\n### Stats\\n$CHANGED_FILES\\n"
DESCRIPTION+="\\n## Test Plan\\n- [ ] Tests pass locally\\n- [ ] Manual verification\\n"

echo "📝 Generated PR description from $(echo "$COMMITS" | wc -l | tr -d ' ') commit(s)"
echo "$DESCRIPTION"

exit 0
`,
};
