import { Prompt } from "@/lib/types";

export const sveltekitPrompt: Prompt = {
  slug: "sveltekit",
  title: "SvelteKit Development",
  description: "CLAUDE.md for SvelteKit full-stack applications with Svelte 5 runes",
  tags: ["svelte", "sveltekit", "frontend", "fullstack", "javascript"],
  dateAdded: "2026-03-22",
  author: {
    name: "Claude Code Community",
  },
  content: `# SvelteKit Project

This is a SvelteKit project using Svelte 5 runes and file-based routing.

## Project Structure
- \`src/routes/\` - File-based routing (pages and API endpoints)
- \`src/routes/+page.svelte\` - Page components
- \`src/routes/+page.server.ts\` - Server-side load functions
- \`src/routes/+server.ts\` - API endpoints
- \`src/lib/\` - Shared library code (\`$lib\` alias)
- \`src/lib/components/\` - Reusable Svelte components
- \`src/lib/server/\` - Server-only modules
- \`static/\` - Static assets
- \`tests/\` - Playwright and Vitest tests

## Code Style
- Use Svelte 5 runes (\`$state\`, \`$derived\`, \`$effect\`, \`$props\`)
- Use TypeScript for type safety
- Keep components small and composable
- Use \`+page.server.ts\` for data loading, not client-side fetching
- Use form actions for mutations

## Conventions
- Use \`$state()\` for reactive state, \`$derived()\` for computed values
- Use \`$props()\` to declare component props
- Prefer \`+server.ts\` API routes over external API calls
- Use \`$lib\` alias for imports from lib directory
- Use SvelteKit's built-in form handling for progressive enhancement
- Colocate related files in route directories

## Commands
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run test\` - Run Vitest tests
- \`npm run lint\` - Run ESLint and svelte-check
`,
};
