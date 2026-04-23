import { Skill } from "@/lib/types";

export const pdfSkill: Skill = {
  slug: "pdf",
  title: "PDF Tools",
  description: "Read, extract, merge, split, rotate, watermark, encrypt, and OCR PDF files — including filling PDF forms and extracting tables",
  tags: ["pdf", "documents", "official", "anthropic", "files"],
  featured: true,
  dateAdded: "2026-04-10",
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics/skills",
  },
  repoUrl: "https://github.com/anthropics/skills/tree/main/pdf",
  content: `# PDF Tools Skill

Official Anthropic skill for working with PDF files. Triggers whenever a .pdf file is mentioned as input or output.

## Capabilities

- **Read and extract** text and tables from PDFs
- **Merge** multiple PDFs into one
- **Split** a PDF into per-page or per-section files
- **Rotate** individual pages
- **Watermark** with text or image overlays
- **Encrypt / decrypt** with passwords
- **Fill PDF forms** programmatically
- **Extract images** from embedded resources
- **OCR** scanned PDFs so their content becomes searchable

## When It Triggers

- User mentions a .pdf file by name
- User asks to produce a PDF report or deliverable
- User asks to combine, split, or manipulate PDFs

## Installation

Included in the \`anthropic-skills\` plugin:

\`\`\`bash
/plugin install pdf@anthropic-skills
\`\`\`

## Example Prompts

- "Merge these three PDFs into one"
- "Extract the table from page 4 of report.pdf"
- "OCR this scanned invoice"
- "Fill out the W-9 form with my info"
- "Add a watermark to every page"

## Implementation

Uses pypdf, pdfplumber, and pytesseract under the hood. No external services — runs locally.
`,
  relatedItems: [
    { type: "plugin", slug: "anthropic-skills", relationship: "part-of" },
  ],
};
