import { Skill } from "@/lib/types";

export const xlsxSkill: Skill = {
  slug: "xlsx",
  title: "Excel / Spreadsheets (XLSX)",
  description: "Create, edit, and clean .xlsx, .xlsm, .csv, and .tsv files — including formulas, formatting, charts, and data cleanup",
  tags: ["excel", "xlsx", "csv", "spreadsheets", "data", "official", "anthropic"],
  featured: true,
  dateAdded: "2026-04-10",
  author: {
    name: "Anthropic",
    url: "https://github.com/anthropics/skills",
  },
  repoUrl: "https://github.com/anthropics/skills/tree/main/xlsx",
  content: `# Spreadsheet Skill

Official Anthropic skill for working with spreadsheet files (.xlsx, .xlsm, .csv, .tsv).

## When It Triggers

Any task where a spreadsheet file is the primary input or output:

- Opening, reading, editing, or fixing existing spreadsheets
- Creating new spreadsheets from scratch or other data sources
- Converting between tabular formats (CSV → XLSX, etc.)
- Cleaning or restructuring messy tabular data

## Capabilities

- **Add columns and rows** with proper formulas
- **Compute formulas** — SUM, VLOOKUP, pivot-like aggregations
- **Format cells** — number formats, conditional formatting, cell colors
- **Create charts** — bar, line, pie, scatter
- **Clean messy data** — malformed rows, misplaced headers, junk data
- **Multi-sheet workbooks** with cross-sheet references

## Installation

\`\`\`bash
/plugin install xlsx@anthropic-skills
\`\`\`

## Example Prompts

- "Add a total column to sales.xlsx"
- "Clean up this CSV — the headers are on row 4 and there's junk above"
- "Create a pivot-style summary of orders by region"
- "Convert these tab-separated logs into a formatted workbook"

## Does Not Trigger For

- Word document deliverables (use \`docx\`)
- Standalone Python analysis scripts
- Database pipelines or Google Sheets API calls

## Implementation

Uses openpyxl and pandas under the hood.
`,
  relatedItems: [
    { type: "plugin", slug: "anthropic-skills", relationship: "part-of" },
  ],
};
