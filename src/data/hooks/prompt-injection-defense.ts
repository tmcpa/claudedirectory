import { Hook } from "@/lib/types";

export const promptInjectionDefenseHook: Hook = {
  slug: "prompt-injection-defense",
  title: "Prompt Injection Defense",
  description:
    "Scans tool outputs for prompt injection patterns including instruction overrides, role-playing attempts, and encoding obfuscation",
  event: "PostToolUse",
  matcher: "Read|Bash|WebFetch",
  tags: ["security", "prompt-injection", "defense", "scanning"],
  featured: false,
  author: {
    name: "Lasso Security",
    url: "https://github.com/lasso-security",
  },
  repoUrl: "https://github.com/lasso-security/claude-hooks",
  script: `#!/bin/bash
# Prompt Injection Defense Hook
# Scans tool output for common prompt injection patterns

OUTPUT="$1"

# Injection patterns to detect
PATTERNS=(
  "ignore (all |any )?(previous|prior|above) (instructions|prompts|rules)"
  "you are now (a |an )?[A-Za-z]+"
  "new instructions:"
  "system prompt:"
  "\\\\x[0-9a-fA-F]{2}"
  "IMPORTANT:.*override"
  "forget (everything|all|your)"
  "<system>"
  "\\[INST\\]"
  "Human:|Assistant:"
)

for pattern in "\${PATTERNS[@]}"; do
  if echo "$OUTPUT" | grep -qiE "$pattern"; then
    echo "WARNING: Potential prompt injection detected in tool output."
    echo "Pattern matched: $pattern"
    echo "Review the output carefully before proceeding."
    exit 2
  fi
done

exit 0
`,
};
