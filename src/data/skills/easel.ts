import { Skill } from "@/lib/types";

export const easelSkill: Skill = {
  slug: "easel",
  title: "Easel",
  description:
    "Local review boards for agent output — the agent publishes plans, evals, and design docs as interactive pages, blocks on easel await, and receives your annotations and widget clicks as structured feedback",
  tags: ["review", "workflow", "feedback", "cli", "open-source"],
  featured: false,
  author: {
    name: "Aleks Azen",
    url: "https://github.com/aleks-azen",
  },
  repoUrl: "https://github.com/The-Sentience-Company/easel",
  content: `# Easel Skill

When an agent wants your eyes on something, it publishes an Easel board — an
interactive local page instead of a wall of markdown — then blocks until you
respond. Each round shows a diff against what you last approved; annotations and
widget clicks flow back to the agent as structured JSON anchored to the elements
you touched.

## Install
\`\`\`
git clone https://github.com/The-Sentience-Company/easel && easel/install/install.sh
\`\`\`
Runs as a local daemon (SQLite state, nothing leaves your machine). GPLv3.

## Usage
The bundled skill teaches Claude Code the full loop:
\`\`\`
easel open --template review --data plan.json --title "My plan"   # publish a board
easel await <key> --agent my-agent                                # block until feedback
easel publish <key> --note "round 2: applied feedback"            # revise with diffs
\`\`\`

## Templates
review (plans + decisions), eval (results and blind compares), compare
(side-by-side arms), gallery (image judging), rulings (answer keys), queue
(campaign decisions), and page (freeform HTML with the same annotation layer).
`,
};
