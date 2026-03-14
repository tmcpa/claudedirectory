import { Hook } from "@/lib/types";

export const importSortHook: Hook = {
  slug: "import-sort",
  title: "Auto Import Sort",
  description:
    "Automatically sorts and organizes imports after file edits using the project's import ordering rules",
  event: "PostToolUse",
  matcher: "Edit|Write",
  tags: ["imports", "formatting", "organization", "eslint"],
  featured: false,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  script: `#!/bin/bash
# Auto Import Sort Hook
# Sorts imports after file edits using ESLint's import sorting rule

FILE_PATH="$TOOL_INPUT_file_path"

# Only process JS/TS files
if [[ ! "$FILE_PATH" =~ \\.(js|jsx|ts|tsx|mjs|mts)$ ]]; then
  exit 0
fi

# Check if eslint is available
if ! command -v npx &> /dev/null; then
  exit 0
fi

# Run ESLint's import sorting fix
npx eslint --fix --rule '{"import/order": ["error", {"groups": ["builtin", "external", "internal", "parent", "sibling", "index"], "newlines-between": "always", "alphabetize": {"order": "asc"}}]}' "$FILE_PATH" 2>/dev/null

# If eslint fails (no config, etc.), try with prettier-plugin-organize-imports
if [ $? -ne 0 ]; then
  npx prettier --write --plugin prettier-plugin-organize-imports "$FILE_PATH" 2>/dev/null
fi

exit 0
`,
};
