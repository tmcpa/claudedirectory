import { Skill } from "@/lib/types";

export const sqlOptimizerSkill: Skill = {
  slug: "sql-optimizer",
  title: "SQL Query Optimizer",
  description:
    "Analyze slow SQL queries, explain the execution plan, and suggest indexes or rewrites to make them fast",
  tags: [
    "sql",
    "database",
    "performance",
    "query-optimization",
    "indexes",
    "postgres",
    "mysql",
  ],
  featured: false,
  dateAdded: "2026-04-15",
  author: {
    name: "Claude Code Community",
  },
  relatedItems: [
    { type: "agent", slug: "database-expert", relationship: "works-with" },
    {
      type: "agent",
      slug: "performance-optimizer",
      relationship: "works-with",
    },
    { type: "skill", slug: "migrate-db", relationship: "works-with" },
  ],
  content: `# SQL Query Optimizer Skill

Analyze a SQL query that's running too slowly. Read the execution plan, identify the real bottleneck, and suggest the minimum change that will fix it.

## How to Use

\`/sql-optimizer [query or file path]\`

Examples:
- \`/sql-optimizer "SELECT * FROM orders WHERE customer_id = 42 ORDER BY created_at DESC LIMIT 20"\`
- \`/sql-optimizer src/queries/analytics.sql\`
- \`/sql-optimizer "the dashboard query in analytics.py is slow"\`

Optionally include the EXPLAIN or EXPLAIN ANALYZE output — if you have it, the analysis will be much more precise.

## What It Produces

A structured analysis:

1. **What the query is trying to do** — plain-English restatement so you know we agree on intent
2. **Execution plan reading** — walk through the plan step by step, flagging the expensive nodes
3. **The actual bottleneck** — one specific thing causing the problem (not a laundry list)
4. **Recommended fix** — the smallest change that addresses the bottleneck
5. **Alternative approaches** — if there's more than one way, trade-offs between them
6. **Verification plan** — how to confirm the fix worked (what to re-run, what to watch)

## Instructions for Claude

When invoked:

1. **Read the schema first.** Look for table definitions, existing indexes, and row count estimates. Without schema context, query advice is guesswork.
2. **Get the plan.** If the user hasn't provided EXPLAIN output, ask for it — or offer to run \`EXPLAIN ANALYZE\` via an available database tool.
3. **Find the expensive nodes.** Look for:
   - Sequential scans on large tables
   - Nested loops with high row counts
   - Sorts that spill to disk
   - Hash joins with large build sides
   - Index scans that filter out most rows (wrong index)
4. **Distinguish correlation from causation.** A query can be slow because of a bad plan, missing statistics, lock contention, or just too much data. Don't jump to "add an index" — diagnose the real cause.
5. **Prefer minimum changes.** An index change is cheaper than a query rewrite; a query rewrite is cheaper than a schema change; a schema change is cheaper than denormalization.
6. **Name the trade-off.** New indexes slow down writes and cost storage. Denormalization risks staleness. Say what you're giving up.

## Diagnosis Checklist

Ask yourself:

- [ ] Is this query running on the right index? (Look for "Index Scan" vs "Seq Scan")
- [ ] Are row estimates close to actual rows? (If not, stats may be stale — \`ANALYZE\` the table)
- [ ] Is the query doing work the caller doesn't need? (\`SELECT *\`, unnecessary joins)
- [ ] Is the JOIN order what you'd expect? (If not, the planner may lack info)
- [ ] Is there a LIMIT being ignored due to ORDER BY on unindexed columns?
- [ ] Could this be a parameter sniffing or plan cache issue?
- [ ] Is the database version relevant? (Partial indexes, generated columns, etc. vary)

## Common Fixes

- **Missing composite index** — for \`WHERE a = ? AND b = ? ORDER BY c\`, consider \`(a, b, c)\`
- **Functional index** — for \`WHERE lower(email) = ?\`, create \`(lower(email))\`
- **Partial index** — for queries always filtering to a small subset, \`WHERE deleted_at IS NULL\`
- **Covering index** — add non-key columns via INCLUDE to avoid heap lookups
- **Rewriting EXISTS vs IN** — different planners handle these differently
- **Replacing OR with UNION** — when OR blocks index usage
- **Limiting before joining** — push LIMIT into subqueries or CTEs when possible
- **Avoiding \`SELECT *\`** — project only the columns you need to enable index-only scans

## Output Format

\`\`\`markdown
## Query Intent
[Plain-English summary of what the query does]

## Current Execution Plan
[Walk through the expensive nodes — total time, rows, operation]

## Root Cause
[One specific thing — the actual bottleneck, not a symptom]

## Recommended Fix
\\\`\\\`\\\`sql
-- The change, with a comment on what it does
\\\`\\\`\\\`

**Expected improvement:** [from X to Y]
**Trade-off:** [what this costs — write overhead, storage, etc.]

## Verification
1. Apply the change in a copy of production data
2. Run EXPLAIN ANALYZE and compare to baseline
3. Watch [relevant metric] after deployment
\`\`\`

## Things to Avoid

- Don't recommend adding an index without reading the current indexes — you may be duplicating one
- Don't suggest denormalization as the first fix — it's almost always wrong
- Don't ignore write-path impact — indexes aren't free
- Don't trust EXPLAIN without ANALYZE for actual timings
- Don't recommend \`OPTIMIZER_HINTS\` or forced plans unless the planner is genuinely broken — they become tech debt
`,
};
