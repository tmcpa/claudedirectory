import { Prompt } from "@/lib/types";

export const agentOsBusinessPrompt: Prompt = {
  slug: "agent-os-business",
  title: "Agent Operating System for Business Work",
  description:
    "CLAUDE.md block that turns Claude Code into a persistent operating system for running a business: file-based memory, reusable skills, and an intent-keyed toolkit index",
  tags: ["memory", "skills", "business", "agent-os", "productivity"],
  author: {
    name: "NexForge (NexBDM)",
    url: "https://github.com/ibdmaibot-southafrica/claude-code-agent-starter",
  },
  content: `# Agent operating system

<!-- Paste into your CLAUDE.md (project level, or ~/.claude/CLAUDE.md for everywhere).
     Ready-to-copy scaffold with templates and examples:
     https://github.com/ibdmaibot-southafrica/claude-code-agent-starter -->

## How to work in this system

- **Start of work:** load agent-os/TOOLKIT.md. It is the map of every method, tool, and rule. Then load agent-os/memory/MEMORY.md (the memory index) and open only the memories relevant to the task.
- **Memories:** when you learn something durable (a preference of mine, a decision and its reason, the state of a project), write it to agent-os/memory/ as its own file using the memory format: frontmatter with name, a one-line description, and a type (user, feedback, project, or reference), then the fact stated plainly, with **Why** and **How to apply** lines for feedback and project types. Add a one-line pointer to MEMORY.md. One memory, one fact, one file. Never save what the work already records or what only matters for this conversation.
- **Skills:** when I describe the same process twice, propose saving it as a skill in agent-os/methods/ (when to use, steps, rules, what done looks like), and add it to TOOLKIT.md keyed by intent.
- **The index:** whenever you add a method, tool, or rule, update TOOLKIT.md in the same piece of work. A stale index is worse than none.
- **Hard rules:** the rules at the top of TOOLKIT.md apply to everything, every session, no exceptions. Three worth stealing: draft, never send (anything a human will see gets human review before it moves); never invent a number (every figure traces to a real source); one memory, one fact, one file.
`,
};
