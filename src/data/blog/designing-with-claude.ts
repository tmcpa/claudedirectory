import { BlogPost } from "@/lib/types";

export const designingWithClaude: BlogPost = {
  slug: "designing-with-claude",
  title:
    "Claude Design Is Here: Anthropic Labs Launches a Prototype, Slide, and One-Pager Generator",
  description:
    "Anthropic Labs just launched Claude Design — a new research preview that turns prompts into prototypes, slides, and one-pagers, powered by Opus 4.7. Here's what it is, how it works, and how to use it alongside Claude Code for real design workflows.",
  publishedDate: "2026-04-17",
  tags: [
    "claude-design",
    "anthropic-labs",
    "ui-design",
    "ux-design",
    "product-design",
    "claude-opus-4-7",
    "claude-code",
    "design-workflow",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "claude-opus-4-7-deep-reasoning",
      relationship: "recommends",
    },
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
  ],
  content: `# Claude Design Is Here: Anthropic Labs Launches a Prototype, Slide, and One-Pager Generator

Anthropic Labs dropped **Claude Design** today — a research-preview product that lets you make prototypes, slides, and one-pagers by talking to Claude. Powered by Opus 4.7, it's Anthropic's most direct move yet into the design tool space, and it lands on the same stage as Figma, Canva, and the long tail of AI slide generators.

Short version: you describe what you want, Claude builds a visual artifact, and you refine it through conversation, inline comments, or purpose-built sliders. It reads your design system and codebase so the output matches your brand. You export to PDF, PPTX, a live URL, or push it straight to Canva for collaborative editing.

Here's what it actually is, how it fits next to Claude Code, and what "designing with Claude" now means in practice.

---

## What Claude Design Actually Is

Claude Design is a **standalone product** from Anthropic Labs — the experimental arm that ships new surfaces for what Claude can do. It's not a Claude Code feature, not a Figma plugin, not an API. It's a new design tool that happens to be built on Claude.

The core loop:

1. **Describe** the thing you want — a prototype screen, a pitch deck, a one-pager, a pricing page.
2. **Claude generates** the visual artifact directly.
3. **You refine** through conversation ("make it denser, warmer tone"), inline comments, direct edits, or sliders Claude creates on the fly for tuning color, spacing, and layout.
4. **Export** to PDF, PPTX, a hosted URL, or into Canva for team editing.

It's powered by Opus 4.7, which Anthropic is calling its most capable vision model. That matters: Claude Design isn't a text-to-slides gimmick. It's reading images, layouts, and design systems as first-class inputs.

---

## The Inputs That Make It Interesting

Most "AI design" tools accept a text prompt and little else. Claude Design takes a wider range of inputs, and that's where it starts to look like a real design collaborator instead of a toy:

- **Text prompts** for the obvious case.
- **Image uploads** to reference a look or extract elements.
- **Document uploads** — DOCX, PPTX, XLSX — so you can hand it a draft deck or a spreadsheet of content and get a designed version back.
- **Web capture** that pulls elements from your company's website, so your brand comes along automatically.
- **Design system integration** that reads your codebase and design files and applies your tokens, spacing, and component patterns to every output.

That last one is the quiet unlock. A lot of AI design tools produce generic-looking artifacts because they don't know your brand. Claude Design hooks into the thing your brand already lives in — your repo and your design files — and uses that as the style source.

---

## How Refinement Works

The refinement model is what separates Claude Design from "generate a slide, regenerate, regenerate, give up." You have four ways to push the output toward what you want:

1. **Conversation.** "Make the hero more spacious, move the CTA up, cut the third bullet." Ordinary chat-style edits.
2. **Inline comments.** Point at a specific element and comment on it — closer to how a human design review actually works.
3. **Direct edits.** When you already know exactly what you want, you just change it.
4. **Purpose-built sliders.** Claude creates sliders for the specific adjustable properties of an element — a color slider for a button, a spacing slider for a section, a layout slider for a grid. You drag, the design updates.

The sliders are the most novel part. Instead of prompting "make the button a little less blue," you get a blue-ness slider for that specific button that Claude generated because the button has a color that's tunable. It's a small detail that changes the feel of the tool from "give instructions to an assistant" to "directly manipulate a design that an assistant is maintaining for you."

---

## Export and the Canva Partnership

The thing Claude Design gets right that a lot of AI design tools get wrong: **output is useful in other tools**.

Exports supported on launch:

- **PDF** for anything print-shaped
- **PPTX** for slide decks that need to live in PowerPoint or Google Slides
- **URL** for a hosted, shareable version of a prototype
- **Canva** — send the artifact directly to Canva, fully editable and collaborative

The Canva integration is notable because it's a real partnership, not just an export format. Canva posted its own announcement the same day. The read there: Anthropic isn't pretending Claude Design replaces the whole design stack. It's making the fast-to-first-draft step dramatically better, then handing off to tools designers already use for polish and collaboration.

For teams, that's the right boundary. Claude Design generates. Canva (or Figma, or whatever you use) finishes.

---

## Who It's Actually For

From the launch materials, the target user isn't a full-time designer — it's everyone who needs a visual artifact but doesn't start in a design tool:

- **Founders** making pitch decks at midnight
- **PMs** turning a Notion spec into a one-pager for stakeholders
- **Engineers** prototyping a UI before there's a designer to own it
- **Marketers** producing campaign assets inside brand guidelines
- **Sales** building custom decks per-prospect without hijacking design's time

The common thread: these people currently default to "suffer in PowerPoint" or "bug the design team." Claude Design is trying to be the third option.

Full-time designers will still live in Figma. But the volume of design-adjacent work happening outside design teams is enormous, and that's the surface area Claude Design is going after.

---

## Availability and Pricing

- **Who gets it:** Claude Pro, Max, Team, and Enterprise subscribers.
- **When:** Rolling out throughout April 17, 2026. You may not see it immediately even on an eligible plan — rollout is gradual.
- **Enterprise note:** Off by default for Enterprise. Admins have to turn it on. If your org is on Enterprise and you want access, talk to your admin.
- **Research preview:** Expect rough edges. Anthropic Labs ships experimentally and iterates.

No separate pricing tier. If you're already paying for Claude, this is included.

---

## Claude Design vs. Claude Code: How They Fit Together

If you're deep in Claude Code, the natural question is "does this replace anything I do?" Short answer: no. They're complementary.

- **Claude Code** is for code. Agentic workflows, refactors, test runs, git operations, long-horizon engineering tasks.
- **Claude Design** is for visual artifacts. Slides, prototypes, one-pagers, decks.

Where they overlap is interesting: **front-end UI work**. If you're building a React component, Claude Code is still the right tool — it operates on your actual codebase. But if you're exploring what a screen should *look* like before you commit to the code, Claude Design gets you to a visual faster, and a Claude Code session can pick up from there.

A workflow that makes sense today:

1. **Sketch in Claude Design.** Describe the screen, generate a prototype, iterate until the layout is right.
2. **Hand off to Claude Code.** Point Claude Code at the prototype (or at a screenshot of it) and ask it to implement it against your actual component library.
3. **Review and refine.** The implementation uses your real primitives, typings, and state management — things Claude Design doesn't touch.

The seam between the two tools is narrower than the seam between Figma and hand-coding, because the same model family is on both ends.

---

## Where Claude Design Fits in the Market

The obvious comparisons:

**vs. Figma.** Figma is a design tool; Claude Design is a generator with a design-tool-ish frontend. For full fidelity design work — components, auto-layout, variants, prototyping with micro-interactions — Figma remains the tool. Claude Design is for the zero-to-draft phase Figma has never been great at.

**vs. Canva.** Canva is a template-driven visual editor for non-designers. Claude Design is similar in audience but different in kind: generation-first instead of template-first. The Canva integration suggests the two companies see them as adjacent rather than competitive.

**vs. AI slide generators (Gamma, Tome, Beautiful.ai).** This is the direct competitive set. The differentiator is Opus 4.7's vision capability and the design-system-as-input model — the output can actually match your brand instead of pulling from a generic template library.

**vs. ChatGPT-with-an-image-tool.** Claude Design is a real surface with real refinement controls. Generating an image with a chatbot and calling it "design" was always a stretch; Claude Design is a dedicated product built for the job.

---

## The Bigger Picture: Anthropic Labs as a Shipping Cadence

Claude Design is the second major product out of Anthropic Labs, and it lands the same week as Opus 4.7. That's not accidental — Labs products showcase the capabilities the latest model makes newly possible. Opus 4.7's vision improvements and long-context reasoning are what make a design product from a foundation-model company plausible at all.

If you're tracking the shape of Anthropic's strategy: Claude Code went after developers, Claude Design is going after the broader "everyone who needs to make things visually" market. The pattern is the model plus a purpose-built surface, rather than expecting everyone to compose their own tooling through the API.

Expect more Labs products. This is the operating mode now.

---

## Beyond Claude Design: Practical Workflows for Designing With Claude

Claude Design is new and impressive, but not every design task needs a dedicated product. A lot of the highest-leverage "designing with Claude" work still happens in a normal Claude Code session or a regular chat. Some patterns worth stealing:

**ASCII wireframes before code.** Ask Claude for three wireframes as ASCII layouts before it touches CSS. Pick one, then ask for the implementation. Cheaper iteration than starting from pixels.

**State enumeration.** For any component or flow: "List every state this can be in — loading, error, empty, partial-data, permission-denied, rate-limited, offline." You'll always get states your spec missed.

**Diagrams as specs.** Mermaid sequence and state diagrams, generated from a prose description, serve as both a design artifact and a source of truth the implementation can follow.

**Design system context.** A \`DESIGN.md\` alongside your \`CLAUDE.md\` describing your spacing scale, tokens, and conventions turns every future Claude session into a design-system-aware one.

**IA review with long context.** Dump your nav structure, route names, and IA docs into a single context and ask Claude to find inconsistencies in naming and hierarchy. Opus 4.7's long-context synthesis is genuinely useful here.

**Microcopy variants.** Give a tone reference, character constraints, and state-specific framing, then ask for five variants. You pick one, combine two, discard three. Faster than writing alone.

These all work without Claude Design. Where Claude Design changes the game is when the artifact itself needs to be visual — a slide, a deck, a prototype, a one-pager. For that class of work, you now have a first-party tool.

---

## Should You Try It Today?

If you're on a paid Claude plan and you've ever thought "ugh, I need to make a deck":

Yes. Try it. The rollout is gradual, so check back if it's not live for you yet. The first thing to test is the design-system import — point it at your codebase and see how well it picks up your brand. That's the feature that determines whether this is a novelty or a real part of your workflow.

If you're a full-time designer: this isn't aimed at you, but it's worth looking at anyway to understand what your PM and eng counterparts will start producing on their own. The floor for "visual artifact from someone who isn't a designer" is about to move up.

If you're building with Claude Code: this expands what "designing with Claude" means. The ASCII-wireframe-then-code loop is still useful for in-codebase UI work, but for decks, prototypes, and pitch material, Claude Design collapses hours into minutes.

---

## Further Reading

- [Claude Opus 4.7: What's Actually New](/blog/claude-opus-4-7-deep-reasoning) — The model powering Claude Design
- [Vibe Coding with Claude Code](/blog/vibe-coding-claude-code) — Natural-language development, now extended to visual artifacts
- [Context Engineering for Claude Code](/blog/context-engineering-claude-code) — Why design-system context matters for quality output
- [10x Productivity Workflows with Claude Code](/blog/claude-code-workflows-10x-productivity) — Day-to-day patterns that now extend into design work
`,
};
