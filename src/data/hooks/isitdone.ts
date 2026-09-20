import { Hook } from "@/lib/types";

export const isitdoneHook: Hook = {
  slug: "isitdone",
  title: "isitdone",
  description:
    "Stop hook that runs the repository's real test, typecheck and lint commands when Claude claims the work is done, and blocks the turn until they pass. Zero LLM calls, no network.",
  event: "Stop",
  tags: ["testing", "verification", "quality", "stop-hook", "ci"],
  author: {
    name: "raimondasl",
    url: "https://github.com/raimondasl/isitdone",
  },
  repoUrl: "https://github.com/raimondasl/isitdone",
  relatedItems: [{ type: "hook", slug: "tdd-guard" }],
  script: `#!/bin/bash
# isitdone Stop hook
# Runs the checks the repository already defines (npm/pnpm/yarn/bun scripts, pytest,
# go test, cargo test, dotnet, Gradle/Maven, Makefile targets) on the exact working tree.
# On failure it returns {"decision":"block","reason":...} with the failing output, so
# Claude keeps working; it caps itself at 3 attempts and never blocks on its own errors.
#
# Easiest install (writes this hook into .claude/settings.json and proves it blocks):
#   npx isitdone init
exec npx -y @aivolution/isitdone hook --host claude
`,
};
