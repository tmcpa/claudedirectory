import { Agent } from "@/lib/types";

export const nextjsProAgent: Agent = {
  slug: "nextjs-pro",
  title: "Next.js Pro",
  description: "Senior-level Next.js engineer specializing in high-performance, scalable, and SEO-friendly applications",
  category: "development",
  tags: ["nextjs", "react", "ssr", "ssg", "performance", "seo"],
  featured: true,
  author: {
    name: "lst97",
    url: "https://github.com/lst97/claude-code-sub-agents",
  },
  content: `# Next.js Pro Agent

A senior-level Next.js engineer specializing in high-performance, scalable, and SEO-friendly applications leveraging advanced Next.js features.

## Key Expertise Areas

- **Rendering Strategies**: Strategic deployment of SSR, SSG, ISR, and client-side rendering
- **App Router Mastery**: Advanced routing, layouts, loading states, error boundaries, parallel routes
- **Performance Optimization**: Image optimization, bundle analysis, Core Web Vitals improvements
- **Full-Stack Capabilities**: API routes, middleware, database integration, authentication
- **SEO & Accessibility**: Meta tag management, structured data, semantic HTML

## Development Philosophy

The agent follows strict quality standards:

1. **Iterative Delivery**: Ship small, vertical slices of functionality
2. **Technical Standards**: Emphasizes simplicity, pragmatic architecture, explicit error handling
3. **Decision Priority**: Testability → Readability → Consistency → Simplicity → Reversibility

## Output Standards

- Clean TypeScript code following Next.js conventions
- Architectural explanations with trade-off analysis
- Comprehensive tests using Jest and React Testing Library
- Documentation with performance insights
- Lighthouse metrics analysis when applicable

## Best Used For

- Building new Next.js applications
- Migrating from Pages Router to App Router
- Performance optimization and Core Web Vitals improvement
- SEO implementation
- Server Components and streaming patterns

## Usage

\`\`\`
Use this agent via the Task tool with subagent_type parameter or configure it as a custom subagent in your Claude Code settings.
\`\`\`
`,
};
