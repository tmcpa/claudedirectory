import { Skill } from "@/lib/types";

export const predeploySkill: Skill = {
  slug: "predeploy",
  title: "Pre-Deploy Safety Gate",
  description:
    "A pre-deploy safety gate for Claude Code that verifies your deploy candidate is a git-descendant of what's actually live (so it can't silently drop a route or feature) and confirms the rollback path works, before you ship. Load-bearing checks are deterministic exit-code scripts; AI agents add code/security/visual/SEO judgment on top.",
  tags: ["deployment", "devops", "infrastructure", "hooks", "safety"],
  featured: false,
  author: {
    name: "Isaac Yap",
    url: "https://github.com/IsaacYap90",
  },
  repoUrl: "https://github.com/IsaacYap90/claude-predeploy",
  content: `# Pre-Deploy Safety Gate

A pre-deploy safety gate for Claude Code. Before you ship, it verifies your deploy
candidate is a git-descendant of what's actually live — so it can't silently drop a
route or feature — and confirms the rollback path works.

## Usage
\`\`\`
/predeploy <project-slug>
\`\`\`

## Behavior
The load-bearing checks are deterministic exit-code scripts, so a pass is a real
pass, not a model's opinion. AI agents then layer judgment on top.

### Deterministic gate (scripts, exit codes)
- Confirms the deploy candidate is a descendant of the live commit — no dropped
  routes or features from deploying a stale or divergent branch
- Confirms the rollback path is real and restores the previous good version fast

### Judgment layer (AI agents)
- Code review, security review, visual-regression, and SEO-preservation checks
  against the live site before the deploy is allowed

## Outcome
One consolidated PASS / BLOCK report. The deploy is gated on all checks passing
plus an explicit ship-it — nothing goes out on a silent regression.

## Notes
MIT licensed.
`,
};
