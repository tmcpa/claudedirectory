# Contributing

Thanks for wanting to contribute! Adding content is straightforward.

## Quick Start

1. Fork and clone:
   ```bash
   git clone https://github.com/YOUR_USERNAME/claudedirectory.git
   cd claudedirectory && npm install
   ```

2. Create a branch, add your content, test it:
   ```bash
   git checkout -b add-my-content
   npm run dev    # Check localhost:3000
   npm run build  # Make sure it builds
   ```

3. Open a PR with a clear description of what you added.

## Adding Content

All content lives in `src/data/`. Pick the right folder, create a TypeScript file, and export it from the folder's `index.ts`.

### Prompts (`src/data/prompts/`)

CLAUDE.md templates for different tech stacks.

```typescript
import { Prompt } from "@/lib/types";

export const myPrompt: Prompt = {
  slug: "my-prompt",
  title: "My Prompt",
  description: "What this prompt is for",
  tags: ["tag1", "tag2"],
  author: { name: "Your Name", url: "https://github.com/you" },
  content: `# Your CLAUDE.md content here...`,
};
```

### MCP Servers (`src/data/mcp-servers/`)

Model Context Protocol server configurations.

```typescript
import { MCPServer } from "@/lib/types";

export const myServer: MCPServer = {
  slug: "my-server",
  title: "My Server",
  description: "What this server does",
  tags: ["tag1", "tag2"],
  author: { name: "Your Name" },
  installCommand: "npm install -g my-server", // optional
  config: `{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["-y", "my-server"]
    }
  }
}`,
};
```

### Hooks (`src/data/hooks/`)

Scripts that run before/after Claude uses tools.

```typescript
import { Hook } from "@/lib/types";

export const myHook: Hook = {
  slug: "my-hook",
  title: "My Hook",
  description: "What this hook does",
  event: "PostToolUse", // PreToolUse, PostToolUse, Notification, or Stop
  matcher: "Edit|Write", // optional regex for tool names
  tags: ["tag1"],
  author: { name: "Your Name" },
  script: `#!/bin/bash
# Your script here
`,
};
```

### Skills (`src/data/skills/`)

Custom slash commands and workflows.

```typescript
import { Skill } from "@/lib/types";

export const mySkill: Skill = {
  slug: "my-skill",
  title: "My Skill",
  description: "What this skill does",
  tags: ["tag1"],
  author: { name: "Your Name" },
  content: `# Skill prompt content here...`,
};
```

### Plugins (`src/data/plugins/`)

Installable plugin packages.

```typescript
import { Plugin } from "@/lib/types";

export const myPlugin: Plugin = {
  slug: "my-plugin",
  title: "My Plugin",
  description: "What this plugin does",
  tags: ["tag1"],
  author: { name: "Your Name" },
  installCommand: "claude plugin add my-plugin",
  commands: [
    { name: "/command", description: "What it does" },
  ],
};
```

### Agents (`src/data/agents/`)

Specialized agent configurations.

```typescript
import { Agent } from "@/lib/types";

export const myAgent: Agent = {
  slug: "my-agent",
  title: "My Agent",
  description: "What this agent does",
  category: "development", // development, data-ai, infrastructure, quality-testing, security, business, specialization
  tags: ["tag1"],
  author: { name: "Your Name" },
  content: `# Agent configuration here...`,
};
```

### How-To Guides (`src/data/how-to/`)

Tutorials and guides.

```typescript
import { HowTo } from "@/lib/types";

export const myGuide: HowTo = {
  slug: "my-guide",
  title: "How to Do Something",
  description: "Learn how to do something",
  difficulty: "beginner", // beginner, intermediate, advanced
  timeToComplete: "10 minutes",
  tags: ["tag1"],
  author: { name: "Your Name" },
  content: `# Your tutorial content here...`,
};
```

## Don't Forget

After creating your file, export it from the folder's `index.ts`:

```typescript
import { myThing } from "./my-thing";

export const things = [
  // ...existing items
  myThing,
];
```

## Optional Fields

All content types support these optional fields:

- `featured: true` - Highlight on the homepage
- `repoUrl: "https://..."` - Link to source repository
- `relatedItems: [{ type: "plugin", slug: "some-plugin" }]` - Cross-reference other content

## Questions?

Open an issue if something's unclear. Happy to help!
