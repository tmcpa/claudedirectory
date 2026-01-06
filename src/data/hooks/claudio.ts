import { Hook } from "@/lib/types";

export const claudioHook: Hook = {
  slug: "claudio",
  title: "Claudio Sound Effects",
  description: "Adds delightful OS-native sounds to Claude Code events for audio feedback during tasks",
  event: "Notification",
  tags: ["audio", "notification", "feedback", "productivity"],
  featured: false,
  author: {
    name: "ctoth",
    url: "https://github.com/ctoth/claudio",
  },
  script: `#!/bin/bash
# Claudio - Sound effects for Claude Code
# Plays OS-native sounds for different events

EVENT_TYPE="$1"

play_sound() {
  local sound_name="$1"

  # macOS
  if [[ "$OSTYPE" == "darwin"* ]]; then
    case "$sound_name" in
      "success") afplay /System/Library/Sounds/Glass.aiff ;;
      "error") afplay /System/Library/Sounds/Basso.aiff ;;
      "notification") afplay /System/Library/Sounds/Pop.aiff ;;
      *) afplay /System/Library/Sounds/Tink.aiff ;;
    esac
  fi

  # Linux (using paplay if available)
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    if command -v paplay &> /dev/null; then
      case "$sound_name" in
        "success") paplay /usr/share/sounds/freedesktop/stereo/complete.oga 2>/dev/null ;;
        "error") paplay /usr/share/sounds/freedesktop/stereo/dialog-error.oga 2>/dev/null ;;
        "notification") paplay /usr/share/sounds/freedesktop/stereo/message.oga 2>/dev/null ;;
      esac
    fi
  fi
}

case "$EVENT_TYPE" in
  "task_complete") play_sound "success" ;;
  "error") play_sound "error" ;;
  *) play_sound "notification" ;;
esac
`,
};
