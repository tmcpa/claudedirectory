import { SettingsExample } from "@/lib/types";

export const recommendedSettings: SettingsExample = {
  slug: "recommended",
  title: "Recommended Settings",
  description: "A well-balanced configuration for most Claude Code users",
  tags: ["recommended", "beginner"],
  featured: true,
  author: {
    name: "Claude Code Community",
  },
  config: `{
  "permissions": {
    "allow": [
      "Read",
      "Edit",
      "Write",
      "Bash(npm run:*)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)"
    ]
  },
  "model": "claude-sonnet-4-20250514",
  "theme": "dark"
}`,
};
