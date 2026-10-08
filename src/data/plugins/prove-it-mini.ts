import { Plugin } from "@/lib/types";

export const proveItMiniPlugin: Plugin = {
  slug: "prove-it-mini",
  title: "Prove-It Mini",
  seoTitle: "Install prove-it-mini – pytest Stop Hook Plugin for Claude Code",
  description:
    "A pytest Stop hook for Claude Code: two repair attempts, then an explicit unverified result. When the agent tries to finish after changing code, it runs your test command; red tests block the stop and hand the failure back, at most 2 times, then the result says \"NOT verified\". Remembers verified states and names changed test files. No model calls, no Node, Python standard library only.",
  tags: ["testing", "pytest", "python", "hooks", "verification"],
  author: {
    name: "Oleg Testov",
    url: "https://github.com/OlegTestov",
  },
  repoUrl: "https://github.com/OlegTestov/prove-it-mini",
  installCommand:
    "/plugin marketplace add OlegTestov/prove-it-mini && /plugin install prove-it-mini@prove-it-mini",
  commands: [
    { name: "/prove-it-mini:setup", description: "Turn on the gate in this repo: writes the test command config and a short rules block in CLAUDE.md and AGENTS.md. Run once per repo" },
    { name: "/prove-it-mini:check", description: "Run the repo's tests once through the gate and show the result: green, red, or a config error" },
    { name: "/prove-it-mini:teardown", description: "Turn off the gate in this repo and remove what setup added" },
  ],
};
