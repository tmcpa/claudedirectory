import { SettingsExample } from "@/lib/types";

export const secureSettings: SettingsExample = {
  slug: "secure",
  title: "Secure Mode",
  description: "Restricted configuration for security-conscious environments",
  tags: ["secure", "enterprise", "restricted"],
  author: {
    name: "Claude Code Community",
  },
  config: `{
  "permissions": {
    "allow": [
      "Read",
      "Edit"
    ],
    "deny": [
      "Write",
      "Bash(*)",
      "WebFetch(*)"
    ]
  },
  "model": "claude-sonnet-4-20250514",
  "apiKeyHelper": "security-team-approved-key-manager"
}`,
};
