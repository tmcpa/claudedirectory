import { Prompt } from "@/lib/types";

export const remixPrompt: Prompt = {
  slug: "remix",
  title: "Remix Development",
  description:
    "CLAUDE.md template for Remix projects with loaders, actions, nested routing, and progressive enhancement best practices",
  tags: ["remix", "react", "full-stack", "web", "typescript"],
  featured: false,
  dateAdded: "2026-03-25",
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  content: `# Remix Project

This is a Remix project with TypeScript.

## Tech Stack
- Remix with React
- TypeScript for type safety
- Tailwind CSS for styling
- Progressive enhancement by default

## Project Structure
- \\\`app/routes/\\\` - File-based routing with loaders and actions
- \\\`app/components/\\\` - Reusable React components
- \\\`app/models/\\\` - Data models and database interactions
- \\\`app/utils/\\\` - Utility functions
- \\\`app/styles/\\\` - Global styles
- \\\`public/\\\` - Static assets

## Commands
- \\\`npm run dev\\\` - Start development server
- \\\`npm run build\\\` - Build for production
- \\\`npm start\\\` - Start production server
- \\\`npm run lint\\\` - Run ESLint
- \\\`npm run typecheck\\\` - Run TypeScript type checking
- \\\`npm test\\\` - Run tests

## Conventions

### Routing
- Use file-based routing in app/routes/
- Use dot notation for nested routes (e.g., users.\$userId.tsx)
- Use _index.tsx for index routes
- Use _layout.tsx files for shared layouts
- Use parenthetical routes for pathless layouts

### Data Loading
- Use loader functions for GET data — runs on the server
- Return data with json() helper, typed with LoaderFunctionArgs
- Access loader data with useLoaderData<typeof loader>()
- Use defer() for non-critical data that can stream in
- Loaders run in parallel for nested routes — no waterfalls

### Mutations
- Use action functions for POST/PUT/DELETE — runs on the server
- Use native <Form> component for mutations (progressive enhancement)
- Access action data with useActionData<typeof action>()
- Use redirect() after successful mutations
- Validate input in actions, return errors as data

### Error Handling
- Export ErrorBoundary components for route-level error UI
- Use isRouteErrorResponse() to distinguish 4xx from 5xx
- Throw Response objects for expected errors (404, 403)
- Unexpected errors automatically bubble to nearest ErrorBoundary
- Always provide a root ErrorBoundary as a fallback

### Progressive Enhancement
- Forms work without JavaScript — always use <Form> over fetch
- Use useNavigation() for loading states, not useState
- Use useFetcher() for non-navigation mutations (likes, toggles)
- Build features that work without JS first, then enhance

### Code Style
- Use TypeScript strict mode
- Prefer named exports for components
- Colocate route-specific components in the route file
- Extract shared components to app/components/
- Use Tailwind utility classes, avoid custom CSS when possible
- Prefer async/await over .then() chains

### Testing
- Use Vitest for unit and integration tests
- Use Playwright or Cypress for end-to-end tests
- Test loaders and actions independently as server functions
- Test components with React Testing Library
- Test form submissions with and without JavaScript
`,
};
