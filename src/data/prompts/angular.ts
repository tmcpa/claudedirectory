import { Prompt } from "@/lib/types";

export const angularPrompt: Prompt = {
  slug: "angular",
  title: "Angular Development",
  description: "CLAUDE.md for Angular enterprise applications with Signals and standalone components",
  tags: ["angular", "typescript", "frontend", "enterprise"],
  dateAdded: "2026-03-22",
  author: {
    name: "Claude Code Community",
  },
  content: `# Angular Project

This is an Angular project using standalone components and Signals for reactivity.

## Project Structure
- \`src/app/\` - Application source code
- \`src/app/components/\` - Shared/reusable components
- \`src/app/pages/\` - Route-level page components
- \`src/app/services/\` - Injectable services
- \`src/app/models/\` - TypeScript interfaces and types
- \`src/app/guards/\` - Route guards
- \`src/app/interceptors/\` - HTTP interceptors
- \`src/app/pipes/\` - Custom pipes
- \`src/app/directives/\` - Custom directives
- \`src/environments/\` - Environment configurations

## Code Style
- Use standalone components (no NgModules for new code)
- Use Angular Signals for state management
- Use strict TypeScript settings
- Follow Angular style guide (angular.dev)
- Use OnPush change detection strategy

## Conventions
- Use \`inject()\` function instead of constructor injection
- Prefer \`signal()\`, \`computed()\`, and \`effect()\` for reactivity
- Use \`@defer\` blocks for lazy loading
- Use typed reactive forms (\`FormGroup<T>\`)
- Prefix services with their domain (e.g., AuthService, UserService)
- Use barrel exports (index.ts) for feature directories

## Commands
- \`ng serve\` - Start development server
- \`ng build\` - Build for production
- \`ng test\` - Run unit tests with Karma
- \`ng lint\` - Run ESLint
- \`ng generate component <name>\` - Generate new component
`,
};
