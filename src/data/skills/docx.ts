import { Skill } from "@/lib/types";

export const docxSkill: Skill = {
  slug: "docx",
  title: "Word Documents (DOCX)",
  description: "Create, read, edit, and format Word documents — including tables of contents, headings, tracked changes, page numbers, and templates",
  tags: ["word", "docx", "documents", "reports", "official", "anthropic"],
  featured: true,
  dateAdded: "2026-04-10",
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics/skills",
  },
  repoUrl: "https://github.com/anthropics/skills/tree/main/docx",
  content: `# Word Document Skill

Official Anthropic skill for creating, reading, editing, and manipulating Word documents (.docx).

## When It Triggers

- Any mention of "Word doc", "word document", or ".docx"
- Requests to produce professional documents with formatting like tables of contents, headings, page numbers, or letterheads
- Extracting or reorganizing content from .docx files
- Inserting or replacing images in documents
- Performing find-and-replace in Word files
- Working with tracked changes or comments
- Producing a "report", "memo", "letter", or "template" as a Word file

## Capabilities

- **Styled documents** — headings, body text, lists, captions
- **Page-level formatting** — headers, footers, page numbers
- **Tables** with cell styling and merged cells
- **Images** — insert, replace, resize
- **Tracked changes** — accept, reject, or add revisions programmatically
- **Find and replace** across the document
- **Templates** — produce letters, memos, reports from a template

## Installation

\`\`\`bash
/plugin install docx@anthropic-skills
\`\`\`

## Example Prompts

- "Create a project report with a TOC and these three sections"
- "Generate a cover letter for this job application"
- "Replace all instances of 'Acme Corp' with 'Globex Ltd' in this contract"
- "Add the company letterhead to the top of this memo"

## Does Not Trigger For

- PDFs (use \`pdf\`)
- Spreadsheets (use \`xlsx\`)
- Google Docs API tasks

## Implementation

Uses python-docx under the hood.
`,
  relatedItems: [
    { type: "plugin", slug: "anthropic-skills", relationship: "part-of" },
  ],
};
