import { Hook } from "@/lib/types";

export const autoChangelogHook: Hook = {
  slug: "auto-changelog",
  title: "Auto Changelog",
  description: "Automatically appends entries to CHANGELOG.md when Claude commits code, capturing the date and commit message",
  event: "PostToolUse",
  matcher: "Bash",
  tags: ["changelog", "documentation", "git", "automation"],
  featured: false,
  dateAdded: "2026-03-25",
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  script: `#!/bin/bash
# Auto Changelog Hook
# Detects git commit commands and prepends an entry to CHANGELOG.md

# Get the command that was executed
COMMAND="$1"

# Only proceed if this was a git commit command
if ! echo "$COMMAND" | grep -qE '^git\\s+commit'; then
  exit 0
fi

# Extract the commit message from the command
# Handles both -m "message" and -m 'message' formats
COMMIT_MSG=$(echo "$COMMAND" | sed -n 's/.*-m[[:space:]]*["'"'"']\\([^"'"'"']*\\)["'"'"'].*/\\1/p')

# If we couldn't extract the message, try the last commit
if [ -z "$COMMIT_MSG" ]; then
  COMMIT_MSG=$(git log -1 --pretty=format:"%s" 2>/dev/null)
fi

# Exit if we still have no message
if [ -z "$COMMIT_MSG" ]; then
  exit 0
fi

# Get today's date in YYYY-MM-DD format
TODAY=$(date +%Y-%m-%d)

# Get the short commit hash
SHORT_HASH=$(git log -1 --pretty=format:"%h" 2>/dev/null)

# Build the changelog entry
ENTRY="- [\`$SHORT_HASH\`] $COMMIT_MSG ($TODAY)"

# Create CHANGELOG.md if it doesn't exist
if [ ! -f "CHANGELOG.md" ]; then
  echo "# Changelog" > CHANGELOG.md
  echo "" >> CHANGELOG.md
  echo "$ENTRY" >> CHANGELOG.md
  echo "Created CHANGELOG.md with initial entry"
  exit 0
fi

# Prepend the entry after the first heading line
# This keeps the title at the top and adds new entries below it
TEMP_FILE=$(mktemp)
HEAD_FOUND=false

while IFS= read -r line; do
  echo "$line" >> "$TEMP_FILE"
  # Insert the new entry after the first blank line following the heading
  if [ "$HEAD_FOUND" = false ] && [ -z "$line" ]; then
    echo "$ENTRY" >> "$TEMP_FILE"
    HEAD_FOUND=true
  fi
done < CHANGELOG.md

# If no blank line was found after heading, just append
if [ "$HEAD_FOUND" = false ]; then
  echo "" >> "$TEMP_FILE"
  echo "$ENTRY" >> "$TEMP_FILE"
fi

mv "$TEMP_FILE" CHANGELOG.md
echo "Added changelog entry: $ENTRY"

exit 0
`,
};
