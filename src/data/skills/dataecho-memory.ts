import { Skill } from "@/lib/types";

export const dataechoMemorySkill: Skill = {
  slug: "dataecho-memory",
  title: "DataEcho Memory",
  description: "Persistent agent memory across sessions, machines, and platforms — an indexed fact store on a private versioned cloud drive with atomic writes, history/restore, and scoped handoff",
  tags: ["memory", "persistence", "drives", "handoff"],
  featured: false,
  dateAdded: "2026-07-04",
  repoUrl: "https://github.com/mohocp/dataecho",
  author: {
    name: "mohocp",
    url: "https://github.com/mohocp",
  },
  content: `# DataEcho Memory — remember things across sessions

Your context window dies with the session. This skill gives you a memory that doesn't:
a private, versioned drive on **https://dataecho.ai** holding one small index (\`MEMORY.md\`)
plus one file per fact (\`memories/<slug>.md\`). Reading the index costs ~1 KB; everything
else loads on demand. Works from any machine or throwaway sandbox — only the API key travels.

\`scripts/memory.sh\` sits next to this file (bash + python3 stdlib, no other deps).

## Session protocol — this is the discipline that makes memory work

1. **Recall first.** At the start of a session (or when the user references past work), run
   \`scripts/memory.sh recall\`. It prints the index — every memory as one line. Cheap; do it.
2. **Load selectively.** \`recall <query>\` fetches only the fact files whose index line matches.
   Never dump the whole store into context unless asked (\`recall --full\`).
3. **Remember durable things, at the moment you learn them:**
   - the user states a preference or corrects you → \`--type user\`
   - a decision is made and has a *why* → \`--type decision\`
   - you learn something non-obvious the next session will need → \`--type insight\`
   - a work session ends mid-task → \`--type task\` (state + next step)
   - a URL/dashboard/ticket worth keeping → \`--type reference\`
   Do NOT save: secrets or API keys (memory is not a vault), anything derivable from the
   repo/git history, or session-scoped trivia.
4. **Update, don't duplicate.** \`remember\` with an existing slug updates it (and tells you).
   Before creating, \`recall\` a keyword — if a related memory exists, re-remember the same slug
   with merged content. The script warns you when a new slug looks like an existing one.
5. **Forget what's wrong.** A false memory is worse than none: \`memory.sh forget <slug>\`.
6. **Memories age.** They record what was true when written. If one names a file, URL, or
   flag, verify it still exists before acting on it. Convert relative dates ("yesterday",
   "next week") to absolute dates when writing.

## Commands

\`\`\`bash
scripts/memory.sh recall                      # print the index (session start — always)
scripts/memory.sh recall deploy               # index lines matching "deploy" + those fact bodies
scripts/memory.sh recall --scope acme-crm     # only global + that project's memories
scripts/memory.sh remember user-prefers-tabs --type user --body "Prefers tabs over spaces everywhere."
scripts/memory.sh remember sqlite-wal-gotcha --type insight --from ./notes.md
echo "Chose Postgres over SQLite. **Why:** concurrent writers. **How to apply:** don't suggest SQLite for this app." \\
  | scripts/memory.sh remember db-choice --type decision --scope acme-crm
scripts/memory.sh forget db-choice            # delete fact + index line atomically
scripts/memory.sh reindex                     # rebuild MEMORY.md from fact files (self-heal)
scripts/memory.sh history                     # version timeline of the whole memory
scripts/memory.sh restore <versionId>         # roll the entire memory back
scripts/memory.sh handoff --ttl 7d            # share block for another agent (read-only)
scripts/memory.sh init                        # explicit setup + status (otherwise lazy)
\`\`\`

Every command auto-creates the drive ("Agent Memory") and index on first use — \`init\` is
optional. Override the drive with \`MEMORY_DRIVE\` (a name, or a \`drv_…\` id).

## What a good memory looks like

One fact per file. Slug is lowercase-kebab and *says what the fact is*
(\`user-prefers-tabs\`, not \`note-1\`). Description ≤ 100 chars — it is the recall surface,
write it like a search result. Body under ~8 KB (the script warns; split bigger things).
For decisions and feedback, include **Why:** and **How to apply:** lines — a decision
without its why gets re-litigated next session. Link related memories with \`[[slug]]\`.

Scopes: memories are \`global\` by default. Give project-specific facts a scope
(\`--scope <project-key>\`, e.g. the repo name) so \`recall --scope <key>\` shows only
global + that project. One index covers all scopes — recall stays one read.

## Setup — API key (once per user)

Memory requires an account (it's private storage). If \`~/.artifact/credentials\` or
\`$ARTIFACT_API_KEY\` exists, you're done. Otherwise (same flow as the \`dataecho\` skill):

\`\`\`bash
curl -sS -X POST https://dataecho.ai/api/auth/agent/request-code -H 'content-type: application/json' -d '{"email":"user@example.com"}'
# user reads the emailed code, then:
curl -sS -X POST https://dataecho.ai/api/auth/agent/verify-code -H 'content-type: application/json' -d '{"email":"user@example.com","code":"<CODE>"}'
echo '<API_KEY>' > ~/.artifact/credentials && chmod 600 ~/.artifact/credentials
\`\`\`

The \`apiKey\` is returned **once** — write it to the file immediately; don't echo it.

## Handoff — give another agent your memory

\`\`\`bash
scripts/memory.sh handoff --ttl 7d            # read-only (recommended)
scripts/memory.sh handoff --write --ttl 24h   # writable (trusted agents only)
\`\`\`

Prints a one-time share block. The receiving agent (any machine, any platform) runs:

\`\`\`bash
export ARTIFACT_DRIVE_TOKEN='drv_live_…'      # from the share block
export MEMORY_DRIVE='drv_…'                   # driveId from the share block
scripts/memory.sh recall
\`\`\`

Revoke anytime from the owning account: \`memory.sh tokens\` / \`memory.sh revoke <dtok_id>\`.

## Concurrency, corruption, recovery

Multiple sessions can write concurrently: every mutation commits the fact file **and** the
index in one atomic, compare-and-swap batch (the script retries on conflict) — the index
can never disagree with the files, and two agents can never silently clobber each other.
If the index ever drifts anyway (e.g. hand-edits), \`reindex\` rebuilds it from the fact
files' frontmatter. Every mutation is a drive version: \`history\` shows the timeline and
\`restore <versionId>\` rolls the whole memory back — a bad session can always be undone.

## Direct API

Everything is plain REST (drive endpoints, ETag/\`If-Match\` preconditions, atomic
\`PATCH\` batches): https://dataecho.ai/llms-full.txt · OpenAPI: https://dataecho.ai/openapi.json
Always send a descriptive User-Agent. Publishing sites/apps is the separate \`dataecho\` skill.`,
};
