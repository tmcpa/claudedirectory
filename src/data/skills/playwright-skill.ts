import { Skill } from "@/lib/types";

export const playwrightSkill: Skill = {
  slug: "playwright-skill",
  title: "Playwright Browser Automation",
  description: "Browser automation and testing using Playwright for web application testing and scraping",
  tags: ["playwright", "browser", "testing", "automation", "e2e"],
  featured: true,
  dateAdded: "2026-01-26",
  author: {
    name: "lackeyjb",
    url: "https://github.com/lackeyjb/playwright-skill",
  },
  repoUrl: "https://github.com/lackeyjb/playwright-skill",
  content: `# Playwright Browser Automation Skill

Automate browser interactions for testing and web scraping using Playwright.

## Overview

This skill provides Claude Code with browser automation capabilities:

- **Navigation** - Open URLs, click links, fill forms
- **Testing** - Write and run E2E tests
- **Scraping** - Extract data from web pages
- **Screenshots** - Capture visual state for debugging

## Installation

Clone the skill to your Claude Code configuration:

\`\`\`bash
git clone https://github.com/lackeyjb/playwright-skill.git ~/.claude/skills/playwright-skill
\`\`\`

## Requirements

- Node.js 18+ installed
- Playwright browsers installed (\`npx playwright install\`)

## Features

### Browser Control
- Launch Chromium, Firefox, or WebKit
- Navigate to URLs and wait for page load
- Handle popups, dialogs, and new tabs

### Form Interactions
- Fill text inputs and textareas
- Select dropdown options
- Check/uncheck checkboxes
- Upload files

### Testing Capabilities
- Assert element visibility and text content
- Wait for network requests
- Compare screenshots
- Generate test reports

### Data Extraction
- Query elements with CSS selectors
- Extract text, attributes, and HTML
- Handle dynamic content loading

## Example Usage

"Open the login page and fill in the form with test credentials"
"Take a screenshot of the dashboard after logging in"
"Write an E2E test for the checkout flow"

## Repository

[github.com/lackeyjb/playwright-skill](https://github.com/lackeyjb/playwright-skill)
`,
  relatedItems: [
    { type: "plugin", slug: "playwright", relationship: "works-with" },
    { type: "mcp-server", slug: "playwright", relationship: "works-with" },
  ],
};
