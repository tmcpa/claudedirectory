import { Prompt } from "@/lib/types";

export const vuePrompt: Prompt = {
  slug: "vue",
  title: "Vue.js Development",
  description: "CLAUDE.md for Vue.js and Nuxt projects with Composition API patterns",
  tags: ["vue", "vuejs", "nuxt", "frontend", "javascript"],
  dateAdded: "2026-03-11",
  author: {
    name: "Claude Code Community",
  },
  content: `# Vue.js Project

This is a Vue.js project using the Composition API and modern Vue 3 patterns.

## Project Structure
- \`src/components/\` - Reusable Vue components
- \`src/composables/\` - Composition API composables
- \`src/views/\` - Page-level components
- \`src/stores/\` - Pinia state management
- \`src/router/\` - Vue Router configuration
- \`src/assets/\` - Static assets and styles

## Code Style
- Use Composition API with \`<script setup>\` syntax
- Use TypeScript for type safety
- Follow Vue.js Style Guide (Priority A and B rules)
- Use single-file components (.vue files)
- Keep components small and focused

## Conventions
- Use PascalCase for component names
- Use camelCase for props and emits
- Prefix composables with \`use\` (e.g., useAuth, useFetch)
- Use Pinia for global state, composables for shared logic
- Prefer \`defineProps\` and \`defineEmits\` macros

## Reactivity
- Use \`ref()\` for primitives, \`reactive()\` for objects
- Use \`computed()\` for derived state
- Use \`watch()\` and \`watchEffect()\` sparingly
- Avoid mutating props directly

## Commands
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run lint\` - Run ESLint
- \`npm run test\` - Run Vitest tests
`,
};
