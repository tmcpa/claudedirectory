import { Hook } from "@/lib/types";

export const notifyOnCompleteHook: Hook = {
  slug: "notify-on-complete",
  title: "Desktop Notification",
  description: "Send a desktop notification when Claude Code finishes a task",
  event: "Stop",
  tags: ["notification", "productivity", "macos"],
  author: {
    name: "Claude Code Community",
  },
  script: `#!/bin/bash
# Desktop Notification Hook
# Sends a notification when Claude Code stops

# macOS notification
if command -v osascript &> /dev/null; then
  osascript -e 'display notification "Claude Code has finished the task" with title "Claude Code"'
fi

# Linux notification (if notify-send is available)
if command -v notify-send &> /dev/null; then
  notify-send "Claude Code" "Claude Code has finished the task"
fi
`,
};
