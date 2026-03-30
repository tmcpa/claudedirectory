import { HowTo } from "@/lib/types";

export const debuggingHowTo: HowTo = {
  slug: "debugging",
  title: "Debugging with Claude Code",
  description:
    "Learn effective debugging workflows using Claude Code — from reproducing bugs to root cause analysis and fix verification",
  difficulty: "intermediate",
  timeToComplete: "20 min",
  tags: ["debugging", "workflow", "troubleshooting"],
  featured: false,
  dateAdded: "2026-03-30",
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  content: `# Debugging with Claude Code

Claude Code excels at debugging because it can read your codebase, run commands, and iterate on fixes. This guide covers proven workflows for tracking down and fixing bugs efficiently.

## The Debugging Loop

The most effective debugging pattern with Claude Code follows these steps:

1. **Describe the bug** — paste the error, describe the symptoms, or share a failing test
2. **Reproduce** — Claude runs the command or test to confirm the failure
3. **Investigate** — Claude reads relevant code, checks logs, and traces the issue
4. **Hypothesize** — Claude proposes a root cause
5. **Fix and verify** — Claude applies the fix and re-runs to confirm

## Starting a Debug Session

### From an Error Message

Paste the full error output and ask Claude to investigate:

\`\`\`
I'm getting this error when I run npm test:

TypeError: Cannot read properties of undefined (reading 'map')
    at UserList (src/components/UserList.tsx:14:22)
    at renderWithHooks (node_modules/react-dom/...)

Can you find and fix this?
\`\`\`

Claude will read the file at the stack trace location, understand the context, and trace back to where the undefined value originates.

### From a Failing Test

\`\`\`
The test in tests/auth.test.ts is failing. Can you debug it?
\`\`\`

Claude will run the test, read the assertion failure, examine the code under test, and identify the discrepancy.

### From Unexpected Behavior

\`\`\`
The API returns 200 but the response body is empty when I POST to /api/users.
The handler is in src/routes/users.ts.
\`\`\`

Claude will read the handler, trace the data flow, and identify where the response body gets lost.

## Effective Debugging Techniques

### Use Git Bisect

If a bug was introduced recently but you don't know when:

\`\`\`
This feature worked last week. Can you use git bisect to find which commit broke it?
\`\`\`

Claude can automate git bisect with a test command to binary-search for the breaking commit.

### Add Temporary Logging

Ask Claude to add strategic console.log or print statements:

\`\`\`
Add some debug logging to the payment flow in src/services/payment.ts
so we can trace what's happening step by step.
\`\`\`

Claude will add logging at key decision points, run the code, analyze the output, and then remove the logging after the bug is found.

### Check Assumptions with the REPL

For Python or Node projects, Claude can use the REPL to test hypotheses:

\`\`\`
Can you open a Node REPL and test what happens when we call
parseConfig() with an empty object?
\`\`\`

### Compare Working vs Broken

\`\`\`
This endpoint works for GET /users/1 but fails for GET /users/2.
Can you figure out what's different about user 2's data?
\`\`\`

Claude will query both cases, diff the results, and identify the data condition that triggers the bug.

## Debugging Specific Scenarios

### Race Conditions
Ask Claude to look for async operations without proper awaiting, shared mutable state, or missing locks. It can add timing logs to expose ordering issues.

### Memory Leaks
Claude can help set up heap snapshots, identify growing arrays or maps, and find event listeners that aren't cleaned up.

### Environment-Specific Bugs
Ask Claude to compare environment variables, dependency versions, or config files between environments where the bug does and doesn't reproduce.

## Tips

- **Provide the full error** — don't truncate stack traces or error messages
- **Mention what you've already tried** — saves Claude from repeating dead ends
- **Share reproduction steps** — the faster Claude can reproduce, the faster it can fix
- **Use extended thinking** for complex bugs — \`/think hard about this bug\` gives Claude more reasoning space
- **Let Claude run tests** after fixing — verification is cheap and catches regressions

## Related

- The \`/git-bisect\` skill automates binary search debugging
- The \`auto-test\` hook automatically runs tests after edits
- The Debugger agent provides a specialized debugging persona
`,
  relatedItems: [
    { type: "skill", slug: "git-bisect", relationship: "recommends" },
    { type: "hook", slug: "auto-test", relationship: "works-with" },
    { type: "agent", slug: "debugger", relationship: "recommends" },
  ],
};
