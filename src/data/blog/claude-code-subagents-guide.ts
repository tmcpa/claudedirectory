import { BlogPost } from "@/lib/types";

export const claudeCodeSubagentsGuide: BlogPost = {
  slug: "claude-code-subagents-guide",
  title:
    "Claude Code Subagents: How to Build AI Developer Teams That Ship Code",
  description:
    "Master Claude Code's subagent system to orchestrate specialized AI teams. Learn how to parallelize work, chain agent outputs, and build multi-agent workflows that tackle complex development tasks autonomously.",
  publishedDate: "2026-03-25",
  tags: [
    "subagents",
    "claude-code",
    "agents",
    "orchestration",
    "automation",
    "multi-agent",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "claude-code-agents-guide",
      relationship: "recommends",
    },
    { type: "agent", slug: "code-architect", relationship: "documented-by" },
    { type: "agent", slug: "code-explorer", relationship: "documented-by" },
    { type: "agent", slug: "code-reviewer", relationship: "documented-by" },
    {
      type: "blog",
      slug: "claude-code-hooks-guide",
      relationship: "recommends",
    },
    {
      type: "how-to",
      slug: "agent-teams",
      relationship: "recommends",
    },
  ],
  content: `# Claude Code Subagents: Build AI Developer Teams That Ship Code

Most developers using Claude Code are having a conversation with one agent. Power users are running entire teams.

Claude Code's **subagent system** lets you spawn specialized AI agents that work on focused tasks — in parallel, with isolated contexts, using different tool sets. Think of it as going from a solo developer to a tech lead managing a team of specialists. You describe the high-level goal, and Claude orchestrates the right experts to get it done.

This guide covers how subagents actually work, the patterns that make them effective, and real workflows you can deploy today.

---

## How Subagents Work Under the Hood

When Claude Code encounters a complex task, it can spawn **subagents** — independent Claude sessions with their own context windows, tool access, and instructions. The main session acts as an orchestrator:

\`\`\`
Main Session (Orchestrator)
├── Subagent: Explore (reads codebase, maps architecture)
├── Subagent: Plan (designs implementation approach)
├── Subagent: Code (writes the implementation)
├── Subagent: Review (checks for bugs and issues)
└── Subagent: Test (generates and runs tests)
\`\`\`

Each subagent:
- **Has its own context window** — it doesn't pollute the main session with thousands of lines of code it read
- **Has focused instructions** — a reviewer agent thinks like a reviewer, not a coder
- **Returns structured results** — the orchestrator gets a summary, not a raw dump
- **Can run in parallel** — independent tasks execute simultaneously

### Built-in Subagent Types

Claude Code ships with several specialized subagent types:

| Type | Purpose | Tools Available |
|------|---------|----------------|
| \`Explore\` | Fast codebase exploration and search | Read, Glob, Grep, Bash |
| \`Plan\` | Architecture design and implementation planning | Read, Glob, Grep, Bash |
| \`code-reviewer\` | Reviews code for bugs and issues | Read, Glob, Grep |
| \`code-explorer\` | Deep codebase analysis with dependency mapping | Read, Glob, Grep, Bash |
| \`code-architect\` | Designs feature architectures matching codebase patterns | Read, Glob, Grep, Bash |
| \`general-purpose\` | Flexible agent for any task | All tools |

---

## Core Subagent Patterns

### Pattern 1: Explore-Then-Act

The most common pattern. Before making changes, spawn an explorer to understand what you're working with.

\`\`\`bash
claude "I need to add rate limiting to the API. First, use a code-explorer \\
  subagent to map all the API routes and identify where middleware is applied. \\
  Then implement rate limiting based on what you find."
\`\`\`

**Why it works**: The explorer reads dozens of files without cluttering your main session. The main agent gets a concise map and implements changes informed by the actual codebase structure.

### Pattern 2: Parallel Analysis

When you need multiple perspectives on the same codebase, run analyzers in parallel.

\`\`\`bash
claude "Before I refactor the auth module, I need three analyses in parallel: \\
  1. A code-explorer agent to map all auth dependencies and call sites \\
  2. A code-reviewer agent to identify existing bugs and tech debt \\
  3. An Explore agent to find all test files related to authentication \\
  Give me a consolidated report before making any changes."
\`\`\`

Three agents run simultaneously. Wall-clock time: ~30 seconds. Sequential time: ~90 seconds. You get a comprehensive picture before writing a single line.

### Pattern 3: Implement and Review

Write code, then immediately review it — with a different "brain."

\`\`\`bash
claude "Implement a WebSocket notification system for the dashboard. \\
  After implementation, spawn a code-reviewer subagent to review \\
  the changes. Fix any issues the reviewer flags before showing me \\
  the final result."
\`\`\`

The reviewer subagent has a fresh perspective — it didn't write the code, so it evaluates it objectively. This catches bugs that the implementing agent might overlook because it's "too close" to the code.

### Pattern 4: Divide and Conquer

Split a large feature into independent pieces and build them in parallel.

\`\`\`bash
claude "Build a user profile system with three independent parts: \\
  1. Backend API (user CRUD, avatar upload, preferences) \\
  2. Frontend components (profile page, edit form, avatar picker) \\
  3. Database schema and migrations \\
  Use separate subagents for each part, then integrate them."
\`\`\`

Backend and frontend agents run simultaneously since they're independent. The orchestrator handles integration after both complete.

### Pattern 5: Chain of Specialists

Pass output from one specialist to the next in a pipeline.

\`\`\`
Explorer → "Here's the codebase structure and patterns"
    ↓
Architect → "Here's the implementation design based on those patterns"
    ↓
Implementer → "Here's the code following that design"
    ↓
Reviewer → "Here are the issues I found"
    ↓
Implementer → "Here are the fixes"
    ↓
Tester → "Here are the tests, all passing"
\`\`\`

Each specialist adds value that the next one builds on. The architect makes better designs because it has the explorer's map. The implementer writes better code because it has the architect's plan.

---

## Real-World Subagent Workflows

### Workflow 1: Full Feature Development

The Feature Dev plugin uses this exact pattern:

\`\`\`
Phase 1 — Understanding
  └── code-explorer subagent: traces execution paths, maps dependencies,
      documents existing patterns

Phase 2 — Architecture
  └── code-architect subagent: designs implementation based on explorer output,
      provides specific files to create/modify, component designs, data flows

Phase 3 — Implementation
  └── Main agent: writes code following architect's blueprint

Phase 4 — Quality
  └── code-reviewer subagent: reviews changes with confidence-based filtering,
      only reports high-priority issues
\`\`\`

The result: features that match your codebase conventions from the start, catch architectural issues early, and ship with fewer bugs.

### Workflow 2: Large-Scale Refactoring

\`\`\`bash
claude "Migrate all API routes from Express to Fastify. \\
  Step 1: Explorer agent maps every Express route, middleware, and handler. \\
  Step 2: Architect agent creates a migration plan ordered by dependency. \\
  Step 3: Implement migrations one module at a time, running tests after each. \\
  Step 4: Reviewer agent does a final pass on the complete migration."
\`\`\`

### Workflow 3: Bug Triage

\`\`\`bash
claude "Users are reporting slow page loads on the dashboard. \\
  Run three investigation subagents in parallel: \\
  1. Explore the API endpoints the dashboard calls — check for N+1 queries \\
  2. Explore the frontend components — check for unnecessary re-renders \\
  3. Explore the database queries — check for missing indexes \\
  Report findings ranked by likely impact."
\`\`\`

### Workflow 4: Security Review Pipeline

\`\`\`bash
claude "Run a security review of the /src/api directory: \\
  1. Explorer agent: map all endpoints and their auth requirements \\
  2. Security reviewer: check for injection, auth bypass, data exposure \\
  3. Dependency auditor: scan for known vulnerabilities in packages \\
  Consolidate into a prioritized findings report."
\`\`\`

---

## Configuring Custom Subagents

You can define custom subagent types in your project's \`.claude/\` directory:

### Agent Definition File

Create \`.claude/agents/my-specialist.md\`:

\`\`\`markdown
---
name: my-specialist
description: "Reviews database queries for performance issues"
tools: ["Read", "Glob", "Grep", "Bash(explain *)"]
---

# Database Performance Specialist

You review database queries and schemas for performance issues.

## Process
1. Find all query definitions (ORMs, raw SQL, query builders)
2. Check for N+1 patterns, missing indexes, unbounded queries
3. Analyze schema for normalization issues
4. Report findings with severity and suggested fixes

## Output Format
For each finding:
- **[SEVERITY] file:line** — description
- **Impact**: estimated performance impact
- **Fix**: specific SQL or code change
\`\`\`

### Using Custom Subagents

Once defined, Claude Code automatically considers your custom subagents when they match the task:

\`\`\`bash
claude "Check the order processing module for database performance issues"
# Claude recognizes this matches your db-performance-specialist and spawns it
\`\`\`

Or invoke explicitly:

\`\`\`bash
claude "Use the my-specialist subagent to review all queries in src/models/"
\`\`\`

---

## Subagent Performance Tips

### 1. Use \`Explore\` for Quick Searches

The \`Explore\` subagent type is optimized for fast codebase search. Use it instead of general-purpose when you just need to find something:

\`\`\`
"Use an Explore agent to find all files that import the UserService class"
\`\`\`

### 2. Keep Subagent Prompts Focused

A subagent with a clear, narrow task outperforms one with a broad mandate. "Review auth middleware for session handling bugs" beats "review the auth system."

### 3. Prefer Parallel Over Sequential

If tasks don't depend on each other, run them in parallel. Three parallel subagents finish in the time of one.

### 4. Use Background Agents for Long Tasks

For tasks that don't block your main workflow:

\`\`\`
"Run a comprehensive test coverage analysis in the background while I \\
  work on the new feature. Notify me when it's done."
\`\`\`

### 5. Let the Orchestrator Decide

You don't always need to specify subagent types. Claude Code can decide which specialist to use:

\`\`\`
"Build this feature using whatever agents make sense"
\`\`\`

The orchestrator reads the task and spawns the right combination of specialists.

---

## Subagents vs. Single Sessions

| Aspect | Single Session | Subagents |
|--------|---------------|-----------|
| Context usage | Everything in one window | Distributed across agents |
| Speed | Sequential | Parallel for independent tasks |
| Specialization | Jack-of-all-trades | Focused experts per task |
| Quality | Good | Better — review catches implementation blind spots |
| Complex tasks | Can lose focus | Structured phases prevent drift |
| Simple tasks | Ideal | Overkill — use single session |

**Rule of thumb**: If the task involves more than two phases or benefits from multiple perspectives, use subagents. For quick edits and simple questions, a single session is faster.

---

## What's Next

The subagent system is evolving rapidly. Scheduled agents that run on cron, remote agents that execute in cloud infrastructure, and persistent agent teams that maintain state across sessions are all expanding what's possible.

The key mental model shift: stop thinking of Claude Code as a single assistant and start thinking of it as a platform for building AI development teams. Each team member (subagent) has a specialty, and the tech lead (orchestrator) coordinates them toward your goal.

Start with the explore-then-act pattern on your next feature. You'll immediately feel the difference between asking one agent to do everything and having a specialist map the codebase first. From there, add review agents, parallel analysis, and custom specialists as your workflows demand.

---

*Explore pre-built agents in the [agent catalog](/agents), learn the fundamentals in [How to Build Custom Agents](/blog/claude-code-agents-guide), or set up [agent teams](/how-to/agent-teams) for your project.*
`,
};
