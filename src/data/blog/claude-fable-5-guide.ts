import { BlogPost } from "@/lib/types";

export const claudeFable5Guide: BlogPost = {
  slug: "claude-fable-5-guide",
  title: "Claude Fable 5: Anthropic's New Top Tier, Explained",
  description:
    "Fable 5 is the first Claude model to sit above Opus — a new tier, a new name, and double the price. Here's what it is, when it's worth it, what changes in the API, and how to use it well in Claude Code.",
  publishedDate: "2026-06-10",
  tags: [
    "claude-fable",
    "fable-5",
    "claude-code",
    "ai-coding",
    "new-features",
    "agentic-workflows",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "claude-opus-4-8-release",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-opus-4-7-deep-reasoning",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-opus-4-million-token-era",
      relationship: "recommends",
    },
    {
      type: "blog",
      slug: "claude-code-subagents-guide",
      relationship: "recommends",
    },
  ],
  content: `# Claude Fable 5: Anthropic's New Top Tier, Explained

For years the Claude lineup has had three rungs: Haiku for fast and cheap, Sonnet for balanced, Opus for the hard stuff. Fable 5 adds a fourth rung above all of them.

That's the headline. Not "Opus got better" — Opus 4.8 already did that two weeks ago — but "there is now a tier above Opus," with its own name, its own price, and its own place in the lineup. Anthropic is signaling that this isn't Opus 4.9; it's a different class of model.

Short version: Fable 5 is the most capable Claude model available, it costs twice what Opus 4.8 does, and the API surface is almost identical to what you're already running — so trying it is a one-line change. The interesting question isn't "is it smarter." It's "which of your workloads justify the price."

---

## What Fable 5 Actually Is

The facts, without the mystique:

- **Model ID is \`claude-fable-5\`.** No date suffix, same alias convention as the rest of the current lineup.
- **It's a new tier, not an Opus successor.** Opus 4.8 stays in the lineup and stays the default recommendation for most work. Fable sits above it.
- **1M token context window, 128K max output.** Same headline numbers as Opus 4.8 — the difference is what the model does with them, not how much it holds.
- **$10 per million input tokens, $50 per million output.** Exactly double Opus 4.8's $5/$25. The pricing alone tells you how Anthropic wants you to use it: deliberately, on work that earns it.
- **Same API surface as Opus 4.7 and 4.8**, with one new sharp edge covered below. If your code runs on 4.8, it runs on Fable with a model-string swap.

The name break matters more than it might seem. Version numbers imply "same thing, improved." A new name implies a new slot in your decision-making — and that's the right way to think about it.

---

## When Fable Is Worth Double the Price

Doubling spend on every request is the wrong way to adopt this model. The right way is to find the workloads where the cost of *failure* dwarfs the cost of tokens.

**Long-horizon autonomous runs.** This is the clearest case. If an overnight agent drifts at hour five and produces a PR you have to throw away, you paid for five hours of compute and got nothing. A model that holds the brief to the end is cheaper at double the token price. The frontier work that Opus 4.6 → 4.7 → 4.8 kept pushing — bigger context, better use of it, longer coherence — is exactly the axis Fable extends.

**Tasks where a wrong answer is expensive.** Architecture decisions, security-sensitive reviews, migrations that touch everything. Anywhere you'd currently run the task twice or have a second model check the first one, a single stronger pass can be the cheaper option.

**The hardest 5% of your queue.** Most teams have a small set of tasks their current model reliably fumbles — the gnarly concurrency bug, the underspecified refactor, the codebase nobody fully understands. Route those to Fable and leave the rest on Opus or Sonnet.

And the corollary: **don't put Fable on high-volume, low-stakes work.** Classification, summarization, routine code review, subagent fan-out — Sonnet 4.6 and Haiku 4.5 exist for a reason, and Opus 4.8 remains the sensible default for serious coding. A four-tier lineup is only useful if you actually use the tiers.

---

## The API: One Line to Try, One Trap to Avoid

If you're coming from Opus 4.7 or 4.8, migration is the model string:

\`\`\`python
response = client.messages.create(
    model="claude-fable-5",
    max_tokens=64000,
    thinking={"type": "adaptive"},
    output_config={"effort": "high"},
    messages=[{"role": "user", "content": "..."}],
)
\`\`\`

Everything that was already true on 4.7/4.8 carries over:

- **Adaptive thinking only.** \`thinking: {type: "enabled", budget_tokens: N}\` returns a 400. Use \`{"type": "adaptive"}\` and steer depth with \`effort\`.
- **No sampling parameters.** \`temperature\`, \`top_p\`, and \`top_k\` are rejected. Steer with prompting.
- **No assistant-turn prefills.** Use structured outputs (\`output_config.format\`) instead.
- **Effort levels** \`low\` through \`max\` all work, including \`xhigh\` — still the sweet spot for coding and agentic work.

The one **new** breaking change, and it's easy to hit: on Fable 5, an explicit \`thinking: {type: "disabled"}\` returns a 400. Opus 4.7 and 4.8 accept it; Fable doesn't. If you want thinking off, omit the \`thinking\` parameter entirely. Codebases with a shared request builder that always sets \`thinking\` — even to "disabled" — will break on the swap. Check for that before you flip the model string in anything shared.

One quieter detail worth knowing: Fable's minimum cacheable prompt prefix is 2,048 tokens, half of Opus 4.8's 4,096. Mid-sized cached prompts that silently miss the cache on Opus can hit it on Fable — a small offset against the higher list price for cache-heavy setups.

---

## Fable in Claude Code

Fable 5 is available in Claude Code today, and the fit is obvious: Claude Code is where long-horizon, high-stakes agentic work actually happens.

A few practical notes:

**Use it where the horizon is long.** The multi-hour autonomous runs that Opus 4.8 made viable are the natural home for Fable. If you're kicking off an overnight refactor or a workday-length migration, the stronger model at the top of the loop is where the upgrade pays.

**Keep subagents on cheaper tiers.** The parent agent makes the judgment calls; the Explore and fan-out subagents mostly read files and report back. Fable parent, Sonnet/Haiku subagents is the cost-sane configuration — same pattern as before, just with a stronger brain at the top.

**Front-load the brief.** This was true on 4.7 and 4.8 and is more true here: these models do their best work when the full task spec lands in one well-specified opening turn. At Fable's price, a vague brief that burns an hour going the wrong direction costs real money. Write the goal, the constraints, and what "done" looks like before you hit enter.

**Don't switch models mid-session.** Prompt caches are model-scoped, so flipping between Fable and Opus inside one session re-pays the full prompt every flip. Pick the model for the session, not the message.

---

## What Didn't Change

- **Context window is 1M tokens** — same as Opus 4.6 onward.
- **Max output is 128K tokens** — stream anything large, same as before.
- **The rest of the lineup is intact.** Opus 4.8, Sonnet 4.6, and Haiku 4.5 all stay current. Nothing is deprecated by this release.
- **Features carry over.** Structured outputs, compaction, task budgets, the 4.7-era high-resolution vision — Fable inherits the modern surface rather than introducing a new one.

This is the least disruptive way to ship a new top tier: no migration guide needed beyond one model string and one \`thinking\` gotcha.

---

## How to Decide

A simple routing heuristic that matches the four-tier lineup:

- **Haiku 4.5** — high-volume, latency-sensitive, simple. Classification, extraction, quick lookups.
- **Sonnet 4.6** — the workhorse. Most interactive coding, most pipelines, most subagents.
- **Opus 4.8** — serious agentic and coding work. The default for anything hard.
- **Fable 5** — the tasks where failure is expensive and the horizon is long. The overnight run, the migration you only want to do once, the bug three models have already missed.

Then measure. The honest metric for a model this priced isn't cost per token, it's cost per *completed* task — tokens spent divided by results you actually kept. If Fable finishes in one pass what Opus needed two attempts at, it's the cheaper model for that job. If it doesn't, route that job back down a tier and spend the money where it moves the needle.

The top of the lineup just moved. Your defaults don't have to — but your hardest problems probably should.

---

## Further Reading

- [Claude Opus 4.8: The Multi-Hour Agent Release](/blog/claude-opus-4-8-release) — The release that set the baseline Fable builds on
- [Claude Opus 4.7: What's Actually New](/blog/claude-opus-4-7-deep-reasoning) — Where the modern API surface (adaptive thinking, effort) settled
- [Claude Opus 4.6 and the Million-Token Context Window](/blog/claude-opus-4-million-token-era) — Where the long-context arc started
- [The Complete Guide to Claude Code Subagents](/blog/claude-code-subagents-guide) — The fan-out patterns that keep Fable's cost sane
`,
};
