import { Plugin } from "@/lib/types";

export const dockoPlugin: Plugin = {
  slug: "docko",
  title: "docko",
  description:
    "Local-first workspace slot coordination for multi-agent work: session ownership, write protection via hooks, teammate delegation, and stale-claim recovery",
  installCommand: "/plugin install docko@docko",
  tags: ["multi-agent", "orchestration", "workspace", "hooks", "coordination"],
  author: {
    name: "Ariel Marti",
    url: "https://github.com/4riel",
  },
  repoUrl: "https://github.com/4riel/docko",
  commands: [
    { name: "/dock-status", description: "Show workspace slots, claims, and stale candidates" },
    { name: "/dock-claim", description: "Claim a writable slot for the current session" },
    { name: "/dock-heartbeat", description: "Keep a claimed slot fresh" },
    { name: "/dock-release", description: "Release a claimed slot" },
    { name: "/dock-doctor", description: "Diagnose docko hook, launcher, and binary problems" },
  ],
};
