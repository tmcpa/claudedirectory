import { Hook } from "@/lib/types";

export const britfixHook: Hook = {
  slug: "britfix",
  title: "Britfix",
  description: "Converts American English to British English in Claude Code output, with context-awareness for code files",
  event: "PostToolUse",
  matcher: "Edit|Write",
  tags: ["localization", "british", "spelling", "text"],
  featured: false,
  author: {
    name: "Talieisin",
    url: "https://github.com/Talieisin/britfix",
  },
  script: `#!/bin/bash
# Britfix - Convert American English to British English
# Context-aware: skips code identifiers and strings

FILE_PATH="$1"

# Skip binary files and certain extensions
if [[ "$FILE_PATH" =~ \.(png|jpg|gif|ico|woff|ttf|eot)$ ]]; then
  exit 0
fi

# Only process text files (markdown, txt, etc.)
if [[ ! "$FILE_PATH" =~ \.(md|txt|rst|adoc)$ ]]; then
  exit 0
fi

# Common American to British spelling conversions
declare -A conversions=(
  ["color"]="colour"
  ["favorite"]="favourite"
  ["honor"]="honour"
  ["behavior"]="behaviour"
  ["neighbor"]="neighbour"
  ["organize"]="organise"
  ["realize"]="realise"
  ["analyze"]="analyse"
  ["customize"]="customise"
  ["optimize"]="optimise"
  ["center"]="centre"
  ["theater"]="theatre"
  ["meter"]="metre"
  ["fiber"]="fibre"
  ["defense"]="defence"
  ["offense"]="offence"
  ["license"]="licence"
  ["practice"]="practise"
)

# Apply conversions to the file
for american in "\${!conversions[@]}"; do
  british="\${conversions[$american]}"
  sed -i "s/\\b$american\\b/$british/g" "$FILE_PATH"
  # Also handle capitalized versions
  sed -i "s/\\b\${american^}\\b/\${british^}/g" "$FILE_PATH"
done

echo "Britfix: Converted spellings in $FILE_PATH"
`,
};
