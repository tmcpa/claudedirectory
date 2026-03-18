import { BlogPost } from "@/lib/types";

export const claudeSkillsNonCodingUseCases: BlogPost = {
  slug: "claude-skills-non-coding-use-cases",
  title:
    "Claude Code Skills Beyond Code: 15 Non-Coding Use Cases You Haven't Tried",
  description:
    "Claude Code skills aren't just for developers. Here are 15 practical skills for writing, research, project management, data analysis, and more — with ready-to-use templates.",
  publishedDate: "2026-03-18",
  tags: [
    "claude-code",
    "skills",
    "productivity",
    "writing",
    "research",
    "project-management",
    "non-coding",
    "workflow",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "how-to-create-claude-skills",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-workflows-10x-productivity",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-md-guide",
      relationship: "recommends",
    },
  ],
  content: `# Claude Code Skills Beyond Code: 15 Non-Coding Use Cases You Haven't Tried

Most people think of Claude Code as a coding tool. Fair enough — it's in the name. But the skills system doesn't care whether you're writing Python or prose. A skill is just a markdown file with instructions. Those instructions can be about anything.

If you do any kind of knowledge work — writing, research, analysis, project management, content creation — Claude Code skills can automate the repetitive parts of your workflow just as effectively as they automate code reviews and deployments.

This guide covers 15 non-coding skills you can start using today. Each one includes a ready-to-use template you can drop into your \`~/.claude/skills/\` directory.

---

## Quick Setup

If you haven't created skills before, here's all you need:

\`\`\`bash
mkdir -p ~/.claude/skills
\`\`\`

Create a \`.md\` file in that directory. The filename becomes the slash command. That's it. For a deeper dive on skill mechanics, see our [complete guide to creating Claude skills](/blog/how-to-create-claude-skills).

---

## Writing & Content

### 1. Blog Post Drafter

Turn rough notes into a structured first draft.

**File**: \`~/.claude/skills/draft-post.md\`

\`\`\`markdown
---
description: Turn notes or an outline into a structured blog post draft
---

Write a blog post draft based on the topic or notes I provide.

1. If I gave rough notes, extract the key points and organize them logically
2. If I gave a topic, research it using available context and outline the key points
3. Write the draft with this structure:
   - A hook that states the problem or opportunity clearly
   - 3-5 main sections with descriptive headers
   - Concrete examples or evidence in each section
   - A conclusion with a clear takeaway or call to action
4. Keep the tone conversational but authoritative — no filler, no fluff
5. Target 800-1,200 words unless I specify otherwise
6. Add a suggested title and 2-3 alternative titles
7. Flag any claims that need fact-checking or sources
\`\`\`

Usage: \`/draft-post notes on why remote teams need async standups\`

### 2. Email Writer

Craft professional emails from a few bullet points.

**File**: \`~/.claude/skills/email.md\`

\`\`\`markdown
---
description: Write a professional email from bullet points or a brief description
---

Write a professional email based on what I describe:

1. Determine the appropriate tone:
   - If writing to a client or executive: formal but warm
   - If writing to a teammate: direct and casual
   - If writing a cold outreach: concise and value-focused
   - If I specify a tone, use that instead
2. Structure the email:
   - Subject line that's specific and actionable (not vague)
   - Opening that gets to the point in the first sentence
   - Body organized with short paragraphs (2-3 sentences max each)
   - Clear ask or next step at the end
3. Keep it as short as possible. Every sentence should earn its place.
4. If there are multiple reasonable interpretations of my intent, show me the most likely version and note the alternatives.
\`\`\`

Usage: \`/email tell the client their project will be delayed 2 weeks due to scope change, offer a revised timeline meeting\`

### 3. Content Repurposer

Turn one piece of content into multiple formats.

**File**: \`~/.claude/skills/repurpose.md\`

\`\`\`markdown
---
description: Repurpose content into multiple formats (social, newsletter, summary, etc.)
---

Take the content I provide and create multiple versions for different channels:

1. Read the source content and identify the core message and key points
2. Generate these versions:

   **LinkedIn post** (150-200 words)
   - Lead with a bold or surprising statement
   - Include 2-3 key insights as short paragraphs
   - End with a question to drive engagement
   - No hashtag spam — 3 max

   **X/Twitter thread** (5-8 tweets)
   - First tweet is the hook — it must stand alone
   - One clear point per tweet
   - Last tweet is the takeaway or CTA

   **Newsletter blurb** (75-100 words)
   - Summary paragraph suitable for a roundup newsletter
   - Link text suggestion

   **Executive summary** (3-5 bullet points)
   - Key facts and decisions only
   - Suitable for forwarding to leadership

3. Maintain the original voice and perspective across all versions
4. Flag if any version requires information not in the original
\`\`\`

Usage: \`/repurpose [paste or reference your blog post, article, or report]\`

### 4. Technical Writer

Transform jargon-heavy docs into clear, readable documentation.

**File**: \`~/.claude/skills/tech-write.md\`

\`\`\`markdown
---
description: Rewrite technical content for clarity and readability
---

Rewrite the content I provide for clarity:

1. Identify the target audience (ask me if unclear)
2. Simplify without losing accuracy:
   - Replace jargon with plain language (or define it on first use)
   - Break long sentences into shorter ones
   - Convert walls of text into structured sections with headers
   - Add bullet points where listing 3+ items
3. Improve scannability:
   - Add descriptive section headers
   - Use bold for key terms and important callouts
   - Keep paragraphs to 3-4 sentences max
4. Verify that the rewrite preserves all technical accuracy
5. Note any sections where the original was ambiguous — ask for clarification rather than guessing
\`\`\`

---

## Research & Analysis

### 5. Competitive Analysis

Build a structured comparison from raw research.

**File**: \`~/.claude/skills/competitor-analysis.md\`

\`\`\`markdown
---
description: Create a structured competitive analysis from notes or company names
---

Build a competitive analysis based on what I provide:

1. If I gave company/product names, work with what you know and flag gaps
2. If I gave research notes, organize and synthesize them
3. Create a comparison covering:

   **Overview**: One-paragraph summary of each competitor's positioning

   **Feature comparison table**: Key capabilities side by side

   **Strengths and weaknesses**: 3-5 of each per competitor

   **Pricing/business model**: How they charge and key differences

   **Market positioning**: Who they target, how they differentiate

   **Gaps and opportunities**: Where competitors are weak that we could exploit

4. End with strategic recommendations: what should we do differently based on this analysis?
5. Clearly separate facts from inferences. Mark anything uncertain.
\`\`\`

### 6. Meeting Notes Processor

Turn raw meeting notes into actionable outputs.

**File**: \`~/.claude/skills/meeting-notes.md\`

\`\`\`markdown
---
description: Process raw meeting notes into structured summaries with action items
---

Process these meeting notes into a structured format:

1. **Summary** (3-5 sentences): What was this meeting about? What were the key outcomes?

2. **Decisions made**: List every decision that was reached, with who made/approved it

3. **Action items**: Extract every commitment or task mentioned:
   - What needs to be done
   - Who is responsible
   - Due date (if mentioned)
   - Mark any items where the owner or deadline is unclear

4. **Open questions**: Issues raised but not resolved — these need follow-up

5. **Key discussion points**: The important context that led to the decisions (not a transcript, but the reasoning)

If the notes are messy or incomplete, do your best and flag sections where you're inferring rather than quoting.
\`\`\`

Usage: \`/meeting-notes [paste raw notes]\`

### 7. Research Summarizer

Distill long documents into key takeaways.

**File**: \`~/.claude/skills/summarize-research.md\`

\`\`\`markdown
---
description: Summarize research documents, papers, or articles into key takeaways
---

Summarize the content I provide:

1. **One-line summary**: The single most important takeaway
2. **Key findings** (5-7 bullets): The main points, conclusions, or arguments
3. **Methodology/approach**: How did they reach these conclusions? (if applicable)
4. **Limitations**: What caveats, biases, or gaps should I be aware of?
5. **Relevance**: How does this connect to common use cases? Who should care about this?
6. **Quotable lines**: 2-3 direct quotes that capture the most important points

Keep the summary to roughly 10% of the original length. Prioritize actionable insights over background context.
\`\`\`

---

## Project Management

### 8. Project Brief Generator

Turn a vague idea into a structured project brief.

**File**: \`~/.claude/skills/project-brief.md\`

\`\`\`markdown
---
description: Generate a structured project brief from a rough idea or description
---

Create a project brief based on what I describe:

1. **Project name**: A clear, descriptive name
2. **Problem statement**: What problem are we solving? Why does it matter now?
3. **Goals**: 3-5 measurable objectives (use SMART criteria)
4. **Scope**:
   - What's included (must-haves)
   - What's explicitly excluded (out of scope)
   - What might be included later (nice-to-haves)
5. **Key stakeholders**: Who needs to be involved? (ask me if unclear)
6. **Milestones**: Break the project into 3-5 phases with rough deliverables
7. **Risks**: What could go wrong? What are the dependencies?
8. **Success criteria**: How do we know when we're done? What does "good" look like?
9. **Open questions**: What do we still need to figure out before starting?

Keep it to 1-2 pages. This should be something I can hand to a team and they can start working from it.
\`\`\`

Usage: \`/project-brief build an internal dashboard for tracking customer onboarding metrics\`

### 9. Status Report Writer

Generate a polished status update from raw notes.

**File**: \`~/.claude/skills/status-report.md\`

\`\`\`markdown
---
description: Generate a formatted status report from rough progress notes
---

Create a status report based on my notes:

1. **Overall status**: Green (on track), Yellow (at risk), or Red (blocked) — determine from the context
2. **Summary**: 2-3 sentence executive overview
3. **Completed this period**: What got done — focus on outcomes, not activity
4. **In progress**: What's actively being worked on and expected completion
5. **Blocked/at risk**: Any issues that need attention or decisions from leadership
6. **Next period plan**: What's coming up next — top 3-5 priorities
7. **Metrics** (if applicable): Any numbers worth highlighting

Write for a busy executive who has 60 seconds to read this. Lead with what matters most. No filler.
\`\`\`

### 10. RFC/Proposal Drafter

Structure a proposal or request for comments.

**File**: \`~/.claude/skills/rfc.md\`

\`\`\`markdown
---
description: Draft an RFC or proposal document from a rough idea
---

Write an RFC/proposal based on what I describe:

1. **Title**: Clear and specific
2. **Status**: Draft
3. **Author**: Ask me or leave as placeholder
4. **Summary**: One paragraph explaining the proposal
5. **Motivation**: Why are we proposing this? What problem does it solve? What happens if we do nothing?
6. **Proposal**: The detailed plan
   - What we're proposing
   - How it would work
   - Key design decisions and why we made them
7. **Alternatives considered**: What else did we think about? Why didn't we pick those?
8. **Drawbacks**: What are the downsides of this proposal?
9. **Open questions**: What still needs to be decided?
10. **Rollout plan**: How would we implement this if approved?

The goal is to give reviewers enough information to make a decision. Be honest about tradeoffs.
\`\`\`

---

## Data & Analysis

### 11. CSV/Data Analyzer

Analyze data files and surface insights.

**File**: \`~/.claude/skills/analyze-data.md\`

\`\`\`markdown
---
description: Analyze a CSV or data file and surface key insights
---

Analyze the data file I point you to:

1. Read the file and understand its structure (columns, types, row count)
2. **Data quality check**:
   - Missing values by column
   - Obvious outliers or data entry errors
   - Duplicate rows
3. **Descriptive statistics**: Key metrics for numerical columns (mean, median, min, max, distribution shape)
4. **Key patterns**:
   - Trends over time (if date column exists)
   - Correlations between columns
   - Notable segments or groupings
5. **Top insights**: 3-5 non-obvious findings that would matter to a decision-maker
6. **Recommended next steps**: What additional analysis or data would deepen these insights?

Present findings in a format I could paste into a slide deck or share with my team. Use tables where they make the data clearer.
\`\`\`

Usage: \`/analyze-data sales_q4_2025.csv\`

### 12. Survey Results Interpreter

Turn raw survey data into a findings report.

**File**: \`~/.claude/skills/survey-results.md\`

\`\`\`markdown
---
description: Interpret survey results and create a findings report
---

Analyze these survey results:

1. **Response overview**: Total responses, completion rate, any notable demographic breakdowns
2. **Key findings** (ranked by significance):
   - What are the strongest signals in the data?
   - Where is there clear consensus?
   - Where are responses split or surprising?
3. **Verbatim highlights**: If there are open-text responses, pull out the most representative and most surprising quotes (3-5 each)
4. **Segment analysis**: Are there meaningful differences between groups (role, tenure, department, etc.)?
5. **Comparison**: If I mention previous survey results, note what changed
6. **Recommendations**: Based on the data, what should we do? What should we investigate further?

Be careful to distinguish between correlation and causation. Flag small sample sizes where they affect reliability.
\`\`\`

---

## Communication & Ops

### 13. SOPs and Process Documentation

Turn tribal knowledge into standard operating procedures.

**File**: \`~/.claude/skills/sop.md\`

\`\`\`markdown
---
description: Create a standard operating procedure from a description of a process
---

Create an SOP based on the process I describe:

1. **Title**: Clear name for the procedure
2. **Purpose**: Why does this process exist? What's the outcome?
3. **When to use**: What triggers this process?
4. **Prerequisites**: What's needed before starting (access, tools, approvals)?
5. **Steps**: Numbered, detailed steps that someone unfamiliar could follow
   - Include specific tool names, menu paths, or commands
   - Note decision points ("If X, do Y. If Z, do W.")
   - Include expected outcomes at key checkpoints
6. **Common issues**: What can go wrong and how to fix it
7. **Contacts**: Who to escalate to if something is unclear

Write it so that a new hire on their first week could follow it without asking questions. If my description is missing details, flag exactly what I need to fill in.
\`\`\`

Usage: \`/sop how we handle customer refund requests\`

### 14. Presentation Outliner

Build a slide deck outline from a topic or goal.

**File**: \`~/.claude/skills/deck-outline.md\`

\`\`\`markdown
---
description: Create a presentation outline with slide-by-slide structure
---

Create a presentation outline based on what I describe:

1. Determine the audience and goal (ask me if unclear)
2. Create a slide-by-slide outline:

   **Slide 1 — Title slide**: Title, subtitle, presenter name

   **Slide 2 — The problem/opportunity**: Set the context. Why are we here?

   **Slides 3-8 — Core content** (adjust count based on topic):
   - One key message per slide
   - Suggested visual or chart for each (bar chart, diagram, screenshot, etc.)
   - 3-5 bullet points of talking points (not slide text — slides should be minimal)

   **Slide 9 — Recommendation/ask**: What do you want the audience to do?

   **Slide 10 — Next steps**: Specific actions, owners, and timeline

3. For each slide, provide:
   - The headline (what goes on the slide)
   - Talking points (what you say out loud)
   - Suggested visual

Target 10-15 slides for a 20-minute presentation. Fewer if the topic is simpler. Follow the "one idea per slide" rule.
\`\`\`

Usage: \`/deck-outline quarterly business review for the product team, focus on user growth and retention\`

### 15. Job Description Writer

Create clear, compelling job descriptions.

**File**: \`~/.claude/skills/job-description.md\`

\`\`\`markdown
---
description: Write a clear, compelling job description from a role summary
---

Write a job description based on what I describe:

1. **Job title**: Clear and searchable (no clever internal titles)
2. **About the role** (3-4 sentences): What will this person actually do day-to-day? What impact will they have?
3. **Responsibilities** (5-7 bullets): Specific, outcome-focused. Start each with a verb. Avoid vague items like "collaborate with stakeholders."
4. **Requirements** (5-7 bullets):
   - Separate true requirements from nice-to-haves
   - Focus on skills and capabilities, not years of experience
   - Don't list every technology — focus on what actually matters
5. **Nice-to-haves** (3-4 bullets): Things that would give a candidate an edge
6. **What we offer** (4-5 bullets): Compensation philosophy, benefits, culture points — be specific, not generic
7. **About the team**: Who they'd work with and how the team operates

Write it to attract the right people, not to list every possible qualification. A great candidate should read this and think "that's exactly what I want to do" — not feel overwhelmed by a 30-item requirements list.
\`\`\`

---

## Making These Skills Your Own

These templates are starting points. The best skills are the ones tailored to how *you* actually work. A few ways to customize:

**Add your company context.** If your status reports always go to a specific audience or follow a specific format, bake that into the skill. "Write this for the VP of Engineering who cares about delivery dates and blockers, not technical details."

**Chain skills together.** Run \`/meeting-notes\` after a meeting, then \`/status-report\` at the end of the week using the action items as input. One skill's output becomes another's input.

**Combine with MCP servers.** If you have a Google Drive or Notion MCP server connected, your skills can read from and write to those tools directly. A \`/weekly-report\` skill could pull data from your project tracker, summarize it, and draft the report — all in one command.

**Set up project-level skills.** Put skills in \`.claude/skills/\` in your project repo so everyone on the team uses the same templates for RFCs, project briefs, and status updates.

---

## Getting Started

1. Pick the one skill from this list that would save you the most time this week
2. Create it: \`~/.claude/skills/[name].md\`
3. Run it on real work and adjust the instructions based on the output
4. Add more skills as you find new patterns in your workflow
5. Browse our [full skills collection](/skills) for more inspiration

The best part about non-coding skills is that you don't need any technical setup beyond Claude Code itself. If you can write a markdown file describing what you want, you have a skill. Start with one, and you'll quickly find yourself building more.`,
};
