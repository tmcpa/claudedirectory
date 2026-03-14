import { Skill } from "@/lib/types";

export const changelogSkill: Skill = {
  slug: "changelog",
  title: "Changelog Generator",
  description:
    "Generate structured changelogs from git history following Keep a Changelog format",
  tags: ["changelog", "git", "release", "documentation"],
  featured: false,
  author: {
    name: "Claude Code Community",
  },
  content: `# Changelog Generator Skill

Generate well-structured changelogs from git commit history following the Keep a Changelog specification.

## Usage
\`\`\`
/changelog [version or date range]
\`\`\`

## Behavior
1. Analyze git log since the last tag or specified range
2. Categorize commits into Added, Changed, Deprecated, Removed, Fixed, Security
3. Group related changes and write human-readable descriptions
4. Output in Keep a Changelog format

## Changelog Format
\`\`\`markdown
## [1.2.0] - 2026-03-14

### Added
- User profile avatar upload with image cropping
- Dark mode support across all pages

### Changed
- Improved search performance with debounced input

### Fixed
- Resolved login timeout on slow connections
- Fixed pagination offset calculation
\`\`\`

## Options
- **version**: Target version number for the changelog entry
- **date range**: e.g., \`v1.1.0..HEAD\` or \`2026-03-01..2026-03-14\`
- **output**: Append to existing CHANGELOG.md or print to stdout

## Commit Parsing
- Conventional commits are auto-categorized by type prefix
- Non-conventional commits are categorized by analyzing the diff
- Merge commits reference the PR number when available
- Breaking changes are highlighted prominently

## Example
\`\`\`
/changelog v1.3.0
\`\`\`
Generates a changelog entry for all changes since the last tag, formatted for version 1.3.0.
`,
};
