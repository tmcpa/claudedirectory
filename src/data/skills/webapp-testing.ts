import { Skill } from "@/lib/types";

export const webappTestingSkill: Skill = {
  slug: "webapp-testing",
  title: "Web App Testing",
  description: "End-to-end testing of web applications in a real browser — click, fill, assert, take screenshots, and verify flows before declaring a feature done",
  tags: ["testing", "e2e", "browser", "qa", "frontend"],
  featured: false,
  dateAdded: "2026-03-30",
  author: {
    name: "Claude Code Community",
  },
  content: `# Web App Testing Skill

Drive a real browser to exercise your web app end-to-end. Claude opens the page, clicks through the flow, fills forms, and reports what it sees.

## When to Use

- You just finished a frontend change and need to verify it actually works in the browser
- You want to reproduce a UI bug before fixing it
- You're reviewing a PR and want to see the change live, not just in the diff

## What It Does

1. **Starts** a local dev server if one isn't running
2. **Opens** the target page in a headless browser
3. **Exercises** the golden path and likely edge cases
4. **Asserts** visible state (text, DOM structure, network calls)
5. **Captures** screenshots and console logs
6. **Reports** regressions or unexpected behavior

## Usage

\`\`\`
/webapp-testing
\`\`\`

## Example Prompts

- "Test the checkout flow end-to-end"
- "Verify the login form rejects empty emails"
- "Reproduce the bug where the sidebar collapses on mobile"

## Integration

Works with Playwright and the Chrome DevTools MCP. If neither is installed, the skill prompts you to add one.

## Complementary Skills

- \`playwright-skill\` — for authoring Playwright test files
- \`review\` — to tie test results back to PR review
`,
  relatedItems: [
    { type: "plugin", slug: "playwright", relationship: "works-with" },
    { type: "plugin", slug: "chrome-devtools", relationship: "works-with" },
    { type: "skill", slug: "playwright-skill", relationship: "works-with" },
  ],
};
