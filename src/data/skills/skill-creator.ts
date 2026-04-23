import { Skill } from "@/lib/types";

export const skillCreatorSkill: Skill = {
  slug: "skill-creator",
  title: "Skill Creator",
  description: "Create, edit, and optimize Claude Code skills with proper frontmatter, trigger descriptions, and evaluation workflows",
  tags: ["skills", "meta", "official", "development", "anthropic"],
  featured: true,
  dateAdded: "2026-04-01",
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics/skills",
  },
  repoUrl: "https://github.com/anthropics/skills/tree/main/skill-creator",
  content: `# Skill Creator

Official Anthropic skill for building, editing, and optimizing your own Claude Code skills. Includes evaluation workflows for measuring skill trigger accuracy and variance.

## When to Use

- Creating a new skill from scratch
- Editing an existing skill file
- Optimizing a skill's description for better trigger accuracy
- Running evals against a skill to benchmark performance

## Usage

\`\`\`
/skill-creator
\`\`\`

## What It Does

1. **Scaffolds** a new skill directory with SKILL.md, proper frontmatter, and example files
2. **Reviews** existing skills for common issues: overly broad triggers, missing edge cases, ambiguous descriptions
3. **Benchmarks** trigger reliability by running your skill against a test suite of prompts
4. **Iterates** on the description field until the skill fires when it should and stays quiet when it shouldn't

## Frontmatter Format

\`\`\`markdown
---
name: my-skill
description: One-line trigger description used by the model to decide when to invoke
---
\`\`\`

## Best Practices Enforced

- Descriptions written from the model's perspective ("Use this when...")
- Explicit TRIGGER and SKIP examples
- Concrete, not abstract, criteria
- Token budget under 500 for the description

## Installation

\`\`\`bash
/plugin install skill-creator@anthropic-skills
\`\`\`

## Repository

[github.com/anthropics/skills](https://github.com/anthropics/skills)
`,
  relatedItems: [
    { type: "plugin", slug: "anthropic-skills", relationship: "part-of" },
    { type: "skill", slug: "mcp-builder", relationship: "works-with" },
  ],
};
