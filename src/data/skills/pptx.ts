import { Skill } from "@/lib/types";

export const pptxSkill: Skill = {
  slug: "pptx",
  title: "PowerPoint (PPTX)",
  description: "Create, read, edit, and combine PowerPoint presentations — including slide layouts, speaker notes, charts, and templates",
  tags: ["powerpoint", "pptx", "slides", "documents", "official", "anthropic"],
  featured: true,
  dateAdded: "2026-04-10",
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics/skills",
  },
  repoUrl: "https://github.com/anthropics/skills/tree/main/skills/pptx",
  content: `# PowerPoint Skill

Official Anthropic skill for creating and editing .pptx files.

## When It Triggers

Any task where a .pptx file is involved — as input, output, or both. This includes:

- Creating slide decks, pitch decks, or presentations
- Reading, parsing, or extracting text from .pptx files
- Editing, modifying, or updating existing presentations
- Combining or splitting slide files
- Working with templates, layouts, speaker notes, or comments

## Capabilities

- **Build decks** from an outline or topic
- **Respect templates** — apply corporate layouts, brand colors, and slide masters
- **Inject content** — bullets, images, tables, charts
- **Speaker notes** — add and edit presenter notes per slide
- **Extract text** from existing decks for summaries or analysis

## Installation

\`\`\`bash
/plugin install pptx@anthropic-skills
\`\`\`

## Example Prompts

- "Create a 10-slide pitch deck for an AI startup"
- "Extract speaker notes from quarterly-review.pptx"
- "Add a summary slide to the end of this deck"
- "Combine slides from these three decks"

## Implementation

Uses python-pptx under the hood. Supports all standard PPTX features including slide masters, layouts, and chart embedding.
`,
  relatedItems: [
    { type: "plugin", slug: "anthropic-skills", relationship: "part-of" },
  ],
};
