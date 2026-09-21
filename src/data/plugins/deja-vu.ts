import { Plugin } from "@/lib/types";

export const dejaVuPlugin: Plugin = {
  slug: "deja-vu",
  title: "deja-vu",
  description:
    "Memory built from the sessions Claude Code and 33 other coding agents already wrote to disk, so recall works on the first day, including months from before install. Hooks bring past sessions in at session start, on each prompt and before a file is edited; one local Go binary, no model or API key, keys and tokens stripped at index time",
  tags: ["memory", "context", "session-history", "search", "mcp", "community"],
  featured: false,
  dateAdded: "2026-09-21",
  author: {
    name: "vshulcz",
    url: "https://github.com/vshulcz",
  },
  repoUrl: "https://github.com/vshulcz/deja-vu",
  installCommand:
    "brew install deja-vu && /plugin marketplace add vshulcz/deja-vu && /plugin install deja-vu@deja-vu",
  commands: [
    {
      name: "/deja",
      description:
        "Search this machine's past coding sessions, from every agent on it, and answer from what it finds",
    },
  ],
};
