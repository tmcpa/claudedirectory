import { BlogPost } from "@/lib/types";

export const designingWithClaude: BlogPost = {
  slug: "designing-with-claude",
  title:
    "Designing with Claude: A Practical Guide to AI-Assisted UI, UX, and System Design",
  description:
    "How to use Claude for real design work — from wireframes and component systems to product flows and architecture diagrams. A hands-on guide to making Claude a genuine design collaborator, not just a code generator.",
  publishedDate: "2026-04-17",
  tags: [
    "claude-design",
    "ui-design",
    "ux-design",
    "system-design",
    "design-workflow",
    "claude-code",
    "ai-design",
    "product-design",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "vibe-coding-claude-code",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "context-engineering-claude-code",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-workflows-10x-productivity",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-opus-4-7-deep-reasoning",
      relationship: "recommends",
    },
  ],
  content: `# Designing with Claude: A Practical Guide to AI-Assisted UI, UX, and System Design

Most of the conversation about Claude happens in the coding lane: generate this function, refactor that module, fix this bug. That's a fair framing — Claude Code is very good at code. But it undersells what the model can actually do.

Design is where Claude quietly shines. Not because it replaces designers, but because it collapses the distance between an idea and something you can react to. A rough UX sketch, a component API, a system diagram, a critique of your information architecture — all ten minutes away instead of an afternoon.

This post is a field guide to using Claude for real design work. UI, UX, product, and system design. What works, what doesn't, and the specific workflows that make Claude a design collaborator instead of a code machine with a design costume on.

---

## Why "Claude Design" Is Actually A Thing

Design is a pipeline of decisions under ambiguity. You start with a vague goal ("users can't find settings"), you generate options, you reason about tradeoffs, you converge on something, and you externalize it as an artifact — a wireframe, a flow, a doc, a Figma frame, a spec.

Claude is good at every step of that pipeline except the final Figma-rendering one:

- **Reframing the problem.** You describe the symptom; Claude helps you name the underlying job-to-be-done.
- **Generating options.** Three layouts, five microcopy variants, four information hierarchies — in seconds.
- **Reasoning about tradeoffs.** Density vs. scannability, consistency vs. discoverability, onboarding vs. power-user ergonomics.
- **Externalizing artifacts.** ASCII wireframes, Mermaid diagrams, Markdown specs, JSON design tokens, Tailwind-ready JSX, Storybook stubs.

What it can't do is pixel-polish a final comp. But the 80% of design that isn't pixel polish — the thinking, the options, the specs, the code scaffolding — is exactly where Claude earns its keep.

---

## The Three Levels of Designing With Claude

It helps to separate three different kinds of design work, because the right workflow is different for each.

### Level 1: Visual and component design

This is "make me a dashboard card," "design a settings page," "give me a pricing table." UI-level decisions, usually inside an existing design system.

Claude's sweet spot here is **generating JSX (or Vue, or Svelte) that already speaks your design system**. You don't describe the component in the abstract — you point Claude at your existing \`components/ui\` folder and ask it to follow the patterns. The output is tight code that drops into Storybook, not an image you have to reinterpret.

### Level 2: Flow and interaction design

This is "how should the onboarding work," "what are the states for this form," "how do we handle the empty state." Structure over surface.

Here Claude earns its keep through **diagramming and state enumeration**. Mermaid flowcharts for user journeys, state machines for form validation, lists of edge cases you hadn't thought of. The model is very good at "what could go wrong here?" — a question designers chronically under-ask.

### Level 3: System and information architecture

This is the big-picture work: IA, navigation structure, naming, taxonomies, cross-flow consistency. The stuff that's hardest to fix later because it's load-bearing.

This is where long-context models shine. Paste your entire nav, all your route names, your existing IA doc — and ask Claude to find inconsistencies, propose reorganizations, and flag the places where two flows use different words for the same thing. Opus 4.7's cross-file synthesis makes this genuinely useful instead of surface-level.

Each level uses Claude differently. Mixing them up — asking Claude to pixel-design while you're still figuring out the IA — is how design sessions get stuck.

---

## Workflow 1: The Wireframe-Before-Code Loop

The fastest way to use Claude for UI design is to separate "structure" from "styling" and do them in that order, with ASCII wireframes as the intermediate artifact.

Step one: describe the screen.

> "I need a project settings page. It has three sections: general (name, description, visibility), members (list of users with roles and a remove action), and danger zone (delete project). Give me three ASCII wireframes with different information hierarchies."

Claude will produce three distinct layouts — tabs, accordion, single scroll — with reasoning for each. You pick one, possibly after asking for tweaks. Then:

> "Good, go with layout B. Now implement it as a React component using our existing \`Card\`, \`Button\`, and \`Input\` components from \`src/components/ui\`. Match the conventions in \`src/components/ui/card.tsx\`."

What you get back is code that fits the codebase because Claude read the codebase. It's not guessing at Tailwind classes — it's copying the patterns it just read.

This loop works because ASCII wireframes are **fast to generate, fast to read, and fast to iterate on**. You're not committing to CSS until the structure is right. Most bad Claude-generated UIs are bad because someone skipped the structure step and went straight to "make it pretty."

---

## Workflow 2: The Design System Conversation

If you have a design system — even a half-built one — put it in context and keep it there.

Create a \`DESIGN.md\` (or extend your \`CLAUDE.md\`) that describes:

- Your spacing scale, color tokens, typography ramp
- The components you have and their intended use
- The patterns you've standardized on (modal vs. drawer, toast vs. inline error, etc.)
- Anti-patterns you've decided against
- Voice and tone guidelines for microcopy

Now every Claude session starts aware of your system. When you ask for a new component, it proposes one that composes existing primitives instead of reinventing them. When you ask for copy, it matches your tone. When it deviates, you can ask it to point at the rule it's following and that's a design-system bug worth fixing.

The design system doc is doing double duty: it's your reference for humans *and* your reference for Claude. Anywhere the doc is vague, Claude will confabulate — which is a useful signal that humans are probably also confused there.

---

## Workflow 3: State Enumeration For Any Interactive Surface

The single most underused Claude prompt in design work is some version of:

> "List every state this component can be in, including loading, error, empty, partial-data, permission-denied, rate-limited, offline, and any edge cases specific to this flow."

You will always get more states than you had in your spec. Usually half of them are states your current implementation handles incorrectly or not at all. Walking through them with Claude — "what should the UI show when the user has access to list but not to edit?" — is the cheapest design review you can run.

This works especially well for forms, which are the single worst-specified artifact in most products. Claude will cheerfully enumerate: submission pending, submission failed with recoverable error, submission failed with unrecoverable error, partial validation, field-level async validation pending, conflicting fields, optimistic UI rollback, draft autosave in progress, draft conflict with server version. Your spec had "submit button shows spinner."

---

## Workflow 4: Diagrams Are Specs

Claude is excellent at Mermaid diagrams, and Mermaid diagrams are specs you can paste into any doc.

- **Sequence diagrams** for any interaction that crosses a boundary (client ↔ server, user ↔ system, service ↔ service)
- **State diagrams** for any UI with non-trivial state (forms, wizards, async flows)
- **Flowcharts** for user journeys and decision trees
- **ER diagrams** when the UX depends on data shape

The workflow: describe the flow in prose, ask Claude for a Mermaid diagram, iterate on the diagram, then ask Claude to implement it. The diagram becomes the source of truth. When someone asks "why does it work this way?", you have a generated, re-generable, reviewable artifact instead of tribal knowledge.

This is where "Claude design" and "Claude code" stop being separate activities. The diagram isn't a deliverable you throw away — it's the spec Claude uses to generate the implementation.

---

## Workflow 5: Copy, Microcopy, and Voice

Most product copy is written twice: once by someone in a hurry, then again by the designer or PM who noticed it's terrible. Claude can collapse that into one pass, if you give it the right context.

What to include in context:

- **Audience**: developers? first-time users? enterprise admins?
- **Voice reference**: three example sentences in the tone you want. "Stripe-like" isn't enough; paste actual Stripe copy.
- **Constraints**: character limits, must-avoid words, must-include terms
- **State-specific framing**: empty states warm, error states calm, success states brief

Then ask for variants: "Give me five versions of the empty state copy for the Projects list, for a user who has just signed up and has no projects. Constraint: under 80 characters for the heading, under 140 for the body. Tone: encouraging but not cute."

You get five options. You pick one or combine two. What you don't do is spend forty minutes writing five options yourself.

---

## Workflow 6: IA Review With Long Context

If your app has more than ten screens, your information architecture has drift. Two flows that should share a mental model don't. One feature uses "workspace," another uses "project," a third uses "team," and they all mean approximately the same thing.

Dump the following into a single context and ask Claude to find the inconsistencies:

- Your full navigation structure (all routes, labels, groupings)
- Any existing IA or taxonomy docs
- Top-level page titles across the app
- Key nouns from your onboarding and empty states

Then prompt: "Find inconsistencies in naming, hierarchy, and categorization. Specifically: places where the same concept has different names, places where different concepts have the same name, and places where the hierarchy disagrees with itself."

The output is a punch list. Some items will be "we decided that on purpose." Most will be drift — and drift is expensive to leave in place.

---

## What Claude Is Bad At (And What To Do About It)

Being honest about the edges:

**Visual aesthetics and pixel polish.** Claude can describe a good visual design. It cannot produce one. The actual pixel-pushing still lives in Figma or in your hands.

**Novel interaction patterns.** Claude is a strong executor of known patterns. If you're inventing something genuinely new — a new gesture, a new navigation metaphor, a new mental model — the model will quietly steer you back toward familiar ground unless you push. Use it to pressure-test novelty, not to generate it.

**Knowing your users.** The model doesn't know your users. Everything it produces is informed by general patterns, not your specific audience. User research is still human work. Claude is good at helping you *design from* research, not substitute for it.

**Taste.** Two mocks can be equally valid and one can be obviously better. Claude cannot always tell you which. That's where you come in.

The pattern is the same each time: Claude accelerates the parts of design that are generation, enumeration, and analysis. It does not replace judgment, research, or craft.

---

## A Starter Design Prompt Kit

If you want to try this today, here are prompts that get useful output on the first try. Adapt them to your stack.

**For a new screen:**

> Describe the purpose, primary user action, and three secondary actions for a [screen name]. Then produce three ASCII wireframes with different information hierarchies, and recommend one with reasoning.

**For a component:**

> Implement a [component name] using the existing primitives in \`src/components/ui\`. Match the patterns in [example file]. List all props, all states, and how it handles loading, error, and empty cases.

**For a flow:**

> Draw a Mermaid sequence diagram for [user flow]. Include the happy path and at least three failure modes. Then list the UI states the user sees at each step.

**For a review:**

> Review this design [paste mock description or component code] against our design system in \`DESIGN.md\`. Flag inconsistencies, missing states, accessibility gaps, and any naming that conflicts with the rest of the app.

**For microcopy:**

> Give me five variants of [copy slot]. Audience: [audience]. Tone: [tone reference]. Constraint: [constraint]. Rank them and say why.

None of these are magic. They just front-load context and ask for a specific artifact instead of vague "help."

---

## Where Design Ends and Code Begins (Hint: Nowhere)

The old handoff model — designer makes a Figma, developer builds it — has a seam in the middle where intent gets lost. Every design system team has war stories about shipped UI that quietly diverges from the mocks.

When you design with Claude, the artifact and the implementation share a source. The Mermaid diagram becomes the state machine. The ASCII wireframe becomes the JSX tree. The design system doc becomes the prompt context. The handoff shrinks.

That's worth saying plainly: **the biggest win from designing with Claude isn't speed, it's coherence.** Fewer artifacts to keep in sync. Fewer places where design intent and implementation disagree. A design process that outputs running code, not a PDF of mocks nobody reads.

---

## The Takeaway

Design work is a pipeline of ambiguity reduction, and Claude is very good at reducing ambiguity. Not by being a better designer than you, but by being an infinitely patient collaborator who will enumerate states, generate options, diagram flows, and pressure-test your information architecture at any hour.

The developers who get the most out of Claude are the ones who learned to treat it as a thinking partner, not a code vending machine. Designers have the same move available. Describe the problem. Ask for options. Ask for tradeoffs. Ask for the diagram, the spec, the code scaffold. Iterate in minutes instead of days.

If you've been using Claude only for code, try pushing up the stack. The design work is where the compounding happens.

---

## Further Reading

- [Vibe Coding with Claude Code](/blog/vibe-coding-claude-code) — Natural-language development for rapid prototyping
- [Context Engineering for Claude Code](/blog/context-engineering-claude-code) — Getting the most from your design system docs in context
- [10x Productivity Workflows with Claude Code](/blog/claude-code-workflows-10x-productivity) — Day-to-day patterns that stack with design work
- [Claude Opus 4.7: What's Actually New](/blog/claude-opus-4-7-deep-reasoning) — Why long-context synthesis matters for IA review
`,
};
