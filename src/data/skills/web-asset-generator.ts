import { Skill } from "@/lib/types";

export const webAssetGeneratorSkill: Skill = {
  slug: "web-asset-generator",
  title: "Web Assets Generator",
  description: "Generate favicons, PWA app icons, and social media meta images with proper HTML tags",
  tags: ["favicon", "pwa", "meta-tags", "images", "web"],
  featured: false,
  author: {
    name: "alonw0",
    url: "https://github.com/alonw0/web-asset-generator",
  },
  content: `# Web Assets Generator Skill

A skill for generating web assets including favicons, PWA app icons, and social media meta images with proper HTML tag support.

## Overview

This skill automates the creation of essential web assets:
- Favicons in multiple sizes
- PWA (Progressive Web App) icons
- Open Graph images for social media
- Twitter Card images
- Apple touch icons

## Installation

\`\`\`bash
git clone https://github.com/alonw0/web-asset-generator.git
cp -r web-asset-generator/.claude ~/
\`\`\`

## Usage

Invoke the skill when you need to generate web assets:

\`\`\`
Generate web assets for my project with a blue theme
\`\`\`

## Generated Assets

### Favicons
- favicon.ico (multi-size ICO)
- favicon-16x16.png
- favicon-32x32.png
- favicon-96x96.png

### PWA Icons
- icon-192x192.png
- icon-512x512.png
- maskable-icon.png

### Social Media
- og-image.png (1200x630)
- twitter-card.png (1200x600)

### Apple
- apple-touch-icon.png (180x180)

## HTML Tags

The skill also generates the required HTML meta tags:

\`\`\`html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:image" content="/og-image.png">
<meta name="twitter:image" content="/twitter-card.png">
\`\`\`

## Repository

[github.com/alonw0/web-asset-generator](https://github.com/alonw0/web-asset-generator)
`,
};
