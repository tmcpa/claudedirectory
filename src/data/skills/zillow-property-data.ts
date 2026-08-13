import { Skill } from "@/lib/types";

export const zillowPropertyDataSkill: Skill = {
  slug: "zillow-property-data",
  title: "Zillow Property Data",
  description: "Look up U.S. property records, Zestimates, and for-sale, sold and rental listings from an address, URL, or map area",
  tags: ["zillow", "real-estate", "property-data", "zestimate", "listings"],
  featured: false,
  dateAdded: "2026-08-13",
  author: {
    name: "ZeroPointRepo",
    url: "https://github.com/ZeroPointRepo",
  },
  repoUrl: "https://github.com/ZeroPointRepo/zillow-skills",
  content: `# Zillow Property Data Skill

Pull Zillow-sourced U.S. residential property data straight into Claude Code.

## Overview

This skill lets Claude Code answer property questions without you leaving the terminal:

- **Property lookup** - Full record for any U.S. address, Zillow URL, or zpid
- **Valuation** - Zestimate and rent Zestimate
- **Listing search** - For sale, for rent, and sold, filtered by price, beds, baths, and home type
- **History and context** - Price history, tax history, schools, photos, and listing agent

## Installation

\`\`\`bash
npx skills add ZeroPointRepo/zillow-skills
\`\`\`

Install a single focused skill instead of the bundle:

\`\`\`bash
npx skills add ZeroPointRepo/zillow-skills --skill zillow-zestimate
\`\`\`

## Requirements

- A Zillapi API key, set as an environment variable

\`\`\`bash
export ZILLAPI_KEY="zk_..."
\`\`\`

Get a key at [zillapi.com](https://zillapi.com). Pure Python standard library, no packages to install.

## Skills in the repo

| Skill | Purpose |
|---|---|
| \`zillow-full\` | Complete toolkit: address, URL and zpid lookup, Zestimate, search, history, photos, schools, agent |
| \`zillow-zestimate\` | Valuation lookups only, for a lighter response |
| \`zillow-search\` | Bounding box and location listing search |

## Example Usage

"What is the Zestimate for 350 5th Ave, New York, NY 10118?"
"Pull the price and tax history for this Zillow listing: [URL]"
"Find 3 bed homes for sale under $600k in this map area"
"Which schools serve this address, and how far are they?"

## Notes

Zillapi is an independent service and is not affiliated with, endorsed by, or sponsored by Zillow Group, Inc. "Zillow" and "Zestimate" are registered trademarks of Zillow Group, Inc.

## Repository

[github.com/ZeroPointRepo/zillow-skills](https://github.com/ZeroPointRepo/zillow-skills)
`,
};
