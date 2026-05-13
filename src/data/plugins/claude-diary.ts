import { Plugin } from "@/lib/types";

export const claudeDiaryPlugin: Plugin = {
  slug: "claude-diary",
  title: "Claude Diary",
  description:
    "Long-term learning system that observes your activity over time and automatically updates CLAUDE.md with accumulated learnings about preferences and patterns",
  tags: ["memory", "learning", "claude-md", "automation", "community"],
  featured: false,
  author: {
    name: "Lance Martin",
    url: "https://github.com/rlancemartin",
  },
  repoUrl: "https://github.com/rlancemartin/claude-diary",
  installCommand: "/plugin install claude-diary",
  commands: [
    {
      name: "/diary:review",
      description:
        "Review accumulated learnings before they are written to CLAUDE.md",
    },
    {
      name: "/diary:flush",
      description: "Write pending observations to CLAUDE.md immediately",
    },
  ],
};
