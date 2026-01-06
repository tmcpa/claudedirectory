import { Skill } from "@/lib/types";

export const prSkill: Skill = {
  slug: "pr",
  title: "Create Pull Request",
  description: "Generate comprehensive pull request descriptions and create PRs via GitHub CLI",
  tags: ["git", "github", "pr", "workflow"],
  featured: true,
  author: {
    name: "Claude Code Community",
  },
  content: `# Pull Request Skill

Create well-documented pull requests with comprehensive descriptions.

## Usage
\`\`\`
/pr
\`\`\`

## Behavior
1. Analyze commits since branching from main
2. Generate a descriptive PR title
3. Create detailed description with:
   - Summary of changes
   - Testing instructions
   - Screenshots (if UI changes)
4. Create PR via \`gh pr create\`

## PR Template
\`\`\`markdown
## Summary
Brief description of changes

## Changes
- List of specific changes made

## Testing
How to test these changes

## Screenshots
(if applicable)

## Checklist
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes
\`\`\`

## Requirements
- GitHub CLI (\`gh\`) installed and authenticated
- On a feature branch (not main)
`,
};
