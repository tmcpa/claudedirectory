import { BlogPost } from "@/lib/types";

export const whichClaudeModelToUse: BlogPost = {
  slug: "which-claude-model-to-use",
  title: "Which Claude Model Should You Use? A Guide to the Anthropic Lineup",
  description:
    "Haiku, Sonnet, Opus, and now Fable — Anthropic ships four tiers, and picking the wrong one either burns money or fumbles the task. Here's a practical map of the lineup, what each model is for, and how to route work between them.",
  publishedDate: "2026-07-01",
  tags: [
    "claude-models",
    "claude-opus",
    "claude-sonnet",
    "claude-haiku",
    "fable-5",
    "claude-code",
    "ai-coding",
  ],
  featured: true,
  author: {
    name: "Claude Directory",
    url: "https://github.com/tmcpa/claudedirectory",
  },
  relatedItems: [
    {
      type: "blog",
      slug: "claude-fable-5-guide",
      relationship: "recommends",
    },
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
      slug: "claude-code-subagents-guide",
      relationship: "recommends",
    },
  ],
  content: `# Which Claude Model Should You Use? A Guide to the Anthropic Lineup

There was a time when "which Claude model" had an easy answer: the newest Opus, for everything you cared about. That time is over. Anthropic now ships four tiers, they overlap in confusing ways, and the gap between them is money — sometimes 10x on the same request.

Picking wrong cuts both directions. Put a routine classification job on the top tier and you've paid a fortune to answer something a cheap model nails. Put an underspecified overnight migration on the cheap tier and you've saved a few dollars on tokens to throw away a PR nobody can use.

This is a map of the lineup and a set of rules for routing between the rungs. It's not a benchmark post — those go stale in weeks. It's a decision framework that survives the next release, because the *shape* of the lineup has been stable even as the model numbers tick up.

---

## The Lineup, Top to Bottom

As of mid-2026, four tiers are current. From most capable and expensive to fastest and cheapest:

- **Fable 5** (\`claude-fable-5\`) — the top tier, sitting above Opus. The most capable Claude model, priced at roughly $10 per million input tokens and $50 per million output. Reserved for the hardest, highest-stakes work.
- **Opus 4.8** (\`claude-opus-4-8\`) — the serious-work default. Around $5/$25 per million tokens. The model you reach for on anything genuinely hard that doesn't clear Fable's bar.
- **Sonnet 4.6** (\`claude-sonnet-4-6\`) — the workhorse. Balanced cost and capability; the sensible default for most interactive coding, most pipelines, and most subagent fan-out.
- **Haiku 4.5** (\`claude-haiku-4-5-20251001\`) — fast and cheap. Built for high-volume, latency-sensitive, low-complexity work.

All four share the modern surface: a large context window (1M tokens on the upper tiers), the current API conventions, and the same feature set in Claude Code. The differences that matter are capability at the hard end, speed and price at the cheap end, and — crucially — the *cost of being wrong* on the task in front of you.

A four-tier lineup is only useful if you actually use all four. The most common mistake isn't picking a bad model; it's picking one model and running everything through it.

---

## The One Question That Routes Most Work

Before the per-tier detail, here's the heuristic that resolves the majority of decisions:

> **What does failure cost, and how long does the task run unattended?**

Token price is almost never the number that should drive the choice. The number that matters is cost per *completed, kept* result:

- A cheap model that fumbles a task you then redo on a stronger model cost you both runs plus the context-switch. It was the expensive choice.
- An expensive model that one-shots something a cheaper model would've needed three attempts at was the cheap choice, even at 2x or 10x the per-token rate.

So the routing question isn't "how smart do I need." It's "if this goes wrong, what do I lose?" A misclassified support ticket costs almost nothing — route it cheap. A botched database migration or a security review that misses the real hole costs a lot — route it up.

The second axis is horizon. A model that drifts at hour five of an overnight run produces five hours of throwaway work. The longer a task runs without a human checkpoint, the more you're paying for *coherence*, and coherence is what the top tiers buy.

---

## Haiku 4.5 — The Volume Tier

**Use it for:** classification, extraction, routing, quick lookups, simple transformations, anything you run thousands of times where each individual result is low-stakes and speed matters.

Haiku is the model you build *into* systems rather than talk to. When a request is well-specified, mechanical, and repeated at volume, Haiku's speed and price dominate — the marginal capability of a bigger model is wasted because the task doesn't need it.

**Don't use it for:** anything requiring multi-step reasoning, judgment calls, or holding a lot of context coherently. Haiku will attempt hard tasks and often produce something plausible-but-wrong, which is the worst failure mode because it's the one you don't catch.

The tell that you're on the wrong tier: if you find yourself writing increasingly elaborate prompts to coax Haiku through a task, the task has outgrown the model. Move up.

---

## Sonnet 4.6 — The Workhorse

**Use it for:** most interactive coding, most data pipelines, most subagent work, most of everything. Sonnet is the default not because it's the best at any one thing but because its capability-per-dollar is the widest sweet spot in the lineup.

This is the model that should carry your volume of *real* work — the code you write day to day, the pipelines that process real inputs, the fan-out subagents that read files and report back. It's strong enough to handle genuine complexity and cheap enough that you don't think twice about running it constantly.

**Don't use it for:** the hardest 5% — the gnarly concurrency bug, the underspecified architecture decision, the migration that touches everything. Sonnet will get *close* on those, which is tempting, but "close" on a high-stakes task is where the redo cost lives.

If you're going to standardize on one model and route only the exceptions elsewhere, standardize here.

---

## Opus 4.8 — The Serious-Work Default

**Use it for:** anything genuinely hard. Complex refactors, multi-file features, debugging that requires holding a theory across many files, long-horizon autonomous runs where the task is well-scoped. Opus 4.8's headline strength is *staying coherent across long stretches* — it's the model that made "leave Claude running on this overnight" a reasonable thing to say for a well-defined task.

Opus is the top of most people's ladder. It's the model you reach for when Sonnet keeps getting *close* but not *right*, or when the task is important enough that you want the strongest model that isn't a luxury purchase.

**Don't use it for:** high-volume routine work (that's Sonnet or Haiku), or — going the other way — the small set of tasks so hard or so expensive-to-fail that even Opus's occasional miss is unacceptable. Those clear the bar for Fable.

The practical signal that you want Opus over Sonnet: the task is hard *and* the horizon is long. Either one alone often stays on Sonnet; both together is Opus territory.

---

## Fable 5 — The Top Tier

**Use it for:** the tasks where failure is expensive and the run is long. Overnight migrations you only want to do once. Architecture decisions that ripple through everything. The bug that three models have already missed. Security-sensitive reviews where a miss is the whole point of the exercise.

Fable is a *new tier above Opus*, not an Opus successor — Opus 4.8 stays current and stays the default for hard work. Fable is for the hardest 5% of the hard work, priced (roughly double Opus) to make you deliberate about it. The right way to adopt it is to find the workloads where the cost of *failure* dwarfs the cost of tokens, and route only those.

**Don't use it for:** anything high-volume or low-stakes. Running Fable on classification or routine review isn't "being thorough," it's lighting money on fire — the cheaper tiers exist precisely so you don't have to. If you can't articulate why a specific task justifies double the Opus price, it doesn't; send it down a rung.

The honest metric for a model this expensive isn't cost per token — it's cost per completed task. If Fable finishes in one pass what Opus needed two attempts at, it's the cheaper model for that job. If it doesn't, route the job back down.

---

## A Routing Cheat Sheet

Map the task to the tier by stakes and horizon:

| Task shape | Model |
|---|---|
| High-volume, simple, low-stakes (classify, extract, route) | **Haiku 4.5** |
| Everyday coding, pipelines, subagent fan-out | **Sonnet 4.6** |
| Genuinely hard work; long, well-scoped autonomous runs | **Opus 4.8** |
| Failure is expensive *and* the horizon is long; the hardest 5% | **Fable 5** |

And three rules that override the table:

1. **Route by cost-of-failure, not cost-per-token.** The cheap model that forces a redo was the expensive one.
2. **Match the model to the horizon.** Longer unattended runs need more coherence, which lives up the ladder.
3. **Use all four tiers.** A lineup is a routing tool, not a status symbol. Most waste comes from running one model for everything.

---

## Mixing Models: Subagents and Fan-Out

The highest-leverage move in the whole lineup isn't picking *a* model — it's using several at once. In agentic workflows, the parent agent makes the judgment calls and the subagents mostly read files and report back. That maps directly onto tiers:

**Strong brain at the top, cheap muscle below.** Put Opus (or Fable, for the hardest jobs) on the parent agent that plans, decides, and integrates. Put Sonnet or Haiku on the Explore and fan-out subagents that do the legwork. You get the top-tier judgment where it matters and the cheap-tier economics everywhere else.

This is the configuration that keeps long agentic sessions affordable. A single-tier setup either overpays for the grunt work or underpowers the judgment; the mixed setup does neither.

One caveat: **prompt caches are model-scoped.** Flipping models inside a single session re-pays the full prompt every switch. Pick the model for the *session* (or the *role*, in a fan-out), not the individual message.

---

## When a New Model Drops

Anthropic's cadence has shifted toward small, frequent releases — model "patches" more than blockbuster launches. When the next one lands, you don't need to re-learn the lineup. You need to answer three questions:

1. **Is it a new tier or a better rung?** A version bump (Opus 4.8 → 4.9) means "same slot, improved" — usually a drop-in upgrade with no decision to make. A new name (the way Fable arrived above Opus) means "new slot in your routing," and you should figure out which of your workloads belong there.
2. **What actually changed?** The release notes tend to be understated. The real question is which axis moved — capability at the hard end, price, speed, context, coherence over long runs. That tells you which of *your* tasks the release affects.
3. **Does your routing need to change?** Most releases don't move your defaults. They move what your *hardest problems* should run on. Re-baseline the exceptions, not the whole system.

---

## The Bottom Line

The lineup rewards deliberate routing far more than it rewards picking "the best model." Four tiers exist so that you can send each task to the cheapest rung that reliably clears it — and no further.

- **Haiku** when it's simple and high-volume.
- **Sonnet** for the bulk of real work.
- **Opus** when it's genuinely hard.
- **Fable** when being wrong is expensive and the run is long.

Then measure cost per *kept* result, not cost per token, and let the numbers move your exceptions up or down. The top of the lineup keeps moving; your defaults mostly shouldn't. Your hardest problems are the ones worth re-routing.

---

## Further Reading

- [Claude Fable 5: Anthropic's New Top Tier, Explained](/blog/claude-fable-5-guide) — The model that added a fourth rung above Opus
- [Claude Opus 4.8: The Multi-Hour Agent Release](/blog/claude-opus-4-8-release) — What the serious-work default does best
- [Claude Opus 4.7: What's Actually New](/blog/claude-opus-4-7-deep-reasoning) — Where the modern API surface settled
- [The Complete Guide to Claude Code Subagents](/blog/claude-code-subagents-guide) — The fan-out patterns that let you mix tiers
`,
};
