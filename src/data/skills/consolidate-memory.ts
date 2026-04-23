import { Skill } from "@/lib/types";

export const consolidateMemorySkill: Skill = {
  slug: "consolidate-memory",
  title: "Consolidate Memory",
  description: "Reflective pass over your Claude Code memory files — merge duplicates, fix stale facts, prune the MEMORY.md index",
  tags: ["memory", "maintenance", "official", "anthropic", "hygiene"],
  featured: false,
  dateAdded: "2026-03-18",
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics/skills",
  },
  content: `# Consolidate Memory

Official Anthropic skill that performs a reflective pass over your auto-memory files, keeping them coherent and useful over time.

## Why It Matters

Auto-memory accumulates. Entries become stale. Duplicates creep in when the same lesson is learned in two different conversations. Periodically, the index (\`MEMORY.md\`) grows past the useful size for quick recall.

## What It Does

1. **Scans** every memory file in \`~/.claude/projects/<project>/memory/\`
2. **Identifies duplicates** — entries that cover the same fact from different angles
3. **Flags stale facts** — references to renamed files, removed flags, or outdated decisions
4. **Merges** overlapping entries into a single canonical version
5. **Prunes** \`MEMORY.md\` by removing pointers to deleted files and trimming the index

## Usage

\`\`\`
/consolidate-memory
\`\`\`

## When to Run

- After a month of active sessions in a project
- After a large refactor or rename that may have invalidated memories
- When \`MEMORY.md\` grows past 50 entries

## Safety

Each change is proposed before being written. You can approve, reject, or edit each proposed merge.

## Installation

\`\`\`bash
/plugin install consolidate-memory@anthropic-skills
\`\`\`
`,
  relatedItems: [
    { type: "plugin", slug: "anthropic-skills", relationship: "part-of" },
  ],
};
