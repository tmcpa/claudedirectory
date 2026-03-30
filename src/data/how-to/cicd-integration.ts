import { HowTo } from "@/lib/types";

export const cicdIntegrationHowTo: HowTo = {
  slug: "cicd-integration",
  title: "CI/CD Integration with Claude Code",
  description:
    "Set up Claude Code in your CI/CD pipelines for automated code review, test generation, and issue resolution",
  difficulty: "advanced",
  timeToComplete: "25 min",
  tags: ["ci-cd", "automation", "github-actions", "pipelines"],
  featured: false,
  dateAdded: "2026-03-30",
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  content: `# CI/CD Integration with Claude Code

Claude Code can run in non-interactive (headless) mode inside CI/CD pipelines. This enables automated code review on pull requests, test generation, documentation updates, and more.

## Prerequisites

- Claude Code CLI installed
- API key with sufficient quota
- CI/CD platform (GitHub Actions, GitLab CI, CircleCI, etc.)

## Running Claude Code in CI

Use the \`--print\` flag (\`-p\`) for non-interactive single-turn execution:

\`\`\`bash
claude -p "Review this diff for bugs and security issues" --output-format text
\`\`\`

For multi-step tasks, use the \`--resume\` flag or pipe input:

\`\`\`bash
git diff main...HEAD | claude -p "Review this diff"
\`\`\`

## GitHub Actions Examples

### Automated Code Review on PRs

\`\`\`yaml
name: Claude Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Run review
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          DIFF=$(git diff origin/main...HEAD)
          REVIEW=$(echo "$DIFF" | claude -p "Review this diff. List any bugs, security issues, or improvements. Be concise." --output-format text)
          gh pr comment \${{ github.event.pull_request.number }} --body "$REVIEW"
        env:
          GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
\`\`\`

### Auto-fix Lint Errors

\`\`\`yaml
name: Claude Auto-fix
on:
  push:
    branches: [main]

jobs:
  autofix:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run linter
        id: lint
        run: npm run lint 2>&1 | tee lint-output.txt
        continue-on-error: true

      - name: Fix lint errors with Claude
        if: steps.lint.outcome == 'failure'
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude -p "Fix these lint errors. Only modify the files mentioned: $(cat lint-output.txt)"

      - name: Create fix PR
        if: steps.lint.outcome == 'failure'
        run: |
          git checkout -b autofix/lint-\${{ github.sha }}
          git add -A
          git commit -m "fix: auto-fix lint errors"
          git push -u origin HEAD
          gh pr create --title "fix: auto-fix lint errors" --body "Automated lint fixes by Claude Code"
        env:
          GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
\`\`\`

### Generate Missing Tests

\`\`\`yaml
name: Test Coverage Check
on:
  pull_request:

jobs:
  coverage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Find untested files
        run: |
          CHANGED=$(git diff --name-only origin/main...HEAD -- '*.ts' '*.tsx' | grep -v test | grep -v spec)
          echo "$CHANGED" > changed-files.txt

      - name: Generate tests
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          for file in $(cat changed-files.txt); do
            claude -p "Generate unit tests for $file. Follow existing test patterns in the project."
          done
\`\`\`

## GitLab CI Example

\`\`\`yaml
claude-review:
  stage: review
  image: node:22
  before_script:
    - npm install -g @anthropic-ai/claude-code
  script:
    - DIFF=$(git diff $CI_MERGE_REQUEST_DIFF_BASE_SHA...HEAD)
    - REVIEW=$(echo "$DIFF" | claude -p "Review this merge request diff" --output-format text)
    - 'curl --request POST --header "PRIVATE-TOKEN: $GITLAB_TOKEN"
       --data-urlencode "body=$REVIEW"
       "$CI_API_V4_URL/projects/$CI_PROJECT_ID/merge_requests/$CI_MERGE_REQUEST_IID/notes"'
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
\`\`\`

## Best Practices

### Cost Control
- Use \`--max-turns 1\` for single-pass tasks to limit token usage
- Scope reviews to changed files only, not the entire codebase
- Cache Claude Code installation in your CI cache

### Security
- Store ANTHROPIC_API_KEY as a CI secret — never hardcode it
- Limit API key permissions to only what's needed
- Review Claude's suggestions before auto-merging — use PR comments, not direct commits to main

### Reliability
- Set timeouts on Claude steps to prevent hung pipelines
- Use \`continue-on-error: true\` so Claude failures don't block the build
- Log Claude's output for debugging pipeline issues

### Scope
- Keep prompts focused — one task per Claude invocation
- Provide context about your project conventions in CLAUDE.md
- Pipe only relevant diffs, not the entire repo history

## Limitations

- Claude Code in CI uses API credits per invocation
- Long diffs may exceed context limits — split large PRs
- Non-interactive mode cannot ask for clarification — prompts must be self-contained
- Rate limits apply — stagger parallel jobs if needed

## Related

- GitHub Actions and other CI/CD MCP servers for deeper integration
- The deployment-engineer agent for CI/CD pipeline design
- The code-review plugin for multi-agent PR reviews
`,
  relatedItems: [
    { type: "mcp-server", slug: "github", relationship: "works-with" },
    { type: "agent", slug: "deployment-engineer", relationship: "recommends" },
    { type: "plugin", slug: "code-review", relationship: "recommends" },
  ],
};
