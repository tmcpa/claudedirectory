import { SettingsExample } from "@/lib/types";

export const permissiveSettings: SettingsExample = {
  slug: "permissive",
  title: "Permissive Mode",
  description: "Minimal restrictions for experienced users who want maximum productivity",
  tags: ["permissive", "advanced", "productivity"],
  author: {
    name: "Claude Code Community",
  },
  config: `{
  "permissions": {
    "allow": [
      "Read",
      "Edit",
      "Write",
      "Bash(*)"
    ],
    "deny": []
  },
  "model": "claude-sonnet-4-20250514"
}`,
};
