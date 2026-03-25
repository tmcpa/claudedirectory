import { Hook } from "@/lib/types";

export const deadCodeDetectorHook: Hook = {
  slug: "dead-code-detector",
  title: "Dead Code Detector",
  description:
    "Checks for unused exports after file edits and warns about potentially dead code",
  event: "PostToolUse",
  matcher: "Edit|Write",
  tags: ["dead-code", "cleanup", "quality", "maintenance"],
  featured: false,
  dateAdded: "2026-03-25",
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  script: `#!/bin/bash
# Dead Code Detector Hook
# Checks if any named exports in the modified file are unused elsewhere

FILE_PATH="$1"

# Only check TypeScript/JavaScript files
if [[ ! "$FILE_PATH" =~ \\.(ts|tsx|js|jsx)$ ]]; then
  exit 0
fi

# Skip test files, configs, and type definition files
if [[ "$FILE_PATH" == *"test"* ]] || [[ "$FILE_PATH" == *"spec"* ]] || \\
   [[ "$FILE_PATH" == *".config."* ]] || [[ "$FILE_PATH" == *".d.ts" ]]; then
  exit 0
fi

# Skip index files (they re-export, not consume)
if [[ "$(basename "$FILE_PATH")" == "index."* ]]; then
  exit 0
fi

# Extract named exports from the file
EXPORTS=$(grep -oE 'export (const|function|class|type|interface|enum) [A-Za-z_][A-Za-z0-9_]*' "$FILE_PATH" 2>/dev/null | awk '{print $NF}')

if [ -z "$EXPORTS" ]; then
  exit 0
fi

UNUSED=""
for EXPORT_NAME in $EXPORTS; do
  # Count how many OTHER files reference this export
  COUNT=$(grep -rl --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \\
    "$EXPORT_NAME" . 2>/dev/null | grep -v "$FILE_PATH" | grep -v node_modules | grep -v ".next" | wc -l | tr -d ' ')

  if [ "$COUNT" -eq "0" ]; then
    UNUSED="$UNUSED  - $EXPORT_NAME\\n"
  fi
done

if [ -n "$UNUSED" ]; then
  echo "Warning: Potentially unused exports in $(basename "$FILE_PATH"):"
  echo -e "$UNUSED"
  echo "These exports are not referenced in any other file."
fi

exit 0
`,
};
