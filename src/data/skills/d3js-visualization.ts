import { Skill } from "@/lib/types";

export const d3jsVisualizationSkill: Skill = {
  slug: "d3js-visualization",
  title: "D3.js Data Visualization",
  description: "Create interactive data visualizations using D3.js with best practices for charts and graphs",
  tags: ["d3", "visualization", "charts", "data", "javascript"],
  featured: false,
  dateAdded: "2026-01-26",
  author: {
    name: "chrisvoncsefalvay",
    url: "https://github.com/chrisvoncsefalvay/claude-d3js-skill",
  },
  repoUrl: "https://github.com/chrisvoncsefalvay/claude-d3js-skill",
  content: `# D3.js Data Visualization Skill

Create beautiful, interactive data visualizations using D3.js.

## Overview

This skill provides Claude Code with expertise in D3.js for:

- **Charts** - Bar, line, pie, scatter plots
- **Graphs** - Network graphs, tree diagrams
- **Maps** - Geographic visualizations
- **Animations** - Transitions and interactions

## Installation

Clone the skill to your Claude Code configuration:

\`\`\`bash
git clone https://github.com/chrisvoncsefalvay/claude-d3js-skill.git ~/.claude/skills/d3js-visualization
\`\`\`

## Features

### Chart Types
- Bar charts (vertical, horizontal, stacked)
- Line charts with multiple series
- Pie and donut charts
- Scatter plots with regression
- Area charts and streamgraphs

### Interactive Elements
- Tooltips on hover
- Zoom and pan
- Brush selection
- Click interactions
- Responsive resizing

### Data Handling
- CSV/JSON data loading
- Data transformations
- Scales and axes
- Time series handling

### Best Practices
- Accessible color palettes
- Mobile-responsive designs
- Performance optimization
- Clean, maintainable code

## Example Usage

"Create a bar chart showing monthly sales data"
"Build an interactive network graph of user connections"
"Visualize this time series data with a line chart"

## Repository

[github.com/chrisvoncsefalvay/claude-d3js-skill](https://github.com/chrisvoncsefalvay/claude-d3js-skill)
`,
};
