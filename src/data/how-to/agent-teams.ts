import { HowTo } from "@/lib/types";

export const agentTeamsHowTo: HowTo = {
  slug: "agent-teams",
  title: "Orchestrating Agent Teams",
  description: "Learn how to use Claude Code's experimental Agent Teams feature to coordinate multiple Claude sessions working in parallel on a shared project",
  difficulty: "advanced",
  timeToComplete: "30 min",
  tags: ["agent-teams", "multi-agent", "parallel", "experimental", "advanced"],
  featured: true,
  dateAdded: "2026-03-11",
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  content: `# Orchestrating Agent Teams

Agent Teams is an experimental feature that lets you orchestrate multiple Claude Code sessions working together on a shared project. One session acts as the team lead, coordinating work and synthesizing results.

## Prerequisites

- Claude Code 2.1.0 or later
- Claude Pro, Team, or API subscription
- Familiarity with Claude Code basics and subagents

## How Agent Teams Differ from Subagents

| Feature | Subagents | Agent Teams |
|---------|-----------|-------------|
| Context | Share parent's context window | Independent context windows |
| Communication | Report only to parent | Message each other directly |
| Coordination | Parent mediates all work | Teammates coordinate independently |
| Best for | Focused, single-purpose tasks | Complex, multi-faceted projects |

## Enabling Agent Teams

Agent Teams are experimental and disabled by default. Enable them in your settings:

\`\`\`json
// ~/.claude/settings.json
{
  "experiments": {
    "agentTeams": true
  }
}
\`\`\`

Or set the environment variable:

\`\`\`bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=true
\`\`\`

## How It Works

### Team Structure

\`\`\`
Team Lead (your session)
├── Teammate A (frontend changes)
├── Teammate B (backend API)
└── Teammate C (test coverage)
\`\`\`

The team lead:
- Breaks down the task into subtasks
- Assigns work to teammates
- Monitors progress via a shared task list
- Synthesizes results when teammates finish

### Shared Task List

Teammates share a task list for coordination. The lead assigns tasks, and teammates pick them up, update status, and report results.

### Direct Communication

Unlike subagents, teammates can message each other. If Teammate A (frontend) needs an API endpoint from Teammate B (backend), they communicate directly without routing through the lead.

## Best Use Cases

### Research and Review
Multiple teammates investigate different aspects of a problem simultaneously, then share and challenge each other's findings.

### New Features Across Layers
Teammates each own a separate piece — frontend, backend, tests — without stepping on each other.

### Debugging with Competing Hypotheses
Teammates test different theories in parallel and converge on the answer faster.

### Cross-Layer Coordination
Changes that span frontend, backend, and tests, each owned by a different teammate.

## Example: Building a Feature

\`\`\`
Build a user profile page with avatar upload.
Use agent teams — one teammate for the React frontend,
one for the Express API endpoint, and one for writing tests.
\`\`\`

Claude will:
1. Create a team with three teammates
2. Assign frontend, backend, and test work
3. Teammates communicate about API contracts
4. Lead synthesizes and verifies the integrated result

## Tips

- **Start simple**: Try with 2 teammates before scaling up
- **Be specific**: Give clear, well-scoped tasks to each teammate
- **Independent work**: Agent teams work best when tasks are parallelizable
- **Watch costs**: Each teammate runs its own context window and model calls
- **Use for big tasks**: For small tasks, subagents are more efficient

## Limitations

- Experimental — behavior may change between releases
- Teammates can occasionally step on each other's file edits
- Higher token usage than subagents or single-session work
- Not all tasks benefit from parallelization

## Resources

- [Official Agent Teams Documentation](https://code.claude.com/docs/en/agent-teams)
- [Subagents Documentation](https://code.claude.com/docs/en/sub-agents)
`,
  relatedItems: [
    { type: "how-to", slug: "advanced-features", relationship: "works-with" },
  ],
};
