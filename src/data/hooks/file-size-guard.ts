import { Hook } from "@/lib/types";

export const fileSizeGuardHook: Hook = {
  slug: "file-size-guard",
  title: "File Size Guard",
  description:
    "Prevents writing excessively large files that could bloat the repository, with configurable size limits per file type",
  event: "PreToolUse",
  matcher: "Write",
  tags: ["safety", "file-size", "repository", "guard"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  script: `#!/bin/bash
# File Size Guard Hook
# Prevents writing files that exceed size limits

FILE_PATH="$1"
CONTENT="$2"

# Default max size in bytes (500KB)
MAX_SIZE=512000

# Get content size
CONTENT_SIZE=\$(echo -n "$CONTENT" | wc -c)

# Check file extension for adjusted limits
case "$FILE_PATH" in
  *.min.js|*.min.css|*.map)
    MAX_SIZE=2048000  # 2MB for minified/map files
    ;;
  *.json)
    MAX_SIZE=1048576  # 1MB for JSON files
    ;;
  *.svg)
    MAX_SIZE=1048576  # 1MB for SVG files
    ;;
  *.lock|*-lock.json)
    MAX_SIZE=5242880  # 5MB for lock files
    ;;
esac

if [ "$CONTENT_SIZE" -gt "$MAX_SIZE" ]; then
  echo "BLOCKED: File size (\$CONTENT_SIZE bytes) exceeds limit (\$MAX_SIZE bytes)"
  echo "File: $FILE_PATH"
  echo "Consider splitting the file or using a different approach."
  exit 1
fi

exit 0
`,
};
