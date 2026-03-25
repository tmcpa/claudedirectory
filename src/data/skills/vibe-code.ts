import { Skill } from "@/lib/types";

export const vibeCodeSkill: Skill = {
  slug: "vibe-code",
  title: "Vibe Code",
  description:
    "A slash command that helps developers rapidly prototype and build applications through natural language descriptions, guiding Claude through a complete vibe coding workflow from vision to production-ready code.",
  tags: ["vibe-coding", "prototyping", "rapid-development", "productivity"],
  featured: true,
  dateAdded: "2026-03-25",
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  content: `# /vibe-code — Rapid Prototyping Through Natural Language

A skill that transforms high-level descriptions into working applications. Describe what you want to build and Claude handles the scaffolding, iteration, and progressive hardening.

## How It Works

When you invoke \`/vibe-code\`, Claude enters a structured prototyping workflow with four phases. Each phase builds on the previous one, moving from a rough concept to a polished, testable application.

## Phase 1: Vision Capture

Start by describing your application in plain language. Claude will ask clarifying questions to understand:

- **Core purpose** — What problem does this solve?
- **Target users** — Who will use this and how?
- **Key interactions** — What are the 3-5 most important things a user does?
- **Tech preferences** — Any stack requirements or constraints?

Example prompt:
\`\`\`
/vibe-code I want a dashboard that shows real-time analytics for my SaaS app.
Users should see MRR, churn rate, and active users with charts that update live.
\`\`\`

Claude captures these details into a lightweight spec before writing any code.

## Phase 2: Scaffold and Structure

Claude generates the initial project structure based on the vision:

1. **Initialize the project** with appropriate tooling (package.json, tsconfig, etc.)
2. **Create the directory layout** following conventions for the chosen stack
3. **Set up routing and navigation** for all identified screens
4. **Add placeholder components** with realistic prop interfaces
5. **Wire up state management** with mock data that matches the real shape

At the end of this phase you have a runnable skeleton with navigable screens and placeholder content.

## Phase 3: Feature Iteration

Claude builds out each feature one at a time, using a tight loop:

1. **Implement** — Write the feature with working logic and real UI
2. **Verify** — Run the dev server, check for errors, and validate behavior
3. **Demo** — Show you what was built and ask for feedback
4. **Adjust** — Incorporate your feedback immediately before moving on

You can steer with natural language at any point:
- "Make the chart colors match our brand palette"
- "Add a date range picker to filter the data"
- "The table should be sortable by any column"

Claude treats each instruction as a micro-iteration and applies changes incrementally.

## Phase 4: Progressive Hardening

Once the features feel right, Claude systematically hardens the codebase:

- **Error boundaries** — Add graceful error handling to all data-fetching paths
- **Loading states** — Replace any missing skeleton screens or spinners
- **Input validation** — Validate forms and user input at boundaries
- **Type safety** — Tighten TypeScript types, remove \`any\` casts
- **Accessibility** — Add aria labels, keyboard navigation, focus management
- **Responsive design** — Verify layouts at mobile, tablet, and desktop widths
- **Performance** — Lazy-load heavy components, memoize expensive renders

## Output Format

At each phase, Claude provides:

\`\`\`
## Status: [Phase Name]
### Completed
- [list of what was just done]
### Next Steps
- [what comes next, with estimated scope]
### Questions (if any)
- [decisions that need your input]
\`\`\`

## Best Practices

- **Start broad, narrow later** — Give a big-picture description first, then refine details in Phase 3
- **Keep feedback short** — One or two sentences per iteration keeps the loop fast
- **Trust the phases** — Resist the urge to polish during scaffolding; hardening comes in Phase 4
- **Name your constraints early** — If you need a specific library or API, mention it in Phase 1

## When to Use This Skill

- Building a proof of concept for a new product idea
- Prototyping internal tools where speed matters more than perfection
- Creating demo applications for presentations or investor pitches
- Exploring a new framework by building something real with it
- Hackathon projects where every minute counts
`,
};
