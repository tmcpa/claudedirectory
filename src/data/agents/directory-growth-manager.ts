import { Agent } from "@/lib/types";

export const directoryGrowthManagerAgent: Agent = {
  slug: "directory-growth-manager",
  title: "Directory Growth Manager",
  description:
    "Long-running maintenance and growth agent for claudedirectory.org that audits freshness, content coverage, internal linking, and release health to drive more page views.",
  category: "business",
  tags: [
    "growth",
    "seo",
    "analytics",
    "content-ops",
    "automation",
    "page-views",
  ],
  featured: false,
  dateAdded: "2026-02-11",
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  content: `# Directory Growth Manager Agent

This agent continuously manages the Claude Directory repository with a page-view growth focus:

- Content inventory tracking by category
- Freshness and staleness detection
- Internal link coverage checks via \`relatedItems\`
- Optional repo maintenance checks (\`git pull\`, lint, build)
- Actionable prioritized growth reports

## Runtime Commands

\`\`\`bash
# Run continuously (default 3-hour cycle)
npm run agent:growth

# Run a single cycle
npm run agent:growth:once

# Run one full maintenance cycle including git sync + build
npm run agent:growth:maintain
\`\`\`

## Output

Reports are written to:

- \`reports/growth-agent/latest.md\`
- \`reports/growth-agent/latest.json\`
- Timestamped snapshots in \`reports/growth-agent/\`

State is tracked in:

- \`.claude/growth-agent/state.json\`

## Key Growth Signals

- Low-inventory categories (missing keyword coverage)
- Stale pages by age threshold
- Missing \`relatedItems\` (internal linking opportunities)
- Blog recency gaps (top-of-funnel freshness)

## Configuration

Environment variables:

- \`GROWTH_AGENT_INTERVAL_MINUTES\` (default: \`180\`)
- \`GROWTH_AGENT_MIN_ITEMS\` (default: \`20\`)
- \`GROWTH_AGENT_LOOKBACK_DAYS\` (default: \`14\`)
- \`GROWTH_AGENT_ACTION_LIMIT\` (default: \`8\`)
- \`GROWTH_AGENT_GIT_SYNC=1\` to enable pull on clean trees
- \`GROWTH_AGENT_RUN_BUILD=1\` to build each cycle

CLI flags:

- \`--once\`
- \`--interval-minutes=<n>\`
- \`--min-items=<n>\`
- \`--lookback-days=<n>\`
- \`--run-build\`
- \`--git-sync\`
- \`--skip-lint\`
`,
};
