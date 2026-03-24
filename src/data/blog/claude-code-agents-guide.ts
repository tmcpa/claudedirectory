import { BlogPost } from "@/lib/types";

export const claudeCodeAgentsGuide: BlogPost = {
  slug: "claude-code-agents-guide",
  title:
    "How to Build Custom Claude Code Agents: The Complete Guide for 2026",
  description:
    "Learn how to build, configure, and deploy custom Claude Code agents that automate complex development workflows. Covers agent architecture, subagents, CLAUDE.md patterns, and real-world examples you can use today.",
  publishedDate: "2026-03-24",
  tags: [
    "claude-code",
    "agents",
    "automation",
    "tutorial",
    "developer-tools",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    { type: "agent", slug: "code-architect", relationship: "documented-by" },
    { type: "agent", slug: "code-reviewer", relationship: "documented-by" },
    { type: "agent", slug: "code-explorer", relationship: "documented-by" },
    { type: "agent", slug: "debugger", relationship: "documented-by" },
    { type: "agent", slug: "test-automator", relationship: "documented-by" },
    { type: "agent", slug: "security-auditor", relationship: "documented-by" },
    { type: "agent", slug: "backend-architect", relationship: "documented-by" },
    { type: "agent", slug: "prompt-engineer", relationship: "documented-by" },
    {
      type: "blog",
      slug: "claude-code-hooks-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-md-guide",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-workflows-10x-productivity",
      relationship: "recommends",
    },
  ],
  content: `# How to Build Custom Claude Code Agents: The Complete Guide

The gap between "Claude, fix this bug" and "Claude, own this entire feature from architecture to deployment" comes down to one thing: **agents**.

Claude Code agents aren't a plugin or an add-on. They're a pattern — a way of configuring Claude Code with specialized instructions, tool access, and workflow logic so it operates as an autonomous expert rather than a reactive assistant. Done right, agents turn Claude Code into a team of specialists that can explore codebases, review pull requests, architect features, run security audits, and ship code — all with minimal supervision.

This guide covers everything you need to build custom agents: how they work under the hood, the configuration patterns that matter, and real-world examples you can deploy today.

---

## What Are Claude Code Agents?

An agent is a Claude Code session configured with a specific role, set of instructions, and scope. Instead of giving Claude a generic prompt and hoping for the best, you define:

- **Who** the agent is (a security auditor, a code reviewer, a database expert)
- **What** it has access to (specific tools, files, repositories)
- **How** it should approach problems (methodology, output format, quality bars)
- **When** it should escalate vs. act autonomously

The simplest agent is just a well-crafted \`CLAUDE.md\` file. The most sophisticated agents use subagent orchestration, custom hooks, MCP servers, and multi-step workflows that coordinate across services.

The key insight: **agents are configuration, not code.** You don't need to build a framework or write an SDK integration. You configure Claude Code to behave like the specialist you need.

---

## The Anatomy of a Claude Code Agent

Every effective agent has four layers:

### 1. Identity and Expertise

This is the agent's persona — what it knows, how it thinks, and what it prioritizes. A security auditor thinks differently than a frontend developer. A database expert notices different things than a DevOps engineer.

\`\`\`markdown
# Security Auditor Agent

You are a senior application security engineer performing a comprehensive
security audit. You think like an attacker but communicate like a consultant.

## Your Expertise
- OWASP Top 10 vulnerabilities
- Authentication and authorization patterns
- Input validation and output encoding
- Secrets management and credential handling
- Dependency vulnerability assessment

## Your Approach
1. Start with the attack surface — entry points, APIs, auth boundaries
2. Trace data flow from input to storage to output
3. Check for common vulnerability patterns at each layer
4. Prioritize findings by exploitability and impact
5. Provide specific remediation, not generic advice
\`\`\`

### 2. Tool Access and Constraints

Agents need the right tools — and the right restrictions. A code reviewer shouldn't be writing files. A documentation agent doesn't need shell access.

\`\`\`json
{
  "permissions": {
    "allow": ["Read", "Glob", "Grep", "Bash(git log*)", "Bash(git diff*)"],
    "deny": ["Write", "Edit"]
  }
}
\`\`\`

This scoping is critical for two reasons: it prevents agents from doing things they shouldn't, and it focuses their attention on the tools that matter for their role.

### 3. Methodology and Workflow

The best agents don't just have knowledge — they have a process. Define the steps the agent should follow, the order it should work in, and the checkpoints where it should validate its own work.

\`\`\`markdown
## Workflow

### Phase 1: Discovery
- Map the project structure and identify key entry points
- Read configuration files for framework and dependency information
- Identify the testing framework and existing test patterns

### Phase 2: Analysis
- Trace the code paths related to the task
- Identify existing patterns and conventions
- Note any technical debt or constraints

### Phase 3: Implementation
- Follow existing patterns unless there's a clear reason to deviate
- Write tests alongside implementation code
- Run the test suite after each significant change

### Phase 4: Verification
- Run the full test suite
- Check for lint errors
- Review your own changes as if you were a code reviewer
\`\`\`

### 4. Output Format and Quality Bars

Define what "done" looks like. Agents that know their output format produce dramatically better results than agents that freestyle.

\`\`\`markdown
## Output Requirements

### For Code Changes
- All new code must have corresponding tests
- No lint warnings or type errors
- Changes must be atomic — one logical change per commit

### For Reviews
Rate each finding with confidence (high/medium/low) and severity (critical/warning/info).
Only report findings with high confidence. Skip style nitpicks.

Format:
**[SEVERITY] file:line — description**
Why: explanation of the risk
Fix: specific remediation code
\`\`\`

---

## Building Your First Agent: The Code Reviewer

Let's build a practical agent from scratch. A code reviewer is a great starting point because it's useful on every project and demonstrates the core patterns.

### Step 1: Create the Agent Configuration

Create a file at \`.claude/agents/code-reviewer.md\`:

\`\`\`markdown
# Code Reviewer Agent

You are an expert code reviewer focused on catching bugs, logic errors,
and security issues. You review code the way a senior engineer would
during a thorough PR review.

## Review Process

1. **Understand the context**: Read the PR description and linked issues.
   Understand what the change is trying to accomplish before judging how.

2. **Map the changes**: Look at the full diff. Identify which files changed,
   what the blast radius is, and which changes are the most critical to review.

3. **Deep review**: For each significant change:
   - Is the logic correct? Trace edge cases.
   - Are error cases handled?
   - Are there security implications?
   - Does it follow existing patterns in the codebase?
   - Are there missing tests?

4. **Synthesize**: Provide a summary verdict (approve, request changes, or
   needs discussion) with your top findings.

## What NOT to Do
- Don't nitpick style if a linter/formatter handles it
- Don't suggest refactors unrelated to the change
- Don't flag theoretical issues with no practical impact
- Don't re-review code that hasn't changed

## Output Format

### Summary
One paragraph: what the change does, whether it's safe to merge, and your
overall confidence level.

### Findings
For each issue, use:

**[CRITICAL|WARNING|INFO] file:line**
Description of the issue.
\`\`\`suggestion
// suggested fix
\`\`\`
\`\`\`

### Step 2: Register the Agent

Add the agent to your \`.claude/settings.json\` so it can be invoked as a subagent or slash command:

\`\`\`json
{
  "agents": {
    "code-reviewer": {
      "description": "Review code for bugs, logic errors, and security issues",
      "prompt": ".claude/agents/code-reviewer.md"
    }
  }
}
\`\`\`

### Step 3: Use It

Invoke the agent directly:

\`\`\`bash
claude -a code-reviewer "Review the changes in the current branch against main"
\`\`\`

Or use it as a subagent within a larger workflow — Claude Code will automatically delegate to it when code review is needed.

---

## Subagent Orchestration: The Real Power

Single agents are useful. **Subagent orchestration** is where things get powerful.

Claude Code can spawn specialized subagents to handle different parts of a complex task in parallel. Think of it like a tech lead delegating work to specialists:

\`\`\`
Main Agent (Tech Lead)
├── Code Explorer Agent → maps the codebase
├── Code Architect Agent → designs the implementation
├── Implementation Agent → writes the code
├── Test Agent → writes and runs tests
└── Code Reviewer Agent → reviews the final changes
\`\`\`

Each subagent runs with its own context, instructions, and tool access. The main agent coordinates the workflow, passes context between subagents, and makes decisions based on their outputs.

### How Subagents Work

When Claude Code encounters a task that matches a subagent's description, it can:

1. **Launch the subagent** with a focused prompt
2. **Pass relevant context** (file paths, requirements, prior analysis)
3. **Receive structured results** back from the subagent
4. **Continue the workflow** using the subagent's output

This happens automatically when you've configured your agents well. The main Claude Code session acts as an orchestrator, deciding when to delegate and how to combine results.

### Parallel Execution

Subagents can run in parallel when their tasks are independent. For example, when building a new feature:

- **Explorer agent** maps the relevant codebase sections
- **Architect agent** designs the implementation approach
- These run sequentially (architect needs explorer's output)
- Then **implementation** and **test writing** can run in parallel
- Finally, the **reviewer agent** checks everything

This parallelism dramatically reduces wall-clock time for complex tasks.

---

## Agent Categories: Picking the Right Specialist

Different problems need different specialists. Here are the agent categories that cover most development workflows:

### Development Agents

| Agent | Best For |
|-------|----------|
| Code Architect | Designing feature implementations, API designs, system architecture |
| Code Explorer | Understanding unfamiliar codebases, tracing execution paths |
| Frontend Developer | UI components, responsive layouts, accessibility |
| Backend Architect | API design, database schemas, service architecture |
| Full-Stack Agents (React, Next.js, etc.) | Framework-specific development |

### Quality & Testing Agents

| Agent | Best For |
|-------|----------|
| Code Reviewer | PR reviews, catching bugs and logic errors |
| Test Automator | Writing test suites, increasing coverage |
| Debugger | Tracing and fixing bugs, diagnosing failures |
| Performance Optimizer | Identifying bottlenecks, optimizing queries and rendering |

### Infrastructure & Security Agents

| Agent | Best For |
|-------|----------|
| Security Auditor | Vulnerability scanning, auth review, dependency audits |
| DevOps / SRE | CI/CD pipelines, monitoring, incident response |
| Cloud Architect | Infrastructure design, cost optimization |
| Database Expert | Schema design, query optimization, migrations |

### Specialized Agents

| Agent | Best For |
|-------|----------|
| Documentation Expert | API docs, README files, architecture docs |
| Migration Specialist | Framework upgrades, language migrations, API versioning |
| Prompt Engineer | Optimizing AI prompts and system instructions |
| Product Manager | Writing specs, prioritizing features, analyzing requirements |

Browse the full catalog of pre-built agents in the [Claude Directory agent collection](/agents).

---

## Advanced Patterns

### Pattern 1: Agent Chains

Chain agents together for multi-step workflows where each agent's output feeds the next:

\`\`\`
Explore → Architect → Implement → Test → Review
\`\`\`

Each agent receives the previous agent's output as context. The explorer's codebase map informs the architect's design, which guides the implementer's code, which the tester validates, which the reviewer checks.

### Pattern 2: Agent Gates

Use agents as quality gates that block progress until standards are met:

\`\`\`markdown
## Workflow Rules

Before any code is committed:
1. Run the security-auditor agent. Block if any CRITICAL findings.
2. Run the code-reviewer agent. Block if confidence < HIGH on any WARNING.
3. Run the test suite. Block if coverage drops below the threshold.

Only proceed to commit if all gates pass.
\`\`\`

Combine this with [Claude Code hooks](/blog/claude-code-hooks-guide) to automate the gates — run the security auditor as a PostToolUse hook on every file write, for example.

### Pattern 3: Context-Specialized Agents

Create variants of the same agent tuned for different parts of your codebase:

\`\`\`
code-reviewer-frontend   → knows React patterns, a11y, performance
code-reviewer-backend     → knows API design, SQL, auth
code-reviewer-infra       → knows Terraform, Docker, CI/CD
\`\`\`

Each variant shares the same review methodology but has domain-specific knowledge about what "good" looks like in its area.

### Pattern 4: CLAUDE.md as Agent Configuration

Your project's \`CLAUDE.md\` file is itself an agent configuration — it defines how Claude Code behaves in your repository. The techniques in this guide apply directly to \`CLAUDE.md\`:

\`\`\`markdown
# CLAUDE.md

## Project Context
This is a financial services API handling PCI-regulated data.
All code changes must pass security review.

## Agent Behavior
- Always check for PII exposure before writing database queries
- Run the test suite after any change to auth/ or payments/ directories
- Use parameterized queries exclusively — never string concatenation for SQL
- Flag any new dependency additions for manual review

## Code Style
- Follow existing patterns in the codebase
- Prefer explicit error handling over try/catch-all
- Every public API endpoint needs input validation and rate limiting
\`\`\`

Read the [complete CLAUDE.md guide](/blog/claude-md-guide) for more configuration patterns.

---

## Real-World Agent Workflows

### Workflow 1: Automated PR Review Pipeline

\`\`\`bash
# Trigger on every PR via CI
claude -a code-reviewer "Review PR #\${PR_NUMBER}. \\
  Focus on: correctness, security, test coverage. \\
  Output a structured review with approve/request-changes verdict."
\`\`\`

Pair this with the [code review skill](/skills) to get formatted, actionable PR reviews that post directly to GitHub.

### Workflow 2: Feature Development from Spec to Ship

\`\`\`bash
# Start with exploration
claude "Using the code-explorer agent, map the authentication system. \\
  Then use the code-architect agent to design a new OAuth2 integration. \\
  Implement the design, write tests, and run the code-reviewer agent \\
  on the final changes before committing."
\`\`\`

Claude Code orchestrates the full workflow: explore → design → implement → test → review. Each phase uses the appropriate specialist agent.

### Workflow 3: Security Audit with Remediation

\`\`\`bash
claude "Run a security audit on the /src/api directory. \\
  For any CRITICAL findings, immediately implement the fix. \\
  For WARNING findings, create a summary report with recommended fixes. \\
  Run the test suite after any changes to confirm nothing broke."
\`\`\`

The security auditor agent identifies vulnerabilities, then Claude Code switches to implementation mode to fix the critical ones automatically.

### Workflow 4: Codebase Onboarding

\`\`\`bash
claude "I'm new to this codebase. Use the code-explorer agent to: \\
  1. Map the overall architecture and key directories \\
  2. Identify the main entry points and data flow \\
  3. Document the testing patterns and how to run tests \\
  4. List any non-obvious conventions or gotchas \\
  Give me a concise onboarding document."
\`\`\`

This turns Claude Code into an interactive onboarding guide that reads and explains the actual codebase rather than relying on potentially outdated documentation.

---

## Tips for Building Effective Agents

### 1. Be Specific About What "Good" Looks Like

Vague instructions produce vague results. Instead of "review this code," define what matters:

- What severity levels should be reported?
- What's the confidence threshold for flagging an issue?
- Should style issues be included or ignored?
- What output format should findings follow?

### 2. Give Agents a Process, Not Just Knowledge

An agent with expertise but no methodology will meander. Define the steps: what to look at first, how to analyze it, when to dig deeper, and when to move on.

### 3. Scope Tool Access Appropriately

A code reviewer that can edit files is a code reviewer that will edit files. If the agent's job is read-only analysis, restrict it to read-only tools.

### 4. Test Agents on Real Work

The best way to improve an agent is to use it and refine the instructions based on where it falls short. Keep a running list of cases where the agent missed something or overreacted, and update the configuration accordingly.

### 5. Compose, Don't Monolith

Resist the urge to build one mega-agent that does everything. Multiple focused agents that each do one thing well will outperform a single agent trying to do everything. The orchestration layer handles coordination.

### 6. Version Your Agent Configurations

Agent configs are code. Put them in version control, review changes, and track what works. A good agent configuration is an institutional asset — it encodes your team's engineering standards and practices.

---

## What's Next for Claude Code Agents

The agent ecosystem is evolving fast. Remote agents running on cloud infrastructure, scheduled agents that execute on cron, and multi-agent systems that coordinate across repositories are all live today. The [Claude Code remote control](/blog/claude-code-remote-control) capabilities make it possible to run agent workflows in CI/CD pipelines, triggered by events, or on a schedule.

The trajectory is clear: agents are moving from a power-user feature to the default way of using Claude Code. The developers who invest in building and refining their agent configurations now will have a significant productivity advantage as the tooling matures.

Start with one agent. Pick your most repetitive workflow — code review, test writing, security scanning, or codebase exploration — and build a specialist for it. Use it for a week. Refine it. Then add a second agent. The compound effect of multiple specialized agents working together is where the real leverage lives.

---

*Ready to get started? Browse pre-built agents in the [Claude Directory agent catalog](/agents), learn how to supercharge agents with [hooks](/blog/claude-code-hooks-guide), or read the [CLAUDE.md guide](/blog/claude-md-guide) to configure Claude Code for your project.*
`,
};
