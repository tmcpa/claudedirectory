import { Prompt } from "@/lib/types";

export const astroPrompt: Prompt = {
  slug: "astro",
  title: "Astro Development",
  description: "CLAUDE.md for Astro content-driven websites with island architecture",
  tags: ["astro", "static-site", "frontend", "content", "javascript"],
  dateAdded: "2026-03-22",
  author: {
    name: "Claude Code Community",
  },
  content: `# Astro Project

This is an Astro project using content collections and island architecture for minimal client-side JavaScript.

## Project Structure
- \`src/pages/\` - File-based routing (.astro, .md, .mdx)
- \`src/layouts/\` - Page layout components
- \`src/components/\` - Reusable Astro and framework components
- \`src/content/\` - Content collections (Markdown/MDX)
- \`src/content/config.ts\` - Content collection schemas
- \`src/styles/\` - Global styles
- \`public/\` - Static assets (served as-is)
- \`astro.config.mjs\` - Astro configuration

## Code Style
- Use .astro components for static content (zero JS by default)
- Use framework components (React/Vue/Svelte) only for interactive islands
- Use TypeScript for type safety
- Use content collections for structured content
- Keep client-side JavaScript minimal

## Conventions
- Use \`client:load\` for interactive components that need JS immediately
- Use \`client:visible\` for components below the fold
- Use \`client:idle\` for low-priority interactive components
- Define content schemas with Zod in \`content/config.ts\`
- Use \`getCollection()\` and \`getEntry()\` for content queries
- Prefer Astro components over framework components when possible

## Commands
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npx astro check\` - Run type checking
- \`npx astro add <integration>\` - Add an integration
`,
};
