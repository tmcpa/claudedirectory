import { Skill } from "@/lib/types";

export const regexBuilderSkill: Skill = {
  slug: "regex-builder",
  title: "Regex Builder",
  description:
    "Interactively build, explain, and test regular expressions with examples and edge case validation",
  tags: ["regex", "utility", "validation", "parsing"],
  featured: false,
  author: {
    name: "Claude Code Community",
  },
  content: `# Regex Builder Skill

Build, test, and debug regular expressions interactively with plain-English explanations and example matches.

## Usage
\`\`\`
/regex-builder
\`\`\`

## Behavior
1. Accept a description of what you want to match (or an existing regex to explain)
2. Generate the regex pattern with a step-by-step breakdown
3. Test against provided sample strings or auto-generated examples
4. Highlight matches, capture groups, and edge cases
5. Provide the pattern in multiple flavors if needed (JS, Python, PCRE, Go)

## Features

### Pattern Generation
- Convert plain English descriptions to regex patterns
- Handle common patterns: emails, URLs, IPs, dates, phone numbers
- Support for named capture groups, lookaheads, and lookbehinds
- Generate non-greedy and possessive quantifier variants

### Explanation Mode
- Break down any regex into annotated parts
- Visualize match groups and alternation branches
- Identify potential issues: catastrophic backtracking, unanchored matches
- Suggest simplifications for overly complex patterns

### Testing
- Run pattern against a list of should-match and should-not-match strings
- Show captured groups for each match
- Warn about partial matches vs full-string matches
- Flag common pitfalls (unescaped dots, missing anchors, etc.)

### Output Formats
- Raw pattern string ready to paste
- Language-specific syntax (Python raw strings, JS literal, Go backticks)
- Integration snippets showing the regex in use

## Example
\`\`\`
/regex-builder match ISO 8601 dates like 2024-01-15T09:30:00Z
\`\`\`
Generates the pattern with capture groups for date, time, and timezone components.
`,
};
